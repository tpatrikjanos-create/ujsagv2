/* RÓLUNK: a pár története */
import { esc, br, lines, paras, ph, huDate } from '../js/helpers.js';
const S = (pos, z = 1) => ({ src: 'assets/minta.jpg', pos, z });

export default [
/* ---------------------------------------------------------------- */
{
  id: 'szamok', title: 'Számokban a szerelmünk', group: 'Rólunk', size: 'full',
  desc: 'Vicces statisztikák: felpróbált ruhák, évek együtt, hónapok szervezés…',
  fields: [
    { k: 'szamok', label: 'Számok', type: 'rows', max: 5, fields: [{ k: 'szam', label: 'Szám', type: 'text', w: 70 }, { k: 'mi', label: 'Mi? (2 sor is lehet)', type: 'text' }] },
    { k: 'rsvp', label: 'Elsőként jeleztek vissza', type: 'text', ph: 'Zsuzsa & Béla' },
    { k: 'kedvencek', label: 'Apróságok rólunk', type: 'rows', max: 3, fields: [{ k: 'k', label: 'Kérdés', type: 'text' }, { k: 'v', label: 'Válasz', type: 'text' }] },
    { k: 'foto', label: 'Fotó', type: 'photo' },
  ],
  sample: { rsvp: 'Zsuzsa & Béla', foto: S('44% 22%', 2.4),
    szamok: [['10', 'felpróbált menyasszonyi ruha'], ['01', 'felpróbált öltöny'], ['03', 'megnézett helyszín'], ['07', 'év együtt'], ['18', 'hónap szervezés']].map(([szam, mi]) => ({ szam, mi })),
    kedvencek: [{ k: 'Első közös film', v: 'Titanic (Patrik elaludt)' }, { k: 'Kedvenc kaja', v: 'lángos a Balatonnál' }, { k: 'Ki mondta ki előbb?', v: 'Dorina — de tagadja' }] },
  css: `
.szm .pic{position:absolute;left:30px;top:118px;width:212px;height:372px}
.szm .bands{position:absolute;left:262px;right:0;top:124px;display:flex;flex-direction:column;gap:9px}
.szm .band{background:var(--band);height:66px;display:flex;align-items:center;gap:16px;padding-left:16px}
.szm .band b{font-family:'Playfair Display',serif;font-weight:400;font-size:48px;color:var(--accent);line-height:1;min-width:62px}
.szm .band span{font-size:18.5px;line-height:1.02;letter-spacing:.06em}
.szm .rsvp{position:absolute;left:30px;right:30px;top:514px;background:var(--band);text-align:center;padding:14px 10px 12px}
.szm .rsvp .script2{font-size:30px;color:var(--accent);margin-top:2px}
.szm .star{position:absolute;left:-12px;top:-16px;width:30px;height:30px;color:var(--accent)}
.szm .fav{position:absolute;left:30px;right:30px;top:626px;display:flex;gap:16px}
.szm .fav div{flex:1;text-align:center;border-top:1px solid var(--line);padding-top:12px}
.szm .fav small{display:block;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--soft);margin-bottom:6px}
.szm .fav span{font-family:'Pinyon Script',cursive;font-size:21px;line-height:1.15;color:var(--ink)}`,
  render(d) {
    const two = s => { const w = String(s || '').trim().split(/\s+/); if (w.length < 2) return esc(s); return esc(w[0]) + '<br>' + esc(w.slice(1).join(' ')); };
    return `<div class="szm"><div class="ttl script">A számok</div>
      <div class="pic framed">${ph(d.foto)}</div>
      <div class="bands">${(d.szamok || []).filter(x => x.szam || x.mi).map(x => `<div class="band"><b>${esc(x.szam)}</b><span>${two(x.mi)}</span></div>`).join('')}</div>
      ${d.rsvp ? `<div class="rsvp"><svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg><div class="kick">Elsőként jeleztek vissza</div><div class="script2">${esc(d.rsvp)}</div></div>` : ''}
      <div class="fav">${(d.kedvencek || []).filter(x => x.k).map(x => `<div><small>${esc(x.k)}</small><span>${esc(x.v)}</span></div>`).join('')}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'sztori', title: 'A sztorink dióhéjban', group: 'Rólunk', size: 'full',
  desc: 'A szerelmetek története egy bekezdésben, idővonallal.',
  fields: [
    { k: 'cimke', label: 'Felirat a fotón', type: 'text', ph: 'Így kezdődött' },
    { k: 'szoveg', label: 'A történet (kb. 80–120 szó)', type: 'area', rows: 6, ai: 'sztori' },
    { k: 'ido', label: 'Idővonal', type: 'rows', max: 4, fields: [{ k: 'mi', label: 'Esemény', type: 'text' }, { k: 'ev', label: 'Év', type: 'text', w: 60 }, { k: 'foto', label: 'Fotó', type: 'photo' }] },
    { k: 'foto', label: 'Nagy fotó', type: 'photo' },
  ],
  sample: { cimke: 'Így kezdődött', foto: S('50% 24%'),
    szoveg: 'Teljesen véletlenül találkoztunk — Patrik késett, Dorina épp indult volna haza, és valahogy pont ez lett a tökéletes időzítés. Egy beszélgetésből késő esti hazasétálások lettek, közös reggelek, és az a fajta szerelem, ami az első perctől könnyűnek tűnt. Valahol a jeges kávék, a költözős dobozok és a lejátszási listákon vívott viták között a „mi ketten” csendben örökké lett. Aztán jött a lánykérés a tóparton: naplemente, egy elrejtett gyűrű, boldog könnyek — és egy válasz, amit már mindenki sejtett.',
    ido: [{ mi: 'Megismerkedtünk', ev: '2019', foto: S('40% 26%', 3.6) }, { mi: 'Összeköltöztünk', ev: '2022', foto: S('50% 8%', 3) }, { mi: 'Első közös nyaralás', ev: '2023', foto: S('92% 44%', 3.2) }, { mi: 'Igen!', ev: '2025', foto: S('50% 82%', 2.6) }] },
  css: `
.szt .hero{position:absolute;left:0;right:0;top:0;height:330px}
.szt .hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.45))}
.szt .began{position:absolute;left:30px;top:178px;color:#fff;font-size:56px;z-index:2;transform:rotate(-8deg);line-height:.85;text-shadow:0 2px 14px rgba(0,0,0,.3)}
.szt .began small{display:block;font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:.3em;text-transform:uppercase;margin:10px 0 0 40px}
.szt .t{position:absolute;top:346px;left:0;right:0;text-align:center;font-size:52px}
.szt .txt{position:absolute;top:410px;left:44px;right:44px;height:140px;font-size:13.2px;line-height:1.48}
.szt .dv{position:absolute;top:560px;left:0;right:0}
.szt .tl{position:absolute;left:24px;right:24px;top:584px;height:186px}
.szt .tl svg.ln{position:absolute;inset:0;width:100%;height:100%}
.szt .tl .av{position:absolute;width:84px;height:84px;padding:5px;background:var(--band)}
.szt .tl .lbl{position:absolute;font-size:21px;line-height:.95;width:116px}`,
  render(d) {
    const P = [[0, 6], [118, 96], [236, 6], [354, 96]], L = [[90, 20], [208, 110], [326, 20], [444, 106]];
    const it = (d.ido || []).slice(0, 4);
    return `<div class="szt">${ph(d.foto, 'hero')}<div class="began script">${esc(d.cimke)}<small>A mi történetünk</small></div>
      <div class="t script">Szerelmünk története</div><div class="txt fit just">${paras(d.szoveg)}</div>
      <div class="dv divider"><i></i>♡<i></i></div>
      <div class="tl"><svg class="ln" viewBox="0 0 512 186" preserveAspectRatio="none"><path d="M42 48 C96 140 116 140 160 138 S240 40 278 48 S360 150 396 138" fill="none" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="2 6" stroke-linecap="round"/></svg>
      ${it.map((x, i) => `<div class="av" style="left:${P[i][0]}px;top:${P[i][1]}px">${ph(x.foto)}</div><div class="lbl script" style="left:${L[i][0]}px;top:${L[i][1]}px;">${esc(x.mi)}<br>${esc(x.ev)}</div>`).join('')}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'ismerkedes', title: 'Hogyan ismerkedtünk meg?', group: 'Rólunk', size: 'half',
  desc: 'Az első találkozás története egy polaroid fotóval.',
  fields: [
    { k: 'hol', label: 'Hol és mikor?', type: 'text', ph: 'Egy barátunk szülinapján, 2019 tavaszán' },
    { k: 'szoveg', label: 'A történet', type: 'area', rows: 5 },
    { k: 'foto', label: 'Fotó', type: 'photo' },
  ],
  sample: { hol: 'Egy barátunk szülinapján · 2019 tavaszán', foto: S('50% 30%', 1.6),
    szoveg: 'Patrik kiöntötte a pezsgőt Dorina cipőjére, aztán egész este bocsánatot kért — táncolva. Dorina szerint ez volt a legügyetlenebb csajozós trükk, amit valaha látott. Működött.' },
  css: `
.ism .pol{position:absolute;left:44px;top:58px;width:190px;height:262px;transform:rotate(-4deg)}
.ism .t{position:absolute;top:40px;left:262px;right:24px;font-size:40px;line-height:.95}
.ism .hol{position:absolute;top:150px;left:264px;right:34px}
.ism .txt{position:absolute;top:180px;left:264px;right:34px;bottom:40px;font-size:14px;line-height:1.5}`,
  render(d) {
    return `<div class="ism"><div class="pol polaroid">${ph(d.foto)}</div><div class="t script">Így ismerkedtünk meg</div>
      <div class="hol kick">${esc(d.hol)}</div><div class="txt fit just">${paras(d.szoveg)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'legelsokep', title: 'A legelső közös kép', group: 'Rólunk', size: 'half',
  desc: 'Az első fotó, amin együtt vagytok — és a története.',
  fields: [
    { k: 'mikor', label: 'Mikor készült?', type: 'text' },
    { k: 'szoveg', label: 'Mi történt a képen?', type: 'area' },
    { k: 'foto', label: 'A legelső közös kép', type: 'photo' },
  ],
  sample: { mikor: '2019. április 13.', foto: S('50% 25%', 1.3), szoveg: 'Ezen a képen még nem is sejtettük, mi lesz ebből. Dorina szerint Patrik már akkor is a jobbik profilját mutatta.' },
  css: `
.lek .t{position:absolute;top:30px;left:34px;width:240px;font-size:46px;line-height:.92}
.lek .pol{position:absolute;right:52px;top:40px;width:230px;height:300px;transform:rotate(3deg)}
.lek .pol .cap{position:absolute;left:0;right:0;bottom:6px;text-align:center;font-family:'Sacramento',cursive;font-size:22px;color:#333}
.lek .m{position:absolute;top:140px;left:36px;width:200px}
.lek .txt{position:absolute;top:170px;left:36px;width:206px;bottom:40px;font-size:15px;font-style:italic;line-height:1.5}`,
  render(d) {
    return `<div class="lek"><div class="t script">A legelső<br>közös kép</div><div class="pol polaroid">${ph(d.foto)}<div class="cap">${esc(d.mikor)}</div></div>
      <div class="m kick">${esc(d.mikor)}</div><div class="txt fit">${paras(d.szoveg)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'years', title: 'Minden évből egy kép', group: 'Rólunk', size: 'full',
  desc: 'Évenként egy közös fotó — a kapcsolatotok képes idővonala.',
  fields: [
    { k: 'kepek', label: 'Évek és képek', type: 'rows', max: 9, fields: [{ k: 'ev', label: 'Év', type: 'text', w: 60 }, { k: 'felirat', label: 'Felirat', type: 'text' }, { k: 'foto', label: 'Fotó', type: 'photo' }] },
  ],
  sample: { kepek: [['2019', 'az első nyár', '40% 26%', 2.6], ['2020', 'karantén-sütések', '50% 70%', 2], ['2021', 'Horvátország', '60% 30%', 1.8], ['2022', 'saját lakás', '50% 10%', 2.4], ['2023', 'Bundás érkezik', '30% 60%', 2.2], ['2024', 'Párizs', '70% 26%', 2.6], ['2025', 'a lánykérés', '50% 30%', 1.2], ['2026', 'szervezés…', '90% 50%', 2.6], ['2027', 'IGEN!', '50% 28%', 1.6]].map(([ev, felirat, p, z]) => ({ ev, felirat, foto: S(p, z) })) },
  css: `
.yrs .grid{position:absolute;left:34px;right:34px;top:116px;bottom:50px;display:grid;gap:14px 14px}
.yrs .c{display:flex;flex-direction:column;min-height:0}
.yrs .c .ph{flex:1;min-height:0;box-shadow:0 0 0 6px var(--frame)}
.yrs .c b{font-family:'Playfair Display',serif;font-weight:400;font-size:22px;color:var(--accent);margin-top:10px;line-height:1}
.yrs .c span{font-family:'Sacramento',cursive;font-size:20px;line-height:1}`,
  render(d) {
    const K = (d.kepek || []).filter(x => x.ev || x.foto).slice(0, 9), n = K.length || 1;
    const cols = n <= 4 ? 2 : 3, rows = Math.ceil(n / cols);
    return `<div class="yrs"><div class="ttl script">Minden évből egy kép</div>
      <div class="grid" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr)">
      ${K.map((x, i) => `<div class="c" style="transform:rotate(${[-1.2, .8, -.4, 1, -.8, .5, -1, .7, -.3][i]}deg)">${ph(x.foto)}<b>${esc(x.ev)}</b><span>${esc(x.felirat)}</span></div>`).join('')}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'childhood', title: 'Gyerekkori képek', group: 'Rólunk', size: 'half',
  desc: '„Ezek a gyerekek összeházasodnak!” — két babafotó fekete-fehérben.',
  fields: [
    { k: 'cim', label: 'Felirat', type: 'text', ph: 'Ezek a gyerekek összeházasodnak!' },
    { k: 'foto1', label: 'A menyasszony babafotója', type: 'photo' },
    { k: 'foto2', label: 'A vőlegény babafotója', type: 'photo' },
  ],
  sample: { cim: 'Ezek a gyerekek összeházasodnak!', foto1: S('62% 25%', 3.3), foto2: S('36% 24%', 3.3) },
  css: `
.chd .t{position:absolute;top:26px;left:0;right:0;text-align:center;font-size:40px;transform:rotate(-2deg)}
.chd .pair{position:absolute;left:70px;right:70px;top:96px;height:240px;display:flex;gap:7px;padding:7px;background:var(--frame);transform:rotate(-1deg)}
.chd .pair .ph{flex:1}
.chd .pair .ph i{filter:grayscale(1) contrast(1.1)}
.chd .nm{position:absolute;top:350px;left:70px;right:70px;display:flex}
.chd .nm div{flex:1;text-align:center}`,
  render(d, ctx) {
    return `<div class="chd"><div class="t script">${esc(d.cim)}</div><div class="pair">${ph(d.foto1, '', '', 'babafotó')}${ph(d.foto2, '', '', 'babafotó')}</div>
      <div class="nm kick"><div>${esc(ctx.meta.n1)}</div><div>${esc(ctx.meta.n2)}</div></div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'lanykeres', title: 'A lánykérés', group: 'Rólunk', size: 'full',
  desc: 'A nagy pillanat: hol, hogyan, és mi volt a válasz.',
  fields: [
    { k: 'cim', label: 'Cím a fotón', type: 'text', ph: 'Igent mondott!' },
    { k: 'hol', label: 'Hol és mikor?', type: 'text' },
    { k: 'szoveg', label: 'Hogyan történt?', type: 'area', rows: 6 },
    { k: 'valasz', label: 'A válasz szó szerint', type: 'text', ph: 'Igen, de állj fel, mert látnak!' },
    { k: 'foto', label: 'Fotó', type: 'photo' },
  ],
  sample: { cim: 'Igent mondott!', hol: 'Öreg-tó, Tata · 2025. augusztus 14.', valasz: 'Igen! …de állj fel, mert látnak!', foto: S('50% 28%'),
    szoveg: 'Patrik hetekig tervezte: naplemente a stégen, elrejtett gyűrű a pikniktáskában, egy barát a bokorban fényképezővel. Ami nem volt a tervben: a hirtelen szél, ami majdnem a tóba fújta a gyűrűs dobozt, és egy kíváncsi kacsa, ami végig a jelenetet figyelte. Dorina először azt hitte, Patrik a cipőfűzőjét köti. Aztán sírt. Aztán nevetett. Aztán igent mondott.' },
  css: `
.lnk .hero{position:absolute;left:0;right:0;top:0;height:470px}
.lnk .hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,.5))}
.lnk .big{position:absolute;left:34px;top:370px;color:#fff;font-size:72px;z-index:2;transform:rotate(-6deg);text-shadow:0 2px 16px rgba(0,0,0,.3)}
.lnk .hol{position:absolute;top:492px;left:34px;right:34px;text-align:center}
.lnk .txt{position:absolute;top:524px;left:34px;width:300px;bottom:42px;font-size:13.4px;line-height:1.5}
.lnk .q{position:absolute;top:530px;left:356px;right:30px;bottom:50px;display:flex;flex-direction:column;justify-content:center;text-align:center}
.lnk .q .m{font-family:'Playfair Display',serif;font-size:70px;line-height:.5;color:var(--accent);height:34px}
.lnk .q .s{font-family:'Pinyon Script',cursive;font-size:28px;line-height:1.15;color:var(--accent)}`,
  render(d) {
    return `<div class="lnk">${ph(d.foto, 'hero')}<div class="big script">${esc(d.cim)}</div><div class="hol kick">${esc(d.hol)}</div>
      <div class="txt fit just">${paras(d.szoveg)}</div><div class="q"><div class="m">“</div><div class="s fit">${esc(d.valasz)}</div></div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'jegyesfoto', title: 'A jegyesfotózás képei', group: 'Rólunk', size: 'full',
  desc: 'Kollázs a jegyesfotózás legjobb képeiből.',
  fields: [
    { k: 'fotos', label: 'Fotós neve (köszönet)', type: 'text' },
    { k: 'kepek', label: 'Képek (max. 5)', type: 'photos', max: 5 },
  ],
  sample: { fotos: 'Fotó: Kovács Lilla Photography', kepek: [S('50% 28%'), S('30% 25%', 2.2), S('70% 30%', 2), S('50% 85%', 2.2), S('50% 6%', 2.6)] },
  css: `
.jgy .credit{position:absolute;top:104px;left:36px}
.jgy .k{position:absolute;box-shadow:0 0 0 7px #fff,0 8px 18px -8px rgba(0,0,0,.4)}`,
  render(d) {
    const K = d.kepek || [], pos = [[36, 140, 280, 380, -1.5], [338, 124, 190, 200, 2], [338, 346, 190, 170, -1], [44, 546, 230, 200, 1.5], [296, 540, 230, 210, -2]];
    return `<div class="jgy"><div class="ttl script">Jegyesfotózás</div><div class="credit kick">${esc(d.fotos)}</div>
      ${pos.map((p, i) => ph(K[i], 'k', `left:${p[0]}px;top:${p[1]}px;width:${p[2]}px;height:${p[3]}px;transform:rotate(${p[4]}deg)`)).join('')}</div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'interju', title: 'Exkluzív interjú', group: 'Rólunk', size: 'full',
  desc: 'A szerkesztőség kérdez, az ifjú pár válaszol.',
  fields: [
    { k: 'kiemeles', label: 'Kiemelt idézet', type: 'text' },
    { k: 'kerdesek', label: 'Kérdések és válaszok', type: 'rows', max: 6, fields: [{ k: 'k', label: 'Kérdés', type: 'text' }, { k: 'v', label: 'Válasz', type: 'area', rows: 2 }] },
    { k: 'foto', label: 'Fotó', type: 'photo' },
  ],
  sample: { kiemeles: '„Az első randin tudtam, hogy ő lesz az. A második randin ő is tudta.”', foto: S('50% 28%', 1.5),
    kerdesek: [{ k: 'Ki a romantikusabb?', v: 'D: Én. P: Én. — A szerkesztőség döntetlent hirdet.' }, { k: 'Mi volt a legnehezebb a szervezésben?', v: 'Az ültetési rend. Három verziót dobtunk ki, és Józsi bácsi még mindig a táncparkett mellé akar ülni.' }, { k: 'Ki főz otthon?', v: 'Patrik. Dorina mosogat, és ezt mindketten jó üzletnek tartják.' }, { k: 'Mit üzentek a vendégeknek?', v: 'Egyetek, igyatok, táncoljatok — ma nincs holnap.' }] },
  css: `
.inj .h{position:absolute;top:34px;left:34px;font-family:'Playfair Display',serif;font-weight:800;font-size:46px;line-height:.95}
.inj .h em{display:block;font-family:'Sacramento',cursive;font-style:normal;font-weight:400;font-size:40px;color:var(--accent)}
.inj .sub{position:absolute;top:150px;left:36px;width:300px}
.inj .av{position:absolute;right:36px;top:34px;width:150px;height:150px;padding:6px}
.inj .pq{position:absolute;left:36px;right:36px;top:200px;padding:16px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-family:'Playfair Display',serif;font-style:italic;font-size:19px;line-height:1.35;text-align:center;color:var(--accent)}
.inj .qa{position:absolute;left:36px;right:36px;top:304px;bottom:44px;column-count:2;column-gap:26px;column-fill:balance;font-size:15.5px;line-height:1.5}
.inj .qa div{break-inside:avoid;margin-bottom:16px}
.inj .qa b{display:block;font-family:'Playfair Display',serif;font-weight:700;font-size:.95em;margin-bottom:3px}`,
  render(d) {
    return `<div class="inj"><div class="h">Exkluzív<em>interjú</em></div><div class="sub kick">A szerkesztőség kérdez, az ifjú pár válaszol</div>
      <div class="av">${ph(d.foto)}</div><div class="pq">${esc(d.kiemeles)}</div>
      <div class="qa fit">${(d.kerdesek || []).filter(x => x.k).map(x => `<div><b>${esc(x.k)}</b>${br(x.v)}</div>`).join('')}</div></div>`;
  }
},
];
