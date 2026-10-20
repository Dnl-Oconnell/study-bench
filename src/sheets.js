/* Formula-sheet drawer: ONLY exact copies of the formula/table sheets issued with the exam or class tests.
   Nothing compiled, nothing from lectures, nothing home-made. A module with no issued sheet shows a blank drawer.
   items[].pages are keys into STUDY.sheetImg (sheets_art.js / sheets_art_web.js; images in img/sheets/). */
STUDY.sheets = {
  msp: { items: [] },
  ssc: { items: [
    { title: "Laplace Transform Reference Table", note: "Issued with Class Tests 1 and 2", pages: ["ssc_laplace-1"] },
    { title: "Z-Transform Reference Table", note: "Issued with Class Tests 1 and 2", pages: ["ssc_z-1"] }
  ] },
  ems: { items: [] },
  mom: { items: [] },
  da:  { items: [] },
  pd:  { items: [] }
};
