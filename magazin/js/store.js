/* Állapot (localStorage) + képek (IndexedDB). Minden a felhasználó böngészőjében marad. */
const LS = 'eskuvoi_magazin_v1';
const IMG = {};            /* id -> objectURL */
let db = null;

export function openDB() {
  return new Promise(res => {
    try {
      const r = indexedDB.open('eskuvoi_magazin', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('imgs');
      r.onsuccess = () => { db = r.result; res(); };
      r.onerror = () => res();
    } catch (e) { res(); }
  });
}
function tx(mode) { return db.transaction('imgs', mode).objectStore('imgs'); }
export function putBlob(id, blob) {
  IMG[id] = URL.createObjectURL(blob);
  if (!db) return Promise.resolve(id);
  return new Promise(res => { const r = tx('readwrite').put(blob, id); r.onsuccess = r.onerror = () => res(id); });
}
export function getBlob(id) {
  if (!db) return Promise.resolve(null);
  return new Promise(res => { const r = tx('readonly').get(id); r.onsuccess = () => res(r.result || null); r.onerror = () => res(null); });
}
export async function preload(ids) {
  await Promise.all(ids.filter(id => !IMG[id]).map(async id => { const b = await getBlob(id); if (b) IMG[id] = URL.createObjectURL(b); }));
}
export function resolveImg(p) {
  if (!p) return null;
  if (p.src) return p.src;
  if (p.id) return IMG[p.id] || null;
  return null;
}

/* Fájl → kicsinyített JPEG → IndexedDB. Visszaad egy fotó-objektumot. */
export function fileToPhoto(file, max = 2000) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(im.naturalWidth * k); c.height = Math.round(im.naturalHeight * k);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => {
        const id = 'img_' + Math.random().toString(36).slice(2, 10);
        putBlob(id, b).then(() => res({ id, pos: '50% 40%', z: 1 }));
      }, 'image/jpeg', 0.88);
    };
    im.onerror = rej; im.src = url;
  });
}

export function collectIds(o, out = new Set()) {
  if (o && typeof o === 'object') {
    if (typeof o.id === 'string' && o.id.startsWith('img_')) out.add(o.id);
    for (const k in o) collectIds(o[k], out);
  }
  return out;
}

export function saveState(st) { try { localStorage.setItem(LS, JSON.stringify(st)); return true; } catch (e) { return false; } }
export function loadState() { try { const r = localStorage.getItem(LS); return r ? JSON.parse(r) : null; } catch (e) { return null; } }

/* Teljes projekt fájlba (képekkel együtt) és vissza */
const toB64 = b => new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); });
export async function exportProject(st) {
  const out = JSON.parse(JSON.stringify(st)); out.images = {};
  for (const id of collectIds(st)) { const b = await getBlob(id); if (b) out.images[id] = await toB64(b); }
  return new Blob([JSON.stringify(out)], { type: 'application/json' });
}
export async function importProject(text) {
  const o = JSON.parse(text);
  if (!o || !o.data || !o.on) throw new Error('nem magazin-fájl');
  const imgs = o.images || {}; delete o.images;
  for (const id in imgs) { const b = await (await fetch(imgs[id])).blob(); await putBlob(id, b); }
  return o;
}
