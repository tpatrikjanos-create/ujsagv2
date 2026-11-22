/* =========================================================
   SZERKESZTŐ — rovatlista, űrlapok, előnézet, nyomtatás
   ========================================================= */
import { ROVATOK, GROUPS, DEFAULT_ORDER } from '../rovatok/index.js';
import { buildPages, bookletSheets } from './layout.js';
import { esc } from './helpers.js';
import * as store from './store.js';

const $ = id => document.getElementById(id);
const BY = Object.fromEntries(ROVATOK.map(r => [r.id, r]));
const clone = o => JSON.parse(JSON.stringify(o));
const SIZE_LBL = { full: 'egész oldal', half: 'fél oldal', spread: '2 oldal' };

/* ---------------- állapot ---------------- */
function freshState(empty) {
  const data = {}, on = {};
  for (const r of ROVATOK) { data[r.id] = empty && !['alap', 'cimlap'].includes(r.id) ? emptyOf(r) : clone(r.sample || {}); on[r.id] = true; }
  if (empty) { data.cimlap.foto = null; }
  return { v: 1, pal: 'sage', bw: false, view: 'flip', on, order: DEFAULT_ORDER.slice(), data };
}
function emptyOf(r) {
  const o = {};
  for (const f of r.fields || []) o[f.k] = f.type === 'rows' || f.type === 'photos' ? [] : (f.type === 'photo' ? null : (r.sample && f.type === 'select' ? r.sample[f.k] : ''));
  return o;
}
let ST = store.loadState() || freshState(false);
/* új rovatok felvétele egy régebbi mentésbe */
for (const r of ROVATOK) {
  if (!ST.data[r.id]) ST.data[r.id] = clone(r.sample || {});
  if (ST.on[r.id] === undefined) ST.on[r.id] = true;
  if (!r.fixed && !ST.order.includes(r.id)) {
    const di = DEFAULT_ORDER.indexOf(r.id), prev = DEFAULT_ORDER.slice(0, Math.max(0, di)).reverse().find(id => ST.order.includes(id));
    ST.order.splice(prev ? ST.order.indexOf(prev) + 1 : ST.order.length, 0, r.id);
  }
}
ST.order = ST.order.filter(id => BY[id] && !BY[id].fixed);

let saveT;
function save() { clearTimeout(saveT); saveT = setTimeout(() => { if (!store.saveState(ST)) toast('Nem sikerült menteni a böngészőbe'); }, 300); }

/* ---------------- rovat-stílusok betöltése ---------------- */
$('rovatCss').textContent = ROVATOK.map(r => r.css || '').join('\n');

/* ---------------- segédek ---------------- */
function toast(t, ms = 2400) { const e = $('toast'); e.textContent = t; e.classList.add('on'); clearTimeout(e._t); e._t = setTimeout(() => e.classList.remove('on'), ms); }
function meta() {
  const a = ST.data.alap || {};
  return { n1: a.nev1 || '', n2: a.nev2 || '', names: [a.nev1, a.nev2].filter(Boolean).join(' & '), datum: a.datum || '', helyszin: a.helyszin || '' };
}
function applyLook() {
  document.body.classList.remove('pal-sage', 'pal-blush', 'pal-noir');
  document.body.classList.add('pal-' + ST.pal);
  document.body.classList.toggle('bw', !!ST.bw);
  for (const [seg, val] of [['segPal', ST.pal], ['segBw', ST.bw ? '1' : '0'], ['segView', ST.view]])
    $(seg).querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === val));
}

/* Szöveg automatikus kicsinyítése, ha nem fér ki a dobozába */
function fitAll(root) {
  root.querySelectorAll('.fit').forEach(el => {
    el.style.fontSize = '';
    let fs = parseFloat(getComputedStyle(el).fontSize), n = 0;
    const over = () => el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;
    while (over() && fs > 7 && n < 50) { fs -= 0.5; el.style.fontSize = fs + 'px'; n++; }
  });
}

