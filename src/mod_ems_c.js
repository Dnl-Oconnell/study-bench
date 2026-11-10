/* EEN1029 — Task 3 lectures: AC motors, and power electronics applications */
(function(){
const R = String.raw;
const T = STUDY.content.ems = STUDY.content.ems || { topics: [] };

T.topics.push({
id: "acmotors", part: "Task 3: AC motors & power electronics", title: "Three-Phase AC, Induction & Synchronous Motors",
lectures: "Task 3 – AC Motors", status: "lectured",
summary: "Why three-phase ac is used, star and delta connections, how an induction motor's rotor is energised and why it always slips, its transformer-like equivalent circuit with the load resistance R_u, and the constant-speed synchronous motor.",
theory: R`
<h3>0. Three-phase ac</h3>
<ul>
<li>Three voltages of equal amplitude, <b>120° out of phase</b> with each other ($E_a$, $E_b$, $E_c$).</li>
<li>For a balanced load the total instantaneous power is constant over the cycle, so power transfer is smoother than single-phase. This is why transmission uses three phases.</li>
<li>Three phase windings spaced around a stator, fed with three-phase currents, produce a <b>rotating magnetic field</b>. Three-phase motors and generators rely on this.</li>
</ul>
<p>The field rotates at the <b>synchronous speed</b> (a standard result, not on the slides): $$n_s = \frac{120f}{p}\ \text{rpm}$$ where $p$ is the number of poles. At 50 Hz: 2 poles 3000 rpm, 4 poles 1500 rpm, 6 poles 1000 rpm.</p>

<h3>1. Star and delta connections</h3>
<table class="data">
<tr><th></th><th>Star (Y)</th><th>Delta (Δ)</th></tr>
<tr><td>Line vs phase voltage</td><td>$V_L = \sqrt3\,V_{ph}$; line voltages <b>lead</b> phase voltages by 30°</td><td>$V_L = V_{ph}$</td></tr>
<tr><td>Line vs phase current</td><td>$I_L = I_{ph}$</td><td>$I_L = \sqrt3\,I_{ph}$; line currents <b>lag</b> phase currents by 30°</td></tr>
<tr><td>Neutral</td><td>available (common star point)</td><td>none</td></tr>
</table>
<p>The 30° shifts are the lecture's statements. The $\sqrt3$ magnitudes come from adding two phasors 120° apart. Either way, total power in a balanced load is $$P = \sqrt3\,V_L I_L\cos\varphi = 3V_{ph}I_{ph}\cos\varphi$$ (Irish/UK mains: 400 V line, 230 V phase.)</p>

<h3>2. Induction motors</h3>
<ul>
<li>The rotor is energised <b>by induction</b>: it has no external electrical connections. The rotating stator field cuts the rotor conductors, induces currents, and those currents feel a force.</li>
<li>The rotor always turns <b>slower than synchronous speed</b>. At synchronous speed there'd be no relative motion, no induced current and no torque.</li>
<li><b>Speed decreases as load increases</b>: more load needs more torque, which needs more relative motion (more slip).</li>
<li>Two rotor types: <b>wound rotor</b> and <b>squirrel cage</b> (bars shorted by end rings). Squirrel cage is the most common: cheap and robust.</li>
</ul>
<p><b>Slip</b> (standard definition): $$s = \frac{n_s - n}{n_s}$$ $s=1$ at standstill, a few percent at full load. The rotor currents are at frequency $f_r = sf$.</p>

<h3>3. Induction motor equivalent circuit</h3>
<p>The equivalent circuit, and the types of loss, are like a <b>transformer's</b>: the stator is the primary, the rotor the secondary.</p>
<ul>
<li>Stator side: $R_1$, $jX_1$ (winding resistance and leakage), and the magnetising branch $X_\mu \parallel R_{Fe}$ (core loss), drawing $I_{10}$.</li>
<li>Rotor side: $R_2$, $jX_2$ and a <b>fictitious resistance $R_u$ that models the mechanical load</b>. The power dissipated in $R_u$ is the mechanical output.</li>
</ul>
<p>Standard form (not on the slides): $R_u = R_2\dfrac{1-s}{s}$. Of the air-gap power $P_{ag}$ crossing to the rotor, $sP_{ag}$ is rotor copper loss and $(1-s)P_{ag}$ becomes mechanical power. So high slip wastes power as heat.</p>
<div class="callout">Compare with the transformer topic: same open-circuit (magnetising) and series (winding) branches. The new piece is that the "load" is a resistance that depends on speed.</div>

<h3>4. Synchronous motors</h3>
<ul>
<li>Run at <b>constant speed</b> from no load to full load: the rotor turns at exactly the speed of the stator field.</li>
<li>Single-phase synchronous motors: ac applied to the stator field winding.</li>
<li>Three-phase synchronous motors: three-phase ac on the stator windings produces the rotating field.</li>
<li>The rotor is either a <b>permanent magnet</b> or a <b>winding energised with dc</b>, so it has its own poles that lock to the rotating field. (It doesn't rely on induction, which is why it needs no slip.)</li>
</ul>
<table class="data">
<tr><th></th><th>Induction</th><th>Synchronous</th></tr>
<tr><td>Rotor field from</td><td>induced currents</td><td>permanent magnet or dc winding</td></tr>
<tr><td>Speed</td><td>below $n_s$, falls with load</td><td>exactly $n_s$, constant</td></tr>
<tr><td>Rotor connections</td><td>none (squirrel cage)</td><td>dc supply (wound) or none (PM)</td></tr>
</table>`,
formulas: [
 {name:"Synchronous speed", tex:R`n_s=\frac{120f}{p}\ \text{rpm}`, note:"p = number of poles"},
 {name:"Slip", tex:R`s=\frac{n_s-n}{n_s},\quad f_r=sf`},
 {name:"Star", tex:R`V_L=\sqrt3V_{ph},\quad I_L=I_{ph}`},
 {name:"Delta", tex:R`V_L=V_{ph},\quad I_L=\sqrt3I_{ph}`},
 {name:"Three-phase power (balanced)", tex:R`P=\sqrt3V_LI_L\cos\varphi`},
 {name:"Mechanical load resistance", tex:R`R_u=R_2\frac{1-s}{s},\quad P_{mech}=(1-s)P_{ag}`}
],
questions: [
 {src:"Practice (AC Motors lecture)", see:[0,2], q:R`A 4-pole induction motor on a 50 Hz supply runs at 1440 rpm at full load. Find the synchronous speed, the slip and the frequency of the rotor currents.`,
  hint:"n_s = 120f/p, then s = (n_s − n)/n_s and f_r = sf.",
  sol:R`<p>$n_s = 120\times50/4 = 1500$ rpm.</p><p>$s = (1500-1440)/1500 = 0.04$ (4%).</p><p>$f_r = sf = 0.04\times50 = 2$ Hz.</p>`,
  ans:"1500 rpm; s = 0.04; 2 Hz", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (AC Motors lecture)", see:[1], q:R`A balanced star-connected load is fed from a 400 V (line) supply and draws 10 A per line at power factor 0.85 lagging. Find the phase voltage and the total power. If the same phase currents flowed in a delta-connected load, what would the line current be?`,
  hint:"Star: V_ph = V_L/√3, I_L = I_ph. Delta: I_L = √3 I_ph.",
  sol:R`<p>Star: $V_{ph}=400/\sqrt3=230.9$ V.</p><p>$P=\sqrt3V_LI_L\cos\varphi=\sqrt3\times400\times10\times0.85=5889$ W ≈ 5.89 kW.</p><p>Delta with 10 A in each phase: $I_L=\sqrt3\times10=17.3$ A.</p>`,
  ans:"230.9 V; 5.89 kW; 17.3 A", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (AC Motors lecture)", see:[3], q:R`In an induction motor's equivalent circuit, $R_2 = 0.5\ \Omega$ (referred) and the slip is 4%. Find the load resistance $R_u$. If the air-gap power is 5 kW, how much becomes mechanical power and how much is lost in the rotor?`,
  hint:"R_u = R₂(1 − s)/s. Rotor copper loss = sP_ag; the rest is mechanical.",
  sol:R`<p>$R_u = 0.5\times(1-0.04)/0.04 = 12\ \Omega$.</p><p>$P_{mech}=(1-s)P_{ag}=0.96\times5000=4800$ W; rotor copper loss $=sP_{ag}=0.04\times5000=200$ W.</p>`,
  ans:"R_u = 12 Ω; 4.8 kW mechanical, 200 W rotor loss", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (AC Motors lecture)", see:[2,4], q:R`Explain why an induction motor can never run at synchronous speed, while a synchronous motor always does. What happens to each motor's speed as load increases?`,
  hint:"Where does each rotor's magnetic field come from?",
  sol:R`<p><b>Induction:</b> the rotor currents are induced by the field sweeping past the rotor bars. At synchronous speed the rotor would move with the field, nothing would be cut, no current would be induced and there'd be no torque. So it settles below $n_s$, and more load needs more slip: speed falls as load rises.</p><p><b>Synchronous:</b> the rotor has its own field (permanent magnet or dc winding), so it locks to the rotating stator field and turns at exactly $n_s$ from no load to full load. Load changes the angle between rotor and field, not the speed.</p>`,
  ans:"Induction needs relative motion to induce rotor current; synchronous rotor has its own field and locks on", prov:"Worked by Claude; no solution is available."}
],
traps: [
 "Star: line voltage = √3 × phase voltage, currents equal. Delta: voltages equal, line current = √3 × phase current. Don't swap them.",
 "n_s = 120f/p uses the number of poles, not pole pairs.",
 "Slip is a fraction of synchronous speed, not of rotor speed.",
 "R_u is fictitious: it stands for the mechanical load, not a real resistor in the rotor.",
 "Synchronous motors don't slow under load; induction motors do."
]
});

T.topics.push({
id: "powerelec", part: "Task 3: AC motors & power electronics", title: "Power Converters, Soft Starters & Variable-Frequency Drives",
lectures: "Task 3 – Power Electronics Applications", status: "lectured",
summary: "The four converter families (ac–dc rectifiers, dc–ac inverters with sinusoidal PWM, dc–dc buck/boost/buck-boost/Ćuk, and ac–ac controllers like the Task 3 TRIAC circuit), then two ways to start an ac motor: the thyristor soft starter and the variable-frequency drive.",
theory: R`
<h3>0. Converter families</h3>
<div class="flow"><span>AC → DC<br>rectifier</span><i>·</i><span>DC → AC<br>inverter</span><i>·</i><span>DC → DC<br>chopper</span><i>·</i><span>AC → AC<br>controller</span></div>
<p>Each uses semiconductor switches (diodes, thyristors, TRIACs, transistors) switched fully on or off, rather than dropping voltage linearly, so losses stay low.</p>

<h3>1. AC–DC converters (rectifiers)</h3>
<ul>
<li>Single-phase or three-phase; half-wave or full-wave.</li>
<li><b>Uncontrolled</b>: diode bridges. Simple, cheap, fixed output.</li>
<li><b>Controlled</b>: thyristor bridges. The dc output is varied with the <b>firing angle</b> α, the same idea as TRIAC phase control.</li>
<li>Need filtering to reduce ripple. Three-phase full-wave has much less ripple than single-phase: the output follows the top of six pulses per cycle.</li>
<li>Applications: dc power supplies, motor drives, battery chargers, HVDC transmission.</li>
</ul>
<p>Standard averages (not on the slides), resistive load:</p>
<table class="data">
<tr><th>Rectifier</th><th>Average dc output</th></tr>
<tr><td>Single-phase full-wave, diode</td><td>$V_{dc}=2V_m/\pi$</td></tr>
<tr><td>Single-phase full-wave, thyristor</td><td>$V_{dc}=\dfrac{V_m}{\pi}(1+\cos\alpha)$</td></tr>
<tr><td>Three-phase full-wave, diode</td><td>$V_{dc}=\dfrac{3\sqrt2}{\pi}V_L\approx1.35V_L$</td></tr>
<tr><td>Three-phase full-wave, thyristor</td><td>$V_{dc}\approx1.35V_L\cos\alpha$ (continuous current)</td></tr>
</table>

<h3>2. DC–AC converters (inverters)</h3>
<ul>
<li><b>Sinusoidal PWM</b>: a sine reference is compared with a high-frequency sawtooth/triangle carrier. Where the sine is above the carrier the output is high, otherwise low. The pulse widths then vary sinusoidally.</li>
<li>That signal switches an <b>H-bridge</b> (pairs of transistors switched diagonally, as in Task 2). An LC filter or the motor's own inductance smooths the current into a near-sine.</li>
<li>Output frequency and amplitude are set by the reference sine, so motor speed can be controlled <b>independently of the mains frequency</b>.</li>
<li>Applications: variable-speed drives, solar inverters, UPS systems, grid stability.</li>
</ul>

<h3>3. DC–DC converters</h3>
<ul>
<li>Energy is periodically <b>stored in and released from an inductor</b> while a switch is continuously opened and closed.</li>
<li>The output is set by the switching <b>duty cycle</b> $D$.</li>
</ul>
<table class="data">
<tr><th>Type</th><th>Lecture description</th><th>Ideal output (continuous conduction, standard)</th></tr>
<tr><td>Buck</td><td>steps voltage down</td><td>$V_o=DV_{in}$</td></tr>
<tr><td>Boost</td><td>steps voltage up</td><td>$V_o=\dfrac{V_{in}}{1-D}$</td></tr>
<tr><td>Buck-boost</td><td>"bidirectional": up or down</td><td>$V_o=-\dfrac{D}{1-D}V_{in}$ (inverted)</td></tr>
<tr><td>Ćuk</td><td>up or down, output current continuous</td><td>same magnitude as buck-boost, inverted; uses a coupling capacitor</td></tr>
</table>
<p>The slide's "bidirectional" for buck-boost and Ćuk means the output can be above or below the input ($D>0.5$ steps up, $D<0.5$ steps down).</p>

<h3>4. AC–AC converters</h3>
<ul>
<li><b>AC voltage control with a TRIAC</b>: phase control, exactly the Task 3 circuit. Output frequency = input frequency; only the rms voltage changes.</li>
<li><b>AC–DC–AC</b>: rectify, then invert at any frequency. This is the variable-frequency drive.</li>
<li>Applications: ac motor starters and control, light dimmers, heater controls, grid stability.</li>
</ul>

<h3>5. Starting ac motors: soft starter</h3>
<ul>
<li>Pairs of anti-parallel thyristors in each of the three lines (R, Y, B) between the supply and the motor, with control electronics fed from an ac–dc supply. Fuses and an overload relay protect the line.</li>
<li>The voltage is raised <b>gradually by decreasing the firing angle</b>. That gives smooth acceleration and reduces the current/power surge of direct-on-line starting.</li>
<li>Frequency is unchanged, so it only eases starting; it doesn't give speed control.</li>
</ul>
<p>(Not the same as "soft starting" in the Task 3 brief, which means switching a load on only at a zero crossing.)</p>

<h3>6. Starting and running ac motors: variable-frequency drive (VFD)</h3>
<div class="flow"><span>3-phase in</span><i>→</i><span>Rectifier (diode bridge)</span><i>→</i><span>Filter (dc link capacitor)</span><i>→</i><span>Inverter (6 switches, PWM)</span><i>→</i><span>3-phase motor</span></div>
<ul>
<li>The inverter's six switches are driven by PWM from the control electronics. The actual output is a train of pulses; the effective output (what the motor's inductance sees) is a sine.</li>
<li>Because the frequency is set by the inverter, synchronous speed $n_s=120f/p$ can be set anywhere: <b>full control of motor speed from 0 to rated speed</b>.</li>
<li>Standard practice (not on the slides): voltage is varied in proportion to frequency (constant V/f) to keep the motor's flux constant.</li>
</ul>
<table class="data">
<tr><th></th><th>Soft starter</th><th>VFD</th></tr>
<tr><td>Switches</td><td>thyristors (phase control)</td><td>rectifier + transistor inverter</td></tr>
<tr><td>Varies</td><td>voltage only</td><td>frequency and voltage</td></tr>
<tr><td>Speed control</td><td>no (starting only)</td><td>yes, 0 to rated</td></tr>
<tr><td>Cost / complexity</td><td>lower</td><td>higher</td></tr>
</table>`,
formulas: [
 {name:"Buck", tex:R`V_o=DV_{in}`},
 {name:"Boost", tex:R`V_o=\frac{V_{in}}{1-D}`},
 {name:"Buck-boost", tex:R`V_o=-\frac{D}{1-D}V_{in}`},
 {name:"Controlled single-phase full-wave (R load)", tex:R`V_{dc}=\frac{V_m}{\pi}(1+\cos\alpha)`},
 {name:"Three-phase diode bridge", tex:R`V_{dc}=\frac{3\sqrt2}{\pi}V_L\approx1.35V_L`},
 {name:"VFD speed", tex:R`n_s=\frac{120f}{p}`, note:"f set by the inverter"}
],
questions: [
 {src:"Practice (Power Electronics lecture)", see:[3], q:R`An ESP32 board needs 5 V from a 12 V battery, and a sensor needs 12 V from a 5 V USB rail. Which dc–dc converter suits each, and what ideal duty cycle?`,
  hint:"Buck steps down: V_o = DV_in. Boost steps up: V_o = V_in/(1 − D).",
  sol:R`<p><b>12 V → 5 V:</b> buck. $D=5/12=0.417$ (41.7%).</p><p><b>5 V → 12 V:</b> boost. $12=5/(1-D)$ gives $D=1-5/12=0.583$ (58.3%).</p>`,
  ans:"Buck, D ≈ 0.42; boost, D ≈ 0.58", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Power Electronics lecture)", see:[1], q:R`A single-phase fully controlled full-wave rectifier runs from 230 V rms into a resistive load. Find the average output at α = 0° and α = 60°.`,
  hint:"V_m = 230√2. V_dc = (V_m/π)(1 + cos α).",
  sol:R`<p>$V_m=230\sqrt2=325.3$ V.</p><p>α = 0°: $V_{dc}=2V_m/\pi=207.1$ V (same as a diode bridge).</p><p>α = 60°: $V_{dc}=\dfrac{325.3}{\pi}(1+0.5)=155.3$ V.</p>`,
  ans:"207 V; 155 V", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Power Electronics lecture)", see:[1,6], q:R`A VFD runs from a 400 V three-phase supply. Estimate the dc-link voltage from its diode rectifier. At what output frequency must it run a 4-pole motor for a synchronous speed of 750 rpm?`,
  hint:"Three-phase full-wave diode bridge: V_dc ≈ 1.35 V_L. Rearrange n_s = 120f/p.",
  sol:R`<p>$V_{dc}=\dfrac{3\sqrt2}{\pi}\times400=540$ V (before ripple and loading).</p><p>$f=\dfrac{n_sp}{120}=\dfrac{750\times4}{120}=25$ Hz.</p>`,
  ans:"≈ 540 V; 25 Hz", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Power Electronics lecture)", see:[5,6], q:R`Compare a soft starter and a variable-frequency drive for starting a large three-phase induction motor. Which would you choose for a fan that must run at different speeds, and why?`,
  hint:"What does each one change: voltage, frequency, or both?",
  sol:R`<p><b>Soft starter:</b> anti-parallel thyristors in each line. It ramps the voltage up by decreasing the firing angle, so the motor accelerates smoothly and the inrush is reduced. Frequency stays at mains, so once started the motor runs at its normal speed.</p><p><b>VFD:</b> rectifier → dc-link filter → PWM inverter. It sets both frequency and voltage, so it starts the motor gently <b>and</b> controls speed from 0 to rated.</p><p>For a variable-speed fan: the <b>VFD</b>, because speed follows $n_s=120f/p$ and only the VFD changes $f$. A soft starter is the cheaper choice if the fan only ever runs at full speed.</p>`,
  ans:"VFD: it varies frequency, so it can set speed; a soft starter only ramps voltage at start", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Power Electronics lecture)", see:[2], q:R`Explain how sinusoidal PWM lets an H-bridge inverter produce a sine-like ac output from a dc supply.`,
  hint:"Compare a sine reference with a fast carrier.",
  sol:R`<p>A sine reference at the wanted output frequency is compared with a high-frequency sawtooth/triangle carrier. Whenever the sine is above the carrier one diagonal pair of the H-bridge is on; otherwise the other pair. The output is a fixed-amplitude pulse train whose pulse widths rise and fall with the sine.</p><p>The load's inductance (or an LC filter) averages the pulses, so the current follows the sine. Changing the reference's frequency or amplitude changes the output's, independently of the mains.</p>`,
  ans:"Compare sine with carrier → width-modulated pulses → inductance filters to a sine", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Power Electronics lecture)", see:[4], q:R`Which converter family does the Task 3 TRIAC circuit belong to? Does it change the frequency delivered to the load?`,
  hint:"Input and output are both ac.",
  sol:R`<p>It's an <b>ac–ac converter</b> (ac voltage controller). Phase control chops part of each half-cycle, changing the rms voltage and power, but the output still repeats at the supply frequency (50 Hz). Changing frequency needs an ac–dc–ac converter such as a VFD.</p>`,
  ans:"AC–AC voltage controller; no, frequency is unchanged", prov:"Worked by Claude; no solution is available."}
],
traps: [
 "A soft starter changes voltage only; a VFD changes frequency (and voltage). Only the VFD controls running speed.",
 "Boost duty cycle: V_o = V_in/(1 − D), not V_in/D.",
 "Buck-boost output is inverted in polarity.",
 "Controlled rectifier output falls as the firing angle rises, just like TRIAC phase control.",
 "The Task 3 brief's 'soft starting' (switching on at a zero crossing) is not the same as a thyristor soft starter."
]
});
})();
