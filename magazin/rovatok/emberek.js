/* EMBEREK: csapat, szülők, emlékezés, kedvencek, szinglik, díjak, italok */
import { esc, br, lines, paras, ph, avatar, initials, HEART } from '../js/helpers.js';
const S = (pos, z = 1) => ({ src: 'assets/minta.jpg', pos, z });

/* aranyrozetta díjakhoz: 24 ágú csillag + szalag */
function rosette(photo, name) {
  const n = 24, R = 64, r = 57; let pts = '';
  for (let i = 0; i < n * 2; i++) { const a = Math.PI * i / n, rr = i % 2 ? r : R; pts += `${(70 + rr * Math.sin(a)).toFixed(1)},${(70 - rr * Math.cos(a)).toFixed(1)} `; }
  return `<div class="ros"><svg class="rs" viewBox="0 0 140 140"><polygon points="${pts}" fill="#d8b44c"/><circle cx="70" cy="70" r="55" fill="#f3dc8a"/></svg>
    <div class="rp">${ph(photo)}</div>
    <svg class="rb" viewBox="0 0 170 60"><path d="M18 18h134l-12 14 12 14H18l12-14z" fill="var(--accent)"/><path d="M40 40l-8 20 14-8 6 12 6-24zM130 40l8 20-14-8-6 12-6-24z" fill="var(--accent)" opacity=".85"/></svg>
    <div class="rn script2">${esc(name)}</div></div>`;
}

