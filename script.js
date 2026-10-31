const filters = document.querySelector('.filters');
const buttons = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-category]')];
filters.hidden = false;
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    projects.forEach(project => {
      project.hidden = selected !== 'all' && !project.dataset.category.split(' ').includes(selected);
      if (!project.hidden) count++;
    });
    document.querySelector('#filter-status').textContent = `${button.textContent.trim()} 분야의 프로젝트 ${count}개를 표시합니다.`;
  });
});

const navLinks = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// Make a featured project reachable even after a different category was selected.
document.querySelectorAll('.experience-highlights a').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (target?.hidden) document.querySelector('[data-filter="all"]').click();
  });
});

const themeToggle = document.querySelector('.theme-toggle');
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  themeToggle.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
}
applyTheme(document.documentElement.dataset.theme);
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('sohds-theme', theme); } catch {}
});
// Follow the system setting until the visitor picks a theme.
darkQuery.addEventListener('change', event => {
  let saved;
  try { saved = localStorage.getItem('sohds-theme'); } catch {}
  if (!saved) applyTheme(event.matches ? 'dark' : 'light');
});
