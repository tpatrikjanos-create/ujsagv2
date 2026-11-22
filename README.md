# Esküvői Magazin (ujsagv2)

## `magazin/` — a fő alkalmazás

Elegáns, A5-ös esküvői magazin-szerkesztő. **Build és keretrendszer nélkül**, natív ES-modulokkal.
GitHub Pages-en közvetlenül fut: `https://tpatrikjanos-create.github.io/ujsagv2/magazin/`

> Helyben `file://`-ból a modulok nem töltődnek be — egy egyszerű szerverrel nézd:
> `cd magazin && python3 -m http.server` → http://localhost:8000

### Szerkezet
```
magazin/
  index.html            felület
  css/fonts.css         saját tárhelyről kiszolgált betűk (Fontsource, OFL)
  css/magazin.css       paletták (Zsálya / Púder / Noir), oldal, közös elemek
  css/app.css           a szerkesztő felülete
  js/main.js            rovatlista, űrlapok, előnézet, nyomtatás
  js/layout.js          tördelő: rovatok → oldalak, füzet-sorrend
  js/store.js           mentés (localStorage) + képek (IndexedDB), export/import
  js/helpers.js         közös segédek (fotó, monogram, QR, vonalkód…)
  js/vendor/qrcode.mjs  QR-kód könyvtár (MIT)
  rovatok/*.js          a rovatok csoportonként
  assets/minta.jpg      mintafotó
```

### Rovatok (35)
- **Gerinc:** alapadatok, címlap (fotós / klasszikus), hátlap (köszönet + vendéglista + vonalkód), köszöntő, menetrend, étlap, dresscode
- **Rólunk:** számokban a szerelmünk, a sztorink dióhéjban, hogyan ismerkedtünk meg, a legelső közös kép, minden évből egy kép, gyerekkori képek, a lánykérés, jegyesfotók, exkluzív interjú
- **Emberek:** a csapatunk, köszönet a szülőknek, szerelmek melyekből születtünk, akik fentről ünnepelnek, otthonról ünneplő négylábú, a szinglik (2 oldal), díjnyerteseink, az ifjú pár itala
- **Utazás:** utazási rovat, közös bakancslista, nászút
- **Szórakozás:** igaz-hamis, játékok (szókereső + sudoku), a lagzi szabályzata, másnaposság ellen, horoszkóp, GYIK, színező
- **Interaktív:** QR-kód, fotóvadász, robbantsd fel a telefonunkat, hagyj nekünk üzenetet

Minden rovat egy objektum: `{ id, title, group, size: 'full'|'half'|'spread', fields, sample, css, render(d, ctx) }`.
Új rovat = új elem valamelyik `rovatok/*.js` fájlban + az id felvétele a `rovatok/index.js` sorrendjébe.

### Tördelés és nyomtatás
- Fél oldalas rovatok párosával kerülnek egy oldalra; a kétoldalas (szinglik) mindig bal oldalon kezdődik.
- Az oldalszám mindig 4-gyel osztható — a hiányt kitöltő oldalak pótolják (jegyzetek, fotósarok, jókívánságok).
- **Füzet A4-re:** két A5 oldal laponként, helyes sorrendben; kétoldalas nyomtatás (rövid él mentén), félbehajtva kész.
- **Oldalanként A5:** nyomdának vagy PDF-nek.

## Egyéb
- `design/magazin.html` — az első, statikus dizájnminta (önálló fájl).
- `index.html` (gyökér) — korábbi, újság-stílusú kísérlet (AI-interjú + szabad szerkesztő); a magazin váltja le.
