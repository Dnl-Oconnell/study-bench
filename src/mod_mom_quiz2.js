/* MEC1014: Loop quiz Q16–Q20 (CA question screenshots and worked answers in Daniel's "MM306 Exam Notes"), placed on their topics. Every number re-computed. */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };
const add = (id, q) => { const t = T.topics.find(x => x.id === id); if (t) t.questions.push(q); };
const PROV = "From the worked answer in Daniel's exam notes; every number re-checked by Claude.";

add("undamped", { src: "Loop quiz Q16", see: [2, 4], fig: "mom_ca_q16",
  q: R`A mass of 1050 g hangs on a spring of stiffness 10.61 N/mm, with $+x$ upwards from the equilibrium position. The mass is pushed 11 mm downwards from equilibrium and released with velocity $v_0 = -1.851$ m/s.
  <br>(a) Find the static extension of the spring.
  <br>(b) Find the natural frequency, the amplitude and the phase angle $\phi$ of the motion $x = A\sin(\omega_n t + \phi)$.
  <br>(c) Find the period.`,
  hint: R`SI units first, and take signs from the figure: anything downwards is negative. $B = v_0/\omega_n$ and $A = \sqrt{x_0^2 + B^2}$. Pick the quadrant of $\phi$ from the signs: $\sin\phi$ has the sign of $x_0$, $\cos\phi$ the sign of $v_0$.`,
  sol: R`<ol class="steps">
  <li>$m = 1.050$ kg, $k = 10\,610$ N/m, $x_0 = -0.011$ m, $v_0 = -1.851$ m/s.</li>
  <li>(a) $x_{st} = -mg/k = -(1.050\times9.81)/10610 = -0.000971$ m $= -0.971$ mm (downwards).</li>
  <li>(b) $\omega_n = \sqrt{10610/1.050} = 100.5$ rad/s.</li>
  <li>$B = v_0/\omega_n = -1.851/100.52 = -0.01841$ m, so $A = \sqrt{0.011^2 + 0.01841^2} = 0.02145$ m $= 21.4$ mm.</li>
  <li>$x_0 \lt 0$ and $v_0 \lt 0$, so $\sin\phi \lt 0$ and $\cos\phi \lt 0$: third quadrant. Reference angle $\tan^{-1}(0.011/0.01841) = 0.5385$ rad, so $\phi = -\pi + 0.5385 = -2.60$ rad.</li>
  <li>Check: $0.02145\sin(-2.603) = -0.011$ m and $0.02145\times100.52\cos(-2.603) = -1.851$ m/s. Both match.</li>
  <li>(c) $\tau = 2\pi/\omega_n = 2\pi/100.52 = 0.0625$ s.</li></ol>`,
  ans: "x_st = −0.971 mm; ω_n = 100.5 rad/s; A = 21.4 mm; φ = −2.60 rad; τ = 0.0625 s", prov: PROV });

add("clutch", { src: "Loop quiz Q17", see: [2, 4], fig: "mom_ca_q17",
  q: R`The multi-plate clutch in the figure has a spring giving 950 N of axial load on the friction plates and rings, with $\mu = 0.605$. The outer diameter of the plates (splined to the output shaft) is $d_{plate} = 118$ mm; the inner diameter of the rings (splined to the input shaft) is $d_{ring} = 68$ mm.
  <br>(a) Find the torque the clutch can transmit when new.
  <br>(b) Find the torque when worn.
  <br>(c) What spring load would limit the worn torque to 7.376 N·m?
  <br>(d) Find the maximum power transmitted (worn) at 1503 rpm.`,
  hint: R`Count the friction faces in the zoomed view: $n = $ (plates + rings) − 1. New = uniform pressure (the 2/3 formula); worn = uniform wear (mean radius).`,
  sol: R`<ol class="steps">
  <li>$r_o = 0.059$ m, $r_i = 0.034$ m. The zoomed view shows 3 plates and 3 rings, so $n = 6 - 1 = 5$ friction faces. $\mu W = 0.605\times950 = 574.75$ N.</li>
  <li>(a) $$T_{new} = n\cdot\tfrac{2}{3}\mu W\frac{r_o^3 - r_i^3}{r_o^2 - r_i^2} = 5\times\tfrac{2}{3}\times574.75\times\frac{0.0001661}{0.002325} = 136.8\text{ N·m}$$</li>
  <li>(b) $T_{worn} = n\mu W\,\dfrac{r_o + r_i}{2} = 5\times574.75\times0.0465 = 133.6$ N·m, slightly less than new, as expected.</li>
  <li>(c) $W = \dfrac{T}{n\mu r_m} = \dfrac{7.376}{5\times0.605\times0.0465} = 52.4$ N.</li>
  <li>(d) $\omega = 1503\times2\pi/60 = 157.39$ rad/s, so $P = T_{worn}\,\omega = 133.63\times157.39 = 21\,032$ W $\approx 21.0$ kW.</li></ol>`,
  ans: "T_new = 136.8 N·m; T_worn = 133.6 N·m; W = 52.4 N; P ≈ 21.0 kW", prov: PROV });

