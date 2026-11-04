/* =========================================================
   NOTARÍA – Comportamiento de la página
   ========================================================= */
(() => {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* Año del pie */
  $('#year').textContent = new Date().getFullYear();

  /* Encabezado: transparente arriba, sólido al bajar */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menú móvil */
  const burger = $('#burger');
  const setMenu = open => {
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
  $$('#nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---------- Carrusel principal ---------- */
  const hero   = $('.hero');
  const slides = $$('.slide');
  const dotsEl = $('#dots');
  let current  = 0;

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
    b.innerHTML = '<span class="fill"></span>';
    b.addEventListener('click', () => go(i));
    dotsEl.appendChild(b);
    return b;
  });

  function go(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle('is-active', i === current);
      s.setAttribute('aria-hidden', i !== current);
      const img = $('.slide__bg', s);
      if (img && img.loading === 'lazy') img.loading = 'eager';
    });
    dots.forEach((d, i) => {
      d.classList.remove('is-active');
      d.setAttribute('aria-selected', i === current);
      if (i === current) { void d.offsetWidth; d.classList.add('is-active'); } // reinicia la barra
    });
  }

  /* Avanza solo cuando termina la barra de progreso (se pausa con el mouse encima) */
  dotsEl.addEventListener('animationend', e => { if (e.animationName === 'fill') go(current + 1); });
  $('#next').addEventListener('click', () => go(current + 1));
  $('#prev').addEventListener('click', () => go(current - 1));
  hero.addEventListener('focusin',  () => hero.classList.add('is-paused'));
  hero.addEventListener('focusout', () => hero.classList.remove('is-paused'));
  document.addEventListener('keydown', e => {
    if (!hero.matches(':hover') && !hero.contains(document.activeElement)) return;
    if (e.key === 'ArrowRight') go(current + 1);
    if (e.key === 'ArrowLeft')  go(current - 1);
  });
  let x0 = null;
  hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  go(0);

  /* ---------- Riel infinito: duplica las imágenes para que no tenga cortes ---------- */
  const track = $('.rail__track');
  if (track) {
    $$('figure', track).forEach(f => {
      const c = f.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      $('img', c).alt = '';
      track.appendChild(c);
    });
  }

  /* ---------- Formulario ---------- */
  const form = $('#form'), msg = $('#formMsg');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true;
    $$('input,textarea', form).forEach(f => {
      const bad = !f.checkValidity();
      f.classList.toggle('is-invalid', bad);
      if (bad) ok = false;
    });
    msg.className = 'form__msg';
    if (!ok) { msg.textContent = 'Revisa los campos marcados.'; msg.classList.add('err'); return; }

    /* ✏️ CONECTAR EL ENVÍO REAL (elige una opción):
       A) Formspree: crea un formulario en formspree.io y pega su URL aquí:
          const res = await fetch('https://formspree.io/f/TU_ID', {
            method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
          if (!res.ok) { ...mostrar error... }
       B) Tu propio servidor / PHP: cambia la URL del fetch.
       Por ahora solo simula el envío: */
    msg.textContent = 'Gracias. Recibimos tu solicitud y te contactaremos pronto.';
    msg.classList.add('ok');
    form.reset();
  });
})();
