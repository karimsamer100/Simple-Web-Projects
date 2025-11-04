document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Fade in elements on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('revealed');
    });
  }, {threshold: 0.1});
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  // Scroll to top button
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.innerHTML = '↑';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