add("harmonic", { src: "Loop quiz Q18", see: [3, 4, 5],
  q: R`A spring–mass–dashpot system is excited by a sinusoidal force acting directly on the mass. $m = 73$ kg, $k = 556.0$ N/mm, $c = 3.69$ N·s/mm.
  <br>(a) Find the dynamic magnification factor at an excitation frequency of 11 Hz.
  <br>(b) Find the maximum amplitude of the mass for a sinusoidal force of magnitude 6116 N when the frequency is swept from 11 Hz to 17 Hz.`,
  hint: R`Same type as Loop quiz Q1. Check whether the peak $f_n\sqrt{1-2\zeta^2}$ lies inside the sweep; if it does, use $\text{DMF}_{max} = 1/(2\zeta\sqrt{1-\zeta^2})$.`,
  sol: R`<ol class="steps">
  <li>$k = 556\,000$ N/m, $c = 3690$ N·s/m. $\omega_n = \sqrt{556000/73} = 87.27$ rad/s, $f_n = 13.89$ Hz.</li>
  <li>$\zeta = \dfrac{3690}{2\sqrt{556000\times73}} = \dfrac{3690}{12742} = 0.2896$.</li>
  <li>(a) $r = 11/13.89 = 0.7919$, $1 - r^2 = 0.3728$, $2\zeta r = 0.4587$. $$\text{DMF} = \frac{1}{\sqrt{0.3728^2 + 0.4587^2}} = 1.692$$</li>
  <li>(b) Peak at $f = 13.89\sqrt{1 - 2(0.2896)^2} = 12.67$ Hz, inside 11–17 Hz, so the sweep passes through it. $\text{DMF}_{max} = \dfrac{1}{2(0.2896)\sqrt{1-0.2896^2}} = 1.804$.</li>
  <li>$X_{st} = 6116/556000 = 11.00$ mm, so $X_{max} = 11.00\times1.804 = 19.84$ mm.</li></ol>`,
  ans: "DMF = 1.692; X_max = 19.84 mm (peak at 12.67 Hz)", prov: PROV });

