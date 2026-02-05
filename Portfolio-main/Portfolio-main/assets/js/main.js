// Theme toggle with localStorage persistence
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  }
  function toggleTheme() {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  }
  themeToggle && themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile && themeToggleMobile.addEventListener('click', toggleTheme);
})();

// Mobile menu
(function () {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
  // hide menu on nav link click
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.add('hidden')));
})();

// Smooth scroll behavior for in-page links (beyond CSS smooth for Safari fallback)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Intersection Observer for reveal-on-scroll
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
})();

// Contact form: open default mail client (no backend)
(function () {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-70');
    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const message = (document.getElementById('message') || {}).value || '';
    const to = 'zouhairyare123@gmail.com';
    const subject = encodeURIComponent(`New portfolio message from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;
    // Open user's mail client
    window.location.href = mailtoUrl;
    // Give simple UX feedback
    statusEl.textContent = 'Opening your email app...';
    statusEl.className = 'text-sm text-gray-600 dark:text-gray-300';
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-70');
    }, 1200);
  });
})();


