const toggleBtn = document.getElementById('themeToggle');
const themeStyle = document.getElementById('theme-style');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  if (themeStyle.getAttribute('href').includes('light.css')) {
    themeStyle.setAttribute('href', 'assets/css/dark.css');
    body.className = 'theme-dark fade-transition';
    toggleBtn.classList.add('dark-mode');
  } else {
    themeStyle.setAttribute('href', 'assets/css/light.css');
    body.className = 'theme-light fade-transition';
    toggleBtn.classList.remove('dark-mode');
  }
});
