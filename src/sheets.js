/* Formula-sheet drawer content, per module.
   items[].pages are keys into STUDY.sheetImg (sheets_art.js / sheets_art_web.js, images in img/sheets/).
   "kind": "exam" = issued in the exam or class tests; "lecture" = tables as shown in lectures; "own" = Daniel's own sheet. */
STUDY.sheets = {
  msp: {
    intro: "The exam gives you the standard Log Tables booklet, not a module formula sheet. These are the pages from it this module uses, as reproduced in the lectures.",
    items: [
      { kind: "exam", title: "Standard normal distribution", note: "Log Tables p. 36–37 · Lecture 5.2", pages: ["msp_normal1", "msp_normal2"] },
      { kind: "exam", title: "Student's t-distribution", note: "Log Tables p. 40–41 · Lecture 6.2", pages: ["msp_t1", "msp_t2"] },
      { kind: "exam", title: "Chi-squared distribution", note: "Log Tables · ν = 1–13 as shown in Lecture 7.1", pages: ["msp_chi"] },
      { kind: "lecture", title: "Chauvenet's criterion", note: "Lecture 6.3 · not in the Log Tables", pages: ["msp_chauvenet"] }
    ]
  },
  ssc: {
    intro: "The lecturer's transform tables, handed out with both class tests, plus the module's partial-fraction cheat sheet.",
    items: [
      { kind: "exam", title: "Laplace transform table", note: "Issued with Class Tests 1 and 2", pages: ["ssc_laplace-1"] },
      { kind: "exam", title: "Z-transform table", note: "Issued with Class Tests 1 and 2", pages: ["ssc_z-1"] },
      { kind: "lecture", title: "Partial fraction & transform cheat sheet", note: "Course handout", pages: ["ssc_pf-1", "ssc_pf-2", "ssc_pf-3"] }
    ]
  },
  ems: { intro: "The exam gives Log Tables only. There's no module formula sheet in the 2025 or 2026 papers.", items: [] },
  mom: { intro: "There's no past exam or formula sheet for this module in your folder yet. It'll appear here once one is added.", items: [] },
  da: {
    intro: "Loop tests have no official formula sheet. This is your own Test 2 cheat sheet.",
    items: [ { kind: "own", title: "Test 2 cheat sheet", note: "Your own sheet, not a course handout", pages: ["da_cheat-1", "da_cheat-2"] } ]
  },
  pd: { intro: "Project-assessed, so there's no exam formula sheet.", items: [] }
};
