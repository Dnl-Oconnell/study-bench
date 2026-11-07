/* MEC1014 Mechanics of Machines — static and dynamic balancing of rotating masses (Lecture 6 – Mass Balance) */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };

T.topics.push({
id: "balance", part: "Balancing", title: "Static & Dynamic Balancing of Rotating Masses",
lectures: "Lecture 6 – Mass Balance", status: "lectured",
summary: "Why an offset centre of mass loads a rotating shaft, the static condition Σmr = 0 and the dynamic condition Σmrl = 0, and finding the balancing mass-radius products in two correction planes, with the shaking forces they remove.",
theory: R`
<h3>0. Static unbalance</h3>
<p>Static unbalance exists when the <b>mass centre does not lie on the axis of rotation</b>, i.e. the mass is distributed unevenly around the centre of rotation. An offset mass on a shaft is called an <b>eccentric mass</b>. Nearly every shaft carries some, because of the features used to hold parts on it.</p>
<p>Under gravity a mass $m$ at radius $r$ gives a torque $T=mgr$ about the axis, so a statically unbalanced shaft turned slowly always rolls back to the same position: the eccentric mass settles at the bottom, the point of minimum potential energy. Adding $m$ to a balanced disc of mass $M$ moves the combined centre of mass to $\bar r=\dfrac{m}{M+m}r$, and the net torque is still $(M+m)g\bar r=mgr$.</p>

<h3>1. Static balance condition</h3>
<p>Treat the shaft as perfectly balanced, carrying lumped masses on light rigid links. For static balance the gravity torques must cancel at <b>every</b> angle, which needs the vector sum of the mass-radius products to vanish:</p>
<div class="callout key">$$\sum m_i\vec r_i = m_1\vec r_1+m_2\vec r_2+m_3\vec r_3+\dots = 0$$</div>
<p>Checking $\sum T=0$ in one position (e.g. $m_1r_1\cos\alpha_1=m_2r_2\cos\alpha_2+m_3r_3\cos\alpha_3$) is not enough. If the $m\vec r$ vectors do not close, the shaft is out of balance.</p>
<p><b>Fixing it.</b> Draw the $m\vec r$ vectors head to tail. The gap from the start to the end is the total out-of-balance. Add a balancing mass with $m_b\vec r_b$ equal and opposite to that gap, so the polygon closes.</p>

<h3>2. Rotating eccentric mass</h3>
<p>When the shaft spins at $\omega$, an eccentric mass $m_e$ at radius $r_e$ has centripetal acceleration $r_e\omega^2$. The force it exerts on the shaft rotates with it:</p>
<div class="callout key">$$F_e=m_e r_e\omega^2$$</div>
<p>With several rotors on one shaft, $\omega$ is common, so each force is proportional to that rotor's $mr$ and points along its mass's direction. The radial forces cancel when</p>
$$\sum m_i r_i\omega^2=0\;\Rightarrow\;\sum m_i\vec r_i=0$$
<p>This is the same as the static condition. <b>Static balance is a prerequisite for dynamic balance.</b></p>

<h3>3. Dynamic balance: the moment condition</h3>
<p>The rotors sit at different axial positions $l_i$ from a <b>reference plane</b>. Even if the forces cancel, they can form a couple that bends the shaft (dynamic unbalance). Taking moments about the reference plane:</p>
$$\sum M=(m_1r_1\omega^2)l_1+(m_2r_2\omega^2)l_2+(m_3r_3\omega^2)l_3\;\Rightarrow\;\sum m_i\vec r_i\,l_i$$
<div class="callout key">Complete balance needs both $$\sum m_i\vec r_i=0\qquad\text{and}\qquad\sum m_i\vec r_i\,l_i=0$$</div>
<p>The $m\vec r l$ vectors are handled exactly like the $m\vec r$ vectors (polygon, then a balancing $m_b\vec r_b l_b$ to close it). $l$ is <b>positive or negative</b> depending on which side of the reference plane the rotor is.</p>

<h3>4. Method: two correction planes</h3>
<ol class="steps">
<li>Tabulate each rotor's $mr$, angle $\theta$ and axial distance $l$.</li>
<li>Put the reference plane <b>at one correction plane</b> (E). Its unknown then has $l=0$ and drops out of the moment equation.</li>
<li>Moment balance, resolved into components: $\sum m r l\cos\theta+m_Fr_Fl_F\cos\theta_F=0$ and $\sum m r l\sin\theta+m_Fr_Fl_F\sin\theta_F=0$. Solve for $m_Fr_F$ and $\theta_F$ (check the quadrant).</li>
<li>Force balance, now including F: $\sum mr\cos\theta+m_Er_E\cos\theta_E=0$ and the same with $\sin$. Solve for $m_Er_E$ and $\theta_E$.</li>
<li>Shaking force at a bearing before correction: $F=mr\omega^2$ using that plane's correction $mr$. After complete balancing it is zero.</li>
</ol>
<p>The lecture example (below) uses this method with E midway between A and B and F midway between C and D.</p>

<h3>5. Wheel balancing</h3>
<p>Car wheels are balanced by clipping or sticking small masses at particular points on the rim. <b>Static imbalance</b> makes the wheel hop (wheel tramp). <b>Dynamic imbalance</b> makes it wobble from side to side (wheel shimmy).</p>
`,
formulas: [
 {name:"Static balance", tex:R`\sum m_i\vec r_i=0`, note:"vector sum: x and y components both zero"},
 {name:"Force from a rotating eccentric mass", tex:R`F_e=m_e r_e\omega^2`},
 {name:"Dynamic (moment) balance", tex:R`\sum m_i\vec r_i\,l_i=0`, note:"l signed from the reference plane; needs static balance too"},
 {name:"Components", tex:R`\sum mrl\cos\theta=0,\quad \sum mrl\sin\theta=0`},
 {name:"Balancing mr and angle", tex:R`m_br_b=\sqrt{X^2+Y^2},\quad \theta_b=\tan^{-1}\frac{Y}{X}`, note:"X, Y = what the correction must supply; pick the quadrant from the signs"}
],
questions: [
 {src:"Lecture 6 example", fig:"mom_bal4", see:[3,4], q:R`A shaft carries four unbalanced rotors A, B, C, D. Two correction planes (at the bearings) E and F sit midway between A & B and between C & D. Find the magnitude and angular position of the balancing mass-radius products in E and F for complete static and dynamic balance, and the shaking forces at E and F at 50 rpm.<table class="data num"><tr><th>Rotor</th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><td>Mass (kg)</td><td>2</td><td>3</td><td>5</td><td>3.5</td></tr><tr><td>Radius (m)</td><td>0.02</td><td>0.03</td><td>0.04</td><td>0.05</td></tr><tr><td>Angle</td><td>0°</td><td>60°</td><td>190°</td><td>270°</td></tr><tr><td>Axial position (m)</td><td>0</td><td>0.2</td><td>0.35</td><td>0.6</td></tr></table>`,
  hint:"Take E as the reference plane (E at 0.1 m, F at 0.475 m), so E drops out of the moment equation. Solve Σmrl = 0 for F, then Σmr = 0 for E.",
  sol:R`<p><b>Table</b> (distances from E, which is at 0.1 m; F is at 0.475 m):</p><table class="data num"><tr><th>Rotor</th><th>$mr$ (kg·m)</th><th>Angle</th><th>$l$ from E (m)</th></tr><tr><td>A</td><td>0.040</td><td>0°</td><td>−0.100</td></tr><tr><td>B</td><td>0.090</td><td>60°</td><td>+0.100</td></tr><tr><td>C</td><td>0.200</td><td>190°</td><td>+0.250</td></tr><tr><td>D</td><td>0.175</td><td>270°</td><td>+0.500</td></tr><tr><td>E</td><td>?</td><td>?</td><td>0</td></tr><tr><td>F</td><td>?</td><td>?</td><td>+0.375</td></tr></table>
  <p><b>Moments about E</b>, cos components: $0.04(-0.1)\cos0^\circ+0.09(0.1)\cos60^\circ+0.20(0.25)\cos190^\circ+0.175(0.5)\cos270^\circ+m_Fr_Fl_F\cos\theta_F=0$, so $m_Fr_Fl_F\cos\theta_F=0.04874$ kg·m².</p>
  <p>sin components: $0+0.09(0.1)\sin60^\circ+0.20(0.25)\sin190^\circ+0.175(0.5)\sin270^\circ+m_Fr_Fl_F\sin\theta_F=0$, so $m_Fr_Fl_F\sin\theta_F=0.08839$ kg·m².</p>
  <p>$\theta_F=\tan^{-1}(0.08839/0.04874)=61.13^\circ$ (both positive: first quadrant). $m_Fr_Fl_F=\sqrt{0.04874^2+0.08839^2}=0.10094$, so $m_Fr_F=0.10094/0.375=0.2692$ kg·m.</p>
  <p><b>Forces</b>, including F: $\sum mr\cos\theta=0.04+0.045-0.19696+0+0.2692\cos61.13^\circ=0.01801$ and $\sum mr\sin\theta=0+0.07794-0.03473-0.175+0.2692\sin61.13^\circ=0.10391$. E must cancel these: $m_Er_E\cos\theta_E=-0.01801$, $m_Er_E\sin\theta_E=-0.10391$.</p>
  <p>Both negative: third quadrant. $\tan^{-1}(0.10391/0.01801)=80.17^\circ$, so $\theta_E=180^\circ+80.17^\circ=260.17^\circ$, and $m_Er_E=\sqrt{0.01801^2+0.10391^2}=0.1055$ kg·m.</p>
  <p><b>Shaking forces</b> before correction, $\omega=50\times2\pi/60=5.236$ rad/s: $F_E=0.10546(5.236)^2=2.89$ N, $F_F=0.26916(5.236)^2=7.38$ N. After complete balancing both are zero.</p>`,
  ans:"E: 0.1055 kg·m at 260.17°; F: 0.2692 kg·m at 61.13°; F_E = 2.89 N, F_F = 7.38 N", prov:"From the worked example in Lecture 6; numbers re-checked."},
 {src:"Practice (Lecture 6 static balance)", see:[1], q:R`Using the rotors from the Lecture 6 example (A 0.040 kg·m at 0°, B 0.090 at 60°, C 0.200 at 190°, D 0.175 at 270°), find the single balancing mass-radius product and its angle that would give <b>static</b> balance only. Explain why this alone would not give dynamic balance.`,
  hint:"Add the x and y components of the four mr vectors. The balancing mr is equal and opposite to the resultant.",
  sol:R`<p>$\sum mr\cos\theta=0.04+0.09\cos60^\circ+0.2\cos190^\circ+0.175\cos270^\circ=0.04+0.045-0.19696+0=-0.11196$.</p><p>$\sum mr\sin\theta=0+0.07794-0.03473-0.175=-0.13179$.</p><p>The balancing mass must supply $+0.11196$ and $+0.13179$: $m_br_b=\sqrt{0.11196^2+0.13179^2}=0.1729$ kg·m at $\theta_b=\tan^{-1}(0.13179/0.11196)=49.65^\circ$.</p><p>This closes the $m\vec r$ polygon, but the rotors sit at different axial positions, so $\sum m\vec r\,l\ne0$: the forces still form a rotating couple that bends the shaft and loads the bearings. Dynamic balance needs two correction planes.</p>`,
  ans:"0.173 kg·m at 49.6°; a single plane cannot cancel the couple Σmrl", prov:"Worked by Claude; no solution is available. The components match the force sums in the Lecture 6 example before E and F are added."}
],
traps: [
 "Static balance at one position (ΣT = 0) is not static balance. The mr vectors must sum to zero, so the shaft stays put at any angle.",
 "Static balance does not imply dynamic balance; dynamic balance needs both Σmr = 0 and Σmrl = 0.",
 "Put the reference plane at one correction plane so that plane's unknown drops out of the moment equation.",
 "Axial distances are signed: a rotor on the other side of the reference plane has negative l (rotor A in the example).",
 "Check the quadrant: tan⁻¹ alone gives 80.17°, but with both components negative the angle is 260.17°.",
 "Measure axial distances from the reference plane, not from rotor A. In the example E is 0.1 m from A."
]
});
})();
