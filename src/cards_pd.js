/* MEC1017 recall flashcards. No exam (100% project and reviews), so these check you can defend the design. */
(function(){
const R = String.raw;
const C = (k, q, a, g) => g ? { k, q, a, g } : { k, q, a };
const NE = "no exam: design reviews";
STUDY.cards = STUDY.cards || {};
STUDY.cards.pd = {

brief: [
  C("def", R`What are the four competing objectives of the FireFighter challenge?`,
    R`Fastest time up the 1 m ladder, minimum water lost, least weight, minimum material. They pull against each other (speed vs spillage, light vs stiff).`),
  C("def", R`List the hard constraints.`,
    R`Fits a 250 mm cube at <b>all</b> stages; one pneumatic cylinder, 50 mm stroke; automatic switching by a 5/2 solenoid valve; mainly aluminium plate plus limited Meccano; hand processes (punch, shear, saw, file, bend); limited 3D printing on DCU printers.`),
  C("def", R`Name the eight engineering aspects of the climbing problem.`,
    R`Locomotion, grip, stability, actuation, sensing, control, water protection, reliability.`),
  C("why", R`Why start the CAD early?`,
    R`The week 9–13 deliverables (assembly, reviews, motion study, drawings, portfolio) are 80% of the Semester 1 marks.`),
  C("def", R`What should every team meeting produce?`,
    R`Progress and problems from everyone, agreed decisions, actions with owners and deadlines, a record, and the next meeting set.`),
],

pds: [
  C("def", R`Name the four phases of the design process.`,
    R`Product planning, conceptual design, embodiment design, detail design.`),
  C("def", R`What's the difference between a brief and a specification?`,
    R`A brief uses adjectives ("light, portable"). A specification is a list of numbers a prototype can pass or fail. If you can't test it, it's an opinion.`),
  C("why", R`Why is the PDS week the cheapest week in the project?`,
    R`About 75% of manufacturing cost is committed by the end of the conceptual phase, so changes are cheapest before then.`),
  C("def", R`A PDS says what, or how?`,
    R`<b>What</b> the device must achieve, never how (no mention of the mechanism).`),
  C("def", R`What do you write for a PDS heading that doesn't apply?`,
    R`"Not applicable, because …". A blank heading is an unmade decision.`),
  C("why", R`Why write constraints down first?`,
    R`They contradict each other, and writing them down is how you find the conflict (e-scooter: 25 kg legal limit vs ~13 kg to carry one-handed up stairs).`),
  C("def", R`Name at least eight of the twelve PDS headings.`,
    R`Introduction; functional performance; operating environment; economics; geometric limitations; maintenance & repair; reliability; safety; sustainability; ease of use; human factors; appearance.`),
],

selection: [
  C("why", R`Why decompose into functions before generating concepts?`,
    R`You can't brainstorm "a robot", but you can brainstorm "how to grip a rung". Functions are written verb + object; 6–10 of them. Different lists across the team expose hidden assumptions.`),
  C("def", R`What is a morphological chart for?`,
    R`One row per function, several options each. Reading across builds complete concepts, and it ensures the concepts you evaluate are genuinely different.`),
  C("f", R`How is a weighted matrix scored, and where do the criteria come from?`,
    R`$$\text{Total}=\sum w_is_i$$ Criteria from PDS headings, weights agreed <b>before</b> scoring, scores 1–5.`, NE),
  C("why", R`What is the sensitivity check, and why do it?`,
    R`Change one weight and see if the winner flips. If one unjustified weight flips the result, you've guessed, not decided. Write the reason for every weight.`),
  C("def", R`What's the thread you'll have to defend in the review?`,
    R`Brief → PDS → Functions → Concepts → Matrix → Detail → Build.`),
],

resources: [
  C("def", R`What is the rung pitch, and why does it matter for a 50 mm stroke?`,
    R`52 mm (12 mm rung + 40 mm gap). One stroke is slightly short of a pitch, so the linkage must amplify displacement or climb over several strokes.`),
  C("f", R`Cylinder push and pull forces?`,
    R`$$F=pA,\quad A_{push}=\frac{\pi D^2}{4},\quad A_{pull}=\frac{\pi(D^2-d^2)}{4}$$ Pull is lower because of the rod.`, NE),
  C("why", R`What happens to force if a linkage multiplies the displacement by $k$?`,
    R`The available force is divided by $k$ (work is conserved, ignoring friction).`),
  C("f", R`Equivalent stiffness of springs in parallel and in series?`,
    R`Parallel: $k=k_1+k_2$ (stiffer). Series: $\dfrac1k=\dfrac1{k_1}+\dfrac1{k_2}$ (softer than either).`, NE),
  C("f", R`How much dashpot travel is available?`,
    R`$S=35\ \text{mm}-L$ (piston length 8, 10, 12 or 14 mm). Static sag plus motion must fit inside it.`, NE),
  C("def", R`A concept doesn't fit the ladder. What should you never do?`,
    R`Change a reference dimension or edit a supplied part. Redesign the concept.`),
],

vibration: [
  C("def", R`What are the three elements of a vibratory system, and what does each do?`,
    R`Spring (stiffness, stores potential energy), mass (stores kinetic energy), damper (dissipates energy). Each idealised as having only its one property.`),
  C("def", R`Name four ways to classify vibration.`,
    R`Excitation (free/forced), damping (undamped/damped), linearity (linear/nonlinear), determinism (deterministic/random).`),
  C("f", R`Spring needed for an allowable static deflection, and the per-spring value for four in parallel?`,
    R`$$k_{req}=\frac{mg}{\delta},\qquad k_s=\frac{k_{req}}{4}$$`, NE),
  C("f", R`Natural frequency and damping ratio of the beaker suspension?`,
    R`$$\omega_n=\sqrt{\frac km},\quad f_n=\frac{1}{2\pi}\sqrt{\frac km},\quad \zeta=\frac{c}{2\sqrt{km}}$$`, NE),
  C("f", R`Write the base-excitation transmissibility.`,
    R`$$T=\sqrt{\frac{1+(2\zeta r)^2}{(1-r^2)^2+(2\zeta r)^2}}$$ T > 1 amplifies, T < 1 isolates.`, NE),
  C("def", R`What frequency ratio does isolation need, and what happens between 1 and that value?`,
    R`$r\gt\sqrt2\approx1.414$. Between 1 and $\sqrt2$ the beaker is still amplified.`),
  C("why", R`What's the trade-off of a softer suspension?`,
    R`Lower $f_n$ pushes the climbing jolts further into the isolation region, but it sags more and uses up dashpot travel.`),
  C("why", R`What drives the air-dashpot damping, and which dimension is most sensitive?`,
    R`Air squeezing through the annular gap: $c=3\pi\mu l\left(\frac{D+w}{w}\right)^3$. The radial clearance $w$ is cubed, so small changes matter a lot. Treat c as an estimate.`),
  C("def", R`What causes spillage on the FireFighter?`,
    R`Sudden cylinder extension and retraction, shocks as grippers engage and release rungs, the beaker oscillating on its suspension, and sideways tilt and sloshing.`),
],

pneumatics: [
  C("def", R`Trace the pneumatic chain from supply to grippers.`,
    R`Air supply → regulator → 5/2 valve → cylinder → linkage and grippers. The electrical circuit decides when the valve switches; limit switches report positions.`),
  C("def", R`How does a double-acting cylinder extend and retract?`,
    R`Extend: air into the cap end, rod end exhausts. Retract: air into the rod end, cap end exhausts.`),
  C("why", R`Why is retraction always the weaker stroke, and what does that mean for design?`,
    R`The rod takes up part of the piston area, so only the annulus is pressurised (~50 N vs ~67 N at 6 bar for the project cylinder). If you lift on retraction, size against $F_{ret}$.`),
  C("def", R`What does "5/2" mean?`,
    R`Five ports (supply, two outlets to the cylinder chambers, two exhausts) and two switching positions.`),
  C("def", R`What does "bistable" mean for the double-solenoid valve?`,
    R`It stays in its last position after the signal is removed, so a short pulse on Y1 or Y2 is enough.`),
  C("def", R`COM, NO and NC on a microswitch?`,
    R`COM: common. NO: open until pressed. NC: closed until pressed. A limit switch only gives a signal; it moves nothing.`),
  C("why", R`What does the K1 holding contact do?`,
    R`Wired in parallel with START, it keeps K1 energised after START is released (the latch). Without it the robot would only run while START is held.`),
  C("why", R`Why are STOP and the top-of-ladder switch wired NC in series?`,
    R`Pressing either, or a broken wire, cuts power: the safe state is off.`),
],

};
})();
