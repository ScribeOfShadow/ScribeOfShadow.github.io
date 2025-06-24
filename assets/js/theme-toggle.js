const toggleBtn = document.getElementById('themeToggle');
const themeLink = document.getElementById('theme-style');

toggleBtn.addEventListener('click', () => {
  if (themeLink.getAttribute('href').includes('light.css')) {
    themeLink.setAttribute('href', 'assets/css/dark.css');
    document.body.className = 'theme-dark';
  } else {
    themeLink.setAttribute('href', 'assets/css/light.css');
    document.body.className = 'theme-light';
  }
});
document.body.classList.add('fade-transition');
