function getInitialStock() {
  const twoCopies = new Set([
    '001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013',
    '014', '020', '026'
  ]);
  const stock = {};
  for (let i = 1; i <= 36; i++) {
    const id = String(i).padStart(3, '0');
    stock[id] = twoCopies.has(id) ? 2 : 1;
  }
  return stock;
}

function getShopInventoryOwner() {
  return sessionCode ? playerId : (activeChar || null);
}

function getShopInventory() {
  if (sessionCode && typeof getSessionPlayerItems === 'function') {
    return getSessionPlayerItems(playerId);
  }
  return getInventory(getShopInventoryOwner());
}

function setShopInventory(inv) {
  if (sessionCode && typeof setSessionPlayerItems === 'function') {
    setSessionPlayerItems(playerId, inv);
    return;
  }
  setInventory(getShopInventoryOwner(), inv);
}

function isItemOwned(itemId) {
  return getShopInventory().includes(itemId);
}

function getShopStock(itemId) {
  return typeof getItemStock === 'function' ? getItemStock(itemId) : 99;
}

function changeShopStock(itemId, delta) {
  if (!sessionCode || !sessionShopStock) return;
  const nextStock = { ...sessionShopStock };
  nextStock[itemId] = Math.max(0, (nextStock[itemId] ?? 1) + delta);
  sessionShopStock = nextStock;
  if (typeof syncShopStockToFirebase === 'function') syncShopStockToFirebase(nextStock);
}

function finalizeShopUpdate(reopenItemId = null) {
  renderItemsGrid();
  if (shopView === 'owned') renderOwnedGrid();
  if (typeof renderPlayerTab === 'function') renderPlayerTab();
  if (reopenItemId) {
    const item = ITEMS.find(x => x.id === reopenItemId);
    if (item) openItemModal(item);
  }
}

function addItemToInventory(item, free, reopenItemId = null) {
  let inv = getShopInventory();
  if (inv.includes(item.id)) return;

  if (sessionCode) {
    if (getShopStock(item.id) <= 0) return;
    if (!free) {
      const gold = typeof getMyGold === 'function' ? getMyGold() : 0;
      if (gold < item.price) return;
      if (typeof setMyGold === 'function') setMyGold(gold - item.price);
    }
    changeShopStock(item.id, -1);
  }

  inv = [...inv, item.id];
  setShopInventory(inv);
  finalizeShopUpdate(reopenItemId);
}

function removeItemFromInventory(item, reopenItemId = null) {
  let inv = getShopInventory();
  if (!inv.includes(item.id)) return;

  inv = inv.filter(id => id !== item.id);
  setShopInventory(inv);

  if (sessionCode) {
    changeShopStock(item.id, 1);
    if (typeof setMyGold === 'function') {
      const sellValue = Math.floor(item.price / 2);
      setMyGold(getMyGold() + sellValue);
    }
  }

  finalizeShopUpdate(reopenItemId);
}

function closeShopChoiceOverlay() {
  const overlay = document.getElementById('shop-choice-overlay');
  if (overlay) overlay.remove();
}

