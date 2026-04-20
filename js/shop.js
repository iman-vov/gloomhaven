function resetShop() {
  lsSet('shop_unlocked', []);
  setInventory(null, []);
  updateUnlockBtns();
  renderItemsGrid();
  renderOwnedGrid();
}
function setShopChar(code) {
  activeShopChar = code;
  document.querySelectorAll('.shop-char-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(code ? `shop-char-${code}` : 'shop-char-none').classList.add('active');
  renderItemsGrid();
}

let shopView = 'all';

function setShopView(v) {
  shopView = v;
  document.getElementById('shop-vtab-all').classList.toggle('active', v === 'all');
  document.getElementById('shop-vtab-owned').classList.toggle('active', v === 'owned');
  document.getElementById('shop-all-view').style.display = v === 'all' ? '' : 'none';
  document.getElementById('shop-owned-view').style.display = v === 'owned' ? '' : 'none';
  if (v === 'owned') renderOwnedGrid();
}

function getVisibleItemIds() {
  const always = Array.from({length: 13}, (_,i) => String(i+1).padStart(3,'0'));
  const extra = lsGet('shop_unlocked', []);
  return new Set([...always, ...extra]);
}

function unlockShopBatch(batch) {
  const ranges = { b: [15,20], c: [21,28] };
  const [from, to] = ranges[batch];
  const extra = lsGet('shop_unlocked', []);
  for (let i = from; i <= to; i++) {
    const id = String(i).padStart(3,'0');
    if (!extra.includes(id)) extra.push(id);
  }
  lsSet('shop_unlocked', extra);
  updateUnlockBtns();
  renderItemsGrid();
}

function unlockSingleItem() {
  const input = document.getElementById('shop-unlock-input');
  const num = parseInt(input.value);
  if (!num || num < 1 || num > 36) return;
  const id = String(num).padStart(3,'0');
  const extra = lsGet('shop_unlocked', []);
  if (!extra.includes(id)) {
    extra.push(id);
    lsSet('shop_unlocked', extra);
  }
  input.value = '';
  renderItemsGrid();
}

function updateUnlockBtns() {
  const extra = lsGet('shop_unlocked', []);
  const hasB = [15,16,17,18,19,20].every(i => extra.includes(String(i).padStart(3,'0')));
  const hasC = [21,22,23,24,25,26,27,28].every(i => extra.includes(String(i).padStart(3,'0')));
  const btnB = document.getElementById('btn-unlock-b');
  const btnC = document.getElementById('btn-unlock-c');
  if (btnB) { btnB.classList.toggle('unlocked', hasB); if (hasB) btnB.disabled = true; }
  if (btnC) { btnC.classList.toggle('unlocked', hasC); if (hasC) btnC.disabled = true; }
}

function renderItemsGrid() {
  const grid = document.getElementById('items-grid');
  grid.innerHTML = '';
  const visible = getVisibleItemIds();
  // Collect all owned items across all characters
  const allOwned = new Set();
  [null,'HA','DE','VW','RG'].forEach(c => getInventory(c).forEach(id => allOwned.add(id)));
  ITEMS.filter(item => visible.has(item.id)).forEach(item => {
    const owned = allOwned.has(item.id);
    const name = lang==='de' ? item.nameDe : item.nameRu;
    const el = document.createElement('div');
    el.className = 'item-card' + (owned ? ' owned' : '');
    el.onclick = () => openItemModal(item);
    el.innerHTML = `
      <img src="./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/items/${item.id}.png" alt="${item.id}"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="img-placeholder" style="display:none"><div class="ph-num">${item.id}</div>${name}</div>
      <div class="item-card-info">
        <div class="item-card-name">${name}</div>
        <div class="item-card-price">🪙 ${item.price}</div>
      </div>
      <button class="card-add-btn${owned ? ' in-deck' : ''}" aria-label="${owned ? 'Remove' : 'Buy'}">${owned ? '✓' : '+'}</button>`;
    const addBtn = el.querySelector('.card-add-btn');
    addBtn.addEventListener('click', e => { e.stopPropagation(); toggleItemFromGrid(item); });
    addBtn.addEventListener('touchend', e => { e.stopPropagation(); });
    grid.appendChild(el);
  });
}

function renderOwnedGrid() {
  const grid = document.getElementById('owned-grid');
  const empty = document.getElementById('owned-empty');
  grid.innerHTML = '';
  // Collect all owned items
  const allOwned = new Set();
  [null,'HA','DE','VW','RG'].forEach(c => getInventory(c).forEach(id => allOwned.add(id)));
  const ownedItems = ITEMS.filter(item => allOwned.has(item.id) && getVisibleItemIds().has(item.id));
  if (!ownedItems.length) {
    empty.classList.remove('hidden');
    empty.textContent = lang==='de' ? 'Keine gekauften Gegenstände.' : 'Нет купленных предметов.';
    return;
  }
  empty.classList.add('hidden');
  ownedItems.forEach(item => {
    const name = lang==='de' ? item.nameDe : item.nameRu;
    const el = document.createElement('div');
    el.className = 'item-card owned';
    el.onclick = () => openItemModal(item);
    el.innerHTML = `
      <img src="./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/items/${item.id}.png" alt="${item.id}"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="img-placeholder" style="display:none"><div class="ph-num">${item.id}</div>${name}</div>
      <div class="item-card-info">
        <div class="item-card-name">${name}</div>
        <div class="item-card-price">🪙 ${item.price}</div>
      </div>
      <button class="card-add-btn in-deck" aria-label="Remove">✓</button>`;
    const addBtn = el.querySelector('.card-add-btn');
    addBtn.addEventListener('click', e => { e.stopPropagation(); toggleItemFromGrid(item); });
    addBtn.addEventListener('touchend', e => { e.stopPropagation(); });
    grid.appendChild(el);
  });
}

function openItemModal(item) {
  openItemId = item.id;
  const inv = getInventory(null);
  const owned = inv.includes(item.id);
  document.getElementById('item-modal-img').src = `./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/items/${item.id}.png`;
  document.getElementById('item-modal-title').textContent = lang==='de' ? item.nameDe : item.nameRu;
  document.getElementById('item-modal-price').textContent = `🪙 ${item.price}`;
  document.getElementById('item-modal-desc').textContent = lang==='de' ? item.descDe : item.descRu;
  const btn = document.getElementById('item-modal-buy-btn');
  btn.textContent = owned ? (lang==='de'?'✓ Verkaufen':'✓ Продать') : (lang==='de'?'🛒 Kaufen':'🛒 Купить');
  btn.className = 'btn-primary' + (owned ? ' remove' : '');
  document.getElementById('item-modal').classList.add('open');
}

function toggleItemOwned() {
  if (!openItemId) return;
  // Use global inventory (shared across all characters)
  let inv = getInventory(null);
  inv = inv.includes(openItemId) ? inv.filter(id=>id!==openItemId) : [...inv, openItemId];
  setInventory(null, inv);
  renderItemsGrid();
  if (shopView === 'owned') renderOwnedGrid();
  const item = ITEMS.find(x => x.id === openItemId);
  if (item) openItemModal(item);
}

function toggleItemFromGrid(item) {
  let inv = getInventory(null);
  inv = inv.includes(item.id) ? inv.filter(id=>id!==item.id) : [...inv, item.id];
  setInventory(null, inv);
  renderItemsGrid();
  if (shopView === 'owned') renderOwnedGrid();
}

function closeItemModal(e) { if (e.target===document.getElementById('item-modal')) closeItemModalDirect(); }
function closeItemModalDirect() { document.getElementById('item-modal').classList.remove('open'); }
