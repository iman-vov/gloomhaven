function openImgLightbox(src) {
  document.getElementById('img-lightbox-img').src = src;
  document.getElementById('img-lightbox').classList.add('open');
}

function closeImgLightbox() {
  document.getElementById('img-lightbox').classList.remove('open');
}

function toggleMobileNav() {
  document.getElementById('tab-nav').classList.toggle('mobile-open');
}

function switchTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${id}`).classList.add('active');
  if (typeof event !== 'undefined' && event.currentTarget) event.currentTarget.classList.add('active');
  document.getElementById('tab-nav').classList.remove('mobile-open');
  const activeBtn = document.getElementById(`tabbtn-${id}`);
  if (activeBtn) {
    const label = document.getElementById('nav-current-label');
    if (label) label.textContent = activeBtn.textContent.trim();
  }
  lsSet('activeTab', id);

  if (id === 'shop') {
    renderItemsGrid();
    if (shopView === 'owned') renderOwnedGrid();
  }
  if (id === 'missions') {
    initMissionSelect();
    renderMissionTab();
  }
  if (id === 'goals') {
    renderGoalsList();
  }
  if (id === 'events') {
    updateDrawBtn();
  }
  if (id === 'helper') {
    initHelper();
  }
}

function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light');
  document.getElementById('theme-toggle').textContent = isLight ? '☀️' : '🌙';
  lsSet('theme', isLight ? 'light' : 'dark');
}

function init() {
  const savedTheme = lsGet('theme', 'dark');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
    document.getElementById('theme-toggle').textContent = '☀️';
  }
  lang = lsGet('lang', 'ru');
  setLang(lang);
  updateMissionUI();
  initMissionSelect();
  updateDrawBtn();
  updateUnlockBtns();
  const savedTab = lsGet('activeTab', 'heroes');
  const tabBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick')?.includes(savedTab));
  if (tabBtn) tabBtn.click();
  const savedChar = lsGet('activeChar', null);
  if (savedChar && CHARS[savedChar]) selectChar(savedChar);
}

init();
