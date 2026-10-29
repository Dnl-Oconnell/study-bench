/* EEN1020 — converting higher-order ODEs and transfer functions to state space (phase variables), state-space IVT/FVT, and coupled second-order systems (Lecture 3) */
(function(){
const R = String.raw;
const T = STUDY.content.ssc = STUDY.content.ssc || { topics: [] };

T.topics.push({
id: "ssode", part: "State space", title: "Higher-Order ODEs to State Space, Initial & Steady-State Values, Coupled Systems",
lectures: "Lecture 3 – Converting Higher Order ODEs to State-Spaces", status: "lectured",
summary: "The substitution (phase-variable) method for turning an nth-order ODE or transfer function into state space, the state-space versions of the IVT and FVT (y₀ = Cx₀, x_ss = −A⁻¹Bu_ss, y_ss = −CA⁻¹Bu_ss), and building 4-state models for coupled two-mass and two-inertia systems.",
theory: R`
<h3>0. The problem</h3>
<p>Physical systems give higher-order ODEs, e.g. $\dfrac{d^2v}{dt^2} + a\dfrac{dv}{dt} + v = 0$. State space needs a set of <b>first-order</b> ODEs, $\dot x = Ax + Bu$, $y = Cx + Du$. The <b>substitution method (phase variables)</b> converts one $n$th-order ODE into $n$ coupled first-order ODEs.</p>

<h3>1. The substitution method (phase variables)</h3>
<ol class="steps">
<li><b>State 1 is the output variable</b>: $x_1 = v$.</li>
<li><b>Each further state is the derivative of the one before</b>: $x_2 = \dot v$, $x_3 = \ddot v$, …, $x_n = \dfrac{d^{n-1}v}{dt^{n-1}}$.</li>
<li><b>Differentiate each state</b>: $\dot x_1 = x_2$, $\dot x_2 = x_3$, …, $\dot x_{n-1} = x_n$. These are $n-1$ free first-order equations.</li>
<li><b>The last one comes from the ODE itself</b>: $\dot x_n = \dfrac{d^nv}{dt^n}$ is the highest derivative, so rearrange the original ODE for it and substitute the states.</li>
</ol>
<p>Lecture example: with $x_1 = v$, $x_2 = \dot v$, the ODE becomes $\dot x_2 + a x_2 + x_1 = 0$, so</p>
$$\frac{d}{dt}\begin{bmatrix}x_1\\x_2\end{bmatrix} = \begin{bmatrix}0&1\\-1&-a\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix} + \begin{bmatrix}0\\0\end{bmatrix}v_{in},\qquad y = \begin{bmatrix}1&0\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}$$
<p>The output is $x_1 = v$ because the original equation is written in terms of $v$.</p>

<h3>2. Transfer function → state space</h3>
<ol class="steps">
<li><b>Form the ODE</b>: cross-multiply and inverse-Laplace (zero initial conditions). $\dfrac{Y}{U} = \dfrac{10}{s^2+5s+6} \Rightarrow \ddot y + 5\dot y + 6y = 10u$.</li>
<li><b>Substitute</b>: $x_1 = y$, $x_2 = \dot y$.</li>
<li><b>Rewrite as first-order ODEs</b>: $\dot x_1 = x_2$; $\dot x_2 = -6x_1 - 5x_2 + 10u$.</li>
<li><b>Matrix form</b>.</li>
</ol>
<div class="callout key">For $\dfrac{Y}{U} = \dfrac{b}{s^n + a_{n-1}s^{n-1} + \cdots + a_1 s + a_0}$:
$$A = \begin{bmatrix}0&1&0&\cdots&0\\0&0&1&\cdots&0\\ \vdots&&&\ddots&\vdots\\0&0&0&\cdots&1\\-a_0&-a_1&-a_2&\cdots&-a_{n-1}\end{bmatrix},\quad B = \begin{bmatrix}0\\ \vdots\\0\\b\end{bmatrix},\quad C = \begin{bmatrix}1&0&\cdots&0\end{bmatrix},\quad D = 0$$
1s on the superdiagonal, the negated denominator coefficients along the bottom row (<b>constant term first</b>), the numerator gain at the bottom of $B$.</div>
<p>This is the same structure as the controller canonical form in the next topic. A first-order system has a 1×1 "matrix": $\dfrac{4}{s+3} \Rightarrow \dot x_1 = -3x_1 + 4u$, $y = x_1$.</p>

<h3>3. State-space equivalent of the IVT and FVT</h3>
<p>The IVT and FVT give $y(0^+)$ and $y_{ss}$ from $Y(s)$ without inverting it. In state space you get the same values straight from $A, B, C, D$ and $x_0$, without forming a transfer function or solving the ODE. State space also handles non-zero initial conditions $x(0) = x_0$, which transfer functions assume away.</p>
<div class="tbl"><table class="data">
<tr><th></th><th>Transfer function</th><th>State space</th></tr>
<tr><td>Initial output</td><td>$\lim_{s\to\infty} sY(s)$; needs $sY(s)$ proper (no impulse at $t=0$)</td><td>$y(0^+) = Cx_0 + Du(0^+)$; needs finite $x(0^+)$ and $u(0^+)$. Stability not required.</td></tr>
<tr><td>Steady-state output</td><td>$\lim_{s\to0} sY(s)$ (DC gain); all poles of $sY(s)$ in the open LHP</td><td>$y_{ss} = (D - CA^{-1}B)u_{ss}$; all eigenvalues of $A$ with $\text{Re}(\lambda) < 0$</td></tr>
</table></div>
<p><b>Initial value.</b> At $t = 0^+$: $y_0 = Cx_0 + Du_0$. On this course $D = 0$, so $y_0 = Cx_0$.</p>
<p><b>Steady-state value.</b> With a <b>constant</b> input the states settle, so $\dot x = 0$ (this fails for a sinusoidal input). Then</p>
$$0 = Ax_{ss} + Bu_{ss} \Rightarrow x_{ss} = -A^{-1}Bu_{ss},\qquad y_{ss} = Cx_{ss} + Du_{ss} = (D - CA^{-1}B)u_{ss}$$
<div class="callout key">On this course $D = 0$: $\quad y_0 = Cx_0,\quad x_{ss} = -A^{-1}Bu_{ss},\quad y_{ss} = -CA^{-1}Bu_{ss}$. $x_{ss}$ is the <b>equilibrium point</b>.</div>
<p>The module only deals with stable and marginally stable systems. The FVT needs strict stability; the IVT does not.</p>

<h3>4. Coupled second-order systems</h3>
<p>Each independently moving mass (or energy-storing loop) gives its own second-order ODE, and the ODEs are coupled: mass 1's motion depends on mass 2's and vice versa.</p>
<ul>
<li><b>1 degree of freedom = 2 state variables</b>: position (potential energy in springs) and velocity (kinetic energy). Acceleration is not a state: the ODE already gives $\ddot x = -\frac km x - \frac bm\dot x + \frac1m f$ from position, velocity and input.</li>
<li><b>Total states = sum of the orders of the coupled ODEs.</b> Two coupled second-order ODEs → 4 states, so $A$ is 4×4.</li>
<li>Same for rotation: each inertia rotating about one axis is 1 DOF → $\theta$ and $\dot\theta$.</li>
</ul>
<ol class="steps">
<li>Derive the equation of motion for each mass and solve each for its acceleration.</li>
<li>Substitute $z_1 = x_1$, $z_2 = \dot x_1$, $z_3 = x_2$, $z_4 = \dot x_2$, so $\dot z_1 = z_2$, $\dot z_2 = \ddot x_1$, $\dot z_3 = z_4$, $\dot z_4 = \ddot x_2$.</li>
<li>Write the four first-order equations, filling in zero coefficients.</li>
<li>Matrix form. Rows 1 and 3 of $A$ are just a single 1; rows 2 and 4 hold the dynamics. The output matrix $C$ picks out whichever displacements are measured.</li>
</ol>

<h3>5. Scope of assessment</h3>
<div class="callout">You may be asked to <b>derive</b> a state-space model of any order ($n > 2$), including 3rd- and 4th-order systems. <b>Analytical matrix operations are capped at 2×2.</b> For $n > 2$ you will <b>not</b> be asked to find the zero-input, zero-state or total response, eigenvalues or eigenvectors, the transfer function $C(sI-A)^{-1}B + D$, or equilibrium points.</div>
`,
formulas: [
 {name:"Phase variables", tex:R`x_1 = y,\ x_2 = \dot y,\ \dots,\ x_n = y^{(n-1)};\quad \dot x_k = x_{k+1}`},
 {name:"Bottom row of A", tex:R`\dot x_n = -a_0x_1 - a_1x_2 - \cdots - a_{n-1}x_n + b\,u`},
 {name:"Initial output", tex:R`y(0^+) = Cx_0 + Du(0^+)\ \ (= Cx_0 \text{ when } D=0)`},
 {name:"Equilibrium state", tex:R`x_{ss} = -A^{-1}Bu_{ss}`},
 {name:"Steady-state output", tex:R`y_{ss} = (D - CA^{-1}B)u_{ss}\ \ (= -CA^{-1}Bu_{ss} \text{ when } D=0)`},
 {name:"Number of states", tex:R`n = \textstyle\sum \text{orders of the coupled ODEs}\ (2 \text{ per DOF})`}
],
questions: [
 {src:"Lecture 3 Problem #1", see:[2], q:R`Find a state-space representation for $G(s) = \dfrac{Y(s)}{U(s)} = \dfrac{10}{s^2+5s+6}$.`,
  hint:"Cross-multiply to get the ODE, then x₁ = y, x₂ = ẏ and solve the ODE for ẋ₂.",
  sol:R`<p>$(s^2+5s+6)Y = 10U \Rightarrow \ddot y + 5\dot y + 6y = 10u$.</p>
  <p>$x_1 = y$, $x_2 = \dot y$: $\dot x_1 = x_2$, $\dot x_2 + 5x_2 + 6x_1 = 10u \Rightarrow \dot x_2 = -6x_1 - 5x_2 + 10u$.</p>
  $$\frac{d}{dt}\begin{bmatrix}x_1\\x_2\end{bmatrix} = \begin{bmatrix}0&1\\-6&-5\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix} + \begin{bmatrix}0\\10\end{bmatrix}u,\qquad y = \begin{bmatrix}1&0\end{bmatrix}x$$
  <p>Check: $C(sI-A)^{-1}B = \dfrac{10}{s^2+5s+6}$.</p>`,
  ans:"A = [0 1; −6 −5], B = [0; 10], C = [1 0], D = 0", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 Problem #1 Extended", see:[3], q:R`The stable system $\dot x = \begin{bmatrix}0&1\\-6&-5\end{bmatrix}x + \begin{bmatrix}0\\10\end{bmatrix}v_{in}$, $y = \begin{bmatrix}1&0\end{bmatrix}x$ has initial conditions $x_0 = [2\ \ 0]^T$ and a step input of magnitude 2. Find (a) $y(0^+)$, (b) the equilibrium point, (c) the final value of the output.`,
  hint:"y₀ = Cx₀; x_ss = −A⁻¹B u_ss; y_ss = C x_ss. det A = 6.",
  sol:R`<p>(a) $y(0^+) = Cx_0 = \begin{bmatrix}1&0\end{bmatrix}\begin{bmatrix}2\\0\end{bmatrix} = 2$.</p>
  <p>(b) $\det A = (0)(-5) - (1)(-6) = 6$. $-A^{-1} = -\dfrac16\begin{bmatrix}-5&-1\\6&0\end{bmatrix} = \begin{bmatrix}\frac56&\frac16\\-1&0\end{bmatrix}$, so $-A^{-1}B = \begin{bmatrix}\frac53\\0\end{bmatrix}$ and $x_{ss} = \begin{bmatrix}\frac53\\0\end{bmatrix}(2) = \begin{bmatrix}\frac{10}{3}\\0\end{bmatrix}$.</p>
  <p>(c) $y_{ss} = Cx_{ss} = \dfrac{10}{3}$.</p>
  <p>Check against the total response $y(t) = \frac{10}{3} - 4e^{-2t} + \frac83e^{-3t}$: $y(0) = \frac{10}{3} - 4 + \frac83 = 2$ and $y(\infty) = \frac{10}{3}$. The equilibrium velocity is 0, as it must be at rest.</p>`,
  ans:"y(0⁺) = 2; x_ss = [10/3, 0]ᵀ; y_ss = 10/3", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 Problem #2", see:[2], q:R`Find a state-space representation for $G(s) = \dfrac{10}{s^3+6s^2+11s+6}$.`,
  hint:"Three states: y, ẏ, ÿ. The bottom row of A is −6, −11, −6.",
  sol:R`<p>$\dddot y + 6\ddot y + 11\dot y + 6y = 10u$. With $x_1 = y$, $x_2 = \dot y$, $x_3 = \ddot y$: $\dot x_1 = x_2$, $\dot x_2 = x_3$, $\dot x_3 = -6x_1 - 11x_2 - 6x_3 + 10u$.</p>
  $$\frac{d}{dt}\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix} = \begin{bmatrix}0&1&0\\0&0&1\\-6&-11&-6\end{bmatrix}\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix} + \begin{bmatrix}0\\0\\10\end{bmatrix}u,\qquad y = \begin{bmatrix}1&0&0\end{bmatrix}x$$`,
  ans:"A = [0 1 0; 0 0 1; −6 −11 −6], B = [0; 0; 10], C = [1 0 0]", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 DIY #1", see:[2], q:R`Convert $G_1(s) = \dfrac{4}{s+3}$ to state space.`,
  hint:"First order: one state, x₁ = y.",
  sol:R`<p>$\dot y + 3y = 4u$. With $x_1 = y$: $\dot x_1 = -3x_1 + 4u$, $y = x_1 + 0u$.</p>`,
  ans:"ẋ₁ = [−3]x₁ + [4]u, y = [1]x₁ + [0]u", prov:"Follows the indicative answer in Lecture 3."},
 {src:"Lecture 3 DIY #2", see:[2], q:R`Convert $H(s) = \dfrac{8}{s^2+4s+8}$ to state space.`,
  hint:"ÿ + 4ẏ + 8y = 8u.",
  sol:R`<p>$\dot x_1 = x_2$, $\dot x_2 = -8x_1 - 4x_2 + 8u$.</p>
  $$\dot x = \begin{bmatrix}0&1\\-8&-4\end{bmatrix}x + \begin{bmatrix}0\\8\end{bmatrix}u,\qquad y = \begin{bmatrix}1&0\end{bmatrix}x$$`,
  ans:"A = [0 1; −8 −4], B = [0; 8], C = [1 0]", prov:"Follows the indicative answer in Lecture 3."},
 {src:"Lecture 3 DIY #3", see:[1], q:R`Convert $\dfrac{d^2v}{dt^2} + 7\dfrac{dv}{dt} + 12v = v_{in}(t)$ to state space.`,
  hint:"Already an ODE: x₁ = v, x₂ = v̇.",
  sol:R`<p>$\dot x_1 = x_2$, $\dot x_2 = -12x_1 - 7x_2 + v_{in}$.</p>
  $$\dot x = \begin{bmatrix}0&1\\-12&-7\end{bmatrix}x + \begin{bmatrix}0\\1\end{bmatrix}v_{in},\qquad y = \begin{bmatrix}1&0\end{bmatrix}x$$`,
  ans:"A = [0 1; −12 −7], B = [0; 1], C = [1 0]", prov:"Follows the indicative answer in Lecture 3."},
 {src:"Lecture 3 DIY #4", see:[2], q:R`Convert $Q(s) = \dfrac{24}{s^3+7s^2+14s+8}$ to state space.`,
  hint:"Three phase variables; bottom row −8, −14, −7.",
  sol:R`$$\dot x = \begin{bmatrix}0&1&0\\0&0&1\\-8&-14&-7\end{bmatrix}x + \begin{bmatrix}0\\0\\24\end{bmatrix}u,\qquad y = \begin{bmatrix}1&0&0\end{bmatrix}x$$`,
  ans:"A = [0 1 0; 0 0 1; −8 −14 −7], B = [0; 0; 24], C = [1 0 0]", prov:"Follows the indicative answer in Lecture 3."},
 {src:"Practice (DIY #3 system)", see:[3], q:R`For the DIY #3 system $\dot x = \begin{bmatrix}0&1\\-12&-7\end{bmatrix}x + \begin{bmatrix}0\\1\end{bmatrix}v_{in}$, $y = \begin{bmatrix}1&0\end{bmatrix}x$, with $x_0 = [1\ \ 0]^T$ and a constant input $v_{in} = 6$: find $y(0^+)$, the equilibrium point and $y_{ss}$. Is the FVT result valid?`,
  hint:"Check the eigenvalues first (det(sI − A) = s² + 7s + 12). det A = 12.",
  sol:R`<p>$y(0^+) = Cx_0 = 1$.</p>
  <p>$\det A = 0\cdot(-7) - (1)(-12) = 12$; $A^{-1} = \dfrac1{12}\begin{bmatrix}-7&-1\\12&0\end{bmatrix}$; $-A^{-1}B = -\dfrac1{12}\begin{bmatrix}-1\\0\end{bmatrix} = \begin{bmatrix}\frac1{12}\\0\end{bmatrix}$.</p>
  <p>$x_{ss} = \begin{bmatrix}\frac1{12}\\0\end{bmatrix}(6) = \begin{bmatrix}\frac12\\0\end{bmatrix}$, $y_{ss} = \frac12$.</p>
  <p>Eigenvalues: $s^2+7s+12 = (s+3)(s+4)$, so $-3, -4$; both negative, so the steady-state result is valid. Cross-check: DC gain $1/12$ times 6 $= 0.5$.</p>`,
  ans:"y(0⁺) = 1; x_ss = [1/2, 0]ᵀ; y_ss = 1/2 (valid: eigenvalues −3, −4)", prov:"Worked by Claude; no solution is available."},
 {src:"Lecture 3 Coupled System Problem #1", fig:"ssc_l3c1", see:[4], q:R`For the two-mass system shown (force $f(t)$ on $M$; $K$ and $B$ between $M$ and $m$; $K_t$ and $B_t$ from $m$ to ground), find the complete state-space model. $m = 1$ kg, $M = 5$ kg, $B = 2$ Ns/m, $B_t = 3$ Ns/m, $K = 10$ N/m, $K_t = 15$ N/m. Outputs: both displacements.`,
  hint:"Two masses → 4 states z = [x₁, ẋ₁, x₂, ẋ₂]. Divide each equation of motion by its mass.",
  sol:R`<p>Equations of motion:</p>
  <p>$M\ddot x_1 = f - K(x_1 - x_2) - B(\dot x_1 - \dot x_2) \Rightarrow \ddot x_1 = -2x_1 - 0.4\dot x_1 + 2x_2 + 0.4\dot x_2 + 0.2f$</p>
  <p>$m\ddot x_2 = K(x_1 - x_2) + B(\dot x_1 - \dot x_2) - K_tx_2 - B_t\dot x_2 \Rightarrow \ddot x_2 = 10x_1 + 2\dot x_1 - 25x_2 - 5\dot x_2$</p>
  <p>With $z_1 = x_1$, $z_2 = \dot x_1$, $z_3 = x_2$, $z_4 = \dot x_2$:</p>
  $$\frac{d}{dt}\begin{bmatrix}z_1\\z_2\\z_3\\z_4\end{bmatrix} = \begin{bmatrix}0&1&0&0\\-2&-0.4&2&0.4\\0&0&0&1\\10&2&-25&-5\end{bmatrix}\begin{bmatrix}z_1\\z_2\\z_3\\z_4\end{bmatrix} + \begin{bmatrix}0\\0.2\\0\\0\end{bmatrix}f(t),\qquad \begin{bmatrix}y_1\\y_2\end{bmatrix} = \begin{bmatrix}1&0&0&0\\0&0&1&0\end{bmatrix}z$$`,
  ans:"A = [0 1 0 0; −2 −0.4 2 0.4; 0 0 0 1; 10 2 −25 −5], B = [0; 0.2; 0; 0], C = [1 0 0 0; 0 0 1 0]", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 Coupled DIY #1", fig:"ssc_l3c2", see:[4], q:R`Two masses on a horizontal surface between two walls: $K_1$ from the left wall to $M_1$; $K_2$ and $B_3$ in parallel between $M_1$ and $M_2$; $K_3$ from $M_2$ to the right wall; force $f(t)$ on $M_1$. $M_1 = M_2 = 1$ kg, $B_3 = 3$ Ns/m, $K_1 = 2$, $K_2 = 1$, $K_3 = 2$ N/m. Find the state-space model with outputs $x_1$ and $x_2$.`,
  hint:"M₁ feels K₁ and the coupling (K₂, B₃); M₂ feels the coupling and K₃.",
  sol:R`<p>$\ddot x_1 = f - K_1x_1 - K_2(x_1 - x_2) - B_3(\dot x_1 - \dot x_2) = -3x_1 - 3\dot x_1 + x_2 + 3\dot x_2 + f$</p>
  <p>$\ddot x_2 = K_2(x_1 - x_2) + B_3(\dot x_1 - \dot x_2) - K_3x_2 = x_1 + 3\dot x_1 - 3x_2 - 3\dot x_2$</p>
  $$\dot z = \begin{bmatrix}0&1&0&0\\-3&-3&1&3\\0&0&0&1\\1&3&-3&-3\end{bmatrix}z + \begin{bmatrix}0\\1\\0\\0\end{bmatrix}f(t),\qquad \begin{bmatrix}y_1\\y_2\end{bmatrix} = \begin{bmatrix}1&0&0&0\\0&0&1&0\end{bmatrix}z + \begin{bmatrix}0\\0\end{bmatrix}f(t)$$
  <p>with $z = [x_1\ \dot x_1\ x_2\ \dot x_2]^T$.</p>`,
  ans:"A = [0 1 0 0; −3 −3 1 3; 0 0 0 1; 1 3 −3 −3], B = [0; 1; 0; 0]", prov:"Follows the indicative answer in Lecture 3."},
 {src:"Lecture 3 Coupled DIY #2", fig:"ssc_l3c3", see:[4], q:R`Torque $T(t)$ drives inertia $J_1$ (damper $D_1$ to the wall), which is joined by torsional spring $K$ to $J_2$ (damper $D_2$ to the other wall). $J_1 = 1$ kg m², $J_2 = 0.5$ kg m², $D_1 = 0.1$, $D_2 = 0.05$ Nms/rad, $K = 1$ Nm/rad. Find the state-space model with output $\theta_2$.`,
  hint:"Rotational version of the two-mass problem: z = [θ₁, θ̇₁, θ₂, θ̇₂].",
  sol:R`<p>$J_1\ddot\theta_1 = T - D_1\dot\theta_1 - K(\theta_1 - \theta_2) \Rightarrow \ddot\theta_1 = -\theta_1 - 0.1\dot\theta_1 + \theta_2 + T$</p>
  <p>$J_2\ddot\theta_2 = K(\theta_1 - \theta_2) - D_2\dot\theta_2 \Rightarrow \ddot\theta_2 = 2\theta_1 - 2\theta_2 - 0.1\dot\theta_2$</p>
  $$\frac{d}{dt}z = \begin{bmatrix}0&1&0&0\\-1&-0.1&1&0\\0&0&0&1\\2&0&-2&-0.1\end{bmatrix}z + \begin{bmatrix}0\\1\\0\\0\end{bmatrix}T(t),\qquad y = \begin{bmatrix}0&0&1&0\end{bmatrix}z$$`,
  ans:"A = [0 1 0 0; −1 −0.1 1 0; 0 0 0 1; 2 0 −2 −0.1], B = [0; 1; 0; 0], C = [0 0 1 0]", prov:"Follows the indicative answer in Lecture 3."}
],
traps: [
 "State 1 is the output variable itself, not its derivative.",
 "The bottom row of A is the denominator coefficients negated, constant term first: s² + 5s + 6 gives [−6 −5], not [−5 −6].",
 "Normalise first: if the highest derivative has a coefficient, divide the whole ODE by it before reading off A and B.",
 "Acceleration is never a state; it comes out of the equation of motion.",
 "x_ss = −A⁻¹Bu_ss: don't drop the minus sign, and multiply by the step magnitude, not 1.",
 "The steady-state formulas need a constant input and all eigenvalues of A in the left half-plane.",
 "y(0⁺) uses the initial state x₀, not zero: state space keeps initial conditions."
]
});
})();