/* ---------------- oldalak ---------------- */
let PAGES = [], SPREAD = 0, OPEN = null;
function pageHtml(p, i, n) {
  const side = i === 0 ? 'r' : (i % 2 ? 'l' : 'r');
  const folio = i > 0 && i < n - 1 ? `<div class="folio">${i + 1}</div>` : '';
  return `<div class="page ${side}" data-ix="${i}" ${p.rovat2 === undefined && p.rovat ? `data-rovat="${p.rovat}"` : ''}>${p.html}${folio}</div>`;
}
function spreadsOf(n) {
  const mob = window.innerWidth < 760;
  if (mob) return Array.from({ length: n }, (_, i) => ({ pages: [i], mob: true }));
  const out = [{ pages: [0], cls: 'single-r' }];
  for (let i = 1; i < n - 1; i += 2) out.push({ pages: [i, i + 1] });
  out.push({ pages: [n - 1], cls: 'single-l' });
  return out;
}
function capOf(s) {
  return s.pages.map(i => { const p = PAGES[i]; if (i === 0) return 'Címlap'; if (i === PAGES.length - 1) return 'Hátlap'; if (!p.rovat) return 'Jegyzetoldal (kitöltés)'; return [p.rovat, p.rovat2].filter(Boolean).map(id => BY[id].title).join(' + '); })
    .filter((v, i, a) => a.indexOf(v) === i).join(' · ');
}
function renderPreview(keepSpread) {
  PAGES = buildPages(ST, ROVATOK, { meta: meta() });
  const n = PAGES.length, SP = spreadsOf(n), pv = $('preview');
  if (!keepSpread && OPEN) { const ix = PAGES.findIndex(p => p.rovat === OPEN || p.rovat2 === OPEN); if (ix >= 0) SPREAD = SP.findIndex(s => s.pages.includes(ix)); }
  SPREAD = Math.max(0, Math.min(SPREAD, SP.length - 1));
  const list = ST.view === 'flip' ? [SP[SPREAD]] : SP;
  pv.innerHTML = list.map(s => `<div class="spread-wrap"><div class="spread ${s.cls || ''} ${s.mob ? 'mob' : ''} ${ST.view === 'flip' ? 'turn' : ''}">${s.pages.map(i => pageHtml(PAGES[i], i, n)).join('')}</div></div><div class="spcap">${esc(capOf(s))}</div>`).join('')
    + (ST.view === 'flip' ? `<div class="nav"><button id="pv">‹</button><div class="cnt">${SP[SPREAD].pages.map(i => i + 1).join('–')}. oldal / ${n}</div><button id="nx">›</button></div>` : '');
  if (ST.view === 'flip') { $('pv').disabled = SPREAD === 0; $('nx').disabled = SPREAD === SP.length - 1; $('pv').onclick = () => go(-1); $('nx').onclick = () => go(1); }
  scalePreview(); fitAll(pv); highlight();
  if (document.fonts) document.fonts.ready.then(() => fitAll(pv));
}
function scalePreview() {
  const pv = $('preview'), W0 = window.innerWidth < 760 ? 560 : 1120;
  const aw = pv.clientWidth - 32, ah = window.innerHeight - 190;
  pv.querySelectorAll('.spread').forEach(s => {
    const k = Math.min(1, aw / W0, ST.view === 'flip' ? Math.max(.3, ah / 794) : 1);
    s.style.transform = `scale(${k})`; s.parentNode.style.width = W0 * k + 'px'; s.parentNode.style.height = 794 * k + 'px';
  });
}
function go(d) { SPREAD += d; renderPreview(true); }
function highlight() {
  document.querySelectorAll('.sel-hl').forEach(e => e.classList.remove('sel-hl'));
  if (!OPEN) return;
  document.querySelectorAll(`#preview [data-rovat="${OPEN}"]`).forEach(e => e.classList.add('sel-hl'));
}
$('preview').addEventListener('click', e => {
  const t = e.target.closest('[data-rovat]'); if (!t) return;
  const id = t.dataset.rovat; if (id && BY[id]) { openForm(id); if (window.innerWidth <= 860) $('panel').classList.add('on'); }
});
let rT; const rerender = () => { clearTimeout(rT); rT = setTimeout(() => renderPreview(true), 140); };

