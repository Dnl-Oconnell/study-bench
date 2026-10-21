/* MEC1017 — Lecture 7: mechanical vibrations and the beaker suspension design steps */
(function(){
const R = String.raw;
const T = STUDY.content.pd = STUDY.content.pd || { topics: [] };

T.topics.push({
id: "vibration", part: "Spring–damper design", title: "Mechanical Vibrations & Sizing the Beaker Suspension",
lectures: "Lecture 7 – Mechanical Vibrations", status: "lectured",
summary: "Vibration basics and classification, equivalent springs and masses, free undamped and damped response, forced vibration and resonance, then the four-step method for sizing the beaker's springs and dashpot to cut spillage.",
theory: R`
<h3>0. Basics and classification</h3>
<p>Vibration is any motion that repeats after an interval of time. A vibratory system has three elements, each idealised as having only one property:</p>
<div class="tbl"><table class="data">
<tr><th>Element</th><th>Property</th><th>Stores / does</th><th>Assumed to have no</th></tr>
<tr><td>Spring</td><td>Stiffness $k$</td><td>Potential energy</td><td>Mass or damping</td></tr>
<tr><td>Mass (inertia)</td><td>$m$ (or $I$)</td><td>Kinetic energy</td><td>Stiffness or damping</td></tr>
<tr><td>Damper</td><td>Damping $c$</td><td>Dissipates energy</td><td>Mass or stiffness</td></tr>
</table></div>
<div class="tbl"><table class="data">
<tr><th>By</th><th>Types</th></tr>
<tr><td>Excitation</td><td><b>Free</b>: initial disturbance only, no external force (pendulum). <b>Forced</b>: repeating external force (diesel engine). <b>Resonance</b> is when the forcing frequency matches a natural frequency: the most destructive case.</td></tr>
<tr><td>Damping</td><td><b>Undamped</b>: no energy lost. <b>Damped</b>: energy lost to friction or other resistance.</td></tr>
<tr><td>Linearity</td><td><b>Linear</b>: spring, mass and damper all linear. <b>Nonlinear</b>: any one isn't.</td></tr>
<tr><td>Determinism</td><td><b>Deterministic</b>: excitation known at every instant. <b>Random</b>: it can't be predicted.</td></tr>
</table></div>
<p>Analysis procedure: (1) mathematical model, (2) governing equations, (3) solve them, (4) interpret the results.</p>

<h3>1. Equivalent springs and masses</h3>
<p><b>Parallel</b> springs share the displacement: $k_{eq} = k_1 + k_2 + \dots + k_n$. <b>Series</b> springs share the force: $\dfrac1{k_{eq}} = \dfrac1{k_1} + \dfrac1{k_2} + \dots + \dfrac1{k_n}$.</p>
<p><b>Rigid bar on two springs</b>, load $F$ at distances $l_1$, $l_2$ from the springs ($l = l_1 + l_2$): moments give $F_1 = F\,l_2/l$, $F_2 = F\,l_1/l$. Equating strain energy, $\dfrac{1}{k_{eq}} = \dfrac{1}{k_1}\left(\dfrac{l_2}{l}\right)^2 + \dfrac{1}{k_2}\left(\dfrac{l_1}{l}\right)^2$.</p>
<p><b>Masses on a rigid bar pivoted at one end</b>, referred to point A at $l_1$: velocities scale with distance ($\dot x_2 = \dot x_1 l_2/l_1$), and equating kinetic energy gives $m_{eq} = m_1 + m_2\left(\dfrac{l_2}{l_1}\right)^2 + m_3\left(\dfrac{l_3}{l_1}\right)^2$.</p>
<p>A multi-storey frame with light columns is modelled as floor masses joined by column springs.</p>

<h3>2. Free vibration, undamped</h3>
<p>Newton: $m\ddot x + kx = 0$. Characteristic roots $s = \pm i\sqrt{k/m} = \pm i\omega_n$, so</p>
$$x(t) = x_0\cos\omega_n t + \frac{\dot x_0}{\omega_n}\sin\omega_n t = A\sin(\omega_n t + \phi)$$
<p>with $A = \sqrt{x_0^2 + (\dot x_0/\omega_n)^2}$ and $\phi = \tan^{-1}(x_0\omega_n/\dot x_0)$.</p>

<h3>3. Free vibration, damped</h3>
<p>$m\ddot x + c\dot x + kx = 0$, roots $s_{1,2} = -\dfrac{c}{2m} \pm \sqrt{\left(\dfrac{c}{2m}\right)^2 - \dfrac km} = \left(-\zeta \pm \sqrt{\zeta^2 - 1}\right)\omega_n$.</p>
<p><b>Critical damping</b> makes the square root zero: $c_c = 2\sqrt{km} = 2m\omega_n$. <b>Damping ratio</b> $\zeta = c/c_c$.</p>
<div class="tbl"><table class="data">
<tr><th>Case</th><th>Response</th></tr>
<tr><td>Underdamped, $\zeta &lt; 1$</td><td>$x = e^{-\zeta\omega_n t}\left[x_0\cos\omega_d t + \dfrac{\dot x_0 + \zeta\omega_n x_0}{\omega_d}\sin\omega_d t\right]$, $\omega_d = \sqrt{1-\zeta^2}\,\omega_n$: decaying oscillation</td></tr>
<tr><td>Critically damped, $\zeta = 1$</td><td>$x = \left[x_0 + (\dot x_0 + \omega_n x_0)t\right]e^{-\omega_n t}$: fastest return with no oscillation</td></tr>
<tr><td>Overdamped, $\zeta &gt; 1$</td><td>Sum of two decaying exponentials with exponents $(-\zeta \pm \sqrt{\zeta^2-1})\omega_n t$: slow, no oscillation</td></tr>
</table></div>

<h3>4. Forced vibration under a harmonic force</h3>
<p>$m\ddot x + c\dot x + kx = F_0\cos\omega t$. The total solution is homogeneous + particular; the homogeneous (free) part dies out, so the <b>steady state is the particular solution</b>.</p>
<p><b>Undamped</b>: try $x_p = X\cos\omega t$ ⇒ $X = \dfrac{F_0}{k - m\omega^2}$. With $\delta_{st} = F_0/k$ and frequency ratio $r = \omega/\omega_n$, the magnification factor is $\dfrac{X}{\delta_{st}} = \dfrac{1}{1 - r^2}$. For $r &lt; 1$ the motion is in phase; for $r &gt; 1$ it is out of phase and shrinks; at $r = 1$ (<b>resonance</b>) the amplitude grows without limit. Full solution: $x = \left(x_0 - \dfrac{F_0}{k-m\omega^2}\right)\cos\omega_n t + \dfrac{\dot x_0}{\omega_n}\sin\omega_n t + \dfrac{F_0}{k-m\omega^2}\cos\omega t$.</p>
<p><b>Damped</b>: try $x_p = X\cos(\omega t - \phi)$. Substituting and matching the $\cos\omega t$ and $\sin\omega t$ terms gives</p>
$$X = \frac{F_0}{\sqrt{(k-m\omega^2)^2 + (c\omega)^2}},\qquad \phi = \tan^{-1}\frac{c\omega}{k - m\omega^2}$$
$$\frac{X}{\delta_{st}} = \frac{1}{\sqrt{(1-r^2)^2 + (2\zeta r)^2}}$$
<p>Damping caps the resonant peak (lower $\zeta$, taller peak near $r = 1$). All curves start at 1 when $r = 0$ and fall below 1 at high $r$.</p>

<h3>5. Applying it: minimising spillage on the FireFighter</h3>
<p><b>Causes of spillage:</b> sudden cylinder extension and retraction, shocks as grippers engage and release rungs, the suspended beaker oscillating, and sideways tilt and sloshing. The cylinder gives repeated <b>non-harmonic</b> motion with impacts; the beaker sees <b>base excitation</b> from the frame.</p>
<p><b>Model:</b> $m\ddot z + c\dot z + kz = -m\ddot y$, where $y$ is the frame displacement, $x$ the beaker displacement and $z = x - y$ the relative displacement. <b>Design goal:</b> reduce the acceleration reaching the beaker while keeping $z$ within the suspension travel.</p>
<ol class="steps">
<li><b>Mass and travel.</b> $m = m_{water} + m_{beaker} + m_{holder}$ + anything else that moves with it (water 0.50 kg; holder mass from SolidWorks mass properties). Dashpot: 25 mm internal Ø, ≈ 35 mm deep, 0.3 mm piston clearance, pistons 8/10/12/14 mm. Travel $S = 35 - L$ (10 mm piston → 25 mm). Make sure the piston never hits its end stops.</li>
<li><b>Spring stiffness.</b> From an allowable static deflection $\delta$: $k_{req} = mg/\delta$. Four identical springs in parallel: $k_s = k_{req}/4$. Then choose from the catalogue. Example: $m = 0.75$ kg, $\delta = 5$ mm ⇒ $k = 1472$ N/m, $k_s = 368$ N/m = 0.368 N/mm.</li>
<li><b>Damping, natural frequency, damping ratio.</b> Air squeezing through the annular gap gives $F_d = -c\dot z$ with $c = 3\pi\mu l\left(\dfrac{D+w}{w}\right)^3$ ($\mu$ air viscosity, $l$ piston length, $D$ piston Ø, $w$ radial clearance). Then $\omega_n = \sqrt{k/m}$, $f_n = \dfrac{1}{2\pi}\sqrt{k/m}$, $c_c = 2\sqrt{km}$, $\zeta = c/c_c$. Do this for all four piston lengths. Treat $c$ as a theoretical estimate: real air dashpots also have compressibility, pressure-dependent flow and friction.</li>
<li><b>Isolation check.</b> $r = f/f_n$ and $T = \sqrt{\dfrac{1 + (2\zeta r)^2}{(1-r^2)^2 + (2\zeta r)^2}}$. $T &gt; 1$ amplifies, $T = 1$ no reduction, $T &lt; 1$ isolates. Isolation needs $r &gt; \sqrt2 \approx 1.414$.</li>
</ol>
<div class="callout">Trade-off: a softer suspension lowers $f_n$, which pushes the climbing excitation further into the isolation region, but it sags more and uses up dashpot travel.</div>`,
formulas: [
 {name:"Springs", tex:R`k_{par} = \sum k_i,\quad \frac{1}{k_{ser}} = \sum\frac{1}{k_i}`},
 {name:"Natural frequency", tex:R`\omega_n = \sqrt{k/m},\quad f_n = \frac{1}{2\pi}\sqrt{k/m}`},
 {name:"Critical damping, damping ratio", tex:R`c_c = 2\sqrt{km} = 2m\omega_n,\quad \zeta = c/c_c`},
 {name:"Damped natural frequency", tex:R`\omega_d = \omega_n\sqrt{1-\zeta^2}`},
 {name:"Forced amplitude", tex:R`X = \frac{F_0}{\sqrt{(k-m\omega^2)^2+(c\omega)^2}},\ \ \phi = \tan^{-1}\frac{c\omega}{k-m\omega^2}`},
 {name:"Magnification factor", tex:R`\frac{X}{\delta_{st}} = \frac{1}{\sqrt{(1-r^2)^2+(2\zeta r)^2}},\ r = \frac{\omega}{\omega_n}`},
 {name:"Spring for static deflection", tex:R`k_{req} = \frac{mg}{\delta}`},
 {name:"Dashpot travel", tex:R`S = 35 - L\ \text{mm}`},
 {name:"Annular-flow damping", tex:R`c = 3\pi\mu l\left(\frac{D+w}{w}\right)^3`},
 {name:"Transmissibility (base excitation)", tex:R`T = \sqrt{\frac{1+(2\zeta r)^2}{(1-r^2)^2+(2\zeta r)^2}}`, note:"Isolation when r > √2"}
],
questions: [
 {src:"Lecture 7 example", see:[5], q:R`The suspended mass is 0.75 kg and you allow 5 mm of static deflection. What total stiffness is needed, and what rate should each of four identical parallel springs have?`,
  hint:"k = mg/δ, then divide by four.",
  sol:R`<p>$k = \dfrac{0.75 \times 9.81}{0.005} = 1472$ N/m. Four in parallel: $k_s = 1472/4 = 368$ N/m = 0.368 N/mm. Pick the nearest catalogue spring and recheck $\delta$.</p>`,
  ans:"1472 N/m total; 0.368 N/mm each", prov:"From the worked example in Lecture 7."},
 {src:"Practice (Claude)", see:[5], q:R`Continue the example: $k = 1472$ N/m, $m = 0.75$ kg, dashpot bore 25 mm with 0.3 mm radial clearance (so $D = 24.4$ mm). Take $\mu_{air} = 1.81\times10^{-5}$ Pa·s. Find $f_n$, $c_c$, and $c$ and $\zeta$ for each piston length (8, 10, 12, 14 mm). What do you notice?`,
  hint:"(D + w)/w = 24.7/0.3 ≈ 82.3, and it is cubed.",
  sol:R`<p>$\omega_n = \sqrt{1472/0.75} = 44.3$ rad/s, $f_n = 7.05$ Hz. $c_c = 2\sqrt{1472 \times 0.75} = 66.4$ N·s/m.</p>
  <p>$\left(\dfrac{D+w}{w}\right)^3 = (24.7/0.3)^3 = 5.58\times10^5$.</p>
  <div class="tbl"><table class="data num">
  <tr><th>$l$ (mm)</th><th>$c$ (N·s/m)</th><th>$\zeta$</th></tr>
  <tr><td>8</td><td>0.762</td><td>0.011</td></tr>
  <tr><td>10</td><td>0.952</td><td>0.014</td></tr>
  <tr><td>12</td><td>1.14</td><td>0.017</td></tr>
  <tr><td>14</td><td>1.33</td><td>0.020</td></tr>
  </table></div>
  <p>$c$ scales linearly with $l$, but every option is very lightly damped ($\zeta \approx 0.01$–$0.02$). The ideal annular-flow estimate says the air dashpot alone does little, so a near-resonant excitation would be badly amplified. Because $c$ depends on the cube of $1/w$, the clearance matters far more than the piston length. State the radial-vs-diametral clearance assumption and the viscosity value in the portfolio.</p>`,
  ans:"f_n ≈ 7.05 Hz; c_c ≈ 66.4 N·s/m; c ≈ 0.76–1.33 N·s/m, ζ ≈ 0.011–0.020", prov:"Worked by Claude; no solution is available. The air viscosity and the reading of 0.3 mm as radial clearance are assumptions."},
 {src:"Practice (Claude)", see:[5,4], q:R`With $f_n = 7.05$ Hz and $\zeta = 0.014$, find the transmissibility for excitation at 3 Hz, 10 Hz and 15 Hz. Above what frequency is the beaker isolated?`,
  hint:"r = f/f_n; isolation needs r > √2.",
  sol:R`<div class="tbl"><table class="data num">
  <tr><th>$f$ (Hz)</th><th>$r$</th><th>$T$</th><th>Effect</th></tr>
  <tr><td>3</td><td>0.426</td><td>1.22</td><td>Amplified 22%</td></tr>
  <tr><td>10</td><td>1.419</td><td>0.99</td><td>About break-even</td></tr>
  <tr><td>15</td><td>2.128</td><td>0.28</td><td>Isolated (72% cut)</td></tr>
  </table></div>
  <p>Isolation starts at $f &gt; \sqrt2 f_n = 9.97$ Hz. Slow cylinder strokes (a few Hz) sit below resonance and are slightly amplified; the sharp impacts at stroke ends contain higher frequencies, which the suspension does isolate. A softer spring lowers $f_n$ and widens the isolation band.</p>`,
  ans:"T ≈ 1.22, 0.99, 0.28; isolation above ≈ 10 Hz", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Claude)", see:[4], q:R`$m = 2$ kg, $k = 800$ N/m, $F_0 = 50$ N at $\omega = 10$ rad/s. Find the steady-state amplitude (a) undamped, (b) with $c = 40$ N·s/m, and the phase lag in (b).`,
  hint:"ω_n = 20 rad/s, so r = 0.5.",
  sol:R`<p>$\omega_n = \sqrt{800/2} = 20$ rad/s, $r = 0.5$, $\delta_{st} = 50/800 = 62.5$ mm.</p>
  <p>(a) $X = \dfrac{50}{800 - 2(100)} = 83.3$ mm (magnification $1/(1-0.25) = 1.33$).</p>
  <p>(b) $\zeta = 40/(2\sqrt{1600}) = 0.5$. $X = \dfrac{50}{\sqrt{600^2 + 400^2}} = 69.3$ mm; $\phi = \tan^{-1}(400/600) = 33.7°$.</p>`,
  ans:"83.3 mm; 69.3 mm lagging 33.7°", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Claude)", see:[3], q:R`$m = 2$ kg, $k = 800$ N/m, $c = 16$ N·s/m is released from 10 mm with zero velocity. Classify the damping and write $x(t)$.`,
  hint:"ζ = c/(2√(km)).",
  sol:R`<p>$\omega_n = 20$ rad/s, $c_c = 2\sqrt{1600} = 80$, $\zeta = 0.2$: underdamped. $\omega_d = 20\sqrt{1-0.04} = 19.6$ rad/s.</p>
  <p>$C_2 = \dfrac{\dot x_0 + \zeta\omega_n x_0}{\omega_d} = \dfrac{0 + 4(0.01)}{19.6} = 0.00204$ m.</p>
  <p>$x(t) = e^{-4t}\left[0.010\cos19.6t + 0.00204\sin19.6t\right]$ m.</p>`,
  ans:"ζ = 0.2 (underdamped); x = e^{−4t}[0.010 cos 19.6t + 0.00204 sin 19.6t] m", prov:"Worked by Claude; no solution is available."},
 {src:"Practice (Claude)", see:[1], q:R`Springs of 2000 N/m and 3000 N/m: find the equivalent stiffness in parallel and in series.`,
  hint:"Parallel adds; series adds reciprocals.",
  sol:R`<p>Parallel: $2000 + 3000 = 5000$ N/m. Series: $\left(\tfrac1{2000} + \tfrac1{3000}\right)^{-1} = 1200$ N/m. Series is always softer than the softest spring.</p>`,
  ans:"5000 N/m; 1200 N/m", prov:"Worked by Claude; no solution is available."}
],
traps: [
 "Steady-state forced response is the particular solution only; the free part has decayed.",
 "Isolation needs r > √2, not just r > 1. Between 1 and √2 the beaker is still amplified.",
 "Damping helps near resonance but slightly worsens transmissibility in the isolation region.",
 "w in the dashpot formula is the RADIAL clearance and it is cubed: small changes matter a lot.",
 "Dashpot travel is 35 mm minus piston length; static sag plus motion must fit inside it.",
 "Series springs are softer than either spring; parallel springs are stiffer."
]
});
})();
