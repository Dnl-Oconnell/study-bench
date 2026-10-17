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
      blurb:"Laplace and Z transforms, modelling circuits and mechanical systems, stability and first/second-order response." },
    ems: { code:"EEN1029", name:"Electromechanical Systems", color:"--m-ems", ready:true,
      assess:"Exam 50% (2 h, answer 4 of 5) · CA 50%: weekly quizzes 5%, demos 10%, reports 25%, peer/self-assessment 10%",
      blurb:"Phasors and AC power, op-amp signal conditioning, inductors and transformers, DC motors, H-bridges, steppers, encoders and TRIAC switching." },
    mom: { code:"MEC1014", name:"Mechanics of Machines", color:"--m-mom", ready:true,
      assess:"Continuous assessment 100%: quizzes in weeks 4, 8, 10 (10% each) and a final quiz in week 12 (40%); two practical submissions (10% each); SolidWorks assignment 10%",
      blurb:"Free and forced vibration of single degree of freedom systems, then gear trains and epicyclic gears." },
    da: { code:"MEC1029", tutorials:["Tutorial 1: Introduction to R and databases","Tutorial 2: Data frames","Tutorial 3: Data visualisation and missing data","Tutorial 4: Subsetting datasets","Tutorial 5: Relationships between factors","Tutorial 6: Non-linear relationships","Tutorial 7: Simulating the central limit theorem","Tutorial 8: More on time series","Tutorial 9: Confidence intervals and the Framingham Heart Study","Tutorial 10: Non-parametric tests in R"], name:"Data Analytics for Engineers", color:"--m-da", ready:false,
      blurb:"Statistics in R: summaries, probability, regression, time series, inference, t-tests and ANOVA.",
      planned:[ ["Describing data","Summary statistics"],["Describing data","Relationships between variables"],["Probability","Further probability"],["Relationships","Two continuous variables & regression"],["Relationships","How good is my model?"],["Time series","Time series analysis"],["Inference","Inference & the central limit theorem"],["Inference","Small samples"],["Inference","Comparing sample means"],["Inference","Small independent samples and paired t-tests"],["Inference","Confidence intervals for the standard deviation"],["Inference","ANOVA"] ] },
    pd: { code:"MEC1017", name:"Product Design", color:"--m-pd", ready:false,
      blurb:"The FireFighter design project and product design specifications.",
      planned:[ ["Project","Module overview & the FireFighter brief"],["Process","Product design specifications"] ] }
  },
  content: {}
};
