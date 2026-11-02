/* MEC1014: Loop quiz questions (from Daniel's screenshots), placed on their topics. Every answer re-computed. */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };
const add = (id, q) => { const t = T.topics.find(x => x.id === id); if (t) t.questions.push(q); };
const PROV = "Worked by Claude; matches the answer you entered on Loop.";

add("harmonic", { src: "Loop quiz Q1", see: [3, 4, 5],
  q: R`A spring–mass–dashpot system is excited by a sinusoidal force acting directly on the mass. $m = 62$ kg, $k = 461.0$ N/mm, $c = 3.35$ N·s/mm.
  <br>(a) Find the dynamic magnification factor at an excitation frequency of 11 Hz.
  <br>(b) Find the maximum amplitude of the mass for a sinusoidal force of magnitude 5993 N when the frequency is swept from 11 Hz to 13 Hz.`,
  hint: R`Convert to SI first ($k$ = 461 000 N/m, $c$ = 3350 N·s/m). For (b), check whether the resonance peak $r = \sqrt{1-2\zeta^2}$ falls inside the swept band.`,
  sol: R`<ol class="steps">
  <li>$\omega_n = \sqrt{k/m} = \sqrt{461000/62} = 86.23$ rad/s, so $f_n = 13.72$ Hz.</li>
  <li>$\zeta = \dfrac{c}{2\sqrt{km}} = \dfrac{3350}{2\sqrt{461000\times62}} = 0.3133$.</li>
  <li>(a) $r = 11/13.72 = 0.8015$, so $$\text{DMF} = \frac{1}{\sqrt{(1-r^2)^2 + (2\zeta r)^2}} = \frac{1}{\sqrt{(1-0.6424)^2 + (0.5023)^2}} = 1.62$$</li>
  <li>(b) The DMF peaks at $r = \sqrt{1-2\zeta^2} = 0.8965$, i.e. $f = 0.8965\times13.72 = 12.30$ Hz. That is inside 11–13 Hz, so the maximum is the true resonance peak, not an end of the sweep.</li>
  <li>$\text{DMF}_{max} = \dfrac{1}{2\zeta\sqrt{1-\zeta^2}} = \dfrac{1}{2(0.3133)\sqrt{1-0.0982}} = 1.680$.</li>
  <li>Static deflection $X_s = F_0/k = 5993/461000 = 13.0$ mm, so $X_{max} = 1.680\times13.0 = 21.8$ mm. (For comparison: 21.1 mm at 11 Hz and 21.6 mm at 13 Hz.)</li></ol>`,
  ans: "DMF = 1.62; X_max = 21.8 mm (at 12.30 Hz)", prov: PROV });

add("imbalance", { src: "Loop quiz Q2", see: [3, 4, 5], fig: "mom_quiz_trailer",
  q: R`A single-axle trailer suspension is modelled as a spring $k = 150.0$ N/mm and dashpot $c = 10400$ N·s/m in parallel between the axle and the body. The trailer body above the suspension is $m = 118$ kg and the load is $M_L = 150$ kg, both directly above the tyre contact point. The hitch gives no vertical resistance. The road is a sinusoid of amplitude $Y = 111$ mm and wavelength $\lambda = 1.976$ m.
  <br>(a) Find the natural frequency of the suspended trailer mass.
  <br>(b) At 37.5 km/h, at what frequency is the wheel forced up and down?
  <br>(c) What is the ratio of the trailer's vertical amplitude to the road amplitude at this speed?`,
  hint: R`The suspended mass is body plus load. The forcing frequency is how many wavelengths pass per second, $f = v/\lambda$. Part (c) is base-excitation transmissibility, which keeps the $2\zeta r$ term in the numerator.`,
  sol: R`<ol class="steps">
  <li>(a) Suspended mass $M = 118 + 150 = 268$ kg. $\omega_n = \sqrt{150000/268} = 23.66$ rad/s, so $f_n = 3.77$ Hz.</li>
  <li>(b) $v = 37.5/3.6 = 10.42$ m/s, so $f = v/\lambda = 10.42/1.976 = 5.27$ Hz.</li>
  <li>$\zeta = \dfrac{c}{2\sqrt{kM}} = \dfrac{10400}{2\sqrt{150000\times268}} = 0.820$ and $r = 5.27/3.77 = 1.400$.</li>
  <li>(c) $$\frac{X}{Y} = \sqrt{\frac{1 + (2\zeta r)^2}{(1-r^2)^2 + (2\zeta r)^2}} = \sqrt{\frac{1 + 2.297^2}{(1-1.960)^2 + 2.297^2}} = 1.006$$</li>
  <li>Sanity check: $r = 1.40$ is just below $\sqrt2 = 1.414$, where every transmissibility curve passes through 1, so a ratio of almost exactly 1 is expected. The heavy damping barely matters at this speed.</li></ol>`,
  ans: "f_n = 3.77 Hz; f = 5.27 Hz; X/Y = 1.006", prov: PROV });

