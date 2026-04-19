// ─── State ───────────────────────────────────────────
let lang = 'ru';
let activeChar = null;
let activeCardFilter = 'all';
let cardsView = 'all';
let openCardId = null;
let activeShopChar = null;
let openItemId = null;
let currentScenario = parseInt(localStorage.getItem("gh_scenario") || "1");
function lsGet(key, def) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : def; } catch { return def; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function getDeck(code) { return lsGet(`deck_${code}`, []); }
function setDeck(code, arr) { lsSet(`deck_${code}`, arr); }
function getInventory(code) { return lsGet(`inv_${code || 'global'}`, []); }
function setInventory(code, arr) { lsSet(`inv_${code || 'global'}`, arr); }
function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
