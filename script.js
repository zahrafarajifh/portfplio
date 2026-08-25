// nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }));

  // work filter — scoped to whichever language block the clicked button lives in,
  // so the English and Italian filters never interfere with each other
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const scope = btn.closest('[data-lang]') || document;
      const btnsInScope = scope.querySelectorAll('.filter-btn');
      const cardsInScope = scope.querySelectorAll('.work-card');

      btnsInScope.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      cardsInScope.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  // language switch (EN / IT)
  const langBtns = document.querySelectorAll('.lang-btn');
  function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    langBtns.forEach(b => {
      const active = b.dataset.langBtn === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    navToggle.setAttribute('aria-label', lang === 'it' ? 'Attiva/disattiva menu' : 'Toggle menu');
  }
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.langBtn));
  });

  // if arriving from a link that specified a language (e.g. index.html#work -> case
  // study page), honor it so the visitor doesn't get bounced back to English
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'it' || urlLang === 'en') {
    setLanguage(urlLang);
  }