add("epicyclic", { src: "Loop quiz Q3", see: [0, 1, 2, 4], fig: "mom_quiz_epi",
  q: R`An epicyclic train is driven by the link (carrier) carrying the planets (13 teeth); the output is the ring (51 teeth).
  <br>(a) How many teeth are on the sun?
  <br>(b) With the sun fixed, find output speed / input speed.
  <br>(c) 1.5 kW at 5050 rpm is supplied to the input shaft. Find the output torque, assuming no losses.`,
  hint: R`Geometry: $N_r = N_s + 2N_p$. Then use Willis with the sun fixed: $\dfrac{\omega_r - \omega_c}{\omega_s - \omega_c} = -\dfrac{N_s}{N_r}$.`,
  sol: R`<ol class="steps">
  <li>(a) $N_s = N_r - 2N_p = 51 - 26 = 25$ teeth.</li>
  <li>(b) With $\omega_s = 0$: $\dfrac{\omega_r - \omega_c}{0 - \omega_c} = -\dfrac{25}{51}$, so $\omega_r = \omega_c\left(1 + \dfrac{25}{51}\right) = 1.490\,\omega_c$. The ring turns faster than the carrier, in the same direction.</li>
  <li>(c) $\omega_{in} = 5050\times\dfrac{2\pi}{60} = 528.8$ rad/s and $\omega_{out} = 1.490\times528.8 = 788.0$ rad/s.</li>
  <li>No losses, so power out = power in: $T_{out} = \dfrac{1500}{788.0} = 1.90$ N·m The input torque is $1500/528.8 = 2.84$ N·m; speeding up by 1.490 divides the torque by 1.490.</li></ol>`,
  ans: "N_s = 25; n = 1.490; T_out = 1.90 N·m", prov: PROV });

add("gears", { src: "Loop quiz Q4", see: [1, 3, 4, 5], fig: "mom_quiz_gearbox",
  q: R`A manual four-speed gearbox has an input shaft, countershaft and output shaft as shown (1st: 1-2-5-8, 2nd: 1-2-4-7, 3rd: 1-2-3-6, 4th: straight through).
  <div class="tbl"><table class="data num"><tr><th>Gear</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><th>Teeth</th><td>14</td><td>32</td><td>26</td><td>18</td><td>11</td><td>20</td><td>28</td><td>35</td></tr></table></div>
  (a) Find the four forward speed ratios (output/input).
  <br>(b) The gearbox is 100% efficient, the input torque is 1700 N·m and the inertial load on the output shaft is 500 kg·m². The effective wheel rolling radius on the output shaft is 235 mm. Find the output torque and angular acceleration in 2nd and 3rd, and the difference in time to accelerate from 55 to 107 km/h in 3rd rather than 2nd.`,
  hint: R`Each ratio is (driver/driven) for both meshes: gear 1 drives 2, then the countershaft gear drives the output gear. Torque scales by 1/ratio; $\alpha = T/I$; convert road speed to shaft speed with $\omega = v/r$.`,
  sol: R`<ol class="steps">
  <li>1st: $\dfrac{14}{32}\cdot\dfrac{11}{35} = 0.1375$. 2nd: $\dfrac{14}{32}\cdot\dfrac{18}{28} = 0.2813$. 3rd: $\dfrac{14}{32}\cdot\dfrac{26}{20} = 0.5688$. 4th: 1.</li>
  <li>Output torque: 2nd $1700/0.28125 = 6044$ N·m; 3rd $1700/0.56875 = 2989$ N·m.</li>
  <li>$\alpha = T/I$: 2nd $6044/500 = 12.09$ rad/s²; 3rd $2989/500 = 5.978$ rad/s².</li>
  <li>Shaft speeds: $\omega_1 = \dfrac{55/3.6}{0.235} = 65.01$ rad/s and $\omega_2 = \dfrac{107/3.6}{0.235} = 126.48$ rad/s, so $\Delta\omega = 61.47$ rad/s.</li>
  <li>$t_{2nd} = 61.47/12.09 = 5.08$ s and $t_{3rd} = 61.47/5.978 = 10.28$ s. Difference $= 5.20$ s.</li></ol>`,
  ans: "0.1375, 0.2813, 0.5688, 1; 6044 / 2989 N·m; 12.09 / 5.978 rad/s²; Δt = 5.20 s", prov: PROV });

