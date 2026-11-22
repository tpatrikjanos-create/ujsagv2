/* Közös segédfüggvények a rovatoknak és a szerkesztőnek. */
import { resolveImg } from './store.js';
import qrcode from './vendor/qrcode.mjs';

/* A QR-könyvtár alapból nem UTF-8-at kódol — ékezetes linkeknél ez kell. */
qrcode.stringToBytes = s => Array.from(new TextEncoder().encode(s));

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const lines = s => String(s || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
export const paras = s => lines(s).map(p => `<p>${esc(p)}</p>`).join('');
export const br = s => esc(s).replace(/\n/g, '<br>');

/* Magyar névből monogram: „Varga Zsófi” → „Zs” */
export function initials(n) {
  const p = String(n || '').trim().split(/\s+/);
  const w = p[p.length - 1] || '';
  const two = /^(Dzs|Zs|Sz|Cs|Gy|Ly|Ny|Ty|Dz)/i.exec(w);
  return two ? two[0].charAt(0).toUpperCase() + two[0].slice(1).toLowerCase() : w.charAt(0).toUpperCase();
}

/* Fotó: {src|id, pos:'x% y%', z:nagyítás}. Ha nincs kép, elegáns helykitöltő. */
export function ph(p, cls = '', style = '', label = '') {
  const url = p && resolveImg(p);
  if (!url) return `<div class="ph none ${cls}" style="${style}"><span class="ph-hint">${esc(label || 'fotó')}</span></div>`;
  const pos = p.pos || '50% 40%', z = p.z || 1;
  return `<div class="ph ${cls}" style="${style}"><i style="background-image:url('${url}');background-position:${pos};transform-origin:${pos};transform:scale(${z})"></i></div>`;
}
/* Kerek portré monogrammal, ha nincs kép */
export function avatar(p, name, cls = '') {
  const url = p && resolveImg(p);
  if (url) return `<div class="av ${cls}">${ph(p)}</div>`;
  return `<div class="av ${cls}"><div class="mono">${esc(initials(name))}</div></div>`;
}

export const HEART = '<svg viewBox="0 0 24 22"><path d="M12 21.5S1.5 14.8 1.5 7.4A5.4 5.4 0 0 1 12 4.6a5.4 5.4 0 0 1 10.5 2.8C22.5 14.8 12 21.5 12 21.5z"/></svg>';
export const STAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg>';
export const SPRIG = '<svg viewBox="0 0 120 40" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M4 30C30 26 70 18 116 8"/><path d="M28 26c-2-8 4-14 10-14-1 7-5 12-10 14zM50 21c0-8 7-13 13-12-2 7-7 11-13 12zM74 16c1-8 8-12 14-10-3 6-8 10-14 10zM40 25c6-4 14-3 18 2-6 3-13 2-18-2zM64 19c6-4 14-2 17 3-6 2-13 1-17-3z"/></svg>';

/* Magyar dátum */
const HM = ['január','február','március','április','május','június','július','augusztus','szeptember','október','november','december'];
export function huDate(iso, opt = {}) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return iso || '';
  return `${m[1]}. ${HM[+m[2] - 1]} ${+m[3]}.`;
}
export function dateParts(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return null;
  return { y: m[1], yy: m[1].slice(2), mm: m[2], dd: m[3] };
}

/* Determinisztikus véletlen (ugyanaz az adat → ugyanaz a rejtvény) */
export function rng(seedStr) {
  let h = 2166136261; for (const c of String(seedStr)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
}

/* Vonalkód (díszítés) */
export function barcode(seed, w = 150, h = 40) {
  const r = rng(seed); let x = 2, out = '';
  while (x < w - 4) { const bw = 1 + Math.floor(r() * 3); out += `<rect x="${x}" y="0" width="${bw}" height="${h}"/>`; x += bw + 1 + Math.floor(r() * 3); }
  return `<svg width="${w}" height="${h}" fill="#111">${out}</svg>`;
}

/* QR-kód SVG-ben, a megadott színnel */
export function qrSvg(text, size = 150, color = '#222') {
  if (!text) return '';
  try {
    const q = qrcode(0, 'M'); q.addData(text, 'Byte'); q.make();
    const n = q.getModuleCount(), c = size / n; let d = '';
    for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (q.isDark(r, k)) d += `M${(k * c).toFixed(2)} ${(r * c).toFixed(2)}h${c.toFixed(2)}v${c.toFixed(2)}h-${c.toFixed(2)}z`;
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><path d="${d}" fill="${color}"/></svg>`;
  } catch (e) { return ''; }
}
