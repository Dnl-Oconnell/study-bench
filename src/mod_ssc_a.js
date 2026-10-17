/* EEN1020 Introduction to Systems, Signals & Control — transform theory and modelling */
(function(){
const R = String.raw;
const T = STUDY.content.ssc = STUDY.content.ssc || { topics: [] };

T.topics.push({
id: "laplace", part: "Transform theory", title: "Laplace Transform Review & Solving ODEs",
lectures: "Lecture 1 – Review of Transform Theory; Laplace tutorial", status: "lectured",
summary: "Why transforms turn differential equations into algebra, the definition and causal functions, the standard pairs and theorems, partial fractions (distinct, repeated and quadratic factors), and solving ODEs with non-zero initial conditions.",
theory: R`
<h3>0. The idea</h3>
<p>A differential equation is hard to solve directly; an algebraic equation is easy. The Laplace transform maps one into the other, the same way logs turn division into subtraction:</p>
<div class="flow"><span>ODE in t + initial conditions</span><i>→</i><span>Algebra in s</span><i>→</i><span>Solve for Y(s)</span><i>→</i><span>Partial fractions + tables</span><i>→</i><span>y(t)</span></div>
$$\mathcal{L}\{f(t)\} = F(s) = \int_{0^-}^{\infty} f(t)e^{-st}\,dt$$
<p>Lower limit 0: as engineers, time starts at zero. We force every signal to be <b>causal</b> ($f(t)=0$ for $t<0$) by multiplying by the unit step $u(t)$. You're expected to be able to do a transform from first principles, e.g. $\mathcal{L}\{c\} = c\int_0^\infty e^{-st}dt = c/s$.</p>

<h3>1. Pairs and theorems you use constantly</h3>
<div class="tbl"><table class="data">
<tr><th>$f(t)$</th><th>$F(s)$</th><th>$f(t)$</th><th>$F(s)$</th></tr>
<tr><td>$\delta(t)$</td><td>$1$</td><td>$\sin\omega t$</td><td>$\dfrac{\omega}{s^2+\omega^2}$</td></tr>
<tr><td>$u(t)$</td><td>$\dfrac1s$</td><td>$\cos\omega t$</td><td>$\dfrac{s}{s^2+\omega^2}$</td></tr>
<tr><td>$t^n$</td><td>$\dfrac{n!}{s^{n+1}}$</td><td>$e^{-at}\sin\omega t$</td><td>$\dfrac{\omega}{(s+a)^2+\omega^2}$</td></tr>
<tr><td>$e^{-at}$</td><td>$\dfrac{1}{s+a}$</td><td>$e^{-at}\cos\omega t$</td><td>$\dfrac{s+a}{(s+a)^2+\omega^2}$</td></tr>
<tr><td>$te^{-at}$</td><td>$\dfrac{1}{(s+a)^2}$</td><td>$f(t-a)u(t-a)$</td><td>$e^{-as}F(s)$</td></tr>
</table></div>
<p>Derivatives bring in the initial conditions:</p>
$$\mathcal{L}\{\dot y\} = sY - y(0),\qquad \mathcal{L}\{\ddot y\} = s^2Y - sy(0) - \dot y(0)$$
<p>Frequency shift: $\mathcal{L}\{e^{-at}f(t)\} = F(s+a)$. The table is provided in tests and the exam.</p>

<h3>2. Partial fractions: pick the right template</h3>
<div class="tbl"><table class="data">
<tr><th>Denominator factor</th><th>Terms to include</th><th>Time-domain result</th></tr>
<tr><td>Distinct real $(s-p)$</td><td>$\dfrac{A}{s-p}$</td><td>$Ae^{pt}$</td></tr>
<tr><td>Repeated $(s-p)^2$</td><td>$\dfrac{A}{s-p} + \dfrac{B}{(s-p)^2}$</td><td>$Ae^{pt} + Bte^{pt}$</td></tr>
<tr><td>Irreducible quadratic</td><td>$\dfrac{Bs+C}{s^2+bs+c}$</td><td>damped sine/cosine</td></tr>
</table></div>
<ul>
<li><b>Cover-up:</b> for a distinct factor, $A = \left.(s-p)Y(s)\right|_{s=p}$.</li>
<li>For repeated or quadratic factors, sub in convenient values of $s$ then <b>equate coefficients</b> for the rest.</li>
<li><b>Completing the square:</b> $s^2+2s+10 = (s+1)^2 + 3^2$; rewrite the numerator as $(s+1)$ plus a constant so each piece matches a table entry.</li>
<li>If the numerator degree ≥ denominator degree (improper), divide first; the leftover gives impulse terms $\delta(t)$, $\delta'(t)$.</li>
</ul>
<p>Check the discriminant to decide: $s^2+6s+34$ has $\Delta = 36-136 < 0$, so it stays as a quadratic.</p>

<h3>3. Worked lecture example</h3>
<p>$\ddot y + 12\dot y + 32y = 32u(t)$, zero initial conditions:</p>
<ol class="steps">
<li>$s^2Y + 12sY + 32Y = 32/s \Rightarrow Y = \dfrac{32}{s(s+4)(s+8)}$</li>
<li>$\dfrac{32}{s(s+4)(s+8)} = \dfrac{1}{s} - \dfrac{2}{s+4} + \dfrac{1}{s+8}$</li>
<li>$y(t) = (1 - 2e^{-4t} + e^{-8t})u(t)$</li>
</ol>

<h3>4. Non-zero initial conditions</h3>
<p>The initial conditions land in the numerator, so the Laplace solution gives the zero-input and zero-state responses together. Keep the signs carefully: with $y(0)=2$, $\dot y(0)=-1$, $\mathcal{L}\{\ddot y\} = s^2Y - 2s + 1$.</p>

<h3>5. Fourier as a special case</h3>
<p>The Fourier transform is a two-sided Laplace transform with $s = j\omega$. Substituting $s=j\omega$ into a transfer function gives its frequency response: e.g. $\dfrac{(200\pi)^2}{s^2 + 400\pi s + (200\pi)^2}$ gives 1 at $\omega\to0$ and 0 as $\omega\to\infty$, so it's a low-pass filter.</p>`,
formulas: [
 {name:"Definition", tex:R`F(s) = \int_{0^-}^\infty f(t)e^{-st}\,dt`},
 {name:"First derivative", tex:R`\mathcal{L}\{\dot y\} = sY(s) - y(0)`},
 {name:"Second derivative", tex:R`\mathcal{L}\{\ddot y\} = s^2Y - sy(0) - \dot y(0)`},
 {name:"Frequency shift", tex:R`\mathcal{L}\{e^{-at}f(t)\} = F(s+a)`},
 {name:"Time shift", tex:R`\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)`},
 {name:"Cover-up", tex:R`A = \left.(s-p)\,Y(s)\right|_{s=p}`},
 {name:"Damped pair", tex:R`\frac{s+a}{(s+a)^2+\omega^2} \leftrightarrow e^{-at}\cos\omega t`}
],
questions: [
 {src:"Laplace Tutorial Q1", see:[1,2], q:R`Solve $\ddot y - 7\dot y + 10y = 4$ with $y(0) = 0$, $\dot y(0) = 0$.`,
  hint:"Y(s) = 4/(s(s−2)(s−5)). Three distinct factors: cover-up each one.",
  sol:R`<p>$(s^2 - 7s + 10)Y = 4/s \Rightarrow Y = \dfrac{4}{s(s-2)(s-5)}$</p>
  <p>$A = \dfrac{4}{(-2)(-5)} = \dfrac25$, $B = \dfrac{4}{2(-3)} = -\dfrac23$, $C = \dfrac{4}{5(3)} = \dfrac{4}{15}$</p>
  <p>$$y(t) = \frac25 - \frac23e^{2t} + \frac{4}{15}e^{5t},\quad t\ge0$$</p>`,
  ans:"y = 2/5 − (2/3)e^{2t} + (4/15)e^{5t}", prov:"Follows the posted worked solution."},
 {src:"Laplace Tutorial Q2", see:[2], q:R`Solve $\ddot y - 8\dot y + 16y = 48$ with zero initial conditions.`,
  hint:"s² − 8s + 16 = (s − 4)². A repeated factor needs both A/(s−4) and B/(s−4)².",
  sol:R`<p>$Y = \dfrac{48}{s(s-4)^2} = \dfrac{A}{s} + \dfrac{B}{s-4} + \dfrac{C}{(s-4)^2}$</p>
  <p>$s=0$: $16A = 48 \Rightarrow A = 3$. $s=4$: $4C = 48 \Rightarrow C = 12$. $s^2$ terms: $A + B = 0 \Rightarrow B = -3$.</p>
  <p>$$y(t) = 3 - 3e^{4t} + 12te^{4t}$$</p>`,
  ans:"y = 3 − 3e^{4t} + 12te^{4t}", prov:"Follows the posted worked solution."},
 {src:"Laplace Tutorial Q3", see:[4,2], q:R`Solve $\ddot y - 4\dot y + 4y = 4$ with $y(0) = 2$, $\dot y(0) = -1$.`,
  hint:"Transform carefully: s²Y − 2s + 1 − 4(sY − 2) + 4Y = 4/s.",
  sol:R`<p>$(s-2)^2Y - 2s + 9 = \dfrac4s \Rightarrow Y = \dfrac{2s^2 - 9s + 4}{s(s-2)^2}$</p>
  <p>$s=0$: $4 = 4A \Rightarrow A = 1$. $s=2$: $-6 = 2C \Rightarrow C = -3$. $s^2$: $A + B = 2 \Rightarrow B = 1$.</p>
  <p>$$y(t) = 1 + e^{2t} - 3te^{2t}$$</p>`,
  ans:"y = 1 + e^{2t} − 3te^{2t}", prov:"Follows the posted worked solution."},
 {src:"Laplace Tutorial Q4", see:[2], q:R`Solve $\ddot y + 25y = 75$ with $y(0) = 1$, $\dot y(0) = -5$.`,
  hint:"s² + 25 doesn't factor over the reals: use (Bs + C)/(s² + 25).",
  sol:R`<p>$(s^2+25)Y - s + 5 = \dfrac{75}{s} \Rightarrow Y = \dfrac{s^2 - 5s + 75}{s(s^2+25)} = \dfrac{A}{s} + \dfrac{Bs + C}{s^2+25}$</p>
  <p>$A = 3$; matching $s^2$: $3 + B = 1 \Rightarrow B = -2$; matching $s$: $C = -5$.</p>
  <p>$Y = \dfrac3s - 2\dfrac{s}{s^2+5^2} - \dfrac{5}{s^2+5^2}$, so $y(t) = 3 - 2\cos 5t - \sin 5t$.</p>`,
  ans:"y = 3 − 2cos5t − sin5t", prov:"Follows the posted worked solution."},
 {src:"Laplace Tutorial Q5", see:[2,4], q:R`Solve $\ddot y + 2\dot y + 10y = 40e^{-2t}$ with $y(0) = 5$, $\dot y(0) = -15$.`,
  hint:"The input adds a pole at s = −2. Complete the square: s² + 2s + 10 = (s+1)² + 3².",
  sol:R`<p>$(s^2+2s+10)Y - 5s + 5 = \dfrac{40}{s+2} \Rightarrow Y = \dfrac{5s^2 + 5s + 30}{(s+2)(s^2+2s+10)}$</p>
  <p>$s=-2$: $40 = 10A \Rightarrow A = 4$; $s^2$: $B = 1$; constants: $40 + 2C = 30 \Rightarrow C = -5$.</p>
  <p>$\dfrac{s-5}{(s+1)^2+9} = \dfrac{s+1}{(s+1)^2+3^2} - 2\dfrac{3}{(s+1)^2+3^2}$</p>
  <p>$$y(t) = 4e^{-2t} + e^{-t}\cos 3t - 2e^{-t}\sin 3t$$</p>`,
  ans:"y = 4e^{−2t} + e^{−t}cos3t − 2e^{−t}sin3t", prov:"Follows the posted worked solution."},
 {src:"Class Test 1 Q1(i)", see:[1,4], q:R`For $\ddot y - 3\dot y - 2y = 2\cos 2t$ with $y(0) = -2$, $\dot y(0) = -3$, find $Y(s)$ as a single fraction (numerator expanded, denominator may stay factorised).`,
  hint:"Watch the signs: L{ÿ} = s²Y + 2s + 3 and L{ẏ} = sY + 2 here.",
  sol:R`<p>$(s^2Y + 2s + 3) - 3(sY + 2) - 2Y = \dfrac{2s}{s^2+4}$</p>
  <p>$(s^2 - 3s - 2)Y = \dfrac{2s}{s^2+4} - (2s - 3) = \dfrac{2s - (2s-3)(s^2+4)}{s^2+4}$</p>
  <p>$$Y(s) = \frac{-2s^3 + 3s^2 - 6s + 12}{(s^2 - 3s - 2)(s^2 + 4)}$$</p>`,
  ans:"(−2s³ + 3s² − 6s + 12)/((s² − 3s − 2)(s² + 4))", prov:"Follows the posted Class Test 1 solution."},
 {src:"Class Test 1 Q3(i)", see:[1,2], q:R`Find $y(t)$ for $Y(s) = \dfrac{3s + 6}{s^2 + 4} + \dfrac{4}{(s+4)^2}$.`,
  hint:"Split 3s + 6 into a cosine part and a sine part with ω = 2.",
  sol:R`<p>$\dfrac{3s+6}{s^2+4} = 3\dfrac{s}{s^2+2^2} + 3\dfrac{2}{s^2+2^2}$ and $\dfrac{4}{(s+4)^2} \leftrightarrow 4te^{-4t}$.</p>
  <p>$$y(t) = 3\cos 2t + 3\sin 2t + 4te^{-4t}$$</p>`,
  ans:"3cos2t + 3sin2t + 4te^{−4t}", prov:"Follows the posted Class Test 1 solution."},
 {src:"Laplace Additional Q1(c)", see:[2,4], q:R`Solve $\ddot y + 6\dot y + 8y = 12e^{-t}$ with $y(0) = 1$, $\dot y(0) = 0$.`,
  hint:"Y = (s² + 7s + 18)/((s+1)(s+2)(s+4)). All distinct: cover-up.",
  sol:R`<p>$(s^2+6s+8)Y - s - 6 = \dfrac{12}{s+1} \Rightarrow Y = \dfrac{(s+6)(s+1) + 12}{(s+1)(s+2)(s+4)} = \dfrac{s^2 + 7s + 18}{(s+1)(s+2)(s+4)}$</p>
  <p>$A = \dfrac{12}{(1)(3)} = 4$, $B = \dfrac{8}{(-1)(2)} = -4$, $C = \dfrac{6}{(-3)(-2)} = 1$</p>
  <p>$$y(t) = 4e^{-t} - 4e^{-2t} + e^{-4t}$$ Check: $y(0) = 4 - 4 + 1 = 1$ ✓</p>`,
  ans:"y = 4e^{−t} − 4e^{−2t} + e^{−4t}", prov:"Worked by Claude and checked in code. The sheet's indicative answer has −5e^{−2t}, which fails the y(0) = 1 check."},
 {src:"Laplace Additional Q4(c)", see:[2], q:R`Solve $\ddot y + 4y = 5\sin t$ with zero initial conditions.`,
  hint:"Y = 5/((s²+1)(s²+4)). Treat s² as one variable to split it.",
  sol:R`<p>$Y = \dfrac{5}{(s^2+1)(s^2+4)} = \dfrac{5}{3}\left(\dfrac{1}{s^2+1} - \dfrac{1}{s^2+4}\right)$</p>
  <p>$$y(t) = \frac53\sin t - \frac56\sin 2t$$</p>`,
  ans:"(5/3)sin t − (5/6)sin 2t", prov:"Matches the sheet's indicative answer; steps by Claude."},
 {src:"Laplace Additional Q5 (2025/26 exam)", see:[2], q:R`For $H(s) = \dfrac{4}{s^2+2s+4}$, find the unit step response.`,
  hint:"Y = 4/(s(s²+2s+4)); complete the square: (s+1)² + (√3)².",
  sol:R`<p>$Y = \dfrac{1}{s} - \dfrac{s+2}{s^2+2s+4} = \dfrac1s - \dfrac{s+1}{(s+1)^2+3} - \dfrac{1}{\sqrt3}\dfrac{\sqrt3}{(s+1)^2+3}$</p>
  <p>$$y(t) = 1 - e^{-t}\left(\cos\sqrt3 t + \frac{1}{\sqrt3}\sin\sqrt3 t\right)$$</p>`,
  ans:"1 − e^{−t}(cos√3t + (1/√3)sin√3t)", prov:"Follows the posted worked solution."}
],
traps: [
 "Non-zero initial conditions: L{ÿ} = s²Y − s·y(0) − ẏ(0). Substituting a negative y(0) flips signs. Write the bracket out before simplifying.",
 "Repeated factor (s−a)² needs BOTH A/(s−a) and B/(s−a)².",
 "Irreducible quadratic needs (Bs+C) on top, not a constant.",
 "When completing the square, adjust the numerator to (s+a) + constant before using the cosine and sine pairs.",
 "1/(s+a)² gives te^{−at}, not e^{−2at}.",
 "Always check your answer at t = 0 against the initial condition."
]
});

T.topics.push({
id: "ztrans", part: "Transform theory", title: "Difference Equations & the Z Transform",
lectures: "Difference Equations and Z Transform Refresher; Z tutorial", status: "lectured",
summary: "Sampling and why digital control needs difference equations, building first- and second-order difference equations, fitting parameters from data, recursion, the Z transform with initial conditions, discrete transfer functions and the inverse Z transform by partial fractions on Y(z)/z.",
theory: R`
<h3>0. Why discrete time</h3>
<p>A digital controller can't see a signal continuously. It <b>samples</b> the plant output every $T$ seconds (ADC), computes, then <b>holds</b> its output constant until the next sample (DAC, zero-order hold). It only knows the sequence $y(0), y(T), y(2T), \dots$, written $y[k]$ or $y_k$. Smaller $T$ tracks the continuous signal better.</p>

<h3>1. Difference equations</h3>
<p>Derivatives become differences. For $\dot y = -a_cy + b_cu$, approximate $\dot y \approx (y_k - y_{k-1})/T$:</p>
$$y_k = (1 - a_cT)y_{k-1} + b_cTu_{k-1} = ay_{k-1} + bu_{k-1}$$
<p>General LTI form: $y_k + a_1y_{k-1} + \dots + a_ny_{k-n} = b_0u_k + \dots + b_mu_{k-m}$. A second-order equation uses three points: $y_k = a_1y_{k-1} + a_2y_{k-2} + b_1u_{k-1} + b_2u_{k-2}$.</p>

<h3>2. Fitting parameters from data</h3>
<p>Write the equation at successive samples and solve simultaneously. Lecture data (k: u, y) = (1: 0.2, 0.2), (2: 0.3, 0.24), (3: 0.4, 0.33):</p>
<p>$0.2a + 0.2b = 0.24$ and $0.24a + 0.3b = 0.33 \Rightarrow a = 0.5,\ b = 0.7$, so $y_k = 0.5y_{k-1} + 0.7u_{k-1}$.</p>

<h3>3. Recursion: impulse and step responses</h3>
<p>Assume $y[n] = 0$ for $n<0$ and iterate. For $y_k = 0.5y_{k-1} + 0.7u_{k-1}$:</p>
<div class="tbl"><table class="data num"><tr><th>n</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
<tr><th>impulse</th><td>0</td><td>0.7</td><td>0.35</td><td>0.175</td></tr>
<tr><th>step</th><td>0</td><td>0.7</td><td>1.05</td><td>1.225</td></tr></table></div>
<p>The step response settles at 1.4. Recursion is slow by hand, which is why we use the Z transform.</p>

<h3>4. The Z transform and time shifts</h3>
<p>$z^{-1}$ is a one-sample delay. With zero initial conditions $\mathcal{Z}\{y_{k-1}\} = z^{-1}Y(z)$. With initial conditions:</p>
$$\mathcal{Z}\{y[n-1]\} = z^{-1}Y(z) + y[-1]$$
$$\mathcal{Z}\{y[n-2]\} = z^{-2}Y(z) + z^{-1}y[-1] + y[-2]$$
<p>A delayed input $x[n-1]u[n-1]$ is simply $z^{-1}X(z)$.</p>
<div class="tbl"><table class="data">
<tr><th>$f[n]$</th><th>$F(z)$</th><th>$f[n]$</th><th>$F(z)$</th></tr>
<tr><td>$\delta[n]$</td><td>$1$</td><td>$a^n$</td><td>$\dfrac{z}{z-a}$</td></tr>
<tr><td>$u[n]$</td><td>$\dfrac{z}{z-1}$</td><td>$na^n$</td><td>$\dfrac{az}{(z-a)^2}$</td></tr>
<tr><td>$n$</td><td>$\dfrac{z}{(z-1)^2}$</td><td>$\alpha^nf[n]$</td><td>$F(z/\alpha)$</td></tr>
</table></div>

<h3>5. Discrete transfer functions</h3>
<p>Zero initial conditions, then $H(z) = Y(z)/U(z)$, rewritten in positive powers of $z$. For $y[n] = ay[n-1] + bu[n-1]$: $Y(1 - az^{-1}) = bz^{-1}U \Rightarrow H(z) = \dfrac{b}{z-a}$.</p>

<h3>6. Inverse Z transform</h3>
<div class="callout key"><b>Always expand $Y(z)/z$, not $Y(z)$.</b> Then multiply back by $z$ so every term looks like $\dfrac{z}{z-a} \leftrightarrow a^n$. The numerator degree of $Y(z)/z$ must be below the denominator's.</div>
<p>Inputs: impulse $X(z) = 1$, unit step $X(z) = z/(z-1)$.</p>
<p><b>Lecture example:</b> $H(z) = \dfrac{1.5z}{z-1.5}$. Impulse response $1.5(1.5)^n = 1.5^{n+1}$. Step response: $\dfrac{Y}{z} = \dfrac{1.5z}{(z-1.5)(z-1)} = \dfrac{4.5}{z-1.5} - \dfrac{3}{z-1}$, so $y[n] = 4.5(1.5)^n - 3$. This one grows without limit; $H(z) = z^2/(z^2+0.7z+0.12)$ gives $h[n] = -3(-0.3)^n + 4(-0.4)^n$, which dies away. Predicting which is which is the stability topic.</p>`,
formulas: [
 {name:"First-order difference eq.", tex:R`y_k = ay_{k-1} + bu_{k-1}`},
 {name:"Delay (zero ICs)", tex:R`\mathcal{Z}\{y_{k-m}\} = z^{-m}Y(z)`},
 {name:"One-step delay with IC", tex:R`\mathcal{Z}\{y[n-1]\} = z^{-1}Y + y[-1]`},
 {name:"Two-step delay with ICs", tex:R`\mathcal{Z}\{y[n-2]\} = z^{-2}Y + z^{-1}y[-1] + y[-2]`},
 {name:"Geometric sequence", tex:R`a^n \leftrightarrow \frac{z}{z-a}`},
 {name:"Repeated pole", tex:R`na^n \leftrightarrow \frac{az}{(z-a)^2}`},
 {name:"Unit step", tex:R`u[n] \leftrightarrow \frac{z}{z-1}`}
],
questions: [
 {src:"Z Tutorial Q1", see:[4,6], q:R`Solve $y_n + 2y_{n-1} = 3^n$ for $n \ge 0$ with $y[-1] = -1$.`,
  hint:"Z{y[n−1]} = z⁻¹Y − 1. Then expand Y(z)/z.",
  sol:R`<p>$Y + 2(z^{-1}Y - 1) = \dfrac{z}{z-3} \Rightarrow Y\dfrac{z+2}{z} = \dfrac{3z-6}{z-3}$</p>
  <p>$\dfrac{Y}{z} = \dfrac{3z-6}{(z+2)(z-3)} = \dfrac{12/5}{z+2} + \dfrac{3/5}{z-3}$</p>
  <p>$$y[n] = \frac{12}{5}(-2)^n + \frac35(3)^n$$</p>`,
  ans:"y[n] = (12/5)(−2)ⁿ + (3/5)3ⁿ", prov:"Follows the posted worked solution."},
 {src:"Z Tutorial Q2", see:[4,6], q:R`Solve $y_n - y_{n-1} - 6y_{n-2} = 0$ with $y[-1] = 1$, $y[-2] = -2$.`,
  hint:"Both delays carry initial-condition terms: z⁻¹Y + 1 and z⁻²Y + z⁻¹ − 2.",
  sol:R`<p>$Y - (z^{-1}Y + 1) - 6(z^{-2}Y + z^{-1} - 2) = 0 \Rightarrow Y(1 - z^{-1} - 6z^{-2}) = 6z^{-1} - 11$</p>
  <p>$Y = \dfrac{z(6 - 11z)}{(z-3)(z+2)}$, $\dfrac{Y}{z} = -\dfrac{27/5}{z-3} - \dfrac{28/5}{z+2}$</p>
  <p>$$y[n] = -\frac{27}{5}3^n - \frac{28}{5}(-2)^n$$</p>`,
  ans:"y[n] = −(27/5)3ⁿ − (28/5)(−2)ⁿ", prov:"Follows the posted worked solution."},
 {src:"Z Tutorial Q3", see:[4,6], q:R`Solve $y_n - 6y_{n-1} + 9y_{n-2} = 0$ with $y[-1] = -1$, $y[-2] = -1$.`,
  hint:"(z − 3)² is repeated: use A/(z−3) + B/(z−3)² for Y(z)/z, and rz/(z−r)² ↔ n rⁿ.",
  sol:R`<p>$Y = \dfrac{z(3z+9)}{(z-3)^2}$; $\dfrac{3z+9}{(z-3)^2} = \dfrac{3}{z-3} + \dfrac{18}{(z-3)^2}$</p>
  <p>$Y = 3\dfrac{z}{z-3} + 6\dfrac{3z}{(z-3)^2} \Rightarrow y[n] = (3 + 6n)3^n$</p>`,
  ans:"y[n] = (3 + 6n)3ⁿ", prov:"Follows the posted worked solution."},
 {src:"Z Tutorial Q5", see:[4,6], q:R`Solve $y_n - 4y_{n-1} = u[n-1](-3)^{n-1}$ with $y[-1] = -1$.`,
  hint:"The delayed input transforms to z⁻¹·z/(z+3) = 1/(z+3).",
  sol:R`<p>$Y - 4(z^{-1}Y - 1) = \dfrac{1}{z+3} \Rightarrow Y = \dfrac{z(-4z-11)}{(z-4)(z+3)}$</p>
  <p>$\dfrac{Y}{z} = -\dfrac{27/7}{z-4} - \dfrac{1/7}{z+3}$ so $y[n] = -\dfrac{27}{7}4^n - \dfrac17(-3)^n$</p>`,
  ans:"y[n] = −(27/7)4ⁿ − (1/7)(−3)ⁿ", prov:"Follows the posted worked solution."},
 {src:"Class Test 1 Q1(ii)", see:[4], q:R`For $q[n] - 2q[n-1] - 3q[n-2] = 0$ with $q[-1] = 1$, $q[-2] = -2$, find $Q(z)$ as a single fraction.`,
  hint:"Collect Q(z) terms, then multiply through by z².",
  sol:R`<p>$Q - 2(z^{-1}Q + 1) - 3(z^{-2}Q + z^{-1} - 2) = 0 \Rightarrow Q(1 - 2z^{-1} - 3z^{-2}) = 3z^{-1} - 4$</p>
  <p>$$Q(z) = \frac{-4z^2 + 3z}{(z-3)(z+1)}$$</p>`,
  ans:"(−4z² + 3z)/((z − 3)(z + 1))", prov:"Follows the posted Class Test 1 solution."},
 {src:"Lecture example (2023 Q2(a))", see:[3,5], q:R`$y[n] = ay[n-1] + by[n-2] + x[n] - x[n-2]$ with $y[n] = 0$ for $n<0$. The unit step response gives $y[0] = 1$, $y[1] = 0.2$, $y[2] = -0.31$. Find $a$ and $b$ and the transfer function.`,
  hint:"For a step, x[n] = 1 for n ≥ 0 and 0 before. Use n = 1 first (only a is unknown).",
  sol:R`<p>$n=1$: $0.2 = a(1) + b(0) + 1 - 0 \Rightarrow a = -0.8$.</p>
  <p>$n=2$: $-0.31 = -0.8(0.2) + b(1) + 1 - 1 \Rightarrow b = -0.15$.</p>
  <p>$y[n] = -0.8y[n-1] - 0.15y[n-2] + x[n] - x[n-2]$, so</p>
  <p>$$H(z) = \frac{1 - z^{-2}}{1 + 0.8z^{-1} + 0.15z^{-2}} = \frac{z^2 - 1}{z^2 + 0.8z + 0.15}$$</p>`,
  ans:"a = −0.8, b = −0.15", prov:"From the worked example in the Z transform refresher. (The slides write −0.81 in the final equation; with a = −0.8 the numbers check out.)"},
 {src:"Z Additional Q5 (2025/26 exam)", see:[5,6], q:R`$y[n] = -0.9y[n-1] - 0.2y[n-2] + x[n-2]$. Find $H(z)$ and the unit step response.`,
  hint:"Denominator z² + 0.9z + 0.2 = (z + 0.4)(z + 0.5). Three poles in Y(z)/z including z = 1.",
  sol:R`<p>$H(z) = \dfrac{z^{-2}}{1 + 0.9z^{-1} + 0.2z^{-2}} = \dfrac{1}{z^2 + 0.9z + 0.2}$</p>
  <p>$\dfrac{Y}{z} = \dfrac{1}{(z-1)(z+0.4)(z+0.5)} = \dfrac{10/21}{z-1} - \dfrac{50/7}{z+0.4} + \dfrac{20/3}{z+0.5}$</p>
  <p>$$y[n] = \frac{10}{21} - \frac{50}{7}(-0.4)^n + \frac{20}{3}(-0.5)^n$$</p>`,
  ans:"y[n] = 10/21 − (50/7)(−0.4)ⁿ + (20/3)(−0.5)ⁿ", prov:"Follows the posted worked solution."}
],
traps: [
 "Expand Y(z)/z, not Y(z), then multiply back by z.",
 "Initial conditions: Z{y[n−2]} = z⁻²Y + z⁻¹y[−1] + y[−2]. Don't drop the z⁻¹y[−1] term.",
 "A delayed input x[n−1]u[n−1] adds no initial-condition term: it's just z⁻¹X(z).",
 "Write the transfer function in positive powers of z before finding poles.",
 "Unit step in z is z/(z−1), not 1/(z−1)."
]
});

T.topics.push({
id: "tfcircuits", part: "Modelling", title: "Transfer Functions & Electrical Circuits",
lectures: "Lecture 1 – Mathematical Models: Electronic Circuits", status: "lectured",
summary: "What a transfer function is, how to get one from a differential equation or straight from a circuit using impedances, converting back to a differential equation, and identifying low/high/band-pass and notch filters with s = jω.",
theory: R`
<h3>0. Transfer functions</h3>
<p>The <b>transfer function</b> is the ratio of the Laplace transform of the output to that of the input, <b>with all initial conditions zero</b>. It only exists for linear time-invariant (LTI) systems.</p>
$$G(s) = \frac{Y(s)}{U(s)} = \frac{\text{Num}(s)}{\text{Den}(s)}$$
<p>Den($s$) is the <b>characteristic polynomial</b>. From $G(s)$ you can get stability, transient behaviour (rise, settling, overshoot), the steady state (FVT) and the frequency response ($s = j\omega$), without knowing the input in advance.</p>

<h3>1. From a differential equation and back</h3>
<p>Each $d^n/dt^n$ becomes $s^n$ (zero ICs). $\dddot y + 3\ddot y + 5\dot y + y = \dddot x + 4\ddot x + 6\dot x + 8x$ gives</p>
$$\frac{Y}{X} = \frac{s^3+4s^2+6s+8}{s^3+3s^2+5s+1}$$
<p>Backwards: cross-multiply and read off the derivatives. $\dfrac{Q}{U} = \dfrac{s+3}{s^3+11s^2+12s+18}$ gives $\dddot q + 11\ddot q + 12\dot q + 18q = \dot u + 3u$.</p>

<h3>2. Impedances</h3>
<div class="tbl"><table class="data">
<tr><th>Component</th><th>Physical law</th><th>Impedance $Z(s)$</th></tr>
<tr><td>Resistor</td><td>$v = iR$</td><td>$R$</td></tr>
<tr><td>Inductor</td><td>$v = L\,di/dt$</td><td>$sL$</td></tr>
<tr><td>Capacitor</td><td>$i = C\,dv/dt$</td><td>$\dfrac{1}{sC}$</td></tr>
</table></div>
<p>Steps: (1) replace components by impedances (ideal parts); (2) define currents/voltages; (3) KVL/KCL, voltage divider, series/parallel combination; (4) solve <b>for what was asked</b>.</p>

<h3>3. Series RLC (output across C)</h3>
$$\frac{V_o}{V_i} = \frac{1/sC}{sL + R + 1/sC} = \frac{1}{LCs^2 + RCs + 1} = \frac{1/LC}{s^2 + \frac{R}{L}s + \frac{1}{LC}}$$
<p>The direct ODE route gives the same: $v_{in} = LC\ddot v_c + RC\dot v_c + v_c$.</p>
<p><b>Second lecture example</b> (R in series, then C ∥ L ∥ R): $Z_p = \dfrac{sLR}{s^2LCR + sL + R}$, and the divider gives a band-pass</p>
$$G(s) = \frac{s/RC}{s^2 + s\frac{2}{RC} + \frac{1}{LC}}$$

<h3>4. Filters from $s = j\omega$</h3>
<p>Check $|H|$ at $\omega \to 0$ and $\omega \to \infty$ (and at the centre frequency if needed):</p>
<div class="tbl"><table class="data">
<tr><th>Type</th><th>$\omega \to 0$</th><th>$\omega\to\infty$</th><th>Example</th></tr>
<tr><td>Low-pass</td><td>passes</td><td>0</td><td>$\dfrac{9}{s^2+4.24s+9}$, RC (output across C), LR (output across R)</td></tr>
<tr><td>High-pass</td><td>0</td><td>passes</td><td>$\dfrac{s^2}{s^2+4.24s+9}$, CR (output across R), RL (output across L)</td></tr>
<tr><td>Band-pass</td><td>0</td><td>0</td><td>$\dfrac{1.21s}{s^2+1.21s+9}$ (peak 1 at ω = 3)</td></tr>
<tr><td>Notch</td><td>passes</td><td>passes</td><td>$\dfrac{s^2+9}{s^2+4.24s+9}$ (zero at ω = 3)</td></tr>
</table></div>
<p>The series RLC above is a low-pass with a resonant peak: unity gain at low frequency, amplified near resonance, attenuated and phase-inverted at high frequency.</p>

<h3>5. Why not always use the ODE</h3>
<p>For multi-loop circuits, eliminating internal variables in the time domain is messy (you end up with derivatives of intermediate voltages). Working with impedances in the $s$-domain is far quicker. The lecturer's preferred long-run method is state space (later).</p>`,
formulas: [
 {name:"Transfer function", tex:R`G(s) = \frac{Y(s)}{U(s)}\ \text{(zero ICs)}`},
 {name:"Impedances", tex:R`Z_R = R,\ Z_L = sL,\ Z_C = \frac{1}{sC}`},
 {name:"Voltage divider", tex:R`V_o = V_i\frac{Z_{out}}{Z_{total}}`},
 {name:"Series RLC across C", tex:R`\frac{V_o}{V_i} = \frac{1}{LCs^2+RCs+1}`},
 {name:"Parallel RLC impedance", tex:R`Z = \frac{RLs}{RLCs^2 + Ls + R}`},
 {name:"Frequency response", tex:R`H(j\omega) = H(s)|_{s=j\omega}`}
],
questions: [
 {src:"Tutorial 2 Q1", see:[1], q:R`Find the transfer function for $\dddot y + 3\ddot y + 5\dot y + y = \dddot x + 4\ddot x + 6\dot x + 8x$.`,
  hint:"Replace each derivative by a power of s with zero initial conditions.",
  sol:R`<p>$(s^3 + 3s^2 + 5s + 1)Y = (s^3 + 4s^2 + 6s + 8)X$</p><p>$$\frac{Y}{X} = \frac{s^3+4s^2+6s+8}{s^3+3s^2+5s+1}$$</p>`,
  ans:"(s³+4s²+6s+8)/(s³+3s²+5s+1)", prov:"Follows the posted solution."},
 {src:"Tutorial 2 Q2", see:[1], q:R`Find the differential equations for (a) $\dfrac{X}{F} = \dfrac{7}{s^2+5s+10}$ and (b) $\dfrac{Q}{U} = \dfrac{s+3}{s^3+11s^2+12s+18}$.`,
  hint:"Cross-multiply, then each sⁿ becomes an nth derivative.",
  sol:R`<p>(a) $\ddot x + 5\dot x + 10x = 7f(t)$</p><p>(b) $\dddot q + 11\ddot q + 12\dot q + 18q = \dot u + 3u$</p>`,
  ans:"(a) ẍ+5ẋ+10x = 7f; (b) q⃛+11q̈+12q̇+18q = u̇+3u", prov:"Follows the posted solution."},
 {src:"Tutorial 2 Q3", see:[1], q:R`Write the differential equation equivalent to the block $\dfrac{C(s)}{R(s)} = \dfrac{s^4+3s^3+2s^2+s+1}{s^5+4s^4+3s^3+2s^2+3s+2}$ with $r(t) = 3t^3$.`,
  hint:"Cross-multiply as usual. Then you can evaluate the right-hand side derivatives of 3t³.",
  sol:R`<p>$c^{(5)} + 4c^{(4)} + 3\dddot c + 2\ddot c + 3\dot c + 2c = r^{(4)} + 3\dddot r + 2\ddot r + \dot r + r$</p>
  <p>With $r = 3t^3$: $\dot r = 9t^2$, $\ddot r = 18t$, $\dddot r = 18$, $r^{(4)} = 0$, so the right-hand side is $3t^3 + 9t^2 + 36t + 54$.</p>`,
  ans:"RHS = 3t³ + 9t² + 36t + 54", prov:"Follows the posted solution; Claude evaluated the right-hand side for r = 3t³."},
 {src:"Tutorial 2 Q4", fig:"ssc_q4", see:[2,4], q:R`For each first-order circuit (a) RC with output across C, (b) CR with output across R, (c) LR with output across R, (d) RL with output across L, find $V_o/V_{in}$ and the filter type.`,
  hint:"Voltage divider with impedances. Then test s → 0 and s → ∞.",
  sol:R`<p>(a) $\dfrac{1}{RCs+1}$: <b>low-pass</b>. (b) $\dfrac{RCs}{RCs+1}$: <b>high-pass</b>.</p>
  <p>(c) $\dfrac{R}{sL+R} = \dfrac{R/L}{s+R/L}$: <b>low-pass</b>. (d) $\dfrac{sL}{sL+R} = \dfrac{s}{s+R/L}$: <b>high-pass</b>.</p>`,
  ans:"(a) LP, (b) HP, (c) LP, (d) HP", prov:"Follows the posted solution."},
 {src:"Tutorial 2 Q5", fig:"ssc_q5", see:[2,3], q:R`Find (a) $V_o/V_{in}$ for series R–L–C with output across C; (b) $V_o/I_{in}$ for a current source feeding R ∥ L ∥ C; (c) $V_o/V_{in}$ for L in series feeding C ∥ R.`,
  hint:"(b) is just the parallel impedance. (c) is a divider with Z_L on top and C ∥ R below.",
  sol:R`<p>(a) $\dfrac{1}{LCs^2 + RCs + 1}$</p>
  <p>(b) $\dfrac{1}{Z} = \dfrac1R + \dfrac{1}{sL} + sC \Rightarrow \dfrac{V_o}{I_{in}} = \dfrac{RLs}{RLCs^2 + Ls + R}$</p>
  <p>(c) $Z_\parallel = \dfrac{R}{RCs+1}$, so $\dfrac{V_o}{V_{in}} = \dfrac{R}{RLCs^2 + Ls + R}$</p>`,
  ans:"(a) 1/(LCs²+RCs+1); (b) RLs/(RLCs²+Ls+R); (c) R/(RLCs²+Ls+R)", prov:"Follows the posted solution (one page of it has a slip ending '+1' in (c); the impedance method gives +R)."},
 {src:"Laplace Tutorial Q8", see:[4], q:R`Classify each as low-pass, high-pass, band-pass or notch: (1) $\dfrac{9}{s^2+4.24s+9}$, (2) $\dfrac{s^2}{s^2+4.24s+9}$, (3) $\dfrac{1.21s}{s^2+1.21s+9}$, (4) $\dfrac{s^2+9}{s^2+4.24s+9}$.`,
  hint:"Evaluate at s = 0 and s → ∞. For (3) and (4) also try ω = 3 (s² = −9).",
  sol:R`<p>(1) $H(0)=1$, $H(\infty)=0$: low-pass. (2) $0 \to 1$: high-pass.</p>
  <p>(3) 0 at both ends; at $\omega = 3$: $\dfrac{1.21(3j)}{-9 + 1.21(3j) + 9} = 1$: band-pass.</p>
  <p>(4) 1 at both ends; zero at $\omega = 3$: notch (band-stop).</p>`,
  ans:"LP, HP, BP, notch", prov:"Follows the posted worked solution."},
 {src:"Class Test 1 Q4", see:[4], q:R`For $H(s) = \dfrac{s^2}{s^2 + 50s + 625}$, evaluate $|H(j\omega)|$ at $\omega = 0$, 25 rad/s and $\omega\to\infty$, and identify the filter.`,
  hint:"At ω = 25, 625 − ω² = 0.",
  sol:R`<p>$H(j\omega) = \dfrac{-\omega^2}{(625-\omega^2) + j50\omega}$</p>
  <p>$\omega=0$: 0. $\omega=25$: $\dfrac{-625}{j1250}$, magnitude 0.5. $\omega\to\infty$: 1.</p>
  <p>Zero at DC rising to unity: <b>high-pass</b>.</p>`,
  ans:"0, 0.5, 1: high-pass", prov:"Follows the posted Class Test 1 solution."}
],
traps: [
 "Transfer functions assume zero initial conditions.",
 "Capacitor impedance is 1/(sC), not sC.",
 "Check which component the output is across: the same parts give LP or HP depending on it.",
 "Answer what was asked: V_o/V_in vs V_o/I_in are different things.",
 "Normalise to standard form (leading s² coefficient 1) before reading off ω_n and ζ."
]
});

T.topics.push({
id: "translational", part: "Modelling", title: "Translational Mechanical Systems",
lectures: "Lecture 1 – Mathematical Models: Translational Mechanical Systems", status: "lectured",
summary: "Mass, spring and damper force laws, why gravity drops out when measuring from equilibrium, free-body diagrams with D'Alembert's inertia force, and multi-mass systems solved as simultaneous equations in s.",
theory: R`
<h3>0. Element laws</h3>
<div class="tbl"><table class="data">
<tr><th>Element</th><th>Force (displacement)</th><th>Laplace</th></tr>
<tr><td>Spring $K$</td><td>$f = Kx$</td><td>$K$</td></tr>
<tr><td>Viscous damper $B$ (or $f_v$)</td><td>$f = B\dot x$</td><td>$Bs$</td></tr>
<tr><td>Mass $M$</td><td>$f = M\ddot x$</td><td>$Ms^2$</td></tr>
</table></div>
<p>Choose the positive direction of $x$ once and stick to it, just like choosing a current direction.</p>

<h3>1. Gravity disappears from equilibrium</h3>
<p>Hang $M$ on $K$ and $B$: it settles where $Mg = Kx_{static}$. Push it a further $x$ with $f(t)$:</p>
$$f + Mg - K(x_{static} + x) - B\dot x = M\ddot x \ \Rightarrow\ M\ddot x + B\dot x + Kx = f(t)$$
<p>Measuring from equilibrium absorbs gravity into the spring's pre-load.</p>

<h3>2. Free-body diagrams (D'Alembert)</h3>
<p>Draw the applied force one way and the resisting forces $Kx$, $B\dot x$ and the <b>inertial reaction</b> $M\ddot x$ the other way, then set (sum one way) = (sum the other way). For one mass:</p>
$$\frac{X(s)}{F(s)} = \frac{1}{Ms^2 + Bs + K}$$
<p>This looks exactly like a circuit transfer function: the hard part in mechanics is the FBD, not the algebra.</p>

<h3>3. Two (or more) masses</h3>
<p>Write one equation per mass. For each mass, consider in turn (a) it moves while the others are held, giving its own "self" terms, and (b) each neighbour moves while it is held, giving coupling terms on the other side:</p>
$$[\text{sum of impedances connected to mass } i]\,X_i - [\text{impedances shared with } j]\,X_j = \text{applied force on } i$$
<p>Lecture system ($M$ on top with force $f$, coupled to $m$ through $K$, $B$; $m$ also on $K_t$, $B_t$ to ground):</p>
$$(Ms^2+Bs+K)X_1 - (Bs+K)X_2 = F$$
$$-(Bs+K)X_1 + (ms^2 + (B+B_t)s + K + K_t)X_2 = 0$$
<p>Eliminate the unwanted displacement and solve for the one asked for:</p>
$$\frac{X_1}{F} = \frac{ms^2 + (B_t+B)s + K_t+K}{(Ms^2+Bs+K)(ms^2+(B_t+B)s+K_t+K) - (Bs+K)^2}$$
<p>With $m=1$, $M=5$, $B=2$, $B_t=3$, $K=10$, $K_t=15$: $\dfrac{X_1}{F} = \dfrac{s^2+5s+25}{5s^4+27s^3+141s^2+60s+150}$.</p>
<div class="callout">The slide prints 145s² for that example; expanding the brackets gives 141s².</div>

<h3>4. Massless nodes</h3>
<p>Where a spring meets a damper with no mass between them (like $y(t)$ in Tutorial 2 Q9), write a force balance at that point with mass zero. It gives a first-order equation linking the node to its neighbours.</p>`,
formulas: [
 {name:"Single mass", tex:R`\frac{X}{F} = \frac{1}{Ms^2+Bs+K}`},
 {name:"Spring / damper / mass", tex:R`K,\quad Bs,\quad Ms^2`},
 {name:"Equilibrium", tex:R`Mg = Kx_{static}`},
 {name:"Coupled pattern", tex:R`\Big(\sum Z_{i}\Big)X_i - Z_{ij}X_j = F_i`}
],
questions: [
 {src:"Tutorial 2 Q6", fig:"ssc_q6", see:[2], q:R`A 5 kg mass is attached to a wall by a 3 N/m spring and a 1 N·s/m damper and pushed by $f(t)$. Find $X_1/F$.`,
  hint:"One mass: Ms² + Bs + K.",
  sol:R`<p>$5\ddot x + \dot x + 3x = f \Rightarrow \dfrac{X_1}{F} = \dfrac{1}{5s^2 + s + 3}$</p>`,
  ans:"1/(5s² + s + 3)", prov:"Follows the posted solution."},
 {src:"Tutorial 2 Q7", fig:"ssc_q7", see:[3], q:R`Two 1 kg blocks on a frictionless surface are joined by a 1 N/m spring and 1 N·s/m damper. The force acts on the first. Find $X_2/F$.`,
  hint:"Mass 1: (s²+s+1)X₁ − (s+1)X₂ = F. Mass 2: (s²+s+1)X₂ = (s+1)X₁.",
  sol:R`<p>From mass 2: $X_1 = \dfrac{s^2+s+1}{s+1}X_2$.</p>
  <p>Into mass 1: $\dfrac{(s^2+s+1)^2 - (s+1)^2}{s+1}X_2 = F$, and $(s^2+s+1)^2 - (s+1)^2 = s^4 + 2s^3 + 2s^2$.</p>
  <p>$$\frac{X_2}{F} = \frac{s+1}{s^2(s^2+2s+2)}$$</p>`,
  ans:"(s+1)/(s²(s²+2s+2))", prov:"Follows the posted solution; checked in code."},
 {src:"Tutorial 2 Q8", fig:"ssc_q8", see:[3], q:R`Three 4 kg blocks as in the figure (springs 6 N/m, dampers 2 N·s/m), force on the middle block. Find $X_3/F$.`,
  hint:"Three equations: (4s²+2s+6)X₁ = 2sX₂; (4s²+4s+6)X₂ = F + 2sX₁ + 6X₃; (4s²+2s+6)X₃ = 6X₂.",
  sol:R`<p>$X_1 = \dfrac{2s}{4s^2+2s+6}X_2$ and $X_2 = \dfrac{4s^2+2s+6}{6}X_3$.</p>
  <p>Substitute into the middle equation and simplify:</p>
  <p>$$\frac{X_3}{F} = \frac{3}{8s^4 + 12s^3 + 26s^2 + 18s}$$</p>`,
  ans:"3/(8s⁴+12s³+26s²+18s)", prov:"Follows the posted solution; checked in code."},
 {src:"Tutorial 2 Q9", fig:"ssc_q9", see:[4,3], q:R`Mass $M$ (force $f$) is joined by $K_1$ to a massless point $y$, which is held to the wall by damper $B$ and spring $K_2$ in parallel. Show $\dfrac{Y}{F} = \dfrac{K_1/MB}{s^3 + \frac{K_1+K_2}{B}s^2 + \frac{K_1}{M}s + \frac{K_1K_2}{MB}}$.`,
  hint:"Node y (mass 0): By' + (K₁+K₂)y = K₁x. Mass: Mẍ + K₁(x − y) = f.",
  sol:R`<p>Node: $[Bs + K_1 + K_2]Y = K_1X \Rightarrow X = \dfrac{Bs + K_1 + K_2}{K_1}Y$.</p>
  <p>Mass: $(Ms^2 + K_1)X - K_1Y = F$. Substitute:</p>
  <p>$[MBs^3 + M(K_1+K_2)s^2 + BK_1s + K_1K_2]Y = K_1F$</p>
  <p>Divide by $MB$ to get the result.</p>`,
  ans:"As stated", prov:"Follows the posted solution."}
],
traps: [
 "Measure displacement from static equilibrium; then don't add mg.",
 "Coupling terms appear with the opposite sign: −(Bs+K)X₂ in mass 1's equation.",
 "A damper or spring between two masses acts on the RELATIVE motion (x₁ − x₂).",
 "Massless nodes still need an equation: force balance with zero inertia.",
 "Expand the cross-multiplied polynomial carefully. Even the lecture slide slips here."
]
});

T.topics.push({
id: "rotational", part: "Modelling", title: "Rotational Mechanical Systems & Gears",
lectures: "Lecture 1 – Mathematical Models: Rotational Mechanical Systems", status: "lectured",
summary: "Torque laws for inertia, rotational damping and torsional springs, two-inertia shafts, and ideal gear trains: angle and torque ratios and reflecting the load through the gears.",
theory: R`
<h3>0. Element laws</h3>
<p>Rotational systems work exactly like translational ones: torque replaces force, angle replaces displacement.</p>
<div class="tbl"><table class="data">
<tr><th>Element</th><th>Torque</th><th>Laplace</th></tr>
<tr><td>Torsional spring $K$</td><td>$K\theta$</td><td>$K$</td></tr>
<tr><td>Rotational damper $D$</td><td>$D\dot\theta$</td><td>$Ds$</td></tr>
<tr><td>Inertia $J$</td><td>$J\ddot\theta$</td><td>$Js^2$</td></tr>
</table></div>

<h3>1. Two inertias on a flexible shaft</h3>
<p>Model the shaft's torsion as one spring $K$ between $J_1$ (bearing damping $D_1$, torque $T$) and $J_2$ (bearing damping $D_2$). FBDs as before: fix $J_2$ and twist $J_1$, then fix $J_1$ and twist $J_2$:</p>
$$T = J_1\ddot\theta_1 + D_1\dot\theta_1 + K(\theta_1 - \theta_2)$$
$$0 = J_2\ddot\theta_2 + D_2\dot\theta_2 + K(\theta_2 - \theta_1)$$
<p>Lecture numbers $J_1=1$, $J_2=0.5$, $D_1=0.1$, $D_2=0.05$, $K=1$: from the second, $\theta_1 = (0.5s^2 + 0.05s + 1)\theta_2$; substituting,</p>
$$\frac{\theta_2}{T} = \frac{1}{0.5s^4 + 0.1s^3 + 1.505s^2 + 0.15s}$$

<h3>2. Ideal gears</h3>
<p>Arc length at the contact is shared: $r_1\theta_1 = r_2\theta_2$, and with no losses energy is shared: $T_1\theta_1 = T_2\theta_2$.</p>
$$\frac{\theta_2}{\theta_1} = \frac{r_1}{r_2} = \frac{N_1}{N_2},\qquad \frac{T_2}{T_1} = \frac{N_2}{N_1}$$
<p>The torque ratio is the inverse of the angle ratio: the big gear turns slower with more torque.</p>

<h3>3. Gear example (lecture)</h3>
<p>Input $T_1$ on gear $N_1$; gear $N_2$ drives $J$ with damper $D$ and spring $K$ to ground:</p>
<ol class="steps">
<li>Load: $(Js^2 + Ds + K)\theta_2 = T_2$.</li>
<li>Gears: $T_2 = \frac{N_2}{N_1}T_1$, $\theta_1 = \frac{N_2}{N_1}\theta_2$.</li>
<li>$\dfrac{\theta_2}{T_1} = \dfrac{N_2/N_1}{Js^2 + Ds + K}$ and $\dfrac{\theta_1}{T_1} = \dfrac{(N_2/N_1)^2}{Js^2 + Ds + K}$.</li>
</ol>
<p>Real gears have backlash and are non-linear; this module assumes ideal linear gears.</p>`,
formulas: [
 {name:"Torques", tex:R`T = J\ddot\theta + D\dot\theta + K\theta`},
 {name:"Gear angles", tex:R`\frac{\theta_2}{\theta_1} = \frac{N_1}{N_2}`},
 {name:"Gear torques", tex:R`\frac{T_2}{T_1} = \frac{N_2}{N_1}`},
 {name:"Geared load", tex:R`\frac{\theta_2}{T_1} = \frac{N_2/N_1}{Js^2+Ds+K}`}
],
questions: [
 {src:"Tutorial 2 Q10", fig:"ssc_q10", see:[1], q:R`Write the equations of motion: $J_1 = 5$ kg·m² with 8 N·m·s/rad to ground; $J_2 = 3$ kg·m² with 3 N·m/rad to ground and torque $T$; between them a 9 N·m/rad spring and 1 N·m·s/rad damper in parallel.`,
  hint:"Self terms: everything attached to that inertia. Coupling: the shared spring and damper.",
  sol:R`<p>$J_1$: $5\ddot\theta_1 + 9\dot\theta_1 + 9\theta_1 = \dot\theta_2 + 9\theta_2$</p>
  <p>$J_2$: $3\ddot\theta_2 + \dot\theta_2 + 12\theta_2 = T + \dot\theta_1 + 9\theta_1$</p>`,
  ans:"5θ̈₁+9θ̇₁+9θ₁ = θ̇₂+9θ₂;  3θ̈₂+θ̇₂+12θ₂ = T+θ̇₁+9θ₁", prov:"Follows the posted solution."},
 {src:"Tutorial 2 Q11", fig:"ssc_q11", see:[1], q:R`Find $\theta_2/T$ for the system in the figure (1 kg·m² inertia with 1 N·m·s/rad to ground; a 1 N·m/rad spring ∥ 1 N·m·s/rad damper to the massless point θ₂, which has 1 N·m·s/rad to the wall).`,
  hint:"θ₂ is a massless node: (s+1)θ₁ = (2s+1)θ₂.",
  sol:R`<p>Inertia: $(s^2 + 2s + 1)\theta_1 - (s+1)\theta_2 = T$.</p>
  <p>Node: $(s+1)\theta_1 = (2s+1)\theta_2 \Rightarrow \theta_1 = \dfrac{2s+1}{s+1}\theta_2$.</p>
  <p>$(s+1)(2s+1)\theta_2 - (s+1)\theta_2 = T \Rightarrow \dfrac{\theta_2}{T} = \dfrac{1}{2s^2 + 2s}$</p>`,
  ans:"1/(2s² + 2s)", prov:"Follows the posted solution; checked in code."},
 {src:"Tutorial 2 Q12", fig:"ssc_q12", see:[2,3,1], q:R`Torque $F(t)$ drives gear $N_1 = 10$ meshing with $N_2 = 20$ on the shaft of $J_2 = 2$ kg·m². A 2 N·m·s/rad damper couples $J_2$ to $J_3 = 4$ kg·m², which has an 8 N·m/rad spring and 4 N·m·s/rad damper to ground. Find $\theta_3/F$.`,
  hint:"Torque on the N₂ shaft is (N₂/N₁)F = 2F. Then two coupled inertias.",
  sol:R`<p>$J_2$: $(2s^2 + 2s)\theta_2 - 2s\theta_3 = 2F$.</p>
  <p>$J_3$: $(4s^2 + 6s + 8)\theta_3 - 2s\theta_2 = 0 \Rightarrow \theta_2 = \dfrac{4s^2+6s+8}{2s}\theta_3$.</p>
  <p>$(s+1)(4s^2+6s+8)\theta_3 - 2s\theta_3 = 2F \Rightarrow (4s^3 + 10s^2 + 12s + 8)\theta_3 = 2F$</p>
  <p>$$\frac{\theta_3}{F} = \frac{1}{2s^3 + 5s^2 + 6s + 4}$$</p>`,
  ans:"1/(2s³ + 5s² + 6s + 4)", prov:"Worked by Claude (gears and input shaft taken as massless) and checked in code. The posted solution doesn't cover this question."}
],
traps: [
 "Torque ratio is N₂/N₁ but angle ratio is N₁/N₂. They're inverses.",
 "Shared springs/dampers act on (θ₁ − θ₂): include the coupling term with a minus sign.",
 "A point between a spring and damper with no inertia is still a node with its own equation.",
 "When reflecting through gears, check which shaft the question's input and output are on."
]
});
})();
