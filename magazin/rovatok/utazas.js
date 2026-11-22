/* UTAZÁS: közös utak, bakancslista, nászút */
import { esc, br, lines, paras, ph, rng } from '../js/helpers.js';
const S = (pos, z = 1) => ({ src: 'assets/minta.jpg', pos, z });

export default [
/* ---------------------------------------------------------------- */
{
  id: 'utazas', title: 'Utazási rovat', group: 'Utazás', size: 'half',
  desc: 'A közös utazások útlevélpecsétekként.',
  fields: [
    { k: 'utak', label: 'Utazások', type: 'rows', max: 8, fields: [{ k: 'hely', label: 'Hely', type: 'text' }, { k: 'ev', label: 'Év', type: 'text', w: 60 }] },
    { k: 'szoveg', label: 'Pár sor', type: 'text' },
  ],
  sample: { szoveg: 'Útlevelünkben már közösek a pecsétek.', utak: [['Párizs', '2024'], ['Split', '2021'], ['Bécs', '2020'], ['Róma', '2023'], ['Tihany', '2019'], ['Prága', '2022'], ['Amszterdam', '2025']].map(([hely, ev]) => ({ hely, ev })) },
  css: `
.utz .s{position:absolute;top:92px;left:36px;font-style:italic;font-size:15px;color:var(--soft)}
.utz .st{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:'Montserrat',sans-serif;text-transform:uppercase;letter-spacing:.12em;font-weight:600;opacity:.82}
.utz .st b{font-size:13px;line-height:1.1}
.utz .st small{font-size:8px;letter-spacing:.3em;margin-top:3px}
.utz .st.c{border-radius:50%;border:2.5px double currentColor}
.utz .st.r{border:2px solid currentColor;border-radius:6px;outline:1px solid currentColor;outline-offset:3px}`,
  render(d) {
    const U = (d.utak || []).filter(x => x.hely).slice(0, 8), r = rng(U.map(x => x.hely).join());
    const cols = ['var(--accent)', '#8a4a5a', '#3d5a7a', '#7a6a3d'], slots = [[40, 130], [170, 116], [300, 132], [420, 118], [70, 250], [205, 246], [335, 254], [450, 240]];
    return `<div class="utz"><div class="ttl script">Közös utazásaink</div><div class="s">${esc(d.szoveg)}</div>
      ${U.map((u, i) => { const c = i % 2 ? 'r' : 'c', w = c === 'c' ? 104 : 116, h = c === 'c' ? 104 : 74; return `<div class="st ${c}" style="left:${slots[i][0]}px;top:${slots[i][1]}px;width:${w}px;height:${h}px;color:${cols[i % 4]};transform:rotate(${(r() * 30 - 15).toFixed(0)}deg)"><small>✈ érkezés</small><b>${esc(u.hely)}</b><small>${esc(u.ev)}</small></div>`; }).join('')}</div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'bakancslista', title: 'Közös bakancslistánk', group: 'Utazás', size: 'half',
  desc: 'Amit együtt meg akartok csinálni — és amit már kipipáltatok.',
  fields: [{ k: 'tetelek', label: 'Tételek', type: 'rows', max: 10, fields: [{ k: 'mi', label: 'Tétel', type: 'text' }, { k: 'kesz', label: 'Kész?', type: 'check' }] }],
  sample: { tetelek: [['Összeházasodni', 1], ['Északi fényt látni', 0], ['Saját kutya', 1], ['Ugrás ejtőernyővel', 0], ['Közös tetoválás', 0], ['Japán cseresznyevirágzás', 0], ['Lakás felújítás túlélése', 1], ['Megtanulni salsázni', 0]].map(([mi, kesz]) => ({ mi, kesz: !!kesz })) },
  css: `
.bkl ul{position:absolute;top:96px;left:44px;right:44px;bottom:30px;margin:0;padding:0;list-style:none;column-count:2;column-gap:30px}
.bkl li{display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid var(--band2);break-inside:avoid;font-size:16px}
.bkl li b{flex-shrink:0;width:22px;height:22px;border-radius:50%;border:1.5px solid var(--accent);display:flex;align-items:center;justify-content:center;font-family:'Sacramento',cursive;font-size:26px;color:var(--accent);line-height:0}
.bkl li.ok span{text-decoration:line-through;text-decoration-color:var(--accent);color:var(--soft)}`,
  render(d) {
    return `<div class="bkl"><div class="ttl script">Közös bakancslistánk</div>
      <ul>${(d.tetelek || []).filter(x => x.mi).map(x => `<li class="${x.kesz ? 'ok' : ''}"><b>${x.kesz ? '✓' : ''}</b><span>${esc(x.mi)}</span></li>`).join('')}</ul></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'naszut', title: 'A nászútunk', group: 'Utazás', size: 'half',
  desc: 'Képeslap a nászútról — vagy arról, ahová készültök.',
  fields: [
    { k: 'hova', label: 'Úti cél', type: 'text', ph: 'Santorini' },
    { k: 'mikor', label: 'Mikor?', type: 'text' },
    { k: 'szoveg', label: 'Üzenet a képeslapon', type: 'area' },
    { k: 'foto', label: 'Fotó a helyről', type: 'photo' },
  ],
  sample: { hova: 'Santorini', mikor: '2027. június', foto: null, szoveg: 'Drága itthon maradók! Mire ezt olvassátok, mi már a csomagokat pakoljuk. Fehér házak, kék kupolák, és egy hét, amikor senki nem kérdezi, mikor lesz a következő buli. Hozunk ajándékot. Talán.' },
  css: `
.nsz .card{position:absolute;left:36px;right:36px;top:92px;bottom:26px;background:#fff;box-shadow:0 8px 20px -10px rgba(0,0,0,.35);transform:rotate(-1.2deg);display:flex;padding:14px}
.nsz .card .ph{width:46%;height:100%}
.nsz .card .ph.none{background:linear-gradient(160deg,#a9c7d8,#e9d8bd)}
.nsz .back{flex:1;position:relative;padding-left:20px;margin-left:16px;border-left:1px solid #ddd}
.nsz .msg{position:absolute;left:20px;right:96px;top:12px;bottom:8px;font-family:'Sacramento',cursive;font-size:21px;line-height:1.25;color:#2b3d5a}
.nsz .stamp{position:absolute;right:4px;top:6px;width:72px;height:86px;border:2px dashed #b9b2a6;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:'Montserrat',sans-serif;font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);background:var(--paper2)}
.nsz .stamp b{font-family:'Playfair Display',serif;font-style:italic;font-size:15px;letter-spacing:0;text-transform:none;margin:3px 0}
.nsz .pm{position:absolute;right:2px;top:104px;width:70px;height:70px;border-radius:50%;border:1.5px solid rgba(60,60,80,.45);display:flex;align-items:center;justify-content:center;text-align:center;font-family:'Montserrat',sans-serif;font-size:7px;letter-spacing:.14em;color:rgba(60,60,80,.6);transform:rotate(-14deg)}
.nsz .big{position:absolute;left:62px;top:270px;width:200px;line-height:1.05;color:#fff;font-family:'Playfair Display',serif;font-style:italic;font-size:24px;text-shadow:0 2px 10px rgba(0,0,0,.3);z-index:2;transform:rotate(-1.2deg)}`,
  render(d) {
    return `<div class="nsz"><div class="ttl script">A nászútunk</div><div class="card">${ph(d.foto, '', '', esc(d.hova))}
      <div class="back"><div class="msg fit">${paras(d.szoveg)}</div><div class="stamp">posta<b>${esc(d.hova)}</b>${esc(d.mikor)}</div><div class="pm">ÜDVÖZLET<br>INNEN:<br>${esc(d.hova).toUpperCase()}</div></div></div>
      <div class="big">Üdvözlet innen: ${esc(d.hova)}!</div></div>`;
  }
},
];
