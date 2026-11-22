# Esküvői Újság — v2

Egyfájlos webapp (`index.html`), build és keretrendszer nélkül. GitHub Pages-ről közvetlenül fut.

## Két irány
- **Mi készítjük** — programfüzet a lagzira (4 oldal) vagy jegyesfotós kellék (2 oldal, harsány címlap).
- **Ajándékba** — kitől: család / családtag / koszorúslány(ok) / vőlegény csapata / barátok; kinek: a párnak / a menyasszonynak / a vőlegénynek (4 oldal).

## Folyamat
1. Kezdőlap: élő címlap-próba, irány kiválasztása.
2. **AI-interjú** chat formában (a kérdések a választott irányhoz igazodnak).
3. A „szerkesztőség” megírja a rovatokat a v1 Cloudflare Workerén keresztül (`AI_URL`). Ha az AI nem elérhető, a szövegek a válaszokból állnak össze.
4. **Egyszerű mód:** szövegre kattintva átírás (+ „✨ Írd szebbre”), képre kattintva feltöltés.
5. **Haladó szerkesztő (Canva-szerű):** kijelölés, húzás, méretezés, igazítási segédvonalak, helyben írás, betű/méret/szín/hasáb/háttér, réteg előre-hátra, másolás, törlés, új szöveg/címsor/kép/vonal/doboz, oldalak hozzáadása/sorrendje/törlése, visszavonás (Ctrl+Z / Ctrl+Y), nyilakkal léptetés.
6. Nyomtatás / PDF: A4 álló, oldalanként.

## Adatok
- A projekt a böngésző `localStorage`-ában, a képek IndexedDB-ben vannak (eszközönként).
- „Mentés fájlba” / „Megnyitás”: teljes projekt képekkel együtt JSON-ben.

## Dokumentum-modell
`P.doc.pages[].els[]` — minden elem abszolút pozícióval (px, A4 = 794×1123 @96 dpi).
Típusok: `text` (`fmt`: para / timeline / list / quiz / facts / center / lines), `img`, `line`, `box`.
A szövegek automatikusan kicsinyednek, ha nem férnek ki (a törzsszöveg rövid tartalomnál kicsit nőhet).