function showShopChoiceOverlay(item) {
  closeShopChoiceOverlay();

  const overlay = document.createElement('div');
  overlay.id = 'shop-choice-overlay';
  overlay.onclick = () => closeShopChoiceOverlay();

  const box = document.createElement('div');
  box.className = 'shop-choice-box';
  box.addEventListener('click', e => e.stopPropagation());

  const title = document.createElement('h3');
  title.textContent = lang === 'de' ? item.nameDe : item.nameRu;

  const options = document.createElement('div');
  options.className = 'shop-choice-options';

  let selected = 'buy';
  const gold = typeof getMyGold === 'function' ? getMyGold() : 0;
  const canBuy = gold >= item.price;

  const buyOption = document.createElement('button');
  buyOption.type = 'button';
  buyOption.className = 'shop-choice-option active';
  buyOption.textContent = lang === 'de' ? `Kaufen (-🪙 ${item.price})` : `Купить (-🪙 ${item.price})`;
  if (!canBuy) {
    buyOption.disabled = true;
    buyOption.textContent += lang === 'de' ? ' · Nicht genug Gold' : ' · Недостаточно золота';
    selected = 'free';
  }

  const freeOption = document.createElement('button');
  freeOption.type = 'button';
  freeOption.className = 'shop-choice-option';
  freeOption.textContent = lang === 'de' ? 'Kostenlos erhalten' : 'Получить бесплатно';

  function updateSelection() {
    buyOption.classList.toggle('active', selected === 'buy');
    freeOption.classList.toggle('active', selected === 'free');
  }

  buyOption.onclick = () => {
    if (!buyOption.disabled) {
      selected = 'buy';
      updateSelection();
    }
  };
  freeOption.onclick = () => {
    selected = 'free';
    updateSelection();
  };
  updateSelection();

  options.appendChild(buyOption);
  options.appendChild(freeOption);

  const actions = document.createElement('div');
  actions.className = 'shop-choice-actions';

  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  confirmBtn.className = 'shop-choice-confirm';
  confirmBtn.textContent = lang === 'de' ? 'Bestätigen' : 'Подтвердить';
  confirmBtn.onclick = () => {
    closeShopChoiceOverlay();
    addItemToInventory(item, selected === 'free', openItemId === item.id ? item.id : null);
  };

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'shop-choice-cancel';
  cancelBtn.textContent = lang === 'de' ? 'Abbrechen' : 'Отмена';
  cancelBtn.onclick = () => closeShopChoiceOverlay();

  actions.appendChild(confirmBtn);
  actions.appendChild(cancelBtn);

  box.appendChild(title);
  box.appendChild(options);
  box.appendChild(actions);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

function closeItemTransferOverlay() {
  const overlay = document.getElementById('item-transfer-overlay');
  if (overlay) overlay.remove();
}

function showItemTransferOverlay(item) {
  closeItemTransferOverlay();
  if (!sessionCode || typeof getTransferTargets !== 'function') return;

  const targets = getTransferTargets();
  if (!targets.length) return;

  const overlay = document.createElement('div');
  overlay.id = 'item-transfer-overlay';
  overlay.onclick = () => closeItemTransferOverlay();

  const box = document.createElement('div');
  box.className = 'item-transfer-box';
  box.addEventListener('click', e => e.stopPropagation());

  const title = document.createElement('h3');
  title.textContent = lang === 'de' ? `Weitergeben: ${item.nameDe}` : `Передать: ${item.nameRu}`;
  box.appendChild(title);

  const list = document.createElement('div');
  list.className = 'item-transfer-list';

  const heroIcons = { HA: '🪓', DE: '💥', VW: '🌀', RG: '🛡' };
  targets.forEach(([targetId, p]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'item-transfer-target';
    btn.textContent = `${p.hero ? heroIcons[p.hero] : '❓'} ${p.name || '?'}`;
    btn.onclick = () => {
      if (typeof transferItemToPlayer === 'function') transferItemToPlayer(item.id, targetId);
      closeItemTransferOverlay();
      closeItemModalDirect();
      finalizeShopUpdate();
    };
    list.appendChild(btn);
  });

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'item-transfer-cancel';
  cancelBtn.textContent = lang === 'de' ? 'Abbrechen' : 'Отмена';
  cancelBtn.onclick = () => closeItemTransferOverlay();

  box.appendChild(list);
  box.appendChild(cancelBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

function hasTransferTargets() {
  return sessionCode && typeof getTransferTargets === 'function' && getTransferTargets().length > 0;
}

function resetShop() {
  lsSet('shop_unlocked', []);
  setShopInventory([]);
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
  const always = Array.from({ length: 13 }, (_, i) => String(i + 1).padStart(3, '0'));
  const extra = lsGet('shop_unlocked', []);
  return new Set([...always, ...extra]);
}

function unlockShopBatch(batch) {
  const ranges = { b: [15, 20], c: [21, 28] };
  const [from, to] = ranges[batch];
  const extra = lsGet('shop_unlocked', []);
  for (let i = from; i <= to; i++) {
    const id = String(i).padStart(3, '0');
    if (!extra.includes(id)) extra.push(id);
  }
  lsSet('shop_unlocked', extra);
  updateUnlockBtns();
  renderItemsGrid();
}

function unlockSingleItem() {
  const input = document.getElementById('shop-unlock-input');
  const num = parseInt(input.value, 10);
  if (!num || num < 1 || num > 36) return;
  const id = String(num).padStart(3, '0');
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
  const hasB = [15, 16, 17, 18, 19, 20].every(i => extra.includes(String(i).padStart(3, '0')));
  const hasC = [21, 22, 23, 24, 25, 26, 27, 28].every(i => extra.includes(String(i).padStart(3, '0')));
  const btnB = document.getElementById('btn-unlock-b');
  const btnC = document.getElementById('btn-unlock-c');
  if (btnB) { btnB.classList.toggle('unlocked', hasB); if (hasB) btnB.disabled = true; }
  if (btnC) { btnC.classList.toggle('unlocked', hasC); if (hasC) btnC.disabled = true; }
}

function renderItemsGrid() {
  const grid = document.getElementById('items-grid');
  grid.innerHTML = '';
  const visible = getVisibleItemIds();

  ITEMS.filter(item => visible.has(item.id)).forEach(item => {
    const owned = isItemOwned(item.id);
    const stock = getShopStock(item.id);
    const name = lang === 'de' ? item.nameDe : item.nameRu;
    const canAdd = owned || stock > 0;

    const el = document.createElement('div');
    el.className = 'item-card' + (owned ? ' owned' : '');
    el.onclick = () => openItemModal(item);
    el.innerHTML = `
      <img src="./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/items/${item.id}.png" alt="${item.id}"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="img-placeholder" style="display:none"><div class="ph-num">${item.id}</div>${name}</div>
      <div class="item-card-info">
        <div class="item-card-name">${name}</div>
        <div class="item-card-price">🪙 ${item.price}${sessionCode ? ` · x${stock}` : ''}</div>
      </div>
      <button class="card-add-btn${owned ? ' in-deck' : ''}" aria-label="${owned ? 'Remove' : 'Buy'}" ${canAdd ? '' : 'disabled'}>${owned ? '✓' : '+'}</button>`;

    const addBtn = el.querySelector('.card-add-btn');
    addBtn.addEventListener('click', e => {
      e.stopPropagation();
      toggleItemFromGrid(item);
    });
    addBtn.addEventListener('touchend', e => { e.stopPropagation(); });
    grid.appendChild(el);
  });
}

function renderOwnedGrid() {
  const grid = document.getElementById('owned-grid');
  const empty = document.getElementById('owned-empty');
  grid.innerHTML = '';

  const inv = getShopInventory();
  const ownedItems = ITEMS.filter(item => inv.includes(item.id) && getVisibleItemIds().has(item.id));
  if (!ownedItems.length) {
    empty.classList.remove('hidden');
    empty.textContent = lang === 'de' ? 'Keine gekauften Gegenstände.' : 'Нет купленных предметов.';
    return;
  }

  empty.classList.add('hidden');
  ownedItems.forEach(item => {
    const name = lang === 'de' ? item.nameDe : item.nameRu;
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
      <div class="item-card-actions">
        <button class="item-card-action-btn sell" type="button">${lang === 'de' ? 'Verkaufen' : 'Продать'}</button>
        ${hasTransferTargets() ? `<button class="item-card-action-btn transfer" type="button">${lang === 'de' ? '🤝 Weitergeben' : '🤝 Передать'}</button>` : ''}
      </div>`;

    const sellBtn = el.querySelector('.item-card-action-btn.sell');
    sellBtn.addEventListener('click', e => {
      e.stopPropagation();
      removeItemFromInventory(item);
    });

    const transferBtn = el.querySelector('.item-card-action-btn.transfer');
    if (transferBtn) {
      transferBtn.addEventListener('click', e => {
        e.stopPropagation();
        showItemTransferOverlay(item);
      });
    }

    grid.appendChild(el);
  });
}

function getShopNavItems() {
  const visible = getVisibleItemIds();
  if (shopView === 'owned') {
    const inv = getShopInventory();
    return ITEMS.filter(x => inv.includes(x.id));
  }
  return ITEMS.filter(x => visible.has(x.id));
}

function openItemModal(item) {
  openItemId = item.id;
  const owned = isItemOwned(item.id);
  const stock = getShopStock(item.id);

  document.getElementById('item-modal-img').src = `./assets/cards/${lang === 'de' ? 'deu' : 'ru'}/items/${item.id}.png`;
  document.getElementById('item-modal-title').textContent = lang === 'de' ? item.nameDe : item.nameRu;
  document.getElementById('item-modal-price').textContent = `🪙 ${item.price}${sessionCode ? ` · x${stock}` : ''}`;
  document.getElementById('item-modal-desc').textContent = lang === 'de' ? item.descDe : item.descRu;

  const btn = document.getElementById('item-modal-buy-btn');
  if (owned) {
    btn.textContent = lang === 'de' ? '✓ Verkaufen' : '✓ Продать';
    btn.className = 'btn-primary remove';
    btn.disabled = false;
  } else if (sessionCode && stock <= 0) {
    btn.textContent = lang === 'de' ? 'Nicht auf Lager' : 'Нет в наличии';
    btn.className = 'btn-primary';
    btn.disabled = true;
  } else {
    btn.textContent = lang === 'de' ? '🛒 Kaufen' : '🛒 Купить';
    btn.className = 'btn-primary';
    btn.disabled = false;
  }

  const navItems = getShopNavItems();
  const idx = navItems.findIndex(x => x.id === item.id);
  document.getElementById('item-nav-prev').disabled = idx <= 0;
  document.getElementById('item-nav-next').disabled = idx >= navItems.length - 1;
  document.getElementById('item-modal').classList.add('open');
}

function navigateItemModal(delta) {
  const navItems = getShopNavItems();
  const idx = navItems.findIndex(x => x.id === openItemId);
  const next = navItems[idx + delta];
  if (next) openItemModal(next);
}

function toggleItemOwned() {
  if (!openItemId) return;
  const item = ITEMS.find(x => x.id === openItemId);
  if (!item) return;

  if (isItemOwned(item.id)) {
    removeItemFromInventory(item, item.id);
    return;
  }

  if (sessionCode) {
    showShopChoiceOverlay(item);
    return;
  }

  let inv = getShopInventory();
  inv = inv.includes(openItemId) ? inv.filter(id => id !== openItemId) : [...inv, openItemId];
  setShopInventory(inv);
  finalizeShopUpdate(item.id);
}

function toggleItemFromGrid(item) {
  if (isItemOwned(item.id)) {
    removeItemFromInventory(item);
    return;
  }

  if (sessionCode) {
    if (getShopStock(item.id) <= 0) return;
    showShopChoiceOverlay(item);
    return;
  }

  let inv = getShopInventory();
  inv = inv.includes(item.id) ? inv.filter(id => id !== item.id) : [...inv, item.id];
  setShopInventory(inv);
  finalizeShopUpdate(openItemId === item.id ? item.id : null);
}

function closeItemModal(e) {
  if (e.target === document.getElementById('item-modal')) closeItemModalDirect();
}

function closeItemModalDirect() {
  document.getElementById('item-modal').classList.remove('open');
}
