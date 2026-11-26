/* EEN1020 "Final Class Example": a mock paper built from old EE207 papers (2013/14 Q1 and Q2, 2012/13 Q3, 2019 Q4),
   with the lecturer's hand-written solutions. Also the 2026/27 exam-advice slides, and marking-scheme notes. */
(function(){
const R = String.raw;
STUDY.content.ssc = STUDY.content.ssc || { topics: [] };
const T = STUDY.content.ssc;
const PROV = "Follows the posted solution.";
const add = (id, q) => { const t = T.topics.find(x => x.id === id); if (t) t.questions.push(Object.assign({ prov: PROV }, q)); };

/* ---------------- Question 1 (EE207 2013/14 Q1) ---------------- */
add("statespace", { src: "Class Example Q1(a)", fig: "ssc_ce_q1", see: [1, 3],
  q: R`For the series RLC circuit shown ($V_s$, then R, L, C in series), construct a state-space representation with $v_C(t)$ and $i_L(t)$ as the states. The output is $v_C(t)$. [10 marks]`,
  hint: R`KVL round the loop: $V_s=Ri_L+L\dot i_L+v_C$. The same current flows through C: $C\dot v_C=i_L$.`,
  sol: R`<ol class="steps"><li>Capacitor: $\dot v_C=\frac1Ci_L$.</li><li>KVL: $L\dot i_L=-v_C-Ri_L+V_s$ ⇒ $\dot i_L=-\frac1Lv_C-\frac RLi_L+\frac1LV_s$.</li><li>$$\frac{d}{dt}\begin{bmatrix}v_C\\i_L\end{bmatrix}=\begin{bmatrix}0&\frac1C\\-\frac1L&-\frac RL\end{bmatrix}\begin{bmatrix}v_C\\i_L\end{bmatrix}+\begin{bmatrix}0\\\frac1L\end{bmatrix}V_s,\qquad y=\begin{bmatrix}1&0\end{bmatrix}\begin{bmatrix}v_C\\i_L\end{bmatrix}$$</li></ol>`,
  ans: "A = [0 1/C; −1/L −R/L], B = [0; 1/L], C = [1 0]" });
add("statespace", { src: "Class Example Q1(b)", see: [4],
  q: R`Form the transfer function relating $V_C(s)$ and $V_s(s)$ for the state space in Q1(a). [5 marks]`,
  hint: R`$H=C(sI-A)^{-1}B$. With $C=[1\ 0]$ and $B=[0\ \ \frac1L]^T$ you only need the (1,2) element of the inverse.`,
  sol: R`<ol class="steps"><li>$sI-A=\begin{bmatrix}s&-\frac1C\\\frac1L&s+\frac RL\end{bmatrix}$, $\det=s^2+\frac RLs+\frac1{LC}$.</li><li>$(sI-A)^{-1}=\dfrac1{\det}\begin{bmatrix}s+\frac RL&\frac1C\\-\frac1L&s\end{bmatrix}$, so $C(sI-A)^{-1}=\dfrac1{\det}\begin{bmatrix}s+\frac RL&\frac1C\end{bmatrix}$.</li><li>Times $B$: $$H(s)=\frac{V_C}{V_s}=\frac{1/LC}{s^2+\frac RLs+\frac1{LC}}$$</li></ol>`,
  ans: "(1/LC)/(s² + (R/L)s + 1/LC)" });
add("order12", { src: "Class Example Q1(c)", see: [1, 4, 3],
  q: R`With $R=2\ \Omega$, $C=0.25$ F and $L=1$ H, sketch the expected unit-step response after finding (i) the damped natural frequency, (ii) the period of oscillation, (iii) the time to peak, (iv) the percentage overshoot, (v) the initial and final values. [20 marks]`,
  hint: R`Substitute into Q1(b): $H=\dfrac{4}{s^2+2s+4}$. Match to $\dfrac{K\omega_n^2}{s^2+2\zeta\omega_ns+\omega_n^2}$ from the appendix.`,
  sol: R`<ol class="steps"><li>$H(s)=\dfrac{4}{s^2+2s+4}$: $\omega_n^2=4$ ⇒ $\omega_n=2$; $2\zeta\omega_n=2$ ⇒ $\zeta=0.5$.</li><li>(i) $\omega_d=\omega_n\sqrt{1-\zeta^2}=2\sqrt{0.75}=1.732$ rad/s.</li><li>(ii) $T=2\pi/\omega_d=3.63$ s.</li><li>(iii) $t_p=\pi/\omega_d=1.81$ s.</li><li>(iv) $\%OS=100e^{-\pi\zeta/\sqrt{1-\zeta^2}}=16.3\%$.</li><li>(v) $Y=\dfrac{4}{s(s^2+2s+4)}$. IVT: $\lim_{s\to\infty}sY=0$. FVT: $\lim_{s\to0}sY=1$.</li><li>Sketch: starts at 0, peaks at 1.163 at 1.81 s, oscillates with period 3.63 s and settles to 1.</li></ol>`,
  ans: "ω_d = 1.732 rad/s; T = 3.63 s; t_p = 1.81 s; 16.3%; 0 → 1" });
add("laplace", { src: "Class Example Q1(d)", see: [2],
  q: R`Determine an expression for the unit-step response of $H(s)=\dfrac{4}{s^2+2s+4}$ and compare it with the predictions in Q1(c). [15 marks]`,
  hint: R`$\dfrac{4}{s(s^2+2s+4)}=\dfrac As+\dfrac{Bs+C}{s^2+2s+4}$. Then write $s^2+2s+4=(s+1)^2+(\sqrt3)^2$.`,
  sol: R`<ol class="steps"><li>$4=A(s^2+2s+4)+(Bs+C)s$. $s=0$: $A=1$. Compare $s^2$: $B=-1$; $s$: $2+C=0$ ⇒ $C=-2$.</li><li>$Y=\dfrac1s-\dfrac{s+2}{(s+1)^2+3}=\dfrac1s-\dfrac{s+1}{(s+1)^2+3}-\dfrac1{\sqrt3}\cdot\dfrac{\sqrt3}{(s+1)^2+3}$.</li><li>$$y(t)=\left[1-e^{-t}\cos\sqrt3t-\frac1{\sqrt3}e^{-t}\sin\sqrt3t\right]u(t)$$</li><li>Compare: $y(0)=1-1-0=0$ and $y(\infty)=1$ ✓. The oscillation is at $\sqrt3=1.732$ rad/s $=\omega_d$ ✓, and the envelope $e^{-t}$ matches $\zeta\omega_n=1$ ✓.</li></ol>`,
  ans: "y = 1 − e^(−t)cos(√3t) − (1/√3)e^(−t)sin(√3t); matches 0 → 1, ω_d = √3" });

/* ---------------- Question 2 (EE207 2013/14 Q2) ---------------- */
add("translational", { src: "Class Example Q2(a)", plab: "Q2(a)–(c)", fig: "ssc_ce_q2", see: [0, 2],
  q: R`Mass $M$ sits on spring $K$ and damper $B$ to ground, with force $f(t)$ applied and displacement $x(t)$. (a) Write the differential equation. (b) Form $X(s)/F(s)$. (c) Give the range of $K$, $B$ and $M$ for stability. [8 marks]`,
  hint: R`Free-body diagram: $M\ddot x$, $B\dot x$ and $Kx$ all oppose $f$.`,
  sol: R`<ol class="steps"><li>(a) $M\ddot x+B\dot x+Kx=f(t)$.</li><li>(b) $(Ms^2+Bs+K)X=F$ ⇒ $$\frac{X}{F}=\frac{1}{Ms^2+Bs+K}=\frac{1/M}{s^2+\frac BMs+\frac KM}$$</li><li>(c) Characteristic polynomial $Ms^2+Bs+K$. A quadratic $as^2+bs+c$ has both roots in the left half-plane exactly when $a$, $b$, $c$ share a sign, so the system is stable for $M\gt 0$, $B\gt 0$, $K\gt 0$.</li></ol>`,
  ans: "Mẍ + Bẋ + Kx = f; X/F = 1/(Ms² + Bs + K); stable for M, B, K > 0" });
add("statespace", { src: "Class Example Q2(d)", see: [1, 3],
  q: R`For $M\ddot x+B\dot x+Kx=f(t)$, form a state-space representation with states $x$ and $\dot x$. [5 marks]`,
  hint: R`$x_1=x$, $x_2=\dot x$, so $\dot x_1=x_2$ and $\dot x_2=\ddot x$ comes from the ODE.`,
  sol: R`<ol class="steps"><li>$\dot x_1=x_2$.</li><li>$M\dot x_2+Bx_2+Kx_1=f$ ⇒ $\dot x_2=-\frac KMx_1-\frac BMx_2+\frac1Mf$.</li><li>$$\frac{d}{dt}\begin{bmatrix}x_1\\x_2\end{bmatrix}=\begin{bmatrix}0&1\\-\frac KM&-\frac BM\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}+\begin{bmatrix}0\\\frac1M\end{bmatrix}f,\qquad y=\begin{bmatrix}1&0\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}$$</li></ol>`,
  ans: "A = [0 1; −K/M −B/M], B = [0; 1/M], C = [1 0]" });
add("ssresp", { src: "Class Example Q2(e)", plab: "Q2(e)–(f)", see: [3, 2],
  q: R`With $M=2$ kg, $B=6$ N s/m and $K=4$ N/m: (e) form the state-transition matrix using the modal matrix. (f) Find $x(t)$ with no input force and initial state $[1\ \ -1]^T$. [12 marks]`,
  hint: R`$A=\begin{bmatrix}0&1\\-2&-3\end{bmatrix}$. Eigenvectors from the first row of $\lambda I-A$: $v=[\lambda+3\ \ -2]^T$ (cover-up).`,
  sol: R`<ol class="steps"><li>$\det(\lambda I-A)=\lambda^2+3\lambda+2=(\lambda+1)(\lambda+2)$ ⇒ $\lambda=-1,-2$.</li><li>Eigenvectors: $v_{-1}=\begin{bmatrix}2\\-2\end{bmatrix}$, $v_{-2}=\begin{bmatrix}1\\-2\end{bmatrix}$. $M=\begin{bmatrix}2&1\\-2&-2\end{bmatrix}$, $M^{-1}=\begin{bmatrix}1&0.5\\-1&-1\end{bmatrix}$. Keep the column order the same as the order of $\lambda$ in $\Lambda$.</li><li>$$\Phi(t)=Me^{\Lambda t}M^{-1}=\begin{bmatrix}2e^{-t}-e^{-2t}&e^{-t}-e^{-2t}\\-2e^{-t}+2e^{-2t}&-e^{-t}+2e^{-2t}\end{bmatrix}$$ Check $\Phi(0)=I$ ✓.</li><li>(f) Zero-input: $x(t)=C\Phi(t)x(0)=(2e^{-t}-e^{-2t})-(e^{-t}-e^{-2t})=e^{-t}$.</li><li>Only the $\lambda=-1$ mode appears because $[1\ -1]^T$ is that mode's eigenvector.</li></ol>`,
  ans: "Φ = [2e^(−t)−e^(−2t), e^(−t)−e^(−2t); −2e^(−t)+2e^(−2t), −e^(−t)+2e^(−2t)]; x(t) = e^(−t)",
  prov: "Follows the posted solution. Same system and numbers as Exam 2025/26 Q2(d)–(e)." });

/* ---------------- Question 3 (EE207 2012/13 Q3) ---------------- */
add("ztrans", { src: "Class Example Q3(a)", plab: "Q3(a)–(b)", see: [4, 5],
  q: R`$y[n]=-0.75y[n-1]-0.125y[n-2]+x[n-2]$. (a) Form a z-transfer function. (b) Is the system stable? [10 marks]`,
  hint: R`Each delay is a factor $z^{-1}$. Multiply top and bottom by $z^2$, then find the poles.`,
  sol: R`<ol class="steps"><li>(a) $Y(1+0.75z^{-1}+0.125z^{-2})=z^{-2}X$ ⇒ $$H(z)=\frac{z^{-2}}{1+0.75z^{-1}+0.125z^{-2}}=\frac{1}{z^2+0.75z+0.125}$$</li><li>(b) $z^2+0.75z+0.125=(z+0.25)(z+0.5)$ ⇒ poles $-0.25$, $-0.5$.</li><li>$|p|\lt 1$ for both, inside the unit circle ⇒ stable.</li></ol>`,
  ans: "H = 1/(z² + 0.75z + 0.125); poles −0.25, −0.5 ⇒ stable" });
add("ssode", { src: "Class Example Q3(c)", see: [1, 2],
  q: R`Form a companion-form state space for $y[n]=-0.75y[n-1]-0.125y[n-2]+x[n-2]$. [8 marks]`,
  hint: R`Shift forward two samples: $y[n+2]+0.75y[n+1]+0.125y[n]=x[n]$. Take $v_1[n]=y[n]$, $v_2[n]=y[n+1]$.`,
  sol: R`<ol class="steps"><li>$v_1[n+1]=v_2[n]$.</li><li>$v_2[n+1]=y[n+2]=-0.125v_1[n]-0.75v_2[n]+x[n]$.</li><li>$$\begin{bmatrix}v_1[n+1]\\v_2[n+1]\end{bmatrix}=\begin{bmatrix}0&1\\-0.125&-0.75\end{bmatrix}\begin{bmatrix}v_1[n]\\v_2[n]\end{bmatrix}+\begin{bmatrix}0\\1\end{bmatrix}x[n],\qquad y[n]=\begin{bmatrix}1&0\end{bmatrix}\begin{bmatrix}v_1[n]\\v_2[n]\end{bmatrix}$$</li><li>You can read the bottom row straight off the denominator $z^2+0.75z+0.125$ (negated, in reverse order).</li></ol>`,
  ans: "A = [0 1; −0.125 −0.75], B = [0; 1], C = [1 0]",
  prov: "Follows the posted solution for A and B. The posted output line has a slip (it is written in terms of the states at n+1); with these states the output is y[n] = v₁[n], as in the 2025/26 marking scheme." });
add("ztrans", { src: "Class Example Q3(d)", see: [5, 6],
  q: R`Determine the response of $H(z)=\dfrac{1}{z^2+0.75z+0.125}$ to the unit step $x[n]=u[n]$. [7 marks]`,
  hint: R`$X=\dfrac{z}{z-1}$. Expand $\dfrac{Y}{z}=\dfrac{1}{(z-1)(z+0.25)(z+0.5)}$ by cover-up.`,
  sol: R`<ol class="steps"><li>$\dfrac{Y}{z}=\dfrac{A}{z-1}+\dfrac{B}{z+0.25}+\dfrac{C}{z+0.5}$.</li><li>$z=1$: $A=\dfrac1{(1.25)(1.5)}=\dfrac8{15}$. $z=-0.25$: $B=\dfrac1{(-1.25)(0.25)}=-3.2$. $z=-0.5$: $C=\dfrac1{(-1.5)(-0.25)}=\dfrac83$.</li><li>$$y[n]=\left[\tfrac8{15}-3.2(-0.25)^n+\tfrac83(-0.5)^n\right]u[n]$$</li><li>Check: $y[0]=y[1]=0$, $y[2]=1$ (two-sample delay) ✓; final value $H(1)=1/1.875=8/15$ ✓.</li></ol>`,
  ans: "y[n] = 8/15 − 3.2(−0.25)ⁿ + (8/3)(−0.5)ⁿ" });

/* ---------------- Question 4 (EE207 2019 Q4) ---------------- */
add("bdreduce", { src: "Class Example Q4(a)", plab: "Q4(a)–(c)", fig: "ssc_ce_q4", see: [2, 3, 5],
  q: R`For the block diagram shown: (a) simplify it and find $Y(s)/X(s)$. (b) For which $K$ is it asymptotically stable? (c) For which $K$ is the response oscillatory? [13 marks]`,
  hint: R`Call the signal after the gain 3 $u$. The inner unity loop round $\frac1{s-2}$ is $\frac1{s-1}$. The upper path takes $u$ straight through $\frac1{s+2}$ and is <b>subtracted</b> at the output summer.`,
  sol: R`<ol class="steps"><li>Inner loop: $\dfrac{\frac1{s-2}}{1+\frac1{s-2}}=\dfrac1{s-1}$.</li><li>Parallel paths: $\dfrac1{s-1}-\dfrac1{s+2}=\dfrac{3}{(s-1)(s+2)}$. With the gain 3, the forward path is $\dfrac{9}{s^2+s-2}$.</li><li>Feedback $K$: $$\frac YX=\frac{\frac{9}{s^2+s-2}}{1+\frac{9K}{s^2+s-2}}=\frac{9}{s^2+s+(9K-2)}$$</li><li>(b) Stable ⇔ $9K-2\gt 0$ ⇒ $K\gt \frac29$.</li><li>(c) Oscillatory ⇔ complex poles: $1-4(9K-2)\lt 0$ ⇒ $K\gt \frac14$. This also satisfies (b).</li></ol>`,
  ans: "9/(s² + s + 9K − 2); stable K > 2/9; oscillatory K > 1/4" });
add("sstrans", { src: "Class Example Q4(d)", see: [0, 3],
  q: R`For one value of $K$ the impulse response is $h(t)=\dfrac{9}{\sqrt{6.75}}e^{-0.5t}\sin(\sqrt{6.75}\,t)\,u(t)$. (i) Find the transfer function. (ii) Find $K$. (iii) Give the steady-state gain. (iv) Form the controllable canonical form and write the unit-impulse response in terms of its matrices. [12 marks]`,
  hint: R`$\mathcal L\{e^{-at}\sin\omega t\}=\dfrac{\omega}{(s+a)^2+\omega^2}$, here $a=0.5$, $\omega^2=6.75$. Then match $s^2+s+(9K-2)$.`,
  sol: R`<ol class="steps"><li>(i) $H(s)=\dfrac9{\sqrt{6.75}}\cdot\dfrac{\sqrt{6.75}}{(s+0.5)^2+6.75}=\dfrac{9}{s^2+s+7}$.</li><li>(ii) $9K-2=7$ ⇒ $K=1$.</li><li>(iii) $H(0)=9/7=1.29$.</li><li>(iv) $A=\begin{bmatrix}0&1\\-7&-1\end{bmatrix}$, $B=\begin{bmatrix}0\\1\end{bmatrix}$, $C=\begin{bmatrix}9&0\end{bmatrix}$, $D=0$. $$h(t)=Ce^{At}B=\begin{bmatrix}9&0\end{bmatrix}e^{\begin{bmatrix}0&1\\-7&-1\end{bmatrix}t}\begin{bmatrix}0\\1\end{bmatrix}$$</li></ol>`,
  ans: "H = 9/(s² + s + 7); K = 1; gain 9/7; h = C e^(At) B with A = [0 1; −7 −1], B = [0;1], C = [9 0]",
  prov: "Follows the posted solution. The posted CCF writes the 9 in both B and C, which would give 81 on top; the standard CCF (as in the 2025/26 marking scheme) puts it in C only." });

/* ---------------- marking-scheme notes ---------------- */
const o12 = T.topics.find(t => t.id === "order12");
if (o12) o12.traps.push(
  "The period of oscillation is 2π/ω_d, not 2π/ω_n: the 2025/26 resit marking scheme gives no marks for T found from ω_n.",
  "In the IVT and FVT, show the step's 1/s inside the limit: the marking scheme docks a mark if it isn't clearly there.");
const lin = T.topics.find(t => t.id === "linearise");
if (lin) lin.lectures += ". Not in the 2026/27 exam-advice topic list";

/* ---------------- the class example as a sittable paper ---------------- */
T.tutorials = (T.tutorials || []).concat([
  { id: "ce", short: "CE", title: "Final Class Example (mock paper)", note: "Hand-written solutions posted",
    paper: { re: R`Class Example` },
    intro: R`Mock paper from the last class, built from old EE207 questions; Q1 and Q2 match the 2025/26 exam. Lecturer's 2026/27 advice: Q1 (50) is compulsory and has no digital systems; do any two of Q2–Q4 (best two count); Q4 is digital and "probably the easiest". Questions are old EE207 ones with new numbers, but circuits, mechanical systems and block diagrams can be any system. No zero-state or total state-space response, and companion form is the only canonical form asked.` }
]);
})();
