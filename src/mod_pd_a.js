/* MEC1017 Product Design — the FireFighter project, PDS, concept selection, design resources */
(function(){
const R = String.raw;
const T = STUDY.content.pd = STUDY.content.pd || { topics: [] };

T.topics.push({
id: "brief", part: "The project", title: "The FireFighter Brief, Constraints & Semester Plan",
lectures: "Lecture 1 – Module Overview & FireFighter Project Introduction; FireFighter Project Brief", status: "lectured",
summary: "What the ladder-climbing robot must do, the hard constraints (250 mm cube, one 50 mm pneumatic cylinder, 5/2 valve, aluminium plate, limited processes), the questions to ask before designing, the semester-by-semester deliverables and marks, and how to run an engineering team.",
theory: R`
<h3>0. The challenge</h3>
<p>Design (Semester 1) and build (Semester 2) a device that carries a <b>500 mL</b> container of water up a <b>1 m ladder</b>:</p>
<ul><li>in the fastest possible time,</li><li>losing the minimum amount of water,</li><li>weighing the least,</li><li>using the minimum material.</li></ul>
<p>These pull against each other: speed vs spillage, light weight vs stiffness and grip. The design is a balance.</p>

<h3>1. Hard constraints</h3>
<div class="tbl"><table class="data">
<tr><th>Constraint</th><th>Limit</th></tr>
<tr><td>Size</td><td>Fits inside a 250 × 250 × 250 mm cube at <b>all</b> stages of operation</td></tr>
<tr><td>Actuation</td><td>One pneumatic cylinder, 50 mm stroke</td></tr>
<tr><td>Control</td><td>Extension and retraction switched automatically by a 5/2 solenoid valve (microswitches, relays)</td></tr>
<tr><td>Materials</td><td>Mainly standard aluminium plate plus limited standard mechanical ("Meccano") parts</td></tr>
<tr><td>Manufacturing</td><td>Punching, shearing, hacksawing, filing, deburring, bending, forming</td></tr>
<tr><td>3D printing</td><td>Limited parts, mainly grippers and guides, on DCU printers only (Semester 2)</td></tr>
</table></div>
<p>Workshop: SG23–25. Technical contact: Michael Tyrrell (labs, materials, parts board outside SG23/24).</p>

<h3>2. Breaking it down</h3>
<p>Engineering aspects: <b>locomotion</b> (rung to rung), <b>grip</b> (no slipping), <b>stability</b> (balance and alignment), <b>actuation</b> (force and motion), <b>sensing</b> (position and limits), <b>control</b> (sequencing), <b>water protection</b> (vibration and spill), <b>reliability</b> (repeat without jamming or falling).</p>
<p>Ask before designing: budget; ladder dimensions and rung spacing; size and weight limits; allowed materials, actuators, sensors and controller; power source; required speed; acceptable spillage; safety requirements; manufacturing facilities.</p>

<h3>3. Semester 1 plan and marks (50% of the module)</h3>
<div class="tbl"><table class="data">
<tr><th>Week</th><th>Work</th><th>Marks (of Sem 1)</th></tr>
<tr><td>1</td><td>Project launch; constraints; start concepts</td><td>—</td></tr>
<tr><td>2</td><td>PDS and FMEA</td><td>—</td></tr>
<tr><td>3</td><td>Workshop, parts, design for manufacture</td><td>—</td></tr>
<tr><td>4</td><td>Climbing, gripper and stabiliser concepts; spring–damper location; start 3D models</td><td>—</td></tr>
<tr><td>5–6</td><td>Design review presentations</td><td>20%</td></tr>
<tr><td>7</td><td>Vibration isolation and spring–damper design</td><td>—</td></tr>
<tr><td>8</td><td>Pneumatic sequence, relay logic, microswitches, circuit</td><td>—</td></tr>
<tr><td>9</td><td>SolidWorks assembly and exploded-view animation</td><td>15%</td></tr>
<tr><td>10</td><td>Spring–damper and circuit design review</td><td>10%</td></tr>
<tr><td>11</td><td>Final design motion simulation (SW motion study)</td><td>15%</td></tr>
<tr><td>12</td><td>Engineering drawings and order list review</td><td>20%</td></tr>
<tr><td>13</td><td>Design portfolio submission</td><td>20%</td></tr>
</table></div>
<p>Semester 2 (the other 50%): competition, updated portfolio, team video and build quality 60%; competition performance 20%; attendance and participation 20%.</p>

<h3>4. Running the team</h3>
<ul>
<li>Common goal, a team leader who tracks actions, clear responsibilities, use of different strengths (CAD, analysis, control, manufacture, testing), open communication, dependability.</li>
<li>Every meeting: agenda, short, everyone reports progress and problems, decisions agreed, <b>actions with owners and deadlines</b>, recorded, next meeting set. Log meetings and email the actions.</li>
<li>Avoid: one person doing everything; working separately and "stitching together" at the end; unclear roles; saving problems for meetings; leaving work to the deadline.</li>
</ul>`,
formulas: [],
questions: [
 {src:"Lecture 1 exercise", see:[2], q:R`You're asked to design a ladder-climbing robot to carry 500 mL of water up a 1 m ladder with minimum spillage. List the key engineering aspects, and the information you'd ask your manager for first.`,
  hint:"Think subsystems, then the numbers you can't design without.",
  sol:R`<p><b>Aspects:</b> locomotion, grip, stability, actuation, sensing, control, water protection (vibration), reliability.</p><p><b>Ask for:</b> budget; ladder dimensions and rung spacing; size/weight limits; permitted materials, actuators, sensors and controller; power source; required speed; acceptable spillage; safety requirements; available manufacturing processes.</p>`,
  ans:"8 aspects; ~12 questions", prov:"Lecture 1 answers."}
],
traps: [
 "The 250 mm cube applies at ALL stages of the motion, including full extension.",
 "One cylinder, 50 mm stroke: everything moves from that single actuator.",
 "3D printing is limited (mainly grippers and guides) and only on DCU printers.",
 "Week 9–13 deliverables are 80% of Semester 1: start CAD early."
]
});

T.topics.push({
id: "pds", part: "Design method", title: "The Design Process & Product Design Specification",
lectures: "Lecture 2 – Product Design Specifications (part 1)", status: "lectured",
summary: "The four phases of design, six design philosophies, what a PDS is and where its inputs come from, the twelve PDS headings with the folding e-scooter worked example, testable numbers instead of adjectives, and resolving headings that contradict each other.",
theory: R`
<h3>0. Four phases</h3>
<ol class="steps">
<li><b>Product planning:</b> identify the need, set the target specification (Semester 1).</li>
<li><b>Conceptual design:</b> generate concepts, select one, test it (Semester 1).</li>
<li><b>Embodiment design:</b> final specification, manufacturing plan, economics.</li>
<li><b>Detail design:</b> modelling, simulation, prototyping (Semester 2).</li>
</ol>
<p>Three questions run through it: <i>What exactly is the problem? What are the options? Which one, and why?</i></p>

<h3>1. Six ways to ask "is this a good design?"</h3>
<ol>
<li>User/customer-centred: does it solve a real user need?</li>
<li>Design thinking: have we understood the problem before jumping to a solution?</li>
<li>Function-first: what must it actually do?</li>
<li>Design for manufacture and assembly: can we make and assemble it efficiently?</li>
<li>Design for X: cost, quality, reliability, service, sustainability?</li>
<li>Sustainable/circular: what happens over the whole life cycle?</li>
</ol>

<h3>2. What a PDS is</h3>
<p>The functional, performance, physical, cost, safety, regulatory and other requirements and constraints the product must satisfy. Inputs: the customer/user, market and competitors, standards and regulation, manufacturing capability, service and maintenance, end of life.</p>
<div class="callout key"><p><b>A brief is not a specification.</b> "Light, portable and legal" can't be tested. A specification is a list of numbers a prototype can pass or fail. If you can't test it, it's an opinion, and opinions can't be defended.</p></div>
<p>Constraints come before concepts (Irish e-scooter rules from 20 May 2024: 20 km/h, 400 W, 25 kg, 200 mm wheels, age 16; FireFighter: 250 mm cube, 50 mm stroke, 500 mL, 1 m, aluminium plate, punch/shear/saw/file/bend). About 75% of manufacturing cost is committed by the end of the conceptual phase, so the PDS week is the cheapest one in the project.</p>

<h3>3. The twelve headings</h3>
<div class="tbl"><table class="data">
<tr><th>#</th><th>Heading</th><th>E-scooter example (testable)</th></tr>
<tr><td>1</td><td>Introduction</td><td>Folding e-scooter for a 3–8 km Dublin commute, carried onto bus/train</td></tr>
<tr><td>2</td><td>Functional performance</td><td>≤ 20 km/h, ≤ 400 W, ≥ 20 km range at 75 kg, fold ≤ 5 s one-handed, ≤ 25 kg</td></tr>
<tr><td>3</td><td>Operating environment</td><td>−5 to +35 °C, rain, IPX5, 60 mm kerbs, tram rails, salt</td></tr>
<tr><td>4</td><td>Economics</td><td>Retail ≤ €650, BOM ≤ €230, 25,000/yr, spares 7 years</td></tr>
<tr><td>5</td><td>Geometric limitations</td><td>Folded ≤ 1150 × 520 × 530 mm, wheels ≥ 200 mm</td></tr>
<tr><td>6</td><td>Maintenance & repair</td><td>Brake pads with one 4 mm hex key in ≤ 10 min</td></tr>
<tr><td>7</td><td>Reliability</td><td>20,000 fold cycles; frame 100,000 cycles at 100 kg</td></tr>
<tr><td>8</td><td>Safety</td><td>EN 17128, two brakes, ≤ 4.0 m stop from 20 km/h</td></tr>
<tr><td>9</td><td>Sustainability / pollution</td><td>≤ 65 dB(A), removable battery, ≥ 80% recyclable</td></tr>
<tr><td>10</td><td>Ease of use</td><td>One hand, no tools, ≤ 5 s</td></tr>
<tr><td>11</td><td>Human factors</td><td>Carried mass ≤ 13 kg; grip 30–40 mm; 5th %ile female to 95th %ile male</td></tr>
<tr><td>12</td><td>Appearance</td><td>Matte anodised, no exposed deck fasteners</td></tr>
</table></div>
<p>Every heading gets a number or an explicit "not applicable, because ...". A blank heading is an unmade decision. The PDS says <b>what</b> the device must achieve, never <b>how</b> (no mention of the folding mechanism).</p>

<h3>4. Principle 1: write constraints first, because they contradict</h3>
<p>Heading 2 allows 25 kg (the legal limit) but heading 11 says 13 kg (HSE guideline ~10 kg held at arm's length, one-handed, up stairs). Writing them down early is how you find the conflict; the design target becomes ~13 kg.</p>`,
formulas: [],
questions: [
 {src:"Practice (Claude)", see:[2,3], q:R`Rewrite these FireFighter "requirements" as testable PDS lines: (a) "it should be fast"; (b) "it shouldn't spill much"; (c) "it must be light"; (d) "it must be small".`,
  hint:"A number and a test for each. (d) is already fixed by the brief.",
  sol:R`<ul><li>(a) Functional performance: climbs the 1 m competition ladder in ≤ <i>t</i> s (your team's target), measured from start signal to top rung.</li>
  <li>(b) Functional performance: loses ≤ <i>V</i> mL of the 500 mL over a full climb (weigh beaker before and after).</li>
  <li>(c) Functional performance / economics: total mass ≤ <i>m</i> g excluding the water (scales).</li>
  <li>(d) Geometric limitations: stays within a 250 mm cube at every stage of the cycle (check in the SW motion study).</li></ul><p>The targets are the team's to set and defend; what matters is that each can be passed or failed.</p>`,
  ans:"A number + a test for each", prov:"Worked by Claude from the Lecture 2 method."},
 {src:"Practice (Claude)", see:[3], q:R`Is "the gripper uses a spring-loaded hook" a good PDS line? What heading would the underlying need go under?`,
  hint:"What vs how.",
  sol:R`<p>No: it says <i>how</i>, which belongs to concept generation. The need is functional performance / reliability: e.g. "holds the device on a 12 mm × 3 mm rung under the full load with zero slip over 20 consecutive cycles".</p>`,
  ans:"No — it's a solution, not a requirement", prov:"Worked by Claude from Lecture 2."}
],
traps: [
 "A PDS line must be testable: a number, not an adjective.",
 "A PDS says WHAT, never HOW.",
 "Don't leave a heading blank: give a number or 'not applicable, because ...'.",
 "Agree the PDS as a whole team before anyone draws concepts."
]
});

T.topics.push({
id: "selection", part: "Design method", title: "Functions, Morphological Charts & Weighted Matrices",
lectures: "Lecture 2 – Product Design Specifications (parts 2–3); Design Presentation Rubric", status: "lectured",
summary: "Decomposing the device into verb-plus-object functions, generating options with a morphological chart, selecting with a weighted matrix whose criteria come from the PDS, sensitivity-checking the weights, and what the week 5–6 design review is marked on.",
theory: R`
<h3>0. Principle 2: decompose before you conceptualise</h3>
<p>Nobody designs "a scooter": you design functions that must cooperate, each written as <b>verb + object</b> (carry the rider, slow the vehicle, lock the fold ...). You can't brainstorm "a robot", but you can brainstorm "how to grip a rung". Aim for six to ten functions. If two team members' lists differ, someone is hiding an assumption.</p>

<h3>1. Morphological chart</h3>
<p>One row per function, several options per row; read across to build a complete concept. Five functions with four options each give $4^5 = 1024$ combinations: the chart makes sure the three you evaluate are genuinely different.</p>
<div class="tbl"><table class="data">
<tr><th>Function</th><th>Option A</th><th>Option B</th><th>Option C</th></tr>
<tr><td>Lock the fold</td><td>Cam-over lever</td><td>Screw collar</td><td>Spring-loaded pin</td></tr>
<tr><td>Release the fold</td><td>Squeeze trigger</td><td>Foot lever</td><td>Pull pin</td></tr>
<tr><td>Be carried</td><td>Stem as handle</td><td>Dedicated handle</td><td>Shoulder strap</td></tr>
</table></div>

<h3>2. Weighted matrix</h3>
<p>Criteria come from PDS headings; weights are agreed <b>before</b> anyone scores; scores 1–5; total = Σ score × weight.</p>
<div class="tbl"><table class="data">
<tr><th>Criterion (PDS)</th><th>Wt</th><th>Cam-over</th><th>Screw collar</th><th>Spring pin</th></tr>
<tr><td>Can't release under load (8)</td><td>5</td><td>4 (20)</td><td>5 (25)</td><td>3 (15)</td></tr>
<tr><td>20,000 cycles (7)</td><td>4</td><td>3 (12)</td><td>5 (20)</td><td>4 (16)</td></tr>
<tr><td>One hand in 5 s (10)</td><td>3</td><td>5 (15)</td><td>1 (3)</td><td>4 (12)</td></tr>
<tr><td>≤ 250 g added (11)</td><td>3</td><td>4 (12)</td><td>5 (15)</td><td>3 (9)</td></tr>
<tr><td>Makeable (4)</td><td>2</td><td>4 (8)</td><td>5 (10)</td><td>3 (6)</td></tr>
<tr><td><b>Total</b></td><td></td><td>67</td><td><b>73</b></td><td>58</td></tr>
</table></div>

<h3>3. Principle 3: a choice you can't defend is a choice you didn't make</h3>
<p>Raise "one hand, in 5 s" from weight 3 to 5 and the totals become 77 / 75 / 66: the winner flips. Run this <b>sensitivity check</b> on every matrix: if one unjustified weight flips the result, you haven't decided, you've guessed. Write the reason for every weight.</p>
<p>Consequence: in March 2025 Segway recalled 220,000 Ninebot scooters (68 incidents, 20 injuries) because the folding mechanism could collapse. "Lock the fold" had been under-weighted somewhere.</p>
<p>The thread you'll defend: Brief → PDS → Functions → Concepts → Matrix → Detail → Build.</p>

<h3>4. Design review (weeks 5–6, 20%)</h3>
<p>12-minute slot (≈ 9 min talk + 3 min questions); PowerPoint submitted on Loop at the start of your presentation week.</p>
<div class="tbl"><table class="data">
<tr><th>Criterion</th><th>Marks</th><th>For "excellent"</th></tr>
<tr><td>Climbing mechanism</td><td>20</td><td>Three clearly different concepts; well-justified matrix; chosen design fits ladder and actuator; in SW CAD</td></tr>
<tr><td>Gripper</td><td>15</td><td>Three distinct workable designs; justified selection; rung interaction shown in CAD</td></tr>
<tr><td>Stabilising system</td><td>15</td><td>Two or more concepts; stability and friction explained; compatible with the climbing motion</td></tr>
<tr><td>Spring & damping</td><td>15</td><td>Two or more arrangements; justified criteria; practically integrated in CAD</td></tr>
<tr><td>Complete SW assembly</td><td>25</td><td>All subsystems working together; interfaces, motion, clearances and constraints addressed</td></tr>
<tr><td>Teamwork & questions</td><td>10</td><td>Balanced contribution, on time, confident accurate answers</td></tr>
</table></div>`,
formulas: [
 {name:"Weighted total", tex:R`\text{Total} = \sum_i w_i s_i`},
 {name:"Combinations", tex:R`N = \prod_i n_i`, note:"options per function multiplied"}
],
questions: [
 {src:"Lecture 2 exercise", see:[0], q:R`Write the FireFighter device's functions as verb + object (six to ten).`,
  hint:"Think about each moment of a climb cycle, and the water.",
  sol:R`<p>One possible list: <i>grip the rung</i>; <i>release the rung</i>; <i>lift the body</i> (one pitch per cycle); <i>hold position</i> while the other end moves; <i>keep the device aligned</i> to the ladder; <i>support the beaker</i>; <i>isolate the beaker from vibration</i>; <i>sense end of stroke</i>; <i>switch the valve</i>; <i>stop at the top</i>.</p><p>Compare with a teammate: differences reveal hidden assumptions (e.g. does "lift" happen on extension or retraction?).</p>`,
  ans:"e.g. grip rung, release rung, lift body, stay aligned, support beaker, isolate vibration, sense stroke end, switch valve", prov:"Lecture 2 exercise; example answer by Claude."},
 {src:"Lecture 2 example", see:[2,3], q:R`Using the lock-the-fold matrix, recompute the totals with "One hand in 5 s" weighted 5 instead of 3. What does this tell you?`,
  hint:"Only that row changes: add 2 × its score to each total.",
  sol:R`<p>Cam-over: 67 + 2(5) = <b>77</b>. Screw collar: 73 + 2(1) = 75. Spring pin: 58 + 2(4) = 66. The winner flips from screw collar to cam-over lever: the decision rests on one weight, so that weight needs a written justification (and a sensitivity check belongs in the portfolio).</p>`,
  ans:"77 / 75 / 66 — winner flips", prov:"Lecture 2 example."},
 {src:"Practice (Claude)", see:[2,3], q:R`Three gripper concepts scored 1–5 against: no slip on a 12 mm rung (wt 5), release time (wt 3), mass (wt 2), makeable with our processes (wt 4). Hook: 4, 5, 4, 5. Clamp jaw: 5, 2, 3, 3. Printed latch: 3, 4, 5, 2. Which wins, and is it robust to dropping "makeable" to weight 2?`,
  hint:"Σ w × s, then repeat with the changed weight.",
  sol:R`<p>Hook 20 + 15 + 8 + 20 = <b>63</b>; clamp 25 + 6 + 6 + 12 = 49; latch 15 + 12 + 10 + 8 = 45.</p><p>With makeable at 2: hook 53, clamp 43, latch 41. The hook still wins comfortably, so the choice is robust to that weight.</p>`,
  ans:"Hook (63); still wins (53)", prov:"Made-up scores by Claude to practise the method."}
],
traps: [
 "Agree criteria and weights BEFORE scoring.",
 "Criteria should trace back to PDS headings.",
 "Always sensitivity-check: if one weight flips the winner, justify it.",
 "Three concepts must be genuinely different, not variations of one idea."
]
});

T.topics.push({
id: "resources", part: "Design method", title: "Ladder, Cylinder, Beaker & Spring–Damper Constraints",
lectures: "Week 3 Student Guide; ladder, beaker, damper, cylinder and spring data", status: "partial",
summary: "The real geometry and hardware the design must fit: ladder and rung dimensions, the beaker envelope, cylinder forces at 6 bar, the spring catalogue and the fixed dashpot with its piston options, plus a calculation sequence for the suspension. The week 7 spring–damper notes will add the damping method.",
theory: R`
<h3>0. Fixed vs yours</h3>
<div class="tbl"><table class="data">
<tr><th>Supplied / fixed</th><th>Your team designs</th></tr>
<tr><td>Ladder and test frame</td><td>Climbing mechanism and rung interaction</td></tr>
<tr><td>500 mL beaker</td><td>Beaker holder and support</td></tr>
<tr><td>Pneumatic cylinder (stroke, force)</td><td>Linkage turning cylinder motion into climbing</td></tr>
<tr><td>Spring catalogue</td><td>Number, type, stiffness and arrangement of springs</td></tr>
<tr><td>Dashpot pot</td><td>Piston option and its integration</td></tr>
<tr><td>Permitted microswitches</td><td>Switch locations, triggers and the automatic sequence</td></tr>
</table></div>
<p>Never change a reference dimension to make a concept fit: redesign the concept.</p>

<h3>1. Geometry</h3>
<ul>
<li><b>Ladder:</b> 1000 mm long, 170 mm wide (140 mm inside), 3 mm stainless plate, <b>12 mm rungs with 40 mm clear gaps → 52 mm rung pitch</b>.</li>
<li><b>Beaker:</b> ≈ 107 mm high, 92 mm top Ø, 82 mm bottom Ø.</li>
<li><b>Dashpot pot:</b> 25 mm internal Ø, ≈ 35 mm usable depth. Piston lengths 8, 10, 12 or 14 mm; clearance 0.3 mm. Travel available = 35 mm − piston length.</li>
</ul>
<p>Note that one 50 mm stroke is slightly <b>less</b> than the 52 mm pitch: the linkage has to amplify displacement, or the mechanism must climb more than one pitch over several strokes.</p>

<h3>2. Cylinder (Series 522 mini cylinders)</h3>
<div class="tbl"><table class="data">
<tr><th>Bore (mm)</th><th>10</th><th>12</th><th>16</th><th>20</th><th>25</th></tr>
<tr><td>Push at 6 bar (N)</td><td>46</td><td>67</td><td>118</td><td>185</td><td>289</td></tr>
<tr><td>Pull at 6 bar, double-acting (N)</td><td>39</td><td>50</td><td>102</td><td>155</td><td>243</td></tr>
<tr><td>Rod thread</td><td>M4</td><td>M6</td><td>M6</td><td>M8</td><td>M10×1.25</td></tr>
</table></div>
<p>$F = pA$: push uses the full bore, pull the annulus $\frac{\pi}{4}(D^2 - d^2)$. A linkage that multiplies displacement by $k$ divides the available force by $k$ (work is conserved, ignoring friction).</p>

<h3>3. Suspension: calculation sequence</h3>
<ol class="steps">
<li>Suspended mass: beaker + 0.5 kg water + holder + anything moving with it.</li>
<li>Choose the number and arrangement of springs; find the equivalent stiffness needed (parallel: $k = k_1 + k_2$; series: $1/k = 1/k_1 + 1/k_2$).</li>
<li>Pick the nearest catalogue spring(s) (music-wire compression and extension springs; rate in N/mm) and check the working-length/extension limits.</li>
<li>Calculate the damping needed using the method in the week 7 notes.</li>
<li>Apply the fixed dashpot and 0.3 mm clearance; compare 8, 10, 12, 14 mm pistons.</li>
<li>Check the piston stays inside the pot over the full movement; record assumptions and reasons in the portfolio.</li>
</ol>
<p>Useful single-degree-of-freedom results (from Mechanics of Machines): static deflection $\delta = mg/k$, $\omega_n = \sqrt{k/m}$, $\zeta = c/(2\sqrt{km})$. A softer spring lowers $\omega_n$ (better isolation from the climbing jolts) but sags more.</p>

<h3>4. Using the SolidWorks reference package</h3>
<p>Extract the whole ZIP; copy it into your group workspace; open <code>All Parts.SLDASM</code> and bring only what you need into your own assembly. Use <code>ladder.SLDPRT</code> for gripper and stabiliser checks, the cylinder/clevis/foot models for mounting, the switch assemblies for trigger positions. Run interference and full-motion checks before drawings.</p>`,
formulas: [
 {name:"Cylinder force", tex:R`F = pA,\ A_{push} = \frac{\pi D^2}{4},\ A_{pull} = \frac{\pi(D^2-d^2)}{4}`},
 {name:"Springs", tex:R`k_{par} = k_1 + k_2,\quad \frac{1}{k_{ser}} = \frac{1}{k_1} + \frac{1}{k_2}`},
 {name:"Static deflection", tex:R`\delta = \frac{mg}{k}`},
 {name:"Natural frequency", tex:R`\omega_n = \sqrt{k/m}`},
 {name:"Damping ratio", tex:R`\zeta = \frac{c}{2\sqrt{km}}`},
 {name:"Rung pitch", tex:R`12 + 40 = 52\ \text{mm}`}
],
questions: [
 {src:"Practice (Claude)", fig:"pd_ladder", see:[1], q:R`From the ladder drawing: what is the rung pitch, roughly how many pitches are there in the 1 m climb, and what does this mean for a 50 mm stroke?`,
  hint:"Rung thickness + clear gap.",
  sol:R`<p>Pitch = 12 + 40 = 52 mm. (1000 − 12)/52 ≈ 19 pitches.</p><p>A direct 50 mm stroke is 2 mm short of one pitch, so either the linkage amplifies displacement (ratio ≥ 52/50 ≈ 1.04, plus margin for gripper engagement) or the mechanism advances more than one pitch over several strokes. ~19 or more cycles per climb sets how fast each cycle must be.</p>`,
  ans:"52 mm; ≈ 19 pitches; stroke alone falls 2 mm short", prov:"Worked by Claude from the supplied ladder drawing."},
 {src:"Practice (Claude)", see:[2], q:R`Check the pull force of a 25 mm bore cylinder with a 10 mm rod at 6 bar against the table, and find the force available after a linkage that doubles the displacement.`,
  hint:"Annulus area.",
  sol:R`<p>$A = \frac{\pi}{4}(25^2 - 10^2) = 412$ mm²; $F = 0.6\ \text{N/mm}^2 \times 412 = 247$ N (table: 243 N).</p><p>Doubling displacement halves the force: ≈ 120 N, still far more than the weight of a ~2 kg device (≈ 20 N), so a smaller bore may save weight.</p>`,
  ans:"≈ 247 N (table 243 N); ≈ 120 N after a 2:1 linkage", prov:"Worked by Claude from the cylinder data sheet."},
 {src:"Practice (Claude)", see:[3], q:R`The suspended mass (beaker, water and holder) is 0.70 kg, carried on two identical springs in parallel. You want a static deflection of 10 mm. What rate should each spring have, and what is the natural frequency?`,
  hint:"k = mg/δ for the pair, then share it.",
  sol:R`<p>$k = mg/\delta = 0.70(9.81)/0.010 = 687$ N/m = 0.69 N/mm for the pair ⇒ ≈ 0.34 N/mm each. Then pick the nearest catalogue spring and check its working-length limit.</p><p>$\omega_n = \sqrt{687/0.70} = 31.3$ rad/s ≈ 5.0 Hz.</p>`,
  ans:"≈ 0.34 N/mm each; ≈ 5 Hz", prov:"Made-up numbers by Claude to practise the sequence; the damping step waits for the week 7 notes."}
],
traps: [
 "Rung pitch is 52 mm, not 40 mm: include the rung thickness.",
 "Pull force is lower than push (rod area).",
 "Piston travel in the dashpot = 35 mm minus piston length.",
 "Don't edit supplied reference parts to make a concept fit."
]
});
})();
