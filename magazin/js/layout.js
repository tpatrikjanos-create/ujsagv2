/* =========================================================
   TÖRDELŐ — a bekapcsolt rovatokból magazin-oldalakat rak össze.
   - full:   egy teljes oldal
   - half:   fél oldal (kettő kerül egy oldalra)
   - spread: két szemközti oldal (mindig bal oldalon kezdődik)
   - a címlap az 1., a hátlap az utolsó oldal
   - az oldalszám mindig 4-gyel osztható (füzetnyomtatás miatt)
   ========================================================= */
import { esc, HEART } from './helpers.js';

const FILLERS = [
  ctx => `<div class="filler-full">
  <div class="ttl c script">Emlékeink erről a napról</div>
  <div class="kick" style="position:absolute;top:104px;left:0;right:0;text-align:center">autogramok · jókívánságok · rajzok</div>
  <div class="lines" style="position:absolute;left:46px;right:46px;top:150px;bottom:70px;background:repeating-linear-gradient(transparent 0 33px,var(--line) 33px 34px)"></div>
</div>`,
  ctx => `<div class="ttl c script">Fotósarok</div>
  <div class="kick" style="position:absolute;top:104px;left:0;right:0;text-align:center">ragassz ide egy képet a mai napról</div>
  ${[[52,150,-4],[300,170,3],[70,440,2.5],[310,458,-3]].map(([x,y,r])=>`<div style="position:absolute;left:${x}px;top:${y}px;width:200px;height:240px;background:#fff;padding:12px 12px 44px;box-shadow:0 6px 14px -6px rgba(0,0,0,.3);transform:rotate(${r}deg)"><div style="height:100%;border:1.5px dashed var(--line)"></div></div>`).join('')}`,
  ctx => `<div style="position:absolute;left:60px;right:60px;top:60px;bottom:60px;border:1px solid var(--line)"><div style="position:absolute;inset:6px;border:1px solid var(--band2)"></div></div>
  <div class="ttl c script" style="top:90px">Jókívánságok</div>
  <div class="kick" style="position:absolute;top:164px;left:0;right:0;text-align:center">az ifjú párnak — tőletek</div>
  <div style="position:absolute;left:96px;right:96px;top:210px;bottom:110px;background:repeating-linear-gradient(transparent 0 37px,var(--line) 37px 38px)"></div>
  <div style="position:absolute;bottom:80px;left:0;right:0;text-align:center;color:var(--soft);font-size:18px">♡</div>`
];
let fillerN = 0;
const fillerFull = ctx => FILLERS[fillerN++ % FILLERS.length](ctx);
const fillerHalf = ctx => `<div class="ttl script">Jegyzetek</div>
  <div style="position:absolute;left:46px;right:46px;top:96px;bottom:34px;background:repeating-linear-gradient(transparent 0 31px,var(--line) 31px 32px)"></div>`;

export function buildPages(st, ROV, ctx) {
  fillerN = 0;
  const byId = Object.fromEntries(ROV.map(r => [r.id, r]));
  const render = (r, extra) => {
    try { return r.render(st.data[r.id] || {}, ctx, extra); }
    catch (e) { console.error(r.id, e); return `<div style="padding:40px;color:#b00">Hiba a(z) „${esc(r.title)}” rovatban</div>`; }
  };
  const pages = [];
  pages.push({ html: render(byId.cimlap), rovat: 'cimlap' });

  const items = st.order.filter(id => st.on[id] && byId[id] && !byId[id].fixed).map(id => byId[id]);
  let pendingHalf = null;
  const queue = items.slice();
  while (queue.length) {
    const r = queue.shift();
    if (r.size === 'half') {
      if (pendingHalf) { pages.push(halfPage(pendingHalf, r)); pendingHalf = null; }
      else pendingHalf = r;
      continue;
    }
    if (r.size === 'spread') {
      /* a következő oldal bal (páros) legyen; ha nem az, előrehozunk egy egész oldalas rovatot vagy a fél oldalt */
      if ((pages.length + 1) % 2 === 1) {
        const ix = queue.findIndex(q => q.size === 'full');
        if (pendingHalf) { pages.push(halfPage(pendingHalf, null)); pendingHalf = null; }
        else if (ix >= 0) { const f = queue.splice(ix, 1)[0]; pages.push({ html: render(f), rovat: f.id }); }
        else pages.push({ html: fillerFull(ctx), rovat: null });
      }
      const [L, R] = render(r);
      pages.push({ html: L, rovat: r.id }, { html: R, rovat: r.id });
      continue;
    }
    pages.push({ html: render(r), rovat: r.id });
  }
  if (pendingHalf) pages.push(halfPage(pendingHalf, null));

  /* hátlappal együtt 4-gyel osztható oldalszám */
  while ((pages.length + 1) % 4 !== 0) pages.push({ html: fillerFull(ctx), rovat: null, filler: true });
  pages.push({ html: render(byId.zaro), rovat: 'zaro' });
  return pages;

  function halfPage(a, b) {
    return {
      html: `<div class="half top" data-rovat="${a.id}">${render(a)}</div><div class="half-sep"></div>
             <div class="half bot" ${b ? `data-rovat="${b.id}"` : ''}>${b ? render(b) : fillerHalf(ctx)}</div>`,
      rovat: a.id, rovat2: b ? b.id : null
    };
  }
}

/* Füzet-sorrend: N oldal → N/4 lap, lapszélességben kétoldalt.
   Előlap: [N, 1], hátlap: [2, N-1], előlap: [N-2, 3] ... (1-től számozva) */
export function bookletSheets(n) {
  const out = [];
  for (let i = 0; i < n / 4; i++) {
    out.push([n - 2 * i, 1 + 2 * i]);
    out.push([2 + 2 * i, n - 1 - 2 * i]);
  }
  return out;
}