/* ---------------- rovatlista ---------------- */
function renderList() {
  OPEN = null; highlight();
  const onCount = ST.order.filter(id => ST.on[id]).length;
  let h = `<div class="list-head"><h2>Rovatok</h2><p>Kapcsold be, amit szeretnél, kattints a névre a kitöltéshez. A sorrendet a nyilakkal állíthatod — a tördelés automatikus.</p>
    <div class="stats">${onCount} rovat bekapcsolva · ${PAGES.length || '…'} oldal (A5 füzet)</div></div>`;
  h += `<div class="grp-h">Alap</div>` + ['alap', 'cimlap', 'zaro'].map(id => `<div class="ri" data-open="${id}"><div class="rt">${esc(BY[id].title)}<small>${esc(BY[id].desc || '')}</small></div><span class="sz">${id === 'alap' ? 'adatok' : 'fix'}</span></div>`).join('');
  for (const g of GROUPS) {
    const ids = ST.order.filter(id => BY[id].group === g); if (!ids.length) continue;
    h += `<div class="grp-h">${g}</div>` + ids.map(id => { const r = BY[id]; return `<div class="ri ${ST.on[id] ? '' : 'off'}" data-open="${id}">
      <label class="tgl" data-stop><input type="checkbox" data-tog="${id}" ${ST.on[id] ? 'checked' : ''}><span></span></label>
      <div class="rt">${esc(r.title)}<small>${esc(r.desc || '')}</small></div><span class="sz">${SIZE_LBL[r.size]}</span>
      <div class="mv" data-stop><button data-up="${id}" title="Előrébb">▲</button><button data-dn="${id}" title="Hátrébb">▼</button></div></div>`; }).join('');
  }
  $('panelIn').innerHTML = h;
}
$('panelIn').addEventListener('click', e => {
  const tog = e.target.closest('[data-tog]'); if (tog) { ST.on[tog.dataset.tog] = tog.checked; save(); renderPreview(); renderList(); return; }
  if (e.target.closest('[data-stop]') && !e.target.closest('[data-up],[data-dn]')) return;
  const up = e.target.closest('[data-up]'), dn = e.target.closest('[data-dn]');
  if (up || dn) { const id = (up || dn).dataset[up ? 'up' : 'dn'], i = ST.order.indexOf(id), j = i + (up ? -1 : 1); if (j >= 0 && j < ST.order.length) { [ST.order[i], ST.order[j]] = [ST.order[j], ST.order[i]]; save(); renderPreview(); renderList(); } return; }
  const op = e.target.closest('[data-open]'); if (op) openForm(op.dataset.open);
});

