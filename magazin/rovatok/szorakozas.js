/* SZÓRAKOZÁS: kvíz, játékok, szabályzat, másnaposság, horoszkóp, GYIK, színező */
import { esc, br, lines, paras, rng, HEART } from '../js/helpers.js';

/* --- Szókereső: a szavakat elhelyezi egy rácsban (vízszint/függőleg/átló) --- */
const ABC = 'AÁBCDEÉFGHIÍJKLMNOÓÖŐPRSTUÚÜŰVZ';
function wordSearch(words, n = 13, seed = 'x') {
  const r = rng(seed), G = Array.from({ length: n }, () => Array(n).fill(''));
  const dirs = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  const placed = [];
  for (const w0 of words) {
    const w = w0.toUpperCase().replace(/[^A-ZÁÉÍÓÖŐÚÜŰ]/g, ''); if (w.length < 2 || w.length > n) continue;
    let ok = false;
    for (let t = 0; t < 300 && !ok; t++) {
      const [dy, dx] = dirs[Math.floor(r() * dirs.length)];
      const y0 = Math.floor(r() * n), x0 = Math.floor(r() * n);
      const ye = y0 + dy * (w.length - 1), xe = x0 + dx * (w.length - 1);
      if (ye < 0 || ye >= n || xe < 0 || xe >= n) continue;
      let fits = true;
      for (let i = 0; i < w.length; i++) { const c = G[y0 + dy * i][x0 + dx * i]; if (c && c !== w[i]) { fits = false; break; } }
      if (!fits) continue;
      for (let i = 0; i < w.length; i++) G[y0 + dy * i][x0 + dx * i] = w[i];
      ok = true; placed.push(w0);
    }
  }
  for (const row of G) for (let i = 0; i < n; i++) if (!row[i]) row[i] = ABC[Math.floor(r() * ABC.length)];
  return { G, placed };
}
/* --- Sudoku: érvényes kiinduló feladvány (közepes) --- */
const SUDOKU = '530070000600195000098000060800060003400803001700020006060000280000419005000080079';

/* --- Színező vonalrajz --- */
const COLORING = `<svg viewBox="0 0 480 430" fill="none" stroke="#222" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
 <path d="M40 40q100 40 200 0q100 40 200 0"/><path d="M70 52l10 34 14-28M150 58l8 34 16-28M230 46l4 36 18-30M310 58l12 32 12-30M390 52l14 30 8-32"/>
 <rect x="150" y="300" width="180" height="90" rx="6"/><rect x="175" y="220" width="130" height="80" rx="6"/><rect x="200" y="160" width="80" height="60" rx="6"/>
 <path d="M150 330q22 14 45 0t45 0t45 0t45 0M175 248q16 12 32 0t33 0t33 0t32 0M200 184q20 12 40 0t40 0"/>
 <path d="M240 160v-20M232 128c0-12 16-12 16 0 0 10-8 14-8 14s-8-4-8-14z"/>
 <circle cx="196" cy="350" r="7"/><circle cx="240" cy="360" r="7"/><circle cx="284" cy="350" r="7"/><circle cx="220" cy="268" r="6"/><circle cx="260" cy="268" r="6"/>
 <path d="M120 390h240"/><path d="M110 390q-6 18 10 20h240q16-2 10-20"/>
 <circle cx="80" cy="230" r="30"/><circle cx="114" cy="210" r="30"/><path d="M96 190l8-16 8 16"/>
 <path d="M400 210l20 30-20 30-20-30z"/><path d="M380 240h40M390 226l10-16 10 16"/>
 <path d="M60 330c10-20 30-20 40 0-10 20-30 20-40 0zM80 330v40M60 360c8 4 14 4 20 0M420 330c10-20 30-20 40 0-10 20-30 20-40 0zM440 330v40"/>
 <path d="M30 150c8-14 24-14 30 0 6-14 22-14 30 0 0 18-30 32-30 32s-30-14-30-32zM390 130c6-10 18-10 22 0 4-10 16-10 22 0 0 13-22 24-22 24s-22-11-22-24z"/>
</svg>`;

