/* EEN1020 — Lecture 3: State-Space and Discrete Systems (discrete state space, CCF/series/parallel in z, SS→TF, stability by eigenvalues; Questions 1–2) */
(function(){
const R = String.raw;
const T = STUDY.content.ssc = STUDY.content.ssc || { topics: [] };

T.topics.push({
id: "dss", part: "State space", title: "Discrete-Time State Space: Realisations, Transfer Function & Stability",
lectures: "Lecture 3 – State-Space and Discrete Systems", status: "lectured",
summary: "The discrete version of everything in the state-space lectures: x[k+1] = Ax[k] + Bu[k], the unit delay in place of the integrator, CCF, series and parallel forms for a G(z), G(z) = C(zI − A)⁻¹B + D, and stability from |λ| < 1.",
theory: R`
<h3>0. Discrete state space</h3>
<p>A discrete-time system is defined only at the sample instants $k=0,1,2,\dots$ ($t=kT$). Instead of a derivative, the state equation gives the <b>next</b> state from the <b>current</b> state and input:</p>
$$x[k+1]=Ax[k]+Bu[k],\qquad y[k]=Cx[k]+Du[k]$$
<p>$A$, $B$, $C$, $D$ mean the same as in continuous time; on this course $D=0$. The equations are evaluated one sample at a time (no integration), which is exactly how a digital controller runs.</p>
<table class="data"><tr><th></th><th>Continuous</th><th>Discrete</th></tr>
<tr><td>State equation</td><td>$\dot x=Ax+Bu$</td><td>$x[k+1]=Ax[k]+Bu[k]$</td></tr>
<tr><td>Transform</td><td>Laplace: $\dot x\to sX(s)$</td><td>z-transform: $x[k+1]\to zX(z)$</td></tr>
<tr><td>Memory element</td><td>Integrator $\frac1s$</td><td>Unit delay $z^{-1}$</td></tr>
<tr><td>Transfer function</td><td>$C(sI-A)^{-1}B+D$</td><td>$C(zI-A)^{-1}B+D$</td></tr>
<tr><td>Stable if</td><td>$\text{Re}(\lambda)\lt 0$</td><td>$|\lambda|\lt 1$ (inside the unit circle)</td></tr></table>
<div class="callout key">Multiplying by $z$ shifts a signal one sample forward, just as multiplying by $s$ differentiates. Everything else follows the continuous notes step for step.</div>

<h3>1. Block-diagram building blocks</h3>
<p>Three blocks draw any discrete state space: the <b>unit delay</b> $z^{-1}$ (holds a value for one sample: its input is $x_i[k+1]$, its output is $x_i[k]$), the <b>gain</b> (a matrix entry) and the <b>summing junction</b> (signs written at each input). The only change from continuous time is that the integrator $1/s$ is replaced by the unit delay.</p>

<h3>2. Controller canonical form (CCF)</h3>
<p>For an all-pole $G(z)=\dfrac{k}{z^n+a_{n-1}z^{n-1}+\dots+a_1z+a_0}$, put the output at the end of a chain of delays. Choose $X_1=Y$ (so $C=[1\ 0\ \cdots\ 0]$) and each further state one sample ahead of the last: $X_2=zX_1$. The denominator coefficients feed back into the start of the chain and form the last row of $A$:</p>
$$A=\begin{bmatrix}0&1&\cdots&0\\ \vdots&&\ddots&\vdots\\0&0&\cdots&1\\-a_0&-a_1&\cdots&-a_{n-1}\end{bmatrix},\quad B=\begin{bmatrix}0\\ \vdots\\0\\k\end{bmatrix},\quad C=[1\ 0\ \cdots\ 0]$$
<p><b>Steps:</b></p>
<ol class="steps"><li>Cross-multiply: $(z^2-0.9z+0.14)Y=0.5U$.</li><li>Define $X_1=Y$, $X_2=zX_1$ and write each state times $z$: $zX_1=X_2$, $zX_2=z^2Y=-0.14X_1+0.9X_2+0.5U$.</li><li>Shift back ($zX\to x[k+1]$): $x_1[k+1]=x_2[k]$, $x_2[k+1]=-0.14x_1[k]+0.9x_2[k]+0.5u[k]$, $y[k]=x_1[k]$.</li><li>Write in matrix form.</li></ol>
<p>Block diagram: $u$ → gain $k$ → junction → $z^{-1}$ → $x_2$ → $z^{-1}$ → $x_1=y$, with $x_2$ fed back through $a_1$ and $x_1$ through $a_0$. As in the continuous notes, the gains are drawn positive and the sign goes on the junction.</p>

<h3>3. Series (cascade) form</h3>
<p>Factor the denominator and treat $G(z)=k\,\dfrac{1}{z-p_n}\cdots\dfrac{1}{z-p_2}\cdot\dfrac{1}{z-p_1}$ as first-order blocks in series. The input passes through $G_1=\frac{1}{z-p_1}$ first. Each block output is a state, numbered from the output backwards: $X_2=\frac{U}{z-p_1}\Rightarrow x_2[k+1]=p_1x_2[k]+u[k]$, and the last block gives $x_1$ with $y=kx_1$.</p>
$$A=\begin{bmatrix}p_n&1&\cdots&0\\0&p_{n-1}&\ddots&\vdots\\ \vdots&&\ddots&1\\0&0&\cdots&p_1\end{bmatrix},\quad B=\begin{bmatrix}0\\ \vdots\\0\\1\end{bmatrix},\quad C=[k\ 0\ \cdots\ 0]$$
<p>Each pole sits on the diagonal; the signal passed on from the previous block gives the 1 above the diagonal. On the diagram each block is a delay with its own pole fed back around it (positive feedback with gain $p_i$).</p>

<h3>4. Parallel form</h3>
<p>Expand in partial fractions, $G(z)=\dfrac{c_1}{z-p_1}+\dots+\dfrac{c_n}{z-p_n}$, and give each term its own block, all driven by the same input. Each block output is a state: $x_i[k+1]=p_ix_i[k]+u[k]$.</p>
$$A=\text{diag}(p_1,\dots,p_n),\quad B=\begin{bmatrix}1\\ \vdots\\1\end{bmatrix},\quad C=[c_1\ \cdots\ c_n]$$
<p>The blocks don't interact, so $A$ is diagonal and each state corresponds to exactly one pole. Residue: $c_i=\big[(z-p_i)G(z)\big]_{z=p_i}$.</p>
<table class="data num"><tr><th>$G(z)=\frac{0.5}{(z-0.2)(z-0.7)}$</th><th>$A$</th><th>$B$</th><th>$C$</th></tr>
<tr><td>CCF</td><td>$\begin{bmatrix}0&1\\-0.14&0.9\end{bmatrix}$</td><td>$\begin{bmatrix}0\\0.5\end{bmatrix}$</td><td>$[1\ \ 0]$</td></tr>
<tr><td>Series</td><td>$\begin{bmatrix}0.2&1\\0&0.7\end{bmatrix}$</td><td>$\begin{bmatrix}0\\1\end{bmatrix}$</td><td>$[0.5\ \ 0]$</td></tr>
<tr><td>Parallel</td><td>$\begin{bmatrix}0.7&0\\0&0.2\end{bmatrix}$</td><td>$\begin{bmatrix}1\\1\end{bmatrix}$</td><td>$[1\ \ -1]$</td></tr></table>
<p>Different states, different matrices, but the eigenvalues of $A$ are $0.2$ and $0.7$ in every case: the poles of $G(z)$.</p>

<h3>5. State space to discrete transfer function</h3>
<p>Take the z-transform with zero initial conditions: $zX=AX+BU\Rightarrow(zI-A)X=BU\Rightarrow X=(zI-A)^{-1}BU$. Substituting into $Y=CX+DU$:</p>
$$G(z)=C(zI-A)^{-1}B+D$$
<p>The denominator is $\det(zI-A)$, so <b>the poles of $G(z)$ are the eigenvalues of $A$</b>. For a 2×2 matrix, $\begin{bmatrix}a&b\\c&d\end{bmatrix}^{-1}=\dfrac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$.</p>

<h3>6. Stability from the eigenvalues</h3>
<p>Solve $\det(\lambda I-A)=0$ and look at $|\lambda|$:</p>
<table class="data"><tr><th>Eigenvalues</th><th>Verdict</th><th>Natural response</th></tr>
<tr><td>All $|\lambda|\lt 1$, real</td><td>Stable</td><td>Decays without oscillating</td></tr>
<tr><td>All $|\lambda|\lt 1$, complex pair</td><td>Stable</td><td>Oscillation that decays</td></tr>
<tr><td>Some $|\lambda|=1$, rest inside</td><td>Marginally stable</td><td>Oscillation neither grows nor decays</td></tr>
<tr><td>Any $|\lambda|\gt 1$</td><td>Unstable</td><td>Grows; one eigenvalue outside is enough</td></tr></table>
<p>For a complex pair $\lambda=a\pm jb$, $|\lambda|=\sqrt{a^2+b^2}$. Lecture examples: $\begin{bmatrix}0.6&0.2\\0.3&0.5\end{bmatrix}$ gives $0.8,\,0.3$ (stable); $\begin{bmatrix}0&1\\-0.5&1\end{bmatrix}$ gives $0.5\pm j0.5$, $|\lambda|=0.707$ (stable); $\begin{bmatrix}0.5&1\\-0.75&0.5\end{bmatrix}$ gives $0.5\pm j0.866$, $|\lambda|=1$ (marginal); $\begin{bmatrix}1&2\\1&3\end{bmatrix}$ gives $2\pm\sqrt3=3.73,\,0.27$ (unstable).</p>
`,
formulas: [
 {name:"Discrete state space", tex:R`x[k+1]=Ax[k]+Bu[k],\quad y[k]=Cx[k]+Du[k]`},
 {name:"Discrete transfer function", tex:R`G(z)=C(zI-A)^{-1}B+D`},
 {name:"Stability (discrete)", tex:R`|\lambda_i|\lt 1\ \text{for all eigenvalues of }A`},
 {name:"CCF (2nd order, all-pole)", tex:R`\frac{k}{z^2+a_1z+a_0}:\ A=\begin{bmatrix}0&1\\-a_0&-a_1\end{bmatrix},\ B=\begin{bmatrix}0\\k\end{bmatrix},\ C=[1\ \ 0]`},
 {name:"Series form (2nd order)", tex:R`\frac{k}{(z-p_2)(z-p_1)}:\ A=\begin{bmatrix}p_2&1\\0&p_1\end{bmatrix},\ B=\begin{bmatrix}0\\1\end{bmatrix},\ C=[k\ \ 0]`},
 {name:"Parallel form", tex:R`\sum\frac{c_i}{z-p_i}:\ A=\text{diag}(p_i),\ B=[1\ \cdots\ 1]^T,\ C=[c_1\ \cdots\ c_n]`}
],
questions: [
 {src:"Lecture 3 (discrete) Question 1", see:[2,3,4,6], q:R`Consider the second-order, all-pole discrete system $G(z)=\dfrac{Y(z)}{U(z)}=\dfrac{0.3}{z^2-0.8z+0.15}$. (a) Derive from first principles the controller canonical form state space. (b) Derive the series form. (c) Derive the parallel form. (d) Using any of your answers, find the eigenvalues of $A$ and state whether the system is stable.`,
  hint:"z² − 0.8z + 0.15 = (z − 0.3)(z − 0.5). CCF: X₁ = Y, X₂ = zY. Parallel: residues at 0.5 and 0.3.",
  sol:R`<p><b>(a) CCF.</b> $(z^2-0.8z+0.15)Y=0.3U$. Let $X_1=Y$, $X_2=zX_1$. Then $zX_1=X_2$ and $zX_2=z^2Y=0.8X_2-0.15X_1+0.3U$. Shifting back: $x_1[k+1]=x_2[k]$, $x_2[k+1]=-0.15x_1[k]+0.8x_2[k]+0.3u[k]$, $y=x_1$.
  $$A=\begin{bmatrix}0&1\\-0.15&0.8\end{bmatrix},\ B=\begin{bmatrix}0\\0.3\end{bmatrix},\ C=[1\ \ 0]$$</p>
  <p><b>(b) Series.</b> $G=0.3\cdot\dfrac{1}{z-0.5}\cdot\dfrac{1}{z-0.3}$, with the input entering the $\frac{1}{z-0.5}$ block. $X_2=\frac{U}{z-0.5}\Rightarrow x_2[k+1]=0.5x_2[k]+u[k]$; $X_1=\frac{X_2}{z-0.3}\Rightarrow x_1[k+1]=0.3x_1[k]+x_2[k]$; $y=0.3x_1$.
  $$A=\begin{bmatrix}0.3&1\\0&0.5\end{bmatrix},\ B=\begin{bmatrix}0\\1\end{bmatrix},\ C=[0.3\ \ 0]$$</p>
  <p><b>(c) Parallel.</b> $c_1=\dfrac{0.3}{0.5-0.3}=1.5$ at $z=0.5$; $c_2=\dfrac{0.3}{0.3-0.5}=-1.5$ at $z=0.3$. So $G=\dfrac{1.5}{z-0.5}-\dfrac{1.5}{z-0.3}$:
  $$A=\begin{bmatrix}0.5&0\\0&0.3\end{bmatrix},\ B=\begin{bmatrix}1\\1\end{bmatrix},\ C=[1.5\ \ -1.5]$$</p>
  <p><b>(d)</b> From the parallel form the eigenvalues are $0.5$ and $0.3$. Both have $|\lambda|\lt 1$: the system is <b>stable</b>.</p>`,
  ans:"CCF A=[0 1; −0.15 0.8], B=[0; 0.3], C=[1 0]; series A=[0.3 1; 0 0.5], B=[0;1], C=[0.3 0]; parallel A=diag(0.5, 0.3), B=[1;1], C=[1.5 −1.5]; λ = 0.5, 0.3 → stable", prov:"Follows the indicative answers in Lecture 3 (State-Space and Discrete Systems)."},
 {src:"Lecture 3 (discrete) Question 2", see:[5,6], q:R`Determine the transfer function and the stability of $x[k+1]=\begin{bmatrix}0.2&-1\\1&0.2\end{bmatrix}x[k]+\begin{bmatrix}1\\0\end{bmatrix}u[k]$, $y[k]=[0\ \ 1]\,x[k]$.`,
  hint:"Form zI − A, take its determinant and adjugate, then C·adj·B over the determinant.",
  sol:R`<p>$zI-A=\begin{bmatrix}z-0.2&1\\-1&z-0.2\end{bmatrix}$, $\det(zI-A)=(z-0.2)^2+1=z^2-0.4z+1.04$.</p>
  <p>$(zI-A)^{-1}=\dfrac{1}{z^2-0.4z+1.04}\begin{bmatrix}z-0.2&-1\\1&z-0.2\end{bmatrix}$, so $(zI-A)^{-1}B=\dfrac{1}{z^2-0.4z+1.04}\begin{bmatrix}z-0.2\\1\end{bmatrix}$ and</p>
  $$G(z)=[0\ \ 1]\,\frac{1}{z^2-0.4z+1.04}\begin{bmatrix}z-0.2\\1\end{bmatrix}=\frac{1}{z^2-0.4z+1.04}$$
  <p>Eigenvalues: $\lambda=0.2\pm j1$, $|\lambda|=\sqrt{0.04+1}=\sqrt{1.04}\approx1.02\gt 1$. The system is <b>unstable</b>, just outside the unit circle.</p>`,
  ans:"G(z) = 1/(z² − 0.4z + 1.04); λ = 0.2 ± j, |λ| ≈ 1.02 → unstable", prov:"Follows the indicative answers in Lecture 3 (State-Space and Discrete Systems)."},
 {src:"Lecture 3 (discrete) example", see:[5,6], q:R`Find the discrete transfer function of $x[k+1]=\begin{bmatrix}0.4&0.2\\0.1&0.5\end{bmatrix}x[k]+\begin{bmatrix}1\\0\end{bmatrix}u[k]$, $y[k]=[1\ \ 1]\,x[k]$, and say whether it is stable.`,
  hint:"det(zI − A) = (z − 0.4)(z − 0.5) − 0.02.",
  sol:R`<p>$zI-A=\begin{bmatrix}z-0.4&-0.2\\-0.1&z-0.5\end{bmatrix}$; $\det=(z-0.4)(z-0.5)-0.02=z^2-0.9z+0.18$.</p>
  <p>$(zI-A)^{-1}=\dfrac{1}{z^2-0.9z+0.18}\begin{bmatrix}z-0.5&0.2\\0.1&z-0.4\end{bmatrix}$. Times $B$: $\begin{bmatrix}z-0.5\\0.1\end{bmatrix}$; times $C=[1\ 1]$: $z-0.4$.</p>
  $$G(z)=\frac{z-0.4}{z^2-0.9z+0.18}=\frac{z-0.4}{(z-0.6)(z-0.3)}$$
  <p>The poles $0.6$ and $0.3$ are the eigenvalues of $A$; both are inside the unit circle, so the system is stable.</p>`,
  ans:"G(z) = (z − 0.4)/((z − 0.6)(z − 0.3)); stable", prov:"From the worked example in Lecture 3 (State-Space and Discrete Systems)."},
 {src:"Lecture 3 (discrete) examples", see:[6], q:R`Classify the stability of $x[k+1]=Ax[k]+Bu[k]$ for (a) $A=\begin{bmatrix}0.6&0.2\\0.3&0.5\end{bmatrix}$, (b) $A=\begin{bmatrix}0&1\\-0.5&1\end{bmatrix}$, (c) $A=\begin{bmatrix}0.5&1\\-0.75&0.5\end{bmatrix}$, (d) $A=\begin{bmatrix}1&2\\1&3\end{bmatrix}$.`,
  hint:"Characteristic equation λ² − (trace)λ + det = 0, then compare |λ| with 1.",
  sol:R`<p><b>(a)</b> $\lambda^2-1.1\lambda+0.24=0\Rightarrow\lambda=0.8,\,0.3$. Both inside: <b>stable</b>, decays without oscillating.</p>
  <p><b>(b)</b> $\lambda^2-\lambda+0.5=0\Rightarrow\lambda=0.5\pm j0.5$, $|\lambda|=0.707$: <b>stable</b>, decaying oscillation.</p>
  <p><b>(c)</b> $\lambda^2-\lambda+1=0\Rightarrow\lambda=0.5\pm j0.866$, $|\lambda|=1$: <b>marginally stable</b>, the oscillation neither grows nor decays.</p>
  <p><b>(d)</b> $\lambda^2-4\lambda+1=0\Rightarrow\lambda=2\pm\sqrt3=3.73,\,0.27$. $|\lambda_1|\gt 1$: <b>unstable</b>.</p>`,
  ans:"(a) stable (0.8, 0.3); (b) stable (|λ| = 0.707); (c) marginally stable (|λ| = 1); (d) unstable (3.73)", prov:"From the worked examples in Lecture 3 (State-Space and Discrete Systems)."}
],
traps: [
 "Discrete stability is |λ| < 1, not Re(λ) < 0. A pole at z = 0.5 is stable; a pole at z = −1.2 is unstable even though it is in the left half-plane.",
 "Series-form feedback around each delay is positive with gain p_i (x[k+1] = p·x[k] + u), unlike the continuous diagram where the pole −a shows as a minus at the junction.",
 "For complex eigenvalues work out the magnitude √(a² + b²): 0.2 ± j1 is outside the circle even though both parts look small.",
 "Number the series-form states from the output backwards: the input block's output is the last state, and y = k·x₁."
]
});
})();