/* ---------------- űrlap ---------------- */
function thumbStyle(p) { const u = store.resolveImg(p); return u ? `background-image:url('${u}');background-position:${p.pos || '50% 50%'}` : ''; }
function fieldHtml(f, val, path) {
  const P = esc(JSON.stringify(path));
  const lbl = `<label>${esc(f.label)}</label>`, hint = f.hint ? `<div class="hint">${esc(f.hint)}</div>` : '';
  switch (f.type) {
    case 'text': return `<div class="fld ${f.w ? 'w' : ''}" ${f.w ? `style="width:${f.w + 30}px"` : ''}>${lbl}<input type="text" data-p="${P}" value="${esc(val)}" placeholder="${esc(f.ph || '')}">${hint}</div>`;
    case 'area': return `<div class="fld">${lbl}<textarea data-p="${P}" rows="${f.rows || 3}" placeholder="${esc(f.ph || '')}">${esc(val)}</textarea>${hint}</div>`;
    case 'date': return `<div class="fld">${lbl}<input type="date" data-p="${P}" value="${esc(val)}">${hint}</div>`;
    case 'color': return `<div class="fld w">${lbl}<input type="color" data-p="${P}" value="${esc(val || '#cccccc')}"></div>`;
    case 'check': return `<div class="fld w"><label class="chk"><input type="checkbox" data-p="${P}" ${val ? 'checked' : ''}> ${esc(f.label)}</label></div>`;
    case 'select': return `<div class="fld">${lbl}<select data-p="${P}">${f.opts.map(([v, t]) => `<option value="${esc(v)}" ${v === val ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select></div>`;
    case 'photo': return `<div class="fld">${lbl}<div class="phf"><div class="th" style="${thumbStyle(val)}">${val ? '' : '＋'}</div><div class="ctl">
      <button class="btn sm" data-ph="${P}">${val ? 'Csere' : 'Fotó feltöltése'}</button>
      ${val ? `<button class="btn sm ghost" data-nudge="${P}" data-d="0,-6" title="Feljebb">↑</button><button class="btn sm ghost" data-nudge="${P}" data-d="0,6" title="Lejjebb">↓</button><button class="btn sm ghost" data-nudge="${P}" data-d="-6,0" title="Balra">←</button><button class="btn sm ghost" data-nudge="${P}" data-d="6,0" title="Jobbra">→</button><button class="btn sm ghost" data-zoom="${P}" data-d="0.15" title="Nagyítás">＋</button><button class="btn sm ghost" data-zoom="${P}" data-d="-0.15" title="Kicsinyítés">－</button><button class="btn sm ghost" data-del="${P}" title="Törlés">✕</button>` : ''}
      </div></div>${hint}</div>`;
    case 'photos': return `<div class="fld">${lbl}<div class="phs">${(val || []).map((p, i) => `<div class="it"><div class="th" style="${thumbStyle(p)}"></div><b data-delat="${P}" data-i="${i}">✕</b></div>`).join('')}
      ${(val || []).length < (f.max || 9) ? `<button class="add" data-phs="${P}" data-max="${f.max || 9}">＋</button>` : ''}</div>${hint}</div>`;
    case 'rows': {
      const rows = val || [];
      return `<div class="fld">${lbl}${rows.map((row, i) => `<div class="rowbox"><div class="rhd"><span>${i + 1}.</span>
        <button data-rup="${P}" data-i="${i}" title="Fel">▲</button><button data-rdn="${P}" data-i="${i}" title="Le">▼</button><button data-rdel="${P}" data-i="${i}" title="Törlés">✕</button></div>
        <div class="sub">${f.fields.map(sf => fieldHtml(sf, row[sf.k], path.concat(i, sf.k))).join('')}</div></div>`).join('')}
        ${rows.length < (f.max || 20) ? `<button class="addrow" data-radd="${P}">＋ Új sor</button>` : ''}${hint}</div>`;
    }
  }
  return '';
}
function getAt(path) { let o = ST.data; for (const k of path.slice(0, -1)) { if (o[k] == null) o[k] = typeof path[path.indexOf(k) + 1] === 'number' ? [] : {}; o = o[k]; } return [o, path[path.length - 1]]; }
function fieldDef(path) {
  const r = BY[path[0]]; let f = r.fields.find(x => x.k === path[1]);
  if (path.length > 3 && f.type === 'rows') f = f.fields.find(x => x.k === path[3]);
  return f;
}
function openForm(id) {
  OPEN = id; const r = BY[id], d = ST.data[id] || (ST.data[id] = {});
  $('panelIn').innerHTML = `<div class="fh"><button class="btn sm" id="back">← Rovatok</button><h2>${esc(r.title)}</h2>
    ${r.fixed ? '' : `<label class="tgl"><input type="checkbox" data-tog2="${id}" ${ST.on[id] ? 'checked' : ''}><span></span></label>`}</div>
    <div class="fdesc">${esc(r.desc || '')}${r.size ? ` · <b>${SIZE_LBL[r.size]}</b>` : ''}</div>
    <div class="form">${r.fields.map(f => fieldHtml(f, d[f.k], [id, f.k])).join('')}</div>`;
  $('back').onclick = () => { renderList(); if (window.innerWidth <= 860) $('panel').classList.add('on'); };
  $('panel').scrollTop = 0;
  renderPreview(false);
}
const pathOf = el => JSON.parse(el.dataset.p || el.dataset.ph || el.dataset.nudge || el.dataset.zoom || el.dataset.del || el.dataset.phs || el.dataset.delat || el.dataset.radd || el.dataset.rup || el.dataset.rdn || el.dataset.rdel);
$('panelIn').addEventListener('input', e => {
  const el = e.target; if (!el.dataset.p) return;
  const [o, k] = getAt(pathOf(el));
  o[k] = el.type === 'checkbox' ? el.checked : el.value; save(); rerender();
});
$('panelIn').addEventListener('change', e => {
  if (e.target.dataset.tog2) { ST.on[OPEN] = e.target.checked; save(); renderPreview(); }
  if (e.target.tagName === 'SELECT' && e.target.dataset.p) { const [o, k] = getAt(pathOf(e.target)); o[k] = e.target.value; save(); renderPreview(true); }
});
let PH_TARGET = null;
$('panelIn').addEventListener('click', e => {
  const b = e.target.closest('button,[data-delat]'); if (!b || !OPEN) return;
  const ds = b.dataset;
  if (ds.ph) { PH_TARGET = pathOf(b); $('fileImg').click(); return; }
  if (ds.phs) { PH_TARGET = pathOf(b); $('fileImgs').dataset.max = ds.max; $('fileImgs').click(); return; }
  if (ds.nudge || ds.zoom) {
    const [o, k] = getAt(pathOf(b)), p = o[k]; if (!p) return;
    if (ds.nudge) { const [dx, dy] = ds.d.split(',').map(Number); const m = (p.pos || '50% 50%').match(/[\d.]+/g).map(Number); p.pos = `${Math.max(0, Math.min(100, m[0] + dx))}% ${Math.max(0, Math.min(100, m[1] + dy))}%`; }
    else p.z = Math.max(1, Math.min(4, +((p.z || 1) + +ds.d).toFixed(2)));
    save(); renderPreview(true); const th = b.closest('.phf').querySelector('.th'); th.setAttribute('style', thumbStyle(p)); return;
  }
  if (ds.del) { const [o, k] = getAt(pathOf(b)); o[k] = null; save(); openForm(OPEN); return; }
  if (ds.delat !== undefined) { const [o, k] = getAt(pathOf(b)); o[k].splice(+ds.i, 1); save(); openForm(OPEN); return; }
  if (ds.radd) { const p = pathOf(b), [o, k] = getAt(p); (o[k] = o[k] || []).push({}); save(); openForm(OPEN); return; }
  if (ds.rdel || ds.rup || ds.rdn) {
    const p = pathOf(b), [o, k] = getAt(p), arr = o[k], i = +ds.i;
    if (ds.rdel) arr.splice(i, 1);
    else { const j = i + (ds.rup ? -1 : 1); if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; }
    save(); openForm(OPEN); return;
  }
});
$('fileImg').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f || !PH_TARGET) return;
  toast('Fotó feldolgozása…');
  const p = await store.fileToPhoto(f); const [o, k] = getAt(PH_TARGET); o[k] = p; save(); openForm(OPEN);
};
$('fileImgs').onchange = async e => {
  const max = +e.target.dataset.max || 9, files = [...e.target.files]; e.target.value = ''; if (!PH_TARGET) return;
  const [o, k] = getAt(PH_TARGET); o[k] = o[k] || [];
  toast('Fotók feldolgozása…');
  for (const f of files.slice(0, max - o[k].length)) o[k].push(await store.fileToPhoto(f));
  save(); openForm(OPEN);
};

/* ---------------- nyomtatás ---------------- */
async function doPrint(mode) {
  $('printMenu').classList.remove('on');
  const n = PAGES.length, pr = $('print');
  const one = i => pageHtml(PAGES[i], i, n);
  if (mode === 'a5') {
    pr.innerHTML = PAGES.map((_, i) => `<div class="psheet a5">${one(i)}</div>`).join('');
    $('printCss').textContent = '@page{size:148mm 210mm;margin:0}#print .psheet{width:148mm;height:210mm;overflow:hidden;break-after:page}#print .psheet:last-child{break-after:auto}#print .page{transform:scale(1.0003)}';
  } else {
    pr.innerHTML = bookletSheets(n).map(([a, b]) => `<div class="psheet bk">${one(a - 1)}${one(b - 1)}</div>`).join('');
    $('printCss').textContent = '@page{size:297mm 210mm;margin:0}#print .psheet{width:297mm;height:210mm;display:flex;overflow:hidden;break-after:page}#print .psheet:last-child{break-after:auto}#print .page{flex-shrink:0;margin:0}#print .psheet .page:first-child{margin-left:auto}#print .psheet .page:last-child{margin-right:auto}';
  }
  fitAll(pr);
  await Promise.all([...pr.querySelectorAll('.ph i')].map(i => new Promise(r => { const u = (i.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/) || [])[1]; if (!u) return r(); const im = new Image(); im.onload = im.onerror = r; im.src = u; })));
  if (mode !== 'a5') toast('Füzet: kétoldalas nyomtatás, „rövid él mentén” lapozva. Hajtsd félbe, tűzd össze!', 5000);
  setTimeout(() => { window.print(); }, 150);
}
window.addEventListener('afterprint', () => { $('print').innerHTML = ''; });
$('btnPrint').onclick = e => { e.stopPropagation(); $('printMenu').classList.toggle('on'); $('moreMenu').classList.remove('on'); };
$('printMenu').addEventListener('click', e => { const b = e.target.closest('[data-print]'); if (b) doPrint(b.dataset.print); });
$('btnMore').onclick = e => { e.stopPropagation(); $('moreMenu').classList.toggle('on'); $('printMenu').classList.remove('on'); };
document.addEventListener('click', e => { if (!e.target.closest('.dm-wrap')) document.querySelectorAll('.dmenu').forEach(m => m.classList.remove('on')); });

/* ---------------- felső sáv ---------------- */
$('segPal').onclick = e => { const b = e.target.closest('button'); if (!b) return; ST.pal = b.dataset.v; applyLook(); save(); };
$('segBw').onclick = e => { const b = e.target.closest('button'); if (!b) return; ST.bw = b.dataset.v === '1'; applyLook(); save(); };
$('segView').onclick = e => { const b = e.target.closest('button'); if (!b) return; ST.view = b.dataset.v; applyLook(); save(); renderPreview(true); };
$('btnPanel').onclick = () => $('panel').classList.toggle('on');
$('btnTools').onclick = () => document.querySelector('.appbar').classList.toggle('tools-on');
$('btnExport').onclick = async () => {
  const blob = await store.exportProject(ST), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'eskuvoi-magazin-' + (meta().names || 'projekt').replace(/[^\wáéíóöőúüű]+/gi, '-').toLowerCase() + '.json';
  document.body.appendChild(a); a.click(); a.remove(); toast('Letöltve');
};
$('btnImport').onclick = () => $('fileJson').click();
$('fileJson').onchange = async e => {
  const f = e.target.files[0]; e.target.value = ''; if (!f) return;
  try { ST = await store.importProject(await f.text()); save(); applyLook(); renderList(); renderPreview(); toast('Megnyitva'); }
  catch (err) { toast('Ez nem egy magazin-projektfájl.'); }
};
$('btnSample').onclick = () => { if (!confirm('Minden mező visszaáll a mintára. Folytatod?')) return; const look = { pal: ST.pal, bw: ST.bw, view: ST.view }; ST = Object.assign(freshState(false), look); save(); renderList(); renderPreview(); };
$('btnEmpty').onclick = () => { if (!confirm('Minden szöveg és kép törlődik (a neveket és a dátumot megtartjuk). Folytatod?')) return; const a = ST.data.alap, look = { pal: ST.pal, bw: ST.bw, view: ST.view }; ST = Object.assign(freshState(true), look); ST.data.alap = a; save(); renderList(); renderPreview(); };

document.addEventListener('keydown', e => {
  if (ST.view !== 'flip' || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
  if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1);
});
let tx = null;
$('preview').addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
$('preview').addEventListener('touchend', e => { if (tx == null || ST.view !== 'flip') return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 60) go(d < 0 ? 1 : -1); tx = null; });
let wT; window.addEventListener('resize', () => { clearTimeout(wT); wT = setTimeout(() => renderPreview(true), 150); });

/* ---------------- indulás ---------------- */
(async function init() {
  await store.openDB();
  await store.preload([...store.collectIds(ST.data)]);
  applyLook(); renderPreview(); renderList();
  if (document.fonts) document.fonts.ready.then(() => renderPreview(true));
})();
