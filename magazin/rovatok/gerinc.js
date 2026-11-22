/* GERINC: alapadatok, címlap, hátlap, köszöntő, menetrend, étlap, dresscode */
import { esc, br, lines, paras, ph, dateParts, huDate, barcode, initials, SPRIG } from '../js/helpers.js';
const S = (pos, z = 1) => ({ src: 'assets/minta.jpg', pos, z });

export default [
/* ---------------------------------------------------------------- */
{
  id: 'alap', title: 'Alapadatok', group: 'Gerinc', fixed: true, noPage: true,
  desc: 'A nevek, a dátum és a helyszín — ezeket minden rovat használja.',
  fields: [
    { k: 'nev1', label: 'Menyasszony keresztneve', type: 'text', ph: 'Dorina' },
    { k: 'nev2', label: 'Vőlegény keresztneve', type: 'text', ph: 'Patrik' },
    { k: 'datum', label: 'Az esküvő dátuma', type: 'date' },
    { k: 'helyszin', label: 'Helyszín', type: 'text', ph: 'Tóparti Kúria, Tata' },
  ],
  sample: { nev1: 'Dorina', nev2: 'Patrik', datum: '2027-06-12', helyszin: 'Tóparti Kúria, Tata' },
  css: '', render: () => ''
},
/* ---------------------------------------------------------------- */
{
  id: 'cimlap', title: 'Címlap', group: 'Gerinc', fixed: true, size: 'full',
  desc: 'A magazin arca. Két stílus: teljes oldalas fotó vagy keretes, klasszikus.',
  fields: [
    { k: 'stilus', label: 'Címlap stílusa', type: 'select', opts: [['A', 'Fotós (teljes oldalas kép)'], ['B', 'Klasszikus (keretes kép)']] },
    { k: 'cim', label: 'A magazin címe', type: 'text', ph: 'Örökké', hint: 'Rövid, 1–2 szó a legszebb: Örökké, Mi Ketten, Igen, Holtomiglan…' },
    { k: 'felirat', label: 'Felirat a cím alatt', type: 'text', ph: 'Az esküvői szám' },
    { k: 'alcim', label: 'Címlap-szlogen', type: 'area', ph: 'Egy örökkévalóság\nkezdete' },
    { k: 'alcim2', label: 'Kis felirat a szlogen alatt', type: 'area', ph: 'A nap részletei &\nkülönleges pillanatai' },
    { k: 'foto', label: 'Címlapfotó (álló kép a legjobb)', type: 'photo' },
  ],
  sample: { stilus: 'A', cim: 'Örökké', felirat: 'Az esküvői szám', alcim: 'Egy örökkévalóság\nkezdete', alcim2: 'A nap részletei &\nkülönleges pillanatai', foto: S('50% 30%') },
  css: `
.cvA .bg{position:absolute;inset:0}
.cvA .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.42) 0,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 55%,rgba(0,0,0,.55) 100%)}
.cvA .mast{position:absolute;top:20px;left:0;right:0;text-align:center;font-family:'Playfair Display',serif;font-weight:400;letter-spacing:.02em;color:#fff;line-height:1;white-space:nowrap}
.cvA .issue{position:absolute;top:142px;right:44px;color:#fff;font-size:10.5px;letter-spacing:.32em}
.cvA .date{position:absolute;top:176px;right:40px;color:#fff;font-size:46px;text-align:center;line-height:.95}
.cvA .kk{position:absolute;left:40px;bottom:150px;color:#fff;transform:rotate(-7deg);transform-origin:0 100%}
.cvA .kk .it{font-family:'Playfair Display',serif;font-style:italic;font-size:27px;line-height:1.05}
.cvA .kk .c{font-size:10px;letter-spacing:.24em;margin-top:6px}
.cvA .names{position:absolute;right:34px;bottom:52px;color:#fff;font-size:58px;transform:rotate(-9deg);text-shadow:0 2px 18px rgba(0,0,0,.35);white-space:nowrap}
.cvA .names small{display:block;font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.3em;text-transform:uppercase;margin:0 0 -6px 24px}
.cvB{position:absolute;inset:0;background:var(--paper2)}
.cvB .t{position:absolute;top:50px;left:30px;right:30px;color:var(--accent);white-space:nowrap}
.cvB .iss{position:absolute;top:134px;right:46px;text-align:right;font-size:15px;line-height:1.2;color:var(--accent)}
.cvB .pic{position:absolute;left:44px;right:44px;top:176px;bottom:96px}
.cvB .cbcap{position:absolute;left:0;right:0;bottom:46px;text-align:center;font-size:14px;letter-spacing:.26em}`,
  render(d, ctx) {
    const m = ctx.meta, dp = dateParts(m.datum);
    if ((d.stilus || 'A') === 'B') {
      const t = d.cim || 'Mi Ketten', fs = Math.min(104, Math.round(470 / (t.length * 0.4)));
      return `<div class="cvB"><div class="t script" style="font-size:${fs}px">${esc(t)}</div>
        <div class="iss caps">${esc(huDate(m.datum))}<br>${esc(d.felirat || '1. szám')}</div>
        ${ph(d.foto, 'pic', '', 'címlapfotó')}
        <div class="cbcap caps">${esc(m.n1)} és ${esc(m.n2)} összeházasodik!</div></div>`;
    }
    const t = d.cim || 'Örökké', fs = Math.min(112, Math.round(500 / (t.length * 0.55)));
    return `<div class="cvA">${ph(d.foto, 'bg', '', 'címlapfotó')}<div class="shade"></div>
      <div class="mast" style="font-size:${fs}px">${esc(t)}</div>
      <div class="issue caps">${esc(d.felirat)}</div>
      ${dp ? `<div class="date script2">${dp.mm}<br>${dp.dd}<br>${dp.yy}</div>` : ''}
      <div class="kk"><div class="it">${br(d.alcim)}</div><div class="c caps">${br(d.alcim2)}</div></div>
      <div class="names script2"><small>a nap hősei</small>${esc(m.names)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'zaro', title: 'Hátlap: köszönet + vendéglista', group: 'Gerinc', fixed: true, size: 'full',
  desc: 'Az utolsó oldal: köszönő levél, a teljes vendéglista és egy „vonalkód” a dátummal.',
  fields: [
    { k: 'cim', label: 'Megszólítás', type: 'text', ph: 'Kedves vendégeink…' },
    { k: 'level', label: 'Levél', type: 'area', rows: 6 },
    { k: 'alairas', label: 'Aláírás', type: 'text', ph: 'Szeretettel: Dorina & Patrik' },
    { k: 'vendegek', label: 'Vendéglista (soronként egy név)', type: 'area', rows: 8 },
  ],
  sample: {
    cim: 'Kedves vendégeink…',
    level: 'Hálásak vagyunk, hogy ma mindannyian itt vagytok. Látni a legkedvesebb arcokat — a családunkat és a régi barátainkat — egy helyen, ez életünk legszebb pillanata.\nA szeretetetek és a támogatásotok mindent jelent nekünk. A hivatalos részen túl vagyunk, az éjszaka még fiatal: emeljétek poharatokat, és találkozzunk a tánctéren!',
    alairas: 'Szeretettel: Dorina & Patrik',
    vendegek: 'Antal Kata\nBakos Péter\nBalogh Edit\nBíró Gábor\nCsonka Lilla\nDeák Márk\nErdős Nóra\nFarkas Ádám\nFekete Judit\nGál Tamás\nHegedűs Eszter\nHorváth Márta\nJuhász Zoli\nKiss Anna\nKis Lili\nKovács László\nLakatos Dóra\nMagyar Bálint\nMészáros Kitti\nMolnár Ákos\nNagy Bence\nNémeth Sára\nOláh Krisztián\nPapp Levente\nPintér Ági\nRácz Gergő\nSipos Fanni\nSimon Dávid\nSzabó Dani\nSzűcs Panna\nTakács Imre\nTóth Réka\nTörök Zsuzsa\nVadász Béla\nVarga Zsófi\nVincze Hanna\nZsigmond Erik'
  },
  css: `
.zr{position:absolute;inset:0;background:var(--paper2)}
.zr .t{position:absolute;top:44px;left:42px;font-size:54px;transform:rotate(-4deg)}
.zr .letter{position:absolute;top:118px;left:46px;right:46px;height:140px;font-size:13.4px;line-height:1.5}
.zr .sig{position:absolute;top:266px;left:70px;font-size:32px;color:var(--accent);transform:rotate(-5deg)}
.zr .guests{position:absolute;top:336px;left:46px;right:46px;bottom:100px;font-size:17px;line-height:1.6;text-align:center}
.zr .guests i{font-style:normal;color:var(--line);padding:0 5px}
.zr .mono{position:absolute;left:44px;bottom:38px;font-size:40px;color:var(--accent)}
.zr .bc{position:absolute;right:42px;bottom:40px;background:#fff;padding:6px 8px 3px;text-align:center}
.zr .bc div{font-family:'Montserrat',sans-serif;font-size:8.5px;letter-spacing:.32em;margin-top:2px}`,
  render(d, ctx) {
    const m = ctx.meta, dp = dateParts(m.datum);
    const L = lines(d.vendegek), g = L.map((n, i) => esc(n).replace(/ /g, '&nbsp;') + (i < L.length - 1 ? '&nbsp;<i>·</i>' : '')).join(' ');
    return `<div class="zr"><div class="t script">${esc(d.cim)}</div>
      <div class="letter fit">${paras(d.level)}</div>
      <div class="sig script2">${esc(d.alairas)}</div>
      <div class="guests fit">${g}</div>
      <div class="mono script2">${esc(initials(m.n1))}&amp;${esc(initials(m.n2))}</div>
      <div class="bc">${barcode(m.datum || m.names)}<div>${dp ? dp.dd + ' ' + dp.mm + ' ' + dp.y : ''}</div></div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'koszonto', title: 'Köszöntő', group: 'Gerinc', size: 'full',
  desc: 'Az első belső oldal: üdvözlés a vendégeknek egy íves keretű fotóval.',
  fields: [
    { k: 'cim', label: 'Cím', type: 'text', ph: 'Isten hozott!' },
    { k: 'szoveg', label: 'Köszöntő szöveg', type: 'area', rows: 6 },
    { k: 'alairas', label: 'Aláírás', type: 'text' },
    { k: 'foto', label: 'Fotó', type: 'photo' },
  ],
  sample: { cim: 'Isten hozott!', szoveg: 'Ez a kis magazin a mi történetünk — és mostantól egy kicsit a tiétek is. Lapozzátok végig a vacsora alatt, keressétek meg magatokat a csapatban, töltsétek ki a kvízt, és ha valaki a szinglik közül megtetszik… az asztalszámot is megadtuk.\nKöszönjük, hogy velünk ünnepeltek!', alairas: 'Dorina & Patrik', foto: S('50% 20%', 1.15) },
  css: `
.ksz .arch{position:absolute;left:110px;right:110px;top:46px;height:340px;border-radius:170px 170px 0 0;overflow:hidden;padding:7px;background:var(--frame)}
.ksz .arch .ph{width:100%;height:100%;border-radius:163px 163px 0 0}
.ksz .t{position:absolute;top:404px;left:0;right:0;text-align:center;font-size:62px}
.ksz .txt{position:absolute;top:486px;left:62px;right:62px;height:190px;text-align:center;font-style:italic;font-size:15.5px;line-height:1.55}
.ksz .sig{position:absolute;top:692px;left:0;right:0;text-align:center;font-size:30px;color:var(--accent)}
.ksz .spr{position:absolute;top:735px;left:50%;width:110px;margin-left:-55px;color:var(--line)}`,
  render(d) {
    return `<div class="ksz"><div class="arch">${ph(d.foto)}</div><div class="t script">${esc(d.cim)}</div>
      <div class="txt fit">${paras(d.szoveg)}</div><div class="sig script2">${esc(d.alairas)}</div><div class="spr">${SPRIG}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'menetrend', title: 'A nap menetrendje', group: 'Gerinc', size: 'full',
  desc: 'A nap programja időpontokkal, egy elmosott háttérfotón.',
  fields: [
    { k: 'cim', label: 'Cím', type: 'text', ph: 'A nagy nap menetrendje' },
    { k: 'pontok', label: 'Programpontok', type: 'rows', max: 14, fields: [{ k: 'program', label: 'Program', type: 'text' }, { k: 'ido', label: 'Idő', type: 'text', w: 70 }] },
    { k: 'lab', label: 'Záró sor (kézírással)', type: 'text', ph: 'És utána tánc, hajnalig!' },
    { k: 'foto', label: 'Háttérfotó', type: 'photo' },
  ],
  sample: { cim: 'A nagy nap menetrendje', lab: 'És utána tánc, hajnalig!', foto: S('50% 4%', 2.4),
    pontok: [['Vendégvárás', '14:30'], ['Szertartás', '15:00'], ['Gratulációk', '15:45'], ['Koccintás', '16:15'], ['Csoportkép', '16:45'], ['Vacsora', '18:00'], ['Nyitótánc', '20:30'], ['Tortavágás', '22:00'], ['Menyecsketánc', '23:59'], ['Hajnali buli', '∞']].map(([program, ido]) => ({ program, ido })) },
  css: `
.mtr .bg{position:absolute;inset:-12px}
.mtr .bg i{filter:blur(2px) saturate(.75)}
.bw .mtr .bg i{filter:blur(2px) grayscale(1)}
.mtr .tint{position:absolute;inset:0;background:var(--tint)}
.mtr .t{position:absolute;top:44px;left:30px;right:30px;text-align:center;color:#fff;font-size:60px;line-height:.92}
.mtr ul{position:absolute;top:190px;left:56px;right:56px;bottom:120px;margin:0;padding:0;list-style:none;color:#fff;display:flex;flex-direction:column;justify-content:center}
.mtr li{display:flex;align-items:baseline;gap:10px;font-size:15px;letter-spacing:.16em;text-transform:uppercase;padding:8px 0;font-weight:500}
.mtr li i{flex:1;border-bottom:1px solid rgba(255,255,255,.55);transform:translateY(-4px)}
.mtr li b{font-weight:500;letter-spacing:.08em;font-size:17px}
.mtr .lab{position:absolute;bottom:52px;left:0;right:0;text-align:center;color:#fff;font-size:40px;transform:rotate(-3deg)}`,
  render(d) {
    const p = (d.pontok || []).filter(x => x.program || x.ido);
    return `<div class="mtr">${ph(d.foto, 'bg')}<div class="tint"></div><div class="t script">${br(d.cim).replace(' menetrendje', '<br>menetrendje')}</div>
      <ul class="fit">${p.map(x => `<li>${esc(x.program)}<i></i><b>${esc(x.ido)}</b></li>`).join('')}</ul>
      <div class="lab script">${esc(d.lab)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'etlap', title: 'Étlap', group: 'Gerinc', size: 'full',
  desc: 'A vacsora fogásai egy íves, elegáns keretben.',
  fields: [
    { k: 'cim', label: 'Cím', type: 'text', ph: 'Az étlap' },
    { k: 'fogasok', label: 'Fogások', type: 'rows', max: 6, fields: [{ k: 'nev', label: 'Fogás (pl. Leves)', type: 'text' }, { k: 'etelek', label: 'Ételek (soronként)', type: 'area', rows: 2 }] },
    { k: 'lab', label: 'Záró sor', type: 'text', ph: 'Éjfélkor töltött káposzta' },
  ],
  sample: { cim: 'Az étlap', lab: 'Éjfélkor: töltött káposzta',
    fogasok: [{ nev: 'Előétel', etelek: 'Házi pogácsa, kecskesajtkrém\nFüstölt pisztráng, kapros joghurt' }, { nev: 'Leves', etelek: 'Újházy tyúkhúsleves\ncsigatésztával' }, { nev: 'Főétel', etelek: 'Kacsacomb párolt lilakáposztával\nRántott csirke, petrezselymes burgonya' }, { nev: 'Desszert', etelek: 'Citromos-málnás menyasszonyi torta\nTúrós csusza, mert magyar lagzi' }] },
  css: `
.etl{position:absolute;inset:0;background:var(--band)}
.etl .arch{position:absolute;left:42px;right:42px;top:58px;bottom:44px;background:var(--paper);border-radius:240px 240px 24px 24px}
.etl .tag{position:absolute;top:36px;right:40px;background:var(--paper2);padding:12px 26px 10px 40px;font-size:46px;transform:rotate(2deg);box-shadow:0 2px 6px rgba(0,0,0,.08);z-index:3}
.etl .tag::before{content:"";position:absolute;left:14px;top:50%;width:11px;height:11px;margin-top:-5px;border-radius:50%;background:#c9a24a}
.etl .mnu{position:absolute;left:84px;right:84px;top:150px;bottom:110px;text-align:center;display:flex;flex-direction:column;justify-content:center}
.etl .g{margin:0 0 16px}
.etl .g h4{font-family:'Sacramento',cursive;font-weight:400;font-size:32px;margin:0 0 2px;color:var(--accent)}
.etl .g div{font-size:13.5px;letter-spacing:.1em;text-transform:uppercase;line-height:1.55}
.etl .lab{position:absolute;bottom:70px;left:0;right:0;text-align:center;font-size:26px}
.etl .glass{position:absolute;width:58px;color:var(--ink);opacity:.7}`,
  render(d) {
    const G = (d.fogasok || []).filter(g => g.nev || g.etelek);
    const glass = '<svg viewBox="0 0 60 70" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M8 8h18l-2 18a7 7 0 0 1-14 0zM17 33v24M10 58h14M34 10h18l-2 18a7 7 0 0 1-14 0zM43 35v24M36 60h14"/><path d="M27 4l3-3M31 6l4-2"/></svg>';
    return `<div class="etl"><div class="arch"></div><div class="tag script">${esc(d.cim)}</div>
      <div class="mnu fit">${G.map(g => `<div class="g"><h4>${esc(g.nev)}</h4><div>${br(g.etelek)}</div></div>`).join('')}</div>
      <div class="lab script">${esc(d.lab)}</div>
      <div class="glass" style="left:64px;bottom:120px">${glass}</div><div class="glass" style="right:64px;top:250px;transform:scaleX(-1)">${glass}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'dresscode', title: 'Dresscode', group: 'Gerinc', size: 'half',
  desc: 'Az öltözködési kód és a nap színei.',
  fields: [
    { k: 'nev', label: 'A dresscode neve', type: 'text', ph: 'Nyári elegancia' },
    { k: 'szoveg', label: 'Leírás', type: 'area' },
    { k: 'szinek', label: 'A nap színei', type: 'rows', max: 6, fields: [{ k: 'nev', label: 'Szín neve', type: 'text' }, { k: 'szin', label: 'Szín', type: 'color' }] },
  ],
  sample: { nev: 'Nyári elegancia', szoveg: 'Világos öltöny, könnyű ruha, kényelmes cipő — a tánctér hosszú lesz. A fehéret hagyjuk a menyasszonynak!',
    szinek: [{ nev: 'Zsálya', szin: '#a3ad92' }, { nev: 'Púder', szin: '#e4c3c0' }, { nev: 'Krém', szin: '#efe6d2' }, { nev: 'Homok', szin: '#cdb59a' }, { nev: 'Olíva', szin: '#6f7a5b' }] },
  css: `
.drc .big{position:absolute;top:100px;left:0;right:0;text-align:center;font-family:'Playfair Display',serif;font-size:34px;letter-spacing:.14em;text-transform:uppercase}
.drc .txt{position:absolute;top:156px;left:80px;right:80px;height:64px;text-align:center;font-style:italic;font-size:15px}
.drc .swc{position:absolute;top:240px;left:30px;right:30px;display:flex;justify-content:center;gap:22px}
.drc .swc div{text-align:center;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--soft)}
.drc .swc b{display:block;width:58px;height:58px;border-radius:50%;margin:0 auto 8px;box-shadow:inset 0 0 0 4px rgba(255,255,255,.5),0 0 0 1px var(--line)}`,
  render(d) {
    return `<div class="drc"><div class="ttl c script">Dresscode</div><div class="big">${esc(d.nev)}</div>
      <div class="txt fit">${paras(d.szoveg)}</div>
      <div class="swc">${(d.szinek || []).filter(s => s.szin).map(s => `<div><b style="background:${esc(s.szin)}"></b>${esc(s.nev)}</div>`).join('')}</div></div>`;
  }
},
];
