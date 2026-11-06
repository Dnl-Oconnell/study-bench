/* EEN1020 / EE207 past exam papers 2021/22 – 2025/26 (incl. resits): every part not already in the bench,
   placed on its topic. Labels follow "Exam 2024 Q3(b)" / "Resit 2023 Q2(a)" / "Exam 2025/26 Q1(a)" so the
   frequency table and the paper-by-paper view pick them up. All answers re-derived and checked with SymPy. */
(function(){
const R = String.raw;
const T = STUDY.content.ssc;
const PROV = "Worked by Claude from the past paper; every number checked with SymPy.";
const add = (id, q) => { const t = T.topics.find(x => x.id === id); if (t) t.questions.push(Object.assign({ prov: PROV }, q)); };

/* ---------- a small topic the older EE207 papers always examined ---------- */
const lin = {
  id: "linearise", part: "Modelling", title: "Linearisation & Equilibrium Points",
  lectures: "Older EE207 papers (Q4 every year 2022–2024); not in the 2025/26 papers",
  status: "past papers",
  summary: "Every EE207 paper from 2021/22 to 2023/24 had a nonlinear system in Q4: find the equilibrium, linearise with the Jacobian (or small-angle sin θ ≈ θ), then judge stability from the linear model's poles. The 2025/26 EEN1020 papers dropped it, so treat it as lower priority.",
  theory: R`<h3>0. Why a system is nonlinear</h3>
<p>A system is nonlinear if any term is not a constant times a state, input or derivative: $\sin\vartheta$, $xy$, $v^2$. Superposition fails, so transfer functions and state-transition matrices can't be used directly.</p>
<h3>1. Equilibrium points</h3>
<p>An equilibrium is where nothing changes: set every derivative to zero (with the given input, often $u=0$) and solve. Show a given point is an equilibrium by substituting it and getting $\dot x=0$ for every state. A nonlinear system can have several (e.g. $v=0$ and $v=-0.8$ from $v^2$ terms).</p>
<h3>2. Linearising with the Jacobian</h3>
<p>For $\dot{\mathbf x}=\mathbf f(\mathbf x,u)$, write small deviations $\delta\mathbf x=\mathbf x-\mathbf x_e$. A first-order Taylor expansion about the equilibrium gives</p>
$$\delta\dot{\mathbf x}=A\,\delta\mathbf x+B\,\delta u,\qquad A_{ij}=\left.\frac{\partial f_i}{\partial x_j}\right|_{e},\quad B_i=\left.\frac{\partial f_i}{\partial u}\right|_{e}$$
<p>Products like $xy$ linearise to $y_e\,\delta x+x_e\,\delta y$, so about (0, 0) they vanish. $v^2$ gives $2v_e\,\delta v$.</p>
<h3>3. Pendulums: small angles</h3>
<p>$\sin\vartheta\approx\vartheta$ near $\vartheta=0$ (the tangent at the origin). Near $\vartheta=\pi$, $\sin\vartheta\approx-(\vartheta-\pi)$, which flips the sign of the gravity term: the upright pendulum becomes $\ddot\vartheta-\frac gL\vartheta=\dots$ with a pole in the right half-plane. The approximation is only valid while $\sin\vartheta\approx\vartheta$ holds (error about 1% at 0.25 rad).</p>
<h3>4. Stability of the linear model</h3>
<p>Find the eigenvalues of A ($\det(\lambda I-A)=0$) or the poles of the transfer function. All in the left half-plane → that equilibrium is (locally) asymptotically stable; complex → oscillatory; any positive real part → unstable. A feedback controller can move the poles of an unstable linear model into the left half-plane (inverted pendulum + PID).</p>`,
  formulas: [
    { name: "Jacobian", tex: R`A_{ij}=\left.\partial f_i/\partial x_j\right|_e` },
    { name: "Small angle", tex: R`\sin\vartheta\approx\vartheta\ (\vartheta\approx0),\quad \sin\vartheta\approx-(\vartheta-\pi)\ (\vartheta\approx\pi)` },
    { name: "Product term", tex: R`xy\to y_e\,\delta x+x_e\,\delta y` }
  ],
  traps: [
    "Linearise about the point you're told: (0, 0) and (0.64, −0.8) give different A matrices.",
    "The linear model is in deviations δx from the equilibrium, not the absolute states.",
    "An inverted pendulum's linear model has a pole at +√(g/L): unstable without feedback.",
    "Equilibrium means ALL derivatives zero, with the stated input (usually u = 0)."
  ],
  questions: []
};
const at = T.topics.findIndex(t => t.id === "rotational");
T.topics.splice(at + 1, 0, lin);

/* =================== 2021/22 Semester 2 (EE207) =================== */
add("tfcircuits", { src: "Exam 2022 Q1(a)", see: [1, 3],
  q: R`An RLC circuit has $\dfrac{V_o(s)}{V_s(s)}=\dfrac{1/LC}{s^2+\frac RLs+\frac1{LC}}=\dfrac{4}{s^2+s+4}$. (i) Write the differential equation. (ii) Find $R$ if $L=0.2$ H and $C=1.25$ F. [5 marks]`,
  hint: R`Cross-multiply and replace $s$ by $d/dt$. Then match the $s$ coefficient: $R/L=1$.`,
  sol: R`<ol class="steps"><li>$(s^2+s+4)V_o=4V_s$ ⇒ $\ddot v_o+\dot v_o+4v_o=4v_s$, i.e. $\ddot v_o+\frac RL\dot v_o+\frac1{LC}v_o=\frac1{LC}v_s$.</li><li>$1/LC=1/(0.2\times1.25)=4$ ✓ and $R/L=1$ ⇒ $R=0.2\ \Omega$.</li></ol>`,
  ans: "v̈o + v̇o + 4vo = 4vs; R = 0.2 Ω" });
add("ivtfvt", { src: "Exam 2022 Q1(b)", see: [0, 1],
  q: R`Why is it useful to determine the unit-step response of a system? [5 marks]`,
  hint: R`Think of what one step test reveals, and how easy it is to apply in a lab.`,
  sol: R`<ul><li>A step is the simplest sudden change (switching on), easy to apply experimentally.</li><li>One test shows the speed of response (rise and settling time), overshoot and oscillation (so damping), and the steady-state gain $G(0)$.</li><li>It shows stability: a stable system settles to a constant.</li><li>Its derivative is the impulse response, which characterises an LTI system completely.</li></ul>`,
  ans: "Reveals speed, overshoot/damping, steady-state gain and stability from one easy test" });
add("order12", { src: "Exam 2022 Q1(c)", see: [3, 1],
  q: R`For $\dfrac{4}{s^2+s+4}$, determine the unit-step response and its initial and final values. [10 marks]`,
  hint: R`$Y=\dfrac{4}{s(s^2+s+4)}=\dfrac1s-\dfrac{s+1}{(s+\frac12)^2+\frac{15}4}$. Split $s+1$ into $(s+\tfrac12)+\tfrac12$.`,
  sol: R`<ol class="steps"><li>$Y(s)=\dfrac1s-\dfrac{s+1}{s^2+s+4}$ (cover-up gives $A=1$, then $B=-1$, $C=-1$).</li><li>Complete the square: $s^2+s+4=(s+\frac12)^2+(\frac{\sqrt{15}}2)^2$, $\omega_d=\frac{\sqrt{15}}2=1.936$ rad/s.</li><li>$s+1=(s+\frac12)+\frac12$ ⇒ $$y(t)=\left[1-e^{-t/2}\left(\cos1.936t+\frac{1}{\sqrt{15}}\sin1.936t\right)\right]u(t)$$</li><li>$y(0)=1-1=0$; $y(\infty)=1$ (also $G(0)=4/4=1$).</li></ol>`,
  ans: "y = 1 − e^(−t/2)[cos(1.936t) + 0.258 sin(1.936t)]; y(0) = 0, y(∞) = 1" });
add("order12", { src: "Exam 2022 Q1(d)", see: [4],
  q: R`Compute the percentage overshoot of the unit-step response of $\dfrac{4}{s^2+s+4}$. [5 marks]`,
  hint: R`$\omega_n^2=4$ and $2\zeta\omega_n=1$.`,
  sol: R`<ol class="steps"><li>$\omega_n=2$, $\zeta=\frac{1}{2\times2}=0.25$.</li><li>$\%OS=100e^{-\pi\zeta/\sqrt{1-\zeta^2}}=100e^{-0.811}=44.4\%$.</li></ol>`,
  ans: "44.4%" });
add("order12", { src: "Exam 2022 Q1(e)", see: [1],
  q: R`The overshoot must be reduced. What $R$ gives critical damping if $L=0.2$ H and $C=1.25$ F are unchanged? [5 marks]`,
  hint: R`Critical damping: $\zeta=1$, so $R/L=2\omega_n$.`,
  sol: R`<ol class="steps"><li>$\omega_n=1/\sqrt{LC}=2$ rad/s is unchanged.</li><li>$\zeta=1$ ⇒ $\dfrac RL=2\omega_n=4$ ⇒ $R=4\times0.2=0.8\ \Omega$.</li></ol>`,
  ans: "R = 0.8 Ω" });
add("sstrans", { src: "Exam 2022 Q1(f)", see: [1, 2, 3],
  q: R`$\dot x=\begin{bmatrix}-1&0\\0&-4\end{bmatrix}x+\begin{bmatrix}4/3\\4/3\end{bmatrix}v_s$, $v_o=\begin{bmatrix}1&-1\end{bmatrix}x$. (i) Find the unit-impulse response using the state-transition matrix. (ii) What makes this representation computationally advantageous? [10 marks]`,
  hint: R`A is diagonal, so $\Phi=\text{diag}(e^{-t},e^{-4t})$ and $h=C\Phi B$.`,
  sol: R`<ol class="steps"><li>$\Phi(t)=e^{At}=\begin{bmatrix}e^{-t}&0\\0&e^{-4t}\end{bmatrix}$.</li><li>$h(t)=C\Phi(t)B=\begin{bmatrix}1&-1\end{bmatrix}\begin{bmatrix}\frac43e^{-t}\\\frac43e^{-4t}\end{bmatrix}=\frac43\left(e^{-t}-e^{-4t}\right)u(t)$.</li><li>(ii) It's the parallel (diagonal) form: the states are decoupled, so $e^{At}$ is just the scalar exponentials on the diagonal. No eigenvectors or matrix inverse needed.</li></ol>`,
  ans: "h(t) = (4/3)(e^(−t) − e^(−4t))u(t); diagonal A ⇒ decoupled states, Φ trivial" });
add("laplace", { src: "Exam 2022 Q1(g)", see: [2],
  q: R`For the state space in Q1(f), find the unit-impulse response by Laplace methods and confirm it matches. [10 marks]`,
  hint: R`$G(s)=C(sI-A)^{-1}B$; with diagonal A the inverse is $\text{diag}\left(\frac1{s+1},\frac1{s+4}\right)$.`,
  sol: R`<ol class="steps"><li>$(sI-A)^{-1}B=\begin{bmatrix}\frac{4/3}{s+1}\\\frac{4/3}{s+4}\end{bmatrix}$, so $G(s)=\dfrac{4/3}{s+1}-\dfrac{4/3}{s+4}=\dfrac{4}{(s+1)(s+4)}$.</li><li>Invert term by term: $h(t)=\frac43(e^{-t}-e^{-4t})u(t)$, identical to Q1(f).</li></ol>`,
  ans: "G = 4/((s+1)(s+4)); h = (4/3)(e^(−t) − e^(−4t))" });
add("order12", { src: "Exam 2022 Q2(a)", see: [0, 2],
  q: R`A dc motor has $G_m(s)=\dfrac{\omega}{x_m}=\dfrac{k}{s^2+bs+c}$ with $k=60$, $b=34$, $c=45$. Its unit-step response is $\omega(t)=[1.33-1.39e^{p_1t}+0.06e^{-32.62t}]u(t)$. Find $p_1$. [5 marks]`,
  hint: R`The exponents in the step response are the poles. Solve $s^2+34s+45=0$.`,
  sol: R`<ol class="steps"><li>$s=\dfrac{-34\pm\sqrt{34^2-180}}{2}=-17\pm2\sqrt{61}$.</li><li>One root is $-32.62$ (already shown), so $p_1=-17+2\sqrt{61}=-1.38$.</li><li>Check: steady state $60/45=1.33$ ✓.</li></ol>`,
  ans: "p₁ = −1.38" });
add("bdalgebra", { src: "Exam 2022 Q2(b)", see: [4],
  q: R`$v(s)$ → summer (+, − from $\omega$) → $K_c$ → $x_m$ → $G_m=\dfrac{k}{s^2+bs+c}$ → $\omega(s)$, unity negative feedback. Show that $\dfrac{\omega}{v}=\dfrac{K_ck}{s^2+bs+c+K_ck}$. [5 marks]`,
  hint: R`Forward path $K_cG_m$, unity feedback: $\dfrac{G}{1+G}$. Multiply top and bottom by $s^2+bs+c$.`,
  sol: R`<ol class="steps"><li>$\omega=K_cG_m(v-\omega)$ ⇒ $\dfrac{\omega}{v}=\dfrac{K_cG_m}{1+K_cG_m}$.</li><li>Substitute and clear fractions: $\dfrac{K_ck}{s^2+bs+c+K_ck}$.</li></ol>`,
  ans: "ω/v = K_c k/(s² + bs + c + K_c k)" });
add("laplace", { src: "Exam 2022 Q2(c)", see: [2],
  q: R`Find the unit-step response of the closed loop in Q2(b) with $K_c=3$ ($k=60$, $b=34$, $c=45$). [7 marks]`,
  hint: R`Denominator $s^2+34s+225=(s+9)(s+25)$. Use cover-up on $\dfrac{180}{s(s+9)(s+25)}$.`,
  sol: R`<ol class="steps"><li>$\dfrac{\omega}{v}=\dfrac{180}{s^2+34s+225}=\dfrac{180}{(s+9)(s+25)}$.</li><li>$\Omega(s)=\dfrac{180}{s(s+9)(s+25)}=\dfrac{0.8}{s}-\dfrac{1.25}{s+9}+\dfrac{0.45}{s+25}$.</li><li>$\omega(t)=[0.8-1.25e^{-9t}+0.45e^{-25t}]u(t)$: overdamped, settles at 0.8.</li></ol>`,
  ans: "ω(t) = [0.8 − 1.25e^(−9t) + 0.45e^(−25t)]u(t)" });
add("ctstab", { src: "Exam 2022 Q2(d)", see: [4, 5],
  q: R`What is the effect of varying $K_c$ on the stability and nature of the closed-loop response $\dfrac{60K_c}{s^2+34s+45+60K_c}$? [8 marks]`,
  hint: R`Second order: stable iff all coefficients positive. Oscillatory when the discriminant goes negative.`,
  sol: R`<ol class="steps"><li><b>Stability:</b> needs $45+60K_c\gt 0$ ⇒ $K_c\gt-0.75$. Any positive gain is stable.</li><li><b>Nature:</b> discriminant $34^2-4(45+60K_c)\lt 0$ ⇔ $K_c\gt\frac{61}{15}=4.07$. Below 4.07: overdamped (two real poles); at 4.07: critically damped; above: underdamped, more oscillation as $K_c$ grows ($\omega_n$ rises, ζ = 17/ω_n falls).</li><li><b>Steady state:</b> $\frac{60K_c}{45+60K_c}$ rises toward 1 as $K_c$ increases: smaller steady-state error, but never zero (no integrator).</li></ol>`,
  ans: "Stable for K_c > −0.75; overdamped below 4.07, oscillatory above; steady state → 1 as K_c grows" });
add("ztrans", { src: "Exam 2022 Q3(a)", see: [4, 5, 6, 3],
  q: R`$v_o[n]=0.5v_o[n-1]+0.5v_{in}[n]$. (i) Show $G(z)=\dfrac{0.5z}{z-0.5}$. (ii) Find the unit-step response by z-transforms. (iii) Compute it from the difference equation, compare $v_o[2]$, and state the advantage of the closed form. [15 marks]`,
  hint: R`Expand $Y(z)/z=\dfrac{0.5z}{(z-0.5)(z-1)}$ in partial fractions.`,
  sol: R`<ol class="steps"><li>(i) $V_o=0.5z^{-1}V_o+0.5V_{in}$ ⇒ $\dfrac{V_o}{V_{in}}=\dfrac{0.5}{1-0.5z^{-1}}=\dfrac{0.5z}{z-0.5}$.</li><li>(ii) $\dfrac{V_o}{z}=\dfrac{0.5z}{(z-0.5)(z-1)}=\dfrac{1}{z-1}-\dfrac{0.5}{z-0.5}$ ⇒ $v_o[n]=\left[1-0.5^{n+1}\right]u[n]$.</li><li>(iii) Recursion: $v_o[0]=0.5$, $v_o[1]=0.25+0.5=0.75$, $v_o[2]=0.375+0.5=0.875$. Closed form: $1-0.5^3=0.875$ ✓.</li><li>The closed form gives any sample directly (e.g. $n=1000$) and shows the final value and decay rate at a glance; recursion needs every earlier sample.</li></ol>`,
  ans: "v_o[n] = 1 − 0.5^(n+1); v_o[2] = 0.875" });
add("dtstab", { src: "Exam 2022 Q3(b)", fig: "ssc_pp22_q3b", see: [4, 0, 1],
  q: R`The model of Q3(a) sits in the loop shown, with controller $k_0+\dfrac{k_1(z+1)}{z-1}$. (i) Find $\dfrac{V_o}{V_s}$. (ii) For some $k_0,k_1$ it is $\dfrac{2z^2}{3z^2-1.5z+0.5}$. Is the step response asymptotically stable and oscillatory? [10 marks]`,
  hint: R`Unity feedback: $\dfrac{CG}{1+CG}$. For (ii), find the pole magnitude and whether they're complex.`,
  sol: R`<ol class="steps"><li>$C(z)=\dfrac{k_0(z-1)+k_1(z+1)}{z-1}$, $G=\dfrac{0.5z}{z-0.5}$.</li><li>$$\frac{V_o}{V_s}=\frac{z\left[(k_0+k_1)z+(k_1-k_0)\right]}{(k_0+k_1+2)z^2+(k_1-k_0-3)z+1}$$</li><li>(ii) $3z^2-1.5z+0.5=0$ ⇒ $z=0.25\pm j0.323$, $|z|=\sqrt{0.5/3}=0.408\lt 1$.</li><li>Inside the unit circle ⇒ asymptotically stable; complex ⇒ oscillatory (decaying).</li></ol>`,
  ans: "Poles 0.25 ± j0.323, |z| = 0.408: stable and oscillatory" });
add("linearise", { src: "Exam 2022 Q4(a)", plab: "Q4(a)–(d)", fig: "ssc_pp22_q4", see: [0, 3, 4],
  q: R`Inverted pendulum: $\ddot\vartheta-\dfrac gL\sin\vartheta=\dfrac{T}{ML^2}$. (a) Why is it nonlinear? (b) Linearise about $\vartheta=0$ and explain how. (c) With $L=4.9$ m, $M=0.0416$ kg, $g=9.8$, show $G=\dfrac{\vartheta}{T}=\dfrac1{s^2-2}$. (d) Show it is unstable. [13 marks]`,
  hint: R`$\sin\vartheta$ isn't a constant times $\vartheta$. Use the tangent at 0: $\sin\vartheta\approx\vartheta$.`,
  sol: R`<ol class="steps"><li>(a) The $\sin\vartheta$ term: superposition fails (doubling $\vartheta$ doesn't double $\sin\vartheta$).</li><li>(b) Taylor expansion about 0, keeping the linear term: $\sin\vartheta\approx\vartheta$ for small angles ⇒ $\ddot\vartheta-\frac gL\vartheta=\frac{T}{ML^2}$.</li><li>(c) $g/L=2$, $ML^2=0.0416\times24.01=0.999\approx1$ ⇒ $(s^2-2)\Theta=T$ ⇒ $G=\dfrac1{s^2-2}$.</li><li>(d) Poles $s=\pm\sqrt2$: one in the right half-plane ⇒ $e^{\sqrt2t}$ grows ⇒ unstable (it falls over).</li></ol>`,
  ans: "sin ϑ ≈ ϑ; G = 1/(s² − 2); pole at +√2 ⇒ unstable" });
add("ctstab", { src: "Exam 2022 Q4(e)", see: [5, 4],
  q: R`The pendulum $G=\dfrac{1}{s^2-2}$ is controlled by a PID $K_1+\dfrac{K_2}{s}+K_3s$ in a unity negative feedback loop. (i) Find the closed-loop transfer function as a ratio of polynomials. (ii) The closed-loop impulse response is $[-0.5e^{-t}-4e^{-2t}+10.5e^{-3t}]u(t)$. If $K_1=13$, find $K_2$ and $K_3$. [12 marks]`,
  hint: R`Write the controller as $\frac{K_3s^2+K_1s+K_2}{s}$. The impulse response gives the closed-loop poles −1, −2, −3.`,
  sol: R`<ol class="steps"><li>$CG=\dfrac{K_3s^2+K_1s+K_2}{s(s^2-2)}$ ⇒ $$T(s)=\frac{K_3s^2+K_1s+K_2}{s^3+K_3s^2+(K_1-2)s+K_2}$$</li><li>Poles at −1, −2, −3 ⇒ denominator $(s+1)(s+2)(s+3)=s^3+6s^2+11s+6$.</li><li>Match: $K_3=6$, $K_1-2=11$ ⇒ $K_1=13$ ✓, $K_2=6$.</li><li>Check the numerator: the residues give $6s^2+13s+6$ ✓.</li></ol>`,
  ans: "T = (K₃s² + K₁s + K₂)/(s³ + K₃s² + (K₁−2)s + K₂); K₂ = 6, K₃ = 6" });

/* =================== 2021/22 Resit =================== */
add("bdalgebra", { src: "Resit 2022 Q1(a)", plab: "Q1(a)(i)–(iii)", fig: "ssc_pp22r_q1a", see: [4, 2],
  q: R`The block diagram models a spring–mass–damper $K_{in}f=M\ddot y+B\dot y+Ky$. (i) Find $\dfrac{Y}{F}$. (ii) Find $B$, $K$, $K_{in}$ if $M=0.5$ kg. (iii) Show how to get the unit-impulse response by Laplace. [13 marks]`,
  hint: R`Inner loop: $\frac{1/s}{1+5/s}=\frac1{s+5}$. Then the outer loop with $\frac1s$ and feedback 4, times the input gain 4.`,
  sol: R`<ol class="steps"><li>Inner: $\dfrac{1}{s+5}$. Forward: $\dfrac{1}{s(s+5)}$. Outer feedback 4: $\dfrac{1}{s^2+5s+4}$. Times 4: $$\frac YF=\frac{4}{s^2+5s+4}$$</li><li>Compare with $\dfrac{K_{in}/M}{s^2+\frac BMs+\frac KM}$: $B=5M=2.5$ N·s/m, $K=4M=2$ N/m, $K_{in}=4M=2$.</li><li>Impulse: $F=1$, $Y=\dfrac{4}{(s+1)(s+4)}=\dfrac{4/3}{s+1}-\dfrac{4/3}{s+4}$ ⇒ $h=\frac43(e^{-t}-e^{-4t})u(t)$.</li></ol>`,
  ans: "4/(s²+5s+4); B = 2.5, K = 2, K_in = 2; h = (4/3)(e^(−t) − e^(−4t))" });
add("ssresp", { src: "Resit 2022 Q1(a)(iv)", plab: "Q1(a)(iv)–(v)", see: [3, 2],
  q: R`For the CCF $\dot x=\begin{bmatrix}0&1\\-4&-5\end{bmatrix}x+\begin{bmatrix}0\\4\end{bmatrix}f$, $y=\begin{bmatrix}1&0\end{bmatrix}x$: (iv) explain how the state-transition matrix is formed and what it's used for; (v) use it to find the unit-impulse response. [15 marks]`,
  hint: R`$\Phi(t)=\mathcal L^{-1}\{(sI-A)^{-1}\}$ (or $Pe^{\Lambda t}P^{-1}$). Impulse response $h=C\Phi B$.`,
  sol: R`<ol class="steps"><li>$\Phi(t)=e^{At}=\mathcal L^{-1}\{(sI-A)^{-1}\}$. $(sI-A)^{-1}=\dfrac{1}{(s+1)(s+4)}\begin{bmatrix}s+5&1\\-4&s\end{bmatrix}$.</li><li>Partial fractions element by element: $$\Phi=\frac13\begin{bmatrix}4e^{-t}-e^{-4t}&e^{-t}-e^{-4t}\\-4e^{-t}+4e^{-4t}&-e^{-t}+4e^{-4t}\end{bmatrix}$$ Check $\Phi(0)=I$ ✓.</li><li>Used for: zero-input response $C\Phi(t)x(0)$ and zero-state response $C\int_0^t\Phi(t-\tau)Bu\,d\tau$.</li><li>(v) $h=C\Phi B=4\Phi_{12}=\frac43(e^{-t}-e^{-4t})u(t)$, matching the Laplace result.</li></ol>`,
  ans: "Φ = L⁻¹{(sI−A)⁻¹}; h = (4/3)(e^(−t) − e^(−4t))" });
add("order12", { src: "Resit 2022 Q1(a)(vi)", see: [1, 4],
  q: R`For $M\ddot y+B\dot y+Ky=K_{in}f$ with $M=0.5$, $B=2.5$, $K=2$: comment on the nature of the response if $K$ is increased, with mathematical reasons. [8 marks]`,
  hint: R`$\omega_n=\sqrt{K/M}$, $\zeta=\dfrac{B}{2\sqrt{MK}}$. Which way does each move?`,
  sol: R`<ol class="steps"><li>Now $\zeta=\frac{2.5}{2\sqrt{0.5\times2}}=1.25$: overdamped, poles −1 and −4.</li><li>Increasing $K$ raises $\omega_n=\sqrt{K/M}$ (faster) and lowers $\zeta\propto1/\sqrt K$.</li><li>At $\zeta=1$: $K=\frac{B^2}{4M}=3.125$ N/m (critically damped, poles coincide at −2.5). Above that the poles go complex: underdamped, overshoot and oscillation, more as $K$ grows.</li><li>Steady-state gain $K_{in}/K$ falls: a stiffer spring deflects less. It stays stable for every $K\gt 0$.</li></ol>`,
  ans: "ωn↑, ζ↓: overdamped → critical at K = 3.125 → oscillatory; smaller steady-state deflection; always stable" });
add("bdreduce", { src: "Resit 2022 Q1(b)", fig: "ssc_pp22r_q1b", see: [4],
  q: R`Two inputs: $X$ and noise $N$. (i) Show $Y=\dfrac{bK}{D}X+\dfrac{b(s+a)}{D}N$ with $D=s^2+(a+b)s+ab+K_fKb$. (ii) With $a=2$, $b=4$, $K_f=2$, $K=1$, $X=0$ and $n=e^{-2t}u(t)$, find $y(t)$. [14 marks]`,
  hint: R`Superposition: set $N=0$ for the first term, $X=0$ for the second (the forward path from N is just $\frac{b}{s+b}$).`,
  sol: R`<ol class="steps"><li>Write the signals: $Y=\dfrac{b}{s+b}\left[\dfrac{K}{s+a}(X-K_fY)+N\right]$. Collect $Y$ and multiply by $(s+a)(s+b)$: $Y\,D=bKX+b(s+a)N$ ✓.</li><li>(ii) $D=s^2+6s+8+8=s^2+6s+16$, $N=\dfrac1{s+2}$: $Y=\dfrac{4(s+2)}{s^2+6s+16}\cdot\dfrac1{s+2}=\dfrac{4}{(s+3)^2+7}$.</li><li>$y(t)=\dfrac{4}{\sqrt7}e^{-3t}\sin(\sqrt7t)\,u(t)=1.51e^{-3t}\sin(2.65t)u(t)$.</li></ol>`,
  ans: "y = (4/√7)e^(−3t) sin(√7 t)" });
add("ivtfvt", { src: "Resit 2022 Q2(a)", plab: "Q2(a)–(c)", see: [3],
  q: R`Unity feedback, plant $G_p=\dfrac{a}{s+a}$, controller $G_{c1}=k_0$ or $G_{c2}=k_0+\dfrac{k_1}{s}$. (a) Show $G_{CL1}=\dfrac{k_0a}{s+a+k_0a}$. (b) Show $G_{CL2}=\dfrac{(k_0s+k_1)a}{s^2+(k_0+1)as+k_1a}$. (c) Find the final value of the unit-step response for each and comment. [13 marks]`,
  hint: R`For a step, FVT gives $G_{CL}(0)$ (if stable).`,
  sol: R`<ol class="steps"><li>(a) $\dfrac{k_0\frac{a}{s+a}}{1+k_0\frac{a}{s+a}}=\dfrac{k_0a}{s+a+k_0a}$.</li><li>(b) $G_{c2}G_p=\dfrac{(k_0s+k_1)a}{s(s+a)}$ ⇒ $\dfrac{(k_0s+k_1)a}{s^2+as+k_0as+k_1a}$ ✓.</li><li>(c) $G_{CL1}(0)=\dfrac{k_0}{1+k_0}\lt 1$: a steady-state error of $\frac{1}{1+k_0}$, smaller with more gain but never zero.</li><li>$G_{CL2}(0)=\dfrac{k_1a}{k_1a}=1$: zero steady-state error. The integral term $k_1/s$ keeps acting until the error is zero.</li></ol>`,
  ans: "FV₁ = k₀/(1+k₀) (offset); FV₂ = 1 (integral action removes the error)" });
add("order12", { src: "Resit 2022 Q2(d)", see: [1, 4],
  q: R`In $G_{CL2}$ set $k_0=0$, $a=2$. (i) Find $k_1$ and ζ for $\omega_n=4$ rad/s. (ii) Percentage overshoot? (iii) Period of oscillation? [12 marks]`,
  hint: R`$G_{CL2}=\dfrac{2k_1}{s^2+2s+2k_1}$: match $\omega_n^2$ and $2\zeta\omega_n$.`,
  sol: R`<ol class="steps"><li>$\omega_n^2=2k_1=16$ ⇒ $k_1=8$. $2\zeta\omega_n=2$ ⇒ $\zeta=0.25$ (stable: positive coefficients).</li><li>$\%OS=100e^{-\pi(0.25)/\sqrt{0.9375}}=44.4\%$.</li><li>$\omega_d=4\sqrt{0.9375}=3.873$ rad/s ⇒ $T=2\pi/\omega_d=1.62$ s.</li></ol>`,
  ans: "k₁ = 8, ζ = 0.25; 44.4%; T = 1.62 s" });
add("ztrans", { src: "Resit 2022 Q3(a)", see: [2, 5],
  q: R`$y[n]=ay[n-1]+by[n-2]+x[n]$ gives, for $x=1,1,1,1$: $y=1,\ 0.4,\ 0.68,\ 0.56$. (i) Find $a$, $b$. (ii) Form $Y/X$. (iii) Is it asymptotically stable? [13 marks]`,
  hint: R`$y[1]=a\,y[0]+1$, then $y[2]=a\,y[1]+b\,y[0]+1$. Use $y[3]$ as a check.`,
  sol: R`<ol class="steps"><li>$0.4=a+1$ ⇒ $a=-0.6$. $0.68=-0.6(0.4)+b+1$ ⇒ $b=-0.08$. Check: $-0.6(0.68)-0.08(0.4)+1=0.56$ ✓.</li><li>$\dfrac YX=\dfrac{1}{1+0.6z^{-1}+0.08z^{-2}}=\dfrac{z^2}{z^2+0.6z+0.08}$.</li><li>Poles $z=-0.2,\ -0.4$: both inside the unit circle ⇒ asymptotically stable (negative real poles: the response alternates in sign as it decays).</li></ol>`,
  ans: "a = −0.6, b = −0.08; z²/(z²+0.6z+0.08); poles −0.2, −0.4 ⇒ stable" });
add("ivtfvt", { src: "Resit 2022 Q3(b)", see: [4],
  q: R`$\dfrac YX=\dfrac{z^2}{z^2+0.75z+0.125}$. (i) Find the unit-step response in the form $y[n]=\left[\frac8{15}+\rho a^n+\sigma b^n\right]u[n]$. (ii) Confirm the initial and final values with the IVT and FVT. [12 marks]`,
  hint: R`Poles: $(z+0.5)(z+0.25)$. Expand $Y/z=\dfrac{z^2}{(z+0.5)(z+0.25)(z-1)}$.`,
  sol: R`<ol class="steps"><li>$\dfrac Yz=\dfrac{8/15}{z-1}+\dfrac{2/3}{z+0.5}-\dfrac{1/5}{z+0.25}$.</li><li>$y[n]=\left[\frac8{15}+\frac23(-0.5)^n-\frac15(-0.25)^n\right]u[n]$.</li><li>From the series: $y[0]=\frac{8+10-3}{15}=1$, $y[\infty]=\frac8{15}$.</li><li>IVT: $\lim_{z\to\infty}Y=\lim\frac{z^3}{(z^2+\dots)(z-1)}=1$ ✓. FVT: $\lim_{z\to1}(z-1)Y=\frac{1}{1+0.75+0.125}=\frac8{15}$ ✓ (poles inside the circle, so FVT valid).</li></ol>`,
  ans: "y = 8/15 + (2/3)(−0.5)ⁿ − (1/5)(−0.25)ⁿ; y[0] = 1, y[∞] = 8/15" });
add("linearise", { src: "Resit 2022 Q4(a)", plab: "Q4(a)–(e)", see: [3, 4],
  q: R`Simple pendulum, $m=1$ kg, $L=9.8$ m, air damping $\beta=1$ N·s/m, $g=9.8$, applied force $f(t)$. (a) Linearise about $\vartheta=0$. (b) Form the CCF with $x_1=\vartheta$, $x_2=\dot\vartheta$. (c) Why is it only valid for small deviations? (d) Find the free response from $\vartheta(0)=0.15$ rad, $\dot\vartheta(0)=0$. (e) Explain why the linear model about $\vartheta=\pi$, $A=\begin{bmatrix}0&1\\ g/L&-\beta/m\end{bmatrix}$, is unstable. [25 marks]`,
  hint: R`Tangential force balance: $mL\ddot\vartheta=f-mg\sin\vartheta-\beta L\dot\vartheta$. Here $g/L=1$ and $\beta/m=1$.`,
  sol: R`<ol class="steps"><li>(a) $\ddot\vartheta+\frac\beta m\dot\vartheta+\frac gL\sin\vartheta=\frac{f}{mL}$; with $\sin\vartheta\approx\vartheta$: $\ddot\vartheta+\dot\vartheta+\vartheta=\frac{f}{9.8}$.</li><li>(b) $\dot x=\begin{bmatrix}0&1\\-1&-1\end{bmatrix}x+\begin{bmatrix}0\\1/9.8\end{bmatrix}f$, $\vartheta=\begin{bmatrix}1&0\end{bmatrix}x$.</li><li>(c) $\sin\vartheta\approx\vartheta$ is the tangent at 0; the error grows with angle (≈1% at 0.25 rad, 10% at 0.75 rad).</li><li>(d) $(s^2+s+1)\Theta=0.15s+0.15$ ⇒ $\Theta=\dfrac{0.15(s+\frac12)+0.075}{(s+\frac12)^2+\frac34}$ ⇒ $$\vartheta(t)=e^{-t/2}\left[0.15\cos0.866t+0.0866\sin0.866t\right]$$</li><li>(e) $\det(\lambda I-A)=\lambda^2+\lambda-1=0$ ⇒ $\lambda=0.618,\ -1.618$: a positive eigenvalue ⇒ unstable (the upright pendulum falls). Near π, $\sin\vartheta\approx-(\vartheta-\pi)$ flips the sign of the gravity term.</li></ol>`,
  ans: "ϑ̈ + ϑ̇ + ϑ = f/9.8; ϑ = e^(−t/2)[0.15cos0.866t + 0.0866 sin0.866t]; λ = 0.618 > 0 at ϑ = π" });

/* =================== 2022/23 Semester 2 =================== */
add("dtstab", { src: "Exam 2023 Q2(a)(ii)", see: [0],
  q: R`With $a=-0.8$, $b=-0.15$ found from the data in Q2(a)(i), is $y[n]=ay[n-1]+by[n-2]+x[n]-x[n-2]$ asymptotically stable? [5 marks]`,
  hint: R`Poles of $\dfrac{z^2-1}{z^2+0.8z+0.15}$.`,
  sol: R`<ol class="steps"><li>$H(z)=\dfrac{1-z^{-2}}{1+0.8z^{-1}+0.15z^{-2}}=\dfrac{z^2-1}{z^2+0.8z+0.15}$.</li><li>$z^2+0.8z+0.15=(z+0.5)(z+0.3)$ ⇒ poles −0.5, −0.3, both inside the unit circle ⇒ asymptotically stable. (Zeros at ±1 don't matter.)</li></ol>`,
  ans: "Poles −0.5, −0.3 ⇒ stable" });
add("dtstab", { src: "Exam 2023 Q2(b)", see: [0, 4],
  q: R`$H(z)=\dfrac{1.5z}{z-1.5}$. (i) Find the unit-step response. (ii) With a gain $K$ in a unity negative feedback loop, form the closed-loop transfer function. (iii) Find the minimum positive $K$ for asymptotic stability. [15 marks]`,
  hint: R`(i) $\dfrac Yz=\dfrac{1.5z}{(z-1.5)(z-1)}$. (iii) The single closed-loop pole must satisfy $|z|\lt 1$.`,
  sol: R`<ol class="steps"><li>(i) $\dfrac Yz=\dfrac{4.5}{z-1.5}-\dfrac{3}{z-1}$ ⇒ $y[n]=[4.5(1.5)^n-3]u[n]$: grows without bound (pole at 1.5).</li><li>(ii) $\dfrac{KH}{1+KH}=\dfrac{1.5Kz}{(1+1.5K)z-1.5}$.</li><li>(iii) Pole $z=\dfrac{1.5}{1+1.5K}$. $|z|\lt 1$ ⇒ $1+1.5K\gt 1.5$ ⇒ $K\gt\frac13$.</li></ol>`,
  ans: "y = 4.5(1.5)ⁿ − 3 (unstable); 1.5Kz/((1+1.5K)z − 1.5); K > 1/3" });
add("ctstab", { src: "Exam 2023 Q3(a)", plab: "Q3(a)–(b)", see: [1, 2, 5],
  q: R`(a) $h(t)=2e^{3t}u(t)$: show the system is unstable. (b) It is controlled by $K_1+\dfrac{K_2}{s}$ in unity negative feedback. (i) Show $G_{CL}=\dfrac{2(K_1s+K_2)}{s^2+(2K_1-3)s+2K_2}$. (ii) Minimum $K_1$, $K_2$ for asymptotic stability? [12 marks]`,
  hint: R`$H(s)=\dfrac{2}{s-3}$. For a second-order denominator, stable ⇔ all coefficients positive.`,
  sol: R`<ol class="steps"><li>(a) $h$ grows without bound ($\int|h|dt=\infty$); equivalently $H=\frac{2}{s-3}$ has a pole at +3.</li><li>(b)(i) $CH=\dfrac{2(K_1s+K_2)}{s(s-3)}$ ⇒ $\dfrac{2(K_1s+K_2)}{s^2-3s+2K_1s+2K_2}$ ✓.</li><li>(ii) $2K_1-3\gt 0$ ⇒ $K_1\gt 1.5$; $2K_2\gt 0$ ⇒ $K_2\gt 0$.</li></ol>`,
  ans: "Pole at +3; K₁ > 1.5, K₂ > 0" });
add("sstrans", { src: "Exam 2023 Q3(c)", plab: "Q3(c)–(d)", see: [0, 3],
  q: R`With $K_1=3$, $K_2=1$: (c)(i) form the CCF of $G_{CL}=\dfrac{2(3s+1)}{s^2+3s+2}$; (ii) describe its block diagram. (d) Find the closed-loop unit-impulse response and comment. [13 marks]`,
  hint: R`CCF: bottom row $[-2\ -3]$, $B=[0\ 1]^T$, numerator coefficients in C: $C=[2\ \ 6]$.`,
  sol: R`<ol class="steps"><li>$\dot x=\begin{bmatrix}0&1\\-2&-3\end{bmatrix}x+\begin{bmatrix}0\\1\end{bmatrix}u$, $y=\begin{bmatrix}2&6\end{bmatrix}x$.</li><li>Block diagram: $u$ into a summer → $\dot x_2$ → integrator → $x_2$ → integrator → $x_1$. Feed back $-3x_2$ and $-2x_1$ into the summer. Output $y=2x_1+6x_2$.</li><li>(d) $\dfrac{2(3s+1)}{(s+1)(s+2)}=\dfrac{-4}{s+1}+\dfrac{10}{s+2}$ ⇒ $h(t)=[10e^{-2t}-4e^{-t}]u(t)$.</li><li>Comment: it decays to zero (stable): the controller has stabilised the unstable plant. Real poles, so no oscillation, but $h$ starts at 6, crosses zero and undershoots before decaying.</li></ol>`,
  ans: "A = [0 1; −2 −3], B = [0;1], C = [2 6]; h = 10e^(−2t) − 4e^(−t)" });
add("linearise", { src: "Exam 2023 Q4(a)", see: [1, 2, 4],
  q: R`$\dot x=y$, $\dot y=-xy-Kx-y+u$. (i) Show (0, 0) is an equilibrium with $K=1$, $u=0$. (ii) Linearise about (0, 0). (iii) Is the linear model asymptotically stable? [13 marks]`,
  hint: R`$xy$ linearises to $y_e\delta x+x_e\delta y=0$ at the origin.`,
  sol: R`<ol class="steps"><li>(i) At (0, 0): $\dot x=0$, $\dot y=0-0-0+0=0$ ✓.</li><li>(ii) Jacobian: $A=\begin{bmatrix}0&1\\-y-K&-x-1\end{bmatrix}_{(0,0)}=\begin{bmatrix}0&1\\-1&-1\end{bmatrix}$, $B=\begin{bmatrix}0\\1\end{bmatrix}$.</li><li>(iii) $\lambda^2+\lambda+1=0$ ⇒ $\lambda=-0.5\pm j0.866$: left half-plane ⇒ asymptotically stable (and oscillatory).</li></ol>`,
  ans: "A = [0 1; −1 −1]; λ = −0.5 ± j0.866 ⇒ stable" });
add("ctstab", { src: "Exam 2023 Q4(b)", see: [4, 5],
  q: R`$G_{Lin}=\dfrac{1}{s^2+s-1}$ is put in a unity negative feedback loop with gain $K_c$. (i) Minimum $K_c$ for asymptotic stability? (ii) Minimum $K_c$ for stable <i>and</i> oscillatory behaviour? [12 marks]`,
  hint: R`Closed loop: $\dfrac{K_c}{s^2+s+K_c-1}$.`,
  sol: R`<ol class="steps"><li>Characteristic polynomial $s^2+s+(K_c-1)$.</li><li>(i) Stable ⇔ $K_c-1\gt 0$ ⇒ $K_c\gt 1$.</li><li>(ii) Complex poles ⇔ $1-4(K_c-1)\lt 0$ ⇒ $K_c\gt 1.25$.</li></ol>`,
  ans: "K_c > 1; K_c > 1.25" });

/* =================== 2022/23 Resit =================== */
add("statespace", { src: "Resit 2023 Q1(a)", plab: "Q1(a)–(b)", see: [4],
  q: R`$\dot x=\begin{bmatrix}0&1\\-K/M&-B/M\end{bmatrix}x+\begin{bmatrix}0\\\bar K/M\end{bmatrix}f_{in}$, $y=\begin{bmatrix}1&0\end{bmatrix}x$. (a) Form $Y/F_{in}$. (b) For some $K$ the poles are −1 and −4. Find $K$ if $M=2$ kg, $B=10$ N·s/m, $\bar K=K$. [10 marks]`,
  hint: R`CCF ⇒ read the transfer function straight off. Then $s^2+5s+K/2=(s+1)(s+4)$.`,
  sol: R`<ol class="steps"><li>$\dfrac{Y}{F_{in}}=\dfrac{\bar K/M}{s^2+\frac BMs+\frac KM}$.</li><li>$B/M=5$ ✓ matches $1+4$. $K/M=4$ ⇒ $K=8$ N/m.</li></ol>`,
  ans: "(K̄/M)/(s² + (B/M)s + K/M); K = 8 N/m" });
add("order12", { src: "Resit 2023 Q1(c)", see: [3, 4],
  q: R`$\ddot y+2\dot y+5y=5f_{in}$. (i) Unit-step response. (ii) Initial and final values. (iii) Period of oscillation. (iv) Percentage overshoot. [15 marks]`,
  hint: R`$s^2+2s+5=(s+1)^2+4$: $\omega_d=2$, $\zeta=1/\sqrt5$.`,
  sol: R`<ol class="steps"><li>$Y=\dfrac{5}{s(s^2+2s+5)}=\dfrac1s-\dfrac{(s+1)+1}{(s+1)^2+2^2}$.</li><li>$y(t)=\left[1-e^{-t}\left(\cos2t+\tfrac12\sin2t\right)\right]u(t)$.</li><li>$y(0)=0$, $y(\infty)=1$.</li><li>$T=2\pi/\omega_d=\pi=3.14$ s.</li><li>$\zeta=\frac{2}{2\sqrt5}=0.447$ ⇒ $\%OS=100e^{-\pi/2}=20.8\%$.</li></ol>`,
  ans: "y = 1 − e^(−t)(cos2t + ½sin2t); 0 → 1; T = π s; 20.8%" });
add("ivtfvt", { src: "Resit 2023 Q1(d)", see: [3, 1],
  q: R`$G=\dfrac{4}{s^2+4s+3}$. (i) Describe the block diagram of the series-form state space. Then in unity negative feedback with controller $G_c$: (ii) final value of the step response if $G_c=1$; (iii) if $G_c=1/s$; (iv) minimum positive $k_0$ ($G_c=k_0$) for stable and oscillatory. [25 marks]`,
  hint: R`Series form: $G=\frac{2}{s+1}\cdot\frac{2}{s+3}$. For (iii), check stability before using the FVT.`,
  sol: R`<ol class="steps"><li>(i) Two first-order sections in cascade: $u$ → summer → integrator → $x_1$ with feedback $-1\cdot x_1$, gain 2; then → summer → integrator → $x_2$ with feedback $-3x_2$, gain 2 → $y$. E.g. $\dot x_1=-x_1+2u$, $\dot x_2=2x_1-3x_2$, $y=x_2$.</li><li>(ii) $G_{CL}=\dfrac{4}{s^2+4s+7}$ ⇒ FV $=4/7=0.571$ (steady-state error 0.43).</li><li>(iii) $G_{CL}=\dfrac{4}{s^3+4s^2+3s+4}$. Stable: all positive and $4\times3\gt 1\times4$ ✓. FV $=4/4=1$: the integrator removes the error.</li><li>(iv) $s^2+4s+3+4k_0$: complex ⇔ $16\lt 4(3+4k_0)$ ⇔ $k_0\gt 0.25$.</li></ol>`,
  ans: "FV = 4/7; FV = 1; k₀ > 0.25" });
add("ztrans", { src: "Resit 2023 Q2(a)", see: [2, 6],
  q: R`$y[n]=ax[n]+by[n-1]$ has impulse response $0.25,\ 0.125,\ 0.0625,\dots$ (i) Find $a$, $b$. (ii) Closed form for the unit-step response. (iii) Sketch it with initial and final values. [10 marks]`,
  hint: R`Impulse: $y[0]=a$, $y[1]=b\,y[0]$.`,
  sol: R`<ol class="steps"><li>$a=0.25$, $b=0.125/0.25=0.5$.</li><li>$H=\dfrac{0.25z}{z-0.5}$; $\dfrac Yz=\dfrac{0.25z}{(z-0.5)(z-1)}=\dfrac{0.5}{z-1}-\dfrac{0.25}{z-0.5}$.</li><li>$y[n]=[0.5-0.25(0.5)^n]u[n]=0.5(1-0.5^{n+1})$.</li><li>Starts at 0.25, rises monotonically (0.375, 0.4375, …) to 0.5.</li></ol>`,
  ans: "a = 0.25, b = 0.5; y = 0.5 − 0.25(0.5)ⁿ; 0.25 → 0.5" });
add("dtstab", { src: "Resit 2023 Q2(b)", see: [4, 1],
  q: R`$y[n]=1.25y[n-1]+0.25w[n]$ sits in a unity negative feedback loop with gain $K$. (i) $G(z)$? (ii) Closed-loop $Y/X$? (iii) Minimum positive $K$ to stabilise? (iv) Oscillatory if $K=2$? [15 marks]`,
  hint: R`One closed-loop pole: make its magnitude less than 1.`,
  sol: R`<ol class="steps"><li>(i) $G=\dfrac{0.25z}{z-1.25}$ (unstable pole 1.25).</li><li>(ii) $\dfrac{KG}{1+KG}=\dfrac{0.25Kz}{(1+0.25K)z-1.25}$.</li><li>(iii) Pole $\dfrac{1.25}{1+0.25K}\lt 1$ ⇒ $K\gt 1$.</li><li>(iv) $K=2$: pole $=1.25/1.5=0.833$, positive real ⇒ not oscillatory (monotonic decay).</li></ol>`,
  ans: "0.25z/(z−1.25); K > 1; K = 2 → pole 0.833, not oscillatory" });
add("bdreduce", { src: "Resit 2023 Q3(a)", fig: "ssc_pp23r_q3a", see: [2, 3],
  q: R`For the diagram: (i) find $K$ if $\dfrac YX=\dfrac{4}{s+6}$. (ii) Find $y(t)$ for $x=(1-e^{-3t})u(t)$, with initial and final values. (iii) Find $e(t)$ and comment. [17 marks]`,
  hint: R`Inner loop round $\frac{1}{s+1}$ gives the lower path $\frac{K}{s+2}$; the upper path is also $\frac{K}{s+2}$. So the forward path is $\frac{2K}{s+2}$.`,
  sol: R`<ol class="steps"><li>Let $u=KE$. Inner summer: $w=u-\frac{w}{s+1}$ ⇒ lower output $\frac{w}{s+1}=\frac{u}{s+2}$. Upper: $\frac{u}{s+2}$. Sum: $Y=\frac{2KE}{s+2}$.</li><li>Outer loop: $\dfrac YX=\dfrac{2K}{s+2+2K}=\dfrac4{s+6}$ ⇒ $K=2$.</li><li>(ii) $X=\frac{3}{s(s+3)}$, $Y=\frac{12}{s(s+3)(s+6)}$ ⇒ $y=\left[\frac23-\frac43e^{-3t}+\frac23e^{-6t}\right]u(t)$; $y(0)=0$, $y(\infty)=\frac23$.</li><li>(iii) $E=X-Y=\frac{s+2}{s+6}X=\frac{3(s+2)}{s(s+3)(s+6)}$ ⇒ $e=\left[\frac13+\frac13e^{-3t}-\frac23e^{-6t}\right]u(t)$.</li><li>Comment: $e\to\frac13$, a steady-state error (DC gain 4/6), because there is no integrator in the loop.</li></ol>`,
  ans: "K = 2; y = 2/3 − (4/3)e^(−3t) + (2/3)e^(−6t); e → 1/3" });
add("sstrans", { src: "Resit 2023 Q3(b)", see: [1, 2, 3],
  q: R`Parallel form $\dot x=\begin{bmatrix}-1&0\\0&-2\end{bmatrix}x+\begin{bmatrix}1\\1\end{bmatrix}x_{in}$, $y=\begin{bmatrix}1&-1\end{bmatrix}x$. (i) State-transition matrix. (ii) Unit-impulse response. (iii) Advantages of the parallel form. [8 marks]`,
  hint: R`Diagonal A ⇒ $\Phi=\text{diag}(e^{-t},e^{-2t})$.`,
  sol: R`<ol class="steps"><li>$\Phi=\begin{bmatrix}e^{-t}&0\\0&e^{-2t}\end{bmatrix}$.</li><li>$h=C\Phi B=e^{-t}-e^{-2t}$, $t\ge0$.</li><li>Decoupled states: Φ needs no eigenvectors or inverse; the poles (modes) are visible on the diagonal; each state can be solved on its own.</li></ol>`,
  ans: "Φ = diag(e^(−t), e^(−2t)); h = e^(−t) − e^(−2t)" });
add("linearise", { src: "Resit 2023 Q4(a)", see: [1, 2, 4],
  q: R`Nonlinear circuit: $\dfrac{di}{dt}=-\frac RLi-\frac vL+\frac{V_{in}}L$, $\dfrac{dv}{dt}=\frac iC-\frac{v^2}{C}$, with $R=1.25$ Ω, $L=1$ H, $C=1$ F. (i) Show (0, 0) is an equilibrium with no input. (ii) Show (0.64, −0.8) is another. (iii) Linearise about (0.64, −0.8). (iv) Is the step response of the linear model stable and oscillatory? [17 marks]`,
  hint: R`$v^2$ linearises to $2v_e\,\delta v=-1.6\,\delta v$, so $-v^2/C\to+1.6\,\delta v$.`,
  sol: R`<ol class="steps"><li>(i) $i=v=0$, $V_{in}=0$: both derivatives zero ✓.</li><li>(ii) $-1.25(0.64)+0.8=0$ ✓ and $0.64-0.64=0$ ✓.</li><li>(iii) $\begin{bmatrix}\delta\dot i\\\delta\dot v\end{bmatrix}=\begin{bmatrix}-1.25&-1\\1&1.6\end{bmatrix}\begin{bmatrix}\delta i\\\delta v\end{bmatrix}+\begin{bmatrix}1\\0\end{bmatrix}\delta V_{in}$ (the $-2v_e/C$ entry is $+1.6$).</li><li>(iv) $\lambda^2-0.35\lambda-1=0$ ⇒ $\lambda=1.19,\ -0.84$: real, one positive ⇒ unstable and not oscillatory.</li></ol>`,
  ans: "A = [−1.25 −1; 1 1.6]; λ = 1.19, −0.84 ⇒ unstable, non-oscillatory" });
add("ctstab", { src: "Resit 2023 Q4(b)", see: [5, 4],
  q: R`$G=\dfrac{1}{s^2+2.9s-0.3}$ with controller $k_0$ in unity negative feedback gives $G_{CL}=\dfrac{1.5}{s^2+2.9s+1.2}$. (i) Find $k_0$. (ii) Comment on the effect of the controller. [8 marks]`,
  hint: R`$G_{CL}=\dfrac{k_0}{s^2+2.9s-0.3+k_0}$. Compare open- and closed-loop poles.`,
  sol: R`<ol class="steps"><li>$-0.3+k_0=1.2$ ⇒ $k_0=1.5$ (numerator 1.5 ✓).</li><li>Open loop: poles $0.1$ and $-3.0$: unstable. Closed loop: $-0.5$ and $-2.4$: stable, non-oscillatory.</li><li>The controller stabilises the plant, but the DC gain is $1.5/1.2=1.25$, so the output doesn't track the input exactly.</li></ol>`,
  ans: "k₀ = 1.5; moves the pole at +0.1 to −0.5: stabilises" });

/* =================== 2023/24 Semester 2 =================== */
add("laplace", { src: "Exam 2024 Q1(c)", see: [2],
  q: R`For $\dfrac{V_o}{V_{in}}=\dfrac{5}{s^2+6s+5}$, find the response to $v_{in}=2e^{-3t}u(t)$ by Laplace transforms. [5 marks]`,
  hint: R`$V_o=\dfrac{10}{(s+1)(s+5)(s+3)}$: three distinct poles, cover-up.`,
  sol: R`<ol class="steps"><li>$V_o=\dfrac{1.25}{s+1}-\dfrac{2.5}{s+3}+\dfrac{1.25}{s+5}$.</li><li>$v_o(t)=1.25\left[e^{-t}-2e^{-3t}+e^{-5t}\right]u(t)$.</li></ol>`,
  ans: "v_o = 1.25(e^(−t) − 2e^(−3t) + e^(−5t))" });
add("ivtfvt", { src: "Exam 2024 Q2(c)", see: [4],
  q: R`$G(z)=\dfrac{z+1}{3z-1}$. Is the unit-step response oscillatory? Give its initial and final values. [5 marks]`,
  hint: R`Pole at $z=1/3$. IVT: $\lim_{z\to\infty}Y$; FVT: $G(1)$.`,
  sol: R`<ol class="steps"><li>Pole $z=\frac13$: positive real, inside the circle ⇒ stable, not oscillatory.</li><li>Initial: $\lim_{z\to\infty}\frac{z+1}{3z-1}\cdot\frac{z}{z-1}=\frac13$.</li><li>Final: $G(1)=\frac{2}{2}=1$.</li></ol>`,
  ans: "Not oscillatory; y[0] = 1/3, y[∞] = 1" });
add("bdreduce", { src: "Exam 2024 Q3(a)", fig: "ssc_pp24_q3", see: [2],
  q: R`Show that the system's transfer function is $\dfrac{Y}{X}=\dfrac{8(s+2)}{s^2+4s+16}$. [5 marks]`,
  hint: R`Inner unity loop: $\frac{1/(s+1)}{1+1/(s+1)}=\frac1{s+2}$. Then the outer loop with feedback $\frac{12}{s+2}$, then the gain 8.`,
  sol: R`<ol class="steps"><li>Inner: $\dfrac1{s+2}$.</li><li>Outer: $\dfrac{\frac1{s+2}}{1+\frac{12}{(s+2)^2}}=\dfrac{s+2}{(s+2)^2+12}=\dfrac{s+2}{s^2+4s+16}$.</li><li>Times 8 ✓.</li></ol>`,
  ans: "8(s+2)/(s²+4s+16)" });
add("order12", { src: "Exam 2024 Q3(b)", plab: "Q3(b)–(d)", see: [3, 4],
  q: R`For $\dfrac{8(s+2)}{s^2+4s+16}$: (b) unit-step response; (c) period of oscillation; (d) percentage overshoot. [12 marks]`,
  hint: R`$s^2+4s+16=(s+2)^2+12$, so $\omega_d=2\sqrt3$. Partial fractions: $\frac1s+\frac{-s+4}{s^2+4s+16}$.`,
  sol: R`<ol class="steps"><li>$Y=\dfrac1s-\dfrac{(s+2)-6}{(s+2)^2+12}$ ⇒ $$y(t)=\left[1-e^{-2t}\cos2\sqrt3t+\sqrt3e^{-2t}\sin2\sqrt3t\right]u(t)$$</li><li>$T=\dfrac{2\pi}{2\sqrt3}=1.81$ s.</li><li>Formula: $\omega_n=4$, $\zeta=0.5$ ⇒ $\%OS=16.3\%$. This is the expected exam answer.</li><li>Caution: the zero at $s=-2$ (on top of the real part) makes the true peak much bigger: $y_{max}=1.70$ at $t=0.45$ s, i.e. 70%. The formula only holds for the standard form with no zero; say so for an extra mark.</li></ol>`,
  ans: "y = 1 − e^(−2t)cos(2√3t) + √3e^(−2t)sin(2√3t); T = 1.81 s; %OS 16.3% (formula)" });
add("sstrans", { src: "Exam 2024 Q3(e)", see: [0],
  q: R`(i) Form a CCF state space for $\dfrac{8(s+2)}{s^2+4s+16}$. (ii) Describe its block diagram. [8 marks]`,
  hint: R`Numerator $8s+16$ ⇒ $C=[16\ \ 8]$.`,
  sol: R`<ol class="steps"><li>$\dot x=\begin{bmatrix}0&1\\-16&-4\end{bmatrix}x+\begin{bmatrix}0\\1\end{bmatrix}u$, $y=\begin{bmatrix}16&8\end{bmatrix}x$.</li><li>Diagram: $u$ → summer → $\dot x_2$ → ∫ → $x_2$ → ∫ → $x_1$. Feedback $-4x_2$ and $-16x_1$ into the summer. Output $16x_1+8x_2$.</li></ol>`,
  ans: "A = [0 1; −16 −4], B = [0;1], C = [16 8]" });
add("linearise", { src: "Exam 2024 Q4(a)", see: [1, 2, 4],
  q: R`$\dot x=y$, $\dot y=-xy-x-y+u$. (i) Show (0, 0) is an equilibrium for $u=0$. (ii) Linearise about it. (iii) Is it asymptotically stable? [10 marks]`,
  hint: R`Same structure as 2023 Q4(a) with $K=1$.`,
  sol: R`<ol class="steps"><li>(i) $y=0$ ⇒ $\dot x=0$; $\dot y=0-0-0+0=0$ ✓.</li><li>(ii) $A=\begin{bmatrix}0&1\\-1&-1\end{bmatrix}$, $B=\begin{bmatrix}0\\1\end{bmatrix}$ ($xy$ drops out at the origin).</li><li>(iii) $\lambda=-0.5\pm j0.866$ ⇒ asymptotically stable.</li></ol>`,
  ans: "A = [0 1; −1 −1]; stable (λ = −0.5 ± j0.866)" });

/* =================== 2025/26 Semester 1 (EEN1020) =================== */
add("statespace", { src: "Exam 2025/26 Q1(a)", fig: "ssc_pp26_q1a", see: [1, 3],
  q: R`Construct a state-space representation with $v_C$ and $i_L$ as states for the series RLC circuit shown (source $V_{in}$, then R, L, C in series). Output $v_C$. [10 marks]`,
  hint: R`Capacitor: $C\dot v_C=i_L$. KVL round the loop: $V_{in}=Ri_L+L\dot i_L+v_C$.`,
  sol: R`<ol class="steps"><li>$\dot v_C=\frac1Ci_L$.</li><li>$\dot i_L=-\frac1Lv_C-\frac RLi_L+\frac1LV_{in}$.</li><li>$$\frac{d}{dt}\begin{bmatrix}v_C\\i_L\end{bmatrix}=\begin{bmatrix}0&\frac1C\\-\frac1L&-\frac RL\end{bmatrix}\begin{bmatrix}v_C\\i_L\end{bmatrix}+\begin{bmatrix}0\\\frac1L\end{bmatrix}V_{in},\quad y=\begin{bmatrix}1&0\end{bmatrix}\begin{bmatrix}v_C\\i_L\end{bmatrix}$$</li></ol>`,
  ans: "A = [0 1/C; −1/L −R/L], B = [0; 1/L], C = [1 0]" });
add("statespace", { src: "Exam 2025/26 Q1(b)", see: [4],
  q: R`$\dfrac{d}{dt}\begin{bmatrix}v_c\\i_L\end{bmatrix}=\begin{bmatrix}-\frac1{RC}&\frac1C\\-\frac1L&0\end{bmatrix}\begin{bmatrix}v_c\\i_L\end{bmatrix}+\begin{bmatrix}0\\\frac1L\end{bmatrix}V_{in}$, $y=\begin{bmatrix}1&0\end{bmatrix}x$. Form $V_C/V_{in}$. [5 marks]`,
  hint: R`$G=C(sI-A)^{-1}B$: only the (1,2) element of the inverse matters, times $1/L$.`,
  sol: R`<ol class="steps"><li>$sI-A=\begin{bmatrix}s+\frac1{RC}&-\frac1C\\\frac1L&s\end{bmatrix}$, $\det=s^2+\frac{s}{RC}+\frac1{LC}$.</li><li>$(sI-A)^{-1}_{12}=\dfrac{1/C}{\det}$ ⇒ $G=\dfrac{1/C}{\det}\cdot\dfrac1L$.</li><li>$$\frac{V_C}{V_{in}}=\frac{1/LC}{s^2+\frac{1}{RC}s+\frac{1}{LC}}$$</li></ol>`,
  ans: "(1/LC)/(s² + s/RC + 1/LC)" });
add("order12", { src: "Exam 2025/26 Q1(c)", see: [1, 4, 3],
  q: R`$H(s)=\dfrac{4}{s^2+2s+4}$. Find (i) the damped natural frequency, (ii) the period of oscillation, (iii) the time to peak, (iv) the percentage overshoot, (v) the initial and final values, and (vi) sketch the step response. [20 marks]`,
  hint: R`$\omega_n=2$, $\zeta=0.5$.`,
  sol: R`<ol class="steps"><li>(i) $\omega_d=\omega_n\sqrt{1-\zeta^2}=2\sqrt{0.75}=\sqrt3=1.73$ rad/s.</li><li>(ii) $T=2\pi/\omega_d=3.63$ s.</li><li>(iii) $t_p=\pi/\omega_d=1.81$ s.</li><li>(iv) $\%OS=100e^{-\pi(0.5)/\sqrt{0.75}}=16.3\%$.</li><li>(v) $y(0)=0$ (IVT); $y(\infty)=H(0)=1$.</li><li>(vi) Rises from 0, peaks at 1.163 at 1.81 s, dips below 1 at about 3.6 s, settles to 1 by $t_s=4/(\zeta\omega_n)=4$ s.</li></ol>`,
  ans: "ω_d = 1.73 rad/s; T = 3.63 s; t_p = 1.81 s; 16.3%; 0 → 1" });
add("rotational", { src: "Exam 2025/26 Q2(a)", plab: "Q2(a)–(b)", fig: "ssc_pp26_q2", see: [0],
  q: R`A disc of inertia $J$ is held by a torsional spring $K$ and damper $B$ to a wall, and driven by torque $T$. (a) Form $\Theta/T$. (b) Give a range of $K$, $B$, $J$ for stability. [8 marks]`,
  hint: R`$J\ddot\theta=T-B\dot\theta-K\theta$.`,
  sol: R`<ol class="steps"><li>$J\ddot\theta+B\dot\theta+K\theta=T$ ⇒ $\dfrac{\Theta}{T}=\dfrac{1}{Js^2+Bs+K}$.</li><li>Second order: stable iff all coefficients have the same sign: $J\gt 0$ (physical), $B\gt 0$, $K\gt 0$. $B=0$ gives marginal (undamped) oscillation.</li></ol>`,
  ans: "1/(Js² + Bs + K); stable for J, B, K > 0" });
add("ssresp", { src: "Exam 2025/26 Q2(c)", plab: "Q2(c)–(e)", see: [3, 2],
  q: R`For $J\ddot\theta+B\dot\theta+K\theta=T$: (c) form a state space with $x_1=\theta$, $x_2=\dot\theta$. (d) Form the state-transition matrix for $J=1$, $B=3$, $K=2$. (e) Find $\theta(t)$ with no torque and $x(0)=[1\ \ -1]^T$. [17 marks]`,
  hint: R`$A=\begin{bmatrix}0&1\\-2&-3\end{bmatrix}$: eigenvalues −1, −2. Use $\mathcal L^{-1}\{(sI-A)^{-1}\}$ or $Pe^{\Lambda t}P^{-1}$.`,
  sol: R`<ol class="steps"><li>(c) $\dot x=\begin{bmatrix}0&1\\-K/J&-B/J\end{bmatrix}x+\begin{bmatrix}0\\1/J\end{bmatrix}T$, $\theta=\begin{bmatrix}1&0\end{bmatrix}x$.</li><li>(d) $(sI-A)^{-1}=\dfrac{1}{(s+1)(s+2)}\begin{bmatrix}s+3&1\\-2&s\end{bmatrix}$ ⇒ $$\Phi(t)=\begin{bmatrix}2e^{-t}-e^{-2t}&e^{-t}-e^{-2t}\\-2e^{-t}+2e^{-2t}&-e^{-t}+2e^{-2t}\end{bmatrix}$$ $\Phi(0)=I$ ✓.</li><li>(e) $x(t)=\Phi x(0)$: $\theta=(2e^{-t}-e^{-2t})-(e^{-t}-e^{-2t})=e^{-t}$.</li><li>Neat: $x(0)=[1,-1]$ is the eigenvector for λ = −1, so only that mode is excited.</li></ol>`,
  ans: "Φ = [2e^(−t)−e^(−2t), e^(−t)−e^(−2t); −2e^(−t)+2e^(−2t), −e^(−t)+2e^(−2t)]; θ = e^(−t)" });
add("bdreduce", { src: "Exam 2025/26 Q3(a)", plab: "Q3(a)–(c)", fig: "ssc_pp26_q3", see: [2, 3, 5],
  q: R`For the feedback system shown: (a) reduce to a single $Y/X$. (b) For which $K$ is it asymptotically stable? (c) For which $K$ is the response oscillatory? [13 marks]`,
  hint: R`Call the second summer's output $w$. Inner loop round $\frac1{s-1}$: $w=5E-\frac{w}{s-1}$. The upper path takes $w$ through $\frac1{s+3}$ and is <b>subtracted</b> at the output summer.`,
  sol: R`<ol class="steps"><li>$w\left(1+\frac{1}{s-1}\right)=5E$ ⇒ $w=\frac{5(s-1)}{s}E$; lower path $\frac{w}{s-1}=\frac5sE$; upper path $\frac{w}{s+3}=\frac{5(s-1)}{s(s+3)}E$.</li><li>$Y=\frac5s\left[1-\frac{s-1}{s+3}\right]E=\frac{20}{s(s+3)}E$.</li><li>$E=X-KY$ ⇒ $$\frac YX=\frac{20}{s^2+3s+20K}$$</li><li>(b) Stable ⇔ $20K\gt 0$ ⇒ $K\gt 0$.</li><li>(c) Oscillatory ⇔ $9-80K\lt 0$ ⇒ $K\gt 0.1125$.</li></ol>`,
  ans: "20/(s² + 3s + 20K); stable K > 0; oscillatory K > 0.1125" });
add("sstrans", { src: "Exam 2025/26 Q3(d)", see: [0, 3],
  q: R`For some $K$ the impulse response is $h(t)=\dfrac{20}{\sqrt{28.75}}e^{-1.5t}\sin(\sqrt{28.75}t)u(t)$. (i) Find $T(s)$. (ii) Find $K$. (iii) Steady-state gain? (iv) Form the CCF and write the unit-impulse response in terms of the matrices. [12 marks]`,
  hint: R`$\frac{\omega}{(s+a)^2+\omega^2}\leftrightarrow e^{-at}\sin\omega t$. Then match $s^2+3s+20K$.`,
  sol: R`<ol class="steps"><li>(i) $T(s)=\dfrac{20}{(s+1.5)^2+28.75}=\dfrac{20}{s^2+3s+31}$.</li><li>(ii) $20K=31$ ⇒ $K=1.55$.</li><li>(iii) $T(0)=20/31=0.645$.</li><li>(iv) $A=\begin{bmatrix}0&1\\-31&-3\end{bmatrix}$, $B=\begin{bmatrix}0\\1\end{bmatrix}$, $C=\begin{bmatrix}20&0\end{bmatrix}$, $D=0$. $$h(t)=Ce^{At}B=\begin{bmatrix}20&0\end{bmatrix}e^{\begin{bmatrix}0&1\\-31&-3\end{bmatrix}t}\begin{bmatrix}0\\1\end{bmatrix}$$</li></ol>`,
  ans: "T = 20/(s²+3s+31); K = 1.55; gain 0.645; h = C e^(At) B" });
add("dtstab", { src: "Exam 2025/26 Q4(b)", see: [0],
  q: R`$y[n]=-0.9y[n-1]-0.2y[n-2]+x[n-2]$. Is the system stable? [5 marks]`,
  hint: R`$H(z)=\dfrac{1}{z^2+0.9z+0.2}$.`,
  sol: R`<ol class="steps"><li>$z^2+0.9z+0.2=(z+0.4)(z+0.5)$ ⇒ poles −0.4, −0.5.</li><li>Both inside the unit circle ⇒ stable (negative real: the response alternates in sign as it decays).</li></ol>`,
  ans: "Poles −0.4, −0.5 ⇒ stable" });
add("ssode", { src: "Exam 2025/26 Q4(c)", see: [1, 2],
  q: R`Form a companion-form state space for $y[n]=-0.9y[n-1]-0.2y[n-2]+x[n-2]$. [8 marks]`,
  hint: R`Same pattern as CCF, with $x[n+1]$ in place of $\dot x$. $H=\dfrac{1}{z^2+0.9z+0.2}$.`,
  sol: R`<ol class="steps"><li>Let $x_1[n]=y[n]$, $x_2[n]=y[n+1]$.</li><li>$x_1[n+1]=x_2[n]$; $x_2[n+1]=y[n+2]=-0.2x_1[n]-0.9x_2[n]+u[n]$.</li><li>$$\mathbf x[n+1]=\begin{bmatrix}0&1\\-0.2&-0.9\end{bmatrix}\mathbf x[n]+\begin{bmatrix}0\\1\end{bmatrix}u[n],\quad y[n]=\begin{bmatrix}1&0\end{bmatrix}\mathbf x[n]$$</li></ol>`,
  ans: "A = [0 1; −0.2 −0.9], B = [0;1], C = [1 0]" });

/* =================== 2025/26 Resit =================== */
add("tfcircuits", { src: "Resit 2025/26 Q1(a)", fig: "ssc_pp26r_q1a", see: [1, 2],
  q: R`$v_i$ drives L in series, then C in parallel with R (output $v_o$ across C). (i) Show $LC\ddot v_o+\frac LR\dot v_o+v_o=v_i$. (ii) Write $V_o/V_i$ in the form $\dfrac{a}{s^2+bs+c}$. [7 marks]`,
  hint: R`KCL at the output node: $i_L=C\dot v_o+v_o/R$. KVL: $v_i=L\dot i_L+v_o$.`,
  sol: R`<ol class="steps"><li>Differentiate the KCL: $\dot i_L=C\ddot v_o+\dot v_o/R$.</li><li>Substitute into the KVL: $v_i=LC\ddot v_o+\frac LR\dot v_o+v_o$ ✓.</li><li>$$\frac{V_o}{V_i}=\frac{1/LC}{s^2+\frac{1}{RC}s+\frac{1}{LC}}$$ so $a=c=\frac{1}{LC}$, $b=\frac{1}{RC}$.</li></ol>`,
  ans: "(1/LC)/(s² + s/RC + 1/LC)" });
add("order12", { src: "Resit 2025/26 Q1(b)", see: [3, 4, 1],
  q: R`$\dfrac{V_o}{V_i}=\dfrac{1}{s^2+2s+2}$. (i) Poles. (ii) Stable (pole-zero map)? (iii) Peak overshoot. (iv) Period of oscillation. (v) Step response by Laplace. (vi) Initial and final values by IVT/FVT. (vii) Sketch. [29 marks]`,
  hint: R`$(s+1)^2+1$: $\omega_n=\sqrt2$, $\zeta=1/\sqrt2$, $\omega_d=1$. The DC gain is ½, not 1.`,
  sol: R`<ol class="steps"><li>(i) $s=-1\pm j$.</li><li>(ii) Both in the left half-plane, no zeros ⇒ stable.</li><li>(iii) $\zeta=\frac{2}{2\sqrt2}=0.707$ ⇒ $\%OS=100e^{-\pi}=4.3\%$.</li><li>(iv) $T=2\pi/\omega_d=2\pi=6.28$ s.</li><li>(v) $Y=\frac{1}{s(s^2+2s+2)}=\frac{1/2}{s}-\frac12\frac{(s+1)+1}{(s+1)^2+1}$ ⇒ $y=\frac12\left[1-e^{-t}(\cos t+\sin t)\right]u(t)$.</li><li>(vi) IVT: $\lim_{s\to\infty}sY=0$. FVT: $\lim_{s\to0}sY=\frac12$.</li><li>(vii) Rises from 0, peaks at 0.522 at $t_p=\pi$ s, settles to 0.5 by about 4 s.</li></ol>`,
  ans: "−1 ± j; stable; 4.3%; T = 6.28 s; y = ½[1 − e^(−t)(cos t + sin t)]; 0 → 0.5" });
add("ctstab", { src: "Resit 2025/26 Q1(c)", fig: "ssc_pp26r_q1c", see: [4, 5],
  q: R`$G=\dfrac{1}{s+3}$. (i) Form $Y/X$. (ii) Range of $K$ for asymptotic stability. (iii) Range of $K$ for stable and oscillatory. [14 marks]`,
  hint: R`The inner unity loop round $\frac1s$ is $\frac{1}{s+1}$. Then the outer loop has feedback $K$.`,
  sol: R`<ol class="steps"><li>Inner: $\dfrac{1}{s+1}$. Forward: $\dfrac{1}{(s+3)(s+1)}$.</li><li>$$\frac YX=\frac{1}{(s+1)(s+3)+K}=\frac{1}{s^2+4s+3+K}$$</li><li>(ii) $3+K\gt 0$ ⇒ $K\gt-3$.</li><li>(iii) $16-4(3+K)\lt 0$ ⇒ $K\gt 1$.</li></ol>`,
  ans: "1/(s² + 4s + 3 + K); K > −3; K > 1" });
add("translational", { src: "Resit 2025/26 Q2(a)", fig: "ssc_pp26r_q2", see: [2, 4],
  q: R`Mass $M$ (displacement $y$, force $f$) is tied to the wall by spring $K_1$, and by spring $K_2$ in series with damper $B$ (junction displacement $x$). (i) Write the free-body equations. (ii) Find $Y/F$. [10 marks]`,
  hint: R`The junction between $K_2$ and $B$ is a massless node: $B\dot x=K_2(y-x)$.`,
  sol: R`<ol class="steps"><li>Mass: $M\ddot y+K_1y+K_2(y-x)=f$.</li><li>Node: $B\dot x+K_2(x-y)=0$.</li><li>Node in $s$: $X=\dfrac{K_2}{Bs+K_2}Y$.</li><li>Substitute: $$\frac YF=\frac{Bs+K_2}{MBs^3+MK_2s^2+B(K_1+K_2)s+K_1K_2}$$</li></ol>`,
  ans: "(Bs+K₂)/(MBs³ + MK₂s² + B(K₁+K₂)s + K₁K₂)" });
add("laplace", { src: "Resit 2025/26 Q2(b)", see: [2, 1],
  q: R`A simplified model is $\dfrac YF=\dfrac{0.5}{(s+1)^2}$, with a unit-step force. (i) How was it simplified, and why prefer it? (ii) Find $y(t)$. (iii) Find the velocity by Laplace. (iv) Confirm (iii) by differentiating (ii). (v) Is the mass speeding up, slowing down or steady after the step? [15 marks]`,
  hint: R`Repeated pole: $\frac{0.5}{s(s+1)^2}=\frac{A}{s}+\frac{B}{s+1}+\frac{C}{(s+1)^2}$. Velocity: $sY$.`,
  sol: R`<ol class="steps"><li>(i) Third order → second order: the $K_2$–$B$ branch is replaced by a damper acting directly on the mass (or a fast pole dropped). Lower order is easier to analyse, and the dominant behaviour is kept.</li><li>(ii) $Y=\frac{0.5}{s}-\frac{0.5}{s+1}-\frac{0.5}{(s+1)^2}$ ⇒ $y=0.5\left[1-e^{-t}-te^{-t}\right]u(t)$.</li><li>(iii) $V=sY=\frac{0.5}{(s+1)^2}$ ⇒ $v=0.5te^{-t}u(t)$.</li><li>(iv) $\dot y=0.5[e^{-t}-e^{-t}+te^{-t}]=0.5te^{-t}$ ✓.</li><li>(v) Speeding up for $0\lt t\lt 1$ s ($\dot v=0.5e^{-t}(1-t)$), peak speed 0.184 at $t=1$ s, then slowing down to rest at $y=0.5$.</li></ol>`,
  ans: "y = 0.5(1 − e^(−t) − te^(−t)); v = 0.5te^(−t); speeds up to t = 1 s, then slows" });
add("bdreduce", { src: "Resit 2025/26 Q3(a)", fig: "ssc_pp26r_q3", see: [3, 2],
  q: R`Find $Y/R$ for the diagram (forward $\frac{10}{s+7}$ then $\frac1s$; feedback is $Y$ plus $0.4\times$ the signal between the blocks). [5 marks]`,
  hint: R`Let $V$ be the signal between the blocks: $Y=V/s$, feedback $=0.4V+V/s$.`,
  sol: R`<ol class="steps"><li>$V=\frac{10}{s+7}\left(R-0.4V-\frac Vs\right)$.</li><li>Multiply by $s(s+7)$: $V[s(s+7)+4s+10]=10sR$.</li><li>$Y=\frac Vs=\dfrac{10}{s^2+11s+10}R$.</li></ol>`,
  ans: "10/(s² + 11s + 10)" });
add("ssresp", { src: "Resit 2025/26 Q3(b)", see: [3, 0],
  q: R`Determine the state-transition matrix of $\dot x=\begin{bmatrix}-11&-10\\1&0\end{bmatrix}x+\begin{bmatrix}10\\0\end{bmatrix}r$. [10 marks]`,
  hint: R`$\det(sI-A)=s^2+11s+10=(s+1)(s+10)$.`,
  sol: R`<ol class="steps"><li>$(sI-A)^{-1}=\dfrac{1}{(s+1)(s+10)}\begin{bmatrix}s&-10\\1&s+11\end{bmatrix}$.</li><li>Element by element ($\frac{s}{(s+1)(s+10)}=\frac{-1/9}{s+1}+\frac{10/9}{s+10}$, etc.): $$\Phi(t)=\frac19\begin{bmatrix}10e^{-10t}-e^{-t}&10e^{-10t}-10e^{-t}\\e^{-t}-e^{-10t}&10e^{-t}-e^{-10t}\end{bmatrix}$$</li><li>Check $\Phi(0)=I$ ✓.</li></ol>`,
  ans: "Φ = (1/9)[10e^(−10t)−e^(−t), 10e^(−10t)−10e^(−t); e^(−t)−e^(−10t), 10e^(−t)−e^(−10t)]" });
add("order12", { src: "Resit 2025/26 Q3(c)", see: [1, 4, 5],
  q: R`$\dfrac{Y}{R}=\dfrac{10}{s^2+11ks+10}$. Agree or disagree, with engineering reasons: (i) raising $k$ drives the final step output close to zero; (ii) $k$ tunes the frequency response; (iii) to tame large overshoot, increase $k$; (iv) $k=0$ makes it unstable; (v) to speed the response up, increase $k$. [10 marks]`,
  hint: R`$\omega_n=\sqrt{10}$ is fixed; $k$ only sets $\zeta=\frac{11k}{2\sqrt{10}}$. DC gain $=10/10$.`,
  sol: R`<ol class="steps"><li>(i) <b>Disagree.</b> FVT: $y(\infty)=10/10=1$ for every $k\gt 0$. $k$ changes the transient, not the final value.</li><li>(ii) <b>Agree.</b> $k$ sets the damping ratio, which shapes the resonant peak and the bandwidth of $|H(j\omega)|$ ($\omega_n$ stays $\sqrt{10}$).</li><li>(iii) <b>Agree.</b> Larger $k$ → larger ζ → smaller overshoot ($\%OS$ depends only on ζ). At $k=2\sqrt{10}/11=0.575$ it's critically damped.</li><li>(iv) <b>Disagree</b> (strictly). $k=0$ gives poles $\pm j\sqrt{10}$: marginally stable, a sustained oscillation, not growing. It is no longer asymptotically stable, though.</li><li>(v) <b>Only up to a point.</b> Underdamped, $t_s=4/(\zeta\omega_n)=8/(11k)$ falls as $k$ rises. Beyond critical damping one pole moves toward the origin and the response gets slower. Speed is capped by the fixed $\omega_n$.</li></ol>`,
  ans: "(i) disagree (FV = 1); (ii) agree; (iii) agree; (iv) disagree: marginal, not unstable; (v) only until critical damping" });
add("ztrans", { src: "Resit 2025/26 Q4(a)", plab: "Q4(a)–(d)", see: [4, 5, 6],
  q: R`$y[n]+0.5y[n-1]+0.06y[n-2]=x[n-2]$. (a) Form $H(z)$. (b) Is it stable? (c) Form a companion-form state space. (d) Find the unit-step response. [25 marks]`,
  hint: R`$H=\dfrac{1}{z^2+0.5z+0.06}=\dfrac{1}{(z+0.2)(z+0.3)}$. Expand $Y/z=\dfrac{1}{(z+0.2)(z+0.3)(z-1)}$.`,
  sol: R`<ol class="steps"><li>(a) $H=\dfrac{z^{-2}}{1+0.5z^{-1}+0.06z^{-2}}=\dfrac{1}{z^2+0.5z+0.06}$.</li><li>(b) Poles −0.2, −0.3: inside the unit circle ⇒ stable.</li><li>(c) $\mathbf x[n+1]=\begin{bmatrix}0&1\\-0.06&-0.5\end{bmatrix}\mathbf x[n]+\begin{bmatrix}0\\1\end{bmatrix}x[n]$, $y=\begin{bmatrix}1&0\end{bmatrix}\mathbf x$.</li><li>(d) $\dfrac Yz=\dfrac{25/39}{z-1}+\dfrac{100/13}{z+0.3}-\dfrac{25/3}{z+0.2}$ ⇒ $$y[n]=\left[\tfrac{25}{39}+\tfrac{100}{13}(-0.3)^n-\tfrac{25}{3}(-0.2)^n\right]u[n]$$</li><li>Check: $y[0]=y[1]=0$, $y[2]=1$ (two-sample delay) ✓; final value $H(1)=1/1.56=0.641$ ✓.</li></ol>`,
  ans: "H = 1/(z²+0.5z+0.06); stable; y = 25/39 + (100/13)(−0.3)ⁿ − (25/3)(−0.2)ⁿ" });

/* ---------- each paper as a sittable set (Tutorials page) ---------- */
const P = (id, short, title, note, re, alias) => ({ id, short, title, note, paper: { re, alias: alias || {} },
  intro: "Every part of this paper, in exam order, each with a hint and a worked solution. The same questions also sit on their topic pages. Sit it under exam conditions: Q1 plus any two of Q2–Q4 in 2 hours." });
T.tutorials = (T.tutorials || []).concat([
  P("pp26", "26", "Exam 2025/26 (Semester 1)", "EEN1020 · Q1 + any two of Q2–Q4 · 2 h", R`(Exam 2025\/26|2025\/26 exam)`,
    { "Laplace Additional Q5 (2025/26 exam)": "Q1(d)", "Z Additional Q5 (2025/26 exam)": "Q4(a)" }),
  P("pp26r", "26R", "Resit 2025/26", "EEN1020 August resit", R`Resit 2025\/26`),
  P("pp24", "24", "Exam 2023/24", "EE207 · Semester 2", R`(Exam 2024|exam 2024)`),
  P("pp23", "23", "Exam 2022/23", "EE207 · Semester 2", R`(Exam 2023|exam 2023|\(2023 Q)`),
  P("pp23r", "23R", "Resit 2022/23", "EE207 August resit", R`Resit 2023`),
  P("pp22", "22", "Exam 2021/22", "EE207 · Semester 2", R`Exam 2022`),
  P("pp22r", "22R", "Resit 2021/22", "EE207 August resit", R`Resit 2022`)
]);
})();
