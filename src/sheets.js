/* Formula-sheet drawer: ONLY exact copies of the formula/table sheets issued with the exam or class tests.
   Nothing compiled, nothing from lectures, nothing home-made. A module with no issued sheet shows a blank drawer.
   items[].pages are keys into STUDY.sheetImg (sheets_art.js / sheets_art_web.js; images in img/sheets/). */
STUDY.sheets = {
  msp: { items: [], blank: "Command issues one Log Tables booklet and a firm handshake. Everything else is stored in your head. Hope the backup drive is working." },
  ssc: { items: [
    { title: "Exam Appendices: Useful Formulae", note: "Issued with Class Test 3 (the EEN1020 Semester 1 2026/27 exam appendix: transient-performance and state-space formulae, Laplace and Z pairs)", pages: ["ssc_formulae-1", "ssc_formulae-2"] },
    { title: "Laplace Transform Reference Table", note: "Issued with Class Tests 1 and 2", pages: ["ssc_laplace-1"] },
    { title: "Z-Transform Reference Table", note: "Issued with Class Tests 1 and 2", pages: ["ssc_z-1"] }
  ] },
  ems: { items: [], blank: "Reactance, power triangles, firing angles: all memory-resident. In this bay the pilot is the datasheet." },
  mom: { items: [], blank: "No past paper on file, so no sheet either. Natural frequency, damping ratio, gear ratios: load them into long-term memory before deployment." },
  da:  { items: [], blank: "Your only sidearm is RStudio. It does not accept excuses, and neither does Loop." },
  pd:  { items: [], blank: "This bay builds firefighting robots, not cheat sheets. Grab a spanner." }
};
