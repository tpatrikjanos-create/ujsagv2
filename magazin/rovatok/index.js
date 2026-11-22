/* Az összes rovat egy helyen. Új rovat = új elem valamelyik csoportfájlban. */
import gerinc from './gerinc.js';
import rolunk from './rolunk.js';
import emberek from './emberek.js';
import utazas from './utazas.js';
import szorakozas from './szorakozas.js';
import interaktiv from './interaktiv.js';

export const ROVATOK = [...gerinc, ...rolunk, ...emberek, ...utazas, ...szorakozas, ...interaktiv];
export const GROUPS = ['Gerinc', 'Rólunk', 'Emberek', 'Utazás', 'Szórakozás', 'Interaktív'];

/* Alapértelmezett sorrend: a fél oldalas rovatok párban, hogy szépen kijöjjenek az oldalak.
   A szinglik (kétoldalas) bal oldalon kezdődik — a tördelő ezt magától is rendbe teszi. */
export const DEFAULT_ORDER = [
  'koszonto', 'menetrend', 'etlap', 'dresscode', 'drinks',
  'szamok', 'sztori', 'ismerkedes', 'legelsokep', 'years', 'lanykeres', 'jegyesfoto', 'interju',
  'childhood', 'szuloknek', 'szulok', 'utazas', 'naszut', 'bakancslista', 'igazhamis',
  'csapat', 'szinglik', 'dijak', 'memorial', 'negylabu',
  'lagziszab', 'masnapos', 'horoszkop', 'gyik', 'qr', 'jatekok', 'fotovadasz', 'robbantsd', 'message', 'szinezo'
];
