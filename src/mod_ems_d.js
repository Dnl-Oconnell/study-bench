/* EEN1029 — Task 3 lecture: sensors and actuators, from wearables to MEMS */
(function(){
const R = String.raw;
const T = STUDY.content.ems = STUDY.content.ems || { topics: [] };

T.topics.push({
id: "mems", part: "Task 3: Sensors, actuators & MEMS", title: "Sensors & Actuators, from Wearables to MEMS",
lectures: "Task 3 – Sensors, Actuators and MEMS", status: "lectured",
summary: "The four ways of converting between electrical and mechanical energy (electromagnetic, electrostatic, piezoresistive, piezoelectric), an example sensor and actuator for each, the strain-gauge bridge, why electrostatics wins as devices shrink, and how MEMS accelerometers and micromirrors work.",
theory: R`
<h3>0. One principle, many scales</h3>
<p>Every sensor and actuator here converts energy between <b>electrical and mechanical</b> forms. What changes with size is which mechanism works best.</p>
<table class="data">
<tr><th>Scale</th><th>Examples</th></tr>
<tr><td>Body-worn (~1 m)</td><td>breathing bands, stretch-sensing garments, pressure-sensing insoles</td></tr>
<tr><td>Discrete (~1 mm)</td><td>haptic motors, strain gauges, load cells, piezo buzzers, relays, loudspeakers</td></tr>
<tr><td>MEMS (~1 µm)</td><td>accelerometers, gyroscopes, microphones, pressure sensors, micromirrors, inkjet nozzles</td></tr>
<tr><td>NEMS (~1 nm)</td><td>nanoscale resonators, mostly research (chemical, biomedical sensing)</td></tr>
</table>

<h3>1. The four coupling mechanisms</h3>
<table class="data">
<tr><th>Mechanism</th><th>As a sensor</th><th>As an actuator</th><th>Example sensor / actuator</th><th>Scale</th></tr>
<tr><td>Electromagnetic</td><td>movement changes an inductance, or induces a voltage in a coil</td><td>a current in a magnetic field produces a force</td><td>breathing band / motors, haptics</td><td>m to mm</td></tr>
<tr><td>Electrostatic</td><td>movement changes a capacitance</td><td>a voltage across a gap pulls two plates together</td><td>accelerometer, gyroscope / micromirror</td><td>µm</td></tr>
<tr><td>Piezoresistive</td><td>strain changes resistance</td><td><b>not used</b>: the effect doesn't run in reverse</td><td>strain gauge, pressure sensor / —</td><td>cm to µm</td></tr>
<tr><td>Piezoelectric</td><td>strain generates charge</td><td>a voltage makes the material change shape</td><td>film pulse sensor / buzzer, inkjet nozzle</td><td>cm to µm</td></tr>
</table>
<p>The motors and inductors from earlier in the module sit in the electromagnetic row.</p>

<h3>2. Electromagnetic: breathing band and linear resonant actuator</h3>
<p>Familiar physics: inductance depends on geometry (turns, area, length), and a conductor carrying current in a field feels $F=BIl$. Two new uses:</p>
<ul>
<li><b>Respiratory inductance plethysmography (sensor).</b> A zigzag wire sewn into an elastic band forms a coil around the chest. A small ac current is passed through it (no external field needed). Breathing changes the enclosed area, so the self-inductance $L$ changes. The coil sets the frequency of an oscillator, $$f=\frac{1}{2\pi\sqrt{LC}}$$ so breathing shows up as a small shift in $f$.</li>
<li><b>Linear resonant actuator (actuator).</b> A voice coil (a coil in a permanent magnet's field) pushes a mass on a spring along its axis, driven at the mechanical resonance $$f_0=\frac{1}{2\pi}\sqrt{\frac{k}{m}}$$ Typically a few hundred hertz, where skin is most sensitive: the "tap" in a smartwatch. Faster and more efficient than the older eccentric rotating mass (ERM) motor.</li>
</ul>

<h3>3. Piezoresistive: strain gauges and the bridge</h3>
<p>Stretch a conductor and its resistance $R=\rho l/A$ changes. Sensitivity is the <b>gauge factor</b> $G$: $$\frac{\Delta R}{R}=G\varepsilon$$ where $\varepsilon$ is strain (change in length / original length).</p>
<ul>
<li><b>Metal foil:</b> $G\approx2$, from geometry alone (longer and thinner).</li>
<li><b>Silicon:</b> $G\sim100$. Strain distorts the crystal lattice, which changes how easily charge carriers move.</li>
<li>Sensing only: it doesn't run in reverse.</li>
</ul>
<p>The change is tiny: even a large strain of $10^{-3}$ (1000 microstrain) with foil gives $\Delta R/R=0.2\%$. So use a <b>Wheatstone bridge</b>. With one active gauge: $$V_{out}\approx\frac{V_{ex}G\varepsilon}{4}$$</p>
<div class="callout key">With $V_{ex}=3.3$ V, $G=2$, $\varepsilon=10^{-3}$: $V_{out}\approx1.65$ mV. One step of a 12-bit, 3.3 V ADC is $3.3/4096\approx0.8$ mV, so the whole range spans about two steps. <b>An amplifier is needed.</b></div>
<p>Large to small:</p>
<ul>
<li><b>Foil strain gauges:</b> weighing scales, structural monitoring. A <b>load cell</b> is a metal block that bends slightly under load, with gauges bonded to it.</li>
<li><b>Textile stretch sensors:</b> conductive yarn or elastomer, for breathing and joint angle.</li>
<li><b>MEMS pressure sensor:</b> a thin silicon diaphragm over an etched cavity, with four piezoresistors in a bridge. The first MEMS device in the lecture.</li>
</ul>

<h3>4. Piezoelectric: charge from strain, strain from voltage</h3>
<p>Certain materials generate charge when strained: $$Q=d_pF$$ where $d_p$ is the piezoelectric coefficient. And they strain when a voltage is applied. Materials: quartz, ceramics such as PZT, polymer film (PVDF).</p>
<ul>
<li>Works <b>both ways</b>, like a motor and a generator.</li>
<li>The charge leaks away, so it senses <b>changes, not steady loads</b>.</li>
<li><b>Sensors:</b> polymer film on the skin (pulse, breathing); in a shoe (heel strike, gait). Read out with a <b>charge amplifier</b>.</li>
<li><b>Actuators:</b> buzzers and sounders; inkjet nozzles (a pulse squeezes out one droplet). Small displacement, large force, very fast.</li>
</ul>

<h3>5. Electrostatic: capacitance and force</h3>
<p>Two plates form a capacitor: $$C=\frac{\epsilon_0A}{d}$$</p>
<ul>
<li><b>Sensing:</b> movement changes $d$ or $A$, and so $C$.</li>
<li><b>Actuation:</b> a voltage pulls the plates together with $$F=\frac{\epsilon_0AV^2}{2d^2}$$ The force goes as $V^2$, so it always attracts whatever the polarity, and it grows quickly as the gap closes.</li>
</ul>

<h3>6. Why electrostatics wins when small</h3>
<p>Shrink every dimension by a factor $s$:</p>
<ul>
<li>Electrostatic force (fixed field strength): $F\propto s^2$.</li>
<li>Magnetic force (fixed current density): $F\propto s^4$.</li>
</ul>
<p>Shrink by 1000 and electrostatic force falls by $10^6$, magnetic by $10^{12}$. Coils are also hard to make on a chip, while plates and beams are easy. So the dominant mechanism shifts from magnetic to electrostatic as devices shrink.</p>

<h3>7. How MEMS are made</h3>
<p><b>Surface micromachining with a sacrificial layer:</b></p>
<ol class="steps">
<li>Deposit and pattern a sacrificial layer.</li>
<li>Deposit and pattern the structural layer on top.</li>
<li>Etch away the sacrificial layer, leaving a free-standing beam anchored at one end.</li>
</ol>
<p>Parts this small can't be assembled, so they're etched from layers on a silicon wafer: thousands of devices per wafer, alongside their electronics.</p>

<h3>8. MEMS accelerometer (electrostatic sensor)</h3>
<p>A proof mass on springs, with interleaved fingers between fixed fingers. Acceleration displaces the mass (spring–mass, as in Mechanics of Machines): $$x=\frac{ma}{k}=\frac{a}{\omega_0^2},\qquad \omega_0=\sqrt{k/m}$$</p>
<ul>
<li>One gap narrows as the other widens: a <b>differential capacitor</b>.</li>
<li>Displacements of nanometres, capacitance changes of femtofarads.</li>
<li>A higher natural frequency means less displacement per g (less sensitive) but a wider bandwidth.</li>
</ul>

<h3>9. Micromirror (electrostatic actuator) and pull-in</h3>
<p>A voltage pulls a sprung plate towards a fixed one. Past <b>one third of the gap</b>, the electrostatic force outgrows the spring and the plate snaps shut: <b>pull-in</b>. $$V_{PI}=\sqrt{\frac{8kd^3}{27\epsilon_0A}}$$</p>
<p>Why one third (standard result, not on the slides): the spring force $kx$ rises linearly, but the electrostatic force $\propto 1/(d-x)^2$ rises faster as the gap closes. Beyond $x=d/3$ no balance is stable.</p>
<p>A projector chip uses this on purpose: each mirror snaps between two tilted positions.</p>`,
formulas: [
 {name:"Force on a conductor", tex:R`F=BIl`},
 {name:"Oscillator frequency (breathing band)", tex:R`f=\frac{1}{2\pi\sqrt{LC}}`},
 {name:"Resonance (LRA)", tex:R`f_0=\frac{1}{2\pi}\sqrt{\frac{k}{m}}`},
 {name:"Gauge factor", tex:R`\frac{\Delta R}{R}=G\varepsilon`, note:"foil G ≈ 2, silicon G ~ 100"},
 {name:"Quarter bridge", tex:R`V_{out}\approx\frac{V_{ex}G\varepsilon}{4}`},
 {name:"Piezoelectric charge", tex:R`Q=d_pF`},
 {name:"Parallel-plate capacitor", tex:R`C=\frac{\epsilon_0A}{d}`},
 {name:"Electrostatic force", tex:R`F=\frac{\epsilon_0AV^2}{2d^2}`},
 {name:"Scaling", tex:R`F_{es}\propto s^2,\quad F_{mag}\propto s^4`},
 {name:"Accelerometer displacement", tex:R`x=\frac{ma}{k}=\frac{a}{\omega_0^2}`},
 {name:"Pull-in voltage", tex:R`V_{PI}=\sqrt{\frac{8kd^3}{27\epsilon_0A}}`, note:"snap at x = d/3"}
],
questions: [
 {src:"Practice (Sensors & MEMS lecture)", see:[3], q:R`A foil strain gauge ($G=2$) in a quarter bridge is excited at 3.3 V and sees a strain of 1000 µε. Find $\Delta R/R$ and the bridge output. How many steps of a 12-bit, 3.3 V ADC is that? Repeat for a silicon gauge with $G=100$.`,
  hint:"ΔR/R = Gε; V_out ≈ V_ex G ε/4; one ADC step = 3.3/4096.",
  sol:R`<p>Foil: $\Delta R/R=2\times10^{-3}=0.2\%$. $V_{out}=3.3\times2\times10^{-3}/4=1.65$ mV. One step $=3.3/4096=0.806$ mV, so about 2 steps: an amplifier is needed (gain ~1000 brings it to 1.65 V).</p><p>Silicon: $V_{out}=3.3\times100\times10^{-3}/4=82.5$ mV, about 102 steps. Much better, but still worth amplifying.</p>`,
  ans:"0.2%; 1.65 mV ≈ 2 steps; silicon 82.5 mV ≈ 102 steps", prov:"From the worked example in the lecture (foil case); silicon case worked by Claude."},
 {src:"Practice (Sensors & MEMS lecture)", see:[2], q:R`A linear resonant actuator has a moving mass of 1 g and should resonate at 175 Hz. What spring stiffness is needed? Why is it driven at resonance?`,
  hint:"Rearrange f₀ = (1/2π)√(k/m).",
  sol:R`<p>$k=m(2\pi f_0)^2=0.001\times(2\pi\times175)^2=1209$ N/m ≈ 1.2 kN/m.</p><p>At resonance a small coil force gives the largest vibration, so it's efficient, and a few hundred hertz is where skin is most sensitive.</p>`,
  ans:"≈ 1.2 kN/m", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Sensors & MEMS lecture)", see:[8], q:R`A MEMS accelerometer has a natural frequency of 5 kHz. How far does the proof mass move under 1 g (9.81 m/s²)? Comment on the size.`,
  hint:"x = a/ω₀² with ω₀ = 2πf₀.",
  sol:R`<p>$\omega_0=2\pi\times5000=31\,416$ rad/s. $x=9.81/31\,416^2=9.9\times10^{-9}$ m ≈ 10 nm.</p><p>Nanometres, as the lecture says: hence femtofarad capacitance changes and the need for a differential capacitor and sensitive readout.</p>`,
  ans:"≈ 10 nm", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Sensors & MEMS lecture)", see:[9], q:R`A micromirror plate of area $100\ \mu\text{m}\times100\ \mu\text{m}$ sits 2 µm above an electrode on a spring of $k=1$ N/m ($\epsilon_0=8.854\times10^{-12}$ F/m). Find the pull-in voltage and the displacement at which it snaps.`,
  hint:"V_PI = √(8kd³ / 27ε₀A); pull-in happens at d/3.",
  sol:R`<p>$A=10^{-8}$ m², $d=2\times10^{-6}$ m.</p><p>$V_{PI}=\sqrt{\dfrac{8\times1\times(2\times10^{-6})^3}{27\times8.854\times10^{-12}\times10^{-8}}}=\sqrt{26.8}=5.17$ V.</p><p>Snaps at $x=d/3=0.67$ µm.</p>`,
  ans:"≈ 5.2 V; at 0.67 µm", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Sensors & MEMS lecture)", see:[2], q:R`A breathing band has $L=2\ \mu$H in an oscillator with $C=10$ nF. Find the oscillator frequency, and the change in frequency if inhaling raises $L$ by 1%.`,
  hint:"f = 1/(2π√(LC)). f ∝ L^(−1/2), so a small fractional change in L gives about half that change in f, opposite sign.",
  sol:R`<p>$f=1/(2\pi\sqrt{2\times10^{-6}\times10^{-8}})=1.125$ MHz.</p><p>With $L$ up 1%: $f=1.120$ MHz, a fall of about 0.5% (≈ 5.6 kHz). Breathing appears as a small frequency shift.</p>`,
  ans:"1.125 MHz; falls ≈ 0.5% (≈ 5.6 kHz)", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Sensors & MEMS lecture)", see:[6], q:R`A device is shrunk by a factor of 100 in every dimension. By how much do the available electrostatic and magnetic forces fall? Use this to explain why MEMS actuators are electrostatic.`,
  hint:"F_es ∝ s², F_mag ∝ s⁴.",
  sol:R`<p>Electrostatic falls by $100^2=10^4$; magnetic by $100^4=10^8$. Relative to magnetic, electrostatic becomes $10^4$ times more favourable.</p><p>Coils are also hard to fabricate on a chip, whereas plates and beams are easy to etch. So small devices use electrostatic actuation.</p>`,
  ans:"10⁴ vs 10⁸", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Sensors & MEMS lecture)", see:[1,3,4], q:R`For a bathroom scale, would you use a piezoelectric or a piezoresistive sensor? And why can't a piezoresistive element be used as an actuator?`,
  hint:"Think about steady loads, and which effects run both ways.",
  sol:R`<p><b>Piezoresistive</b> (a load cell with strain gauges). Weight is a steady load; piezoelectric charge leaks away, so it senses only changes.</p><p>Piezoresistance is a change in resistance caused by strain. Passing a current doesn't make the material strain, so the effect doesn't run in reverse. Piezoelectric materials do work both ways.</p>`,
  ans:"Piezoresistive load cell; the effect is one-way", prov:"Worked by Claude; no solution is available."}
],
traps: [
 "Piezoelectric sensors can't measure a steady load: the charge leaks away.",
 "Piezoresistive is sensing only; piezoelectric and electrostatic work both ways.",
 "Foil gauge factor ≈ 2 is geometry; silicon's ~100 comes from the lattice changing carrier mobility.",
 "Quarter-bridge output divides by 4: V_out ≈ V_ex G ε / 4.",
 "Electrostatic force goes as V²/d²: it always attracts, and grows as the gap closes.",
 "Pull-in is at one third of the gap, not when the plates touch.",
 "Shrinking favours electrostatic (∝ s²) over magnetic (∝ s⁴)."
]
});
})();
