/* EEN1020 — Lecture 3: From State Space to Block Diagrams (CCF, series and parallel realisations; controllability and observability; DIY Questions 1–3) */
(function(){
const R = String.raw;
const T = STUDY.content.ssc = STUDY.content.ssc || { topics: [] };

T.topics.push({
id: "ssreal", part: "State space", title: "Realisations: CCF, Series & Parallel Forms and Their Block Diagrams",
lectures: "Lecture 3 – From State Space to Block Diagrams", status: "lectured",
summary: "One transfer function, three state-space models: the controller canonical form, the series (cascade) form and the parallel (diagonal) form, each derived from first principles and drawn with integrators, gains and summing junctions. Plus what controllability and observability mean.",
theory: R`
<h3>0. State space is not unique; the transfer function is</h3>
<p>State space is an <b>internal</b> description: choose different state variables and you get different $A$, $B$, $C$, $D$. The transfer function is an <b>external</b> input–output description: every valid choice of states gives the same $G(s)$.</p>
<p>Any state-space model can be drawn with three building blocks: the <b>integrator</b> $\frac1s$ (input $\dot x_i$, output $x_i$), the <b>gain</b> $k$ and the <b>summing junction</b> $\Sigma$. One integrator per state. The diagram shows how signals flow, combine and feed back, and maps one-to-one onto a Simulink model.</p>
<p>Running example for the whole lecture:</p>
$$\ddot y+4\dot y+3y=2u,\qquad G(s)=\frac{2}{s^2+4s+3}=\frac{2}{(s+1)(s+3)}$$
<p>This lecture only covers <b>all-pole</b> systems ($G=k/D(s)$, no zeros).</p>

<h3>1. Controller canonical form (CCF)</h3>
<p>For $G(s)=\dfrac{k}{s^n+a_{n-1}s^{n-1}+\dots+a_1s+a_0}$:</p>
$$A=\begin{bmatrix}0&1&0&\cdots&0\\0&0&1&\cdots&0\\\vdots&&&\ddots&\vdots\\0&0&0&\cdots&1\\-a_0&-a_1&-a_2&\cdots&-a_{n-1}\end{bmatrix},\quad B=\begin{bmatrix}0\\\vdots\\0\\k\end{bmatrix},\quad C=\begin{bmatrix}1&0&\cdots&0\end{bmatrix},\quad D=0$$
<p><b>From first principles</b> (no memorising needed): take $x_1=y$, $x_2=\dot y$. Then $\dot x_1=x_2$ and, from the ODE, $\dot x_2=\ddot y=-3x_1-4x_2+2u$:</p>
$$\dot x=\begin{bmatrix}0&1\\-3&-4\end{bmatrix}x+\begin{bmatrix}0\\2\end{bmatrix}u,\qquad y=\begin{bmatrix}1&0\end{bmatrix}x$$
<p><b>Block diagram:</b> $u$ → gain 2 → summing junction → $\frac1s$ → $x_2$ → $\frac1s$ → $x_1=y$. Feed $x_2$ back through gain 4 and $x_1$ back through gain 3, both into the junction with a <b>minus</b> sign. (You could use positive feedback with negative gains, but minus signs at the junction are the standard way.)</p>
<p>Changing $C$ picks a different output: $C=[0\ 1]$ gives $y=x_2=\dot y$.</p>
<p><b>Why use it:</b> written almost straight from the transfer function ($A$ from the denominator, $B$ fixed, $C$ from the numerator, $D=0$ for strictly proper); ideal for <b>state-feedback controller design</b>; uses the minimum number of integrators.</p>
<p>With zeros, $G=\frac{b_{n-1}s^{n-1}+\dots+b_0}{D(s)}$: treat $G$ as $1/D(s)$ followed by $N(s)$, so the numerator coefficients move into $C=[b_0\ b_1\ \cdots\ b_{n-1}]$ and $B=[0\ \cdots\ 0\ 1]^T$.</p>

<h3>2. Series (cascade) form</h3>
<p>Factor the denominator and write $G$ as a chain of first-order blocks:</p>
$$G(s)=\frac{k}{(s-p_n)\cdots(s-p_1)}=k\Big(\frac{1}{s-p_n}\Big)\cdots\Big(\frac{1}{s-p_1}\Big)$$
$$A=\begin{bmatrix}p_n&1&0&\cdots&0\\0&p_{n-1}&1&\cdots&0\\\vdots&&\ddots&\ddots&\vdots\\0&0&\cdots&p_2&1\\0&0&\cdots&0&p_1\end{bmatrix},\quad B=\begin{bmatrix}0\\\vdots\\0\\1\end{bmatrix},\quad C=\begin{bmatrix}k&0&\cdots&0\end{bmatrix},\quad D=0$$
<p><b>Example from first principles.</b> $G=\Big(\frac{1}{s+3}\Big)\Big(\frac{1}{s+1}\Big)2$. Define the states <b>from the input end</b>, $x_2$ first:</p>
<ol class="steps"><li>$x_2=\dfrac{1}{s+1}U\Rightarrow sx_2+x_2=U\Rightarrow\dot x_2=-x_2+u$.</li><li>$x_1=\dfrac{1}{s+3}x_2\Rightarrow\dot x_1=-3x_1+x_2$.</li><li>Output: $y=2x_1$.</li></ol>
$$\dot x=\begin{bmatrix}-3&1\\0&-1\end{bmatrix}x+\begin{bmatrix}0\\1\end{bmatrix}u,\qquad y=\begin{bmatrix}2&0\end{bmatrix}x$$
<p><b>Block diagram:</b> two first-order loops in a row. $u$ → junction → $\frac1s$ → $x_2$ (fed back through gain 1, minus) → junction → $\frac1s$ → $x_1$ (fed back through gain 3, minus) → gain 2 → $y$.</p>
<p><b>Why use it:</b> the poles sit on the diagonal of $A$, so stability is obvious; numerically more robust than CCF for digital implementation; modular (each state is the output of one first-order stage). <b>Downside:</b> you must factor the denominator.</p>

<h3>3. Parallel (diagonal) form</h3>
<p>Split $G$ into partial fractions (distinct poles):</p>
$$G(s)=\frac{c_1}{s-p_1}+\dots+\frac{c_n}{s-p_n}\ \Rightarrow\ A=\text{diag}(p_1,\dots,p_n),\quad B=\begin{bmatrix}1\\\vdots\\1\end{bmatrix},\quad C=\begin{bmatrix}c_1&\cdots&c_n\end{bmatrix},\quad D=0$$
<p><b>Example.</b> $\dfrac{2}{(s+1)(s+3)}=\dfrac{1}{s+1}-\dfrac{1}{s+3}$. Define $x_{1}=\frac{1}{s+1}U$ and $x_{2}=\frac{1}{s+3}U$, so $\dot x_1=-x_1+u$, $\dot x_2=-3x_2+u$ and $y=x_1-x_2$:</p>
$$\dot x=\begin{bmatrix}-1&0\\0&-3\end{bmatrix}x+\begin{bmatrix}1\\1\end{bmatrix}u,\qquad y=\begin{bmatrix}1&-1\end{bmatrix}x$$
<p><b>Block diagram:</b> $u$ splits into two branches; each branch is junction → $\frac1s$ → $x_i$ with $x_i$ fed back through $|p_i|$ (minus); the branch outputs are scaled by $c_i$ and combined at a final junction (here $+x_1$, $-x_2$).</p>
<p><b>Why use it:</b> the states are <b>decoupled</b> (diagonal $A$), each state is one natural mode, stability is read off the diagonal, and it's the most numerically robust form. <b>Downsides:</b> needs the partial-fraction expansion; repeated poles need a Jordan block, so $A$ is no longer purely diagonal. Zeros only change the residues $c_i$.</p>

<h3>4. Summary and the effect of zeros</h3>
<table class="data"><tr><th>Form</th><th>Built from</th><th>Advantage</th><th>Disadvantage</th></tr>
<tr><td>CCF</td><td>TF coefficients, read off directly</td><td>Controller design; minimum integrators</td><td>States not physical (in general)</td></tr>
<tr><td>Series</td><td>Factored poles, chain of first-order blocks</td><td>Easy stability; modular simulation</td><td>Must factor the denominator; states not physical</td></tr>
<tr><td>Parallel</td><td>Partial fractions</td><td>Decoupled modes; good numerics</td><td>Most maths to set up; repeated poles need a Jordan block</td></tr></table>
<p>When zeros are present: <b>CCF</b> moves the numerator into $C$; <b>series</b> stages become $(s-z_i)/(s-p_i)$, which adds direct feedthrough so $A$, $C$ and $D$ change; <b>parallel</b> is least affected. If numerator and denominator have equal degree, divide first: the quotient becomes a non-zero $D$ in every form.</p>
<p><b>Physical vs non-physical states.</b> Physical states are measurable quantities (position, velocity, capacitor voltage, inductor current). In general the CCF states are mathematical combinations: you can't point a sensor at them. For an all-pole system, though, the CCF states are $y$ and $\dot y$ (up to a constant scale), so they are physical.</p>

<h3>5. Controllability and observability (concepts only)</h3>
<p>Studied formally in EEN1047; here you only need the ideas.</p>
<ul><li><b>Controllable:</b> the input $u(t)$ can drive every state from any starting point to any final point. (Uncontrollable: a car whose accelerator can't affect the steering.) The <b>CCF is guaranteed controllable</b>, which is why it's used for controller design.</li>
<li><b>Observable:</b> every state can be worked out by watching the output $y(t)$. An unobservable system hides a state: e.g. $y=x_1$ and $x_2$ has no effect on $x_1$. <b>None</b> of the three forms guarantees observability.</li></ul>
<div class="callout key">In parallel form, a zero entry $c_i$ in $C$ makes state $x_i$ unobservable: its mode cancels out of $G(s)$ (a pole–zero cancellation) and the order of the transfer function drops.</div>
`,
formulas: [
 {name:"CCF (2nd order, all-pole)", tex:R`\frac{k}{s^2+a_1s+a_0}:\ A=\begin{bmatrix}0&1\\-a_0&-a_1\end{bmatrix},\ B=\begin{bmatrix}0\\k\end{bmatrix},\ C=[1\ \ 0]`},
 {name:"Series form (2nd order)", tex:R`\frac{k}{(s-p_2)(s-p_1)}:\ A=\begin{bmatrix}p_2&1\\0&p_1\end{bmatrix},\ B=\begin{bmatrix}0\\1\end{bmatrix},\ C=[k\ \ 0]`},
 {name:"Parallel form", tex:R`\sum\frac{c_i}{s-p_i}:\ A=\text{diag}(p_i),\ B=[1\ \cdots\ 1]^T,\ C=[c_1\ \cdots\ c_n]`},
 {name:"Diagonal STM", tex:R`A=\text{diag}(p_i)\ \Rightarrow\ \Phi(t)=\text{diag}(e^{p_it})`}
],
questions: [
 {src:"Lecture 3 (block diagrams) DIY Q1", see:[1,2,3], q:R`For $G(s)=\dfrac{10}{s^2+7s+10}$: (a) write the time-domain ODE; (b) derive from first principles the CCF, series and parallel state-space models; (c) describe the integrator block diagram for each.`,
  hint:"Poles: s² + 7s + 10 = (s + 2)(s + 5). CCF: x₁ = y, x₂ = ẏ. Series: define the state at the input end first. Parallel: partial fractions.",
  sol:R`<p><b>(a)</b> $\ddot y+7\dot y+10y=10u$.</p>
  <p><b>(b) CCF:</b> $x_1=y$, $x_2=\dot y$: $\dot x_1=x_2$, $\dot x_2=-10x_1-7x_2+10u$.
  $$A=\begin{bmatrix}0&1\\-10&-7\end{bmatrix},\ B=\begin{bmatrix}0\\10\end{bmatrix},\ C=[1\ \ 0]$$</p>
  <p><b>Series:</b> $G=\Big(\frac{1}{s+5}\Big)\Big(\frac{1}{s+2}\Big)10$. $x_2=\frac{1}{s+2}U\Rightarrow\dot x_2=-2x_2+u$; $x_1=\frac{1}{s+5}x_2\Rightarrow\dot x_1=-5x_1+x_2$; $y=10x_1$.
  $$A=\begin{bmatrix}-5&1\\0&-2\end{bmatrix},\ B=\begin{bmatrix}0\\1\end{bmatrix},\ C=[10\ \ 0]$$</p>
  <p><b>Parallel:</b> $\dfrac{10}{(s+2)(s+5)}=\dfrac{10/3}{s+2}-\dfrac{10/3}{s+5}$.
  $$A=\begin{bmatrix}-2&0\\0&-5\end{bmatrix},\ B=\begin{bmatrix}1\\1\end{bmatrix},\ C=\Big[\tfrac{10}{3}\ \ -\tfrac{10}{3}\Big]$$</p>
  <p><b>(c)</b> CCF: $u$ → gain 10 → junction → $\frac1s$ → $x_2$ → $\frac1s$ → $x_1=y$, with $x_2$ fed back through 7 and $x_1$ through 10 (both minus). Series: junction → $\frac1s$ → $x_2$ (feedback 2) → junction → $\frac1s$ → $x_1$ (feedback 5) → gain 10 → $y$. Parallel: $u$ splits into a branch with feedback 2 giving $x_1$ and a branch with feedback 5 giving $x_2$; each is scaled by 3.33 and combined as $+x_1$ term, $-x_2$ term.</p>`,
  ans:"CCF A=[0 1; −10 −7], B=[0;10], C=[1 0]; series A=[−5 1; 0 −2], B=[0;1], C=[10 0]; parallel A=diag(−2,−5), B=[1;1], C=[10/3 −10/3]", prov:"Follows the indicative answers in Lecture 3 (the slide for the parallel block diagram is headed \"CCF\" by mistake)."},
 {src:"Lecture 3 (block diagrams) DIY Q2", see:[1,4], q:R`A mass–spring–damper has $m=2$ kg, $b=14$ N·s/m and $k=20$ N/m, driven by $f(t)$: $2\ddot y+14\dot y+20y=f$. (a) With physical states $x_1=y$ (position) and $x_2=\dot y$ (velocity), form the state-space matrices. (b) Compare with the CCF for $G(s)=Y/F$. Are the CCF states physical here?`,
  hint:"Divide through by the mass first.",
  sol:R`<p><b>(a)</b> $\ddot y+7\dot y+10y=0.5f$. So $\dot x_1=x_2$, $\dot x_2=-10x_1-7x_2+0.5f$, $y=x_1$:
  $$A=\begin{bmatrix}0&1\\-10&-7\end{bmatrix},\ B=\begin{bmatrix}0\\0.5\end{bmatrix},\ C=[1\ \ 0]$$
  (the same $A$ as DIY Q1, with a different input gain).</p>
  <p><b>(b)</b> The CCF built from phase variables $x_1=y$, $x_2=\dot y$ gives exactly these matrices. So yes: because $G(s)$ is all-pole (no zeros, no input derivatives), the CCF states are the output and its derivative, i.e. physical position and velocity (up to a constant scale). If $G$ had zeros, the CCF states would mix input and output derivatives and lose that physical meaning.</p>`,
  ans:"A=[0 1; −10 −7], B=[0; 0.5], C=[1 0]; yes, the CCF states are physical for an all-pole system", prov:"Follows the indicative answers in Lecture 3."},
 {src:"Lecture 3 (block diagrams) DIY Q3", see:[3,5], q:R`A system in parallel form: $\dot x=\begin{bmatrix}-2&0\\0&-5\end{bmatrix}x+\begin{bmatrix}1\\1\end{bmatrix}u$, $y=[4\ \ -3]\,x$. (a) Find the poles and say whether it is BIBO stable. (b) Reconstruct $G(s)$. (c) A sensor failure changes $C$ to $[4\ \ 0]$. Which state becomes unobservable, and what happens to $G(s)$? (d) Find the state-transition matrix.`,
  hint:"Diagonal A: poles are the diagonal entries and each branch is c_i/(s − p_i).",
  sol:R`<p><b>(a)</b> $A$ is diagonal, so the poles are $-2$ and $-5$. Both have $\text{Re}(s)\lt 0$: BIBO stable.</p>
  <p><b>(b)</b> $G=\dfrac{4}{s+2}-\dfrac{3}{s+5}=\dfrac{4(s+5)-3(s+2)}{(s+2)(s+5)}=\dfrac{s+14}{s^2+7s+10}$.</p>
  <p><b>(c)</b> $y=4x_1$. State $x_2$ is decoupled from $x_1$ in $A$ and now has zero weight in $C$, so it has no effect on the output: <b>$x_2$ is unobservable</b>. Its mode cancels (pole–zero cancellation at $s=-5$) and the system looks first-order: $G_{new}=\dfrac{4}{s+2}$.</p>
  <p><b>(d)</b> $\Phi(t)=e^{At}=\begin{bmatrix}e^{-2t}&0\\0&e^{-5t}\end{bmatrix}$.</p>`,
  ans:"Poles −2, −5 (stable); G=(s+14)/(s²+7s+10); x₂ unobservable, G→4/(s+2); Φ=diag(e^{−2t}, e^{−5t})", prov:"Follows the indicative answers in Lecture 3."},
 {src:"Lecture 3 (block diagrams) example", see:[1,2,3], q:R`Write the CCF, series and parallel forms for $G(s)=\dfrac{2}{s^2+4s+3}$ and check that each gives the same transfer function.`,
  hint:"Poles −1 and −3. Check with C(sI − A)⁻¹B.",
  sol:R`<p>CCF: $A=\begin{bmatrix}0&1\\-3&-4\end{bmatrix}$, $B=\begin{bmatrix}0\\2\end{bmatrix}$, $C=[1\ 0]$. Series: $A=\begin{bmatrix}-3&1\\0&-1\end{bmatrix}$, $B=\begin{bmatrix}0\\1\end{bmatrix}$, $C=[2\ 0]$. Parallel: $A=\text{diag}(-1,-3)$, $B=\begin{bmatrix}1\\1\end{bmatrix}$, $C=[1\ -1]$.</p>
  <p>Check the series form: $(sI-A)^{-1}B=\dfrac{1}{(s+3)(s+1)}\begin{bmatrix}s+1&1\\0&s+3\end{bmatrix}\begin{bmatrix}0\\1\end{bmatrix}=\dfrac{1}{(s+3)(s+1)}\begin{bmatrix}1\\s+3\end{bmatrix}$, so $C(sI-A)^{-1}B=\dfrac{2}{(s+1)(s+3)}$. Parallel: $\frac{1}{s+1}-\frac{1}{s+3}=\frac{2}{(s+1)(s+3)}$. CCF: $\det(sI-A)=s^2+4s+3$ and the numerator is $2$. All three agree.</p>`,
  ans:"All three give 2/(s² + 4s + 3)", prov:"From the worked examples in Lecture 3."}
],
traps: [
 "In the series form, define the states from the input end: the first stage's output is the last state (x₂ here), and y = k·x₁.",
 "A partial-fraction residue can be negative: here 2/((s+1)(s+3)) = 1/(s+1) − 1/(s+3), so C = [1 −1], and the final junction subtracts.",
 "Feedback gains on the diagram are the pole magnitudes with a minus sign at the junction, not negative gains with a plus.",
 "Diagonal A tells you the poles and stability, but a zero in C can hide a mode: the transfer function then has lower order than A."
]
});
})();
