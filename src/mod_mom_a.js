/* MEC1014 Mechanics of Machines — free vibration (Lecture 1, Tutorials 1–3) */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };

T.topics.push({
id: "undamped", part: "Free vibration", title: "Undamped Free Vibration (SDOF)",
lectures: "Lecture 1 (slides 7–36)", status: "lectured",
summary: "The mass–spring system: equation of motion, natural frequency, how initial displacement and velocity set the amplitude and phase, the energy method, static deflection under gravity, torsional systems and linearising a non-linear spring.",
theory: R`
<h3>0. The mass–spring model</h3>
<p>A mass $m$ (kg) on frictionless rollers, tied to a fixed point by a linear spring of stiffness $k$ (N/m). $x$ is measured from the equilibrium position. Hooke's law: spring force $F = kx$, and it always <b>opposes</b> the displacement.</p>
<p>Newton's 2nd law with the mass displaced in $+x$:</p>
$$-kx = m\ddot x \quad\Rightarrow\quad m\ddot x + kx = 0 \quad\Rightarrow\quad \ddot x + \frac{k}{m}x = 0$$
<div class="callout"><b>Free vibration</b> = the system moves on its own after being disturbed, with no ongoing external force. <b>Forced vibration</b> = an external force keeps driving it (Lecture 2).</div>

<h3>1. Solution and natural frequency</h3>
<p>Try $x = e^{rt}$: $r^2 + k/m = 0 \Rightarrow r = \pm i\sqrt{k/m}$. The real form of the solution is simple harmonic motion:</p>
$$x(t) = A\cos\omega_n t + B\sin\omega_n t,\qquad \omega_n = \sqrt{\frac{k}{m}}\ \text{rad/s}$$
<p>$f_n = \omega_n/2\pi$ (Hz) and the period is $\tau_n = 1/f_n = 2\pi/\omega_n$. The frequency depends only on $m$ and $k$, not on how hard you start it.</p>

<h3>2. Initial conditions, amplitude and phase</h3>
<p>Two constants need two initial conditions, usually $x(0)=x_0$ and $\dot x(0)=v_0$:</p>
<ul>
<li>Displacement only ($v_0=0$): $x = x_0\cos\omega_n t$.</li>
<li>Velocity only ($x_0=0$): $x = \dfrac{v_0}{\omega_n}\sin\omega_n t$.</li>
<li>Both: $x(t) = x_0\cos\omega_n t + \dfrac{v_0}{\omega_n}\sin\omega_n t = A\cos(\omega_n t + \phi)$</li>
</ul>
$$A = \sqrt{x_0^2 + \left(\frac{v_0}{\omega_n}\right)^2},\qquad \phi = \tan^{-1}\!\left(\frac{-v_0}{\omega_n x_0}\right)$$
<p>On a phasor diagram the real part is $x_0$ and the imaginary part is $v_0/\omega_n$; the phase angle sets where in the cycle the motion starts. Velocity and acceleration follow by differentiating: $v = -A\omega_n\sin(\omega_n t+\phi)$, $a = -A\omega_n^2\cos(\omega_n t+\phi) = -\omega_n^2 x$.</p>
<div class="callout key"><b>Peak values:</b> $v_{max} = A\omega_n$ and $a_{max} = A\omega_n^2$. Questions asking you to "plot displacement and velocity" want these two amplitudes and the 90° shift between them.</div>

<h3>3. Energy method</h3>
<p>With only a mass and a spring, energy is conserved: $KE + PE = $ constant, so $\frac{d}{dt}(KE+PE)=0$ and $PE_{max} = KE_{max}$.</p>
$$\frac{d}{dt}\left(\tfrac12 m\dot x^2 + \tfrac12 kx^2\right) = \dot x(m\ddot x + kx) = 0 \;\Rightarrow\; m\ddot x + kx = 0$$
<p>Strain energy stored in the spring is the area under the force–extension line: $\tfrac12 kX^2$.</p>

<h3>4. Gravity and static deflection</h3>
<p>Hang the mass vertically and the spring stretches by $\delta_{st}$ until $k\delta_{st} = mg$. Measuring $x$ from this <b>static equilibrium</b> position, gravity and the static spring force cancel and the equation of motion is unchanged: $m\ddot x + kx = 0$.</p>
$$k = \frac{mg}{\delta_{st}} \qquad\Rightarrow\qquad \omega_n = \sqrt{\frac{g}{\delta_{st}}}$$
<div class="callout"><b>Key point:</b> a static load moves the equilibrium position but does not change the oscillation.</div>

<h3>5. Torsional systems</h3>
<p>Same maths with rotation: inertia $I$ (kg·m²) replaces $m$, torsional stiffness $K_\theta$ (N·m/rad) replaces $k$:</p>
$$I\ddot\theta + K_\theta\theta = 0,\qquad \omega_n = \sqrt{K_\theta/I}$$
<p>For a lever, a spring at distance $l$ from the pivot gives $K_\theta = kl^2$ (force $kl\theta$ times arm $l$); a point mass at $l$ adds $ml^2$ to $I$; a uniform rod about its end has $I = ml^2/3$.</p>

<h3>6. Linearising a non-linear spring</h3>
<p>If the restoring force isn't linear in displacement, find the equilibrium position, then use the <b>local slope</b> as the stiffness for small vibrations: $k = \left|dF/dY\right|$ at equilibrium.</p>
<p><b>Lecture example (piston):</b> $m = 90$ kg, net gas force $F = 780/Y - 3000$ N, $g = 10$. Equilibrium: $780/Y - 3000 = 900 \Rightarrow Y = 0.2$ m. Stiffness: $dF/dY = -780/Y^2 = -19\,500$ N/m, so $k = 19.5$ kN/m and $\omega_n = \sqrt{19500/90} = 14.72$ rad/s. Displaced 2 mm down and released: $y(t) = -0.002\cos(14.72t)$ m.</p>

<h3>7. Properties of undamped systems</h3>
<ul>
<li>Conservative: no energy is lost, so it would oscillate forever (almost impossible in real machines).</li>
<li>Frequency depends only on stiffness and mass.</li>
<li>Two independent initial conditions fix the exact response.</li>
</ul>`,
formulas: [
 {name:"Equation of motion", tex:R`m\ddot x + kx = 0`},
 {name:"Natural frequency", tex:R`\omega_n = \sqrt{k/m},\quad f_n = \frac{\omega_n}{2\pi},\quad \tau_n = \frac{2\pi}{\omega_n}`},
 {name:"Free response", tex:R`x(t) = x_0\cos\omega_n t + \frac{v_0}{\omega_n}\sin\omega_n t`},
 {name:"Amplitude and phase", tex:R`A=\sqrt{x_0^2+(v_0/\omega_n)^2},\ \ \phi=\tan^{-1}\frac{-v_0}{\omega_n x_0}`, note:"x(t) = A cos(ω_n t + φ)"},
 {name:"Static deflection", tex:R`k\delta_{st} = mg,\quad \omega_n=\sqrt{g/\delta_{st}}`},
 {name:"Torsional", tex:R`I\ddot\theta + K_\theta\theta = 0,\quad K_\theta = kl^2`},
 {name:"Rod about its end", tex:R`I = \tfrac13 ml^2`}
],
questions: [
 {src:"Tutorial 1 Q1", see:[4,1,2], q:R`A mass of 38 kg is suspended by a spring that deflects by 1 mm when the mass is attached. Calculate the natural frequency of oscillation. The mass is pulled down by 5 mm and held until released at $t = 0$. Give the period, amplitude, equation of motion and response, and the velocity equation.`,
  hint:"Static deflection gives k (k δ = mg). Released from rest means the amplitude is the initial pull and the response is a pure cosine.",
  sol:R`<p>$k = mg/\delta_{st} = 38(9.81)/0.001 = 372\,780$ N/m.</p>
  <p>$\omega_n = \sqrt{372780/38} = 99.05$ rad/s, $f_n = 99.05/2\pi = 15.76$ Hz, $\tau = 1/15.76 = 0.0634$ s.</p>
  <p>Released from rest, so $A = x_0 = 5$ mm and $\phi = 0$.</p>
  <p>Equation of motion: $38\ddot x + 372\,780x = 0$. Response (down positive): $x(t) = 5\cos(99.05t)$ mm.</p>
  <p>Velocity: $v(t) = -5(99.05)\sin(99.05t) = -495\sin(99.05t)$ mm/s, so the peak speed is about 0.50 m/s, 90° out of step with the displacement.</p>`,
  ans:"ω_n = 99.05 rad/s (15.76 Hz), τ = 0.063 s, x = 5 cos(99.05t) mm", prov:"Follows the posted solution."},
 {src:"Tutorial 1 Q2", see:[1,2], q:R`A small spring is fixed at one end; the bolt on the free end has mass 49.2 g and the spring stiffness is 857.8 N/m. Find the natural period and frequency. Find the response and its maximum amplitude if the spring is held displaced 10 mm and, at release ($t=0$), given an initial velocity of 1.5 m/s in the positive direction.`,
  hint:"Use x(t) = x₀ cos ω_n t + (v₀/ω_n) sin ω_n t, then combine the two parts with Pythagoras for the amplitude.",
  sol:R`<p>$\omega_n = \sqrt{857.8/0.0492} = 132.04$ rad/s, $f_n = 21.02$ Hz, $\tau = 0.0476$ s.</p>
  <p>$x(t) = 0.01\cos(132.04t) + \dfrac{1.5}{132.04}\sin(132.04t) = 0.01\cos(132.04t) + 0.01136\sin(132.04t)$ m</p>
  <p>$A = \sqrt{0.01^2 + 0.01136^2} = 0.01513$ m $= 15.1$ mm.</p>
  <p>$\phi = \tan^{-1}(-1.5/(132.04 \times 0.01)) = \tan^{-1}(-1.136) = -0.849$ rad, so $x(t) = 15.13\cos(132.04t - 0.849)$ mm.</p>`,
  ans:"τ = 0.0476 s, f = 21.0 Hz, A = 15.1 mm", prov:"Follows the posted solution."},
 {src:"Lecture 1 example (piston)", see:[6], q:R`The piston and load have total mass 90 kg. The net upward force from the gas and atmosphere is $780/Y - 3000$ N, where $Y$ is in metres. Take $g = 10$ m/s². Find the frequency of small vibrations about equilibrium, and the motion if the piston is pushed down 2 mm and released from rest.`,
  hint:"Find Y at equilibrium (gas force = weight), then stiffness = slope dF/dY there.",
  sol:R`<p>Equilibrium: $780/Y - 3000 = 900 \Rightarrow Y = 0.2$ m.</p>
  <p>$k = \left|\dfrac{d}{dY}\left(\dfrac{780}{Y}\right)\right| = \dfrac{780}{0.2^2} = 19\,500$ N/m.</p>
  <p>$\omega_n = \sqrt{19500/90} = 14.72$ rad/s ($f_n = 2.34$ Hz).</p>
  <p>$y(0) = -0.002$ m, $\dot y(0) = 0$: $y(t) = -0.002\cos(14.72t)$ m.</p>`,
  ans:"ω_n = 14.72 rad/s; y = −2 cos(14.72t) mm", prov:"From the worked example in Lecture 1."},
 {src:"Lecture 1 homework", see:[2], q:R`$m = 0.1$ kg, $k = 10$ N/m. The phasor diagram shows amplitude 0.2 m at a phase of 30° at $t = 0$, i.e. $x = 0.2\cos(\omega_n t + 30^\circ)$. How long until the mass first reaches its maximum displacement?`,
  hint:"The first maximum is when the cosine's argument reaches 2π (360°).",
  sol:R`<p>$\omega_n = \sqrt{10/0.1} = 10$ rad/s.</p>
  <p>Maximum when $\omega_n t + 30^\circ = 360^\circ$, so $\omega_n t = 330^\circ = 5.760$ rad.</p>
  <p>$t = 5.760/10 = 0.576$ s.</p>`,
  ans:"t ≈ 0.576 s", prov:"Worked by Claude. The lecture sets this as homework with no answer."}
],
traps: [
 "ω_n is in rad/s. Convert to Hz by dividing by 2π, and the period is 2π/ω_n, not 1/ω_n.",
 "Measure x from the static equilibrium position: gravity then drops out of the equation of motion.",
 "Use SI units throughout: grams → kg, mm → m before taking square roots.",
 "The amplitude with both initial conditions is √(x₀² + (v₀/ω_n)²), not x₀ + v₀/ω_n.",
 "For a lever, a spring at distance l contributes k·l² to the torsional stiffness, not k·l."
]
});

