/* EEN1029 — Task 2 (motors, drives, encoders) and Task 3 (ac switching, from past papers) */
(function(){
const R = String.raw;
const T = STUDY.content.ems = STUDY.content.ems || { topics: [] };

T.topics.push({
id: "dcmotors", part: "Task 2: Motors", title: "DC Machine Principles & Motor Characteristics",
lectures: "Task 2 – DC Motors; DC Motor Characteristics", status: "lectured",
summary: "The linear machine (Lorentz force and back emf), motor vs generator action, commutation, the DC machine equations, torque–speed lines for PM, shunt and series motors, and how brushed, brushless, universal and stepper motors compare.",
theory: R`
<h3>0. The linear machine</h3>
<p>A bar on rails in a perpendicular field $B$, fed from $V_T$ through $R_A$:</p>
<ul>
<li>At start: $i_A = V_T/R_A$, force $F = i_Al\times B$ pushes the bar.</li>
<li>As it moves at speed $u$ it cuts flux: back emf $e_A = Blu$ opposes the supply, so $i_A = (V_T - e_A)/R_A$ falls.</li>
<li>With no load it settles where $e_A = V_T$.</li>
<li><b>Motor action:</b> a load slows the bar, $e_A$ drops, current flows and the force balances the load (electrical → mechanical).</li>
<li><b>Generator action:</b> push it faster, $e_A > V_T$, current reverses (mechanical → electrical).</li>
</ul>

<h3>1. Construction and commutation</h3>
<p>Stator: field windings or permanent magnets (even number of poles). Rotor: laminated iron with the armature windings in slots. The <b>commutator</b> (copper segments) and graphite <b>brushes</b> reverse the armature current every half-turn so torque stays one direction. Downsides: wear, sparking/EMI, speed limit, maintenance.</p>

<h3>2. The DC machine equations</h3>
$$V_T = R_AI_A + E_A,\quad E_A = K\phi\omega_m,\quad T_{dev} = K\phi I_A,\quad P_{dev} = E_AI_A = T_{dev}\omega_m$$
<p>$K$ is the machine constant, $\phi$ the flux per pole. $T_{out} < T_{dev}$ because of rotational losses (friction, windage, eddy, hysteresis, roughly ∝ speed). Magnetisation curve: $E_A$ vs field current at fixed speed has the shape of $\phi$ vs $I_F$ and flattens with saturation; $E_{A1}/E_{A2} = n_1/n_2$.</p>

<h3>3. Torque–speed characteristics</h3>
<p><b>PM and shunt / separately excited</b> ($\phi$ constant): a straight line</p>
$$T_{dev} = \frac{K\phi}{R_A}(V_T - K\phi\omega_m),\qquad T_{stall} = \frac{K\phi V_T}{R_A},\qquad \omega_{no\,load} = \frac{V_T}{K\phi}$$
<p>Raising $V_T$ shifts the line outward in parallel: simple speed control. Shunt power flow: $P_{in} = V_TI_L$, field loss $V_T^2/(R_F + R_{adj})$, armature loss $I_A^2R_A$.</p>
<p><b>Series</b> ($I_A = I_F$, $\phi = K_FI_A$):</p>
$$T_{dev} = KK_FI_A^2 = \frac{KK_FV_T^2}{(R_F + R_A + KK_F\omega_m)^2}$$
<p>Huge starting torque, speed falls steeply with load, dangerous (runaway) unloaded.</p>

<h3>4. Motor comparison</h3>
<div class="tbl"><table class="data">
<tr><th>Type</th><th>Character</th><th>Typical uses</th></tr>
<tr><td>PM brushed</td><td>Linear T–ω, simple control, compact; brush wear; flux fixed</td><td>Window motors, small tools, robotics</td></tr>
<tr><td>Shunt</td><td>Nearly constant speed, good regulation, field adjustable</td><td>Machine tools</td></tr>
<tr><td>Series</td><td>Very high starting torque, T ∝ I²</td><td>Starters, traction, cranes</td></tr>
<tr><td>Compound</td><td>Between shunt and series</td><td>Elevators</td></tr>
<tr><td>Universal</td><td>Series motor on ac or dc, laminated stator, fast, noisy</td><td>Power tools, vacuums</td></tr>
<tr><td>Brushless (BLDC)</td><td>PM rotor, electronic commutation (Hall/encoder), 85–95% efficient</td><td>Drones, EVs, HDDs</td></tr>
<tr><td>Stepper</td><td>Discrete steps (1.8° = 200/rev), open-loop position, holding torque</td><td>3D printers, CNC</td></tr>
</table></div>

<h3>5. Speed control of wound-field motors</h3>
<p>Below rated speed: vary armature voltage at full field (constant torque available). Above rated speed: <b>field weakening</b>, reduce $I_F$ so $\phi$ falls and $\omega \propto 1/\phi$ rises; torque drops, power stays constant.</p>`,
formulas: [
 {name:"Armature KVL", tex:R`V_T = R_AI_A + E_A`},
 {name:"Back emf", tex:R`E_A = K\phi\omega_m`},
 {name:"Torque", tex:R`T_{dev} = K\phi I_A`},
 {name:"Power", tex:R`P_{dev} = E_AI_A = T_{dev}\omega_m`},
 {name:"PM / shunt T–ω", tex:R`T = \frac{K\phi}{R_A}(V_T - K\phi\omega)`},
 {name:"Stall & no-load", tex:R`T_{stall} = \frac{K\phi V_T}{R_A},\ \omega_{0} = \frac{V_T}{K\phi}`},
 {name:"Series motor", tex:R`T = \frac{KK_FV_T^2}{(R_F+R_A+KK_F\omega)^2}`}
],
questions: [
 {src:"Practice (Claude)", see:[2,3], q:R`A PM dc motor has $R_A = 2$ Ω and $K\phi = 0.05$ V·s/rad, supplied at 12 V. Find the stall torque, no-load speed (rpm), and the speed, current and developed power at a load torque of 0.1 N·m (ignore rotational losses).`,
  hint:"I_A = T/Kφ, then E_A = V_T − I_AR_A, then ω = E_A/Kφ.",
  sol:R`<p>$T_{stall} = 0.05(12)/2 = 0.30$ N·m; $\omega_0 = 12/0.05 = 240$ rad/s = 2292 rpm.</p>
  <p>At 0.1 N·m: $I_A = 0.1/0.05 = 2$ A, $E_A = 12 - 4 = 8$ V, $\omega = 8/0.05 = 160$ rad/s (1528 rpm).</p>
  <p>$P_{dev} = E_AI_A = 16$ W $= T\omega = 0.1 \times 160$ ✓.</p>`,
  ans:"0.30 N·m; 2292 rpm; 1528 rpm, 2 A, 16 W", prov:"Worked by Claude with made-up numbers to practise the equations."},
 {src:"Exam 2026 Q4(c)", see:[4], q:R`Compare a PM brushed dc motor and a stepper motor for positioning a 3D-printer head that needs high positional accuracy, repeatability and holding torque.`,
  hint:"Think about feedback, holding torque, maintenance and efficiency.",
  sol:R`<div class="tbl"><table class="data"><tr><th></th><th>PM brushed dc</th><th>Stepper</th></tr>
  <tr><td>Control</td><td>Continuous rotation, no position info; needs encoder + closed loop</td><td>Discrete 1.8° steps; position known by counting; open loop</td></tr>
  <tr><td>Accuracy</td><td>Set by encoder resolution and loop tuning</td><td>Set by step angle; better with microstepping</td></tr>
  <tr><td>Repeatability</td><td>Feedback corrects drift</td><td>Inherently repeatable, but lost steps go undetected</td></tr>
  <tr><td>Holding torque</td><td>None passively; servo must actively hold</td><td>Strong holding torque whenever energised</td></tr>
  <tr><td>Maintenance</td><td>Brushes wear, EMI</td><td>Brushless, essentially maintenance-free</td></tr>
  <tr><td>Efficiency</td><td>Higher, better at speed</td><td>Lower, runs warm, resonance</td></tr></table></div>
  <p><b>Stepper</b> is the better choice here.</p>`,
  ans:"Stepper", prov:"Follows the posted exam solution."}
],
traps: [
 "E_A is the back emf: it opposes the supply, so I_A = (V_T − E_A)/R_A.",
 "Torque ∝ current, speed ∝ back emf: T = KφI_A and E_A = Kφω.",
 "Series motors: never run unloaded (speed runs away).",
 "Use rad/s in the equations; convert rpm = ω × 60/2π at the end.",
 "T_out < T_dev because of rotational losses."
]
});

T.topics.push({
id: "drive", part: "Task 2: Motors", title: "H-Bridges, PWM & Stepper Control on the ESP32",
lectures: "Task 2 – DC Motor Control and Encoders; DC Motor Characteristics (stepper control); Task 2 description", status: "lectured",
summary: "Why an H-bridge is needed, direction and braking, PWM speed control and its practicalities, current sensing, open vs closed loop (P and PI), servos, and driving a bipolar stepper through an SN754410 with full-step sequences. Q4 on every past paper.",
theory: R`
<h3>0. Why an H-bridge</h3>
<ul>
<li>Lets logic-level signals control a higher-voltage supply to the motor, so the ESP32 sets the <b>polarity</b> across the motor ⇒ bidirectional control.</li>
<li>A PWM on an input sets the average voltage ⇒ <b>speed</b> control.</li>
<li>Without it, ESP32 pins give too little voltage and can't supply motor current. The H-bridge gives some protection, but not full isolation.</li>
</ul>
<div class="tbl"><table class="data">
<tr><th>1A</th><th>2A</th><th>Motor</th></tr>
<tr><td>H (or PWM)</td><td>L</td><td>Clockwise</td></tr>
<tr><td>L</td><td>H (or PWM)</td><td>Anti-clockwise</td></tr>
<tr><td>H</td><td>H</td><td><b>Brake</b>: both terminals at the supply, motor shorted; any back emf drives a current that resists rotation</td></tr>
<tr><td colspan="2">EN low</td><td>Coast (outputs off)</td></tr>
</table></div>
<p>Good practice: disable the enable pin, change the inputs, re-enable.</p>

<h3>1. PWM speed control</h3>
<p>$V_A = I_AR_A + K_e\omega_m$; with light load $V_A \propto \omega_m$. PWM duty cycle $D = t_{on}/T$ gives $V_{avg} = DV_{supply}$; the motor's inductance smooths the current. On the ESP32 Arduino core, <code>analogWrite(pin, 0–255)</code>.</p>
<ul>
<li>&lt; 2 kHz: audible whine; 20–50 kHz: good; &gt; 50 kHz: high switching losses.</li>
<li><b>Dead-time</b> (a short delay when switching) stops both transistors in one leg conducting together (shoot-through = supply shorted).</li>
</ul>

<h3>2. Current sensing and control loops</h3>
<p>Shunt resistor: $I_A = V_{shunt}/R_{shunt}$, cheap and accurate but intrusive ($I^2R$ loss), the mV signal needs amplifying, and it must be rated $P > I_{max}^2R$. Hall-effect sensor: isolated and non-invasive, but dearer and less accurate at low current.</p>
<p><b>Open loop</b>: no feedback, can't correct for load changes. <b>Closed loop</b>: error = setpoint − measured. P control $u = K_pe$ leaves a steady-state error under load; PI $u = K_pe + K_i\int e\,dt$ removes it.</p>
<p><b>Hobby servos</b>: motor + gearbox + pot + controller in one unit; a 50 Hz signal whose <b>pulse width</b> (≈1–2 ms) sets the angle. For limited-range positioning, not continuous speed.</p>

<h3>3. Steppers</h3>
<p>Brushless; the rotor follows a stator field held at discrete positions. Hybrid is most common, 1.8° per step (200 steps/rev). Bipolar: one winding per phase, needs an H-bridge per phase, 4 wires, full torque. Unipolar: centre-tapped, simpler drive, about 70% of the torque.</p>
<div class="tbl"><table class="data">
<tr><th>Step</th><th>A</th><th>B</th></tr>
<tr><td>1</td><td>+</td><td>+</td></tr>
<tr><td>2</td><td>−</td><td>+</td></tr>
<tr><td>3</td><td>−</td><td>−</td></tr>
<tr><td>4</td><td>+</td><td>−</td></tr>
</table></div>
<p>Step 1→4 one way, 4→1 the other. Half-step doubles the resolution (400/rev); microstepping uses sine-weighted currents (1600, 3200+). Driver ICs (A4988, DRV8825, TMC2208) take STEP and DIR pulses.</p>
<p><b>Speed:</b> steps per second = rpm × steps/rev ÷ 60, so delay per step = 60 000 ms / (rpm × steps/rev). At 1 rpm with 200 steps/rev: 300 ms per step.</p>

<h3>4. Exam-style code pattern</h3>
<pre>void motorCW(int duty) {          // duty 0–255
  digitalWrite(EN, LOW);
  direction = 1;  count = 0;
  analogWrite(IN_1A, duty);
  digitalWrite(IN_2A, LOW);
  digitalWrite(EN, HIGH);
}
void motorBrake() {               // both sides high = shorted motor
  digitalWrite(EN, LOW);
  digitalWrite(IN_1A, HIGH); digitalWrite(IN_2A, HIGH);
  digitalWrite(EN, HIGH);
}
void IRAM_ATTR ISR() { count += direction; }</pre>
<p>Sequence long tasks with a <code>stage</code> variable in <code>loop()</code> and compare <code>count</code> with the target. For fractions of a turn use <code>CHANGE</code> interrupts to double the counts.</p>`,
formulas: [
 {name:"PWM average", tex:R`V_{avg} = D\,V_{supply},\ D = t_{on}/T`},
 {name:"Steps per rev", tex:R`N = 360^\circ/\theta_{step}`},
 {name:"Step delay", tex:R`t_{step} = \frac{60}{\text{rpm}\times N}`},
 {name:"Shunt", tex:R`I_A = \frac{V_{shunt}}{R_{shunt}},\ P = I^2R`},
 {name:"PI control", tex:R`u = K_pe + K_i\int e\,dt`}
],
questions: [
 {src:"Exam 2025 Q4(a)", see:[0], q:R`Explain why the H-bridge is necessary and why the ESP32 can't drive the motor directly.`,
  hint:"Direction, speed, voltage and current, protection.",
  sol:R`<p>The H-bridge lets logic-level inputs switch a higher-voltage supply across the motor; its output polarity follows the inputs, giving bidirectional control, and PWM on an input controls speed. It gives some (not complete) protection to the ESP32.</p>
  <p>Directly, the ESP32's logic voltage would be too low to drive the motor and the motor current far too high for its pins.</p>`,
  ans:"Bidirectional + PWM speed control; ESP32 can't supply the voltage/current", prov:"Follows the posted exam solution."},
 {src:"Exam 2025 Q4(b)", see:[0], q:R`What does the motor do when <code>motorBrake()</code> sets 1A and 2A both HIGH with the bridge enabled?`,
  hint:"Same voltage on both terminals.",
  sol:R`<p>Both outputs sit at the motor supply, effectively shorting the motor. Turning the shaft would generate an emf, which now drives a current that opposes the rotation, so the motor resists being turned: it brakes.</p>`,
  ans:"Motor shorted → dynamic braking", prov:"Follows the posted exam solution."},
 {src:"Exam 2026 Q4(b)", see:[3,4], q:R`A 1.8° bipolar stepper on an SN754410. Write code to (1) turn 20 steps clockwise, (2) stop for 2 s, (3) turn one rotation anti-clockwise at 1 rpm, (4) stop.`,
  hint:"200 steps/rev; at 1 rpm, 60 000 ms / 200 = 300 ms per step. Index the 4-step table with position mod 4.",
  sol:R`<p>200 steps per rotation. Delay per step at 1 rpm = 300 ms.</p>
<pre>void setup() {
  /* pin setup as given */
  rotate(+1, 20, 10);       // 20 steps CW, 10 ms/step
  delay(2000);
  rotate(-1, 200, 300);     // 1 rev CCW at 1 rpm
}
void loop() { }

void rotate(int dir, unsigned long steps, unsigned int ms) {
  for (unsigned long i = 0; i &lt; steps; i++) {
    position += dir;
    switch (((position % 4) + 4) % 4) {
      case 0: set_output_pins(1,0,1,0); break;  // A+ B+
      case 1: set_output_pins(0,1,1,0); break;  // A- B+
      case 2: set_output_pins(0,1,0,1); break;  // A- B-
      case 3: set_output_pins(1,0,0,1); break;  // A+ B-
    }
    delay(ms);
  }
}</pre>`,
  ans:"200 steps/rev, 300 ms/step at 1 rpm", prov:"Follows the posted exam solution, tidied by Claude: the posted loop steps by 'direction' and uses abs(position) % 4, which miscounts going anti-clockwise."},
 {src:"Exam 2025 Q4(c)", see:[4,1], q:R`A brushed motor with a 10-gap encoder (rising-edge interrupt) on an H-bridge. Outline code to: 1 turn CW; stop 2 s; 1 turn CW at about half speed; stop 2 s; 0.75 turn anti-clockwise; stop.`,
  hint:"PWM for speed, a direction variable in the ISR, CHANGE interrupts for 20 counts/rev, and a stage variable.",
  sol:R`<ul><li>Speed: <code>analogWrite</code> on 1A (CW) or 2A (CCW) with duty 250 then 125.</li>
  <li>Direction: global <code>direction</code> = ±1 set in <code>motorCW/motorCCW</code>, and <code>count += direction</code> in the ISR; reset <code>count</code> at each move.</li>
  <li>Resolution: 10 rising edges per rev can't give 0.75 rev (7.5). Use <code>CHANGE</code> ⇒ 20 interrupts/rev, so 0.75 rev = 15 counts.</li>
  <li><code>loop()</code> with <code>switch(stage)</code>: stage 1 wait for count ≥ 20 → brake, 2 s, CW at 125; stage 2 count ≥ 20 → brake, 2 s, CCW; stage 3 count ≤ −15 → brake.</li></ul>`,
  ans:"PWM + direction + CHANGE interrupts (20/rev) + stage machine", prov:"Follows the posted exam solution."}
],
traps: [
 "1A = 2A = HIGH is brake, not stop-and-coast. Disabling EN lets it coast.",
 "Speed comes from PWM duty, not from the H-bridge supply.",
 "Steps per rev = 360/1.8 = 200. Delay per step = 60 s ÷ (rpm × 200).",
 "Going backwards through the step table: don't use abs(position) % 4. Use ((position % 4) + 4) % 4.",
 "Keep ISRs short; no delays inside them."
]
});

T.topics.push({
id: "encoders", part: "Task 2: Motors", title: "Encoders, Interrupts & Signal Interfacing",
lectures: "Task 2 – DC Motor Control and Encoders", status: "lectured",
summary: "Incremental encoders (optical and Hall), quadrature signals and direction, 4× decoding and speed calculation, signal conditioning and noise immunity, and writing interrupt-driven encoder code on the ESP32.",
theory: R`
<h3>0. Incremental encoders</h3>
<p>They turn rotation into pulses and measure <b>change</b> in position (so they need homing at power-up). PPR = pulses per revolution per channel.</p>
<ul>
<li><b>Optical:</b> LED and detector through a slotted wheel (transmissive, very high resolution) or off a patterned disc (reflective, compact). Need a clean environment and precise alignment.</li>
<li><b>Magnetic / Hall:</b> a multipole magnet passes two Hall sensors 90° apart; comparators give digital outputs. Robust to dust, oil and vibration; long life.</li>
</ul>

<h3>1. Quadrature</h3>
<p>Two square waves A and B, 90° apart. If A leads B the shaft turns one way; if B leads A, the other. Check B's level on each rising edge of A. The pair cycles through four states (00, 01, 11, 10), so counting every edge on both channels gives <b>4 × PPR</b> counts per rev.</p>
$$\text{rpm} = \frac{\Delta C \times 60}{4\times\text{PPR}\times\Delta t}$$
<p>Short $\Delta t$: fast updates but noisy at low speed; long $\Delta t$: smooth but slow.</p>

<h3>2. Signal conditioning</h3>
<ul>
<li><b>Level matching:</b> divider from 5 V to ≤ 3.3 V (e.g. 2 kΩ / 3.3 kΩ ⇒ 3.1 V).</li>
<li><b>Noise immunity:</b> Schmitt triggers (hysteresis between rising and falling thresholds), RC low-pass ($f_c = 1/2\pi RC$, balanced against signal speed), pull-ups/pull-downs for open-collector outputs.</li>
<li><b>Protection</b> against ESD and overvoltage. Poor conditioning means damaged pins, miscounts and unreliable behaviour.</li>
</ul>

<h3>3. Interrupts on the ESP32</h3>
<ul>
<li>Interrupts only act when a pin changes, so no counts are missed even if <code>loop()</code> is busy (polling wastes time and misses edges).</li>
<li><code>attachInterrupt(digitalPinToInterrupt(pin), isr, CHANGE)</code>: <code>RISING</code> counts one edge per pulse; <code>CHANGE</code> counts both.</li>
<li>Variables changed in an ISR must be <code>volatile</code>; <code>IRAM_ATTR</code> puts the ISR in fast RAM.</li>
<li>Keep ISRs short: set a flag or update a counter; do timing in <code>loop()</code>.</li>
</ul>

<h3>4. Full 4× quadrature decoder</h3>
<p>Attach <code>CHANGE</code> interrupts to <b>both</b> A and B, and use the previous and current states (4 bits):</p>
<pre>volatile long position = 0;
volatile bool Aprev, Bprev;
void IRAM_ATTR encoderISR() {
  bool A = digitalRead(ENC_A), B = digitalRead(ENC_B);
  uint8_t s = (Aprev &lt;&lt; 3) | (Bprev &lt;&lt; 2) | (A &lt;&lt; 1) | B;
  if (s==0b1110 || s==0b0111 || s==0b0001 || s==0b1000) position++;  // CW
  if (s==0b1101 || s==0b0100 || s==0b0010 || s==0b1011) position--;  // CCW
  Aprev = A; Bprev = B;
}</pre>`,
formulas: [
 {name:"Counts per rev (4×)", tex:R`4\times\text{PPR}`},
 {name:"Speed", tex:R`\text{rpm} = \frac{60\,\Delta C}{4\,\text{PPR}\,\Delta t}`},
 {name:"RC filter", tex:R`f_c = \frac{1}{2\pi RC}`},
 {name:"Level divider", tex:R`V_{out} = V_{in}\frac{R_2}{R_1+R_2}`}
],
questions: [
 {src:"Exam 2026 Q3(c)", see:[3,4,1], q:R`The given code increments <code>position</code> on each RISING edge of channel A only. Adapt it so <code>position</code> increases clockwise and decreases anti-clockwise, with the highest possible resolution.`,
  hint:"Both channels, CHANGE, compare previous and current A/B states.",
  sol:R`<p>Store the previous A and B; attach <code>CHANGE</code> interrupts to <b>both</b> pins (the posted answer attaches A twice by mistake); in the ISR form the 4-bit code (Aprev Bprev A B), increment for the CW transitions and decrement for the CCW ones (see section 4). This counts all four edges per cycle: 4 × 8 = 32 counts per rev instead of 8.</p>`,
  ans:"4× decoding on both channels: 32 counts/rev", prov:"Follows the posted exam solution, with Claude's note on the duplicated attachInterrupt line."},
 {src:"Exam 2026 Q3(b)", see:[1], q:R`Sketch the encoder outputs $v_A$ and $v_B$ at constant speed (i) clockwise and (ii) anti-clockwise.`,
  hint:"Same square waves, but which leads swaps.",
  sol:R`<p>Two equal square waves offset by a quarter period. (i) A leads B by 90°. (ii) B leads A by 90°. (Which you call clockwise depends on the sensor placement; the point is that the lead swaps.)</p>`,
  ans:"Quadrature, lead swaps with direction", prov:"Worked by Claude; the posted solution is a sketch."},
 {src:"Practice (Claude)", see:[1], q:R`An 8-PPR encoder read in 4× mode counts 160 edges in 0.1 s. What is the shaft speed?`,
  hint:"Counts per rev = 32.",
  sol:R`<p>$\text{rpm} = \dfrac{160 \times 60}{32 \times 0.1} = 3000$ rpm.</p>`,
  ans:"3000 rpm", prov:"Worked by Claude."}
],
traps: [
 "4× resolution needs interrupts on BOTH channels with CHANGE.",
 "Variables shared with an ISR must be volatile.",
 "An incremental encoder doesn't know absolute position after power-up: it needs homing.",
 "Don't connect a 5 V output straight to an ESP32 pin."
]
});

T.topics.push({
id: "triacs", part: "Task 3: AC switching", title: "Thyristors, TRIACs & Zero-Crossing Phase Control",
lectures: "Not lectured yet: built from the 2025/2026 past papers and Task 3 component datasheets", status: "pending",
summary: "Thyristor operating modes, TRIACs and DIACs, firing angle, optocoupled TRIAC drivers (MOC30xx), zero-crossing detection (H11L1), resistor sizing, and phase-control code. Q5 on every past paper. Revisit when the Task 3 lectures are posted.",
theory: R`
<h3>0. Thyristor (SCR) modes</h3>
<ul>
<li><b>Reverse blocking:</b> reverse-biased like a diode; off, leakage only.</li>
<li><b>Forward blocking:</b> forward-biased but not yet triggered (no gate current); off.</li>
<li><b>Forward conducting:</b> triggered by a gate pulse; stays on, even with no gate signal, until the current falls below the <b>holding current</b> $I_H$.</li>
</ul>
<p><b>TRIAC</b>: conducts both ways, like two anti-parallel thyristors with one gate, so it can control both half-cycles of ac (preferred for ac motors and heaters). <b>DIAC</b>: a gateless TRIAC that conducts once its symmetric breakover voltage is reached.</p>

<h3>1. Phase control</h3>
<p>The <b>firing angle</b> α is measured from the zero crossing (0–180° each half-cycle). Firing later delivers less of each half-cycle to the load, so less average power. Delay in time: $t = \dfrac{\alpha}{360^\circ}\cdot\dfrac{1}{f}$, e.g. 90° at 50 Hz = 5 ms.</p>
<p>The load voltage jumps from 0 to the source voltage at firing, follows the source, then drops to 0 just before the zero crossing when the current falls below $I_H$.</p>

<h3>2. Optocoupled TRIAC driver (MOC3021/3031)</h3>
<ul>
<li>Isolates the logic side (ESP32) from mains, letting 3.3 V logic fire a high-voltage device.</li>
<li>Its small photo-TRIAC can't carry the load current, so it fires a power TRIAC (BT136) that does.</li>
<li>LED resistor: $R_1 = \dfrac{3.3 - V_F}{I_F}$ (≈ 35 Ω for 60 mA, $V_F$ = 1.2 V): use at least this to stay within $I_F$, while still giving enough trigger current.</li>
<li>Gate resistor $R_2 > V_{peak}/I_{TSM}$: e.g. $220\sqrt2/1\text{ A} = 311$ Ω, protecting the photo-TRIAC from turn-on surge.</li>
</ul>

<h3>3. Zero-crossing detection (H11L1 Schmitt optocoupler)</h3>
<ul>
<li>A <b>bridge rectifier</b> lets the single input LED light on both half-cycles (a pulse every 10 ms at 50 Hz) and protects it from 311 V reverse (rating 6 V).</li>
<li><b>Series resistor</b> sets the LED current between the turn-on threshold (1.6 mA) and the maximum (30 mA): $R \ge (311 - 1.2)/30\text{ mA} = 10.3$ kΩ; a 10 mA design gives 33 kΩ.</li>
<li><b>Decoupling capacitor</b> on the output-side supply gives clean switching edges.</li>
<li>The detector's edge often comes slightly before the true zero crossing; compensate in software.</li>
</ul>

<h3>4. Phase-control code</h3>
<pre>volatile bool zcFlag = false;
void IRAM_ATTR readZC_ISR() { zcFlag = true; }   // keep the ISR short
void loop() {
  if (zcFlag) {
    zcFlag = false;
    delayMicroseconds(ZC_COMPENSATION);                 // e.g. 1000 us
    delayMicroseconds(convert_phase_to_microsec(firingAngle, freq));
    digitalWrite(PIN_TRIAC, LOW);                         // fire (active low)
    delayMicroseconds(pulseWidth);
    digitalWrite(PIN_TRIAC, HIGH);
  }
}</pre>`,
formulas: [
 {name:"Firing delay", tex:R`t = \frac{\alpha}{360^\circ f}`},
 {name:"LED resistor", tex:R`R = \frac{V_{supply} - V_F}{I_F}`},
 {name:"Surge resistor", tex:R`R_2 > \frac{V_{peak}}{I_{TSM}}`},
 {name:"Mains peak", tex:R`V_{peak} = \sqrt2V_{rms}`}
],
questions: [
 {src:"Exam 2025 Q5(a)", see:[0], q:R`Outline the three operating modes of a thyristor; the differences between a thyristor, TRIAC and DIAC; and why a TRIAC is preferred for controlling an ac motor.`,
  hint:"Two blocking modes and one conducting; one-way vs two-way.",
  sol:R`<p>Reverse blocking (off, leakage only); forward blocking (forward biased but not triggered, off); forward conducting (triggered, stays on until current &lt; holding current).</p>
  <p>Thyristor conducts one way; TRIAC both ways (≈ two anti-parallel thyristors, one gate); DIAC is a gateless TRIAC that conducts at its breakover voltage.</p>
  <p>A TRIAC can conduct in both half-cycles of the ac supply.</p>`,
  ans:"See modes; TRIAC = bidirectional", prov:"Follows the posted exam solution."},
 {src:"Exam 2026 Q5(a)", see:[3], q:R`In the zero-crossing circuit, explain the purpose of the four diodes, R1 and C1, and size R1 for 220 V rms mains (H11L1: $V_F$ = 1.2 V, $V_R$ = 6 V max, $I_{F(on)}$ = 1.6 mA, $I_F$ = 30 mA max).`,
  hint:"Worst-case current is at the mains peak, 311 V.",
  sol:R`<p>Diodes: bridge rectifier, so the LED lights on both half-cycles (pulse every 10 ms) and never sees 311 V reverse.</p>
  <p>R1: limits LED current between 1.6 and 30 mA. C1: decouples the output-side supply for clean edges.</p>
  <p>$R_1 \ge (311 - 1.2)/0.03 = 10.3$ kΩ. Designing for 10 mA: 30.8 kΩ ⇒ 33 kΩ (peak 9.3 mA).</p>`,
  ans:"R1 = 33 kΩ (≥ 10.3 kΩ)", prov:"Follows the posted exam solution."},
 {src:"Exam 2026 Q5(b)", see:[1,2], q:R`Why are both the MOC3021M and the BT136 needed? From $v_{load}$, explain the jump at 5 ms and the drop at 9.5 ms, and find the load current just before 9.5 ms (BT136 $I_H$ = 2.2 mA).`,
  hint:"Isolation vs current capacity; a TRIAC switches off at its holding current.",
  sol:R`<p>The MOC3021M isolates the ESP32 from mains and fires the TRIAC; the BT136 carries the load current, which the MOC's small photo-TRIAC can't.</p>
  <p>5 ms: firing pulse (90°), the TRIAC switches on and $v_{load}$ jumps to the source voltage.</p>
  <p>9.5 ms: current falls below $I_H$ and the TRIAC turns off. Current just before = $I_H$ = <b>2.2 mA</b>.</p>`,
  ans:"I = I_H = 2.2 mA", prov:"Follows the posted exam solution."},
 {src:"Exam 2025 Q5(b)", see:[2], q:R`An MOC3031M drives a TRIAC on 220 V rms, 50 Hz from a 3.3 V ESP32 pin ($I_F$ = 60 mA, $V_F$ ≈ 1.15–1.2 V, $I_{TSM}$ = 1 A). Explain the MOC3031M's purpose and size R1 (LED) and R2 (gate).`,
  hint:"R1 from the LED loop; R2 from peak mains over surge current.",
  sol:R`<p>The MOC3031M isolates the logic side from mains and lets logic levels control the high-voltage TRIAC.</p>
  <p>$R_1 = (3.3 - 1.2)/0.06 \approx 35$ Ω (the minimum to keep within 60 mA).</p>
  <p>$R_2 > 220\sqrt2/1 = 311$ Ω.</p>`,
  ans:"R1 ≈ 35 Ω; R2 > 311 Ω", prov:"Follows the posted solutions. The 2025 paper writes 'R1 < 47 Ω'; staying within I_F actually needs R1 ≥ 35 Ω, which is how the sample paper treats it."},
 {src:"Exam 2026 Q5(c)", see:[4,3], q:R`The phase-control code puts the firing delay inside the zero-crossing ISR and ignores the fact that the detector's edge arrives 1 ms before the true zero crossing. Fix both.`,
  hint:"Flag in ISR, timing in loop, add 1 ms.",
  sol:R`<p>Issue 1: the 1 ms early edge isn't compensated ⇒ add a 1000 µs delay before the firing delay.</p>
  <p>Issue 2: long blocking delays inside an ISR ⇒ ISR just sets <code>zcFlag</code>; do the timing in <code>loop()</code> (see section 4).</p>`,
  ans:"Compensate 1 ms; move timing out of the ISR", prov:"Follows the posted exam solution."}
],
traps: [
 "A thyristor/TRIAC stays on after the gate pulse until the current drops below the HOLDING current.",
 "Worst-case LED current is at the mains PEAK: 220 V rms × √2 = 311 V.",
 "A bridge rectifier gives a zero-crossing pulse every 10 ms at 50 Hz (twice per cycle).",
 "No long delays inside an ISR.",
 "Firing angle is measured from the zero crossing: 90° at 50 Hz = 5 ms."
]
});
})();
