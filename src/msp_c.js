/* MEC1015 — topics 16–17: frequency response of physical systems (Lectures 19.1–19.2) and filters (Lectures 20.1–20.2 + additional notes) */
(function(){
const R = String.raw;
STUDY.content.msp = STUDY.content.msp || { topics: [] };
const T = STUDY.content.msp;

T.topics.push({
id: "frf-physical", part: "Signal processing", title: "Frequency Response of Physical Systems",
lectures: "Lectures 19.1–19.2", status: "lectured",
summary: "Building the frequency response function straight from the physics: write the governing equation, Fourier-transform it (d/dt → jω), and rearrange output over input. Worked for a rotational mechanical system, a series RLC circuit, a tank drained through a valve (linearised with a Taylor series) and a thermocouple.",
theory: R`
<h3>1. The method</h3>
<p>Lectures 19.1–19.2 apply the FRF idea from Lecture 18.3 to four kinds of physical system. The recipe is always the same:</p>
<ol class="steps"><li>Write the governing equation (Newton, Kirchhoff, conservation of mass or energy).</li><li>If it is non-linear, linearise about an operating point.</li><li>Fourier-transform each term: $\dfrac{d}{dt}\to j\omega$, $\dfrac{d^2}{dt^2}\to(j\omega)^2 = -\omega^2$, $\int dt\to\dfrac{1}{j\omega}$.</li><li>Pick the input and the output, and write $H(\omega) = \dfrac{\text{output}(\omega)}{\text{input}(\omega)}$.</li></ol>
<div class="callout key"><b>Order:</b> the highest power of ω in the denominator. An $\omega^2$ (from a second derivative, or L and C together) makes it <b>second order</b>; ω alone makes it <b>first order</b>.</div>

<h3>2. Rotational mechanical system</h3>
<p>Lecture 19.1. A rigid bar of moment of inertia $I$ pivots at its base. A spring $k$ acts at distance $L/2$ (moment arm $L/2$, so torque $k(L/2)^2\theta = \tfrac14kL^2\theta$), a damper $c$ acts at $L$ (torque $cL^2\dot\theta$), the applied force $F$ acts at $L$, and the weight $mg$ at $L$ tips the bar further over (torque $mgL\sin\theta$). <span class="small">The slide's figure didn't come through in the PDF; this reading is from the terms in the equation.</span></p>
$$I\ddot\theta = -\tfrac14kL^2\theta - cL^2\dot\theta + FL + mgL\sin\theta$$
<p>For small angles $\sin\theta\approx\theta$:</p>
$$I\ddot\theta + cL^2\dot\theta + \tfrac14kL^2\theta - mgL\theta = FL$$
<p>Fourier transform:</p>
$$-I\omega^2\Theta(\omega) + cL^2j\omega\,\Theta(\omega) + \tfrac14kL^2\Theta(\omega) - mgL\,\Theta(\omega) = F(\omega)L$$
<p>With force $F$ as input and angle θ as output:</p>
$$\frac{\Theta(\omega)}{F(\omega)} = \frac{L}{-I\omega^2 + cL^2j\omega + \tfrac14kL^2 - mgL}$$
<p>Second order (the $\omega^2$). The gravity term subtracts from the spring stiffness, so the bar only has a stable, finite response if $\tfrac14kL^2 &gt; mgL$. Comparing with a standard second-order system: effective stiffness $K = \tfrac14kL^2 - mgL$, $\omega_n = \sqrt{K/I}$, static gain $L/K$.</p>

<h3>3. Electrical system: series RLC</h3>
<p>Lecture 19.1. Source $V_i$ drives R, L and C in series. Kirchhoff: $V_i = V_R + V_L + V_C$, with</p>
<table class="data"><tr><th>Element</th><th>Time domain</th><th>Frequency domain</th></tr><tr><td>R</td><td>$V_R = iR$</td><td>$V_R(\omega) = i(\omega)R$</td></tr><tr><td>L</td><td>$V_L = L\,di/dt$</td><td>$V_L(\omega) = j\omega L\,i(\omega)$</td></tr><tr><td>C</td><td>$V_C = \frac1C\int i\,dt$</td><td>$V_C(\omega) = \dfrac{1}{j\omega C}i(\omega)$</td></tr></table>
$$i(\omega) = \frac{V_i(\omega)}{R + j\omega L + \frac{1}{j\omega C}},\qquad V_C(\omega) = \frac{1}{j\omega C}\,i(\omega)$$
<p>With $V_i$ as input and $V_C$ as output, multiply top and bottom by $j\omega C$:</p>
$$\frac{V_C(\omega)}{V_i(\omega)} = \frac{1}{Rj\omega C - LC\omega^2 + 1}$$
<p>Second order (the $\omega^2$ term). It is a low-pass: gain 1 at ω = 0, falling to 0 at high ω. It has $\omega_n = 1/\sqrt{LC}$, where the gain is $1/(\omega_nRC)$ and the phase −90°, and $\zeta = \frac{R}{2}\sqrt{C/L}$.</p>

<h3>4. Hydraulic system: tank and valve (linearised)</h3>
<p>Lecture 19.2. A tank of cross-section $A$ holds liquid of density ρ. Inflow $q_i$ is the input; the outflow $q_o$ goes through a valve with constant $k$ to atmosphere $p_a$. Output: the pressure $p$ at the base.</p>
<p>Since $p = \rho gh$ and $A\,dh/dt = q_i - q_o$:</p>
$$\frac{dp}{dt} = \rho g\frac{dh}{dt} = \rho g\frac{q_i - q_o}{A},\qquad q_o = k\sqrt{p - p_a}\quad\Rightarrow\quad\frac{dp}{dt} = \rho g\,\frac{q_i - k\sqrt{p-p_a}}{A}$$
<p>The square root makes this <b>non-linear</b>. Linearise by looking at small fluctuations about a nominal operating point: $p = \bar p + \hat p$, $q_i = \bar q_i + \hat q_i$ ($\bar p$, $\bar q_i$ constant). Taylor series to first order, $f(a+x) = f(a) + f'(a)x$, with $a = \bar p - p_a$ and $x = \hat p$:</p>
$$\sqrt{p - p_a}\approx\sqrt{\bar p - p_a} + \frac{\hat p}{2\sqrt{\bar p - p_a}}$$
$$\frac{d\hat p}{dt} = \frac{\rho g}{A}\left(\bar q_i + \hat q_i - k\left[\sqrt{\bar p - p_a} + \frac{\hat p}{2\sqrt{\bar p - p_a}}\right]\right)$$
<p>At equilibrium nothing changes, so $0 = \frac{\rho g}{A}(\bar q_i - k\sqrt{\bar p - p_a})$: the steady terms cancel, leaving</p>
$$\frac{d\hat p}{dt} + \left(\frac{\rho gk}{2A\sqrt{\bar p - p_a}}\right)\hat p = \left(\frac{\rho g}{A}\right)\hat q_i$$
$$\frac{\hat P(\omega)}{\hat Q(\omega)} = \frac{\alpha}{j\omega + \beta},\qquad \alpha = \frac{\rho g}{A},\quad\beta = \frac{\rho gk}{2A\sqrt{\bar p - p_a}}$$
<p>First order. In standard form $\dfrac{\alpha/\beta}{1 + j\omega/\beta}$: static gain $\alpha/\beta = 2\sqrt{\bar p - p_a}/k$, time constant $\tau = 1/\beta$, bandwidth $\omega_c = \beta$. Because it was linearised, it only holds for small fluctuations, and β depends on the operating pressure.</p>

<h3>5. Thermal system: thermocouple</h3>
<p>Lecture 19.2, revisiting the thermocouple from the dynamic-characteristics part: the rate of energy increase in the body equals the rate of heat transfer from the surroundings.</p>
$$mc_p\frac{dT_c}{dt} = k(T_s - T_c)\quad\Rightarrow\quad\frac{mc_p}{k}\frac{dT_c}{dt} + T_c = T_s$$
<p>With surroundings temperature $T_s$ as input and thermocouple temperature $T_c$ as output, and $\tau = mc_p/k$:</p>
$$\frac{T_c(\omega)}{T_s(\omega)} = \frac{1}{\tau j\omega + 1}$$
<p>A first-order system. The lecture's plot (τ = 1) shows the shape: amplitude 1 at low frequency, 0.707 at ω = 1/τ, falling towards 0; phase 0 at low frequency, −45° at 1/τ, heading to −90°. Its time plot shows a sine input of amplitude 2 coming out at amplitude 1.4 (ratio 0.7) and lagging by 45°: the input is at the corner frequency.</p>

<h3>6. Reading the result</h3>
<table class="data"><tr><th>System</th><th>Input → output</th><th>FRF</th><th>Order</th></tr>
<tr><td>Rotational bar</td><td>F → θ</td><td>$\dfrac{L}{-I\omega^2 + cL^2j\omega + \frac14kL^2 - mgL}$</td><td>2</td></tr>
<tr><td>Series RLC</td><td>$V_i\to V_C$</td><td>$\dfrac{1}{1 - LC\omega^2 + j\omega RC}$</td><td>2</td></tr>
<tr><td>Tank + valve</td><td>$\hat q_i\to\hat p$</td><td>$\dfrac{\alpha}{j\omega+\beta}$</td><td>1</td></tr>
<tr><td>Thermocouple</td><td>$T_s\to T_c$</td><td>$\dfrac{1}{\tau j\omega + 1}$</td><td>1</td></tr></table>
<p>Different physics, same mathematics: every first-order system has the $1/(1+j\omega\tau)$ shape and every second-order system the $1/(\omega_n^2 - \omega^2 + 2j\zeta\omega_n\omega)$ shape, up to a gain. Once you have $H(\omega)$, gain and phase at any frequency follow as in Lecture 18.3.</p>`,
formulas: [
 {name:"Transform rules", tex:R`\frac{d}{dt}\to j\omega,\quad\frac{d^2}{dt^2}\to-\omega^2,\quad\int dt\to\frac{1}{j\omega}`},
 {name:"Rotational bar", tex:R`\frac{\Theta}{F}=\frac{L}{-I\omega^2+cL^2j\omega+\frac14kL^2-mgL}`},
 {name:"Series RLC, output across C", tex:R`\frac{V_C}{V_i}=\frac{1}{Rj\omega C-LC\omega^2+1}`},
 {name:"Tank + valve (linearised)", tex:R`\frac{\hat P}{\hat Q}=\frac{\alpha}{j\omega+\beta},\ \ \alpha=\frac{\rho g}{A},\ \ \beta=\frac{\rho gk}{2A\sqrt{\bar p-p_a}}`},
 {name:"Valve characteristic", tex:R`q_o=k\sqrt{p-p_a}`},
 {name:"First-order Taylor series", tex:R`f(a+x)\approx f(a)+f'(a)x,\qquad\sqrt{p-p_a}\approx\sqrt{\bar p-p_a}+\frac{\hat p}{2\sqrt{\bar p-p_a}}`},
 {name:"Thermocouple", tex:R`\frac{T_c}{T_s}=\frac{1}{\tau j\omega+1},\quad\tau=\frac{mc_p}{k}`}
],
questions: [
 {src:"Lecture 19.1 practice", q:R`For the rotational system of Lecture 19.1, $\dfrac{\Theta}{F} = \dfrac{L}{-I\omega^2 + cL^2j\omega + \frac14kL^2 - mgL}$. Take $I = 2$ kg m², $L = 1$ m, $k = 400$ N/m, $c = 4$ N s/m, $m = 5$ kg, $g = 9.81$ m/s². Find the static gain, the natural frequency, and the gain and phase at 5 rad/s.`,
  hint:"Group the constant terms into one effective stiffness first.",
  sol:R`<p>Effective stiffness $K = \tfrac14kL^2 - mgL = 100 - 49.05 = 50.95$ N m/rad (positive, so stable).</p>
  <p>Static gain (ω = 0): $L/K = 1/50.95 = 0.0196$ rad/N.</p>
  <p>$\omega_n = \sqrt{K/I} = \sqrt{25.48} = 5.05$ rad/s.</p>
  <p>At ω = 5: denominator $= -2(25) + 50.95 + 4(5)j = 0.95 + 20j$. Gain $= 1/\sqrt{0.95^2 + 20^2} = 1/20.02 = 0.0499$ rad/N; phase $= -\tan^{-1}(20/0.95) = -87.3°$.</p>
  <p>Near $\omega_n$ the inertia and stiffness terms almost cancel, so only damping limits the response: the gain is about 2.5 times the static value and the lag is close to 90°.</p>`,
  ans:"0.0196 rad/N; 5.05 rad/s; 0.0499 rad/N at −87.3°", prov:"Worked by Claude; no solution is available. Numbers checked in code."},
 {src:"Lecture 19.1 practice", q:R`Series RLC with $R = 100\ \Omega$, $L = 0.1$ H, $C = 10\ \mu$F, output across the capacitor. Derive $V_C/V_i$, then find the gain and phase at 100, 1000 and 5000 rad/s. What kind of filter is it?`,
  hint:"Voltage divider with Z_C over the total impedance; then multiply through by jωC.",
  sol:R`<p>$\dfrac{V_C}{V_i} = \dfrac{1/j\omega C}{R + j\omega L + 1/j\omega C} = \dfrac{1}{1 - LC\omega^2 + j\omega RC}$, with $LC = 10^{-6}$ and $RC = 10^{-3}$.</p>
  <table class="data num"><tr><th>ω (rad/s)</th><th>Denominator</th><th>Gain</th><th>Phase</th></tr><tr><td>100</td><td>0.99 + 0.1j</td><td>1.005</td><td>−5.8°</td></tr><tr><td>1000</td><td>0 + 1j</td><td>1.000</td><td>−90°</td></tr><tr><td>5000</td><td>−24 + 5j</td><td>0.041</td><td>−168.2°</td></tr></table>
  <p>At 5000 rad/s the real part is negative, so the denominator's angle is $180° - \tan^{-1}(5/24) = 168.2°$.</p>
  <p>Second-order low-pass with $\omega_n = 1/\sqrt{LC} = 1000$ rad/s and $\zeta = \frac R2\sqrt{C/L} = 0.5$: flat at low frequency, −90° at $\omega_n$, phase heading for −180° and gain falling as $1/\omega^2$ above it.</p>`,
  ans:"1.005∠−5.8°; 1∠−90°; 0.041∠−168.2°; second-order low-pass", prov:"Worked by Claude; no solution is available. Numbers checked in code."},
 {src:"Lecture 19.2 example", q:R`A tank of cross-sectional area $A$ holds liquid of density ρ. Outflow is through a valve, $q_o = k\sqrt{p - p_a}$. Find the FRF from inflow $q_i$ to base pressure $p$. Then evaluate it for $A = 2$ m², $k = 0.002$ m³ s⁻¹ Pa<sup>−½</sup>, water ($\rho = 1000$ kg/m³) and an operating point $\bar p - p_a = 20$ kPa: give the steady flow, static gain, time constant and bandwidth.`,
  hint:"dp/dt = ρg(q_i − q_o)/A, then linearise the square root about the operating point with a first-order Taylor series.",
  sol:R`<p>$\dfrac{dp}{dt} = \dfrac{\rho g}{A}\left(q_i - k\sqrt{p - p_a}\right)$. Put $p = \bar p + \hat p$, $q_i = \bar q_i + \hat q_i$ and $\sqrt{p - p_a}\approx\sqrt{\bar p - p_a} + \hat p/2\sqrt{\bar p - p_a}$. The steady terms cancel at equilibrium, leaving</p>
  $$\frac{d\hat p}{dt} + \beta\hat p = \alpha\hat q_i\ \Rightarrow\ \frac{\hat P}{\hat Q} = \frac{\alpha}{j\omega + \beta},\quad\alpha = \frac{\rho g}{A},\ \beta = \frac{\rho gk}{2A\sqrt{\bar p - p_a}}$$
  <p><b>Numbers:</b> $\sqrt{20000} = 141.4$. Steady flow $\bar q = k\sqrt{\bar p - p_a} = 0.283$ m³/s.</p>
  <p>$\alpha = 9810/2 = 4905$ Pa/m³; $\beta = \dfrac{9810\times0.002}{2\times2\times141.4} = 0.0347$ s⁻¹.</p>
  <p>Static gain $\alpha/\beta = 2\sqrt{\bar p - p_a}/k = 1.41\times10^5$ Pa per m³/s; $\tau = 1/\beta = 28.8$ s; bandwidth $\omega_c = \beta = 0.0347$ rad/s.</p>
  <p>So the base pressure follows slow inflow changes, but fluctuations faster than about 0.035 rad/s (periods shorter than about 3 minutes) are smoothed out by the tank.</p>`,
  ans:"α/(jω + β); 0.283 m³/s; 1.41×10⁵ Pa/(m³/s); τ = 28.8 s; ω_c = 0.0347 rad/s", prov:"Derivation from the worked example in Lecture 19.2; the numerical part is worked by Claude (no solution available) and checked in code."},
 {src:"Lecture 19.2 practice", q:R`Why does the hydraulic example need a Taylor series when the RLC and thermocouple examples don't? What does the linearisation cost you?`,
  sol:R`<p>The valve law $q_o = k\sqrt{p - p_a}$ is non-linear, and the frequency response function only exists for linear systems (it relies on superposition and frequency preservation). Expanding the square root to first order about an operating point $\bar p$ gives a linear equation in the fluctuations $\hat p$, $\hat q_i$.</p>
  <p>The cost: the FRF is only valid for <b>small</b> fluctuations about that operating point, and its parameters (β, so the time constant and gain) change if the operating pressure changes. The RLC and thermocouple equations are already linear, so they need no approximation. (The rotational example needed a smaller one: $\sin\theta\approx\theta$.)</p>`, prov:"From the reasoning in Lecture 19.2."},
 {src:"Lecture 19.2 practice", q:R`A thermocouple has mass 2 g, specific heat 400 J/kg K and heat transfer coefficient (times area) $k = 0.04$ W/K. Find its FRF. The gas temperature oscillates with amplitude 10 °C at 0.1 rad/s: what amplitude does the thermocouple show, and how far behind is it?`,
  hint:"τ = mc_p/k.",
  sol:R`<p>$\tau = mc_p/k = 0.002\times400/0.04 = 20$ s, so $\dfrac{T_c}{T_s} = \dfrac{1}{20j\omega + 1}$.</p>
  <p>At 0.1 rad/s, $\tau\omega = 2$: gain $1/\sqrt{1 + 4} = 0.447$, phase $-\tan^{-1}2 = -63.4° = -1.107$ rad.</p>
  <p>Indicated amplitude $= 10\times0.447 = 4.47$ °C; time lag $= 1.107/0.1 = 11.1$ s.</p>`,
  ans:"1/(20jω + 1); 4.47 °C, lagging by 63.4° (11.1 s)", prov:"Worked by Claude; no solution is available. Numbers checked in code."},
 {src:"Lecture 19 practice", q:R`State the order of each FRF and whether it passes low or high frequencies: (a) $\dfrac{3}{1 + 5j\omega}$; (b) $\dfrac{1}{1 - 0.01\omega^2 + 0.05j\omega}$; (c) $\dfrac{j\omega L}{R + j\omega L}$; (d) $\dfrac{\alpha}{j\omega + \beta}$.`,
  sol:R`<p>(a) First order, low-pass (gain 3 at ω = 0, → 0).</p><p>(b) Second order ($\omega^2$), low-pass; $\omega_n = 10$ rad/s.</p><p>(c) First order, high-pass (0 at ω = 0, → 1 at high ω): the inductor output from Lecture 20.2.</p><p>(d) First order, low-pass, bandwidth β (the tank).</p>`,
  ans:"(a) 1st LP; (b) 2nd LP; (c) 1st HP; (d) 1st LP", prov:"Worked by Claude; no solution is available."}
],
traps: ["Pick input and output before you rearrange: Θ/F and F/Θ are reciprocals.", "Spring at L/2 gives torque k(L/2)²θ = ¼kL²θ, not kL²θ.", "Weight above the pivot subtracts from the stiffness; if mgL exceeds ¼kL² the bar falls over and there is no steady response.", "(jω)² = −ω², so the second-order denominator has a real part that changes sign at ω_n; watch the quadrant.", "The tank FRF is only valid for small fluctuations about the operating point, and β depends on that point.", "Thermocouple τ = mc_p/k (mass × specific heat over heat transfer coefficient)."]
});

T.topics.push({
id: "filters", part: "Signal processing", title: "Filters: Ideal, Real and Butterworth",
lectures: "Lectures 20.1–20.2 + additional notes", status: "lectured",
summary: "The ideal low-pass filter (unit gain, linear phase, so a pure time delay) and its sinc impulse response; why real filters fall short; RC low-pass and RL high-pass filters; the Butterworth and Chebyshev families; the −3 dB half-power bandwidth and how to find it for any FRF, including the spring–mass–damper and a filter found from its input and output spectra.",
theory: R`
<h3>1. The ideal low-pass filter</h3>
<p>Lecture 20.1. Below the cut-off $\omega_c$ the gain is 1, so signals pass unchanged in amplitude; above it the gain is 0, so nothing is transmitted. The phase is a <b>linear</b> function of frequency, $\phi = -k\omega$:</p>
$$H(\omega) = 1\cdot e^{-jk\omega} = e^{-jk\omega}\quad(|\omega| \lt \omega_c),\qquad H(\omega) = 0\quad(|\omega| \gt \omega_c)$$
<p>Why linear phase? Put a cosine below the cut-off through it: $y = x\cos(\omega t + \phi) = x\cos(\omega t - k\omega) = x\cos\omega(t - k)$. Whatever ω is, the output is delayed by the same time $k$. So every component of a signal is delayed equally and the output is a time-shifted copy of the input, with no distortion of its shape.</p>
<p>Outside the pass band, $Y(\omega) = H(\omega)X(\omega) = 0\cdot X(\omega) = 0$.</p>

<h3>2. Impulse response of the ideal filter</h3>
<p>Additional notes. Inverse-transform $H(\omega) = e^{-jk\omega}$ over $-\omega_c$ to $\omega_c$:</p>
$$h(t) = \frac{1}{2\pi}\int_{-\omega_c}^{\omega_c}e^{-jk\omega}e^{j\omega t}d\omega = \frac{1}{2\pi}\left[\frac{e^{j\omega(t-k)}}{j(t-k)}\right]_{-\omega_c}^{\omega_c} = \frac{\sin\omega_c(t-k)}{\pi(t-k)} = \frac{\omega_c}{\pi}\,\frac{\sin\omega_c(t-k)}{\omega_c(t-k)}$$
<p>A sinc function centred at the delay $t = k$. Convolving it with the input gives the output. <span class="small">It has tails running to $t\to-\infty$, so it would have to respond before the impulse arrives; that's another way to see why it can't be built.</span> The same sinc (with $k = 0$, $\omega_c = \omega_s/2$) is the ideal reconstruction filter from the sampling topic.</p>

<h3>3. Real filters</h3>
<p>In practice the ideal characteristic can't be achieved. A real filter has:</p>
<ul><li>a <b>gradual</b> reduction in gain around the cut-off instead of a vertical edge;</li><li>a phase that is <b>not perfectly linear</b> (so different frequencies are delayed by slightly different times);</li><li>a gain below the cut-off that is <b>not exactly constant</b>.</li></ul>

<h3>4. RC low-pass and RL high-pass</h3>
<p><b>RC, output across C</b> (Lecture 20.1). $V_i = V_R + V_C$, $i = V_i/(R + 1/j\omega C)$, $V_C = i/j\omega C$:</p>
$$\frac{V_C(\omega)}{V_i(\omega)} = \frac{1}{Rj\omega C + 1}$$
<p>First order (ω in the denominator). Low-pass: gain 1 → 0, phase 0 → −90°, with $|H| = 0.707$ and phase −45° at $\omega_c = 1/RC$.</p>
<p><b>RL, output across L</b> (Lecture 20.2). $V_i = V_R + V_L$, $i = V_i/(R + j\omega L)$, $V_L = j\omega L\,i$:</p>
$$\frac{V_L(\omega)}{V_i(\omega)} = \frac{j\omega L}{R + j\omega L}$$
<p>First order. High-pass: gain 0 → 1, phase +90° → 0, with $|H| = 0.707$ and phase +45° at $\omega_c = R/L$.</p>
<div class="callout">Swap which component the output is taken across and the filter type flips: across C (or R in an RL circuit) is low-pass; across L (or R in an RC circuit) is high-pass.</div>

<h3>5. Butterworth and Chebyshev filters</h3>
<p>Lecture 20.2. Two well-known filter families. The Butterworth filter of order $n$ has</p>
$$|H(\omega)|^2 = \frac{1}{1 + \left(\dfrac{\omega}{\omega_c}\right)^{2n}}$$
<ul><li>At $\omega = \omega_c$, $|H|^2 = \tfrac12$ for every $n$: all Butterworth filters are −3 dB at the cut-off.</li><li>The pass band is maximally flat (no ripple); higher $n$ gives a squarer edge, closer to the ideal.</li><li>Well above $\omega_c$, $|H|\approx(\omega_c/\omega)^n$: the gain falls $20n$ dB per decade.</li></ul>
<p>The <b>Chebyshev</b> filter (lecture figure) trades a <b>ripple</b> in the pass band for a steeper drop just after the cut-off.</p>

<h3>6. Bandwidth and the −3 dB point</h3>
<p>The bandwidth is the range over which the output is attenuated by less than 3 dB compared with the input. Treating signals as voltages, power goes as the square, so the <b>half-power point</b> is where</p>
$$\frac{Y^2}{X^2} = \frac12\ \Rightarrow\ \log_{10}\left(\frac YX\right)^2 = \log_{10}\frac12\ \Rightarrow\ 2\log_{10}\frac YX = -0.3\ \Rightarrow\ 20\log_{10}\frac YX = -3\ \text{dB}$$
<p>(the last step multiplies by 10 to get decibels). So the cut-off is where $|H| = 1/\sqrt2 = 0.707$ of the pass-band gain.</p>
<ol class="steps"><li>Set $|H(\omega)| = \dfrac{|H(0)|}{\sqrt2}$ (or the pass-band gain).</li><li>Square both sides: $|N|^2 = \tfrac12|H(0)|^2|D|^2$, with $|a + jb|^2 = a^2 + b^2$.</li><li>Solve the polynomial in $\omega^2$ (substitute $x = \omega^2$) and keep the positive root.</li></ol>

<h3>7. Cut-off of the spring–mass–damper</h3>
<p>Lecture 20.2 asks whether the base-excited spring–mass–damper from Lecture 18.3 is a low-pass filter. Its Bode plot is flat (0 dB) at low frequency, has a small resonant bump, then falls, with the phase going from 0 to −180°: yes, a low-pass.</p>
$$\left|\frac{104 + 4j\omega}{(104 - \omega^2) + 4j\omega}\right| = \frac{1}{\sqrt2}\ \Rightarrow\ 104^2 + 16\omega^2 = \tfrac12\left[(104 - \omega^2)^2 + 16\omega^2\right]$$
$$\omega^4 - 224\omega^2 - 10816 = 0\ \Rightarrow\ \omega^2 = \frac{224 + \sqrt{224^2 + 43264}}{2} = 264.8\ \Rightarrow\ \omega_c = 16.27\ \text{rad/s}$$
<p>Note the cut-off is above $\omega_n\approx10.2$ rad/s: the resonant bump keeps the gain above 0.707 until 16.27 rad/s. (The notes suggest checking this in the Lec19s Scilab simulation.)</p>

<h3>8. Finding a filter's FRF from its input and output</h3>
<p>Additional notes. If you know the input and output signals, transform both and divide: $H = Y(\omega)/X(\omega)$. Useful transform: for $t \gt 0$, $ae^{-bt}\ \leftrightarrow\ \dfrac{a}{b + j\omega}$. Then find the −3 dB point relative to $H(0)$ as in section 6. Worked in the practice questions.</p>`,
formulas: [
 {name:"Ideal low-pass", tex:R`H(\omega)=e^{-jk\omega}\ \ (|\omega|\lt\omega_c),\qquad 0\ \text{otherwise}`},
 {name:"Linear phase = constant delay", tex:R`x\cos(\omega t-k\omega)=x\cos\omega(t-k)`},
 {name:"Ideal low-pass impulse response", tex:R`h(t)=\frac{\omega_c}{\pi}\,\frac{\sin\omega_c(t-k)}{\omega_c(t-k)}`},
 {name:"RC low-pass", tex:R`\frac{V_C}{V_i}=\frac{1}{1+j\omega RC},\quad\omega_c=\frac1{RC}`},
 {name:"RL high-pass", tex:R`\frac{V_L}{V_i}=\frac{j\omega L}{R+j\omega L},\quad\omega_c=\frac RL`},
 {name:"Butterworth", tex:R`|H(\omega)|^2=\frac{1}{1+(\omega/\omega_c)^{2n}}`},
 {name:"Half-power point", tex:R`\frac{Y^2}{X^2}=\frac12\iff20\log_{10}\frac YX=-3\ \text{dB}\iff\frac YX=\frac1{\sqrt2}`},
 {name:"Exponential pulse transform", tex:R`ae^{-bt}\ (t\gt0)\ \leftrightarrow\ \frac{a}{b+j\omega}`}
],
questions: [
 {src:"Lecture 20.1 practice", q:R`An ideal low-pass filter has cut-off 100 rad/s and phase $\phi = -0.02\omega$. The input is $x(t) = \cos10t + 0.5\cos50t + 0.2\cos200t$. Write the output and describe it.`,
  hint:"Unit gain and phase −kω below the cut-off, zero above.",
  sol:R`<p>10 and 50 rad/s are in the pass band: gain 1, phases $-0.2$ and $-1.0$ rad. 200 rad/s is above the cut-off: removed.</p>
  $$y(t) = \cos(10t - 0.2) + 0.5\cos(50t - 1.0) = \cos10(t - 0.02) + 0.5\cos50(t - 0.02)$$
  <p>Both surviving components are delayed by the same 0.02 s, so the output is the low-frequency part of the input, undistorted, shifted 20 ms later. That is the point of linear phase.</p>`,
  ans:"y = cos 10(t − 0.02) + 0.5 cos 50(t − 0.02)", prov:"Worked by Claude; no solution is available."},
 {src:"Additional notes", q:R`Show that the impulse response of an ideal low-pass filter with cut-off $\omega_c$ and phase $-k\omega$ is $h(t) = \dfrac{\omega_c}{\pi}\dfrac{\sin\omega_c(t-k)}{\omega_c(t-k)}$. What do you do with it?`,
  hint:"Inverse Fourier transform of e^(−jkω) between −ω_c and ω_c; combine the exponentials.",
  sol:R`<p>$h(t) = \dfrac{1}{2\pi}\displaystyle\int_{-\omega_c}^{\omega_c}e^{j\omega(t-k)}d\omega = \dfrac{1}{2\pi}\cdot\dfrac{e^{j\omega_c(t-k)} - e^{-j\omega_c(t-k)}}{j(t-k)} = \dfrac{1}{2\pi}\cdot\dfrac{2j\sin\omega_c(t-k)}{j(t-k)} = \dfrac{\sin\omega_c(t-k)}{\pi(t-k)}$</p>
  <p>Multiply top and bottom by $\omega_c$ to get the sinc form. It peaks at $t = k$ (height $\omega_c/\pi$). Convolve it with the input to get the output in the time domain.</p>`,
  prov:"From the derivation in the Lecture 20 additional notes."},
 {src:"Lecture 20.1 practice", q:R`An RC low-pass filter has $R = 1$ kΩ and $C = 1\ \mu$F. Find its cut-off frequency, and its gain (as a ratio and in dB) and phase at 2000 rad/s.`,
  sol:R`<p>$\omega_c = 1/RC = 1/(10^3\times10^{-6}) = 1000$ rad/s ($= 159$ Hz).</p>
  <p>At 2000 rad/s, $\omega RC = 2$: $|H| = 1/\sqrt{1 + 4} = 0.447$, i.e. $20\log_{10}0.447 = -7.0$ dB; phase $-\tan^{-1}2 = -63.4°$.</p>`,
  ans:"1000 rad/s; 0.447 (−7.0 dB), −63.4°", prov:"Worked by Claude; no solution is available. Numbers checked in code."},
 {src:"Lecture 20.2 practice", q:R`An RL circuit has $R = 10\ \Omega$, $L = 0.1$ H, output across the inductor. Find the FRF, the type of filter, the cut-off, and the gain and phase at 50 rad/s.`,
  sol:R`<p>$\dfrac{V_L}{V_i} = \dfrac{j\omega L}{R + j\omega L} = \dfrac{0.1j\omega}{10 + 0.1j\omega}$: first-order high-pass.</p>
  <p>Cut-off where $\omega L = R$: $\omega_c = R/L = 100$ rad/s.</p>
  <p>At 50 rad/s: $\dfrac{5j}{10 + 5j}$. Gain $= 5/\sqrt{125} = 0.447$; phase $= 90° - \tan^{-1}(0.5) = 90° - 26.6° = 63.4°$ (a lead).</p>`,
  ans:"High-pass; 100 rad/s; 0.447∠+63.4°", prov:"Worked by Claude; no solution is available. Numbers checked in code."},
 {src:"Lecture 20.2 practice", q:R`For Butterworth filters of order 1, 2 and 4, find the gain at $\omega = \omega_c$ and at $\omega = 2\omega_c$. What lowest order keeps the gain at $3\omega_c$ below 0.05?`,
  hint:"|H| = 1/√(1 + (ω/ω_c)^2n).",
  sol:R`<p>At $\omega_c$: $|H| = 1/\sqrt{1+1} = 0.707$ (−3 dB) for every order.</p>
  <table class="data num"><tr><th>n</th><th>|H| at 2ω<sub>c</sub></th><th>dB</th></tr><tr><td>1</td><td>1/√5 = 0.447</td><td>−7.0</td></tr><tr><td>2</td><td>1/√17 = 0.243</td><td>−12.3</td></tr><tr><td>4</td><td>1/√257 = 0.062</td><td>−24.1</td></tr></table>
  <p>At $3\omega_c$: n = 2 gives $1/\sqrt{82} = 0.110$; n = 3 gives $1/\sqrt{730} = 0.037$. So <b>n = 3</b>.</p>
  <p>Higher order means a sharper roll-off after the same −3 dB point, closer to the ideal filter.</p>`,
  ans:"0.707 at ω_c for all n; 0.447, 0.243, 0.062 at 2ω_c; n = 3", prov:"Worked by Claude; no solution is available. Numbers checked in code."},
 {src:"Lecture 20.2", q:R`Show that the half-power point corresponds to −3 dB, and explain why it's used to define a filter's bandwidth.`,
  sol:R`<p>Power goes as voltage squared, so half power means $Y^2/X^2 = \tfrac12$. Taking logs: $2\log_{10}(Y/X) = \log_{10}0.5 = -0.301$. Multiplying by 10 to get decibels: $20\log_{10}(Y/X) = -3.01\approx-3$ dB, i.e. $Y/X = 1/\sqrt2 = 0.707$.</p>
  <p>Real filters have no sharp edge, so the cut-off needs a convention: the bandwidth is the range over which the output is attenuated by less than 3 dB, i.e. where at least half the input power gets through.</p>`,
  prov:"From the derivation in Lecture 20.2."},
 {src:"Lecture 20.2 example", q:R`The base-excited spring–mass–damper has $\dfrac{Y}{X} = \dfrac{104 + 4j\omega}{(104 - \omega^2) + 4j\omega}$. Is it a low-pass filter? Find its cut-off frequency.`,
  hint:"Set the magnitude to 1/√2, square, and solve as a quadratic in ω².",
  sol:R`<p>At ω = 0 the gain is 1 and at high ω it falls as $4/\omega$, so yes, low-pass (with a resonant bump near $\omega_n\approx10.2$ rad/s).</p>
  <p>$|N|^2 = \tfrac12|D|^2$: $10816 + 16\omega^2 = \tfrac12\left[(104 - \omega^2)^2 + 16\omega^2\right]$</p>
  <p>$21632 + 32\omega^2 = 10816 - 208\omega^2 + \omega^4 + 16\omega^2\ \Rightarrow\ \omega^4 - 224\omega^2 - 10816 = 0$</p>
  <p>$\omega^2 = \dfrac{224 + \sqrt{50176 + 43264}}{2} = \dfrac{224 + 305.7}{2} = 264.8$ (the other root is negative), so $\omega_c = 16.27$ rad/s.</p>`,
  ans:"Yes; ω_c = 16.27 rad/s", prov:"Follows the worked example in Lecture 20.2 (checked numerically)."},
 {src:"Additional notes example", q:R`A voltage $x(t) = 2e^{-2t}$ for $t \gt 0$ (zero before) is applied to a filter, and the output is $y(t) = \tfrac23e^{-2t} - 2e^{-t} + \tfrac43e^{-t/2}$ for $t \gt 0$ (zero before). Find the spectra of the input and output, hence the FRF. At what frequency is the response 3 dB below the response at 0 rad/s?`,
  hint:"Each term ae^(−bt) transforms to a/(b + jω). Combine Y/X over a common denominator.",
  sol:R`<p>$X(\omega) = \displaystyle\int_0^\infty2e^{-(2+j\omega)t}dt = \dfrac{2}{2 + j\omega}$.</p>
  <p>$Y(\omega) = \dfrac{2}{3(2 + j\omega)} - \dfrac{2}{1 + j\omega} + \dfrac{4}{3(\frac12 + j\omega)}$.</p>
  <p>$H = \dfrac YX = \dfrac13 - \dfrac{2 + j\omega}{1 + j\omega} + \dfrac{2(2 + j\omega)}{3(\frac12 + j\omega)} = \dfrac{1}{(1 + 2j\omega)(1 + j\omega)}$, so $H(0) = 1$.</p>
  <p>−3 dB: $|1 + 2j\omega|\,|1 + j\omega| = \sqrt2\ \Rightarrow\ (1 + 4\omega^2)(1 + \omega^2) = 2$. With $x = \omega^2$: $4x^2 + 5x - 1 = 0$, $x = \dfrac{-5 + \sqrt{41}}{8} = 0.1754$, so $\omega = 0.419$ rad/s.</p>
  <p class="small">The notes give 0.4175 rad/s; √0.1754 = 0.4188. The difference is rounding.</p>`,
  ans:"X = 2/(2 + jω); H = 1/((1 + 2jω)(1 + jω)); ω ≈ 0.419 rad/s", prov:"Follows the worked example in the Lecture 20 additional notes; the final root is recomputed in code (0.4188 vs the notes' 0.4175)."}
],
traps: ["Linear phase (φ = −kω) is what you want: it means a constant time delay, not zero phase.", "Every Butterworth filter is −3 dB (0.707) at ω_c, whatever its order; order changes the slope after it.", "The −3 dB point is relative to the pass-band gain (often H(0)), not to 1, when the gain isn't unity.", "Square the magnitudes before solving: |a + jb|² = a² + b².", "Solving for ω² gives two roots; keep the positive one.", "Output across C is low-pass, across L is high-pass.", "The spring–mass–damper cut-off (16.27 rad/s) is above its natural frequency (≈10.2 rad/s) because of the resonant bump."]
});
})();