T.topics.push({
id: "viscous", part: "Free vibration", title: "Viscous Damping & Logarithmic Decrement",
lectures: "Lecture 1 (slides 37–52)", status: "lectured",
summary: "Adding a dashpot: the damped equation of motion, critical damping and the damping ratio, under/critically/over-damped response, the damped natural frequency, and getting ζ from a measured decay with the logarithmic decrement.",
theory: R`
<h3>0. Viscous damping</h3>
<p>Real mechanical systems lose energy each cycle (friction, internal strain, fluid). A <b>dashpot</b> forces a plate through a fluid; its force is proportional to velocity and opposes it:</p>
$$F_c = c\dot x \qquad (c \text{ in N·s/m})$$
<p>Newton's 2nd law: $m\ddot x = -c\dot x - kx$, so</p>
$$m\ddot x + c\dot x + kx = 0$$

<h3>1. Characteristic equation and critical damping</h3>
<p>Try $x = Xe^{st}$: $ms^2 + cs + k = 0$, so $s_{1,2} = \dfrac{-c \pm \sqrt{c^2-4mk}}{2m}$. The term under the root decides the behaviour:</p>
<div class="tbl"><table class="data">
<tr><th>Case</th><th>Condition</th><th>Roots</th><th>Response</th></tr>
<tr><td>Underdamped</td><td>$c^2 < 4mk$ ($0<\zeta<1$)</td><td>complex conjugates</td><td>Decaying oscillation</td></tr>
<tr><td>Critically damped</td><td>$c^2 = 4mk$ ($\zeta = 1$)</td><td>real, repeated</td><td>Fastest return with no overshoot</td></tr>
<tr><td>Overdamped</td><td>$c^2 > 4mk$ ($\zeta>1$)</td><td>real, distinct</td><td>Slow, non-oscillatory creep back</td></tr>
</table></div>
$$c_{cr} = 2\sqrt{mk} = 2m\omega_n,\qquad \zeta = \frac{c}{c_{cr}} = \frac{c}{2\sqrt{mk}} = \frac{c}{2m\omega_n}$$
<p>With these, $s_{1,2} = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}$.</p>

<h3>2. Underdamped response</h3>
$$x(t) = Ae^{-\zeta\omega_n t}\sin(\omega_d t + \phi),\qquad \omega_d = \omega_n\sqrt{1-\zeta^2}$$
<p>Equivalently $x(t) = e^{-\zeta\omega_n t}\left[B_1\cos\omega_d t + B_2\sin\omega_d t\right]$ with $B_1 = x_0$ and $B_2 = (v_0 + \zeta\omega_n x_0)/\omega_d$.</p>
<p>From initial conditions:</p>
$$A = \sqrt{x_0^2 + \left(\frac{v_0 + \zeta\omega_n x_0}{\omega_d}\right)^2},\qquad \phi = \tan^{-1}\frac{\omega_d x_0}{v_0 + \zeta\omega_n x_0}$$
<p>The envelope $\pm Ae^{-\zeta\omega_n t}$ bounds the peaks. The damped period is $\tau_d = 2\pi/\omega_d$, and $\omega_d < \omega_n$.</p>

<h3>3. Logarithmic decrement</h3>
<p>Successive peaks are one damped period apart, so their ratio is constant:</p>
$$\delta = \ln\frac{A_0}{A_1} = \zeta\omega_n\tau_d = \frac{2\pi\zeta}{\sqrt{1-\zeta^2}} \qquad\Leftrightarrow\qquad \zeta = \frac{\delta}{\sqrt{4\pi^2+\delta^2}}$$
<p>Over $n$ cycles: $n\delta = \ln(A_0/A_n)$. Using several cycles is more accurate than two neighbouring peaks. For small damping, $\zeta \approx \delta/2\pi$.</p>
<div class="callout key"><b>From a measured decay plot:</b> (1) read two peaks $n$ cycles apart → $\delta$; (2) $\zeta = \delta/\sqrt{4\pi^2+\delta^2}$; (3) time between them / $n$ → $\tau_d$ → $\omega_d$; (4) $\omega_n = \omega_d/\sqrt{1-\zeta^2}$; (5) $k = m\omega_n^2$, $c = 2\zeta m\omega_n$.</div>
<p>A half-cycle version is also used: peak-to-trough over half a cycle gives $\ln(X_1/X_{1.5}) = \delta/2$.</p>

<h3>4. Settling time</h3>
<p>The envelope falls to a fraction $p$ of its start when $e^{-\zeta\omega_n t} = p$, i.e. $t = \ln(1/p)/(\zeta\omega_n)$. In cycles: $n = \ln(1/p)/\delta$, and $t = n\tau_d$. These are the same thing.</p>

<h3>5. Energy lost per cycle</h3>
<p>With $x = X\sin\omega t$ the force–displacement plot of a spring plus dashpot is an ellipse. Its area is the energy dissipated per cycle:</p>
$$\Delta W = \oint F\,dx = \pi c\omega X^2$$

<h3>6. Rotational systems with damping</h3>
<p>Take moments about the pivot. A damper at arm $l_1$ gives damping torque $c l_1^2\dot\theta$; a spring at $l_3$ gives $kl_3^2\theta$:</p>
$$I\ddot\theta + C_\theta\dot\theta + K_\theta\theta = 0,\quad \zeta = \frac{C_\theta}{2\sqrt{IK_\theta}}$$`,
formulas: [
 {name:"Equation of motion", tex:R`m\ddot x + c\dot x + kx = 0`},
 {name:"Critical damping", tex:R`c_{cr} = 2\sqrt{mk} = 2m\omega_n`},
 {name:"Damping ratio", tex:R`\zeta = \frac{c}{c_{cr}} = \frac{c}{2\sqrt{mk}}`},
 {name:"Damped natural frequency", tex:R`\omega_d = \omega_n\sqrt{1-\zeta^2}`},
 {name:"Underdamped response", tex:R`x = Ae^{-\zeta\omega_n t}\sin(\omega_d t + \phi)`},
 {name:"Log decrement", tex:R`\delta = \ln\frac{A_0}{A_1} = \frac{2\pi\zeta}{\sqrt{1-\zeta^2}}`, note:"n cycles: nδ = ln(A₀/A_n)"},
 {name:"ζ from δ", tex:R`\zeta = \frac{\delta}{\sqrt{4\pi^2+\delta^2}} \approx \frac{\delta}{2\pi}`},
 {name:"Energy per cycle", tex:R`\Delta W = \pi c\omega X^2`}
],
questions: [
 {src:"Tutorial 2 Q1", see:[1,2], q:R`$m = 49.2$ g, $k = 857.8$ N/m, $c = 0.11$ N·s/m, $x(0) = 10$ mm, $v_0 = 0$. Calculate the damping ratio, say whether the system is under-, over- or critically damped, and write the response.`,
  hint:"ζ = c / (2√(km)). If ζ < 1 use x = e^(−ζω_n t)[B₁ cos ω_d t + B₂ sin ω_d t] with B₁ = x₀.",
  sol:R`<p>$c_{cr} = 2\sqrt{857.8 \times 0.0492} = 12.99$ N·s/m, so $\zeta = 0.11/12.99 = 0.00847$. <b>Underdamped</b> (very lightly).</p>
  <p>$\omega_n = \sqrt{857.8/0.0492} = 132.04$ rad/s, $\zeta\omega_n = 1.118$ s⁻¹, $\omega_d = 132.04\sqrt{1-0.00847^2} = 132.04$ rad/s.</p>
  <p>$B_1 = 0.01$, $B_2 = \zeta\omega_n x_0/\omega_d = 1.118(0.01)/132.04 = 8.5\times10^{-5}$ m.</p>
  <p>$$x(t) = e^{-1.118t}\left[0.01\cos(132.0t) + 8.5\times10^{-5}\sin(132.0t)\right]\ \text{m}$$</p>
  <p>Damping this light barely changes the frequency; it just makes the amplitude decay slowly (to 1% after about $\ln 100/1.118 = 4.1$ s).</p>`,
  ans:"ζ ≈ 0.0085, underdamped", prov:"Worked by Claude. The posted solution uses different numbers (m = 100 g, k = 1000 N/m, c = 2 N·s/m, giving ζ = 0.1) than the question sheet; this solves the sheet's numbers with the same method."},
 {src:"Tutorial 2 Q2", fig:"mom_lever", see:[6], q:R`For the system in Figure 1, take rotations about the pivot and write the equation of motion ($I_{rod} = ml_4^2/3$). Find the natural frequency and damping ratio for $M = 3$ kg, $m = 250$ g, $l_1 = 100$ mm (damper), $l_2 = 200$ mm (mass $M$), $l_3 = 300$ mm (spring), $l_4 = 400$ mm (rod length), $c = 0.2$ N·s/m, $K = 180$ N/m.`,
  hint:"Each element's linear motion is (its distance from the pivot) × θ. Springs and dampers then contribute (coefficient) × (distance)².",
  sol:R`<p>$I = Ml_2^2 + \dfrac{ml_4^2}{3} = 3(0.2)^2 + \dfrac{0.25(0.4)^2}{3} = 0.12 + 0.01333 = 0.1333$ kg·m²</p>
  <p>$K_\theta = Kl_3^2 = 180(0.3)^2 = 16.2$ N·m/rad, $C_\theta = cl_1^2 = 0.2(0.1)^2 = 0.002$ N·m·s/rad</p>
  <p>$$0.1333\ddot\theta + 0.002\dot\theta + 16.2\theta = 0$$</p>
  <p>$\omega_n = \sqrt{16.2/0.1333} = 11.02$ rad/s ($f_n = 1.75$ Hz)</p>
  <p>$\zeta = \dfrac{0.002}{2\sqrt{0.1333 \times 16.2}} = 6.8\times10^{-4}$: extremely light damping.</p>`,
  ans:"ω_n = 11.02 rad/s, ζ ≈ 0.00068", prov:"Follows the posted solution."},
 {src:"Tutorial 2 Q3", fig:"mom_decay", see:[3], q:R`From the recorded response in Figure 2, determine the stiffness and damping if the block's mass is 25 kg.`,
  hint:"Read the first peak and a peak a few cycles later. Count the cycles between them for both δ and τ_d.",
  sol:R`<p>Peaks: $A_0 = 0.0100$ m at $t=0$ and $A_3 = 0.0005$ m at $t = 0.15$ s (three cycles later).</p>
  <p>$\delta = \tfrac13\ln(0.01/0.0005) = 0.999$, so $\zeta = 0.999/\sqrt{4\pi^2 + 0.999^2} = 0.157$.</p>
  <p>$\tau_d = 0.15/3 = 0.05$ s → $\omega_d = 2\pi/0.05 = 125.7$ rad/s → $\omega_n = 125.7/\sqrt{1-0.157^2} = 127.2$ rad/s.</p>
  <p>$k = m\omega_n^2 = 25(127.2)^2 = 4.05\times10^5$ N/m</p>
  <p>$c = 2\zeta m\omega_n = 2(0.157)(25)(127.2) \approx 999$ N·s/m</p>`,
  ans:"k ≈ 405 kN/m, c ≈ 1.0 kN·s/m", prov:"Follows the posted solution (which rounds c to 992 N·s/m)."},
 {src:"Tutorial 3 Q1", see:[1,2,3,4], q:R`The 38 kg mass on the spring from Tutorial 1 (1 mm static deflection) now has a viscous damper in parallel. Find the natural frequency, critical damping, the damping coefficient, damped frequency and log decrement for $\zeta = 0.2$. It is pulled down 5 mm and released. How long until it stays within 1% of the initial displacement? Write the response.`,
  hint:"1% of the start means the envelope e^(−ζω_n t) = 0.01. Or count cycles: n = ln(100)/δ.",
  sol:R`<p>$k = 372.78$ kN/m, $\omega_n = 99.0$ rad/s, $f_n = 15.76$ Hz.</p>
  <p>$c_{cr} = 2\sqrt{km} = 2\sqrt{372780 \times 38} = 7527$ N·s/m, so $c = 0.2c_{cr} = 1505$ N·s/m.</p>
  <p>$\omega_d = 99.0\sqrt{1-0.04} = 97.0$ rad/s; $\delta = 2\pi(0.2)/\sqrt{0.96} = 1.28$.</p>
  <p>Cycles to 1%: $n = \ln 100/1.28 = 3.59$; $t = n\tau_d = 3.59 \times 2\pi/97.0 = 0.23$ s. (Same as $\ln 100/\zeta\omega_n = 4.605/19.8$.)</p>
  <p>Response with $x_0 = 5$ mm, $v_0 = 0$: $\zeta\omega_n = 19.8$ s⁻¹, $A = \sqrt{5^2 + (19.8 \times 5/97.0)^2} = 5.10$ mm, $\phi = \tan^{-1}(97.0/19.8) = 1.37$ rad:</p>
  <p>$$x(t) = 5.10\,e^{-19.8t}\sin(97.0t + 1.37)\ \text{mm}$$</p>`,
  ans:"c_cr = 7.53 kN·s/m, c = 1.51 kN·s/m, ω_d = 97 rad/s, δ = 1.28, t ≈ 0.23 s", prov:"Follows the posted solution; the response amplitude and phase were added by Claude."},
 {src:"Tutorial 3 Q2", fig:"mom_moto", see:[3,2,1], q:R`Design an underdamped shock absorber for a 200 kg motorcycle. After a bump (an initial velocity) the damped period is to be 2 s and the amplitude $x_1$ should fall to ¼ over half a cycle. Find $k$ and $c$, and the minimum initial velocity that gives a maximum displacement of 250 mm.`,
  hint:"Half a cycle gives ln(x₁/x₁.₅) = δ/2. For the velocity, the response is x = A e^(−ζω_n t) sin(ω_d t) with A = v₀/ω_d. Find when it peaks.",
  sol:R`<p>$\omega_d = 2\pi/2 = \pi$ rad/s. $\delta = 2\ln 4 = 2.773$, so $\zeta = 2.773/\sqrt{4\pi^2 + 2.773^2} = 0.404$.</p>
  <p>$\omega_n = \pi/\sqrt{1-0.404^2} = 3.43$ rad/s.</p>
  <p>$k = m\omega_n^2 = 200(3.43)^2 = 2358$ N/m, $c = 2\zeta m\omega_n = 2(0.404)(200)(3.43) = 554$ N·s/m.</p>
  <p>Starting from $x=0$ with velocity $v_0$: $x = Ae^{-\zeta\omega_n t}\sin\omega_d t$. Setting $\dot x = 0$: $\tan\omega_d t = \omega_d/(\zeta\omega_n) = \pi/1.386 = 2.27$, so $\omega_d t = 1.155$ rad and $t = 0.368$ s.</p>
  <p>$0.25 = Ae^{-1.386(0.368)}\sin(1.155) = A(0.601)(0.915) \Rightarrow A = 0.455$ m.</p>
  <p>$v_0 = A\omega_d = 0.455\pi = 1.43$ m/s.</p>`,
  ans:"k ≈ 2.36 kN/m, c ≈ 554 N·s/m, v₀ ≈ 1.43 m/s", prov:"Worked by Claude and checked in code. The posted solution has k = 48.5 N/m (it takes a square root by mistake: k = mω_n² = 2358 N/m) and gives A = 372 mm, v₀ = 1.169 m/s, which don't satisfy its own peak equation. The method above is the same as the posted one."}
],
traps: [
 "ζ = c/(2√(km)), not c/√(km). Critical damping is 2√(km).",
 "The damped frequency is lower than ω_n. Periods read off a decay plot give ω_d, so convert to ω_n before finding k.",
 "Count cycles carefully: n peaks apart means nδ = ln(A₀/A_n). Half a cycle (peak to trough) is δ/2.",
 "Use the exact ζ = δ/√(4π² + δ²) unless damping is clearly small. δ/2π overestimates ζ for heavy damping.",
 "The 1% settling time comes from the envelope e^(−ζω_n t), not from the cosine term."
]
});

