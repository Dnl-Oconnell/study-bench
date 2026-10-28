/* MEC1017 — Lecture 8: pneumatic actuation and electrical control (5/2 valve, limit switches, relay latch) */
(function(){
const R = String.raw;
const T = STUDY.content.pd = STUDY.content.pd || { topics: [] };

T.topics.push({
id: "pneumatics", part: "Actuation & control", title: "Pneumatic Actuation & Electrical Control",
lectures: "Lecture 8 – Pneumatic Actuation and Electrical Control", status: "lectured",
summary: "How the FireFighter robot turns compressed air into climbing: the parts of a pneumatic system, the double-acting cylinder and its extension/retraction forces, the bistable 5/2 double-solenoid valve, NO/NC limit switches, and the relay start/stop latch that runs the extend–retract cycle.",
theory: R`<h3>0. What a pneumatic actuation system is</h3>
<p>Compressed air is directed into an actuator (here a cylinder) to produce force and movement. Typical uses: industrial automation, packaging and material handling, robotic mechanisms, clamping, lifting and positioning.</p>
<table class="data">
<tr><th>Component</th><th>Function</th></tr>
<tr><td>Compressed-air supply</td><td>Provides the energy for movement</td></tr>
<tr><td>Pressure regulator</td><td>Controls the supplied air pressure</td></tr>
<tr><td>Directional control valve</td><td>Controls the direction of airflow</td></tr>
<tr><td>Pneumatic cylinder</td><td>Converts compressed-air energy into mechanical movement</td></tr>
<tr><td>Pneumatic tubing</td><td>Carries air between valve and cylinder</td></tr>
<tr><td>Electrical control circuit</td><td>Decides when the valve changes position</td></tr>
<tr><td>Limit switches</td><td>Detect the positions of moving parts</td></tr>
</table>
<div class="flow"><span>Air supply</span><i>→</i><span>Regulator</span><i>→</i><span>5/2 valve</span><i>→</i><span>Cylinder</span><i>→</i><span>Linkage &amp; grippers</span></div>

<h3>1. The cylinder in the FireFighter robot</h3>
<p>The robot climbs a 1 m ladder carrying 500 mL of water, driven by one double-acting cylinder with a 50 mm stroke. The cylinder only supplies force; the linkage and grippers decide how that becomes vertical climbing.</p>
<ol class="steps">
<li>Cylinder extends → climbing linkage moves → grippers engage a rung.</li>
<li>Cylinder retracts → the rest of the robot is pulled up → the cycle repeats.</li>
</ol>
<p><b>Parts:</b> barrel (contains the piston), piston (separates the two air chambers), piston rod (transfers movement to the mechanism), air ports (let air in and out), seals (prevent leakage).</p>
<p><b>Double-acting:</b> air drives the piston both ways.</p>
<ul>
<li><b>Extension:</b> air enters the cap-end chamber and pushes the rod out; the rod-end chamber exhausts.</li>
<li><b>Retraction:</b> air enters the rod-end chamber and pulls the rod in; the cap-end chamber exhausts.</li>
</ul>

<h3>2. Cylinder forces (Bosch Rexroth Mini Cylinder Series 522)</h3>
<table class="data num">
<tr><th>Parameter</th><th>Value</th></tr>
<tr><td>Bore $D$</td><td>12 mm</td></tr>
<tr><td>Rod $d$</td><td>6 mm</td></tr>
<tr><td>Stroke</td><td>50 mm</td></tr>
<tr><td>Pressure for calculations</td><td>6 bar (600 000 Pa)</td></tr>
<tr><td>Maximum rated pressure</td><td>10 bar</td></tr>
</table>
<p>Extension: air acts on the full piston area. Retraction: the rod takes up part of that area, so only the annulus is pushed.</p>
$$F_{ext} = P\,\frac{\pi D^2}{4} \qquad F_{ret} = P\,\frac{\pi (D^2 - d^2)}{4}$$
<p>At 6 bar: $F_{ext} = 0.6\ \text{N/mm}^2 \times 113.1\ \text{mm}^2 \approx 67$ N and $F_{ret} = 0.6 \times 84.8 \approx 50$ N (the lecture's figures; 67.9 N and 50.9 N unrounded).</p>
<div class="callout key">Retraction is always the weaker stroke. If your mechanism lifts the robot on retraction, size it against $F_{ret}$, not $F_{ext}$.</div>

<h3>3. The 5/2 double-solenoid valve</h3>
<p>"5/2" means <b>5 ports</b> and <b>2 switching positions</b>.</p>
<table class="data">
<tr><th>Port</th><th>Purpose</th></tr>
<tr><td>1 (P)</td><td>Compressed-air supply</td></tr>
<tr><td>2 (B)</td><td>To one cylinder chamber</td></tr>
<tr><td>4 (A)</td><td>To the other cylinder chamber</td></tr>
<tr><td>3 (R), 5 (S)</td><td>Exhausts</td></tr>
</table>
<p>A <b>solenoid</b> is an electromagnetic coil that shifts the valve spool when a voltage is applied. The project valve has two: <b>Y1</b> switches it to the extension position, <b>Y2</b> to the retraction position.</p>
<p>The valve is <b>bistable</b>: it stays in its last position after the signal is removed.</p>
<ul>
<li>Y1 energised → extension.</li>
<li>Y1 de-energised → valve stays put (cylinder keeps extending/holds extended).</li>
<li>Y2 energised → retraction.</li>
</ul>
<p>So a short pulse on each solenoid is enough; you don't need to hold it on.</p>

<h3>4. Limit switches (microswitches)</h3>
<p>A limit switch is a mechanically operated electrical switch: its contacts change when a moving part presses the lever or button. It produces no motion itself; it only signals the control circuit.</p>
<table class="data">
<tr><th>Terminal</th><th>Meaning</th><th>Behaviour</th></tr>
<tr><td>COM</td><td>Common</td><td>Always used</td></tr>
<tr><td>NO</td><td>Normally open</td><td>Open when unpressed, closes when pressed</td></tr>
<tr><td>NC</td><td>Normally closed</td><td>Closed when unpressed, opens when pressed</td></tr>
</table>
<p>You wire COM–NO or COM–NC, not necessarily all three. One suggested arrangement:</p>
<table class="data">
<tr><th>Switch</th><th>Possible function</th></tr>
<tr><td>LS1</td><td>One end position of the climbing mechanism</td></tr>
<tr><td>LS2</td><td>The opposite end position</td></tr>
<tr><td>LS3</td><td>Robot has reached the top of the ladder</td></tr>
</table>
<p>Design questions to answer: where each switch goes, which moving part trips it, NO or NC, and how the signals command extend, retract and stop.</p>

<h3>5. The relay start/stop latch (example circuit)</h3>
<p>An electromechanical relay is an electrically operated switch: current in its coil pulls in contacts. Here relay K1 enables or disables the automatic cycle. The lecture's example, on a 24 V DC supply (it is illustrative only; each group must design and verify its own):</p>
<ol class="steps">
<li>+24 V passes through <b>LS3 (NC)</b> (opens at the top of the ladder) and <b>STOP (NC)</b>.</li>
<li><b>START (NO)</b>, a momentary button, energises the K1 coil.</li>
<li>K1's own <b>NO holding contact</b>, wired in parallel with START, closes and keeps K1 energised after START is released (the latch).</li>
<li>The latched line feeds <b>LS1 (NO)</b>, which energises <b>Y1</b> at the bottom position (extend), and <b>LS2 (NO)</b>, which energises <b>Y2</b> at the top position (retract).</li>
<li>Pressing STOP, or LS3 opening at the top, drops K1 out; the holding contact opens and the robot stays stopped until START is pressed again.</li>
</ol>
<div class="callout">STOP and the top switch are NC in series so that pressing either one, or a broken wire, cuts power: the safe state is "off".</div>`,
formulas: [
 {name:"Extension force", tex:R`F_{ext} = P\,\frac{\pi D^2}{4}`, note:"Full piston area"},
 {name:"Retraction force", tex:R`F_{ret} = P\,\frac{\pi (D^2 - d^2)}{4}`, note:"Annulus: the rod takes up area"},
 {name:"Project cylinder at 6 bar", tex:R`F_{ext} \approx 67\ \text{N},\quad F_{ret} \approx 50\ \text{N}`, note:"D = 12 mm, d = 6 mm"},
 {name:"Units", tex:R`1\ \text{bar} = 10^5\ \text{Pa} = 0.1\ \text{N/mm}^2`}
],
questions: [
 {src:"Lecture 8 (worked example)", see:[2], q:R`Confirm the extension and retraction forces of the 12 mm bore, 6 mm rod cylinder at 6 bar.`,
  hint:"Convert 6 bar to 0.6 N/mm² and use the full area, then the annulus.",
  sol:R`<p>$A_{ext} = \frac{\pi}{4}(12^2) = 113.1$ mm², so $F_{ext} = 0.6 \times 113.1 = 67.9$ N.</p><p>$A_{ret} = \frac{\pi}{4}(12^2 - 6^2) = 84.8$ mm², so $F_{ret} = 0.6 \times 84.8 = 50.9$ N.</p>`,
  ans:"≈ 67 N extension, ≈ 50 N retraction", prov:"From the worked example in Lecture 8 (lecture rounds to 67 N and 50 N)."},
 {src:"Practice (Claude)", see:[2], q:R`The regulator is turned down to 4 bar to soften the stroke. The robot plus 500 mL of water has a mass of 2 kg and is lifted on the retraction stroke. Find both forces and the safety margin on lifting (ignore friction and linkage ratio).`,
  hint:"Scale the 6 bar answers by 4/6, then compare F_ret with mg.",
  sol:R`<p>$F_{ext} = 0.4 \times 113.1 = 45.2$ N; $F_{ret} = 0.4 \times 84.8 = 33.9$ N.</p><p>Weight $= 2 \times 9.81 = 19.6$ N, so the margin is $33.9 / 19.6 \approx 1.7$. At 6 bar it would be $50.9/19.6 \approx 2.6$. Any linkage that multiplies displacement divides this force further, so 4 bar leaves little room.</p>`,
  ans:"45.2 N, 33.9 N; margin ≈ 1.7", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Claude)", see:[3], q:R`Y1 is pulsed for 0.2 s and released. What does the cylinder do, and what must happen for it to retract?`,
  hint:"The valve is bistable.",
  sol:R`<p>The bistable 5/2 valve shifts to the extension position and stays there after Y1 is de-energised, so the cylinder extends fully and holds. It retracts only when Y2 is energised and shifts the spool back.</p>`,
  ans:"Extends fully and stays extended until Y2 is energised", prov:"Worked by Claude from the Lecture 8 slides."},
 {src:"Practice (Claude)", see:[5], fig:"pd_relay", q:R`In the example relay circuit, the operator presses and releases START. Describe what keeps the robot running, and what happens when the robot reaches the top of the ladder.`,
  hint:"Look at the K1 contact in parallel with START, and at LS3.",
  sol:R`<p>START energises the K1 coil; K1's NO holding contact, in parallel with START, closes and keeps the coil energised after START is released. The latched line powers LS1 and LS2, so the cylinder extends when LS1 is pressed (Y1) and retracts when LS2 is pressed (Y2), cycling automatically.</p><p>At the top, NC switch LS3 opens, removing power from K1 and from LS1/LS2. The holding contact drops out, so the robot stays stopped even after LS3 re-closes, until START is pressed again.</p>`,
  ans:"K1 holding contact latches; LS3 opening drops the latch and stops the cycle", prov:"Worked by Claude from the Lecture 8 example circuit."},
 {src:"Practice (Claude)", see:[4], q:R`Why are the STOP button and the top limit switch wired normally closed, while START, LS1 and LS2 are normally open?`,
  sol:R`<p>STOP and LS3 must <i>break</i> the circuit to act, so they sit closed in series and open to cut power; a broken wire also cuts power, which fails safe. START, LS1 and LS2 must <i>make</i> a connection to command an action (latch on, extend, retract), so they are open until pressed.</p>`,
  ans:"Stop functions break the circuit (NC, fail-safe); command functions make it (NO)", prov:"Worked by Claude from the Lecture 8 slides."}
],
traps: [
 "Retraction force is smaller than extension force because the rod reduces the pressurised area.",
 "Convert pressure properly: 6 bar = 0.6 N/mm² = 600 000 Pa.",
 "A bistable valve does not spring back when the solenoid is released; it stays in its last position.",
 "5/2 means five ports and two positions, not five positions.",
 "A limit switch gives an electrical signal only; it doesn't move anything.",
 "Without the K1 holding contact the robot would only run while START is held down.",
 "The example circuit is illustrative; your group's switch positions and wiring depend on your own climbing mechanism."
]
});
})();
