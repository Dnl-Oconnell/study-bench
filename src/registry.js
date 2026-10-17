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
    ssc: { code:"EEN1020", tutorials:["Tutorial 1: Solving ODEs with Laplace transforms","Tutorial 1: Solving difference equations with the Z transform","Tutorial 2: Mathematical models (solution available)","Tutorial 4: Stability and transient response (solution available)","Stability, transient response and Z-domain dynamics (solution available)","Laplace additional questions","Z transform additional questions"], name:"Introduction to Systems, Signals & Control", color:"--m-ssc", ready:false,
      blurb:"Laplace and Z transforms, modelling physical systems, stability and transient response.",
      planned:[ ["Transform theory","Review of Laplace transforms; solving ODEs"],["Transform theory","Difference equations and the Z transform"],["Modelling","Translational mechanical systems"],["Modelling","Rotational mechanical systems"],["Modelling","Electronic circuits"],["Transfer functions","Continuous-time stability"],["Transfer functions","Discrete-time stability"],["Transfer functions","Initial & final value theorems; first and second order response"] ] },
    ems: { code:"EEN1029", name:"Electromechanical Systems", color:"--m-ems", ready:false,
      blurb:"Phasors and AC power, inductors and transformers, DC motors and their control. Three past papers with solutions.",
      planned:[ ["Background","Complex numbers"],["Background","Operational amplifiers and amplifiers"],["Background","Basic mechanical units"],["Task 1","Phasors and AC power"],["Task 1","Inductance and ideal transformers"],["Task 1","Inductor measurements and calculations"],["Task 2","DC motors"],["Task 2","DC motor characteristics"],["Task 2","DC motor control and encoders"] ] },
    mom: { code:"MEC1014", tutorials:["Tutorial 1: Free vibration (solution available)","Tutorial 2: Free vibration of damped systems (solution available)","Tutorial 3: Free vibration of damped systems II (solution available)","Tutorial 4: Forced vibration I (solution available)","Tutorial 5: Forced vibration II"], name:"Mechanics of Machines", color:"--m-mom", ready:false,
      blurb:"Vibration of single degree of freedom systems and gears. Five tutorials, four with solutions.",
      planned:[ ["Vibration","Free vibration (undamped)"],["Vibration","Free vibration of damped systems"],["Vibration","Forced vibration"],["Transmission","Gears"] ] },
    da: { code:"MEC1029", tutorials:["Tutorial 1: Introduction to R and databases","Tutorial 2: Data frames","Tutorial 3: Data visualisation and missing data","Tutorial 4: Subsetting datasets","Tutorial 5: Relationships between factors","Tutorial 6: Non-linear relationships","Tutorial 7: Simulating the central limit theorem","Tutorial 8: More on time series","Tutorial 9: Confidence intervals and the Framingham Heart Study","Tutorial 10: Non-parametric tests in R"], name:"Data Analytics for Engineers", color:"--m-da", ready:false,
      blurb:"Statistics in R: summaries, probability, regression, time series, inference, t-tests and ANOVA.",
      planned:[ ["Describing data","Summary statistics"],["Describing data","Relationships between variables"],["Probability","Further probability"],["Relationships","Two continuous variables & regression"],["Relationships","How good is my model?"],["Time series","Time series analysis"],["Inference","Inference & the central limit theorem"],["Inference","Small samples"],["Inference","Comparing sample means"],["Inference","Small independent samples and paired t-tests"],["Inference","Confidence intervals for the standard deviation"],["Inference","ANOVA"] ] },
    pd: { code:"MEC1017", name:"Product Design", color:"--m-pd", ready:false,
      blurb:"The FireFighter design project and product design specifications.",
      planned:[ ["Project","Module overview & the FireFighter brief"],["Process","Product design specifications"] ] }
  },
  content: {}
};
