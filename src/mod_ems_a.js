/* EEN1029 Electromechanical Systems — background, Task 1 (inductors and transformers) */
(function(){
const R = String.raw;
const T = STUDY.content.ems = STUDY.content.ems || { topics: [] };

T.topics.push({
id: "acpower", part: "Background & signal conditioning", title: "Phasors, Impedance & AC Power",
lectures: "Phasors and AC Power; Task 1 – Inductor Measurements; Background Notes – Complex Numbers", status: "lectured",
summary: "Sinusoids as phasors, adding waveforms with complex numbers, impedance of R, L and C, leading/lagging, and real, reactive and apparent power with the power triangle. Measuring them all with a two-channel scope. This is Q1 on every past paper.",
theory: R`
<h3>0. Sinusoids</h3>
$$v(t) = V_m\cos(\omega t + \theta),\qquad \omega = 2\pi f,\quad \omega T = 2\pi,\quad f = 1/T$$
<p>The <b>rms</b> value is the dc-equivalent for power in a resistor: $V = V_{rms} = V_m/\sqrt2$. From a peak-to-peak reading: $V_{rms} = V_{pp}/(2\sqrt2)$.</p>

<h3>1. Phasors</h3>
<p>A phasor is a rotating vector frozen at $t=0$: magnitude and phase only. It works for waveforms of the <b>same frequency</b>. To add sinusoids:</p>
<ol class="steps">
<li>Write everything as cosines: $\sin\omega t = \cos(\omega t - 90^\circ)$.</li>
<li>Write each as $V_m\angle\theta$ (i.e. $\text{Re}[V_me^{j(\omega t + \theta)}]$ with $e^{j\omega t}$ dropped).</li>
<li>Convert to rectangular, add, convert back.</li>
</ol>
<p>Lecture example: $10\cos\omega t + 5\sin(\omega t + 60^\circ) + 5\cos(\omega t + 90^\circ) = 10\angle0^\circ + 5\angle{-30^\circ} + 5\angle90^\circ$</p>
<p>$= 10 + (4.33 - j2.5) + j5 = 14.33 + j2.5 = 14.54\angle9.90^\circ$, i.e. $14.54\cos(\omega t + 9.90^\circ)$.</p>

<h3>2. Impedance</h3>
$$Z = R + jX,\qquad \mathbf V = Z\mathbf I\ \text{(Ohm's law in phasor form)}$$
<div class="tbl"><table class="data">
<tr><th>Load</th><th>Impedance</th><th>Phase</th><th>Current</th></tr>
<tr><td>Resistor</td><td>$R$</td><td>$\theta = 0^\circ$</td><td>In phase</td></tr>
<tr><td>Inductor</td><td>$j\omega L$, $X_L = 2\pi fL$</td><td>$\theta = 90^\circ$ (V ahead)</td><td><b>Lags</b> voltage</td></tr>
<tr><td>Capacitor</td><td>$-j/\omega C$, $X_C = 1/2\pi fC$</td><td>$\theta = -90^\circ$</td><td><b>Leads</b> voltage</td></tr>
</table></div>
<p>Memory aid: <b>ELI the ICE man</b>: in L, E (voltage) before I; in C, I before E. $X_L$ grows with frequency; $X_C$ falls with frequency; $L$ and $C$ themselves don't change with frequency. For series R and X: $|Z| = \sqrt{R^2 + X^2}$, $R = |Z|\cos\theta$, $X = |Z|\sin\theta$.</p>

<h3>3. Power</h3>
<p>Instantaneous power $p(t) = v(t)i(t)$. Its mean over a cycle is the <b>real power</b>.</p>
<div class="tbl"><table class="data">
<tr><th>Quantity</th><th>Formula</th><th>Unit</th></tr>
<tr><td>Apparent power $S$</td><td>$V_{rms}I_{rms}$</td><td>VA</td></tr>
<tr><td>Real power $P$</td><td>$S\cos\theta = \langle v(t)i(t)\rangle$</td><td>W</td></tr>
<tr><td>Reactive power $Q$</td><td>$S\sin\theta = I_{rms}^2X$</td><td>var</td></tr>
<tr><td>Power factor</td><td>$P/S = \cos\theta$</td><td>–</td></tr>
<tr><td>Power angle $\theta$</td><td>$\cos^{-1}(P/S)$ = phase of V relative to I</td><td>°</td></tr>
</table></div>
<p>The <b>power triangle</b>: $P$ horizontal, $Q$ vertical, $S$ the hypotenuse at angle $\theta$, so $S = \sqrt{P^2 + Q^2}$. Reactive power is energy stored and returned each cycle; a low power factor means lots of current for little useful power.</p>

<h3>4. Reading θ from a scope plot</h3>
$$\theta = \frac{\Delta t}{T}\times360^\circ$$
<p>where $\Delta t$ is how far the current peak trails the voltage peak (positive = current lags = inductive). Current peaking first = leading = capacitive, $\theta$ negative.</p>

<h3>5. Measuring with a two-channel scope (Task 1 Part A)</h3>
<p>Ch1 across a known series resistor $R_1$ gives the current; Ch2 across the inductor (or load) gives its voltage:</p>
$$I = \frac{V_{rms,Ch1}}{R_1},\quad S = \frac{V_{rms,Ch1}V_{rms,Ch2}}{R_1},\quad P = \frac{\langle v_{Ch1}(t)v_{Ch2}(t)\rangle}{R_1},\quad \cos\theta = \frac{\langle v_{Ch1}v_{Ch2}\rangle}{V_{rms,Ch1}V_{rms,Ch2}}$$
<p>Then $Q = I^2X_L = I^2\omega L$ gives $L = \dfrac{Q}{I^2\omega}$, or equivalently $L = \dfrac{V_{rms,Ch2}R_1\sin\theta}{V_{rms,Ch1}\omega}$. Lecture example: $\langle v_1v_2\rangle = 0.021$ V², $V_1V_2 = 0.0387$ V² ⇒ pf = 0.543.</p>`,
formulas: [
 {name:"RMS", tex:R`V_{rms} = \frac{V_m}{\sqrt2} = \frac{V_{pp}}{2\sqrt2}`},
 {name:"Reactances", tex:R`X_L = 2\pi fL,\quad X_C = \frac{1}{2\pi fC}`},
 {name:"Power angle from scope", tex:R`\theta = \frac{\Delta t}{T}\,360^\circ`},
 {name:"Apparent / real / reactive", tex:R`S = VI,\ P = S\cos\theta,\ Q = S\sin\theta`},
 {name:"Power triangle", tex:R`S^2 = P^2 + Q^2`},
 {name:"Reactive power", tex:R`Q = I^2X`},
 {name:"Real power (scope)", tex:R`P = \langle v(t)\,i(t)\rangle`},
 {name:"Series R–X", tex:R`|Z| = \frac{V}{I} = \sqrt{R^2+X^2},\ X = |Z|\sin\theta`}
],
questions: [
 {src:"Exam 2025 Q1(b)", see:[4,3,2], q:R`A resistor $R$ in series with an inductor $L$ is fed from 7.07 V rms at 50 Hz. The scope shows $V_{pp} = 20$ V and $I_{pp} = 200$ mA, with the current peak 2.5 ms after the voltage peak. Find the power angle, $S$, $P$, $Q$, the reactance and the inductance.`,
  hint:"θ = (2.5/20)·360°. rms values from p-p. Then Q = I²X and X = ωL.",
  sol:R`<p>$\theta = \dfrac{2.5}{20}360^\circ = 45^\circ$ (current lags: inductive).</p>
  <p>$V = 20/(2\sqrt2) = 7.07$ V, $I = 0.2/(2\sqrt2) = 70.7$ mA, $S = 0.500$ VA.</p>
  <p>$P = 0.5\cos45^\circ = 0.354$ W; $Q = 0.5\sin45^\circ = 0.354$ var.</p>
  <p>$X = Q/I^2 = 0.354/0.0707^2 = 70.8$ Ω; $L = X/2\pi f = 70.8/314.2 = 225$ mH.</p>`,
  ans:"45°, 0.5 VA, 0.354 W, 0.354 var, 70.8 Ω, 225 mH", prov:"Follows the posted exam solution."},
 {src:"Exam 2025 Q1(c)", see:[2], q:R`For the same circuit, what happens to (i) the inductance and (ii) the reactance if the frequency goes from 50 Hz to 500 Hz?`,
  hint:"Which one has f in its formula?",
  sol:R`<p>(i) $L$ is a property of the coil: <b>unchanged</b>.</p><p>(ii) $X = 2\pi fL$: increases 10×, to about 708 Ω.</p>`,
  ans:"L unchanged; X ×10", prov:"Follows the posted exam solution."},
 {src:"Exam 2026 Q1(b)", see:[4,2], q:R`$R$ in series with unknown component $x$, 7.07 V rms at 50 Hz, $V_{pp} = 20$ V, $I_{pp} = 200$ mA. The voltage peaks 2.5 ms <i>after</i> the current. Is $x$ capacitive or inductive? Find the power angle, impedance and reactance.`,
  hint:"Current peaking first = current leads.",
  sol:R`<p>Current leads ⇒ <b>capacitive</b>. $\theta = -\dfrac{2.5}{20}360^\circ = -45^\circ$.</p>
  <p>$|Z| = V_m/I_m = 10/0.1 = 100$ Ω.</p>
  <p>$X_C = |Z|\sin\theta = 100\sin(-45^\circ) = -70.7$ Ω (and $R = 70.7$ Ω).</p>`,
  ans:"Capacitive; −45°; 100 Ω; −70.7 Ω", prov:"Follows the posted exam solution."},
 {src:"Exam 2026 Q1(c)", see:[2], q:R`For that RC circuit, predict how doubling the frequency to 100 Hz changes (i) the impedance and (ii) the reactance.`,
  hint:"X_C ∝ 1/f; R doesn't change.",
  sol:R`<p>$X_C$ halves: 70.7 → 35.4 Ω. $R$ stays 70.7 Ω.</p>
  <p>$|Z| = \sqrt{70.7^2 + 35.4^2} = 79.0$ Ω: it falls, but by less than the reactance does.</p>`,
  ans:"X: 70.7 → 35.4 Ω; Z: 100 → 79 Ω", prov:"Follows the posted exam solution."},
 {src:"Lecture example (phasors)", see:[1], q:R`Express $v(t) = 10\cos\omega t + 5\sin(\omega t + 60^\circ) + 5\cos(\omega t + 90^\circ)$ as a single sinusoid.`,
  hint:"Convert the sine to a cosine first (subtract 90°).",
  sol:R`<p>$5\sin(\omega t + 60^\circ) = 5\cos(\omega t - 30^\circ)$.</p>
  <p>$10 + (4.33 - j2.5) + j5 = 14.33 + j2.5 = 14.54\angle9.90^\circ$</p>
  <p>$v(t) = 14.54\cos(\omega t + 9.90^\circ)$</p>`,
  ans:"14.54 cos(ωt + 9.90°)", prov:"From the worked example in the Phasors and AC Power lecture."},
 {src:"Exam 2025 Q1(a)", see:[3], q:R`Sketch the power triangle and explain the difference between instantaneous power and real power, with a formula linking them.`,
  hint:"One is a value at an instant; the other is a mean.",
  sol:R`<p>Triangle: $P = S\cos\theta$ horizontal, $Q = S\sin\theta$ vertical, $S = \sqrt{P^2+Q^2}$ hypotenuse, $\theta$ between $P$ and $S$.</p>
  <p>Instantaneous power $p(t) = v(t)i(t)$ at one moment; real power is its mean over a cycle: $P = \langle p(t)\rangle$.</p>`,
  ans:"P = ⟨v(t)i(t)⟩", prov:"Follows the posted exam solution."}
],
traps: [
 "Convert peak-to-peak to rms by dividing by 2√2, not √2.",
 "Sign of θ: current lagging (inductive) = positive; current leading (capacitive) = negative.",
 "Inductance and capacitance don't change with frequency; reactances do (X_L ∝ f, X_C ∝ 1/f).",
 "Reactive power unit is var, apparent power VA, real power W. Marks are given for units.",
 "Phasors only add for sinusoids of the same frequency. Convert sines to cosines first."
]
});

T.topics.push({
id: "sigcond", part: "Background & signal conditioning", title: "Op-Amps & Signal Conditioning for the ESP32",
lectures: "Background Notes – Operational Amplifiers, Overview of Amplifiers; scope front-end exam questions", status: "lectured",
summary: "Ideal op-amp rules and the standard circuits, then the exam's favourite design: scaling, offsetting and buffering a ±V signal into the ESP32's 0–3.3 V input without clipping or loading.",
theory: R`
<h3>0. Ideal op-amp rules</h3>
<ul>
<li>Infinite open-loop gain: with negative feedback, $V_+ = V_-$.</li>
<li>Infinite input impedance: no current flows into the inputs.</li>
</ul>
<div class="tbl"><table class="data">
<tr><th>Circuit</th><th>Output</th></tr>
<tr><td>Non-inverting</td><td>$V_{out} = \left(1 + \dfrac{R_1}{R_2}\right)V_{in}$</td></tr>
<tr><td>Inverting</td><td>$V_{out} = -\dfrac{R_2}{R_1}V_{in}$</td></tr>
<tr><td>Differential (equal ratios)</td><td>$V_{out} = \dfrac{R_2}{R_1}(V_1 - V_2)$</td></tr>
<tr><td>Inverting summer</td><td>$V_{out} = -(V_1 + V_2)$ (equal resistors)</td></tr>
<tr><td>Voltage follower</td><td>$V_{out} = V_{in}$ (buffer: high $Z_{in}$, low $Z_{out}$)</td></tr>
<tr><td>Integrator</td><td>$V_{out} = -\dfrac{1}{RC}\int V_{in}\,dt$</td></tr>
<tr><td>Differentiator</td><td>$V_{out} = -RC\dfrac{dV_{in}}{dt}$</td></tr>
</table></div>

<h3>1. Design requirements and objectives</h3>
<p><b>Requirement:</b> for the full input range (e.g. ±20 V), the output must stay within the ESP32's 0–3.3 V.</p>
<p><b>Objectives:</b> keep the signal linear over the full range; add as little noise as possible; load the measurand as little as possible.</p>

<h3>2. The standard front-end</h3>
<ol class="steps">
<li><b>Scale</b> with a divider $R_1$–$R_2$: $v_{scale} = v_{in}\dfrac{R_2}{R_1+R_2}$. $R_1$ is large (1 MΩ) to give high input impedance.</li>
<li><b>Offset</b> to mid-rail with a second divider from 5 V ($R_3$–$R_4$): $v_{OS} = 5\dfrac{R_4}{R_3+R_4} \approx 1.65$ V, so a bipolar signal sits between 0 and 3.3 V.</li>
<li><b>Buffer</b> with a rail-to-rail op-amp powered from 0 and 3.3 V: unity gain, very high input impedance (little loading), and its output physically can't leave 0–3.3 V, which protects the pin.</li>
<li>A second op-amp as a voltage follower can provide a stiff 3.3 V reference rail.</li>
</ol>

<h3>3. Diagnosing clipping</h3>
<ul>
<li>Clipped equally top and bottom ⇒ bias right, <b>scaling</b> wrong: shrink the divider ratio (change $R_2$, keep $R_1$ big).</li>
<li>Clipped only at the top (or bottom) ⇒ <b>offset</b> wrong: fix the $R_3$–$R_4$ divider.</li>
<li>Check both extremes: $0 < v_{scale,min} + v_{OS}$ and $v_{scale,max} + v_{OS} < 3.3$ V.</li>
</ul>

<h3>4. Simple logic-level shifting</h3>
<p>A 5 V digital signal (encoder, Hall sensor) into a 3.3 V pin needs only a divider: $V_{out} = V_{in}\dfrac{R_2}{R_1+R_2}$ with ratio ≤ 0.66. E.g. 1.8 kΩ / 3.3 kΩ ⇒ 3.24 V; 2 kΩ / 3.3 kΩ ⇒ 3.1 V. Current ≈ 1 mA: negligible power, but big enough that pin leakage doesn't upset it.</p>`,
formulas: [
 {name:"Golden rules", tex:R`V_+ = V_-,\quad I_{in} = 0`},
 {name:"Non-inverting", tex:R`\frac{V_{out}}{V_{in}} = 1 + \frac{R_1}{R_2}`},
 {name:"Inverting", tex:R`\frac{V_{out}}{V_{in}} = -\frac{R_2}{R_1}`},
 {name:"Divider", tex:R`V_{out} = V_{in}\frac{R_2}{R_1+R_2}`},
 {name:"Scaling condition", tex:R`\frac{R_1+R_2}{R_2} \ge \frac{V_{in,pp}}{3.3\text{ V}}`}
],
questions: [
 {src:"Exam 2025 Q3(c)", see:[2,3], q:R`A scope front-end feeds a ±20 V measurand to an ESP32 (0–3.3 V) via a divider $R_1 = 1$ MΩ, $R_2$, a 1.65 V offset and a rail-to-rail buffer. The output is a correctly-centred sine clipped equally at 0 V and 3.3 V. Diagnose and redesign.`,
  hint:"Equal clipping top and bottom means the bias is fine and the gain is too high.",
  sol:R`<p>The output stays in range (requirement met) but is clipped, so linearity (an objective) fails. Equal clipping ⇒ offset fine, <b>scaling</b> wrong.</p>
  <p>Keep $R_1 = 1$ MΩ (high input impedance) and pick $R_2$ so 40 V p-p becomes ≤ 3.3 V p-p:</p>
  <p>$\dfrac{R_1 + R_2}{R_2} \ge \dfrac{40}{3.3} \Rightarrow R_2 \le \dfrac{1\text{ MΩ}}{40/3.3 - 1} = 89.9$ kΩ</p>
  <p>Use 88.7 kΩ or 82 kΩ; everything else unchanged.</p>`,
  ans:"R₂ ≤ 89.9 kΩ (e.g. 82 kΩ)", prov:"Follows the posted exam solution."},
 {src:"Sample 2025 Q3(c)", see:[2,3], q:R`Same front-end for ±50 V with $R_1 = 1$ MΩ, $R_2 = 30$ kΩ, offset divider $R_3$–$R_4$ (with $R_4 = 2$ kΩ) from 5 V. The output runs from about 1 V and is clipped at 3.3 V on top only. Find what's wrong and fix it.`,
  hint:"Clipping on one side only points at the offset.",
  sol:R`<p>Scaling: $\pm50 \times \dfrac{30k}{1.03M} = \pm1.45$ V, which fits a 3.3 V span. Clipping only at the top ⇒ the offset is too high.</p>
  <p>Target $v_{OS} = 1.65$ V: $R_3 = (5/1.65 - 1)(2\text{ kΩ}) = 4.06$ kΩ ⇒ use 4 kΩ, giving 1.67 V.</p>
  <p>Check: $1.67 + 1.45 = 3.12$ V < 3.3 V and $1.67 - 1.45 = 0.22$ V > 0 V ✓.</p>`,
  ans:"R₃ ≈ 4 kΩ (offset 1.67 V)", prov:"Follows the posted sample-paper solution."},
 {src:"Exam 2025 Q3(b)", see:[2], q:R`In the front-end, OpAmp_A is a voltage follower on a 3.3 V reference whose output powers OpAmp_B; OpAmp_B is a unity-gain buffer on the signal path. Explain each one's purpose.`,
  hint:"Think about loading and about what a rail-to-rail op-amp can output.",
  sol:R`<p><b>OpAmp_A:</b> a buffered, stiff 3.3 V supply for OpAmp_B's positive rail, unaffected by loading.</p>
  <p><b>OpAmp_B:</b> very high input impedance, so the circuit hardly loads the measurand; and being rail-to-rail on 0/3.3 V rails, its output is clamped to 0–3.3 V, protecting the ESP32 pin.</p>`,
  ans:"Reference buffer; signal buffer + clamp", prov:"Follows the posted exam solution."},
 {src:"Exam 2026 Q3(a)", see:[4], q:R`A Hall-effect encoder outputs 0–5 V into ESP32 pins rated 0–3.3 V via $R_1$ (series) and $R_2$ (to ground). Explain their purpose and choose values.`,
  hint:"Ratio R₂/(R₁+R₂) ≤ 0.66 using standard values.",
  sol:R`<p>They form a divider that linearly attenuates the 5 V logic level to ≤ 3.3 V (shape, frequency and phase unchanged), so the pin's absolute maximum isn't exceeded.</p>
  <p>$R_1 = 1.8$ kΩ, $R_2 = 3.3$ kΩ: $5 \times \dfrac{3.3}{5.1} = 3.24$ V. Current ≈ 1 mA.</p>`,
  ans:"1.8 kΩ / 3.3 kΩ → 3.24 V", prov:"Follows the posted exam solution."}
],
traps: [
 "Change R₂, not R₁: R₁ sets the input impedance and should stay large.",
 "Equal top/bottom clipping = scale problem; one-sided clipping = offset problem.",
 "Always check both extremes after a redesign (max and min input).",
 "Divider ratio is R₂/(R₁+R₂) with R₂ the resistor to ground.",
 "A rail-to-rail buffer protects the pin but doesn't fix clipping: the signal is still distorted."
]
});

T.topics.push({
id: "magnetics", part: "Task 1: Inductors & transformers", title: "Magnetism, Inductance & Magnetic Circuits",
lectures: "Task 1 – Inductance and Ideal Transformers; Task 1 Supporting Notes", status: "lectured",
summary: "Flux and flux density, the field of a wire and a solenoid, flux linkage and Faraday's law, inductance, B and H, permeability, saturation and hysteresis, and magnetic circuits with reluctance (including air gaps).",
theory: R`
<h3>0. Flux and fields</h3>
<p>Magnetic flux through a surface: $\Phi = \iint B\cdot dA$ (Wb), so $B$ (T) is the <b>flux density</b>. Flux lines run from north to south and form closed loops.</p>
<ul>
<li>Long straight wire (Biot–Savart): $B = \dfrac{\mu_0}{4\pi}\dfrac{2I}{r}$; direction by the right-hand rule.</li>
<li>Solenoid: $B = \mu_0 NI$ per unit length (field proportional to turns × current).</li>
</ul>

<h3>1. Faraday and inductance</h3>
<p>Flux linkage $\lambda = N\Phi$. A changing flux induces an emf:</p>
$$e = N\frac{d\Phi}{dt}$$
<p>Inductance is flux linkage per amp: $L = \lambda/i$, so $e = L\dfrac{di}{dt}$. Unit: henry (H). A conductor moving through a field also has an emf $e = Blu$ (used for motors).</p>

<h3>2. B, H and permeability</h3>
<p>$H$ (A/m) is set by the currents alone; $B$ also includes the material's magnetisation:</p>
$$B = \mu H = \mu_0\mu_rH,\qquad \mu_0 = 4\pi\times10^{-7}\text{ H/m}$$
<p>Ampère's circuital law: $\oint H\cdot dl = \sum i$, which for a uniform path becomes $Hl = Ni$.</p>
<ul>
<li>Ferromagnetic: $\mu \gg \mu_0$ (iron, ferrite). Paramagnetic: slightly above $\mu_0$. Diamagnetic: slightly below.</li>
<li>Above the <b>Curie temperature</b> a ferromagnet becomes merely paramagnetic.</li>
</ul>

<h3>3. Saturation and hysteresis</h3>
<p>$B$–$H$ is non-linear. Once all domains are aligned the core <b>saturates</b> (iron: about 1–2 T) and $B$ only grows as if $\mu_r = 1$. Cycling $H$ traces a <b>hysteresis loop</b>: when $H$ returns to zero a residual $B$ remains (the core "remembers"). The area inside the loop is energy turned into heat per cycle, so hysteresis loss ∝ frequency.</p>

<h3>4. Magnetic circuits</h3>
<p>Treat the core like a circuit:</p>
<div class="tbl"><table class="data">
<tr><th>Magnetic</th><th>Electrical analogue</th></tr>
<tr><td>mmf $\mathcal F = Ni$ (A·turns)</td><td>voltage source</td></tr>
<tr><td>flux $\Phi$</td><td>current</td></tr>
<tr><td>reluctance $\mathcal R = \dfrac{l}{\mu A}$</td><td>resistance $R = \dfrac{l}{\sigma A}$</td></tr>
<tr><td>$\mathcal F = \Phi\mathcal R$</td><td>Ohm's law</td></tr>
</table></div>
<p>Series reluctances add; mmfs round a loop sum to zero; flux in = flux out at a junction.</p>
$$L = \frac{N^2}{\mathcal R_c + \mathcal R_g},\qquad \mathcal R_g = \frac{l_g}{\mu_0A_g}$$
<p>An <b>air gap</b> dominates the total reluctance. It lowers $L$, raises the saturation current $I_{sat} = \dfrac{B_{sat}A_c(\mathcal R_c + \mathcal R_g)}{N}$, and makes $L$ much less sensitive to the core's permeability.</p>`,
formulas: [
 {name:"Flux", tex:R`\Phi = \iint B\cdot dA \approx BA`},
 {name:"Faraday", tex:R`e = N\frac{d\Phi}{dt} = L\frac{di}{dt}`},
 {name:"Inductance", tex:R`L = \frac{N\Phi}{i} = \frac{N^2}{\mathcal R}`},
 {name:"B–H", tex:R`B = \mu_0\mu_rH`},
 {name:"Ampère", tex:R`Hl = Ni`},
 {name:"Reluctance", tex:R`\mathcal R = \frac{l}{\mu A}`},
 {name:"Magnetic Ohm's law", tex:R`Ni = \Phi(\mathcal R_c + \mathcal R_g)`}
],
questions: [
 {src:"Practice (Claude)", see:[4], q:R`A ferrite core has mean path 0.1 m, area $1\ \text{cm}^2$ and $\mu_r = 2000$, with a 1 mm air gap. With 100 turns, find the core and gap reluctances and the inductance. What would $L$ be with no gap?`,
  hint:"R = l/(μA) for each part; L = N²/R_total.",
  sol:R`<p>$\mathcal R_c = \dfrac{0.1}{2000(4\pi\times10^{-7})(10^{-4})} = 3.98\times10^5$ A/Wb</p>
  <p>$\mathcal R_g = \dfrac{10^{-3}}{(4\pi\times10^{-7})(10^{-4})} = 7.96\times10^6$ A/Wb (20× the core)</p>
  <p>$L = \dfrac{100^2}{8.36\times10^6} = 1.20$ mH. Without the gap: $L = 10^4/3.98\times10^5 = 25$ mH.</p>`,
  ans:"R_c ≈ 0.40 MA/Wb, R_g ≈ 7.96 MA/Wb, L ≈ 1.2 mH (25 mH ungapped)", prov:"Worked by Claude to practise the magnetic-circuit method. Not from your course files."},
 {src:"Practice (Claude)", see:[3], q:R`Why does the hysteresis loss of a core rise with frequency, and why does a gapped core saturate at a higher current?`,
  hint:"Loss per cycle vs cycles per second; I_sat formula.",
  sol:R`<p>Each trip round the loop turns a fixed energy (the loop area × volume) into heat, so power = energy per cycle × cycles per second ∝ $f$.</p>
  <p>$I_{sat} = \dfrac{B_{sat}A_c(\mathcal R_c + \mathcal R_g)}{N}$: the gap adds a large reluctance, so more current is needed to drive the core flux up to $B_{sat}$.</p>`,
  ans:"Loss ∝ f; gap raises total reluctance", prov:"Worked by Claude from the Task 1 supporting notes."}
],
traps: [
 "L = N²/R: inductance scales with turns SQUARED.",
 "An air gap usually dominates the reluctance even if it's tiny, because μ₀ ≪ μ_core.",
 "H depends only on the currents; B also depends on the material.",
 "Saturation happens around 1–2 T for iron: beyond it μ_r effectively drops to 1."
]
});

T.topics.push({
id: "transformers", part: "Task 1: Inductors & transformers", title: "Ideal & Real Transformers: No-Load and Short-Circuit Tests",
lectures: "Task 1 – Inductance and Ideal Transformers; Supporting Notes §3.3–3.12", status: "lectured",
summary: "Mutual inductance and the dot convention, ideal transformer voltage, current and impedance ratios, the real transformer model, core and copper losses, laminations, and the two tests (with a two-channel scope) that measure the model. Q2 on every past paper.",
theory: R`
<h3>0. Mutual inductance</h3>
<p>Two coils on one core share flux. The self-terms are $\lambda_{11} = L_1i_1$, $\lambda_{22} = L_2i_2$; the shared terms are $\lambda_{12} = Mi_2$, $\lambda_{21} = Mi_1$, so $\lambda_1 = L_1i_1 \pm Mi_2$. The <b>dot convention</b> sets the sign: currents into both dotted ends make the fluxes add.</p>

<h3>1. The ideal transformer</h3>
<p>Same flux through both windings (Faraday) and zero net mmf (infinite permeability):</p>
$$\frac{v_p}{v_s} = \frac{N_p}{N_s},\qquad \frac{i_p}{i_s} = \frac{N_s}{N_p},\qquad p_{in} = p_{out}$$
<p>$N_p > N_s$: step-down; $N_p < N_s$: step-up. Turns ratio $n = N_s/N_p$.</p>
<p><b>Reflecting impedance:</b> a load $Z_L$ on the secondary looks like</p>
$$Z_L' = \left(\frac{N_1}{N_2}\right)^2Z_L$$
<p>from the primary. E.g. $N_1 = 50$, $N_2 = 100$, 100 Ω load ⇒ 25 Ω seen at the primary.</p>

<h3>2. The real transformer model</h3>
<p>Series branches $R_1$, $L_1$ (primary) and $R_2$, $L_2$ (secondary) around a shunt branch $L_M \parallel R_C$, then an ideal transformer.</p>
<div class="tbl"><table class="data">
<tr><th>Element</th><th>Represents</th></tr>
<tr><td>$R_1$, $R_2$</td><td>Copper (winding) resistance: $I^2R$ "copper losses"</td></tr>
<tr><td>$L_1$, $L_2$</td><td><b>Leakage</b> flux that links only one winding; energy stored and returned each cycle</td></tr>
<tr><td>$L_M$</td><td><b>Magnetising</b> inductance: finite core permeability (non-zero reluctance) needs a magnetising current $I_M$ to set up the flux; $L_M = N_1^2/\mathcal R$</td></tr>
<tr><td>$R_C$</td><td><b>Core loss</b>: hysteresis (loop area × f) and eddy currents (induced circulating currents heating the core)</td></tr>
</table></div>
<p><b>Laminations</b>: thin iron sheets insulated from each other, oriented so the induced emfs are across the insulation. That breaks up eddy-current paths and cuts the $R_C$ losses. Skin effect at high frequency also raises winding resistance.</p>

<h3>3. No-load (open-circuit) test → $R_C$, $L_M$</h3>
<p>Secondary open, rated voltage on the primary. Only the shunt branch carries current (the series parts are negligible). Scope: Ch1 across a sense resistor $R_{Ch1}$ (current), Ch2 across the primary (voltage).</p>
$$I = \frac{V_{rms,Ch1}}{R_{Ch1}},\quad V = V_{rms,Ch2},\quad P = \frac{\langle v_{Ch1}v_{Ch2}\rangle}{R_{Ch1}}$$
$$R_C = \frac{V^2}{P},\quad I_C = \frac{V}{R_C},\quad I_M = \sqrt{I^2 - I_C^2},\quad L_M = \frac{V}{2\pi fI_M}$$

<h3>4. Short-circuit test → $R_{eq}$, $L_{eq}$</h3>
<p>One winding shorted (usually the low-voltage side), a small voltage applied to the other until <b>rated current</b> flows. The shunt branch is a much higher impedance and the voltage is low, so core losses are negligible; only the series branch remains.</p>
$$R_{eq} = \frac{P_{SC}}{I_{SC}^2},\quad |Z_{eq}| = \frac{V_{SC}}{I_{SC}},\quad X_{eq} = \sqrt{Z_{eq}^2 - R_{eq}^2},\quad L_{eq} = \frac{X_{eq}}{2\pi f}$$
<p>Referred to the HV side: $R_{eq,HV} = R_1/a^2 + R_2$, $L_{eq,HV} = L_1/a^2 + L_2$ with $a = N_1/N_2$.</p>

<h3>5. How losses change</h3>
<ul>
<li>Core loss $P = V^2/R_C$ and magnetising $Q = V^2/X_M$ depend on the <b>applied voltage</b>: halve $v_P$, quarter them. They don't depend on the load.</li>
<li>Copper loss $P_{Cu} = i_P^2R_1 + i_S^2R_2$ depends on the <b>currents</b>: with a fixed load, $P_{Cu} \propto v_P^2$; with fixed $v_P$, $P_{Cu} \propto 1/R_{load}^2$.</li>
</ul>`,
formulas: [
 {name:"Voltage ratio", tex:R`\frac{v_p}{v_s} = \frac{N_p}{N_s}`},
 {name:"Current ratio", tex:R`\frac{i_p}{i_s} = \frac{N_s}{N_p}`},
 {name:"Reflected impedance", tex:R`Z' = \left(\frac{N_1}{N_2}\right)^2Z_L`},
 {name:"No-load: core resistance", tex:R`R_C = \frac{V^2}{P}`},
 {name:"No-load: magnetising", tex:R`L_M = \frac{V}{2\pi f\sqrt{I^2 - (V/R_C)^2}}`},
 {name:"Short-circuit", tex:R`R_{eq} = \frac{P}{I^2},\ X_{eq} = \sqrt{(V/I)^2 - R_{eq}^2}`},
 {name:"Core vs copper loss", tex:R`P_{core} = \frac{V^2}{R_C},\quad P_{Cu} = i_P^2R_1 + i_S^2R_2`}
],
questions: [
 {src:"Exam 2025 Q2(a)", see:[2], q:R`For the real transformer model, explain what $L_M$ and $R_C$ represent and why laminated cores are used.`,
  hint:"One is about finite permeability, the other about two loss mechanisms in the iron.",
  sol:R`<p>$L_M$: the core has non-zero reluctance (finite permeability), so a magnetising current is needed to set up the working flux. (It's non-linear in reality because of saturation, usually ignored in the model.)</p>
  <p>$R_C$: power lost in the core to hysteresis (energy per cycle = loop area, so ∝ f) and eddy currents (induced circulating currents heating the iron).</p>
  <p>Laminations: thin insulated sheets with the insulation across the induced emf direction, blocking eddy-current paths and reducing the $R_C$ loss.</p>`,
  ans:"Magnetising; hysteresis + eddy losses; laminations cut eddy currents", prov:"Follows the posted exam solution."},
 {src:"Exam 2025 Q2(b)", see:[3], q:R`Identify a test to find $L_M$ and $R_C$, describe how to do it with a two-channel scope, and derive expressions for them from the measurements.`,
  hint:"Which test makes the series branch irrelevant?",
  sol:R`<p><b>No-load (open-circuit) test</b>: secondary open, rated voltage on the primary through a sense resistor $R_{Ch1}$.</p>
  <p>Ch1 across $R_{Ch1}$ (current), Ch2 across the primary (voltage). Measure $V_{rms,Ch1}$, $V_{rms,Ch2}$ and $\langle v_{Ch1}v_{Ch2}\rangle$.</p>
  <p>$I = V_{rms,Ch1}/R_{Ch1}$, $V = V_{rms,Ch2}$, $P = \langle v_{Ch1}v_{Ch2}\rangle/R_{Ch1}$</p>
  <p>$R_C = V^2/P$; $I_C = V/R_C$; $I_M = \sqrt{I^2 - I_C^2}$; $L_M = \dfrac{V}{2\pi f I_M} = \dfrac{V}{2\pi f\sqrt{I^2 - P^2/V^2}}$</p>`,
  ans:"No-load test; R_C = V²/P; L_M = V/(2πf·√(I² − (P/V)²))", prov:"Follows the posted exam solution (which prints ⟨v_Ch1·v_Ch1⟩; the product needed is Ch1 × Ch2)."},
 {src:"Sample 2025 Q2(b)", see:[4], q:R`For a 50:100 turn transformer, identify a test to find the equivalent coil resistance and leakage inductance referred to the HV side, and derive them from scope measurements.`,
  hint:"Short one winding, drive rated current through the other.",
  sol:R`<p><b>Short-circuit test</b>: short the LV winding, apply a small voltage to the HV winding until rated current flows. The shunt branch is a far higher impedance and core loss is negligible at this low voltage.</p>
  <p>$I_{SC} = V_{rms,Ch1}/R_{Ch1}$, $V_{SC} = V_{rms,Ch2}$, $P_{SC} = \langle v_{Ch1}v_{Ch2}\rangle/R_{Ch1}$</p>
  <p>$R_{eq,HV} = P_{SC}/I_{SC}^2$; $Z = V_{SC}/I_{SC}$; $X_{eq} = \sqrt{Z^2 - R_{eq}^2}$; $L_{eq,HV} = X_{eq}/2\pi f$</p>`,
  ans:"Short-circuit test; R = P/I², L = √((V/I)² − R²)/2πf", prov:"Follows the posted sample-paper solution."},
 {src:"Exam 2025 Q2(c)", see:[5], q:R`In normal operation, how are the losses in $L_M$ and $R_C$ affected by (i) a decrease in $v_P$, (ii) a decrease in $R_{load}$?`,
  hint:"The shunt branch only sees the applied voltage.",
  sol:R`<p>(i) $P = V^2/R_C$ and $Q = V^2/X_M$: both fall <b>quadratically</b>.</p>
  <p>(ii) The load changes the winding currents, not $v_P$: core $P$ and $Q$ are <b>unchanged</b>.</p>`,
  ans:"(i) both ∝ v_P²; (ii) unchanged", prov:"Follows the posted exam solution."},
 {src:"Exam 2026 Q2(c)", see:[5], q:R`With a resistive load, how does a decrease in $v_P$ affect the losses in (i) $R_C$ and (ii) $R_1$?`,
  hint:"For R₁, follow the currents through the turns ratio.",
  sol:R`<p>(i) $P_{core} = V^2/R_C$: decreases quadratically.</p>
  <p>(ii) $v_S = v_P N_2/N_1$, $i_S = v_S/R_{load}$, $i_P = i_SN_2/N_1$: all proportional to $v_P$, so $P_{Cu} \propto v_P^2$: also quadratic.</p>`,
  ans:"Both decrease ∝ v_P²", prov:"Follows the posted exam solution."},
 {src:"Practice (Claude)", see:[3], q:R`A no-load test at 50 Hz gives $V = 10$ V rms, $I = 50$ mA rms and $P = 0.2$ W. Find $R_C$ and $L_M$.`,
  hint:"R_C first, then split the current.",
  sol:R`<p>$R_C = 10^2/0.2 = 500$ Ω, $I_C = 10/500 = 20$ mA.</p>
  <p>$I_M = \sqrt{50^2 - 20^2} = 45.8$ mA, $X_M = 10/0.0458 = 218$ Ω, $L_M = 218/(2\pi\cdot50) = 0.695$ H.</p>`,
  ans:"R_C = 500 Ω, L_M ≈ 0.70 H", prov:"Worked by Claude with made-up numbers to practise the method."}
],
traps: [
 "No-load test → shunt branch (R_C, L_M). Short-circuit test → series branch (R_eq, L_eq). Don't swap them.",
 "Real power from the scope is the mean of Ch1 × Ch2 divided by the sense resistor.",
 "Impedance reflects with the turns ratio SQUARED.",
 "Core losses depend on voltage, not load; copper losses depend on current.",
 "Laminations reduce eddy-current loss, not hysteresis loss."
]
});
})();
