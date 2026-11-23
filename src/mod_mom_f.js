/* MEC1014 Mechanics of Machines — gyroscopic motion (Lecture 7) and Tutorial 9 Q3–Q6 */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };

T.topics.push({
id: "gyro", part: "Gyroscopes", title: "Gyroscopic Motion & Gyroscopic Couple",
lectures: "Lecture 7 – Gyroscopic Motion", status: "lectured",
summary: "Spin and precession as vectors, the gyroscopic couple C = IωΩ from the rate of change of angular momentum, finding its direction with the right-hand rule or a determinant, the applied couple versus the reaction on the bearings, and the banked-motorcycle example.",
theory: R`
<h3>0. Angular velocity and angular momentum as vectors</h3>
<p>In planar mechanics rotation is drawn as a curved arrow. In 3-D the angular velocity $\vec\omega$ is a <b>vector normal to the plane of rotation</b>, pointing the way the right-hand rule gives: curl the fingers of the right hand in the sense of rotation and the thumb points along $\vec\omega$.</p>
<p>Just as translation gives linear momentum $\vec L=m\vec v$ (kg·m/s), rotation gives <b>angular momentum</b></p>
<div class="callout key">$$\vec H=I\vec\omega\qquad[\text{kg·m}^2/\text{s}]$$</div>
<p>which points the same way as $\vec\omega$. For a uniform disc of mass $m$ and radius $R$ spinning about its centre, $I=\tfrac12mR^2$. For a body given a radius of gyration $k$, $I=mk^2$. The rotation about the body's own axis is called <b>spin</b>, $\omega$ (rad/s).</p>

<h3>1. Precession</h3>
<p><b>Precession</b> is rotation of the body about an axis other than its spin axis, at angular velocity $\Omega$. It does not change the size of $\vec H$, only its <b>direction</b>. In the lecture the disc spins about $z$ ($\vec H=I\omega\,\vec k$) and precesses about $y$ ($\vec\Omega=\Omega\,\vec j$).</p>

<h3>2. The gyroscopic couple</h3>
<p>In a short time $dt$ the momentum vector turns through a small angle $d\theta$. Its length $I\omega$ is unchanged, so the tip moves a distance $I\omega\,d\theta$ (using $\sin d\theta\approx d\theta$), at right angles to $\vec H$. The rate of change is</p>
$$\dot H=\frac{dH}{dt}=I\omega\frac{d\theta}{dt}=\Omega I\omega,\qquad \text{as a vector: }\ \dot{\vec H}=\vec\Omega\times I\vec\omega=\vec\Omega\times\vec H$$
<p>Units: (kg·m²)(rad/s)(rad/s) = kg·m²/s² = N·m, a moment. Newton's second law for rotation says the resultant external moment equals the rate of change of angular momentum, so a precessing rotor needs a couple of magnitude</p>
<div class="callout key">$$C=I\omega\Omega$$</div>
<p>If the spin axis is not at right angles to the precession axis, only the component of $\Omega$ perpendicular to the spin axis counts: $C=I\omega\Omega\sin\gamma$, with $\gamma$ the angle between the two axes. (This is where the $\cos\alpha$ in the motorcycle example comes from.)</p>

<h3>3. Direction: applied couple and reaction couple</h3>
<p><b>Applied couple</b> $\vec C_A$: the net external couple that must act <b>on the rotor</b> to make it precess.</p>
$$\vec C_A=\vec\Omega\times I\vec\omega=\begin{vmatrix}\vec i&\vec j&\vec k\\0&\Omega&0\\0&0&I\omega\end{vmatrix}=I\omega\Omega\,\vec i$$
<p><b>Reaction couple</b> $\vec C_R$: the equal and opposite couple the rotor exerts <b>on its bearings, supports or frame</b>. This is what loads the bearings or tips the vehicle.</p>
$$\vec C_R=-\vec C_A=I\vec\omega\times\vec\Omega=\begin{vmatrix}\vec i&\vec j&\vec k\\0&0&I\omega\\0&\Omega&0\end{vmatrix}=-I\omega\Omega\,\vec i$$
<div class="callout">Order matters in a cross product. Row order in the determinant: unit vectors, then the first vector, then the second. Applied: precession then momentum. Reaction: momentum then precession.</div>
<p>A quick check without determinants: the applied couple turns the <b>spin vector towards the precession direction</b>, i.e. $\vec C_A$ is the axis about which you would rotate $\vec\omega$ to swing it the way it is being precessed.</p>

<h3>4. Method for gyroscope problems</h3>
<ol class="steps">
<li>Set up right-handed axes. Use the right-hand rule to write $\vec\omega$ (spin) and $\vec\Omega$ (precession) as vectors.</li>
<li>$I=mk^2$ (or $\tfrac12mR^2$ for a disc). Convert rpm to rad/s ($\times2\pi/60$). For a vehicle turning on radius $R$ at speed $v$, $\Omega=v/R$.</li>
<li>Magnitude: $C=I\omega\Omega$ (times $\sin\gamma$ if the axes are not perpendicular).</li>
<li>Direction: $\vec C_A=\vec\Omega\times I\vec\omega$ is the couple the supports apply to the rotor; the rotor applies $\vec C_R=-\vec C_A$ to the frame.</li>
<li>Turn the couple into forces: two bearings a distance $L$ apart carry $\pm C/L$, added to the static (gravity) reactions. For a free gyroscope (string, pivot) set the gravity moment equal to $I\omega\Omega$ and solve for $\Omega$.</li>
</ol>

<h3>5. Gyro-stabiliser on a ship</h3>
<p>A heavy flywheel spins inside the hull. Waves make the vessel roll; the roll is a precession of the spinning flywheel, so a gyroscopic couple appears. The flywheel's frame is allowed to precess, and that precession combined with the spin produces a stabilising couple that opposes the roll.</p>

<h3>6. Worked example: motorcycle on a banked curve</h3>
<p>Two effects try to tip a cornering bike outwards: the <b>centrifugal couple</b> about the tyre contact line, and the <b>gyroscopic couple</b> from the wheels and engine (spinning about an axle that is being precessed about the vertical at $\Omega=v/R$). Gravity resists. On a track banked at $\alpha$ with the machine normal to the track, the rider is tilted $\alpha$ from vertical, so:</p>
<table class="data"><tr><th>Couple</th><th>Expression</th></tr>
<tr><td>Gyroscopic (wheels + engine, same sense)</td><td>$C_R=(I_w\omega_w+I_e\omega_e)\dfrac vR\cos\alpha$</td></tr>
<tr><td>Centrifugal</td><td>$C_C=\dfrac{mv^2}{R}\,h\cos\alpha$</td></tr>
<tr><td>Gravity (restoring)</td><td>$C_G=mgh\sin\alpha$</td></tr></table>
<p>Balance: $C_C+C_R=C_G$. Every term on the left has $\cos\alpha$, so $\tan\alpha=\dfrac{C_C+C_R}{C_G}$ with the $\cos\alpha$ dropped. If the engine spun the opposite way to the wheels its momentum would be subtracted.</p>
`,
formulas: [
 {name:"Angular momentum", tex:R`\vec H=I\vec\omega`, note:"I = mk², disc I = ½mR²"},
 {name:"Rate of change of momentum", tex:R`\dot{\vec H}=\vec\Omega\times I\vec\omega`},
 {name:"Gyroscopic couple", tex:R`C=I\omega\Omega`, note:"× sin γ if spin and precession axes are not perpendicular"},
 {name:"Applied couple (on rotor)", tex:R`\vec C_A=\vec\Omega\times I\vec\omega`},
 {name:"Reaction couple (on bearings/frame)", tex:R`\vec C_R=I\vec\omega\times\vec\Omega=-\vec C_A`},
 {name:"Precession of a turning vehicle", tex:R`\Omega=\frac vR`},
 {name:"Free gyroscope under gravity", tex:R`mgr=I\omega\Omega\ \Rightarrow\ \Omega=\frac{mgr}{I\omega}`},
 {name:"Banked motorcycle", tex:R`\tan\alpha=\frac{\frac{mv^2}{R}h+(I_w\omega_w+I_e\omega_e)\frac vR}{mgh}`}
],
questions: [
 {src:"Lecture 7 example", see:[6,2], q:R`A motorcycle, rider and passenger have a total mass of 320 kg, with their combined centre of gravity 525 mm above the ground. Each wheel has a mass of 9 kg, a radius of gyration of 225 mm and an effective rolling radius of 300 mm. The rotating parts of the engine have a mass of 12 kg and a radius of gyration of 75 mm and rotate in the same sense as the road wheels. The gear ratio, engine to rear wheel, is 3.5 : 1. Find the angle of banking needed for the machine to ride normal to the track on a bend of 60 m radius at 160 km/h, allowing for gyroscopic effects.`,
  hint:"Find I and ω for the two wheels and the engine, add the two momenta (same sense), multiply by Ω = v/R to get the gyroscopic couple, then balance it plus the centrifugal couple against gravity. All the overturning terms carry cos α.",
  sol:R`<p><b>Inertias:</b> $I_w=2(9)(0.225)^2=0.911$ kg·m² (two wheels); $I_e=12(0.075)^2=0.0675$ kg·m².</p>
  <p><b>Speeds:</b> $v=160\times\dfrac{1000}{3600}=44.44$ m/s; $\omega_w=v/r=44.44/0.3=148.1$ rad/s; $\omega_e=3.5\times148.1=518.5$ rad/s.</p>
  <p><b>Momenta:</b> $H_w=0.911(148.1)=135$ kg·m²/s; $H_e=0.0675(518.5)=35$ kg·m²/s. Same sense, so add: 170 kg·m²/s.</p>
  <p><b>Gyroscopic couple:</b> $C_R=(H_w+H_e)\dfrac{v}{R}\cos\alpha=170\times\dfrac{44.44}{60}\cos\alpha=125.9\cos\alpha$ N·m.</p>
  <p><b>Centrifugal couple:</b> $C_C=\dfrac{mv^2}{R}h\cos\alpha=\dfrac{320(44.44)^2}{60}(0.525)\cos\alpha=5531\cos\alpha$ N·m.</p>
  <p><b>Gravity couple:</b> $C_G=mgh\sin\alpha=320(9.81)(0.525)\sin\alpha=1648\sin\alpha$ N·m.</p>
  <p><b>Balance:</b> $C_C+C_R=C_G$: $(5531+126)\cos\alpha=1648\sin\alpha$, so $\tan\alpha=5657/1648=3.43$ and $\alpha=73.8^\circ$ (73°45′, 1.29 rad).</p>`,
  ans:"α ≈ 73.8° (73°45′)", prov:"From the worked example in Lecture 7; numbers re-checked in code."},
 {src:"Tutorial 9 Q3", fig:"mom_t9f1", see:[4,3], q:R`The bicycle wheel in Figure 1 has a mass of 2 kg and the string is attached to the axle 0.3 m from the hub. The radius of gyration of the wheel is 0.4 m and it spins at 191 rpm in the sense shown. Find the magnitude and direction of the speed of precession.`,
  hint:"Gravity on the wheel gives a moment mg × 0.3 about the string. That moment must equal IωΩ. For the direction, write ω and the gravity moment as vectors and use C = Ω × Iω.",
  sol:R`<p>$I=mk^2=2(0.4)^2=0.32$ kg·m². $\omega=191\times2\pi/60=20.0$ rad/s, so $I\omega=6.40$ kg·m²/s.</p>
  <p>Gravity moment about the string: $M=mgr=2(9.81)(0.3)=5.886$ N·m.</p>
  <p>Steady precession: $M=I\omega\Omega$, so $\Omega=\dfrac{5.886}{6.40}=0.920$ rad/s.</p>
  <p><b>Direction</b> (axes as in Figure 1: $z$ up, $y$ along the axle towards the wheel, $x$ towards the viewer). The spin arrow makes the top of the wheel move towards $+x$, so $\vec\omega=+\omega\vec j$. The wheel's weight acts at $+0.3\,\vec j$ from the string: $\vec M=0.3\vec j\times(-mg\vec k)=-mg(0.3)\,\vec i$. We need $\vec\Omega\times I\vec\omega=\vec M$; with $\vec\Omega=\Omega\vec k$, $\Omega\vec k\times I\omega\vec j=-I\omega\Omega\,\vec i$ ✓. So $\vec\Omega$ points along $+z$: the wheel precesses <b>anticlockwise seen from above</b>, about the string, instead of falling.</p>`,
  ans:"Ω ≈ 0.92 rad/s about the vertical (+z), anticlockwise seen from above", prov:"Follows the posted solution (Ω = 0.919 rad/s; the posted solution gives the magnitude only, so the direction is worked by Claude from the spin arrow in Figure 1)."},
 {src:"Tutorial 9 Q4", fig:"mom_t9f2", see:[4,3], q:R`The turbine rotor of a ship (Figure 2) has a mass of 1 tonne and is supported on bearings A and B. The centre of mass G is 600 mm from bearing A and 900 mm from B, and the radius of gyration is 200 mm. The rotor turns anticlockwise at 5000 rpm when viewed from A. The ship is turning to the left (port) at 0.514 m/s on a radius of 400 m. Find the reactions at A and B from the combined static and dynamic loads. B is the forward bearing.`,
  hint:"Static reactions from moments about each bearing. Then Ω = v/R about the vertical, C = IωΩ, and the extra bearing forces are ±C/1.5 m. Use the cross product to see which bearing gains.",
  sol:R`<p><b>Static:</b> $W=1000(9.81)=9810$ N. Moments about B: $R_A=9810\times\dfrac{0.9}{1.5}=5886$ N; about A: $R_B=9810\times\dfrac{0.6}{1.5}=3924$ N.</p>
  <p><b>Gyroscopic couple:</b> $I=1000(0.2)^2=40$ kg·m²; $\omega=5000\times2\pi/60=523.6$ rad/s; $\Omega=v/R=0.514/400=1.285\times10^{-3}$ rad/s.</p>
  <p>$C=I\omega\Omega=40(523.6)(1.285\times10^{-3})=26.9$ N·m. Over the 1.5 m bearing span: $\Delta F=26.9/1.5=17.9$ N.</p>
  <p><b>Direction</b> (axes: $x$ forward, $y$ to port, $z$ up). Anticlockwise seen from A (looking forward) means $\vec\omega$ points back towards A: $\vec\omega=-\omega\vec i$. Turning to port: $\vec\Omega=+\Omega\vec k$. Couple the bearings apply to the rotor: $\vec C_A=\vec\Omega\times I\vec\omega=\Omega\vec k\times(-I\omega\vec i)=-I\omega\Omega\,\vec j$, i.e. about the starboard direction. A couple about $-\vec j$ lifts the forward end, so the bearings push <b>up</b> on the rotor at B and <b>down</b> at A.</p>
  <p><b>Totals:</b> $R_A=5886-17.9=5868$ N; $R_B=3924+17.9=3942$ N (both upward on the rotor).</p>`,
  ans:"R_A ≈ 5866 N, R_B ≈ 3941 N (static 5884/3923 N with g = 9.80665, gyroscopic ±17.94 N)", prov:"Follows the posted solution, which uses g = 9.80665 m/s² (R_A = 5866.05 N, R_B = 3940.60 N); the working above uses g = 9.81, which moves each reaction by about 2 N. Tutorial 10 re-works it with g = 9.81 and gets R_A = 5868.1 N, R_B = 3941.9 N, matching the working above."},
 {src:"Tutorial 9 Q5", fig:"mom_t9f3", see:[4,3], q:R`The motor armature, shaft and blades of the fan in Figure 3 have a combined mass of 2.2 kg and a radius of gyration of 60 mm. The adjustable balancing block A (0.8 kg) balances the fan about the $x$-axis in the static state when $b=180$ mm. For a motor and fan speed of 1725 rpm in the direction shown, find the value of $b$ needed for a steady precession of 0.2 rad/s about the positive $y$-axis.`,
  hint:"In the static state the block's moment cancels the fan's. Moving the block changes the net gravity moment by 0.8g × Δb, and that net moment must equal IωΩ in the right direction.",
  sol:R`<p>$I=2.2(0.06)^2=7.92\times10^{-3}$ kg·m²; $\omega=1725\times2\pi/60=180.6$ rad/s.</p>
  <p>Required couple: $C=I\omega\Omega=7.92\times10^{-3}(180.6)(0.2)=0.286$ N·m.</p>
  <p><b>Moving the block.</b> The block's weight is $m_Ag=0.8(9.81)=7.85$ N, so the block must move by $\Delta b=C/(m_Ag)=0.286/7.85=0.0365$ m.</p>
  <p><b>Which way.</b> The posted solution moves the block <b>outwards</b>: $b=b_0+\Delta b=0.180+0.0365=0.2165$ m. The block then outweighs the fan, and that unbalanced gravity moment is the couple $I\omega\Omega$ that drives the precession about $+y$. (If you read the spin arrow in Figure 3 the other way, the couple reverses and the block would move in to 143.5 mm; the posted answer takes the outward case.)</p>
  <p>$b\approx$ <b>216.5 mm</b>.</p>`,
  ans:"b ≈ 216.5 mm", prov:"Follows the posted solution (b = 0.21647 m). An earlier version here read the spin arrow the other way and gave 143.5 mm."},
 {src:"Tutorial 9 Q6", see:[4,3], q:R`The 210 kg rotor of a single-engine turbojet aircraft has a radius of gyration of 220 mm and rotates anticlockwise at 18 000 rpm viewed from the front. Travelling at 1200 km/h, the aircraft starts an inside vertical loop of 3800 m radius. Find the gyroscopic moment M transmitted to the airframe and its direction.`,
  hint:"Pulling up into a loop is a pitch rotation at Ω = v/R about the wing axis. Then C = IωΩ, and the frame feels the reaction Iω × Ω.",
  sol:R`<p>$I=210(0.22)^2=10.16$ kg·m²; $\omega=18\,000\times2\pi/60=1885$ rad/s; $v=1200/3.6=333.3$ m/s; $\Omega=v/R=333.3/3800=0.0877$ rad/s.</p>
  <p>$M=I\omega\Omega=10.16(1885)(0.0877)=1681$ N·m $\approx1.68$ kN·m.</p>
  <p><b>Direction</b> (axes: $x$ forward, $y$ to the pilot's left, $z$ up). Anticlockwise seen from the front: $\vec\omega=+\omega\vec i$. Nose rising in the loop: $\vec\Omega=-\Omega\vec j$ (about the right wing). Couple on the rotor: $\vec C_A=\vec\Omega\times I\vec\omega=-\Omega\vec j\times I\omega\vec i=+I\omega\Omega\,\vec k$. The rotor pushes back on the frame with $\vec M=-I\omega\Omega\,\vec k$: a yawing moment about the downward vertical that swings the <b>nose to the right</b> (starboard).</p>`,
  ans:"M ≈ 1.68 kN·m, a yawing moment turning the nose to the right", prov:"Follows the posted solution for the magnitude (1680.6 N·m); the posted solution does not give the direction, which is worked by Claude."},
 {src:"Practice (Lecture 7 determinant)", see:[3], q:R`A rotor spins with $I\omega=50$ kg·m²/s along $+\vec k$ and precesses at $\Omega=0.4$ rad/s about $+\vec j$. Find the applied couple and the reaction couple as vectors. Which one do the bearings feel?`,
  hint:"Applied: rows (i j k), (0 Ω 0), (0 0 Iω). Reaction: swap the last two rows.",
  sol:R`<p>$\vec C_A=\begin{vmatrix}\vec i&\vec j&\vec k\\0&0.4&0\\0&0&50\end{vmatrix}=(0.4)(50)\,\vec i=20\,\vec i$ N·m.</p><p>$\vec C_R=\begin{vmatrix}\vec i&\vec j&\vec k\\0&0&50\\0&0.4&0\end{vmatrix}=(0-50\times0.4)\,\vec i=-20\,\vec i$ N·m.</p><p>$\vec C_A$ is what the supports must apply to the rotor to make it precess. The bearings feel the reaction $\vec C_R=-20\,\vec i$ N·m from the rotor.</p>`,
  ans:"C_A = +20 i N·m (on rotor); C_R = −20 i N·m (on bearings)", prov:"Worked by Claude; no solution is available. Same set-up as the Lecture 7 determinant slides."}
],
traps: [
 "Convert rpm to rad/s (× 2π/60) for both spin and, if given in rpm, precession.",
 "Use I = mk² with the radius of gyration; ½mR² is only for a uniform disc.",
 "The applied couple Ω × Iω acts on the rotor; the bearings and frame feel the opposite, Iω × Ω. Say which one you are giving.",
 "Cross-product order matters: swapping the rows of the determinant flips the sign.",
 "For a vehicle on a curve, Ω = v/R (rad/s), not v.",
 "If the spin axis is tilted to the precession axis (a leaning bike), only the perpendicular component counts: multiply by cos α or sin γ.",
 "Engine rotating the same sense as the wheels: add the momenta; opposite sense: subtract.",
 "The gyroscopic couple changes bearing loads by ±C/L; add it to the static reactions, don't replace them."
]
});
})();