export default [
/* ---------------------------------------------------------------- */
{
  id: 'igazhamis', title: 'Igaz-Hamis', group: 'Szórakozás', size: 'half',
  desc: 'Mennyire ismeritek az ifjú párt? Állítások bejelölésre.',
  fields: [{ k: 'allitasok', label: 'Állítások (soronként egy)', type: 'area', rows: 6 }],
  sample: { allitasok: 'Patrik az első randin elfelejtette a pénztárcáját.\nDorina sosem evett még csigát.\nA lánykérésnél a gyűrű majdnem a tóba esett.\nKözös macskánk neve Paprika.\nDorina tud gitározni.\nPatrik sírt a Titanicon.' },
  css: `
.igh .s{position:absolute;top:90px;left:36px;font-style:italic;color:var(--soft);font-size:15px}
.igh ul{position:absolute;top:124px;left:36px;right:36px;bottom:28px;margin:0;padding:0;list-style:none}
.igh li{display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--band2);font-size:15.5px}
.igh li em{margin-left:auto;font-style:normal;font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:.18em;color:var(--soft);display:flex;gap:10px;flex-shrink:0}
.igh li em span{display:flex;align-items:center;gap:4px}
.igh li em span::before{content:"";width:12px;height:12px;border:1.4px solid var(--accent);border-radius:3px}`,
  render(d) {
    return `<div class="igh"><div class="ttl script">Igaz vagy hamis?</div><div class="s">Jelöld be — a nap végén kiderül!</div>
      <ul class="fit">${lines(d.allitasok).map((a, i) => `<li><b class="disp acc">${i + 1}.</b>${esc(a)}<em><span>IGAZ</span><span>HAMIS</span></em></li>`).join('')}</ul></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'jatekok', title: 'Játékok (szókereső, sudoku)', group: 'Szórakozás', size: 'full',
  desc: 'Szókereső a ti szavaitokból és egy sudoku — a hosszú vacsorához.',
  fields: [{ k: 'szavak', label: 'Szavak a szókeresőbe (soronként, max. 10)', type: 'area', rows: 6, hint: 'Ékezettel is jó, szóköz nélkül. A nevek automatikusan bekerülnek.' }],
  sample: { szavak: 'SZERELEM\nTORTA\nGYŰRŰ\nTÁNC\nPEZSGŐ\nLAGZI\nCSOKOR\nIGEN' },
  css: `
.jtk .ws{position:absolute;top:110px;left:36px;width:300px;height:300px;display:grid;border:1.5px solid var(--ink)}
.jtk .ws span{display:flex;align-items:center;justify-content:center;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:500;border-right:1px solid var(--band2);border-bottom:1px solid var(--band2)}
.jtk .wl{position:absolute;top:110px;left:356px;right:30px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;line-height:2}
.jtk .wl h4{font-family:'Sacramento',cursive;font-weight:400;text-transform:none;letter-spacing:0;font-size:30px;margin:0 0 4px;color:var(--accent)}
.jtk .wl div::before{content:"";display:inline-block;width:11px;height:11px;border:1.3px solid var(--accent);border-radius:50%;margin-right:8px;vertical-align:-1px}
.jtk .su{position:absolute;bottom:52px;left:36px;width:270px;height:270px;display:grid;grid-template-columns:repeat(9,1fr);border:2px solid var(--ink)}
.jtk .su span{display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:16px;border-right:1px solid var(--band2);border-bottom:1px solid var(--band2)}
.jtk .su span:nth-child(9n+3),.jtk .su span:nth-child(9n+6){border-right:1.6px solid var(--ink)}
.jtk .su span:nth-child(n+19):nth-child(-n+27),.jtk .su span:nth-child(n+46):nth-child(-n+54){border-bottom:1.6px solid var(--ink)}
.jtk .sut{position:absolute;bottom:82px;left:330px;right:30px}
.jtk .sut h4{font-family:'Sacramento',cursive;font-weight:400;font-size:40px;margin:0;color:var(--accent);line-height:1}
.jtk .sut p{font-style:italic;font-size:14px;margin-top:8px}`,
  render(d, ctx) {
    const words = [ctx.meta.n1, ctx.meta.n2, ...lines(d.szavak)].filter(Boolean).slice(0, 12);
    const { G, placed } = wordSearch(words, 13, words.join());
    return `<div class="jtk"><div class="ttl script">Játékok</div><div class="kick" style="position:absolute;top:84px;left:36px">szókereső · sudoku</div>
      <div class="ws" style="grid-template-columns:repeat(13,1fr)">${G.flat().map(c => `<span>${c}</span>`).join('')}</div>
      <div class="wl"><h4>Keresd meg!</h4>${placed.map(w => `<div>${esc(w)}</div>`).join('')}</div>
      <div class="su">${SUDOKU.split('').map(c => `<span>${c === '0' ? '' : c}</span>`).join('')}</div>
      <div class="sut"><h4>Sudoku</h4><p>Minden sorban, oszlopban és 3×3-as négyzetben szerepeljen 1-től 9-ig minden szám. A megfejtést a tortavágásig várjuk!</p></div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'lagziszab', title: 'A lagzi szabályzata', group: 'Szórakozás', size: 'half',
  desc: 'Vicces házirend a vendégeknek.',
  fields: [{ k: 'szabalyok', label: 'Szabályok (soronként egy)', type: 'area', rows: 6 }],
  sample: { szabalyok: 'A szertartás alatt a telefon pihen — a fotós mindent lát.\nA tánctér nem kötelező, csak erősen ajánlott.\nA tortát előre megkóstolni tilos. Próbáltuk.\nA menyecsketáncon pénzt nem visszaadunk.\nAki elalszik, annak arcára rajzolunk.\nHajnali háromkor jön a töltött káposzta. Kitartás!' },
  css: `
.lsz ol{position:absolute;top:96px;left:36px;right:36px;bottom:26px;margin:0;padding:0;list-style:none;column-count:2;column-gap:28px;counter-reset:r}
.lsz li{counter-increment:r;break-inside:avoid;display:flex;gap:10px;margin:0 0 16px;font-size:16.5px;line-height:1.4}
.lsz li::before{content:"§" counter(r);font-family:'Playfair Display',serif;font-style:italic;font-size:22px;color:var(--accent);line-height:1;flex-shrink:0;min-width:28px}`,
  render(d) {
    return `<div class="lsz"><div class="ttl script">A lagzi szabályzata</div><ol class="fit">${lines(d.szabalyok).map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'masnapos', title: 'Útmutató másnaposság ellen', group: 'Szórakozás', size: 'half',
  desc: 'Vicces „orvosi” tanácsok a holnap reggelre.',
  fields: [{ k: 'lepesek', label: 'Lépések (soronként egy)', type: 'area', rows: 6 }],
  sample: { lepesek: 'Igyál egy pohár vizet minden pálinka után. (Ki fogja ezt betartani?)\nTáncolj sokat — a tánc égeti az alkoholt. Tudományosan nem bizonyított.\nHajnalban edd meg a töltött káposztát. Kötelező.\nReggel: húsleves, napszemüveg, csend.\nHa minden kötél szakad: holnap délben folytatjuk.' },
  css: `
.msn .rx{position:absolute;top:30px;right:40px;width:74px;height:74px;border-radius:50%;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-style:italic;font-size:34px;color:var(--accent)}
.msn .s{position:absolute;top:88px;left:36px;font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--soft)}
.msn ul{position:absolute;top:120px;left:36px;right:36px;bottom:24px;margin:0;padding:0;list-style:none}
.msn li{display:flex;gap:14px;align-items:flex-start;padding:7px 0;border-bottom:1px dashed var(--band2);font-size:14.5px;line-height:1.4}
.msn li b{flex-shrink:0;width:26px;height:26px;border-radius:50%;background:var(--band);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:13px;color:var(--accent)}`,
  render(d) {
    return `<div class="msn"><div class="ttl script">Másnaposság ellen</div><div class="rx">Rx</div><div class="s">Recept · szedje az orvos utasítása szerint (nem fogja)</div>
      <ul class="fit">${lines(d.lepesek).map((s, i) => `<li><b>${i + 1}</b><span>${esc(s)}</span></li>`).join('')}</ul></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'horoszkop', title: 'Horoszkóp — ma éjjelre', group: 'Szórakozás', size: 'full',
  desc: 'Mit tartogatnak a csillagok ma éjjel? 12 csillagjegy, vicces jóslatok.',
  fields: [{ k: 'joslatok', label: 'Jóslatok (12 sor, a csillagjegyek sorrendjében)', type: 'area', rows: 12 }],
  sample: { joslatok: 'Ma este te nyitod a táncot — akár akarod, akár nem.\nA második szelet tortát senki nem fogja észrevenni. Mi igen.\nKét beszélgetést folytatsz egyszerre. Mindkettőt megnyered.\nSírni fogsz a fogadalomnál. Hozz zsebkendőt, kettőt.\nA mikrofon vonz. Ellenállni felesleges.\nTe leszel az, aki hajnalban rendet rak. Köszönjük.\nEgy rég nem látott rokon ma végre a nevedet is megjegyzi.\nA csokrot te kapod el. Vagy legalább egy virágot belőle.\nA pálinkás asztal ma a barátod. Holnap már nem.\nMa este felfedezed magadban a csárdás tehetséget.\nEgy új barátság születik a tánctéren, 2:47-kor.\nA szerelem a levegőben van. Vagy csak a töltött káposzta.' },
  css: `
.hrk .grid{position:absolute;left:30px;right:30px;top:118px;bottom:40px;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,1fr);gap:12px 18px}
.hrk .c{border-top:1px solid var(--line);padding-top:8px;overflow:hidden}
.hrk .c h4{margin:0;font-family:'Playfair Display',serif;font-weight:400;font-size:15px;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:baseline;gap:8px}
.hrk .c h4 small{font-family:'Montserrat',sans-serif;font-size:8px;letter-spacing:.14em;color:var(--soft)}
.hrk .c p{font-size:14.5px;line-height:1.38;font-style:italic;margin-top:6px}
.hrk .star{position:absolute;right:40px;top:40px;width:60px;color:var(--accent)}`,
  render(d) {
    const Z = [['Kos', 'III.21–IV.19'], ['Bika', 'IV.20–V.20'], ['Ikrek', 'V.21–VI.21'], ['Rák', 'VI.22–VII.22'], ['Oroszlán', 'VII.23–VIII.22'], ['Szűz', 'VIII.23–IX.22'], ['Mérleg', 'IX.23–X.22'], ['Skorpió', 'X.23–XI.21'], ['Nyilas', 'XI.22–XII.21'], ['Bak', 'XII.22–I.19'], ['Vízöntő', 'I.20–II.18'], ['Halak', 'II.19–III.20']];
    const J = lines(d.joslatok);
    return `<div class="hrk"><div class="ttl script">Horoszkóp</div><div class="kick" style="position:absolute;top:88px;left:36px">mit tartogatnak a csillagok ma éjjelre?</div>
      <svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".8"><path d="M12 1v22M1 12h22M4 4l16 16M20 4L4 20"/><circle cx="12" cy="12" r="3"/></svg>
      <div class="grid">${Z.map((z, i) => `<div class="c"><h4>${z[0]}<small>${z[1]}</small></h4><p>${esc(J[i] || '')}</p></div>`).join('')}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'gyik', title: 'Gyakran Ismételt Kérdések', group: 'Szórakozás', size: 'half',
  desc: 'A vendégek leggyakoribb kérdései — vicces és hasznos válaszokkal.',
  fields: [{ k: 'kerdesek', label: 'Kérdések', type: 'rows', max: 6, fields: [{ k: 'k', label: 'Kérdés', type: 'text' }, { k: 'v', label: 'Válasz', type: 'text' }] }],
  sample: { kerdesek: [['Mikor lesz a torta?', '22:00-kor. Nem előbb. Nem kérdezzük többször.'], ['Hol a mosdó?', 'A bejárattól balra, a pálinkás asztal mögött.'], ['Lesz taxi hajnalban?', 'Igen, a recepción lehet rendelni.'], ['Mi a WiFi jelszó?', 'Ma nem kell. Táncolj!'], ['Lehet kérni zenét?', 'Igen, a DJ-nél — de Macarena nincs.']].map(([k, v]) => ({ k, v })) },
  css: `
.gyk dl{position:absolute;top:94px;left:36px;right:36px;bottom:24px;margin:0;column-count:2;column-gap:28px}
.gyk dl div{break-inside:avoid;margin:0 0 18px}
.gyk dt{font-family:'Playfair Display',serif;font-weight:700;font-size:15px;margin-bottom:3px}
.gyk dt::before{content:"K: ";color:var(--accent)}
.gyk dd{margin:0;font-size:15.5px;font-style:italic;line-height:1.4}`,
  render(d) {
    return `<div class="gyk"><div class="ttl script">GYIK</div><dl class="fit">${(d.kerdesek || []).filter(x => x.k).map(x => `<div><dt>${esc(x.k)}</dt><dd>${esc(x.v)}</dd></div>`).join('')}</dl></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'szinezo', title: 'Gyerekeknek színező', group: 'Szórakozás', size: 'full',
  desc: 'Kiszínezhető oldal a legkisebb vendégeknek.',
  fields: [{ k: 'cim', label: 'Felirat', type: 'text', ph: 'Színezd ki!' }],
  sample: { cim: 'Színezd ki!' },
  css: `
.szz{position:absolute;inset:0;background:#fff}
.szz .t{position:absolute;top:26px;left:0;right:0;text-align:center;font-family:'Playfair Display',serif;font-weight:800;font-size:52px;color:transparent;-webkit-text-stroke:1.6px #222;letter-spacing:.02em}
.szz .n{position:absolute;top:96px;left:0;right:0;text-align:center;font-family:'Playfair Display',serif;font-weight:800;font-size:40px;color:transparent;-webkit-text-stroke:1.4px #222}
.szz svg{position:absolute;left:40px;right:40px;top:180px;width:480px;height:430px}
.szz .h{position:absolute;bottom:60px;left:0;right:0;text-align:center;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:#777}
.szz .box{position:absolute;bottom:90px;left:140px;right:140px;height:50px;border:1.5px dashed #999;border-radius:8px}`,
  render(d, ctx) {
    return `<div class="szz"><div class="t">${esc(d.cim)}</div><div class="n">${esc(ctx.meta.n1)} ♥ ${esc(ctx.meta.n2)}</div>${COLORING}
      <div class="box"></div><div class="h">a művész neve</div></div>`;
  }
},
];