export default [
/* ---------------------------------------------------------------- */
{
  id: 'csapat', title: 'A csapatunk', group: 'Emberek', size: 'full',
  desc: 'Tanúk, koszorúslányok, vőfély, szülők — kerek portrékkal és szerepekkel.',
  fields: [
    { k: 'tagok', label: 'A csapat tagjai', type: 'rows', max: 9, fields: [{ k: 'nev', label: 'Név', type: 'text' }, { k: 'szerep', label: 'Szerep', type: 'text' }, { k: 'foto', label: 'Fotó', type: 'photo' }] },
    { k: 'koszonet', label: 'Köszönő szöveg', type: 'area' },
    { k: 'foto', label: 'Csoportkép', type: 'photo' },
  ],
  sample: { koszonet: 'Köszönjük, hogy mellettünk álltok ezen a különleges napon.\nNélkületek nem mondanánk ki az igent.', foto: S('50% 78%', 2.6),
    tagok: [['Kiss Anna', 'Tanú'], ['Nagy Bence', 'Tanú'], ['Tóth Réka', 'Koszorúslány'], ['Varga Zsófi', 'Koszorúslány'], ['Szabó Dani', 'Vőfély'], ['Horváth Márta', 'Az örömanya'], ['Kovács László', 'Az örömapa'], ['Kis Lili', 'Virágszóró kislány']].map(([nev, szerep]) => ({ nev, szerep })) },
  css: `
.csp ul{position:absolute;top:116px;left:30px;width:300px;bottom:40px;margin:0;padding:0;list-style:none;display:flex;flex-direction:column;justify-content:space-around}
.csp li{display:flex;align-items:center;gap:14px}
.csp li:nth-child(odd){margin-left:16px}
.csp .nm{font-size:18px;letter-spacing:.06em;line-height:1}
.csp .rl{font-family:'Pinyon Script',cursive;font-size:19px;color:var(--accent);line-height:1.1}
.csp .thx{position:absolute;right:30px;top:146px;width:186px;border:1px solid var(--line);padding:22px 16px;text-align:center;font-size:14px;line-height:1.45;font-style:italic}
.csp .thx::before{content:"";position:absolute;inset:5px;border:1px solid var(--band2)}
.csp .pic{position:absolute;right:30px;top:404px;width:186px;height:330px}`,
  render(d) {
    const T = (d.tagok || []).filter(x => x.nev);
    return `<div class="csp"><div class="ttl script">Az esküvői csapat</div>
      <ul>${T.map(x => `<li>${avatar(x.foto, x.nev)}<div><div class="nm">${esc(x.nev)}</div><div class="rl">${esc(x.szerep)}</div></div></li>`).join('')}</ul>
      <div class="thx">${paras(d.koszonet)}</div><div class="pic framed">${ph(d.foto)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'szuloknek', title: 'Köszönet a szülőknek', group: 'Emberek', size: 'half',
  desc: 'Pár szívből jövő sor a két szülőpárnak.',
  fields: [
    { k: 'szoveg', label: 'Köszönő szöveg', type: 'area', rows: 4 },
    { k: 'nevek1', label: 'A menyasszony szülei', type: 'text' },
    { k: 'foto1', label: 'Fotó róluk', type: 'photo' },
    { k: 'nevek2', label: 'A vőlegény szülei', type: 'text' },
    { k: 'foto2', label: 'Fotó róluk', type: 'photo' },
  ],
  sample: { nevek1: 'Márta & Laci', nevek2: 'Erika & Józsi', foto1: null, foto2: null,
    szoveg: 'Tőletek tanultuk, milyen a szeretet, ami kitart. Köszönjük a türelmet, a tanácsokat, a vasárnapi ebédeket — és hogy ma is itt vagytok mellettünk.' },
  css: `
.szk .arch{position:absolute;top:96px;width:128px;height:170px;border-radius:64px 64px 0 0;overflow:hidden;padding:5px;background:var(--frame)}
.szk .arch .ph{width:100%;height:100%;border-radius:59px 59px 0 0}
.szk .n{position:absolute;top:278px;width:150px;text-align:center;font-family:'Pinyon Script',cursive;font-size:22px;color:var(--accent)}
.szk .txt{position:absolute;top:110px;left:186px;right:186px;height:240px;text-align:center;font-style:italic;font-size:14.5px;line-height:1.55;display:flex;flex-direction:column;justify-content:center}`,
  render(d) {
    return `<div class="szk"><div class="ttl c script">Köszönjük, Anya &amp; Apa</div>
      <div class="arch" style="left:36px">${ph(d.foto1)}</div><div class="n" style="left:25px">${esc(d.nevek1)}</div>
      <div class="arch" style="right:36px">${ph(d.foto2)}</div><div class="n" style="right:25px">${esc(d.nevek2)}</div>
      <div class="txt fit">${paras(d.szoveg)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'szulok', title: 'Szerelmek, melyekből születtünk', group: 'Emberek', size: 'full',
  desc: 'A szülők esküvői fotói és szerelmük története.',
  fields: [
    { k: 'nevek1', label: '1. pár neve', type: 'text' }, { k: 'ev1', label: 'Esküvőjük éve', type: 'text' }, { k: 'sztori1', label: 'Történetük röviden', type: 'area' }, { k: 'foto1', label: 'Esküvői fotójuk', type: 'photo' },
    { k: 'nevek2', label: '2. pár neve', type: 'text' }, { k: 'ev2', label: 'Esküvőjük éve', type: 'text' }, { k: 'sztori2', label: 'Történetük röviden', type: 'area' }, { k: 'foto2', label: 'Esküvői fotójuk', type: 'photo' },
  ],
  sample: { nevek1: 'Márta & László', ev1: '1994', sztori1: 'Egy falusi búcsúban találkoztak; László három hétig várt a második táncra. Azóta is ő vezet.', foto1: null,
    nevek2: 'Erika & József', ev2: '1996', sztori2: 'Egy buszmegállóban kezdődött, egy elkésett járat miatt. Józsi azóta is mindenhova korán indul.', foto2: null },
  css: `
.szl .sub{position:absolute;top:92px;left:36px}
.szl .col{position:absolute;top:146px;width:228px;bottom:40px}
.szl .col .framed{height:300px}
.szl .col .framed .ph i{filter:grayscale(1) sepia(.15) contrast(1.05)}
.szl .col .n{font-family:'Pinyon Script',cursive;font-size:30px;color:var(--accent);margin-top:14px;line-height:1}
.szl .col .y{font-family:'Playfair Display',serif;font-size:15px;letter-spacing:.2em;margin:6px 0 10px}
.szl .col .s{height:150px;font-size:14px;font-style:italic;line-height:1.5}`,
  render(d) {
    const col = (i, x) => `<div class="col" style="left:${x}px"><div class="framed">${ph(d['foto' + i], '', '', 'esküvői fotó')}</div><div class="n">${esc(d['nevek' + i])}</div><div class="y">${esc(d['ev' + i])}</div><div class="s fit">${paras(d['sztori' + i])}</div></div>`;
    return `<div class="szl"><div class="ttl script" style="font-size:40px;white-space:nowrap">Szerelmek, melyekből születtünk</div><div class="sub kick">a mi történetünk előtt — az övék</div>${col(1, 36)}${col(2, 296)}</div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'memorial', title: 'Akik fentről ünnepelnek', group: 'Emberek', size: 'half',
  desc: 'Emlékezés azokra, akik már nem lehetnek itt.',
  fields: [
    { k: 'nevek', label: 'Nevek', type: 'rows', max: 6, fields: [{ k: 'kapcs', label: 'Kapcsolat (pl. Nagymama)', type: 'text' }, { k: 'nev', label: 'Név', type: 'text' }] },
    { k: 'szoveg', label: 'Egy mondat', type: 'text', ph: 'Ma is velünk vagytok.' },
  ],
  sample: { szoveg: 'Szívünkben ma is velünk táncoltok.', nevek: [['Nagyapa', 'József'], ['Nagymama', 'Ilona'], ['Papa', 'Ferenc'], ['Mami', 'Erzsébet'], ['Keresztapa', 'Gyula']].map(([kapcs, nev]) => ({ kapcs, nev })) },
  css: `
.mem .s{position:absolute;top:96px;left:0;right:0;text-align:center;font-style:italic;font-size:16px;color:var(--soft)}
.mem .hearts{position:absolute;left:26px;right:26px;top:150px;display:flex;justify-content:center;gap:4px;flex-wrap:wrap}
.mem .heart{width:96px;height:88px;position:relative}
.mem .heart svg{position:absolute;inset:0;width:100%;height:100%;fill:var(--heart)}
.mem .heart div{position:absolute;inset:22px 6px 0;text-align:center;font-size:10px;letter-spacing:.12em;line-height:1.25;color:var(--soft);text-transform:uppercase}
.mem .heart:nth-child(odd){transform:rotate(-8deg) translateY(-6px)}
.mem .heart:nth-child(even){transform:rotate(7deg)}`,
  render(d) {
    return `<div class="mem"><div class="ttl script">Szeretettel emlékezünk…</div><div class="s">${esc(d.szoveg)}</div>
      <div class="hearts">${(d.nevek || []).filter(x => x.nev).map(x => `<div class="heart">${HEART}<div>${esc(x.kapcs)}<br>${esc(x.nev)}</div></div>`).join('')}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'negylabu', title: 'Otthonról ünneplő négylábú', group: 'Emberek', size: 'half',
  desc: 'A család szőrös tagja, aki ma otthonról drukkol.',
  fields: [
    { k: 'nev', label: 'Neve', type: 'text', ph: 'Bundás' },
    { k: 'mi', label: 'Ki ő?', type: 'text', ph: 'golden retriever, 4 éves' },
    { k: 'szoveg', label: 'Üzenete a vendégeknek', type: 'area' },
    { k: 'foto', label: 'Fotó', type: 'photo' },
  ],
  sample: { nev: 'Bundás', mi: 'golden retriever · 4 éves · főállású párnamelegítő', foto: null, szoveg: 'Sajnos ma nem tudtam eljönni, mert a tortát nem bíztam volna magamra. Kérlek, egyetek helyettem is egy szelet húst. Vau.' },
  css: `
.ngl .c{position:absolute;left:46px;top:66px;width:230px;height:230px;padding:8px}
.ngl .paw{position:absolute;color:var(--band2);width:34px}
.ngl .t{position:absolute;top:66px;left:300px;right:30px;font-size:34px;line-height:1}
.ngl .n{position:absolute;top:144px;left:300px;right:30px;font-family:'Playfair Display',serif;font-style:italic;font-size:44px;line-height:1;color:var(--accent)}
.ngl .m{position:absolute;top:196px;left:302px;right:30px;line-height:1.5;font-size:9.5px}
.ngl .txt{position:absolute;top:262px;left:300px;right:34px;bottom:40px;font-size:14.5px;font-style:italic;line-height:1.5}`,
  render(d) {
    const paw = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="9" r="2.4"/><circle cx="9.5" cy="5" r="2.4"/><circle cx="14.5" cy="5" r="2.4"/><circle cx="19" cy="9" r="2.4"/><path d="M12 10c-4 0-7 5-7 8 0 2 2 3 4 2.5 1.2-.3 2-.8 3-.8s1.8.5 3 .8c2 .5 4-.5 4-2.5 0-3-3-8-7-8z"/></svg>';
    return `<div class="ngl"><div class="c av">${ph(d.foto, '', '', 'kedvenc fotója')}</div>
      <div class="paw" style="left:252px;top:290px;transform:rotate(20deg)">${paw}</div><div class="paw" style="left:28px;top:300px;transform:rotate(-30deg)">${paw}</div>
      <div class="t script">Otthonról ünnepel</div><div class="n">${esc(d.nev)}</div><div class="m kick">${esc(d.mi)}</div><div class="txt fit">${paras(d.szoveg)}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'szinglik', title: 'A szinglik', group: 'Emberek', size: 'spread',
  desc: 'Két oldalon: a lagzi szinglijei randiapp-profilként, asztalszámmal.',
  fields: [
    { k: 'holgyek', label: 'A hölgyek (max. 2)', type: 'rows', max: 2, fields: [{ k: 'nev', label: 'Név', type: 'text' }, { k: 'kor', label: 'Kor', type: 'text', w: 50 }, { k: 'varos', label: 'Város', type: 'text' }, { k: 'rolam', label: 'Rólam', type: 'area', rows: 2 }, { k: 'keres', label: 'Akit keresek', type: 'text' }, { k: 'zaszlo', label: 'Zöld zászló', type: 'text' }, { k: 'asztal', label: 'Asztal', type: 'text', w: 50 }, { k: 'foto', label: 'Fotó', type: 'photo' }] },
    { k: 'urak', label: 'Az urak (max. 2)', type: 'rows', max: 2, fields: [{ k: 'nev', label: 'Név', type: 'text' }, { k: 'kor', label: 'Kor', type: 'text', w: 50 }, { k: 'varos', label: 'Város', type: 'text' }, { k: 'rolam', label: 'Rólam', type: 'area', rows: 2 }, { k: 'keres', label: 'Akit keresek', type: 'text' }, { k: 'zaszlo', label: 'Zöld zászló', type: 'text' }, { k: 'asztal', label: 'Asztal', type: 'text', w: 50 }, { k: 'foto', label: 'Fotó', type: 'photo' }] },
  ],
  sample: {
    holgyek: [{ nev: 'Réka', kor: '27', varos: 'Budapest', rolam: 'Hétvégén tánctér, hétköznap Excel-táblák. Mindig ő kezdi a vastapsot.', keres: 'aki bírja a tempót a csárdásnál.', zaszlo: 'tudja, hol a pálinkás asztal.', asztal: '6' },
      { nev: 'Zsófi', kor: '24', varos: 'Győr', rolam: 'Reggeli jóga, villásreggeli-tervek, erős vélemények, puha szív.', keres: 'nyugodt srác jó dumával.', zaszlo: 'a legaranyosabb randikat tervezi.', asztal: '2' }],
    urak: [{ nev: 'Dani', kor: '29', varos: 'Debrecen', rolam: 'Zenefüggő, laza, mindig benne van egy jó kajában. Hosszú séták és jeges kávé.', keres: 'aki könnyen nevet.', zaszlo: 'garantáltan jó a lejátszási listája.', asztal: '2' },
      { nev: 'Gergő', kor: '28', varos: 'Szeged', rolam: 'Kirándulós, nyugis, és valahogy mindig tudja, hol a legjobb lángos.', keres: 'valakit, aki vicces és őszinte.', zaszlo: 'tudja, hol kell enni.', asztal: '4' }] },
  css: `
.sng{position:absolute;inset:0;background:linear-gradient(180deg,var(--paper) 0,var(--paper) 72%,var(--band) 100%)}
.sng .bub{position:absolute;left:0;right:0;bottom:0;height:170px;opacity:.7;background:radial-gradient(circle at 8% 70%,var(--band2) 0 26px,transparent 27px),radial-gradient(circle at 28% 92%,var(--band2) 0 34px,transparent 35px),radial-gradient(circle at 52% 76%,var(--band2) 0 20px,transparent 21px),radial-gradient(circle at 74% 95%,var(--band2) 0 38px,transparent 39px),radial-gradient(circle at 94% 72%,var(--band2) 0 24px,transparent 25px)}
.sng .big{position:absolute;top:34px;font-family:'Playfair Display',serif;font-weight:800;font-size:66px;letter-spacing:-.01em;line-height:1;white-space:nowrap}
.sng.l .big{right:12px}.sng.r .big{left:12px}
.sng .sub{position:absolute;top:116px;font-size:38px;color:var(--accent)}
.sng.l .sub{left:56px}.sng.r .sub{left:96px}
.sng .tag{position:absolute;top:160px;font-style:italic;font-size:14.5px;color:var(--soft)}
.sng.l .tag{left:56px}.sng.r .tag{left:96px}
.sng .arrow{position:absolute;top:110px;width:70px;height:40px}
.sng.l .arrow{left:220px}.sng.r .arrow{left:18px;transform:scaleX(-1)}
.sng .phones{position:absolute;top:206px;left:26px;right:26px;display:flex;justify-content:space-around}
.sng .phone{width:240px;height:452px;border-radius:34px;background:#1c1a1a;padding:8px;position:relative;box-shadow:0 14px 24px -12px rgba(0,0,0,.45)}
.sng .phone:nth-child(1){transform:rotate(-2.5deg)}.sng .phone:nth-child(2){transform:rotate(2deg) translateY(10px)}
.sng .scr{width:100%;height:100%;border-radius:27px;background:#fff;overflow:hidden;font-family:'Montserrat',sans-serif;color:#222;padding:10px 12px;position:relative;line-height:1.35}
.sng .notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:92px;height:18px;background:#1c1a1a;border-radius:0 0 12px 12px}
.sng .sb{display:flex;justify-content:space-between;font-size:8.5px;font-weight:600;padding:0 6px}
.sng .app{text-align:center;font-size:10.5px;font-weight:600;margin:9px 0 7px}
.sng .sp{height:150px;border-radius:6px;position:relative;overflow:hidden}
.sng .sp .ph{position:absolute;inset:0}
.sng .sp .mono{position:absolute;left:10px;bottom:4px;font-family:'Playfair Display',serif;font-style:italic;font-size:64px;color:rgba(255,255,255,.9);line-height:1}
.sng .who{font-size:14px;font-weight:600;margin:8px 0 0}
.sng .city{font-size:8.5px;color:#777;margin-bottom:6px}
.sng .box{background:var(--band);border-radius:5px;padding:6px 8px;font-size:8.6px;line-height:1.38;margin-bottom:6px;max-height:58px;overflow:hidden}
.sng .box b{display:block;font-size:8.5px}
.sng .look{font-size:8.6px;line-height:1.35;margin:0 0 6px;padding-left:16px;position:relative}
.sng .look::before{content:"♥";position:absolute;left:2px;top:0;color:#d0526a;font-size:10px}
.sng .flag{background:#eef1e3;border:1px solid #d6dcc1;border-radius:5px;padding:5px 8px 5px 24px;font-size:8.5px;line-height:1.35;position:relative}
.sng .flag::before{content:"⚑";position:absolute;left:8px;top:4px;color:#5f8a3a;font-size:11px}
.sng .btns{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:9px}
.sng .btns span{width:26px;height:26px;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:12px;background:#fff}
.sng .btns span.x{width:34px;height:34px;font-size:15px;color:#888}
.sng .btns span.h{width:34px;height:34px;font-size:16px;color:#e03a55}
.sng .table{position:absolute;bottom:-50px;left:0;right:0;text-align:center;font-family:'Playfair Display',serif;font-weight:700;font-style:italic;font-size:30px;color:var(--ink)}`,
  render(d) {
    const grads = ['#c99aa3,#8f6a7d', '#b9c2a3,#6f7f62', '#8d9aa8,#4f5c6b', '#c4a98a,#8a6d52'];
    const arrow = '<svg class="arrow" viewBox="0 0 70 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M64 8c-10 2-18 14-8 18s4-16-12-10S22 32 8 30"/><path d="M14 24l-6 6 8 2"/></svg>';
    const phone = (p, g) => `<div class="phone"><div class="scr"><div class="notch"></div><div class="sb"><span>21:44</span><span>● ▮</span></div><div class="app">Lagzi Match</div>
      <div class="sp" style="background:linear-gradient(140deg,${g})">${p.foto ? ph(p.foto) : `<div class="mono">${esc(initials(p.nev))}</div>`}</div>
      <div class="who">${esc(p.nev)}${p.kor ? ', ' + esc(p.kor) : ''}</div><div class="city">${esc(p.varos)}</div>
      <div class="box"><b>Rólam</b>${esc(p.rolam)}</div><div class="look"><b>Akit keresek:</b><br>${esc(p.keres)}</div>
      <div class="flag"><b>Zöld zászló:</b> ${esc(p.zaszlo)}</div><div class="btns"><span>↺</span><span class="x">✕</span><span class="h">♥</span><span>⚡</span></div></div>
      ${p.asztal ? `<div class="table">${esc(p.asztal)}. asztal</div>` : ''}</div>`;
    const H = (d.holgyek || []).filter(x => x.nev), U = (d.urak || []).filter(x => x.nev);
    return [
      `<div class="sng l"><div class="bub"></div><div class="big">Szinglik</div><div class="sub script">A hölgyek</div>${arrow}<div class="tag">Gyönyörűek, viccesek és hivatalosan szabadok.</div><div class="phones">${H.map((p, i) => phone(p, grads[i])).join('')}</div></div>`,
      `<div class="sng r"><div class="bub"></div><div class="big">a lagziban</div>${arrow}<div class="sub script">Az urak</div><div class="tag">Elbűvölőek, magabiztosak — és még foglalhatók.</div><div class="phones">${U.map((p, i) => phone(p, grads[i + 2])).join('')}</div></div>`];
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'dijak', title: 'Díjnyerteseink', group: 'Emberek', size: 'full',
  desc: 'Vendégdíjak aranyrozettával: első visszajelző, legmesszebbről érkező…',
  fields: [
    { k: 'dijak', label: 'Díjak', type: 'rows', max: 4, fields: [{ k: 'dij', label: 'A díj neve', type: 'text' }, { k: 'nev', label: 'Ki kapja?', type: 'text' }, { k: 'indok', label: 'Indoklás', type: 'area', rows: 2 }, { k: 'foto', label: 'Fotó', type: 'photo' }] },
  ],
  sample: { dijak: [
    { dij: 'Korán kelő madár díj', nev: 'Zsuzsi', indok: 'Mert előbb jelzett vissza, mint hogy mi kitaláltuk volna az ültetési rendet.' },
    { dij: 'Időzónákon át a pezsgőért', nev: 'Gyuri bácsi', indok: 'Kanadából repült haza, hogy ma velünk koccintson. A jet lag ma nem kifogás!' },
    { dij: 'Legizgatottabb vendég', nev: 'Maja', indok: 'Mindennap küldött egy visszaszámláló üzenetet. A lelkesedésed ragályos!' }] },
  css: `
.djk .vert{position:absolute;right:-6px;top:40px;bottom:40px;writing-mode:vertical-rl;font-family:'Playfair Display',serif;font-size:60px;letter-spacing:.06em;text-transform:uppercase;line-height:1;text-align:center}
.djk .ln{position:absolute;right:76px;top:40px;bottom:40px;width:1px;background:var(--ink)}
.djk .list{position:absolute;left:24px;right:96px;top:34px;bottom:34px;display:flex;flex-direction:column;justify-content:space-around}
.djk .aw{display:flex;align-items:center;gap:18px}
.djk .ros{position:relative;width:150px;height:170px;flex-shrink:0}
.djk .ros .rs{position:absolute;left:5px;top:0;width:140px;height:140px}
.djk .ros .rp{position:absolute;left:24px;top:19px;width:102px;height:102px;border-radius:50%;overflow:hidden}
.djk .ros .rp .ph{width:100%;height:100%}
.djk .ros .rb{position:absolute;left:-10px;top:104px;width:170px;height:60px}
.djk .ros .rn{position:absolute;left:0;right:0;top:120px;text-align:center;color:#fff;font-size:20px}
.djk .aw h4{margin:0 0 6px;font-family:'Playfair Display',serif;font-weight:400;font-size:20px;line-height:1.15}
.djk .aw p{font-size:11px;letter-spacing:.12em;text-transform:uppercase;line-height:1.55;margin:0}`,
  render(d) {
    return `<div class="djk"><div class="vert">Vendégdíjak</div><div class="ln"></div>
      <div class="list">${(d.dijak || []).filter(x => x.dij).map(x => `<div class="aw">${rosette(x.foto, x.nev)}<div><h4>${esc(x.dij)}</h4><p>${esc(x.indok)}</p></div></div>`).join('')}</div></div>`;
  }
},
/* ---------------------------------------------------------------- */
{
  id: 'drinks', title: 'Férj/feleség itala', group: 'Emberek', size: 'half',
  desc: 'A menyasszony és a vőlegény kedvenc koktélja — receptkártyaként.',
  fields: [
    { k: 'nev1', label: 'Az ő itala — neve', type: 'text' }, { k: 'recept1', label: 'Hozzávalók (soronként)', type: 'area', rows: 3 },
    { k: 'nev2', label: 'Az ő itala — neve', type: 'text' }, { k: 'recept2', label: 'Hozzávalók (soronként)', type: 'area', rows: 3 },
  ],
  sample: { nev1: 'Púder Spritz', recept1: 'Prosecco\nRózsaszirup\nSzóda\nEgy szem málna', nev2: 'A Vőlegény Kedvence', recept2: 'Házi barackpálinka\nJég\nNincs több hozzávaló' },
  css: `
.drk .card{position:absolute;top:86px;width:228px;height:278px;background:var(--paper2);border-radius:114px 114px 8px 8px;text-align:center;padding:34px 22px 20px}
.drk .card svg{width:46px;height:62px;color:var(--accent)}
.drk .card .w{font-family:'Pinyon Script',cursive;font-size:20px;color:var(--soft);margin-top:4px}
.drk .card h4{margin:2px 0 10px;font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:24px;line-height:1.1}
.drk .card div.r{font-size:11px;letter-spacing:.16em;text-transform:uppercase;line-height:1.7;height:100px}`,
  render(d, ctx) {
    const g1 = '<svg viewBox="0 0 46 62" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6 6h34L23 30zM23 30v24M13 56h20M30 12l8-8"/><circle cx="36" cy="6" r="3"/></svg>';
    const g2 = '<svg viewBox="0 0 46 62" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M14 18h18v34a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4zM14 30h18"/><path d="M20 10c0-4 6-4 6 0v8h-6z"/></svg>';
    return `<div class="drk"><div class="ttl c script">Az ifjú pár itala</div>
      <div class="card" style="left:42px">${g1}<div class="w">${esc(ctx.meta.n1)} itala</div><h4>${esc(d.nev1)}</h4><div class="r fit">${br(d.recept1)}</div></div>
      <div class="card" style="right:42px">${g2}<div class="w">${esc(ctx.meta.n2)} itala</div><h4>${esc(d.nev2)}</h4><div class="r fit">${br(d.recept2)}</div></div></div>`;
  }
},
];
