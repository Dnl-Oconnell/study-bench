/* MEC1014 Mechanics of Machines — "Sample Questions" sheet (4 worked questions: epicyclic, gear train, two-plane balancing, gyroscope) */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };
const add = (id, qs) => { const t = T.topics.find(x => x.id === id); if (t) (t.questions = t.questions || []).push(...qs); };

add("epicyclic", [
 {src:"Sample Questions Q1", see:[0,1,4], q:R`An epicyclic gear set has a sun gear (30 teeth), three identical planets, a ring gear (90 teeth) and a carrier. The ring is fixed, the sun is the input at 600 rpm with 3 kW, and the carrier is the output. Efficiency is 100%.<ol type="a"><li>Find the number of teeth on each planet.</li><li>State the Willis equation and use it to find the carrier speed.</li><li>Find the planet speed.</li><li>Find the input torque on the sun.</li><li>Find the carrier torque and the reaction torque on the fixed ring.</li></ol>`,
  hint:"Geometry: N_r = N_s + 2N_p. Willis: N_s(ω_s − ω_c) = −N_r(ω_r − ω_c) in the sheet's sign form. For torques use P = Tω, the power balance ΣTω = 0 and the torque balance ΣT = 0.",
  sol:R`<p><b>(a)</b> $N_r=N_s+2N_p\Rightarrow 90=30+2N_p\Rightarrow N_p=30$ teeth.</p>
  <p><b>(b)</b> Willis equation (as written on the sheet): $N_s(\omega_s-\omega_c)=N_r(\omega_c-\omega_r)$. With the ring fixed, $\omega_r=0$: $30(600-\omega_c)=90\,\omega_c\Rightarrow\omega_c=150$ rpm.</p>
  <p><b>(c)</b> $\omega_p=\omega_c-\dfrac{N_s}{N_p}(\omega_s-\omega_c)=150-\dfrac{30}{30}(600-150)=-300$ rpm. The minus sign means the planets spin about their own axes the opposite way to the sun.</p>
  <p><b>(d)</b> $\omega_s=2\pi(600)/60=62.83$ rad/s, so $T_s=P/\omega_s=3000/62.83=47.75$ N·m.</p>
  <p><b>(e)</b> Power balance with the ring fixed: $T_s\omega_s+T_c\omega_c=0\Rightarrow T_c=-T_s\dfrac{\omega_s}{\omega_c}=-47.75\times4=-190.99$ N·m.<br>Torque balance: $T_s+T_c+T_r=0\Rightarrow T_r=-(47.75-190.99)=143.24$ N·m.</p>`,
  ans:"N_p = 30; ω_c = 150 rpm; ω_p = −300 rpm; T_s = 47.75 N·m; T_c = −190.99 N·m; T_r = 143.24 N·m", prov:"Follows the posted solution."}
]);

add("gears", [
 {src:"Sample Questions Q2", see:[1,3], q:R`Three shafts and four gears form a compound train from a motor at A to a machine tool at F. Gear B (60 mm) on the motor shaft drives gear C (150 mm); gear D (60 mm), on the same shaft as C, drives gear E (150 mm) on the output shaft. The motor runs at $\omega_A=180$ rad/s with torque $T_A=52$ N·m. Assume no losses. Find the overall speed ratio $\omega_{out}/\omega_{in}$, the output torque at F and the power transmitted.`,
  hint:"Each mesh scales speed by driver diameter over driven diameter. C and D share a shaft. Then T_in ω_in = T_out ω_out.",
  sol:R`<p>Stage 1: $\omega_C/\omega_B=60/150=0.4$. Stage 2: $\omega_E/\omega_D=60/150=0.4$. Since $\omega_C=\omega_D$, $n=0.4\times0.4=0.16$.</p>
  <p>$\omega_F=0.16\times180=28.8$ rad/s.</p>
  <p>No losses: $T_F=\dfrac{T_A\omega_A}{\omega_F}=\dfrac{52\times180}{28.8}=325$ N·m (or $T_A/n=52/0.16$).</p>
  <p>$P=52\times180=9360$ W; check at the output: $325\times28.8=9360$ W.</p>`,
  ans:"n = 0.16; T_F = 325 N·m; P = 9.36 kW", prov:"Follows the posted solution."}
]);

