/* MEC1014 Mechanics of Machines — friction clutches (Lecture 5 – Clutch) */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };

T.topics.push({
id: "clutch", part: "Power transmission", title: "Friction Clutches: Plate and Cone",
lectures: "Lecture 5 – Clutch", status: "lectured",
summary: "How a plate clutch transmits torque by friction, the constant-pressure and constant-wear assumptions, torque and power for plate and cone clutches, and using a slipping clutch to accelerate a geared load in minimum time.",
theory: R`
<h3>0. Friction in power transmission</h3>
<p>Belts, clutches and brakes all grip by friction between a moving and a stationary (or slower) member, governed by the surface pressure and $\mu$. A <b>brake</b> turns kinetic energy into heat to slow things down. A <b>clutch</b> connects and disconnects the engine from the transmission.</p>
<p><b>Car clutch.</b> Engaged (pedal up): the pressure plate clamps the clutch disc against the spinning flywheel and power reaches the gearbox. Disengaged (pedal down): the hydraulic system (master and slave cylinders) or linkage pushes the release bearing against the diaphragm spring and pulls the pressure plate back.</p>
<p>Clutches allow the input and output shafts to be disengaged and re-engaged, and can tolerate a speed difference between the shafts for a limited time. Like a belt, the power they carry is limited by friction, and the limit is not exact because it depends on an assumption about how the two surfaces behave.</p>

<h3>1. Simple plate clutch</h3>
<p>A load spring clamps the friction surfaces together with axial force $W$; a release mechanism acting through a thrust bearing pulls them apart. On a free body diagram the plate carries $W$ from each side: $W$ is the spring force.</p>

<h3>2. The two assumptions</h3>
<table class="data">
<tr><th></th><th>Constant pressure</th><th>Constant wear rate</th></tr>
<tr><td>Assumes</td><td>pressure evenly spread over a flat surface</td><td>worn surfaces settle so wear is the same everywhere</td></tr>
<tr><td>Applies to</td><td>new clutches</td><td>run-in (worn) clutches</td></tr>
<tr><td>Law</td><td>$p = \text{const}$</td><td>wear $\propto p\,v$ and $v = r\omega$, so $p\,r = C$</td></tr>
<tr><td>Pressure profile</td><td>uniform</td><td>highest at $r_i$, falls as $1/r$ toward $r_o$</td></tr>
</table>

<h3>3. Annular element: force and torque</h3>
<p>Take a ring at radius $r$, width $dr$, on a face with inner radius $r_i$ and outer radius $r_o$:</p>
$$dA = 2\pi r\,dr,\quad dF_N = p\,2\pi r\,dr,\quad dF_F = \mu p\,2\pi r\,dr,\quad dT = dF_F\,r = 2\pi\mu p r^2\,dr$$
<div class="callout key">$$W = 2\pi\int_{r_i}^{r_o} p\,r\,dr,\qquad T = 2\pi\mu\int_{r_i}^{r_o} p\,r^2\,dr$$</div>

<h3>4. Plate clutch: torque under each assumption</h3>
<p><b>Constant pressure:</b> $W = \pi p(r_o^2 - r_i^2)$ and $T = \tfrac23\pi\mu p(r_o^3 - r_i^3)$. Eliminating $p$:</p>
$$T = \mu W R_{eq},\qquad R_{eq} = \frac23\,\frac{r_o^3 - r_i^3}{r_o^2 - r_i^2}$$
<p><b>Constant wear</b> ($pr = C$): $W = 2\pi C(r_o - r_i)$ and $T = \pi\mu C(r_o^2 - r_i^2)$, so</p>
$$T = \mu W R_{mean},\qquad R_{mean} = \frac{r_o + r_i}{2}$$
<p>For any annulus ($0 \le r_i < r_o$), $R_{eq} > R_{mean}$, so for the same axial force constant pressure predicts more torque. Under constant pressure the outer region, with its longer lever arm, carries its full share; under constant wear the pressure falls with radius so the outer region contributes less. Constant wear is therefore the safer (lower) design estimate for a worn clutch.</p>
<p><b>Several friction surfaces.</b> With $n$ pairs of surfaces in contact (e.g. a single plate gripped on both faces: $n = 2$), each carries the full $W$: $T = n\mu W R$.</p>
<p><b>Power:</b> $P = T\omega$, with $\omega = 2\pi N/60$.</p>

<h3>5. Cone clutch</h3>
<p>Mating cones (friction material between them) are pushed together by a spring and separated by the clutch control. Let $\beta$ be the semi-angle of the cone (between the friction surface and the axis). A ring with radial width $dr$ has slant width $dr/\sin\beta$, so</p>
$$dA = \frac{2\pi r\,dr}{\sin\beta},\quad dF_N = \frac{p\,2\pi r\,dr}{\sin\beta},\quad dF_A = dF_N\sin\beta = p\,2\pi r\,dr$$
<p>The axial force is therefore <b>the same as for a plate clutch</b>, $W = 2\pi\int p r\,dr$, but friction acts on the larger normal force:</p>
$$dF_f = \frac{\mu p\,2\pi r\,dr}{\sin\beta},\qquad T = \frac{2\pi\mu}{\sin\beta}\int_{r_i}^{r_o} p\,r^2\,dr$$
<div class="callout key">Constant pressure: $T = \dfrac{\mu W}{\sin\beta}\cdot\dfrac23\dfrac{r_o^3 - r_i^3}{r_o^2 - r_i^2}$. Constant wear: $T = \dfrac{\mu W}{\sin\beta}R_{mean}$.</div>
<p>The wedge multiplies the torque by $1/\sin\beta$, the same effect as the V-belt groove.</p>

<h3>6. Accelerating a geared load through a slipping clutch</h3>
<p>While the clutch slips it delivers its limiting torque $T_c$ to the output shaft G whatever the input does. G drives H through gears with speed ratio $n = \omega_H/\omega_G$. Referring H's inertia to G:</p>
$$I_{sys} = I_G + n^2 I_H,\qquad \alpha_G = \frac{T_c}{I_G + n^2I_H},\qquad \alpha_H = n\alpha_G = \frac{T_c\,n}{I_G + n^2 I_H}$$
<p>(Use $I = m k^2$ from the mass and radius of gyration.) Setting $d\alpha_H/dn = 0$ gives the ratio for the fastest acceleration of H:</p>
<div class="callout key">$$n_{opt} = \sqrt{\frac{I_G}{I_H}}\qquad\Rightarrow\qquad n^2 I_H = I_G$$</div>
<p>That is, the gearing should make the load's referred inertia equal the driving shaft's own inertia. The time is then $t = \Delta\omega_H/\alpha_H$. The input shaft F's inertia doesn't enter: the clutch is slipping, so the torque reaching G is fixed at $T_c$.</p>
`,
formulas: [
 {name:"Annular element", tex:R`W = 2\pi\int_{r_i}^{r_o} p\,r\,dr,\quad T = 2\pi\mu\int_{r_i}^{r_o} p\,r^2\,dr`},
 {name:"Constant pressure (plate)", tex:R`T = \mu W R_{eq},\quad R_{eq} = \frac23\frac{r_o^3 - r_i^3}{r_o^2 - r_i^2}`, note:"new clutch; W = πp(r_o² − r_i²)"},
 {name:"Constant wear (plate)", tex:R`T = \mu W R_{mean},\quad R_{mean} = \frac{r_o + r_i}{2}`, note:"worn clutch; pr = C, W = 2πC(r_o − r_i)"},
 {name:"Multiple friction surfaces", tex:R`T = n\mu W R`},
 {name:"Power", tex:R`P = T\omega,\quad \omega = \frac{2\pi N}{60}`},
 {name:"Cone clutch", tex:R`T = \frac{\mu W}{\sin\beta}R`, note:"R = R_eq (constant pressure) or R_mean (constant wear)"},
 {name:"Slipping clutch driving geared load", tex:R`\alpha_H = \frac{T_c\,n}{I_G + n^2 I_H},\quad n_{opt} = \sqrt{I_G/I_H}`}
],
questions: [
 {src:"Lecture 5 example 1", see:[4], q:R`A single-plate clutch: inner radius 50 mm, outer radius 100 mm, $\mu = 0.3$, total axial force 2000 N, speed 1000 rpm. Assuming uniform wear, find (a) the torque transmitted and (b) the power transmitted.`,
  hint:"Uniform wear: T = μW R_mean with R_mean = (r_o + r_i)/2. Then P = Tω.",
  sol:R`<p>$R_{mean} = \dfrac{0.10 + 0.05}{2} = 0.075$ m.</p>
  <p>(a) $T = \mu W R_{mean} = 0.3\times2000\times0.075 = 45$ N·m.</p>
  <p>(b) $\omega = \dfrac{2\pi\times1000}{60} = 104.72$ rad/s, so $P = 45\times104.72 = 4712$ W $\approx 4.71$ kW.</p>`,
  ans:"T = 45 N·m, P = 4.71 kW", prov:"From the worked example in Lecture 5; numbers re-checked."},
 {src:"Lecture 5 example 1 (constant pressure)", see:[4], q:R`Repeat the same clutch (50/100 mm radii, $\mu = 0.3$, $W = 2000$ N, 1000 rpm) using the constant-pressure assumption, and compare with the uniform-wear result.`,
  hint:"R_eq = (2/3)(r_o³ − r_i³)/(r_o² − r_i²).",
  sol:R`<p>$R_{eq} = \dfrac23\cdot\dfrac{0.1^3 - 0.05^3}{0.1^2 - 0.05^2} = \dfrac23\cdot\dfrac{0.000875}{0.0075} = 0.07778$ m.</p>
  <p>$T = 0.3\times2000\times0.07778 = 46.67$ N·m, $P = 46.67\times104.72 = 4.89$ kW.</p>
  <table class="data num"><tr><th></th><th>Constant pressure</th><th>Constant wear</th></tr>
  <tr><td>Radius</td><td>77.78 mm</td><td>75.00 mm</td></tr>
  <tr><td>Torque</td><td>46.67 N·m</td><td>45.00 N·m</td></tr>
  <tr><td>Power</td><td>4.89 kW</td><td>4.71 kW</td></tr></table>
  <p>Constant pressure gives more torque because $R_{eq} > R_{mean}$.</p>`,
  ans:"T = 46.67 N·m, P = 4.89 kW (vs 45 N·m, 4.71 kW for uniform wear)", prov:"From the worked example in Lecture 5; numbers re-checked."},
 {src:"Practice (Lecture 5 example 1 clutch)", see:[2,4], q:R`For the same clutch ($r_i = 50$ mm, $r_o = 100$ mm, $W = 2000$ N), find the pressure under the constant-pressure assumption, and the maximum pressure and where it acts under uniform wear.`,
  hint:"Constant pressure: p = W/π(r_o² − r_i²). Uniform wear: C = W/2π(r_o − r_i), p = C/r is largest at r_i.",
  sol:R`<p>Constant pressure: $p = \dfrac{2000}{\pi(0.1^2 - 0.05^2)} = 84.9$ kPa.</p>
  <p>Uniform wear: $C = \dfrac{2000}{2\pi(0.05)} = 6366$ N/m, so $p_{max} = C/r_i = 127.3$ kPa at the inner radius, falling to $C/r_o = 63.7$ kPa at the outer edge.</p>`,
  ans:"84.9 kPa uniform; uniform wear p_max = 127.3 kPa at r_i", prov:"Worked by Claude; no solution is available."},
 {src:"Lecture 5 example 2", see:[4,6], q:R`Shaft F drives co-axial shaft G through a single-plate clutch with two pairs of friction surfaces, inner and outer diameters 70 mm and 120 mm. Total axial load 450 N, $\mu = 0.35$. Shaft G carries a pinion P meshing with a spur gear S on parallel shaft H. Masses and radii of gyration (with attached masses): F 12.5 kg, 80 mm; G 20 kg, 70 mm; H 37.5 kg, 120 mm. Assuming uniform wear, find the minimum time to raise H from 500 rpm to 1500 rpm by a torque applied to F, and the gear ratio between G and H that achieves it.`,
  hint:"The slipping clutch gives a fixed torque T = nμWR_mean (n = 2 surfaces). α_H = Tn/(I_G + n²I_H) is greatest at n = √(I_G/I_H). F's inertia is irrelevant.",
  sol:R`<p>Clutch torque, 2 surfaces, $R_{mean} = (0.035 + 0.060)/2 = 0.0475$ m: $T = 2\times0.35\times450\times0.0475 = 14.96$ N·m.</p>
  <p>$I_G = 20\times0.07^2 = 0.098$ kg·m², $I_H = 37.5\times0.12^2 = 0.54$ kg·m².</p>
  <p>With $n = \omega_H/\omega_G$: $I_{sys} = 0.098 + 0.54n^2$ referred to G, so $\alpha_H = n\alpha_G = \dfrac{14.96n}{0.098 + 0.54n^2}$.</p>
  <p>$\Delta\omega_H = (1500 - 500)\dfrac{2\pi}{60} = 104.7$ rad/s, so $t_H = \dfrac{104.7(0.098 + 0.54n^2)}{14.96n}$.</p>
  <p>Minimising: $\dfrac{d}{dn}\left(\dfrac{0.098 + 0.54n^2}{n}\right) = 0 \Rightarrow 0.54n^2 = 0.098 \Rightarrow n = \sqrt{0.1815} = 0.426$.</p>
  <p>$\alpha_H = \dfrac{14.96\times0.426}{0.098 + 0.098} = 32.5$ rad/s², so $t_H = 104.7/32.5 = 3.22$ s.</p>`,
  ans:"n = ω_H/ω_G = 0.426 (G runs 2.35× faster than H); t_min = 3.22 s", prov:"From the worked example in Lecture 5; numbers re-checked."},
 {src:"Lecture 5 (derivation)", see:[5], q:R`Show that a cone clutch of semi-angle $\beta$ needs the same axial force as a plate clutch for a given pressure distribution, but transmits $1/\sin\beta$ times the torque.`,
  hint:"Ring area on the cone is 2πr dr / sin β; resolve the normal force axially.",
  sol:R`<p>A ring of radial width $dr$ has slant length $dr/\sin\beta$, so $dF_N = p\,2\pi r\,dr/\sin\beta$. Its axial component is $dF_N\sin\beta = p\,2\pi r\,dr$, identical to a plate, so $W = 2\pi\int p r\,dr$.</p>
  <p>Friction acts on $dF_N$: $dT = \mu\,dF_N\,r = \dfrac{2\pi\mu p r^2\,dr}{\sin\beta}$, which is the plate result divided by $\sin\beta$. Hence $T = \mu W R/\sin\beta$ with $R = R_{eq}$ or $R_{mean}$.</p>`,
  ans:"W unchanged; T = μWR/sin β", prov:"From the derivation in Lecture 5."}
],
traps: [
 "Uniform wear uses R_mean = (r_o + r_i)/2; constant pressure uses R_eq = (2/3)(r_o³ − r_i³)/(r_o² − r_i²). Use whichever the question states.",
 "Diameters given? Halve them before using the radius formulas.",
 "Count friction surfaces: a single plate gripped on both faces has two, so T = 2μWR.",
 "Under uniform wear the maximum pressure is at the inner radius, not the outer.",
 "Cone clutch: divide by sin β, where β is the cone semi-angle. The axial force W is not divided.",
 "With a slipping clutch the input shaft's inertia plays no part in accelerating the output."
]
});
})();