add("balance", { src: "Loop quiz Q19", see: [3, 4], fig: "mom_ca_q19",
  q: R`The shaft in the figure carries three imbalanced rotors and runs in two radial bearings at 320 rpm. Find the dynamic forces on the bearings due to the imbalances.
  <div class="tbl"><table class="data num"><tr><th>Rotor</th><th>Mass (g)</th><th>Radius</th><th>Angle (°)</th></tr><tr><td>1</td><td>192</td><td>12.7</td><td>0</td></tr><tr><td>2</td><td>75</td><td>29.9</td><td>102</td></tr><tr><td>3</td><td>124</td><td>24.1</td><td>103</td></tr></table></div>
  Axial distances: A = 161, B = 93, C = 63, D = 49 mm. (The sheet labels the radius column "m", but the values are in mm.) In the end view, $\theta_2$ is drawn anticlockwise from rotor 1 and $\theta_3$ clockwise.`,
  hint: R`Take Bearing 1 as the reference plane ($l = 0$), so it drops out of the moment sum. Rotor 3 is at −103°. Solve $\Sigma mrl = 0$ for Bearing 2 first, then $\Sigma mr = 0$ for Bearing 1. Force $= mr\,\omega^2$ in kg·m.`,
  sol: R`<ol class="steps">
  <li>Angles: rotor 1 at 0°, rotor 2 at +102°, rotor 3 at −103°. Distances from Bearing 1: rotor 1 $-0.161$ m, rotor 2 $+0.093$, Bearing 2 $+0.156$, rotor 3 $+0.205$.</li>
  <li><div class="tbl"><table class="data num"><tr><th>Rotor</th><th>mr (g·mm)</th><th>x</th><th>y</th><th>l (m)</th><th>mrl x</th><th>mrl y</th></tr>
  <tr><td>1</td><td>2438.4</td><td>2438.4</td><td>0</td><td>−0.161</td><td>−392.58</td><td>0</td></tr>
  <tr><td>2</td><td>2242.5</td><td>−466.2</td><td>2193.5</td><td>0.093</td><td>−43.36</td><td>204.00</td></tr>
  <tr><td>3</td><td>2988.4</td><td>−672.2</td><td>−2911.8</td><td>0.205</td><td>−137.81</td><td>−596.92</td></tr>
  <tr><td>Sum</td><td></td><td>1299.9</td><td>−718.3</td><td></td><td>−573.75</td><td>−392.93</td></tr></table></div></li>
  <li>Couple imbalance about Bearing 1: $|\Sigma mrl| = \sqrt{573.75^2 + 392.93^2} = 695$ g·mm·m.</li>
  <li>Bearing 2 balance: $(mr)_2 = -\Sigma mrl/0.156 = (3677.9,\ 2518.8)$, magnitude 4458 g·mm at 34.4°.</li>
  <li>Bearing 1 balance: $(mr)_1 = -(\Sigma mr + (mr)_2) = -(4977.8,\ 1800.4) = (-4977.8,\ -1800.4)$, magnitude 5293 g·mm (at about 200°).</li>
  <li>$\omega = 320\times2\pi/60 = 33.51$ rad/s, $\omega^2 = 1123$. With 1 g·mm $= 10^{-6}$ kg·m: $F_1 = 5.293\times10^{-3}\times1123 = 5.94$ N and $F_2 = 4.458\times10^{-3}\times1123 = 5.01$ N.</li></ol>`,
  ans: "Bearing 1 ≈ 5.94 N; Bearing 2 ≈ 5.01 N (|Σmrl| = 695 g·mm·m)", prov: PROV + " The notes give Bearing 1 only; the Bearing 2 force was worked by Claude." });

add("gyro", { src: "Loop quiz Q20", see: [2, 3, 4], fig: "mom_ca_q20",
  q: R`A ship's turbine is held aligned with the fore–aft axis by two bearings (figure). The rotor has mass 918 kg and radius of gyration 145 mm. Its centre of mass is 887 mm behind the front bearing, and the bearings are 1488 mm apart.
  <br>(a) Find the static reactions at the front and rear bearings.
  <br>(b) The rotor spins at 3823 rpm (spin vector along $-\vec{j}$ in the figure) while the ship turns left at 2.91 knots on a radius of 2.33 km. Find the gyroscopic couple on the rotor frame and the resulting bearing reactions.`,
  hint: R`Static reactions by moments about each bearing. $I = mk^2$, $H = I\omega$, $v$ = knots × 1.852/3.6, $\Omega = v/R$ pointing up ($+\vec{k}$) for a left turn. $C = H\times\Omega$, then $\pm C/L$ at the bearings.`,
  sol: R`<ol class="steps">
  <li>(a) $W = 918\times9.81 = 9005.6$ N. G is $1488 - 887 = 601$ mm from the rear bearing. $R_F = 9005.6\times0.601/1.488 = 3637$ N and $R_R = 9005.6\times0.887/1.488 = 5368$ N (sum 9005 N ✓).</li>
  <li>(b) $I = 918\times0.145^2 = 19.30$ kg·m². $\omega = 3823\times2\pi/60 = 400.34$ rad/s, so $H = 7727$ kg·m²/s along $-\vec{j}$.</li>
  <li>$v = 2.91\times1.852/3.6 = 1.497$ m/s and $\Omega = 1.497/2330 = 6.43\times10^{-4}$ rad/s, along $+\vec{k}$ (left turn).</li>
  <li>$C = H\times\Omega = (-7727\,\vec{j})\times(6.43\times10^{-4}\,\vec{k}) = -4.96\,\vec{i}$ N·m, since $\vec{j}\times\vec{k} = \vec{i}$.</li>
  <li>Gyroscopic bearing reactions: $4.96/1.488 = 3.34$ N, equal and opposite: $R_F = -C/L = +3.34$ N and $R_R = -3.34$ N ($\vec{i}$-components).</li></ol>`,
  ans: "R_F = 3637 N, R_R = 5368 N; C = −4.96 i N·m; gyro reactions ±3.34 N", prov: PROV });
})();
