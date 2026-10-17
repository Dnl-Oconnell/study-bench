/* EEN1020 — properties of transfer functions: stability, IVT/FVT, first and second order response */
(function(){
const R = String.raw;
const T = STUDY.content.ssc = STUDY.content.ssc || { topics: [] };

T.topics.push({
id: "ctstab", part: "Transfer function properties", title: "Poles, Zeros & Continuous-Time Stability",
lectures: "Lecture 3 – Continuous-Time Stability", status: "lectured",
summary: "Asymptotic and BIBO stability, why pole locations decide everything, real vs complex vs imaginary-axis poles, pole-zero maps, and stability ranges for a parameter.",
theory: R`
<h3>0. Three things to know about any system</h3>
<p><b>Stability</b>, the <b>transient response</b> (the part before it settles) and the <b>steady-state response</b>. Standard test inputs (impulse, step, ramp, parabola) let us compare systems.</p>

<h3>1. Two definitions</h3>
<ul>
<li><b>Asymptotic stability</b> (zero input, non-zero initial state): every state decays to zero, $\lim_{t\to\infty}x(t) = 0$. Condition: all poles have $\text{Re}(p_i) < 0$.</li>
<li><b>BIBO stability</b> (zero initial state): every bounded input gives a bounded output. Condition: $\int_0^\infty |h(t)|\,dt < \infty$, i.e. all poles of $H(s)$ satisfy $\text{Re}(p_i) < 0$.</li>
</ul>

<h3>2. Why poles decide</h3>
<p>Partial fractions turn $G(s)$ into a sum of terms $A/(s-p_i)$, i.e. $g(t) = \sum A_ie^{p_it}$. Each pole contributes $e^{p_it}$:</p>
<div class="tbl"><table class="data">
<tr><th>Pole location</th><th>Term</th><th>Behaviour</th></tr>
<tr><td>Real, negative</td><td>$e^{-at}$</td><td>Decays</td></tr>
<tr><td>Real, positive</td><td>$e^{+at}$</td><td>Grows: unstable</td></tr>
<tr><td>Complex, Re &lt; 0</td><td>$e^{-\sigma t}\sin\omega t$</td><td>Decaying oscillation</td></tr>
<tr><td>Complex, Re &gt; 0</td><td>$e^{+\sigma t}\sin\omega t$</td><td>Growing oscillation</td></tr>
<tr><td>On the jω axis (single)</td><td>$\sin\omega t$</td><td>Sustained oscillation: marginally stable</td></tr>
<tr><td>Repeated on the jω axis</td><td>$t\sin\omega t$</td><td>Grows: unstable</td></tr>
</table></div>
<p>Examples from the lecture: $\dfrac{10}{(s+3)(s+5)} \to 5e^{-3t} - 5e^{-5t}$ (stable); $\dfrac{10}{(s+3)(s-5)} \to 1.25e^{5t} - 1.25e^{-3t}$ (unstable); $\dfrac{20}{(s+1)^2+16} \to 5e^{-t}\sin 4t$; $\dfrac{40s}{(s^2+16)^2} \to 5t\sin 4t$.</p>
<div class="callout key"><b>Rule:</b> stable if and only if <b>all poles are in the open left-half s-plane</b>. Any pole in the right half (or repeated on the axis) means unstable. A plot alone can't prove stability.</div>

<h3>3. Poles and zeros</h3>
<ul>
<li><b>Zero</b>: a value of $s$ making $G(s) = 0$ (root of the numerator), drawn as O.</li>
<li><b>Pole</b>: a value of $s$ making $G(s) \to \infty$ (root of the denominator), drawn as X.</li>
</ul>
<p>Only poles decide stability. A right-half-plane zero does <b>not</b> make a system unstable. Zeros do change the shape of the transient. Example: $G = \dfrac{2(s-2)}{s(s^2+2s+4)}$ has a zero at 2, poles at 0 and $-1 \pm j\sqrt3$.</p>

<h3>4. Stability range of a parameter</h3>
<p>For a second-order characteristic polynomial $s^2 + a_1s + a_0$, both roots are in the LHP if and only if <b>both coefficients are positive</b>. For $s^2 + (k-3)s + (2k+1)$: $k>3$ and $k>-0.5$, so $k>3$.</p>
<p>Oscillation needs complex roots: discriminant $a_1^2 - 4a_0 < 0$.</p>

<h3>5. Closed loop</h3>
<p>For a controller $G_c$ and plant $G$ with unity negative feedback:</p>
$$G_{CL} = \frac{G_cG}{1 + G_cG}$$
<p>(For an inner positive-feedback loop, the denominator is $1 - G$.) Stability of the closed loop comes from the roots of $1 + G_cG = 0$.</p>`,
formulas: [
 {name:"Stability (s-plane)", tex:R`\text{Re}(p_i) < 0\ \ \forall i`},
 {name:"BIBO", tex:R`\int_0^\infty |h(t)|\,dt < \infty`},
 {name:"2nd-order stable", tex:R`s^2 + a_1s + a_0:\ a_1>0,\ a_0>0`},
 {name:"Oscillatory", tex:R`a_1^2 - 4a_0 < 0`},
 {name:"Closed loop", tex:R`G_{CL} = \frac{G_cG}{1+G_cG}`}
],
questions: [
 {src:"Stability Tutorial Q1", see:[2,3], q:R`Find poles, zeros and stability, and describe the step response for: (i) $\dfrac{10(s+4)}{(s+2)(s+6)}$ (ii) $\dfrac{20}{s^2+4s+20}$ (iii) $\dfrac{15}{s^2-2s+10}$ (iv) $\dfrac{5}{s-4}$ (v) $\dfrac{24}{(s^2+9)(s+5)}$ (vi) $\dfrac{s^2+2s+5}{(s+1)(s^2+2s+2)}$.`,
  hint:"Use the quadratic formula on each quadratic; look at the sign of the real parts.",
  sol:R`<div class="tbl"><table class="data"><tr><th></th><th>Poles</th><th>Verdict</th></tr>
  <tr><td>(i)</td><td>−2, −6 (zero −4)</td><td>Stable, overdamped</td></tr>
  <tr><td>(ii)</td><td>−2 ± j4</td><td>Stable, underdamped</td></tr>
  <tr><td>(iii)</td><td>1 ± j3</td><td>Unstable, growing oscillation</td></tr>
  <tr><td>(iv)</td><td>+4</td><td>Unstable, exponential growth</td></tr>
  <tr><td>(v)</td><td>±j3, −5</td><td>Marginally stable, sustained oscillation at 3 rad/s</td></tr>
  <tr><td>(vi)</td><td>−1, −1 ± j (zeros −1 ± j2)</td><td>Stable, underdamped</td></tr></table></div>`,
  ans:"Stable: i, ii, vi; unstable: iii, iv; marginal: v", prov:"Follows the posted worked solution."},
 {src:"Exam 2024 Q2(a)", see:[1,2], q:R`A system has unit-impulse response $h(t) = 3e^{\alpha t}u(t)$. For what values of $\alpha$ is it asymptotically stable?`,
  hint:"H(s) = 3/(s − α): one pole at s = α.",
  sol:R`<p>$H(s) = \dfrac{3}{s-\alpha}$ with a pole at $s = \alpha$. Stable when the pole is in the open LHP: $\alpha < 0$. (Equivalently, $\int_0^\infty 3e^{\alpha t}dt$ is finite only for $\alpha<0$.)</p>`,
  ans:"α < 0", prov:"Follows the posted solution."},
 {src:"Stability Tutorial Q3", see:[4], q:R`For $G(s) = \dfrac{10}{s^2 + (k-3)s + (2k+1)}$, find the range of $k$ for stability.`,
  hint:"Both coefficients of a second-order characteristic polynomial must be positive.",
  sol:R`<p>$k - 3 > 0 \Rightarrow k > 3$; $2k+1 > 0 \Rightarrow k > -0.5$. Both hold for $k > 3$.</p>`,
  ans:"k > 3", prov:"Follows the posted worked solution."},
 {src:"Exam 2024 Q4(b)", see:[5,4], q:R`$X$ → [$K_c$] → summing junction with positive feedback from $Y$ → $\dfrac1s$ → $\dfrac{1}{s+1}$ → $Y$, all inside a unity negative feedback loop. (i) Find $Y/X$. (ii) Minimum $K_c$ for asymptotic stability. (iii) Minimum $K_c$ for stable <i>and</i> oscillatory behaviour.`,
  hint:"Inner positive loop: G/(1 − G). Then close the outer loop.",
  sol:R`<p>Inner: $\dfrac{1/(s(s+1))}{1 - 1/(s(s+1))} = \dfrac{1}{s^2 + s - 1}$.</p>
  <p>Outer: $\dfrac{Y}{X} = \dfrac{K_c}{s^2 + s + (K_c - 1)}$.</p>
  <p>(ii) Need $K_c - 1 > 0$: $K_c > 1$.</p>
  <p>(iii) Oscillatory needs $1 - 4(K_c - 1) < 0$: $K_c > 1.25$.</p>`,
  ans:"K_c/(s²+s+K_c−1); K_c > 1; K_c > 1.25", prov:"Follows the posted solution."},
 {src:"Stability Tutorial Q9", see:[4], q:R`For $G(s) = \dfrac{k}{s^2 + (k-2)s + 9}$ find $k$ for (a) stability, (b) no oscillation, (c) underdamped oscillation, (d) sustained oscillation (and its frequency).`,
  hint:"ω_n = 3, 2ζω_n = k − 2, so ζ = (k − 2)/6.",
  sol:R`<p>(a) $k > 2$. (b) $\zeta \ge 1$: $k \ge 8$. (c) $2 < k < 8$. (d) $k = 2$, poles $\pm j3$, so 3 rad/s.</p>`,
  ans:"k>2; k≥8; 2<k<8; k=2 at 3 rad/s", prov:"Follows the posted worked solution."}
],
traps: [
 "Only POLES decide stability. A right-half-plane zero doesn't make a system unstable.",
 "Poles on the jω axis: single = marginally stable; repeated = unstable.",
 "The 'all coefficients positive' shortcut is exact only for first- and second-order polynomials.",
 "Positive feedback loop: denominator 1 − G, not 1 + G.",
 "A plot that looks settled isn't proof of stability. Check the poles."
]
});

T.topics.push({
id: "dtstab", part: "Transfer function properties", title: "Discrete-Time Stability",
lectures: "Lecture 3 – Discrete-Time Stability", status: "lectured",
summary: "The unit circle replaces the left-half plane: pole magnitude decides stability, pole angle decides oscillation. Real, negative and complex z-poles, marginal stability, and designing a digital gain.",
theory: R`
<h3>0. Poles of H(z)</h3>
<p>$H(z) = \dfrac{Az}{z-\alpha} + \dfrac{Bz}{z-\beta} + \dots \Rightarrow h[n] = A\alpha^n + B\beta^n + \dots$</p>
<ul>
<li>All $|\text{pole}| < 1$: $h[n] \to 0$ (stable).</li>
<li>A single pole with $|\text{pole}| = 1$: bounded, doesn't decay (marginal).</li>
<li>Any $|\text{pole}| > 1$: grows without limit (unstable).</li>
</ul>
<div class="callout key"><b>Rule:</b> a discrete-time system is stable if and only if <b>all poles lie strictly inside the unit circle</b>. Stability depends only on $|z_p|$; oscillation depends only on the angle $\angle z_p$.</div>

<h3>1. What the angle does</h3>
<div class="tbl"><table class="data">
<tr><th>Pole location</th><th>Response</th></tr>
<tr><td>Positive real axis ($\theta = 0$)</td><td>Smooth, monotonic</td></tr>
<tr><td>Negative real axis ($\theta = \pi$)</td><td>Sign flips every sample (Nyquist toggling at $f_s/2$)</td></tr>
<tr><td>Complex pair ($\theta \ne 0, \pi$)</td><td>Sinusoidal at $\theta$ rad/sample, i.e. $\omega = \theta/T_s$</td></tr>
</table></div>
<p>Example: $z/(z+0.8) \to (-0.8)^n = 1, -0.8, 0.64, -0.512, \dots$ Stable, but toggling. A negative real pole appears when continuous complex poles are sampled at exactly half the sampling frequency ($\omega_dT_s = \pi$).</p>

<h3>2. Complex z-poles in polar form</h3>
<p>Write the pair as $re^{\pm j\theta}$: $r$ is the decay per sample, $\theta$ the oscillation per sample. For $z^2 - 1.1314z + 0.64$: $r = 0.8$, $\theta = \pi/4$, $h[n] \propto 0.8^n\sin(n\pi/4)$. For $z^2 - 0.6z + 0.25$: poles $0.3 \pm j0.4$, $r = 0.5$, stable, damped ringing.</p>
<p>Magnitude check: $|a + jb| = \sqrt{a^2+b^2}$. E.g. $-0.635 \pm j0.6378$ has $|z| = 0.9$ (stable); $0.78 \pm j0.7756$ has $|z| = 1.1$ (unstable).</p>

<h3>3. Marginal and repeated poles</h3>
<p>$z^2/(z^2+1)$: poles $\pm j$ on the circle, $h[n] = \cos(n\pi/2)$ forever (marginal). $z^2/(z+1)^2$: repeated pole on the circle gives $(n+1)(-1)^n$, which grows (unstable).</p>

<h3>4. Digital feedback</h3>
<p>Closed loop $T(z) = \dfrac{KG(z)}{1+KG(z)}$; the poles are roots of $1 + KG(z) = 0$. For a second-order $z^2 + a_1z + a_0$, both roots are inside the unit circle if $|a_0| < 1$, $1 + a_1 + a_0 > 0$ and $1 - a_1 + a_0 > 0$.</p>`,
formulas: [
 {name:"Stability (z-plane)", tex:R`|z_p| < 1\ \ \forall p`},
 {name:"Pole mode", tex:R`\frac{z}{z-\alpha} \leftrightarrow \alpha^n`},
 {name:"Polar pole", tex:R`z = re^{\pm j\theta},\ r=\sqrt{a^2+b^2}`},
 {name:"Oscillation frequency", tex:R`\omega = \theta/T_s`},
 {name:"2nd-order inside circle", tex:R`|a_0|<1,\ 1\pm a_1 + a_0 > 0`}
],
questions: [
 {src:"Stability Tutorial Q12", see:[0,1,3], q:R`Classify: (i) $\dfrac{0.4z}{(z-0.6)(z-0.2)}$ (ii) $\dfrac{z}{z+0.8}$ (iii) $\dfrac{z}{z^2-1.2z+0.64}$ (iv) $\dfrac{z^2}{z^2+1}$ (v) $\dfrac{z}{z+1.15}$ (vi) $\dfrac{z+1.2}{(z-0.5)(z+1.8)}$.`,
  hint:"Magnitudes of every pole; angle tells you the shape.",
  sol:R`<div class="tbl"><table class="data"><tr><th></th><th>Poles</th><th>Verdict</th></tr>
  <tr><td>(i)</td><td>0.6, 0.2</td><td>Stable, monotonic</td></tr>
  <tr><td>(ii)</td><td>−0.8</td><td>Stable, Nyquist toggling</td></tr>
  <tr><td>(iii)</td><td>0.6 ± j0.529, |z| = 0.8</td><td>Stable, damped ringing</td></tr>
  <tr><td>(iv)</td><td>±j, |z| = 1</td><td>Marginal, sustained at π/2 rad/sample</td></tr>
  <tr><td>(v)</td><td>−1.15</td><td>Unstable, growing toggling</td></tr>
  <tr><td>(vi)</td><td>0.5, −1.8</td><td>Unstable</td></tr></table></div>`,
  ans:"Stable i–iii; marginal iv; unstable v, vi", prov:"Follows the posted worked solution."},
 {src:"Stability Tutorial Q13", see:[0], q:R`For $H(z) = \dfrac{1}{1 - 0.2z^{-1} - 0.24z^{-2}}$, find the poles and the unit impulse response.`,
  hint:"Multiply top and bottom by z². Then Y(z)/z partial fractions.",
  sol:R`<p>$H = \dfrac{z^2}{(z-0.6)(z+0.4)}$; poles 0.6, −0.4.</p>
  <p>$\dfrac{Y}{z} = \dfrac{0.6}{z-0.6} + \dfrac{0.4}{z+0.4}$ so $h[n] = 0.6(0.6)^n + 0.4(-0.4)^n$.</p>`,
  ans:"h[n] = 0.6(0.6)ⁿ + 0.4(−0.4)ⁿ", prov:"Follows the posted worked solution."},
 {src:"Stability Tutorial Q14", see:[0], q:R`$H(z) = \dfrac{z^2}{(z-0.5)(z-0.2)}$ produces $y[n] = 2(0.5)^n - (0.2)^n$. Find the input $x[n]$.`,
  hint:"X(z) = Y(z)/H(z).",
  sol:R`<p>$Y = \dfrac{2z}{z-0.5} - \dfrac{z}{z-0.2} = \dfrac{z(z+0.1)}{(z-0.5)(z-0.2)}$</p>
  <p>$X = Y/H = \dfrac{z+0.1}{z} = 1 + 0.1z^{-1}$, so $x[n] = \delta[n] + 0.1\delta[n-1]$.</p>`,
  ans:"x[n] = δ[n] + 0.1δ[n−1]", prov:"Follows the posted worked solution."},
 {src:"Stability Tutorial Q16", see:[2], q:R`For $H(z) = \dfrac{0.5z}{z^2 - 1.2z + 0.72}$ find the poles in polar form, state stability and the oscillation frequency.`,
  hint:"Quadratic formula, then r = √(a² + b²) and θ = tan⁻¹(b/a).",
  sol:R`<p>$z = 0.6 \pm j0.6$, $r = \sqrt{0.72} = 0.849$, $\theta = \pi/4$.</p>
  <p>$r < 1$: stable. Oscillates at $\pi/4$ rad/sample (one cycle every 8 samples).</p>`,
  ans:"0.849e^{±jπ/4}; stable; π/4 rad/sample", prov:"Follows the posted worked solution."},
 {src:"Stability Tutorial Q18", see:[4], q:R`Plant $G(z) = \dfrac{0.5z}{z-1.2}$ with $U = K(R - Y)$. Find the closed-loop TF, the range of positive $K$ for stability, and $K$ to put the pole at 0.4.`,
  hint:"Closed-loop pole is 1.2/(1 + 0.5K).",
  sol:R`<p>$T = \dfrac{0.5Kz}{(1+0.5K)z - 1.2}$, pole $\dfrac{1.2}{1+0.5K}$.</p>
  <p>$|1 + 0.5K| > 1.2 \Rightarrow K > 0.4$ (for positive $K$).</p>
  <p>$\dfrac{1.2}{1+0.5K} = 0.4 \Rightarrow K = 4$.</p>`,
  ans:"K > 0.4; K = 4", prov:"Follows the posted worked solution."},
 {src:"Stability Tutorial Q19", see:[4], q:R`$G(z) = \dfrac{0.2z}{(z-0.8)(z-1.1)}$ under proportional feedback $K$. Find the stable range of $K$.`,
  hint:"Characteristic: z² + (0.2K − 1.9)z + 0.88. Apply the three second-order conditions.",
  sol:R`<p>$|a_0| = 0.88 < 1$ ✓. $1 + a_1 + a_0 = 0.2K - 0.02 > 0 \Rightarrow K > 0.1$. $1 - a_1 + a_0 = 3.78 - 0.2K > 0 \Rightarrow K < 18.9$.</p>`,
  ans:"0.1 < K < 18.9", prov:"Follows the posted worked solution."}
],
traps: [
 "Discrete stability is |z| < 1, NOT Re(z) < 0. A pole at z = 0.5 is stable even though it's on the positive axis.",
 "A negative real pole inside the circle is stable but toggles sign every sample.",
 "Magnitude of a complex pole is √(a² + b²): check both parts.",
 "Repeated poles ON the unit circle are unstable.",
 "Convert to positive powers of z before reading off poles."
]
});

T.topics.push({
id: "ivtfvt", part: "Transfer function properties", title: "Test Inputs, Initial & Final Value Theorems",
lectures: "Lecture 3 – IVT, FVT, First and Second Order Response", status: "lectured",
summary: "Standard test inputs in s and z, responses of one system to impulse, step, ramp and parabola, and getting y(0⁺) and y(∞) straight from Y(s), including when each theorem is not allowed.",
theory: R`
<h3>0. Test inputs</h3>
<div class="tbl"><table class="data">
<tr><th>Input</th><th>$r(t)$</th><th>$R(s)$</th><th>$r[n]$</th><th>$R(z)$</th></tr>
<tr><td>Impulse</td><td>$A\delta(t)$</td><td>$A$</td><td>$A\delta[n]$</td><td>$A$</td></tr>
<tr><td>Step</td><td>$A$</td><td>$A/s$</td><td>$A$</td><td>$\dfrac{Az}{z-1}$</td></tr>
<tr><td>Ramp</td><td>$At$</td><td>$A/s^2$</td><td>$AnT$</td><td>$\dfrac{ATz}{(z-1)^2}$</td></tr>
<tr><td>Parabola</td><td>$At^2/2$</td><td>$A/s^3$</td><td>$A(nT)^2/2$</td><td>$\dfrac{AT^2z(z+1)}{2(z-1)^3}$</td></tr>
</table></div>
<p>Impulse = hammer blow; step = flicking a switch; ramp = tracking a target at constant speed; parabola = constant acceleration. <b>These are not given in the exam.</b></p>

<h3>1. One system, four inputs</h3>
<p>$F(s) = \dfrac{10}{(s+1)(s+2)}$:</p>
<ul>
<li>Impulse: $10e^{-t} - 10e^{-2t}$</li>
<li>Step: $5 - 10e^{-t} + 5e^{-2t}$</li>
<li>Ramp: $5t - 7.5 + 10e^{-t} - 2.5e^{-2t}$</li>
<li>Parabola: $2.5t^2 - 7.5t + 8.75 - 10e^{-t} + 1.25e^{-2t}$</li>
</ul>

<h3>2. Initial value theorem</h3>
$$y(0^+) = \lim_{s\to\infty} sY(s)$$
<p>Valid only if $sY(s)$ is <b>proper</b> (numerator degree ≤ denominator degree). If not, the response contains an impulse at $t=0$ and IVT doesn't apply. Poles don't need to be in the LHP. <b>IVT is not given in the exam.</b></p>
<p>Trick: divide top and bottom by the highest power of $s$ in the denominator.</p>

<h3>3. Final value theorem</h3>
$$y(\infty) = \lim_{s\to0} sY(s)$$
<p>Valid only if <b>all poles of $sY(s)$ are strictly in the open LHP</b>. A pole at the origin, on the jω axis or in the right half makes FVT invalid: the output doesn't settle.</p>
<p>For a unit step, $sY(s) = G(s)$ so $y_{ss} = G(0)$: the <b>DC gain</b>.</p>
<p>Example: $\dfrac{10}{(s+1)(s+2)}$ gives impulse → 0, step → 5, ramp: $sY = \dfrac{10}{s(s+1)(s+2)}$ has a pole at 0, so FVT is invalid (the output grows like $5t$).</p>

<h3>4. Discrete versions</h3>
<p>$y[0] = \lim_{z\to\infty}Y(z)$; $y[\infty] = \lim_{z\to1}(z-1)Y(z)$ if the poles of $(z-1)Y(z)$ are inside the unit circle. (The discrete IVT and FVT are not examinable in 2026/27.)</p>`,
formulas: [
 {name:"IVT", tex:R`y(0^+) = \lim_{s\to\infty} sY(s)`, note:"sY(s) must be proper"},
 {name:"FVT", tex:R`y(\infty) = \lim_{s\to0} sY(s)`, note:"poles of sY(s) in open LHP"},
 {name:"Step steady state", tex:R`y_{ss} = G(0)`},
 {name:"Laplace inputs", tex:R`\delta\to1,\ u\to\frac1s,\ t\to\frac1{s^2},\ \frac{t^2}{2}\to\frac1{s^3}`}
],
questions: [
 {src:"Stability Tutorial Q4", see:[2], q:R`$H_A = \dfrac{5s+10}{s^2+3s+2}$, $H_B = \dfrac{2s^2+3s+8}{s^2+4s+13}$. Use the IVT for (a) an impulse and (b) a unit step input, stating when it isn't valid.`,
  hint:"Form sY(s) and check the degrees before taking the limit.",
  sol:R`<p>(a) Impulse: $sY_A = \dfrac{5s^2+10s}{s^2+3s+2}$ is proper: $y_A(0^+) = 5$. $sY_B = \dfrac{2s^3+\dots}{s^2+\dots}$ is improper: <b>IVT not valid</b> (impulse $2\delta(t)$ at $t=0$).</p>
  <p>(b) Step: $sY_A = \dfrac{5s+10}{s^2+3s+2} \to 0$. $sY_B = \dfrac{2s^2+3s+8}{s^2+4s+13} \to 2$.</p>`,
  ans:"(a) 5, not valid; (b) 0, 2", prov:"Follows the posted worked solution."},
 {src:"Stability Tutorial Q5", see:[3], q:R`Apply the FVT to the unit step response of (a) $\dfrac{12}{s^2+5s+6}$ (b) $\dfrac{10}{s^2-4}$ (c) $\dfrac{25}{s^2+25}$ (d) $\dfrac{8(s+2)}{s(s+4)}$.`,
  hint:"For a step, sY = H(s). Check H's poles first.",
  sol:R`<p>(a) Poles −2, −3: valid, $y(\infty) = 12/6 = 2$.</p>
  <p>(b) Pole at +2: invalid. (c) Poles ±j5: invalid. (d) Pole at 0: invalid.</p>`,
  ans:"(a) 2; (b)–(d) not valid", prov:"Follows the posted worked solution."},
 {src:"Lecture 3 example", see:[2,3], q:R`For the impulse response of $H(s) = \dfrac{s+3}{s^2+3s+2}$ find the initial and final values.`,
  hint:"Impulse: Y = H. Then sY(s) for both theorems.",
  sol:R`<p>IVT: $\lim_{s\to\infty}\dfrac{s^2+3s}{s^2+3s+2} = 1$.</p>
  <p>FVT (poles −1, −2 valid): $\lim_{s\to0}\dfrac{s(s+3)}{s^2+3s+2} = 0$.</p>`,
  ans:"y(0⁺) = 1, y(∞) = 0", prov:"From the worked example in Lecture 3."},
 {src:"Exam 2024 Q2(b)", see:[3], q:R`Controller $G_c = K$ and plant $G = \dfrac{2}{s+2}$ in unity feedback give $G_{CL} = \dfrac{2K}{s+2+2K}$. (i) Final value of the step response? (ii) $K$ for an impulse response of $4e^{-6t}$? (iii)–(v) With $G_c = K_1 + K_2/s$, find $G_{CL}$, the step final value, and $K_1$, $K_2$ for closed-loop poles at −1, −4.`,
  hint:"(ii) Match 4/(s+6). (iii) Multiply through by s(s+2).",
  sol:R`<p>(i) $G_{CL}(0) = \dfrac{2K}{2+2K} = \dfrac{K}{1+K}$.</p>
  <p>(ii) $\dfrac{4}{s+6}$: $2K = 4$ and $2 + 2K = 6$, so $K = 2$.</p>
  <p>(iii) $G_{CL} = \dfrac{2K_1s + 2K_2}{s^2 + (2+2K_1)s + 2K_2}$. (iv) Final value $2K_2/2K_2 = 1$.</p>
  <p>(v) $(s+1)(s+4) = s^2 + 5s + 4$: $2 + 2K_1 = 5 \Rightarrow K_1 = 1.5$; $2K_2 = 4 \Rightarrow K_2 = 2$.</p>`,
  ans:"K/(1+K); K = 2; final value 1; K₁ = 1.5, K₂ = 2", prov:"Follows the posted solution."}
],
traps: [
 "Check FVT validity first: a pole at the origin (e.g. ramp into a type-0 system) makes it invalid.",
 "IVT needs sY(s) proper. Improper means an impulse at t = 0.",
 "Multiply by s before taking the limit, both theorems.",
 "Step steady state = DC gain G(0), not G(∞).",
 "The test-input table and IVT are NOT given in the exam: learn them."
]
});

T.topics.push({
id: "order12", part: "Transfer function properties", title: "First- & Second-Order Step Response",
lectures: "Lecture 3 – First and Second Order Response", status: "lectured",
summary: "First-order time constant, rise and settling times; second-order ω_n and ζ, the four damping regimes, dominant poles, and peak time, rise time, settling time and overshoot, both forwards and backwards (specs → poles → transfer function).",
theory: R`
<h3>0. First-order systems</h3>
$$G(s) = \frac{b}{s+a},\qquad y(t) = \frac{b}{a}\left(1 - e^{-at}\right)$$
<p>Initial value 0, final value $b/a = G(0)$. Monotonic, no overshoot.</p>
<div class="tbl"><table class="data">
<tr><th>Metric</th><th>Formula</th><th>Meaning</th></tr>
<tr><td>Time constant $\tau$</td><td>$1/a$</td><td>Time to 63% of final value</td></tr>
<tr><td>Rise time $t_r$</td><td>$2.2/a$</td><td>10% → 90%</td></tr>
<tr><td>Settling time $t_s$</td><td>$4/a$</td><td>Within 2% of final value</td></tr>
</table></div>
<p>Example: $\dfrac{2}{s+4}$: $y_{ss} = 0.5$, $\tau = 0.25$ s, $t_r = 0.55$ s, $t_s = 1$ s.</p>

<h3>1. Second-order standard form</h3>
$$G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_ns + \omega_n^2},\qquad s_{1,2} = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2-1}$$
<div class="tbl"><table class="data">
<tr><th>Regime</th><th>$\zeta$</th><th>Poles</th><th>Step response</th></tr>
<tr><td>Overdamped</td><td>&gt; 1</td><td>Two real, distinct</td><td>Sluggish, no overshoot</td></tr>
<tr><td>Critically damped</td><td>= 1</td><td>Repeated at $-\omega_n$</td><td>Fastest with no overshoot</td></tr>
<tr><td>Underdamped</td><td>0–1</td><td>Complex pair, radius $\omega_n$</td><td>Overshoot and decaying ringing</td></tr>
<tr><td>Undamped</td><td>0</td><td>$\pm j\omega_n$</td><td>Sustained oscillation</td></tr>
</table></div>
<p>Increasing $\omega_n$ at fixed $\zeta$ slides the poles outward along the same ray: everything speeds up but the overshoot and shape stay the same.</p>

<h3>2. Dominant poles</h3>
<p>If one real pole is at least 10 times closer to the imaginary axis than the other, the system behaves like first order with the near pole. $\dfrac{40}{(s+2)(s+20)}$: dominant pole −2, $\tau \approx 0.5$ s. $(s+2)(s+3)$ has no dominant pole. When reducing, keep the DC gain: $\dfrac{120}{(s+2)(s+30)} \approx \dfrac{4}{s+2}$.</p>

<h3>3. Underdamped step response</h3>
<p>Poles $-\sigma \pm j\omega_d$ with $\sigma = \zeta\omega_n$ (envelope decay) and $\omega_d = \omega_n\sqrt{1-\zeta^2}$ (ringing frequency):</p>
$$y(t) = 1 - \frac{e^{-\zeta\omega_nt}}{\sqrt{1-\zeta^2}}\sin(\omega_dt + \theta),\quad \theta = \cos^{-1}\zeta$$

<h3>4. Performance formulas</h3>
<div class="tbl"><table class="data">
<tr><th></th><th>In terms of ζ, ω_n (given in exam)</th><th>From poles real ± j imag (not given)</th></tr>
<tr><td>Peak time</td><td>$t_p = \dfrac{\pi}{\omega_n\sqrt{1-\zeta^2}}$</td><td>$\dfrac{\pi}{\text{imag}}$</td></tr>
<tr><td>Settling (2%)</td><td>$t_s \approx \dfrac{4}{\zeta\omega_n}$</td><td>$\dfrac{4}{|\text{real}|}$</td></tr>
<tr><td>Overshoot</td><td>$\%OS = 100e^{-\pi\zeta/\sqrt{1-\zeta^2}}$</td><td>$100e^{-\pi|\text{real}|/\text{imag}}$</td></tr>
<tr><td>Rise time (to 100%)</td><td>$\dfrac{\pi - \tan^{-1}(\sqrt{1-\zeta^2}/\zeta)}{\omega_n\sqrt{1-\zeta^2}}$</td><td>$\dfrac{\pi - \tan^{-1}(\text{imag}/|\text{real}|)}{\text{imag}}$</td></tr>
</table></div>
<p><b>Worked example:</b> $\dfrac{75}{s^2+6s+25}$, poles $-3 \pm j4$: $y_{ss} = 3$, $\%OS = 100e^{-3\pi/4} = 9.48\%$, $t_p = \pi/4 = 0.785$ s, $t_s = 4/3 = 1.33$ s, $t_r = (\pi - \tan^{-1}(4/3))/4 = 0.554$ s.</p>

<h3>5. Going backwards: specs → poles</h3>
<p>From %OS: $\zeta = \dfrac{-\ln(\%OS/100)}{\sqrt{\pi^2 + \ln^2(\%OS/100)}}$. Or directly: $t_s$ fixes the real part ($4/t_s$), $t_p$ fixes the imaginary part ($\pi/t_p$), and %OS fixes the ratio real/imag. Then $G(s) = \dfrac{K(\sigma^2+\omega_d^2)}{(s+\sigma)^2 + \omega_d^2}$ with $K$ the DC gain.</p>
<p>Reading a step-response plot: final value → DC gain; peak value → %OS; time of peak → $t_p$; for first order, time to 63% → $\tau$.</p>`,
formulas: [
 {name:"First order", tex:R`\tau = \frac1a,\ t_r = \frac{2.2}{a},\ t_s = \frac4a`},
 {name:"Standard 2nd order", tex:R`\frac{\omega_n^2}{s^2+2\zeta\omega_ns+\omega_n^2}`},
 {name:"Damped frequency", tex:R`\omega_d = \omega_n\sqrt{1-\zeta^2}`},
 {name:"Peak time", tex:R`t_p = \frac{\pi}{\omega_d}`},
 {name:"Settling time (2%)", tex:R`t_s \approx \frac{4}{\zeta\omega_n}`},
 {name:"Overshoot", tex:R`\%OS = 100e^{-\pi\zeta/\sqrt{1-\zeta^2}}`},
 {name:"ζ from overshoot", tex:R`\zeta = \frac{-\ln(\%OS/100)}{\sqrt{\pi^2+\ln^2(\%OS/100)}}`},
 {name:"Rise time", tex:R`t_r = \frac{\pi - \tan^{-1}\!\left(\sqrt{1-\zeta^2}/\zeta\right)}{\omega_d}`}
],
questions: [
 {src:"Tutorial 4 Q1", see:[0,1], q:R`Find the poles and zeros and the general form of the step response for (a) $\dfrac{2}{s+2}$ (b) $\dfrac{5}{(s+3)(s+6)}$ (c) $\dfrac{10(s+7)}{(s+10)(s+20)}$ (d) $\dfrac{20}{s^2+6s+144}$.`,
  hint:"Each pole contributes a term; the step adds a constant A.",
  sol:R`<p>(a) Pole −2: $A + Be^{-2t}$, first order.</p>
  <p>(b) Poles −3, −6: $A + Be^{-3t} + Ce^{-6t}$, overdamped.</p>
  <p>(c) Poles −10, −20, zero −7: $A + Be^{-10t} + Ce^{-20t}$, overdamped.</p>
  <p>(d) Poles $-3 \pm j3\sqrt{15}$: $A + Be^{-3t}\cos(3\sqrt{15}t + \phi)$, underdamped.</p>`,
  ans:"First order; overdamped; overdamped; underdamped", prov:"Follows the posted solution."},
 {src:"Tutorial 4 Q2", see:[1,3], q:R`A system has $\zeta = 0.5$, $\omega_n = 100$ rad/s and DC gain 1. Find its unit step response.`,
  hint:"G = ω_n²/(s² + 2ζω_ns + ω_n²) = 10 000/(s² + 100s + 10 000).",
  sol:R`<p>$Y = \dfrac{10\,000}{s(s^2+100s+10\,000)} = \dfrac1s - \dfrac{s+100}{s^2+100s+10\,000}$</p>
  <p>$$y(t) = 1 - e^{-50t}\left[\cos(50\sqrt3t) + \frac{1}{\sqrt3}\sin(50\sqrt3t)\right] = 1 - \frac{2}{\sqrt3}e^{-50t}\sin\left(50\sqrt3t + \frac\pi3\right)$$</p>`,
  ans:"1 − (2/√3)e^{−50t}sin(50√3 t + π/3)", prov:"Follows the posted solution."},
 {src:"Tutorial 4 Q3", see:[4], q:R`Find $\zeta$, $\omega_n$, $t_s$, $t_r$, $t_p$ and %OS for (a) $\dfrac{16}{s^2+3s+16}$ (b) $\dfrac{0.04}{s^2+0.02s+0.04}$ (c) $\dfrac{1.05\times10^7}{s^2+1.6\times10^3s+1.05\times10^7}$.`,
  hint:"ω_n = √(constant), ζ = (middle coefficient)/(2ω_n).",
  sol:R`<div class="tbl"><table class="data num"><tr><th></th><th>ω_n</th><th>ζ</th><th>poles</th><th>t_s</th><th>t_p</th><th>%OS</th><th>t_r</th></tr>
  <tr><td>(a)</td><td>4</td><td>0.375</td><td>−1.5 ± j3.708</td><td>2.67 s</td><td>0.847 s</td><td>28.1</td><td>0.527 s</td></tr>
  <tr><td>(b)</td><td>0.2</td><td>0.05</td><td>−0.01 ± j0.1997</td><td>400 s</td><td>15.73 s</td><td>85.4</td><td>8.11 s</td></tr>
  <tr><td>(c)</td><td>3240</td><td>0.247</td><td>−800 ± j3140</td><td>5 ms</td><td>1.0 ms</td><td>44.9</td><td>0.58 ms</td></tr></table></div>`,
  ans:"See table", prov:"Follows the posted solution."},
 {src:"Tutorial 4 Q4", see:[5], q:R`Find the pole pair for (a) %OS = 12%, $T_s$ = 0.5 s; (b) %OS = 10%, $T_p$ = 5 s; (c) $T_s$ = 7 s, $T_p$ = 3 s.`,
  hint:"T_s → real part 4/T_s; T_p → imag part π/T_p; %OS links them: %OS = 100e^{−π·real/imag}.",
  sol:R`<p>(a) real = 8; imag = $8\pi/\ln(1/0.12) = 11.86$: $-8 \pm j11.86$ ($\dfrac{204.5}{s^2+16s+204.5}$).</p>
  <p>(b) imag = $\pi/5 = 0.628$; real = $0.628\ln(10)/\pi = 0.461$: $-0.461 \pm j0.628$.</p>
  <p>(c) real = $4/7 = 0.571$; imag = $\pi/3 = 1.047$: $-0.571 \pm j1.047$.</p>`,
  ans:"−8±j11.86; −0.461±j0.628; −0.571±j1.047", prov:"Follows the posted solution."},
 {src:"Tutorial 4 Q5", fig:"ssc_t4q5", see:[0,5], q:R`Find the transfer function for each step response in the figure.`,
  hint:"Final value = DC gain. First plot: time to 63%. Others: peak value (%OS) and peak time.",
  sol:R`<p>(a) First order, DC gain 2, 63% (1.26) at ≈ 0.025 s: $\tau = 0.025$, $G = \dfrac{2}{0.025s+1} = \dfrac{80}{s+40}$.</p>
  <p>(b) DC 10, peak 14 → 40%, $t_p = 1$ s: imag = π, real = $\pi\ln(1/0.4)/\pi = 0.916$; $G = \dfrac{107.1}{s^2+1.833s+10.71}$.</p>
  <p>(c) DC 1, peak 1.4 → 40%, $t_p \approx 4$ s: imag = 0.785, real = 0.229; $G = \dfrac{0.669}{s^2+0.458s+0.669}$.</p>`,
  ans:"80/(s+40); 107.1/(s²+1.83s+10.71); 0.669/(s²+0.458s+0.669)", prov:"Follows the posted solution (values read from the plots)."},
 {src:"Stability Tutorial Q8", see:[2], q:R`For $G = \dfrac{120}{(s+2)(s+30)}$, is it first-order dominant? Reduce it and estimate the settling time.`,
  hint:"Ratio of pole distances ≥ 10? Keep G(0) when simplifying.",
  sol:R`<p>$30/2 = 15 \ge 10$: yes, $s = -2$ dominates.</p>
  <p>$G(0) = 2$, so $G \approx \dfrac{4}{s+2}$; $t_s \approx 4/2 = 2$ s.</p>`,
  ans:"Yes; 4/(s+2); t_s ≈ 2 s", prov:"Follows the posted worked solution."},
 {src:"Stability Tutorial Q10", see:[4,5], q:R`For $T(s) = \dfrac{k}{s^2+6s+k}$ find $k$ for (a) critical damping, (b) 16.3% overshoot, (c) $t_p = \pi/4$ s.`,
  hint:"Poles −3 ± j√(k − 9).",
  sol:R`<p>(a) $36 - 4k = 0$: $k = 9$.</p>
  <p>(b) 16.3% ⇒ $\zeta = 0.5$; $\zeta = 3/\sqrt k$ ⇒ $k = 36$.</p>
  <p>(c) $\omega_d = 4 = \sqrt{k-9}$ ⇒ $k = 25$.</p>`,
  ans:"9; 36; 25", prov:"Follows the posted worked solution."},
 {src:"Stability Tutorial Q17", see:[1,4], q:R`$G = \dfrac{1/LC}{s^2 + (R/L)s + 1/LC} = \dfrac{25}{s^2+6s+25}$ with $C = 0.04$ F. Find $L$ and $R$, then $\omega_n$, $\zeta$, $\omega_d$, $t_p$, %OS, period and $t_s$. What $R$ gives critical damping?`,
  hint:"1/LC = 25 and R/L = 6.",
  sol:R`<p>$L = 1/(25 \times 0.04) = 1$ H, $R = 6$ Ω.</p>
  <p>$\omega_n = 5$, $\zeta = 0.6$, $\omega_d = 4$ rad/s; $t_p = 0.785$ s, %OS = 9.48%, period $2\pi/4 = 1.571$ s, $t_s = 4/3 = 1.33$ s.</p>
  <p>Critical: $R/L = 2\omega_n = 10$ ⇒ $R = 10$ Ω.</p>`,
  ans:"L = 1 H, R = 6 Ω; R_crit = 10 Ω", prov:"Follows the posted worked solution."},
 {src:"Exam 2023 Q1(a)", see:[3,4], q:R`RLC circuit $\ddot v_o + \frac RL\dot v_o + \frac{1}{LC}v_o = \frac{1}{LC}v_{in}$ with $R = 1$ Ω, $L = 1$ H, $C = 0.25$ F. Find the unit step response, %OS, period of oscillation and initial/final values.`,
  hint:"G = 4/(s² + s + 4); poles −0.5 ± j1.9365.",
  sol:R`<p>$Y = \dfrac{4}{s(s^2+s+4)} = \dfrac1s - \dfrac{s+0.5}{(s+0.5)^2 + 1.9365^2} - \dfrac{0.5}{1.9365}\dfrac{1.9365}{(s+0.5)^2+1.9365^2}$</p>
  <p>$$y(t) = 1 - e^{-0.5t}\cos(1.9365t) - 0.258e^{-0.5t}\sin(1.9365t)$$</p>
  <p>%OS $= 100e^{-\pi(0.5/1.9365)} = 44.4\%$; period $= 2\pi/1.9365 = 3.245$ s; $y(0^+) = 0$, $y(\infty) = 1$.</p>`,
  ans:"%OS = 44.4%, T = 3.245 s, 0 → 1", prov:"Follows the posted solution."},
 {src:"Exam 2024 Q1(d)", see:[5,4], q:R`$\ddot v_o + \alpha\dot v_o + 5v_o = 5v_{in}$. (i) Find $\alpha$ for 48.6397% overshoot. (ii) Suggest $\alpha$ to reduce overshoot. (iii) For $\alpha = 1$, find the unit impulse response.`,
  hint:"ζ from %OS, ω_n = √5, α = 2ζω_n.",
  sol:R`<p>(i) $\ln(0.486397) = -0.7207$ ⇒ $\zeta = 0.7207/\sqrt{\pi^2 + 0.7207^2} = 0.2236$; $\alpha = 2(0.2236)\sqrt5 = 1.0$.</p>
  <p>(ii) Any larger $\alpha$ raises $\zeta$ and lowers overshoot; $\alpha \ge 2\sqrt5 \approx 4.47$ removes it entirely.</p>
  <p>(iii) $H = \dfrac{5}{(s+0.5)^2 + 2.179^2}$ ⇒ $h(t) = \dfrac{5}{2.179}e^{-0.5t}\sin(2.179t) = 2.29e^{-0.5t}\sin(2.179t)$.</p>`,
  ans:"α = 1; larger α (≥ 4.47 for none); h = 2.29e^{−0.5t}sin(2.18t)", prov:"Worked by Claude and checked in code. The posted solutions don't cover this part."}
],
traps: [
 "Read ω_n and ζ only after putting the denominator in the form s² + 2ζω_ns + ω_n².",
 "Settling time uses the REAL part (4/ζω_n); peak time uses the IMAGINARY part (π/ω_d).",
 "%OS depends only on ζ (the pole angle), not on ω_n.",
 "Rise time for second order here is 0 → 100% (first crossing), not 10–90%.",
 "When building G from specs, include the DC gain in the numerator: K·(σ² + ω_d²).",
 "Dominance needs a factor of about 10 between pole distances."
]
});
})();