T.topics.push({
id: "coulomb", part: "Free vibration", title: "Coulomb (Dry Friction) & Hysteretic Damping",
lectures: "Lecture 1 (slides 53–72)", status: "lectured",
summary: "Dry friction: constant-magnitude force, linear amplitude decay, the dead zone and where the system stops. Hysteretic (material) damping: loop area, the equivalent viscous coefficient and the link to δ and ζ.",
theory: R`
<h3>0. Coulomb damping: the force</h3>
<p>Dry friction has constant magnitude $\mu N$ and always <b>opposes velocity</b>. Its direction flips at every peak and trough, so the equation changes every half-cycle:</p>
<div class="tbl"><table class="data">
<tr><th>Half-cycle</th><th>Equation</th><th>Temporary equilibrium</th></tr>
<tr><td>Moving in −x (negative velocity)</td><td>$m\ddot x + kx = +\mu N$</td><td>$x = +\mu N/k$</td></tr>
<tr><td>Moving in +x (positive velocity)</td><td>$m\ddot x + kx = -\mu N$</td><td>$x = -\mu N/k$</td></tr>
</table></div>
<p>Each half-cycle is a cosine about its own offset equilibrium at the <b>undamped</b> frequency $\omega_n = \sqrt{k/m}$. Friction does not change the frequency.</p>

<h3>1. Linear decay</h3>
<p>Starting from rest at $x_0$, after one half-cycle (time $\pi/\omega_n$) the mass reaches $-\left(x_0 - 2\mu N/k\right)$.</p>
$$\text{loss per half-cycle} = \frac{2\mu N}{k},\qquad \text{loss per full cycle} = \frac{4\mu N}{k}$$
<p>The peaks lie on <b>straight lines</b>, not an exponential. That is how you tell Coulomb damping from viscous damping on a plot. Slope of the envelope: $-4\mu N/(k\tau_n) = -4\mu N\omega_n/(2\pi k)$ per second.</p>

<h3>2. Dead zone and stopping</h3>
<p>Once the amplitude at a turning point satisfies $k|x| \le \mu N$, the spring can't overcome friction and the mass stops. It stops <b>inside the band $|x| \le \mu N/k$</b>, generally not at the original equilibrium.</p>
$$n_r = \frac{X_0 - \mu N/k}{2\mu N/k} = \frac12\left(\frac{kX_0}{\mu N} - 1\right)\ \text{half-cycles (round up)}$$
<p><b>Lecture example:</b> $X_0 = 10$ mm, $k = 10\,000$ N/m, $m = 1$ kg, $\mu = 0.12$, $g = 10$. Dead zone $\mu N/k = 0.12$ mm, loss per half-cycle 0.24 mm, $n_r = (10-0.12)/0.24 = 41.2$ half-cycles.</p>

<h3>3. Summary of Coulomb damping</h3>
<ul>
<li>Force constant, opposes velocity, flips at each extreme.</li>
<li>No effect on frequency.</li>
<li>Non-linear: the equation alternates every half-cycle.</li>
<li>Amplitude falls linearly by $4\mu N/k$ per cycle.</li>
<li>Stops when amplitude &lt; $\mu N/k$, displaced from the natural equilibrium.</li>
</ul>

<h3>4. Hysteretic (structural) damping</h3>
<p>Energy lost inside the material as it is cyclically strained (dislocation movement, internal friction). It appears as a hysteresis loop on the load–deflection plot and the lost energy shows up as heat. Experiments show the loss per cycle is <b>independent of frequency</b> and proportional to amplitude squared:</p>
$$\Delta W = \pi hX^2 \quad (h \text{ in N/m})$$
<p>Equating to the viscous loss $\pi c\omega X^2$ gives an equivalent viscous coefficient:</p>
$$c_{eq} = \frac{h}{\omega}$$
<p>The spring and hysteretic damper together act as a <b>complex stiffness</b> $k + ih$.</p>

<h3>5. δ and ζ for hysteretic damping</h3>
$$\delta = \frac{\pi h}{k},\qquad \zeta = \frac{h}{2k},\qquad \beta = \frac{h}{k}\ \text{(hysteretic damping constant, dimensionless)}$$
<p>For small damping $\omega_d \approx \omega_n$, so $c_{eq} = h/\omega_n$ at the natural frequency.</p>
<p><b>Reading a measured loop:</b> energy per cycle = area inside the loop; $k$ = slope of the loop's mean line; then $h = \Delta W/(\pi X^2)$. Lecture example: area 36 N·m at $X = 20$ mm gives $h = 28.65$ kN/m; with $k = 250$ kN/m, $\delta = 0.36$ and $\zeta = 0.057$.</p>`,
formulas: [
 {name:"Coulomb equation", tex:R`m\ddot x + kx = \mp\mu N`, note:"Sign opposes the velocity"},
 {name:"Loss per half-cycle", tex:R`\Delta = \frac{2\mu N}{k}`},
 {name:"Loss per cycle", tex:R`\frac{4\mu N}{k}`},
 {name:"Dead zone", tex:R`|x| \le \frac{\mu N}{k}`},
 {name:"Half-cycles to rest", tex:R`n_r = \frac12\left(\frac{kX_0}{\mu N} - 1\right)`},
 {name:"Hysteretic energy loss", tex:R`\Delta W = \pi hX^2`},
 {name:"Equivalent viscous", tex:R`c_{eq} = h/\omega`},
 {name:"Hysteretic δ and ζ", tex:R`\delta = \frac{\pi h}{k},\quad \zeta = \frac{h}{2k}`}
],
questions: [
 {src:"Tutorial 3 Q4", see:[0,1,2], q:R`A 10 kg mass slides on a surface with constant dry friction, attached to a wall by a 1000 N/m spring. It is pulled 50 mm right and released from rest; in the first half-cycle it reaches −40 mm. Find (a) $\omega_n$ and the period, (b) the friction force, (c) the amplitude at the end of the second full cycle, (d) how many half-cycles it executes and where it stops.`,
  hint:"Friction doesn't change ω_n. The loss per half-cycle 2F/k comes straight from 50 → 40 mm.",
  sol:R`<p>(a) $\omega_n = \sqrt{1000/10} = 10$ rad/s, $\tau_n = 2\pi/10 = 0.628$ s.</p>
  <p>(b) $50 - 40 = 10$ mm $= 2F_f/k \Rightarrow F_f = 0.01(1000)/2 = 5$ N.</p>
  <p>(c) Loss per cycle $= 4F_f/k = 20$ mm, so after two cycles: $50 - 40 = 10$ mm.</p>
  <p>(d) Dead zone: $F_f/k = 5$ mm. Turning points: 50, −40, 30, −20, 10 mm. At 10 mm the spring force (10 N) still beats friction (5 N), so it moves once more and reaches $-(10-10) = 0$ mm. That is inside the dead zone, so it stops.</p>
  <p>$n_r = \tfrac12(kX_0/F_f - 1) = \tfrac12(10-1) = 4.5$, so it completes <b>5 half-cycles</b> and comes to rest at the original equilibrium (0 mm), after $5 \times 0.314 = 1.57$ s.</p>`,
  ans:"ω_n = 10 rad/s, τ = 0.628 s; F = 5 N; 10 mm; 5 half-cycles, stops at 0 mm", prov:"Follows the posted solution."},
 {src:"Tutorial 3 Q3", fig:"mom_motor", see:[1,0], q:R`An electric motor of weight 500 N on two different foundations gives the free-vibration traces in Figures 2 and 3. For each, identify the damping type, the spring constant and damping coefficient, and the undamped and damped natural frequencies.`,
  hint:"Exponential envelope → viscous (use δ). Straight-line envelope → Coulomb (frequency unaffected; drop per half-cycle is 2μN/k).",
  sol:R`<p>$m = 500/9.81 = 50.97$ kg.</p>
  <p><b>Figure 2: viscous</b> (exponential envelope). Peaks 8 → 2 over two cycles: $2\delta = \ln 4 \Rightarrow \delta = 0.693$, $\zeta = 0.693/\sqrt{4\pi^2 + 0.693^2} = 0.110$.</p>
  <p>Two cycles in 0.35 s: $\tau_d = 0.175$ s, $\omega_d = 35.9$ rad/s, $\omega_n = 35.9/\sqrt{1-0.11^2} = 36.1$ rad/s.</p>
  <p>$k = m\omega_n^2 = 50.97(36.1)^2 \approx 66.5$ kN/m; $c = 2\zeta m\omega_n \approx 404$ N·s/m.</p>
  <p><b>Figure 3: Coulomb</b> (straight-line envelope). Three cycles in 0.55 s: $\tau_n = 0.183$ s, $\omega_n = \omega_d = 34.3$ rad/s (friction doesn't change frequency).</p>
  <p>$k = 50.97(34.3)^2 \approx 60.1$ kN/m.</p>
  <p>Peak 0 at 0.008 m, next trough at −0.007 m: $2\mu N/k = 0.001$ m, so $\mu N = 0.001(60\,071)/2 = 30$ N, and $\mu = 30/500 = 0.06$.</p>`,
  ans:"Viscous: k ≈ 66.5 kN/m, c ≈ 404 N·s/m, ω_n ≈ 36.1, ω_d ≈ 35.9 rad/s. Coulomb: k ≈ 60.1 kN/m, μN ≈ 30 N, ω_n = ω_d ≈ 34.3 rad/s", prov:"Follows the posted solution (values read from the figures)."},
 {src:"Tutorial 3 Q5", see:[4,5], q:R`A fibre-reinforced composite panel behaves as a single DOF system with $m = 1$ kg and $k = 2$ N/m. The ratio of successive amplitudes is 1.1. Find the hysteretic damping constant $\beta$, the equivalent viscous damping $c_{eq}$, and the energy lost per cycle at an amplitude of 10 mm.`,
  hint:"δ = ln 1.1, and for hysteretic damping δ = πh/k.",
  sol:R`<p>$\delta = \ln 1.1 = 0.0953$.</p>
  <p>$h = \delta k/\pi = 0.0953(2)/\pi = 0.0607$ N/m; $\beta = h/k = 0.0304$.</p>
  <p>$\omega_n = \sqrt{2/1} = 1.414$ rad/s, $c_{eq} = h/\omega_n = 0.0429$ N·s/m.</p>
  <p>$\Delta W = \pi hX^2 = \pi(0.0607)(0.01)^2 = 1.91\times10^{-5}$ J.</p>`,
  ans:"β = 0.0304, c_eq = 0.0429 N·s/m, ΔW = 1.91×10⁻⁵ J", prov:"Follows the posted solution."},
 {src:"Lecture 1 sample problem", see:[2], q:R`A 1 kg block on a surface with $\mu = 0.12$ is attached to a 10 000 N/m spring, displaced 10 mm and released ($g = 10$ m/s²). How many cycles of motion does it execute?`,
  hint:"Dead zone μN/k, loss 2μN/k per half-cycle.",
  sol:R`<p>$\mu N/k = 0.12(1)(10)/10\,000 = 0.12$ mm; loss per half-cycle 0.24 mm.</p>
  <p>$n_r = (10 - 0.12)/0.24 = 41.2$ half-cycles, so about 21 full cycles (41 complete half-cycles plus a part).</p>`,
  ans:"≈ 41 half-cycles (≈ 20.6 cycles)", prov:"From the worked example in Lecture 1."}
],
traps: [
 "Coulomb damping does NOT change the frequency. Use ω_n = √(k/m) and the undamped period.",
 "Amplitude loss is 2μN/k per HALF-cycle and 4μN/k per FULL cycle. Mixing these up halves or doubles the answer.",
 "n_r counts half-cycles, not full cycles.",
 "Coulomb systems stop inside ±μN/k, usually not at the original equilibrium.",
 "Linear decay = Coulomb; exponential decay = viscous. Check the envelope shape on a plot first.",
 "Hysteretic: δ = πh/k and ζ = h/(2k). The equivalent viscous coefficient depends on frequency: c_eq = h/ω."
]
});
})();
