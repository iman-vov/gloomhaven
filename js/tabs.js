function openImgLightbox(src) {
  if (typeof _playerLbSrcs !== 'undefined') {
    _playerLbSrcs = [];
    _playerLbIdx = 0;
    if (typeof _playerLbCards !== 'undefined') _playerLbCards = [];
    if (typeof _playerLbAction !== 'undefined') _playerLbAction = null;
  }
  const prev = document.getElementById('img-lb-prev');
  const next = document.getElementById('img-lb-next');
  if (prev) prev.style.display = 'none';
  if (next) next.style.display = 'none';
  const lb = document.getElementById('img-lightbox');
  const info = document.getElementById('img-lightbox-info');
  if (info) info.style.display = 'none';
  lb.classList.remove('has-info');
  document.getElementById('img-lightbox-img').src = src;
  lb.classList.add('open');
}

function closeImgLightbox() {
  document.getElementById('img-lightbox').classList.remove('open');
}

function toggleMobileNav() {
  document.getElementById('tab-nav').classList.toggle('mobile-open');
}

function switchTab(id) {
  if (id === 'goals' && typeof sessionCode !== 'undefined' && sessionCode) {
    id = 'party';
  }
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
    if (typeof updateShopGoldBar === 'function') updateShopGoldBar();
    renderItemsGrid();
    if (shopView === 'owned') renderOwnedGrid();
  }
  if (id === 'party' && typeof renderPartyTab === 'function') {
    renderPartyTab();
  }
  if (id === 'player' && typeof renderPlayerTab === 'function') {
    renderPlayerTab();
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
  const tabBtn = document.getElementById('tabbtn-player');
  if (tabBtn) tabBtn.click();
  document.getElementById('tab-nav').scrollLeft = 0;
  const savedChar = lsGet('activeChar', null);
  if (savedChar && CHARS[savedChar]) selectChar(savedChar);
  initSession();
  // show local reset button only when no session
  const resetWrap = document.getElementById('local-reset-wrap');
  if (resetWrap && !sessionCode) resetWrap.classList.remove('hidden');
}

init();
