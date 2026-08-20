// ===================================================================
// THE ELEPHANT LODGE — site script
// ===================================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* ---------- header solid-on-scroll ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('solid');
    else header.classList.remove('solid');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- active nav link ---------- */
  var current = document.body.getAttribute('data-page');
  document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === current) a.classList.add('active');
  });

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- gallery filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var cats = (item.getAttribute('data-cat') || '');
        if (f === 'all' || cats.indexOf(f) !== -1) item.style.display = '';
        else item.style.display = 'none';
      });
    });
  });

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox && galleryItems.length) {
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('.lightbox-cap');
    var visible = [];
    var idx = 0;

    function refreshVisible() {
      visible = Array.prototype.filter.call(galleryItems, function (item) {
        return item.style.display !== 'none';
      });
    }
    function openAt(item) {
      refreshVisible();
      idx = visible.indexOf(item);
      show();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function show() {
      var item = visible[idx];
      if (!item) return;
      var img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
    }
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () { openAt(item); });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
      idx = (idx - 1 + visible.length) % visible.length; show();
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
      idx = (idx + 1) % visible.length; show();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') { idx = (idx - 1 + visible.length) % visible.length; show(); }
      if (e.key === 'ArrowRight') { idx = (idx + 1) % visible.length; show(); }
    });
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ---------- contact form ---------- */
  var form = document.getElementById('enquiry-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot spam trap
      if (form.querySelector('[name="_gotcha"]').value) return;

      var data = new FormData(form);
      status.className = 'form-status';
      status.textContent = 'Sending your enquiry…';
      status.style.display = 'block';

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          status.textContent = "Thank you — your enquiry has been sent to The Elephant Lodge. We'll be in touch shortly.";
          status.className = 'form-status ok';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      }).catch(function () {
        status.innerHTML = 'We could not send this automatically. Please email us directly at ' +
          '<a href="mailto:info@theelephantlodge.co.za">info@theelephantlodge.co.za</a> or WhatsApp 069 248 6657.';
        status.className = 'form-status err';
      });
    });
  }

});
