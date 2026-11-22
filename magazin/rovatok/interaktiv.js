/* INTERAKTÍV: QR-kód, fotóvadász, telefon-bombázás, üzenet */
import { esc, br, lines, paras, qrSvg } from '../js/helpers.js';

export default [
/* ---------------------------------------------------------------- */
{
  id: 'qr', title: 'QR-kód', group: 'Interaktív', size: 'half',
  desc: 'Egy QR-kód, ami a közös fotóalbumra (vagy bármilyen linkre) visz.',
  fields: [
    { k: 'cim', label: 'Cím', type: 'text', ph: 'Oszd meg velünk!' },
    { k: 'link', label: 'Link (pl. Google Fotók album)', type: 'text', ph: 'https://…' },
    { k: 'szoveg', label: 'Magyarázat', type: 'area' },
  ],
  sample: { cim: 'Oszd meg velünk!', link: 'https://photos.app.goo.gl/minta-album', szoveg: 'Olvasd be a kódot, és töltsd fel a képeidet a közös albumba. Minden szög, minden mosoly, minden elmosódott tánckép számít!' },
  css: `
.qrk .box{position:absolute;left:50px;top:96px;width:210px;height:250px;background:#fff;padding:18px 18px 10px;box-shadow:0 8px 20px -10px rgba(0,0,0,.3);text-align:center;transform:rotate(-2deg)}
.qrk .box small{display:block;margin-top:8px;font-family:'Montserrat',sans-serif;font-size:8px;letter-spacing:.24em;color:#777}
.qrk .txt{position:absolute;top:120px;left:296px;right:36px;bottom:40px;font-size:16px;font-style:italic;line-height:1.55}
.qrk .arr{position:absolute;left:250px;top:250px;width:60px;color:var(--accent)}`,
  render(d) {
    return `<div class="qrk"><div class="ttl script">${esc(d.cim)}</div>
      <div class="box">${qrSvg(d.link, 174, '#1b1b1b') || '<div style="height:174px;display:flex;align-items:center;justify-content:center;color:#aaa;font-size:12px">add meg a linket</div>'}<small>OLVASS BE!</small></div>
      <svg class="arr" viewBox="0 0 60 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M56 6C40 4 24 14 10 32"/><path d="M8 22l2 10 10-2"/></svg>
      <div class="txt fit">${paras(d.szoveg)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'fotovadasz', title: 'Fotóvadász játék', group: 'Interaktív', size: 'half',
  desc: 'Fotóküldetések a vendégeknek — kipipálható lista.',
  fields: [
    { k: 'feladatok', label: 'Küldetések (soronként egy)', type: 'area', rows: 8 },
    { k: 'hashtag', label: 'Hashtag / hová küldjék?', type: 'text', ph: '#DorinaEsPatrik' },
  ],
  sample: { hashtag: '#DorinaÉsPatrik2027', feladatok: 'Az ifjú pár nevetve\nA legjobb táncmozdulat\nEgy szelfi a vőféllyel\nValaki, aki sír a meghatottságtól\nA legidősebb és a legfiatalabb vendég együtt\nA tortavágás pillanata\nEgy elkapott csók\nA legviccesebb arc a tánctéren' },
  css: `
.fvd .cam{position:absolute;top:30px;right:40px;width:56px;color:var(--accent)}
.fvd ul{position:absolute;top:96px;left:36px;right:36px;bottom:62px;margin:0;padding:0;list-style:none;column-count:2;column-gap:28px}
.fvd li{break-inside:avoid;display:flex;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid var(--band2);font-size:14.5px}
.fvd li::before{content:"";flex-shrink:0;width:16px;height:16px;border:1.5px solid var(--accent);border-radius:4px}
.fvd .ht{position:absolute;bottom:22px;left:0;right:0;text-align:center;font-family:'Playfair Display',serif;font-style:italic;font-size:20px;color:var(--accent)}`,
  render(d) {
    return `<div class="fvd"><div class="ttl script">Fotóvadász</div>
      <svg class="cam" viewBox="0 0 56 44" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="10" width="50" height="31" rx="5"/><circle cx="28" cy="25" r="9"/><path d="M18 10l4-7h12l4 7"/></svg>
      <ul class="fit">${lines(d.feladatok).map(s => `<li>${esc(s)}</li>`).join('')}</ul><div class="ht">Posztold: ${esc(d.hashtag)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'robbantsd', title: 'Robbantsd fel a telefonunkat!', group: 'Interaktív', size: 'half',
  desc: 'Küldjetek nekünk fotókat és üzeneteket — a számaink itt vannak.',
  fields: [
    { k: 'szoveg', label: 'Felhívás', type: 'area' },
    { k: 'szamok', label: 'Telefonszámok', type: 'rows', max: 2, fields: [{ k: 'nev', label: 'Kié?', type: 'text' }, { k: 'szam', label: 'Szám', type: 'text' }] },
  ],
  sample: { szoveg: 'Küldd el nekünk a ma esti legjobb (és legrosszabb) képeidet, videóidat, üzeneteidet. Holnap reggel, kávé mellett mindet megnézzük!', szamok: [{ nev: 'Dorina', szam: '+36 30 123 4567' }, { nev: 'Patrik', szam: '+36 20 765 4321' }] },
  css: `
.rbt .h{position:absolute;top:26px;left:0;right:0;text-align:center;font-family:'Playfair Display',serif;font-weight:800;font-size:30px;line-height:1.05;letter-spacing:.01em}
.rbt .h em{display:block;font-family:'Sacramento',cursive;font-weight:400;font-style:normal;font-size:44px;color:var(--accent)}
.rbt .txt{position:absolute;top:130px;left:70px;right:70px;height:70px;text-align:center;font-style:italic;font-size:15px}
.rbt .ph2{position:absolute;top:214px;left:0;right:0;display:flex;justify-content:center;gap:30px}
.rbt .ph2 div{width:190px;height:120px;border-radius:22px;border:2px solid var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;background:var(--paper2)}
.rbt .ph2 div::after{content:"";position:absolute;top:8px;width:40px;height:5px;border-radius:4px;background:var(--ink)}
.rbt .ph2 small{font-family:'Pinyon Script',cursive;font-size:26px;color:var(--accent)}
.rbt .ph2 b{font-family:'Montserrat',sans-serif;font-weight:600;font-size:15px;letter-spacing:.06em}
.rbt .boom{position:absolute;font-size:18px;color:var(--accent)}`,
  render(d) {
    return `<div class="rbt"><div class="h">Robbantsd fel<em>a telefonunkat!</em></div><div class="txt fit">${paras(d.szoveg)}</div>
      <div class="ph2">${(d.szamok || []).filter(x => x.szam).map(x => `<div><small>${esc(x.nev)}</small><b>${esc(x.szam)}</b></div>`).join('')}</div>
      <div class="boom" style="left:60px;top:230px">✦</div><div class="boom" style="right:56px;top:300px">✦</div><div class="boom" style="left:270px;top:350px;font-size:12px">✦</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'message', title: 'Hagyj nekünk üzenetet!', group: 'Interaktív', size: 'half',
  desc: 'Üres, vonalas hely — a vendégek ide írhatnak üzenetet.',
  fields: [{ k: 'szoveg', label: 'Felhívás', type: 'text', ph: 'Írj nekünk pár sort — eltesszük örökre.' }],
  sample: { szoveg: 'Írj nekünk pár sort, tanácsot vagy jókívánságot — eltesszük örökre.' },
  css: `
.msg2 .s{position:absolute;top:90px;left:36px;right:36px;font-style:italic;font-size:15px;color:var(--soft)}
.msg2 .env{position:absolute;left:36px;right:36px;top:128px;bottom:26px;border:1px solid var(--line);background:var(--paper2);padding:18px 26px}
.msg2 .env::before{content:"";position:absolute;inset:5px;border:1px solid var(--band2);pointer-events:none}
.msg2 .lines{height:100%;background:repeating-linear-gradient(transparent 0 31px,var(--line) 31px 32px)}
.msg2 .st{position:absolute;right:22px;top:14px;width:44px;height:52px;border:1.5px dashed var(--line);display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:20px}`,
  render(d) {
    return `<div class="msg2"><div class="ttl script">Hagyj nekünk üzenetet!</div><div class="s">${esc(d.szoveg)}</div>
      <div class="env"><div class="lines"></div><div class="st">♡</div></div></div>`;
  }
},
];