add("balance", [
 {src:"Sample Questions Q3", see:[1,3,4], q:R`A shaft running at 600 rpm carries four unbalanced rotors. Balancing masses go in two correction planes: E midway between A and B, and F midway between C and D. Angles are measured anticlockwise from the positive horizontal.<table class="data num"><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><td>Mass (kg)</td><td>2</td><td>4</td><td>3</td><td>5</td></tr><tr><td>Radius (m)</td><td>0.03</td><td>0.04</td><td>0.05</td><td>0.02</td></tr><tr><td>Angle</td><td>0°</td><td>90°</td><td>180°</td><td>270°</td></tr><tr><td>Axial position (m)</td><td>0</td><td>0.2</td><td>0.4</td><td>0.6</td></tr></table><ol type="a"><li>Find $mr$ for each rotor and the resultant static imbalance.</li><li>Taking plane E as reference, find the magnitude and angle of $m_Fr_F$ needed for moment balance.</li><li>Find $m_Er_E$ for complete static and dynamic balance.</li><li>If both balancing masses sit at 100 mm, find $m_E$ and $m_F$.</li><li>Find the shaking forces at bearings E and F before balancing.</li></ol>`,
  hint:"Build an mr table, then an mrl table with lengths measured from E (x_E = 0.1 m, x_F = 0.5 m). Moment balance about E gives F; static balance then gives E.",
  sol:R`<p><b>(a)</b> $mr$: A 0.06, B 0.16, C 0.15, D 0.10 kg·m. $\sum mr\cos\theta=0.06-0.15=-0.09$; $\sum mr\sin\theta=0.16-0.10=0.06$.<br>$R=\sqrt{0.09^2+0.06^2}=0.10817$ kg·m at $180^\circ-33.69^\circ=146.31^\circ$ (second quadrant).</p>
  <p><b>(b)</b> $x_E=0.1$ m, $x_F=0.5$ m, so $l$ from E: A −0.1, B 0.1, C 0.3, D 0.5, F 0.4 m.<table class="data num"><tr><th>Rotor</th><th>mr</th><th>l (m)</th><th>Angle</th><th>mrl (kg·m²)</th></tr><tr><td>A</td><td>0.06</td><td>−0.1</td><td>0°</td><td>−0.006</td></tr><tr><td>B</td><td>0.16</td><td>0.1</td><td>90°</td><td>0.016</td></tr><tr><td>C</td><td>0.15</td><td>0.3</td><td>180°</td><td>0.045</td></tr><tr><td>D</td><td>0.10</td><td>0.5</td><td>270°</td><td>0.050</td></tr></table>
  $x$: $-0.006-0.045+0.4m_Fr_F\cos\theta_F=0\Rightarrow m_Fr_F\cos\theta_F=0.1275$.<br>$y$: $0.016-0.050+0.4m_Fr_F\sin\theta_F=0\Rightarrow m_Fr_F\sin\theta_F=0.085$.<br>$m_Fr_F=\sqrt{0.1275^2+0.085^2}=0.15324$ kg·m at $\theta_F=\tan^{-1}(0.085/0.1275)=33.69^\circ$.</p>
  <p><b>(c)</b> Static balance: $m_E\vec r_E=-\vec R-m_F\vec r_F=(0.09-0.1275,\ -0.06-0.085)=(-0.0375,\ -0.145)$.<br>$m_Er_E=0.14977$ kg·m; both components negative, so $\theta_E=180^\circ+75.50^\circ=255.50^\circ$.</p>
  <p><b>(d)</b> $m_E=0.14977/0.1=1.498$ kg; $m_F=0.15324/0.1=1.532$ kg.</p>
  <p><b>(e)</b> $\omega=62.832$ rad/s. The posted solution takes the force each balancing mass has to cancel: $F_E=0.14977(62.832)^2=591.3$ N and $F_F=0.15324(62.832)^2=605.0$ N.</p>`,
  ans:"R = 0.1082 kg·m at 146.3°; m_Fr_F = 0.1532 kg·m at 33.7°; m_Er_E = 0.1498 kg·m at 255.5°; m_E = 1.498 kg, m_F = 1.532 kg; F_E ≈ 591 N, F_F ≈ 605 N", prov:"Follows the posted solution."}
]);

add("gyro", [
 {src:"Sample Questions Q4", see:[1,2,4], q:R`A uniform thin disc ($m=5$ kg, $r=150$ mm) is mounted at the end of a light rod; the other end of the rod sits on a frictionless pivot P. The disc's centre is $L=250$ mm from P, the rod makes $60^\circ$ with the vertical, and the disc spins at 3000 rpm about the rod while precessing steadily about the vertical. Take $g=9.81$ m/s², slow precession and no nutation.<ol type="a"><li>Find the disc's moment of inertia about the spin axis and its angular momentum.</li><li>Find the gravity moment about P.</li><li>Derive an expression for the steady precession rate.</li><li>Find the precession rate in rad/s and rpm, and the time for one precession revolution.</li><li>Find the precession rate if the spin speed is doubled, and explain the relationship.</li></ol>`,
  hint:"I = ½mr². The gravity moment arm is L sin θ. With H dominated by spin, C = ΩH sin θ, so the sin θ cancels.",
  sol:R`<p><b>(a)</b> $I=\tfrac12(5)(0.15)^2=0.05625$ kg·m²; $\omega=2\pi(3000)/60=314.16$ rad/s; $H=I\omega=17.67$ kg·m²/s.</p>
  <p><b>(b)</b> $C_g=mgL\sin\theta=5(9.81)(0.25)\sin60^\circ=10.62$ N·m.</p>
  <p><b>(c)</b> $\vec C_A=d\vec H/dt=\vec\Omega\times\vec H$. The angle between $\vec\Omega$ (vertical) and $\vec H$ (along the rod) is $\theta$, so $C_A=I\omega\Omega\sin\theta$. Setting $C_g=C_A$: $mgL\sin\theta=I\omega\Omega\sin\theta\Rightarrow\Omega=\dfrac{mgL}{I\omega}=\dfrac{2gL}{r^2\omega}$ for a disc. In this approximation $\Omega$ depends on neither the mass nor the angle.</p>
  <p><b>(d)</b> $\Omega=\dfrac{5(9.81)(0.25)}{0.05625(314.16)}=0.694$ rad/s $=6.63$ rpm; $t_p=2\pi/\Omega=9.05$ s.</p>
  <p><b>(e)</b> $\Omega\propto1/\omega$, so doubling the spin to 6000 rpm halves the precession: $\Omega_2=0.347$ rad/s $=3.31$ rpm. More spin means more angular momentum, so the same gravity couple turns it more slowly.</p>`,
  ans:"I = 0.05625 kg·m², H = 17.67 kg·m²/s; C_g = 10.62 N·m; Ω = mgL/(Iω) = 0.694 rad/s = 6.63 rpm, t = 9.05 s; doubled spin → 0.347 rad/s (3.31 rpm)", prov:"Follows the posted solution."}
]);
})();
