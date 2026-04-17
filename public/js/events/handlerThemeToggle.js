export const initThemeToggle = () => {
  const toggleBtn = document.querySelector('.mode-btn');
  const root = document.documentElement;

  if (!toggleBtn) return;

  // Check the saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    root.classList.add('theme-light');
  }

  // Toggle theme
  toggleBtn.addEventListener('click', () => {
    const isLight = root.classList.toggle('theme-light');

    // Save the selection
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
};
