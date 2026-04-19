function updateRulesLang(l) {
  const el = document.getElementById('tab-rules');
  if (!el) return;
  const heading = el.querySelector('.section-title');
  if (heading) heading.textContent = l === 'de' ? '📋 Regelübersicht' : '📋 Памятка по правилам';
  el.querySelectorAll('[data-ru]').forEach(node => {
    node.textContent = l === 'de' ? node.dataset.de : node.dataset.ru;
  });
}
