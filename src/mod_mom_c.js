/* MEC1014 Mechanics of Machines — belt drives (Lecture 4 – Belts) */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };

T.topics.push({
id: "belts", part: "Power transmission", title: "Belt Drives: Tensions, Power & Optimum Speed",
lectures: "Lecture 4 – Belts", status: "lectured",
summary: "Open flat-belt geometry (lap angles, speed ratio), centrifugal tension, the Euler–Eytelwein tension ratio, power and torque transmitted, initial tension, the optimum speed for maximum power, V-belts, losses and timing belts.",
theory: R`
<h3>0. Why belts</h3>
<p><b>For:</b> cheaper than gears, any shaft centre distance, quiet and smooth at high speed, can slip on overload, no lubrication, can run in more than one plane, easy to assemble with loose tolerances, low maintenance, absorbs shock loads.</p>
<p><b>Against:</b> limited power, positioning errors from slip, the belt stretches over time.</p>

<h3>1. Open-belt geometry and speed ratio</h3>
<p>Small pulley radius $r_s$ (here the driver), large pulley $r_L$, centre distance $L$. The belt speed is the same on both pulleys (no slip):</p>
$$v = r_s\omega_s = r_L\omega_L,\qquad n = \frac{\omega_L}{\omega_s} = \frac{r_s}{r_L}$$
<p>The straight spans are tilted at $\alpha$ to the centre line, with</p>
$$\sin\alpha = \frac{r_L - r_s}{L}$$
<p>Angles of lap (contact):</p>
$$\theta_s = \pi - 2\alpha = 2\cos^{-1}\!\left(\frac{r_L-r_s}{L}\right),\qquad \theta_L = \pi + 2\alpha$$
<div class="callout key">Slip happens first on the pulley with the <b>smaller lap angle</b> (the small pulley), so use $\theta_s$ in the tension ratio.</div>
<p>$T_1$ is the <b>tight side</b> tension (the span being pulled into the driver), $T_2$ the <b>slack side</b>.</p>

<h3>2. Centrifugal tension</h3>
<p>A belt element of mass $m'r\,d\theta$ ($m'$ = mass per unit length) moving at $v = r\omega$ needs a centripetal force $F = m'r\,d\theta\cdot v^2/r = m'v^2d\theta$. Resolving radially, the tension that supplies it is $2T_c\sin(d\theta/2) \approx T_c\,d\theta$, so</p>
$$T_c = m'v^2$$
<p>$T_c$ adds to both sides equally. It carries no torque but uses up belt strength.</p>

<h3>3. Tension ratio (Euler–Eytelwein)</h3>
<p>For an element with $T$ and $T + dT$ at its ends, normal reaction $R$ and centrifugal force $F$: radially $R = (T - T_c)\,d\theta$; tangentially, at the point of slip, $dT = \mu R = \mu(T-T_c)\,d\theta$. Integrating from $T_2$ to $T_1$ over the lap angle:</p>
<div class="callout key">$$\frac{T_1 - T_c}{T_2 - T_c} = e^{\mu\theta}$$</div>
<p>At low speed $T_c$ is negligible and this becomes $T_1/T_2 = e^{\mu\theta}$.</p>

<h3>4. Power and torque</h3>
<p>The net torque on a pulley of radius $r$ is $(T_1 - T_2)r$, so</p>
$$P = (T_1 - T_2)r\omega = (T_1 - T_2)v$$
<p>Writing $T_2 - T_c = (T_1 - T_c)/e^{\mu\theta}$:</p>
$$P = (T_1 - T_c)\left(1 - \frac{1}{e^{\mu\theta}}\right)v = \left(T_1 v - m'v^3\right)\left(1 - \frac{1}{e^{\mu\theta}}\right)$$
<p>Torques: $\tau_s = (T_1-T_2)r_s$ and $\tau_L = (T_1-T_2)r_L$, so $\dfrac{\tau_s}{\tau_L} = \dfrac{r_s}{r_L} = \dfrac{\omega_L}{\omega_s}$. The maximum torque the belt can carry before slipping is $\tau = (T_1 - T_c)\left(1 - e^{-\mu\theta}\right)r$.</p>

<h3>5. Optimum speed for a given maximum tension</h3>
<p>With $T_1$ fixed at the belt's allowable tension, $P \propto T_1v - m'v^3$. Setting $dP/dv = 0$:</p>
$$T_1 - 3m'v^2 = 0\;\Rightarrow\; v_{opt} = \sqrt{\frac{T_1}{3m'}},\qquad T_c = \frac{T_1}{3}$$
$$P_{max} = \frac{2T_1}{3}\left(1 - e^{-\mu\theta}\right)v_{opt},\qquad \tau_{opt} = \frac{2T_1}{3}\left(1 - e^{-\mu\theta}\right)r$$
<p>Above $v_{opt}$ the centrifugal tension eats into the usable tension faster than the speed gain helps.</p>

<h3>6. Initial tension</h3>
<p>Before running, each side carries $T_0$. Running, the belt stretches as much on the tight side as it shortens on the slack side, so</p>
$$2T_0 = (T_1 - T_c) + (T_2 - T_c)\;\Rightarrow\; T_0 = \frac{T_1 + T_2}{2} - T_c$$
<p>For maximum power ($T_c = T_1/3$) the initial tension must be at least</p>
$$T_0 = \frac{T_1}{3}\left(1 + \frac{1}{e^{\mu\theta}}\right)\quad\Leftrightarrow\quad T_1 = \frac{3T_0}{1 + e^{-\mu\theta}}$$
<p>Working from $T_0$ instead: $v_{opt} = \sqrt{\dfrac{T_0}{(1+e^{-\mu\theta})m'}}$ and $P_{max} = 2T_0\dfrac{1 - e^{-\mu\theta}}{1 + e^{-\mu\theta}}\,v_{opt}$.</p>

<h3>7. V-belts, losses and timing belts</h3>
<p><b>V-belt (wedge belt).</b> The radial force $R$ wedges the belt into the groove (semi-angle $\beta$, half the standard belt angle). The normal force on the two flanks totals $R/\sin\beta$, so friction is much higher at the same tension:</p>
$$\frac{T_1 - T_c}{T_2 - T_c} = e^{\mu\theta/\sin\beta}$$
<p>Use the datum radius of the pulley for $r$.</p>
<p><b>Losses in a real drive</b> (the ideal model has none): belt bending and flexing, internal hysteresis of the belt material, air resistance and bearing friction, and <b>creep</b>, where elastic stretch and recovery make the belt speed differ slightly between the pulleys even without gross slip.</p>
<p><b>Timing belts</b> have castellated teeth meshing with toothed pulleys. They fix the relative rotation like gears (used where shaft timing matters, e.g. crankshaft to camshafts with an idler and tensioner) and transmit power by direct contact plus friction. Some shock absorption, but that isn't their purpose.</p>
`,
formulas: [
 {name:"Speed ratio", tex:R`n = \frac{\omega_L}{\omega_s} = \frac{r_s}{r_L},\quad v = r_s\omega_s = r_L\omega_L`},
 {name:"Lap angles (open belt)", tex:R`\sin\alpha = \frac{r_L-r_s}{L},\quad \theta_s = \pi - 2\alpha,\quad \theta_L = \pi + 2\alpha`},
 {name:"Centrifugal tension", tex:R`T_c = m'v^2`},
 {name:"Euler–Eytelwein", tex:R`\frac{T_1 - T_c}{T_2 - T_c} = e^{\mu\theta}`, note:"V-belt: exponent μθ/sin β"},
 {name:"Power", tex:R`P = (T_1 - T_2)v = (T_1 - T_c)\left(1 - e^{-\mu\theta}\right)v`},
 {name:"Torque", tex:R`\tau = (T_1 - T_2)r`},
 {name:"Initial tension", tex:R`T_0 = \frac{T_1 + T_2}{2} - T_c`},
 {name:"Optimum speed", tex:R`v_{opt} = \sqrt{\frac{T_1}{3m'}},\quad T_c = \frac{T_1}{3}`},
 {name:"Maximum power", tex:R`P_{max} = \frac{2T_1}{3}\left(1 - e^{-\mu\theta}\right)v_{opt},\quad T_1 = \frac{3T_0}{1 + e^{-\mu\theta}}`}
],
questions: [
 {src:"Lecture 4 example 1", see:[3,5,6], q:R`A flat belt drives a pulley. Initial tension $T_0 = 600$ N, belt mass $m' = 0.8$ kg/m, $\mu = 0.3$, angle of contact $180^\circ$. Find (a) the maximum permissible running tension, (b) the belt speed for maximum power, (c) the tight- and slack-side tensions at this speed, (d) the maximum power.`,
  hint:"For maximum power T_c = T₁/3, so T₁ = 3T₀/(1 + e^{−μθ}). Then v = √(T₁/3m′) and use the tension ratio for T₂.",
  sol:R`<p>$e^{\mu\theta} = e^{0.3\pi} = 2.5663$.</p>
  <p>(a) $T_1 = \dfrac{3T_0}{1 + 1/e^{\mu\theta}} = \dfrac{1800}{1 + 0.38966} = 1295.3$ N.</p>
  <p>(b) $v = \sqrt{\dfrac{T_1}{3m'}} = \sqrt{\dfrac{1295.3}{2.4}} = 23.23$ m/s.</p>
  <p>(c) $T_c = m'v^2 = 0.8(23.23)^2 = 431.8$ N $= T_1/3$ ✓. $T_2 = T_c + \dfrac{T_1 - T_c}{e^{\mu\theta}} = 431.8 + \dfrac{863.5}{2.5663} = 768.2$ N.</p>
  <p>(d) $P = (T_1 - T_2)v = (1295.3 - 768.2)(23.23) = 12.24$ kW.</p>`,
  ans:"T₁ = 1295 N, v = 23.2 m/s, T₂ = 768 N, P_max = 12.24 kW", prov:"From the worked example in Lecture 4; numbers re-checked."},
 {src:"Lecture 4 example 2", fig:"mom_belt", see:[1,2,3,4], q:R`An open flat-belt drive: driver pulley $D_1 = 200$ mm at $N_1 = 1200$ rpm, driven pulley $D_2 = 500$ mm, centre distance $L = 1.5$ m, $\mu = 0.30$, $m' = 0.80$ kg/m, initial tension $T_0 = 600$ N. Assuming no slip and a perfectly elastic belt, find (a) the angle of contact on each pulley, (b) the driven speed and belt speed, (c) the running tensions and the power transmitted.`,
  hint:"θ_s = 2cos⁻¹((r_L − r_s)/L). With an elastic belt, T₁ + T₂ = 2T₀ + 2T_c. Slip governs on the small pulley.",
  sol:R`<p>(a) $\dfrac{r_L - r_s}{L} = \dfrac{0.25 - 0.10}{1.5} = 0.1$. $\theta_s = 2\cos^{-1}(0.1) = 168.52^\circ$ (2.941 rad), so $2\alpha = 11.48^\circ$ and $\theta_L = 191.48^\circ$.</p>
  <p>(b) $N_2 = N_1\dfrac{r_s}{r_L} = 1200(0.4) = 480$ rpm. $v = r_s\omega_s = 0.1\times\dfrac{1200\times2\pi}{60} = 12.57$ m/s.</p>
  <p>(c) $T_c = 0.8(12.57)^2 = 126.33$ N. $T_1 + T_2 = 2T_0 + 2T_c = 1452.66$ N. On the small pulley $e^{\mu\theta_s} = e^{0.3\times2.941} = 2.4166$, so</p>
  $$\frac{T_1 - 126.33}{T_2 - 126.33} = 2.4166,\qquad (T_1 - T_c) + (T_2 - T_c) = 1200$$
  <p>giving $T_1 - T_c = 848.8$, $T_2 - T_c = 351.2$: $T_1 = 975.1$ N, $T_2 = 477.6$ N.</p>
  <p>$P = (T_1 - T_2)v = 497.6\times12.57 = 6.25$ kW.</p>`,
  ans:"θ_s = 168.5°, θ_L = 191.5°; 480 rpm, 12.57 m/s; T₁ = 975 N, T₂ = 478 N, P = 6.25 kW", prov:"From the worked example in Lecture 4; numbers re-checked."},
 {src:"Lecture 4 example 2 (max power)", fig:"mom_belt", see:[5,6], q:R`Same drive ($T_0 = 600$ N, $m' = 0.8$ kg/m, $\mu = 0.3$, $\theta_s = 168.52^\circ$). Find the optimum belt speed for maximum power, the tight- and slack-side tensions at that speed, and the maximum power. Check that the initial tension is consistent.`,
  hint:"Same method as example 1, but with θ_s instead of π.",
  sol:R`<p>$T_1 = \dfrac{3T_0}{1 + 1/2.4166} = \dfrac{1800}{1.4138} = 1273.2$ N, $T_c = T_1/3 = 424.4$ N.</p>
  <p>$v_{opt} = \sqrt{\dfrac{1273.2}{2.4}} = 23.03$ m/s.</p>
  <p>$T_2 = T_c + \dfrac{T_1 - T_c}{2.4166} = 424.4 + 351.2 = 775.6$ N. Check: $\dfrac{T_1 + T_2}{2} - T_c = 1024.4 - 424.4 = 600$ N $= T_0$ ✓.</p>
  <p>$P_{max} = (T_1 - T_2)v_{opt} = 497.6\times23.03 = 11.46$ kW, or equally $\tfrac23T_1(1 - e^{-\mu\theta})v_{opt} = 11.46$ kW.</p>`,
  ans:"v_opt = 23.0 m/s, T₁ = 1273 N, T₂ = 776 N, P_max = 11.46 kW", prov:"From the worked example in Lecture 4; numbers re-checked (the slide rounds T₂ to 775.8 N)."},
 {src:"Lecture 4 (derivation)", see:[4,5], q:R`Show that, for a fixed maximum belt tension $T_1$, the power is greatest when the centrifugal tension is one third of $T_1$, and find $P_{max}$.`,
  hint:"Write P = (T₁v − m′v³)(1 − e^{−μθ}) and differentiate with respect to v.",
  sol:R`<p>$P = (T_1 - T_c)(1 - e^{-\mu\theta})v = (T_1v - m'v^3)(1 - e^{-\mu\theta})$. The bracket $(1 - e^{-\mu\theta})$ is constant, so</p>
  $$\frac{dP}{dv} = 0\;\Rightarrow\; T_1 - 3m'v^2 = 0\;\Rightarrow\; m'v^2 = T_c = \frac{T_1}{3},\quad v = \sqrt{\frac{T_1}{3m'}}$$
  <p>Then $T_1 - T_c = \tfrac23T_1$ and $P_{max} = \tfrac23T_1(1 - e^{-\mu\theta})\sqrt{T_1/3m'}$.</p>`,
  ans:"T_c = T₁/3 at v = √(T₁/3m′); P_max = (2T₁/3)(1 − e^{−μθ})v", prov:"From the derivation in Lecture 4."},
 {src:"Tutorial 7 Q1", see:[3,4], q:R`A ship is dragged through a lock by a capstan and rope. The capstan has a diameter of 500 mm and turns at 30 rpm. The rope makes 3 complete turns around the capstan, $\mu = 0.25$, and a pull of 100 N is applied at the free end. The mass of the rope is negligible. Find (a) the pull on the ship and (b) the power required to drive the capstan.`,
  hint:"Same tension ratio as a belt, with no centrifugal term: θ = 3 turns = 6π rad. The capstan surface moves at rω.",
  sol:R`<p>$\theta = 3\times2\pi = 6\pi$ rad, $\omega = 30\times\dfrac{2\pi}{60} = \pi$ rad/s, $r = 0.25$ m. The ship is on the tight side $T_1$; the 100 N pull is $T_2$.</p>
  <p>(a) $T_1 = T_2e^{\mu\theta} = 100\,e^{0.25(6\pi)} = 100\,e^{4.712} = 11\,132$ N.</p>
  <p>(b) $P = (T_1 - T_2)r\omega = (11\,132 - 100)(0.25\pi) = 8665$ W.</p>`,
  ans:"(a) 11.13 kN, (b) 8.66 kW", prov:"Follows the posted solution; numbers re-checked."},
 {src:"Tutorial 7 Q2", see:[2,3,4,5], q:R`A leather belt, 125 mm wide and 6 mm thick, transmits power from a pulley of 750 mm diameter running at 500 rpm. The angle of lap is 150° and $\mu = 0.3$. The belt density is 1 Mg/m³ and the stress in the belt must not exceed 2.75 MN/m². Find the power that can be transmitted at this speed, and the maximum power that could be transmitted if the belt ran at its optimum speed.`,
  hint:"Maximum tension T₁ = σ_max × A. Belt mass per metre m′ = ρA. Keep the centrifugal term because m′ is known. For the optimum speed, m′v² = T₁/3.",
  sol:R`<p>$A = 0.125\times0.006 = 0.75\times10^{-3}$ m², $m' = \rho A = 1000\times0.75\times10^{-3} = 0.75$ kg/m, $T_1 = \sigma_{max}A = 2.75\times10^6\times0.75\times10^{-3} = 2062.5$ N.</p>
  <p>$\omega = 500\times\dfrac{2\pi}{60} = 52.36$ rad/s, $v = r\omega = 0.375\times52.36 = 19.63$ m/s, $T_c = m'v^2 = 289.2$ N. $\theta = 150^\circ = 2.618$ rad, $e^{\mu\theta} = e^{0.785} = 2.193$.</p>
  <p><b>At 500 rpm:</b> $T_2 = \dfrac{T_1 - T_c}{e^{\mu\theta}} + T_c = \dfrac{2062.5 - 289.2}{2.193} + 289.2 = 1097.7$ N.</p>
  <p>$P = (T_1 - T_2)v = (2062.5 - 1097.7)(19.63) = 18.94$ kW.</p>
  <p><b>At the optimum speed:</b> $m'v^2 = \dfrac{T_1}{3}$, so $v = \sqrt{\dfrac{2062.5}{3(0.75)}} = 30.28$ m/s and $T_c = 687.5$ N.</p>
  <p>$T_2 = \dfrac{2T_1/3}{e^{\mu\theta}} + \dfrac{T_1}{3} = \dfrac{1375}{2.193} + 687.5 = 1314.4$ N.</p>
  <p>$P_{max} = (2062.5 - 1314.4)(30.28) = 22.65$ kW.</p>`,
  ans:"18.9 kW at 500 rpm; 22.6 kW at the optimum speed of 30.3 m/s", prov:"Follows the posted solution. It rounds ω to 52.4 rad/s (v = 19.65 m/s) and gets 18,970 W and 22,680 W; unrounded arithmetic gives 18.94 kW and 22.65 kW."},
 {src:"Tutorial 7 Q3", see:[2,3,4], q:R`In a belt drive the angle of lap on the small pulley is 150°. With a belt speed of 20 m/s and a tight-side tension of 1.35 kN, the greatest power that can be transmitted without slip is 10 kW. What increase in power would be obtained, for the same belt speed and maximum tension, by using an idler pulley to increase the angle of lap to 210°? Include the centrifugal effect; the belt mass is 0.75 kg/m.`,
  hint:"First find T₂ from the 10 kW, then back out μ from the tension ratio at 150°. Reuse that μ at 210° to get the new T₂.",
  sol:R`<p>$T_c = m'v^2 = 0.75(20^2) = 300$ N. From $P = (T_1 - T_2)v$: $T_2 = 1350 - \dfrac{10\,000}{20} = 850$ N.</p>
  <p>At $\theta_s = 150^\circ = \tfrac56\pi$: $\mu = \dfrac{1}{\theta_s}\ln\dfrac{T_1 - T_c}{T_2 - T_c} = \dfrac{\ln(1050/550)}{5\pi/6} = \dfrac{0.6466}{2.618} = 0.247$.</p>
  <p>At $\theta_s = 210^\circ = \tfrac76\pi$: $\mu\theta_s = 0.247\times3.665 = 0.905$, so $T_2 = \dfrac{1050}{e^{0.905}} + 300 = 424.7 + 300 = 724.7$ N.</p>
  <p>$P = (1350 - 724.7)(20) = 12.51$ kW, an increase of $\Delta P = 2.5$ kW.</p>`,
  ans:"μ = 0.247; new T₂ ≈ 725 N; P = 12.5 kW, an increase of 2.5 kW", prov:"Follows the posted solution; numbers re-checked. The posted working prints the exponent as 0.343(7π/6), a typo: its 725 N only follows from μ = 0.247."}
],
traps: [
 "Use the lap angle of the small pulley in e^{μθ}: it slips first.",
 "θ goes in radians in e^{μθ}.",
 "T_c appears on both sides of the tension ratio. Only drop it when the question says low speed or gives no belt mass.",
 "Power uses T₁ − T₂, not T₁ − T_c.",
 "With an elastic belt T₁ + T₂ = 2T₀ + 2T_c, not 2T₀.",
 "For a V-belt the exponent is μθ/sin β, where β is the semi-angle (half the standard belt angle).",
 "A capstan or rope wrapped n full turns has θ = 2πn rad, so the tension ratio grows very fast with each extra turn."
]
});
})();