add("belts", { src: "Loop quiz Q5", see: [1], fig: "mom_quiz_belt",
  q: R`Using the shaded right-angled triangle of a standard open belt drive, find the angles of lap on the two pulleys. $d_L = 410$ mm, $d_S = 140$ mm, centre distance $L = 435$ mm.`,
  hint: R`In the triangle, the hypotenuse is $L$ and the side opposite the small angle is $r_L - r_S$. The small pulley loses twice that angle, the large one gains it.`,
  sol: R`<ol class="steps">
  <li>$\sin\alpha = \dfrac{r_L - r_S}{L} = \dfrac{205 - 70}{435} = 0.3103$, so $\alpha = 0.3156$ rad.</li>
  <li>$\theta_S = \pi - 2\alpha = 2.510$ rad.</li>
  <li>$\theta_L = \pi + 2\alpha = 3.773$ rad.</li>
  <li>Check: $\theta_S + \theta_L = 2\pi$. ✓</li></ol>`,
  ans: "θ_S = 2.510 rad; θ_L = 3.773 rad", prov: PROV });

add("belts", { src: "Loop quiz Q6", see: [2, 3, 4], fig: "mom_quiz_belt",
  q: R`A belt drive with input:output speed ratio 0.425 transmits 1.6 kW through a driver pulley of diameter 120 mm at 2250 rpm. The angle of lap $\theta_S$ is 125°, the average belt tension $\tfrac{T_1+T_2}{2}$ is 200 N, and the belt's mass per unit length is $\dot m = 125$ g/m. Find the minimum coefficient of friction between belt and pulley to prevent slipping.`,
  hint: R`Get $T_1 - T_2$ from $P = (T_1 - T_2)v$ and combine it with $T_1 + T_2 = 400$ N. Don't forget centrifugal tension: $\dfrac{T_1 - \dot m v^2}{T_2 - \dot m v^2} = e^{\mu\theta}$.`,
  sol: R`<ol class="steps">
  <li>Belt speed $v = \pi(0.12)(2250/60) = 14.14$ m/s.</li>
  <li>$T_1 - T_2 = P/v = 1600/14.14 = 113.2$ N. With $T_1 + T_2 = 400$ N: $T_1 = 256.6$ N, $T_2 = 143.4$ N.</li>
  <li>Centrifugal tension $\dot m v^2 = 0.125\times14.14^2 = 25.0$ N.</li>
  <li>$e^{\mu\theta} = \dfrac{256.6 - 25.0}{143.4 - 25.0} = 1.956$ with $\theta = 125^\circ = 2.182$ rad.</li>
  <li>$\mu = \dfrac{\ln 1.956}{2.182} = 0.307$.</li>
  <li>Leaving out centrifugal tension gives $\mu = 0.267$, which is too low: at 14 m/s the centrifugal term matters.</li></ol>`,
  ans: "μ = 0.307", prov: PROV });
})();
