window.STUDY = {
  chat: "https://claude.ai/code/session_01CYyWBPZj5SgbFBCY3azCaN",
  semesters: [
    { id: "s1", year: "Year 3", name: "Semester 1", note: "Year 3 · Autumn 2026", modules: ["msp","ssc","ems","mom","da","pd"] },
    { id: "s2", year: "Year 3", name: "Semester 2", note: "Spring 2027", modules: [] }
  ],
  modules: {
    msp: { code:"MEC1015", name:"Measurement & Signal Processing", color:"--m-msp", ready:true,
      assess:"Exam 80% (2 h: 20 MCQs × 2 marks + 2 long questions × 30) · Labs 20%",
      blurb:"Sensors, measurement error and statistics, signal conditioning, and the frequency domain." },
    ssc: { code:"EEN1020", name:"Introduction to Systems, Signals & Control", color:"--m-ssc", ready:true,
      assess:"Exam 80% (2 h) · CA 20%: four Loop quizzes, best three count (wk 3 transforms, wk 6 block diagrams, wk 8 stability & transient, wk 11 state space)",
      blurb:"Laplace and Z transforms, modelling circuits and mechanical systems, stability and first/second-order response, state-space models, and state-space response and stability." },
    ems: { code:"EEN1029", name:"Electromechanical Systems", color:"--m-ems", ready:true,
      assess:"Exam 50% (2 h, answer 4 of 5) · CA 50%: weekly quizzes 5%, demos 10%, reports 25%, peer/self-assessment 10%",
      blurb:"Phasors and AC power, op-amp signal conditioning, inductors and transformers, DC motors, H-bridges, steppers, encoders and TRIAC switching." },
    mom: { code:"MEC1014", name:"Mechanics of Machines", color:"--m-mom", ready:true,
      assess:"Continuous assessment 100%: quizzes in weeks 4, 8, 10 (10% each) and a final quiz in week 12 (40%); two practical submissions (10% each); SolidWorks assignment 10%",
      blurb:"Free and forced vibration of single degree of freedom systems, then gear trains, epicyclic gears, belt drives and friction clutches." },
    da: { code:"MEC1029", name:"Data Analytics for Engineers", color:"--m-da", ready:true,
      assess:"100% CA: open-book Loop quizzes in the Friday slot (SA101): week 4 5%, week 7 10%, week 10 15%, week 12 final 70%",
      blurb:"Statistics in R: summaries, tables and probability, the normal model, regression, time series, confidence intervals, t-tests, ANOVA and non-parametric tests." },
    pd: { code:"MEC1017", name:"Product Design", color:"--m-pd", ready:true,
      assess:"Semester 1 = 50%: design review presentation (wk 5–6) 20%, SW assembly & animation (wk 9) 15%, spring–damper & circuit review (wk 10) 10%, motion simulation (wk 11) 15%, drawings & order list (wk 12) 20%, design portfolio (wk 13) 20%. Semester 2 build & competition = 50%",
      blurb:"The FireFighter ladder-climbing robot: brief and constraints, product design specifications, concept selection with weighted matrices, the real hardware limits, vibration theory for sizing the beaker suspension, and the pneumatic cylinder, 5/2 valve and relay control circuit." }
  },
  content: {}
};
