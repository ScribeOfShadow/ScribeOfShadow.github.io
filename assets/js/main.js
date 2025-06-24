const switchCheckbox = document.getElementById('themeSwitch');

switchCheckbox.addEventListener('change', () => {
  const newTheme = switchCheckbox.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);

  // Optional: trigger border glow reflow animation
  document.querySelectorAll('.glow-border').forEach(el => {
    el.classList.remove('glow-border'); // restart animation
    void el.offsetWidth; // force reflow
    el.classList.add('glow-border');
  });

  // Optional: store theme
  localStorage.setItem('preferred-theme', newTheme);
});

// Load saved theme on page load
const savedTheme = localStorage.getItem('preferred-theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  switchCheckbox.checked = savedTheme === 'dark';
}
