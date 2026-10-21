/* EEN1020 — state-space representations (Lecture 3, Section 3) and the state-space modified exam questions */
(function(){
const R = String.raw;
const T = STUDY.content.ssc = STUDY.content.ssc || { topics: [] };

T.topics.push({
id: "statespace", part: "State space", title: "State-Space Models & Conversion to a Transfer Function",
lectures: "Lecture 3 – Introduction to State-Space Representations", status: "lectured",
summary: "Why state space, choosing state variables (one per energy store), building A, B, C, D for a circuit, the general form and matrix sizes, and converting to a transfer function with G(s) = C(sI − A)⁻¹B + D.",
theory: R`
<h3>0. Why move beyond transfer functions</h3>
<div class="tbl"><table class="data">
<tr><th>Transfer functions: good at</th><th>Transfer functions: weak at</th></tr>
<tr><td>One compact algebraic equation $G(s)=Y(s)/U(s)$</td><td>Assume zero initial conditions</td></tr>
<tr><td>Calculus becomes algebra</td><td>Hide internal variables (inductor currents, internal velocities)</td></tr>
<tr><td>Poles give stability, overshoot, settling time directly</td><td>MIMO needs a whole matrix of transfer functions</td></tr>
<tr><td>Block-diagram algebra; Bode, Nyquist, root locus</td><td>Collapsing KVL/KCL or force balances into one ODE is tedious and error-prone</td></tr>
<tr><td>Classical SISO design (e.g. PID)</td><td>Only LTI systems; no state-feedback methods</td></tr>
</table></div>
<p><b>State space</b> replaces one high-order ODE with a set of coupled <b>first-order</b> ODEs in matrix form, written in terms of internal <b>state variables</b> $x$. It keeps initial conditions, keeps the internal physics visible, handles MIMO with one set of matrices, and is the form computers (MATLAB/Simulink) and modern control (state feedback, optimal control) use.</p>

<h3>1. Choosing the state variables</h3>
<div class="callout key"><b>Number of states = number of independent energy-storage elements.</b> One capacitor + one inductor = 2 states (a second-order system).</div>
<p>Use the natural physical states: capacitor voltage $v_C$ (stores $\tfrac12Cv_C^2$) and inductor current $i_L$ (stores $\tfrac12Li_L^2$). For mechanical systems: displacement and velocity of each mass. The goal is to write each derivative ($\dot v_C$, $\dot i_L$) purely in terms of the states and the input.</p>

<h3>2. Worked circuit: R₁, C to ground, L in series, R₂ as the load</h3>
<p>Input $v_i$, output $v_o$ across $R_2$, states $x_1 = v_C$, $x_2 = i_L$.</p>
<ol class="steps">
<li><b>KCL at the capacitor node</b>: $i_C = C\dot v_C = i_{R1} - i_L = \dfrac{v_i - v_C}{R_1} - i_L$, so $\dot v_C = -\dfrac{1}{R_1C}v_C - \dfrac1C i_L + \dfrac{1}{R_1C}v_i$.</li>
<li><b>KVL round the inductor loop</b>: $L\dot i_L = v_C - v_o = v_C - R_2 i_L$, so $\dot i_L = \dfrac1L v_C - \dfrac{R_2}{L} i_L$.</li>
<li><b>Output</b>: $y = v_o = R_2 i_L$.</li>
</ol>
$$\begin{bmatrix}\dot v_C\\ \dot i_L\end{bmatrix} = \underbrace{\begin{bmatrix}-\frac{1}{R_1C} & -\frac1C\\ \frac1L & -\frac{R_2}{L}\end{bmatrix}}_{A_{2\times2}}\begin{bmatrix}v_C\\ i_L\end{bmatrix} + \underbrace{\begin{bmatrix}\frac{1}{R_1C}\\ 0\end{bmatrix}}_{B_{2\times1}}v_i,\qquad y = \underbrace{\begin{bmatrix}0 & R_2\end{bmatrix}}_{C_{1\times2}}\begin{bmatrix}v_C\\ i_L\end{bmatrix} + \underbrace{[0]}_{D}v_i$$
<p>Writing $\dot x$ on the left is the more common format than $\frac{d}{dt}x$; they mean the same thing.</p>

<h3>3. Definitions and the general form</h3>
<ul>
<li><b>State</b>: the smallest set of variables whose values at $t_0$, with the input for $t \ge t_0$, completely determine the behaviour for all $t \ge t_0$.</li>
<li><b>State vector</b> $\mathbf x = [x_1\ x_2\ \cdots\ x_n]^T$; <b>state space</b> is the $n$-dimensional space it moves in.</li>
<li><b>Output equation</b>: outputs as linear combinations of states and inputs.</li>
</ul>
$$\dot{\mathbf x}(t) = \mathbf A\mathbf x(t) + \mathbf B\mathbf u(t),\quad \mathbf x(0)=\mathbf x_0,\qquad \mathbf y(t) = \mathbf C\mathbf x(t) + \mathbf D\mathbf u(t)$$
<div class="tbl"><table class="data">
<tr><th>Symbol</th><th>Size</th><th>Name</th><th>Role</th></tr>
<tr><td>$\mathbf x$</td><td>$n\times1$</td><td>State vector</td><td>The $n$ internal states</td></tr>
<tr><td>$\mathbf u$</td><td>$m\times1$</td><td>Input vector</td><td>The $m$ control inputs</td></tr>
<tr><td>$\mathbf y$</td><td>$p\times1$</td><td>Output vector</td><td>The $p$ measured outputs</td></tr>
<tr><td>$\mathbf A$</td><td>$n\times n$</td><td>State matrix</td><td>Internal dynamics (always square)</td></tr>
<tr><td>$\mathbf B$</td><td>$n\times m$</td><td>Input matrix</td><td>Couples inputs into the state derivatives</td></tr>
<tr><td>$\mathbf C$</td><td>$p\times n$</td><td>Output matrix</td><td>Maps states to outputs</td></tr>
<tr><td>$\mathbf D$</td><td>$p\times m$</td><td>Feedforward matrix</td><td>Direct input-to-output path; usually 0 in physical systems</td></tr>
</table></div>

<h3>4. State space → transfer function</h3>
<ol class="steps">
<li>Laplace transform with $x(0)=0$: $sX(s) = AX(s) + BU(s)$, $Y(s) = CX(s) + DU(s)$.</li>
<li>Rearrange: $(sI - A)X(s) = BU(s) \Rightarrow X(s) = (sI-A)^{-1}BU(s)$.</li>
<li>Substitute into the output equation.</li>
</ol>
<div class="callout key">$$G(s) = \frac{Y(s)}{U(s)} = C(sI-A)^{-1}B + D$$</div>
<p>For a 2×2 matrix: $\begin{bmatrix}a&b\\c&d\end{bmatrix}^{-1} = \dfrac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$. Work in this order: $sI-A$ → $\det(sI-A)$ → adjugate → multiply by $C$ on the left → multiply by $B$ on the right. The denominator of $G(s)$ is $\det(sI-A)$, so <b>the poles are the eigenvalues of A</b>.</p>

<h3>5. Not unique vs unique</h3>
<p>The state-space model is an <b>internal</b> description: choose different state variables and you get different $A, B, C, D$ for the same system. The transfer function is the <b>external</b> input-output relationship and is unique. The lecture's two examples have different matrices but both give $\dfrac{2}{s^2+4s+3}$. Standard structured choices are called <b>canonical forms</b> (see the next topic).</p>`,
formulas: [
 {name:"State equation", tex:R`\dot{\mathbf x} = \mathbf A\mathbf x + \mathbf B\mathbf u`},
 {name:"Output equation", tex:R`\mathbf y = \mathbf C\mathbf x + \mathbf D\mathbf u`},
 {name:"Sizes", tex:R`A_{n\times n},\ B_{n\times m},\ C_{p\times n},\ D_{p\times m}`},
 {name:"SS → TF", tex:R`G(s) = C(sI-A)^{-1}B + D`},
 {name:"2×2 inverse", tex:R`\begin{bmatrix}a&b\\c&d\end{bmatrix}^{-1} = \frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}`},
 {name:"Number of states", tex:R`n = \text{number of independent energy stores}`}
],
questions: [
 {src:"Lecture 3 example", fig:"ssc_sscirc", see:[1,2], q:R`For the circuit shown (input $v_i$, output $v_o$ across $R_2$), choose state variables and derive the full state-space model.`,
  hint:"Two energy stores → two states: v_C and i_L. KCL at the capacitor node, KVL round the inductor loop.",
  sol:R`<p>States $x_1=v_C$, $x_2=i_L$.</p>
  <p>KCL: $C\dot v_C = \dfrac{v_i - v_C}{R_1} - i_L$. KVL: $L\dot i_L = v_C - R_2 i_L$. Output $y = R_2 i_L$.</p>
  $$A = \begin{bmatrix}-\frac{1}{R_1C} & -\frac1C\\ \frac1L & -\frac{R_2}{L}\end{bmatrix},\ B = \begin{bmatrix}\frac{1}{R_1C}\\0\end{bmatrix},\ C = \begin{bmatrix}0 & R_2\end{bmatrix},\ D = 0$$`,
  ans:"A = [−1/R₁C, −1/C; 1/L, −R₂/L], B = [1/R₁C; 0], C = [0 R₂], D = 0", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 DIY example", fig:"ssc_ssdiy", see:[1,3], q:R`Derive the state-space representation for the circuit shown: $V_{in}$ feeds $R_1$; inductor $L_1$ goes from the node to ground; $R_2$ in series with $L_2$ also goes from the node to ground. Input $V_{in}(t)$, output $y = i_{L2}$.`,
  hint:"States i_L1 and i_L2. The current through R₁ is i_L1 + i_L2. Both inductor branches share the node voltage.",
  sol:R`<p>Node voltage $v = V_{in} - R_1(i_{L1}+i_{L2})$.</p>
  <p>$L_1$: $L_1\dot i_{L1} = v$ ⇒ $\dot i_{L1} = -\dfrac{R_1}{L_1}i_{L1} - \dfrac{R_1}{L_1}i_{L2} + \dfrac{1}{L_1}V_{in}$.</p>
  <p>$R_2$–$L_2$ branch: $L_2\dot i_{L2} = v - R_2 i_{L2}$ ⇒ $\dot i_{L2} = -\dfrac{R_1}{L_2}i_{L1} - \dfrac{R_1+R_2}{L_2}i_{L2} + \dfrac{1}{L_2}V_{in}$.</p>
  $$\frac{d}{dt}\begin{bmatrix}i_{L1}\\ i_{L2}\end{bmatrix} = \begin{bmatrix}-\frac{R_1}{L_1} & -\frac{R_1}{L_1}\\ -\frac{R_1}{L_2} & -\frac{R_1+R_2}{L_2}\end{bmatrix}\begin{bmatrix}i_{L1}\\ i_{L2}\end{bmatrix} + \begin{bmatrix}\frac{1}{L_1}\\ \frac{1}{L_2}\end{bmatrix}V_{in},\qquad y = \begin{bmatrix}0 & 1\end{bmatrix}\begin{bmatrix}i_{L1}\\ i_{L2}\end{bmatrix} + [0]V_{in}$$
  <p>$R_1$ appears in every entry of $A$ because it carries $i_{L1}+i_{L2}$ and couples the two inductors.</p>`,
  ans:"A = [−R₁/L₁, −R₁/L₁; −R₁/L₂, −(R₁+R₂)/L₂], B = [1/L₁; 1/L₂], C = [0 1], D = 0", prov:"Follows the indicative answer in Lecture 3."},
 {src:"Lecture 3 worked example 1", see:[4], q:R`Convert to a transfer function: $A = \begin{bmatrix}0&1\\-3&-4\end{bmatrix}$, $B = \begin{bmatrix}0\\2\end{bmatrix}$, $C = \begin{bmatrix}1&0\end{bmatrix}$, input $f(t)$.`,
  hint:"D = 0, so Y/F = C(sI − A)⁻¹B.",
  sol:R`<p>$sI - A = \begin{bmatrix}s & -1\\ 3 & s+4\end{bmatrix}$, $\det = s(s+4) + 3 = s^2+4s+3$.</p>
  <p>$(sI-A)^{-1} = \dfrac{1}{\det}\begin{bmatrix}s+4 & 1\\ -3 & s\end{bmatrix}$.</p>
  <p>$C(sI-A)^{-1} = \dfrac{1}{\det}\begin{bmatrix}s+4 & 1\end{bmatrix}$; times $B$: $\dfrac{1}{\det}(0 + 2) = \dfrac{2}{s^2+4s+3}$.</p>`,
  ans:"2/(s² + 4s + 3)", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 worked example 2", see:[4,5], q:R`Convert to a transfer function: $A = \begin{bmatrix}-3&1\\0&-1\end{bmatrix}$, $B = \begin{bmatrix}0\\1\end{bmatrix}$, $C = \begin{bmatrix}2&0\end{bmatrix}$. (The question slide prints the bottom-right entry of $A$ as 1; the slide's own working uses −1, which is what's used here.)`,
  hint:"A is upper triangular, so det(sI − A) is the product of the diagonal.",
  sol:R`<p>$sI - A = \begin{bmatrix}s+3 & -1\\ 0 & s+1\end{bmatrix}$, $\det = (s+3)(s+1) = s^2+4s+3$.</p>
  <p>$(sI-A)^{-1} = \dfrac{1}{\det}\begin{bmatrix}s+1 & 1\\ 0 & s+3\end{bmatrix}$; $C(sI-A)^{-1} = \dfrac{1}{\det}\begin{bmatrix}2(s+1) & 2\end{bmatrix}$; times $B$: $\dfrac{2}{s^2+4s+3}$.</p>
  <p>Same transfer function as example 1 from different matrices: state space is not unique, the transfer function is. (With the printed +1 entry you would get $2/((s+3)(s-1))$, an unstable system, so the −1 is clearly intended.)</p>`,
  ans:"2/(s² + 4s + 3)", prov:"From the worked example in Lecture 3."},
 {src:"State-Space Sheet Q1 (2021 variation Q1)", fig:"ssc_ss21", see:[4], q:R`A mass $M$ is tied to a wall by spring $K$ and damper $B$ and pushed by $f(t)$; $y$ is its displacement. Its state space is $\dot x = \begin{bmatrix}0&1\\-2&-3\end{bmatrix}x + \begin{bmatrix}0\\0.5\end{bmatrix}f(t)$, $y = \begin{bmatrix}1&0\end{bmatrix}x$. Derive the generic state space and hence find $K$, $B$ and $M$. Then use $C(sI-A)^{-1}B$ to find the transfer function.`,
  hint:"M ÿ + B ẏ + K y = f. Take x₁ = y, x₂ = ẏ and match entries.",
  sol:R`<p>$M\ddot y + B\dot y + Ky = f$. With $x_1=y$, $x_2=\dot y$: $\dot x_1 = x_2$, $\dot x_2 = -\dfrac KM x_1 - \dfrac BM x_2 + \dfrac1M f$.</p>
  $$A = \begin{bmatrix}0&1\\-\frac KM&-\frac BM\end{bmatrix},\ B_{in} = \begin{bmatrix}0\\ \frac1M\end{bmatrix},\ C=\begin{bmatrix}1&0\end{bmatrix}$$
  <p>Match: $1/M = 0.5 \Rightarrow M = 2$; $B/M = 3 \Rightarrow B = 6$; $K/M = 2 \Rightarrow K = 4$.</p>
  <p>$sI-A = \begin{bmatrix}s&-1\\2&s+3\end{bmatrix}$, $\det = s^2+3s+2$; $C(sI-A)^{-1} = \dfrac{1}{\det}\begin{bmatrix}s+3 & 1\end{bmatrix}$; times $B_{in}$: $\dfrac{0.5}{s^2+3s+2}$.</p>`,
  ans:"M = 2, B = 6, K = 4; Y/F = 0.5/(s² + 3s + 2)", prov:"Follows the posted solution."},
 {src:"State-Space Sheet Q4 (exam 2024 Q1(a))", see:[4], q:R`$\dot x = \begin{bmatrix}0&1\\-5&-6\end{bmatrix}x + \begin{bmatrix}0\\5\end{bmatrix}v_{in}$, $v_o = \begin{bmatrix}1&0\end{bmatrix}x$ for an RLC circuit. (i) Show that $\dfrac{V_o}{V_{in}} = \dfrac{5}{s^2+6s+5}$. (ii) Find the poles. (iii) Based on the poles, sketch the unit-step response. [10 marks]`,
  hint:"Poles are the roots of det(sI − A). Real distinct poles mean no oscillation.",
  sol:R`<p>(i) $sI-A = \begin{bmatrix}s&-1\\5&s+6\end{bmatrix}$, $\det = s^2+6s+5$. $C(sI-A)^{-1} = \dfrac{1}{\det}\begin{bmatrix}s+6&1\end{bmatrix}$; times $B$: $\dfrac{5}{s^2+6s+5}$.</p>
  <p>(ii) $(s+1)(s+5)=0$: $s = -1, -5$.</p>
  <p>(iii) Both poles real and negative: stable, overdamped, no oscillation or overshoot. DC gain $5/5 = 1$, so the step response rises smoothly from 0 to 1, dominated by the slow pole at −1: $y(t) = 1 - 1.25e^{-t} + 0.25e^{-5t}$.</p>`,
  ans:"5/(s²+6s+5); poles −1, −5; smooth overdamped rise to 1", prov:"Follows the posted solution (the step-response expression was worked by Claude to support the sketch)."}
],
traps: [
 "Number of states = number of independent energy stores, not the number of components.",
 "Matrix order matters: C(sI − A)⁻¹B, with C on the left and B on the right.",
 "The 2×2 inverse swaps the diagonal and negates the off-diagonal; don't forget the 1/det.",
 "In sI − A, every entry of A changes sign, including the off-diagonal ones.",
 "Different A, B, C, D can describe the same system. Check by comparing transfer functions, not matrices.",
 "The output equation y = Cx + Du is algebraic: no derivatives."
]
});

T.topics.push({
id: "sstrans", part: "State space", title: "Canonical Forms, Parallel Form & the State-Transition Matrix",
lectures: "State-Space Modified Exam Questions (2021 variation, 2023 Q1, 2024 Q1) and their posted solutions; not yet lectured", status: "partial",
summary: "What the posted exam solutions use beyond Lecture 3: the controller canonical form, the parallel (diagonal) form from partial fractions, the state-transition matrix Φ(t) = e^{At} via eigenvalues and eigenvectors, and using Φ for free and impulse responses.",
theory: R`
<h3>0. Controller canonical form (CCF)</h3>
<p>For $\dfrac{Y(s)}{U(s)} = \dfrac{K}{s^2 + a_1 s + a_0}$, take $x_1 = y$, $x_2 = \dot y$:</p>
$$\dot x = \begin{bmatrix}0&1\\-a_0&-a_1\end{bmatrix}x + \begin{bmatrix}0\\K\end{bmatrix}u,\qquad y = \begin{bmatrix}1&0\end{bmatrix}x$$
<p>The bottom row of $A$ is the denominator coefficients, negated, <b>constant term first</b>. Read $a_0$ and $a_1$ straight off the matrix, or compare $\det(sI-A) = s^2 + a_1 s + a_0$. (Putting the gain in $C$ instead, $B=[0\ 1]^T$, $C=[K\ 0]$, gives the same transfer function.)</p>

<h3>1. Parallel (diagonal) form</h3>
<p>Split the transfer function into partial fractions with distinct real poles $p_1, p_2$:</p>
$$\frac{Y}{U} = \frac{c_1}{s-p_1} + \frac{c_2}{s-p_2}\ \Rightarrow\ \dot x = \begin{bmatrix}p_1&0\\0&p_2\end{bmatrix}x + \begin{bmatrix}1\\1\end{bmatrix}u,\quad y = \begin{bmatrix}c_1&c_2\end{bmatrix}x$$
<p>Each state is its own first-order system $\dot x_i = p_i x_i + u$: the states are <b>decoupled</b>. Block diagram: $u$ feeds two branches; each branch is a summing junction → $\frac1s$ → $x_i$, with $x_i$ fed back through gain $p_i$ (shown as $-|p_i|$ into the junction); the outputs are scaled by $c_1$, $c_2$ and summed to give $y$.</p>
<p><b>Why it helps:</b> $A$ is diagonal, so $e^{At}$ is just $e^{p_i t}$ on the diagonal. No eigenvectors needed; each state's time response can be written down directly.</p>

<h3>2. State-transition matrix</h3>
<p>The solution of $\dot x = Ax + Bu$ is</p>
$$x(t) = \Phi(t)x(0) + \int_0^t \Phi(t-\tau)Bu(\tau)\,d\tau,\qquad \Phi(t) = e^{At}$$
<p>For non-diagonal $A$, diagonalise:</p>
<ol class="steps">
<li><b>Eigenvalues</b>: solve $\det(\lambda I - A) = 0$ (same polynomial as the transfer-function denominator).</li>
<li><b>Eigenvectors</b>: for each $\lambda_i$, solve $(\lambda_i I - A)v_i = 0$. For a 2×2, a quick vector is the adjugate column trick: take a row $[a\ \ b]$ of $\lambda I - A$ and use $v = [-b\ \ a]^T$ (scale freely).</li>
<li>$M = [v_1\ v_2]$, $\Lambda = \text{diag}(\lambda_1,\lambda_2)$, $e^{\Lambda t} = \text{diag}(e^{\lambda_1 t}, e^{\lambda_2 t})$.</li>
<li>$\Phi(t) = Me^{\Lambda t}M^{-1}$.</li>
</ol>
<p>Check: $\Phi(0) = I$. Any scaling of the eigenvectors gives the same $\Phi$.</p>

<h3>3. Using Φ for responses</h3>
<div class="tbl"><table class="data">
<tr><th>Case</th><th>Output</th></tr>
<tr><td>No input, initial state $x_0$</td><td>$y(t) = C\Phi(t)x_0$</td></tr>
<tr><td>Unit impulse, zero initial state</td><td>$y(t) = C\Phi(t)B$ (the sifting property collapses the integral)</td></tr>
</table></div>`,
formulas: [
 {name:"CCF (2nd order)", tex:R`A=\begin{bmatrix}0&1\\-a_0&-a_1\end{bmatrix},\ B=\begin{bmatrix}0\\K\end{bmatrix},\ C=\begin{bmatrix}1&0\end{bmatrix}`},
 {name:"Parallel form", tex:R`A=\text{diag}(p_1,p_2),\ B=\begin{bmatrix}1\\1\end{bmatrix},\ C=\begin{bmatrix}c_1&c_2\end{bmatrix}`},
 {name:"State solution", tex:R`x(t) = \Phi(t)x(0) + \int_0^t\Phi(t-\tau)Bu(\tau)\,d\tau`},
 {name:"State-transition matrix", tex:R`\Phi(t) = e^{At} = Me^{\Lambda t}M^{-1}`},
 {name:"Free response", tex:R`y(t) = C\Phi(t)x_0`},
 {name:"Impulse response", tex:R`h(t) = C\Phi(t)B`}
],
questions: [
 {src:"State-Space Sheet Q2 (2021 variation Q2)", fig:"ssc_ss21", see:[0], q:R`The same mass–spring–damper has $\dfrac{Y(s)}{F(s)} = \dfrac{0.5}{s^2+3s+2}$. By deriving the transfer function, find $K$, $B$ and $M$, then write the controller canonical state-space representation. (Start from scratch, without using Q1.)`,
  hint:"Laplace of M ÿ + B ẏ + K y = f, then divide through by M.",
  sol:R`<p>$(Ms^2 + Bs + K)Y = F$ ⇒ $\dfrac YF = \dfrac{1/M}{s^2 + \frac BM s + \frac KM}$.</p>
  <p>$1/M = 0.5$, $B/M = 3$, $K/M = 2$ ⇒ $M = 2$, $B = 6$, $K = 4$.</p>
  <p>CCF with $a_1 = 3$, $a_0 = 2$, gain 0.5:</p>
  $$\dot x = \begin{bmatrix}0&1\\-2&-3\end{bmatrix}x + \begin{bmatrix}0\\0.5\end{bmatrix}f,\qquad y = \begin{bmatrix}1&0\end{bmatrix}x$$
  <p>Note: the posted solution's final matrix has the bottom row as $[-3\ \ -2]$. That gives $0.5/(s^2+2s+3)$, not the given transfer function; the correct row is $[-a_0\ \ -a_1] = [-2\ \ -3]$, matching Q1 and the matrix used in Q3.</p>`,
  ans:"M = 2, B = 6, K = 4; A = [0 1; −2 −3], B = [0; 0.5], C = [1 0]", prov:"Follows the posted solution, with its swapped bottom row of A corrected (checked by C(sI − A)⁻¹B)."},
 {src:"State-Space Sheet Q3 (2021 variation Q3)", see:[2,3], q:R`For the CCF $A = \begin{bmatrix}0&1\\-2&-3\end{bmatrix}$, the state-transition matrix is $\begin{bmatrix}\alpha e^{-t} - e^{-\beta t} & e^{-t} - \gamma e^{-2t}\\ -2e^{-t}+2e^{-2t} & -e^{-t}+2e^{-2t}\end{bmatrix}$. Find $\alpha$, $\beta$, $\gamma$. Then find $y(t)$ with no input and $x_0 = [1\ \ 1]^T$, $C = [1\ \ 0]$.`,
  hint:"Eigenvalues −1 and −2; build Φ = M e^{Λt} M⁻¹. Or use Φ(0) = I as a shortcut check.",
  sol:R`<p>$\det(\lambda I - A) = \lambda^2 + 3\lambda + 2 = (\lambda+1)(\lambda+2)$: $\lambda = -1, -2$ (stable).</p>
  <p>Eigenvectors from $\lambda I - A = \begin{bmatrix}\lambda&-1\\2&\lambda+3\end{bmatrix}$: $v = [\lambda+3\ \ -2]^T$ ⇒ $v_1 = [2\ -2]^T$, $v_2 = [1\ -2]^T$.</p>
  <p>$M = \begin{bmatrix}2&1\\-2&-2\end{bmatrix}$, $\det M = -2$, $M^{-1} = \begin{bmatrix}1&0.5\\-1&-1\end{bmatrix}$.</p>
  <p>$Me^{\Lambda t} = \begin{bmatrix}2e^{-t}&e^{-2t}\\-2e^{-t}&-2e^{-2t}\end{bmatrix}$; $\Phi = Me^{\Lambda t}M^{-1} = \begin{bmatrix}2e^{-t}-e^{-2t} & e^{-t}-e^{-2t}\\ -2e^{-t}+2e^{-2t} & -e^{-t}+2e^{-2t}\end{bmatrix}$.</p>
  <p>So $\alpha = 2$, $\beta = 2$, $\gamma = 1$. (Quick check: $\Phi(0) = I$ forces $\alpha - 1 = 1$ and $1 - \gamma = 0$.)</p>
  <p>Free response: $y = C\Phi x_0 = (2e^{-t}-e^{-2t}) + (e^{-t}-e^{-2t}) = 3e^{-t} - 2e^{-2t}$.</p>`,
  ans:"α = 2, β = 2, γ = 1; y(t) = 3e^{−t} − 2e^{−2t}", prov:"Follows the posted solution."},
 {src:"State-Space Sheet Q5 (exam 2024 Q1(b))", see:[1,2,3], q:R`For $\dfrac{V_o}{V_{in}} = \dfrac{5}{s^2+6s+5}$: (i) form a parallel-form state space; (ii) draw its block diagram; (iii) form the state-transition matrix; (iv) use it to find the unit-impulse response. [20 marks]`,
  hint:"Partial fractions over (s + 1)(s + 5).",
  sol:R`<p>(i) $\dfrac{5}{(s+1)(s+5)} = \dfrac{1.25}{s+1} - \dfrac{1.25}{s+5}$.</p>
  $$\dot x = \begin{bmatrix}-1&0\\0&-5\end{bmatrix}x + \begin{bmatrix}1\\1\end{bmatrix}v_{in},\qquad v_o = \begin{bmatrix}1.25&-1.25\end{bmatrix}x$$
  <p>(ii) $v_{in}$ splits into two branches: $\dot x_1 = -x_1 + v_{in}$ (junction → $\frac1s$ → $x_1$, feedback gain 1 with a minus sign) and $\dot x_2 = -5x_2 + v_{in}$ (feedback gain 5). Then $v_o = 1.25x_1 - 1.25x_2$ at a summing junction.</p>
  <p>(iii) Diagonal $A$: $\Phi(t) = \begin{bmatrix}e^{-t}&0\\0&e^{-5t}\end{bmatrix}$.</p>
  <p>(iv) Zero initial conditions, impulse input: $x(t) = \Phi(t)B$, so $h(t) = C\Phi B = 1.25e^{-t} - 1.25e^{-5t}$.</p>`,
  ans:"A = diag(−1, −5), B = [1; 1], C = [1.25 −1.25]; Φ = diag(e^{−t}, e^{−5t}); h(t) = 1.25(e^{−t} − e^{−5t})", prov:"Follows the posted solution."},
 {src:"State-Space Sheet Q6 (exam 2023 Q1(a))", see:[3], q:R`An RLC circuit obeys $\ddot v_o + \dfrac RL\dot v_o + \dfrac{1}{LC}v_o = \dfrac{1}{LC}v_{in}$ with $R = 1\ \Omega$, $L = 1$ H, $C = 0.25$ F. Find (i) the unit-step response, (ii) the percentage overshoot, (iii) the period of oscillation, (iv) the initial and final values, and (v) sketch the response. [18 marks]`,
  hint:"G = 4/(s² + s + 4). Complete the square: (s + 0.5)² + 3.75.",
  sol:R`<p>$G(s) = \dfrac{4}{s^2+s+4}$, poles $-0.5 \pm j1.9365$ ($\omega_n = 2$, $\zeta = 0.25$).</p>
  <p>(i) $\dfrac{4}{s(s^2+s+4)} = \dfrac1s - \dfrac{s+1}{s^2+s+4} = \dfrac1s - \dfrac{s+0.5}{(s+0.5)^2+3.75} - 0.2582\dfrac{\sqrt{3.75}}{(s+0.5)^2+3.75}$</p>
  <p>$v_o(t) = 1 - e^{-0.5t}\cos(1.9365t) - 0.2582\,e^{-0.5t}\sin(1.9365t)$.</p>
  <p>(ii) $\%OS = 100e^{-\pi(0.5/1.9365)} = 44.4\%$, so the peak is ≈ 1.444.</p>
  <p>(iii) $T_d = 2\pi/\omega_d = 2\pi/1.9365 = 3.245$ s.</p>
  <p>(iv) IVT: $\lim_{s\to\infty} s\cdot G\cdot\frac1s = 0$. FVT: $\lim_{s\to0} s\cdot G\cdot\frac1s = 4/4 = 1$.</p>
  <p>(v) Starts at 0, rises to ≈ 1.444, then decaying oscillation with period 3.245 s about the final value 1.</p>
  <p>(The posted Method 2 line writes $+0.2582$ for the sine term; Method 1 and the inverse transform both give the minus sign.)</p>`,
  ans:"v_o = 1 − e^{−0.5t}[cos 1.936t + 0.258 sin 1.936t]; 44.4%; 3.245 s; 0 → 1", prov:"Follows the posted solution (sign of the sine term checked by Claude)."},
 {src:"State-Space Sheet Q7 (exam 2023 Q1(b))", see:[0,1,2,3], q:R`$R$ is changed (L = 1 H, C = 0.25 F still). The new state space is $\dot x = \begin{bmatrix}0&1\\-4&-5\end{bmatrix}x + \begin{bmatrix}0\\4\end{bmatrix}v_{in}$, $v_o = \begin{bmatrix}1&0\end{bmatrix}x$. (i) Find the new $R$. (ii) Form the state-transition matrix. (iii) Use it to find the unit-impulse response. (iv) Form a parallel-form state space. (v) Draw its block diagram. (vi) Explain why parallel form helps when finding time-domain responses. [32 marks]`,
  hint:"This is CCF: −a₁ = −R/L. Eigenvalues −1, −4.",
  sol:R`<p>(i) CCF: $a_0 = 1/LC = 4$ ✓, $a_1 = R/L = 5$ ⇒ $R = 5\ \Omega$. (Or: $\det(sI-A) = s^2+5s+4$.)</p>
  <p>(ii) $\lambda^2 + 5\lambda + 4 = 0$ ⇒ $\lambda = -1, -4$. From $\lambda I - A = \begin{bmatrix}\lambda&-1\\4&\lambda+5\end{bmatrix}$, $v = [\lambda+5\ \ -4]^T$: $v_1 = [4\ -4]^T$, $v_2 = [1\ -4]^T$.</p>
  <p>$M = \begin{bmatrix}4&1\\-4&-4\end{bmatrix}$, $\det M = -12$, $M^{-1} = \begin{bmatrix}1/3&1/12\\-1/3&-1/3\end{bmatrix}$.</p>
  $$\Phi(t) = Me^{\Lambda t}M^{-1} = \frac13\begin{bmatrix}4e^{-t}-e^{-4t} & e^{-t}-e^{-4t}\\ 4e^{-4t}-4e^{-t} & 4e^{-4t}-e^{-t}\end{bmatrix}$$
  <p>(iii) $h(t) = C\Phi B = 4\cdot\tfrac13(e^{-t}-e^{-4t}) = \tfrac43(e^{-t}-e^{-4t})$.</p>
  <p>(iv) $\dfrac{4}{(s+1)(s+4)} = \dfrac{4/3}{s+1} - \dfrac{4/3}{s+4}$ ⇒ $A = \text{diag}(-1,-4)$, $B = [1\ 1]^T$, $C = [4/3\ \ -4/3]$.</p>
  <p>(v) Two parallel integrator branches with feedback gains 1 and 4, outputs weighted by $+4/3$ and $-4/3$ and summed.</p>
  <p>(vi) In parallel form $A$ is diagonal, so the states are decoupled and $\Phi = \text{diag}(e^{-t}, e^{-4t})$ is written down directly: no eigenvectors or matrix inverse. Each state's response is a simple first-order exponential.</p>`,
  ans:"R = 5 Ω; Φ as shown; h(t) = (4/3)(e^{−t} − e^{−4t}); A = diag(−1, −4), C = [4/3 −4/3]", prov:"Follows the posted solution."}
],
traps: [
 "CCF bottom row is [−a₀ −a₁]: constant term first. Swapping them changes the system.",
 "Eigenvectors can be scaled freely, but M⁻¹ must be computed from the same M.",
 "Check Φ(0) = I. It catches most arithmetic slips.",
 "Free response uses x₀: CΦx₀. Impulse response uses B: CΦB.",
 "Parallel-form residues can be negative: keep the sign in C."
]
});
})();
