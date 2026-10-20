/* MEC1014 Mechanics of Machines — forced vibration (Lecture 2, Tutorials 4–5) and gears (Lecture 3) */
(function(){
const R = String.raw;
const T = STUDY.content.mom = STUDY.content.mom || { topics: [] };

T.topics.push({
id: "harmonic", part: "Forced vibration", title: "Harmonic Forcing & Frequency Response",
lectures: "Lecture 2 (slides 1–26)", status: "lectured",
summary: "A sinusoidal force on a mass–spring(–damper): total response = transient + steady state, the undamped amplitude and phase below/at/above resonance, the damped amplitude and phase lag, the dynamic magnification factor and the resonance peak.",
theory: R`
<h3>0. Total response = homogeneous + particular</h3>
<p>Equation: $m\ddot x + c\dot x + kx = f(t)$ with $f(t) = F\cos\omega t$ or $F\sin\omega t$, where $\omega$ is the <b>forcing</b> frequency.</p>
$$x(t) = x_h(t) + x_p(t)$$
<ul>
<li>$x_h$: free vibration at $\omega_n$ (or $\omega_d$). With damping it decays: the <b>transient</b>.</li>
<li>$x_p$: steady-state response at the forcing frequency $\omega$.</li>
</ul>
<div class="callout key"><b>Apply the initial conditions to the total response</b> $x_h + x_p$, never to $x_h$ alone.</div>

<h3>1. Undamped forcing</h3>
<p>$m\ddot x + kx = F\cos\omega t$. Try $x_p = X\cos\omega t$:</p>
$$X = \frac{F}{k - m\omega^2} = \frac{F/k}{1-(\omega/\omega_n)^2}$$
<p><b>Lecture example</b> ($k=1$, $F=1$, $\omega_n = 3$, $x_0 = 1$, $v_0 = 0$):</p>
<ul>
<li>$\omega = 2.5$: $X = 1/(1-0.694) = 3.27$, so $x = -2.27\cos 3t + 3.27\cos 2.5t$. $x_p$ is <b>in phase</b> with the force.</li>
<li>$\omega = 4$: $X = 1/(1-1.78) = -1.29$, so $x = 2.29\cos 3t - 1.29\cos 4t$. Negative $X$ means <b>180° out of phase</b>.</li>
</ul>

<h3>2. Resonance with no damping</h3>
<p>When $\omega = \omega_n$ the trial $X\cos\omega t$ gives zero on the left-hand side, so it fails. Use $x_p = t[C_1\cos\omega_n t + C_2\sin\omega_n t]$, which gives</p>
$$x_p(t) = \frac{F}{2m\omega_n}\,t\sin\omega_n t$$
<p>The amplitude grows linearly inside the envelope $\pm\dfrac{F}{2m\omega_n}t$, with a 90° phase lag. With no damping it grows without limit (the Tacoma Narrows bridge, 1940).</p>
<div class="tbl"><table class="data">
<tr><th>$\omega/\omega_n$</th><th>Phase</th><th>What the mass does</th></tr>
<tr><td>&lt; 1 (slow)</td><td>0°</td><td>Moves with the force</td></tr>
<tr><td>= 1 (resonance)</td><td>90°</td><td>Amplitude grows (∞ without damping)</td></tr>
<tr><td>&gt; 1 (fast)</td><td>180°</td><td>Moves opposite to the force</td></tr>
</table></div>

<h3>3. Damped steady state</h3>
<p>With $f = F\sin\omega t$, $x_p = X\sin(\omega t - \phi)$:</p>
$$X = \frac{F}{\sqrt{(k-m\omega^2)^2 + (c\omega)^2}} = \frac{F/k}{\sqrt{\left(1-r^2\right)^2 + (2\zeta r)^2}},\qquad r = \frac{\omega}{\omega_n}$$
$$\phi = \tan^{-1}\frac{c\omega}{k - m\omega^2} = \tan^{-1}\frac{2\zeta r}{1-r^2}$$
<p>$X_{static} = F/k$ is the deflection if the same force were applied slowly. The transient $x_h = Ae^{-\zeta\omega_n t}\sin(\omega_d t + \phi_{IC})$ dies away, leaving only $x_p$.</p>
<div class="callout"><b>Phase above resonance:</b> when $r > 1$ the denominator $1-r^2$ is negative, so the phase lag is between 90° and 180°. A calculator's $\tan^{-1}$ returns a negative angle: add 180°.</div>

<h3>4. Dynamic magnification factor</h3>
$$M = \frac{X}{X_{static}} = \frac{1}{\sqrt{(1-r^2)^2 + (2\zeta r)^2}}$$
<div class="tbl"><table class="data">
<tr><th></th><th colspan="2">Undamped</th><th colspan="2">Damped</th></tr>
<tr><th>Condition</th><th>M</th><th>φ</th><th>M</th><th>φ</th></tr>
<tr><td>$\omega \to 0$</td><td>→ 1</td><td>0°</td><td>→ 1</td><td>→ 0°</td></tr>
<tr><td>$\omega = \omega_n$</td><td>→ ∞</td><td>90°</td><td>$1/2\zeta$</td><td>90°</td></tr>
<tr><td>$\omega \to \infty$</td><td>→ 0</td><td>180°</td><td>→ 0</td><td>→ 180°</td></tr>
</table></div>

<h3>5. Resonance peak</h3>
<p>Setting $dM/dr = 0$:</p>
$$\frac{\omega_{max}}{\omega_n} = \sqrt{1-2\zeta^2},\qquad M_{max} = \frac{1}{2\zeta\sqrt{1-\zeta^2}}$$
<p>The peak sits slightly <b>below</b> $\omega_n$ (and below $\omega_d$), and there is no peak at all for $\zeta \ge 1/\sqrt2$. Example: $\zeta = 0.2 \Rightarrow \omega_{max} = 0.959\omega_n$, $M_{max} = 2.55$ (vs $1/2\zeta = 2.5$ at $\omega_n$).</p>

<h3>6. Phasor picture and the three zones</h3>
<p>The force $F$ balances three phasors: spring $kX$ (in phase with $x$), damper $c\omega X$ (90° ahead) and inertia $m\omega^2X$ (180°). By Pythagoras, $F^2 = (kX - m\omega^2X)^2 + (c\omega X)^2$.</p>
<ul>
<li>$\omega \ll \omega_n$: <b>stiffness-controlled</b>, $X \approx F/k$.</li>
<li>$\omega \approx \omega_n$: <b>damping-controlled</b>, $X \approx F/(c\omega)$.</li>
<li>$\omega \gg \omega_n$: <b>mass-controlled</b>, $X \approx F/(m\omega^2)$.</li>
</ul>
<p>Measured frequency-response functions show the same information as compliance $X/F$, mobility $V/F$ or inertance $A/F$, usually on log–log axes.</p>`,
formulas: [
 {name:"Undamped amplitude", tex:R`X = \frac{F/k}{1-(\omega/\omega_n)^2}`},
 {name:"Resonance (undamped)", tex:R`x_p = \frac{F}{2m\omega_n}t\sin\omega_n t`},
 {name:"Damped amplitude", tex:R`X = \frac{F/k}{\sqrt{(1-r^2)^2+(2\zeta r)^2}}`, note:"r = ω/ω_n"},
 {name:"Phase lag", tex:R`\phi = \tan^{-1}\frac{2\zeta r}{1-r^2}`},
 {name:"At resonance", tex:R`M = \frac{1}{2\zeta},\quad \phi = 90^\circ`},
 {name:"Peak frequency", tex:R`\omega_{max} = \omega_n\sqrt{1-2\zeta^2}`},
 {name:"Peak magnification", tex:R`M_{max} = \frac{1}{2\zeta\sqrt{1-\zeta^2}}`}
],
questions: [
 {src:"Tutorial 4 Q1", see:[1,0], q:R`A laser table is an undamped SDOF system with $m = 500$ g and $k = 18$ N/m. A fan applies $F(t) = 2\cos(5.5t)$ N. It starts from rest ($x_0 = 0$, $v_0 = 0$). Find $\omega_n$, say whether the steady state is in or out of phase with the force, and find the exact displacement $x(t)$.`,
  hint:"X = F/(k − mω²). Then apply x(0) = 0 and ẋ(0) = 0 to x_h + x_p together.",
  sol:R`<p>$\omega_n = \sqrt{18/0.5} = 6$ rad/s; $r = 5.5/6 = 0.917 < 1$ so the response is <b>in phase</b>.</p>
  <p>$X = \dfrac{2}{18 - 0.5(5.5)^2} = \dfrac{2}{2.875} = 0.6957$ m.</p>
  <p>$x(t) = A\cos 6t + B\sin 6t + 0.6957\cos 5.5t$.</p>
  <p>$x(0) = A + 0.6957 = 0 \Rightarrow A = -0.6957$; $\dot x(0) = 6B = 0 \Rightarrow B = 0$.</p>
  <p>$$x(t) = 0.6957\left[\cos 5.5t - \cos 6t\right]\ \text{m}$$</p>
  <p>Two close frequencies: this beats, with the envelope swelling and shrinking at the difference frequency (0.5 rad/s).</p>`,
  ans:"ω_n = 6 rad/s, in phase, x = 0.696(cos 5.5t − cos 6t) m", prov:"Follows the posted solution (which has a typo, 0.06956, for the particular amplitude)."},
 {src:"Tutorial 4 Q2", see:[2], q:R`An undamped frame is forced at resonance by $F_0\cos\omega t$. Show that $x_p = X\cos\omega t$ fails and that $x_p = t[C_1\cos\omega t + C_2\sin\omega t]$ gives $x_p = \dfrac{F_0}{2m\omega_n}t\sin\omega t$. For $F = 10$ N, $k = 100$ N/m, $m = 1$ kg, find the slope of the amplitude growth.`,
  hint:"Substitute into ẍ + ω_n²x = (F₀/m)cos ω_n t and match the sin and cos terms.",
  sol:R`<p>With $\omega = \omega_n$: $X\cos\omega_n t$ gives $(-\omega_n^2 + \omega_n^2)X\cos\omega_n t = 0 \ne F_0\cos\omega_n t/m$. It fails.</p>
  <p>For $x_p = t[C_1\cos\omega_n t + C_2\sin\omega_n t]$:</p>
  <p>$\ddot x_p = 2\omega_n[-C_1\sin\omega_n t + C_2\cos\omega_n t] - \omega_n^2 x_p$</p>
  <p>Substituting, the $\omega_n^2 x_p$ terms cancel: $2\omega_n[-C_1\sin\omega_n t + C_2\cos\omega_n t] = \dfrac{F_0}{m}\cos\omega_n t$.</p>
  <p>So $C_1 = 0$, $C_2 = F_0/(2m\omega_n)$, giving $x_p = \dfrac{F_0}{2m\omega_n}t\sin\omega_n t$.</p>
  <p>Numbers: $\omega_n = 10$ rad/s, envelope $\pm\dfrac{10}{2(1)(10)}t = \pm 0.5t$ m. The amplitude grows at <b>0.5 m/s</b>.</p>`,
  ans:"Envelope ±0.5t m (slope 0.5 m/s)", prov:"Follows the posted solution."},
 {src:"Tutorial 4 Q3", see:[3,4,2], q:R`A motor assembly: $m = 10$ kg, $k = 4000$ N/m, driven by $F(t) = 150\sin 20t$ N. (a) With $c = 80$ N·s/m find the steady-state amplitude and phase lag. (b) Write the form of $x_h(t)$; does it grow, stay or vanish? (c) What happens to the phase lag if the damper is removed?`,
  hint:"Check r = ω/ω_n first. It's exactly 1 here.",
  sol:R`<p>$\omega_n = \sqrt{4000/10} = 20$ rad/s $= \omega$: <b>resonance</b>, so $\phi = \tan^{-1}(\infty) = 90^\circ$.</p>
  <p>$c_{cr} = 2\sqrt{4000(10)} = 400$ N·s/m, $\zeta = 0.2$.</p>
  <p>$X = \dfrac{F/k}{2\zeta} = \dfrac{150/4000}{0.4} = 0.0938$ m $= 93.8$ mm.</p>
  <p>(b) $\omega_d = 20\sqrt{1-0.04} = 19.6$ rad/s: $x_h = e^{-4t}[A\cos 19.6t + B\sin 19.6t]$. It <b>vanishes</b> (transient).</p>
  <p>(c) With $c = 0$ at resonance the steady-state amplitude is unbounded: $x_p$ becomes $\frac{F}{2m\omega_n}t\sin(\omega t - 90^\circ)$, growing linearly. The phase lag is still 90°, but the amplitude grows until something fails.</p>`,
  ans:"X = 93.8 mm, φ = 90°; x_h decays as e^(−4t)", prov:"Follows the posted solution."},
 {src:"Tutorial 5 Q3", see:[5], q:R`The peak amplitude of a spring–mass–dashpot system under $F\sin\omega t$ is 5 cm. With $m = 0.3$ kg, $c = 0.048$ N·s/m and $k = 12$ N/m, what would the deflection be if the same force were applied statically?`,
  hint:"Static deflection = peak amplitude ÷ M_max, with M_max = 1/(2ζ√(1−ζ²)).",
  sol:R`<p>$\zeta = \dfrac{0.048}{2\sqrt{12 \times 0.3}} = 0.01265$.</p>
  <p>$M_{max} = \dfrac{1}{2(0.01265)\sqrt{1-0.01265^2}} = 39.5$.</p>
  <p>$X_{static} = 5/39.5 = 0.127$ cm $\approx 1.26$ mm.</p>
  <p>(Damping this light means $M_{max} \approx 1/2\zeta$; the peak is at $\omega = \omega_n\sqrt{1-2\zeta^2} \approx 6.32$ rad/s.)</p>`,
  ans:"≈ 1.26 mm", prov:"Follows the posted solution."}
],
traps: [
 "Apply the initial conditions to x_h + x_p, not just to x_h.",
 "A negative X in the undamped formula means 180° out of phase, not a negative amplitude.",
 "Above resonance tan⁻¹(2ζr/(1−r²)) comes out negative on a calculator. The true lag is 180° minus that magnitude.",
 "At resonance the damped amplitude is (F/k)/(2ζ), with φ = 90° exactly, regardless of ζ.",
 "The peak response is slightly below ω_n (at ω_n√(1−2ζ²)), not at ω_d.",
 "Undamped resonance isn't 'infinite at once': the amplitude grows linearly, slope F/(2mω_n)."
]
});

T.topics.push({
id: "imbalance", part: "Forced vibration", title: "Rotating Imbalance & Base Excitation",
lectures: "Lecture 2 (slides 27–42)", status: "lectured",
summary: "Two common sources of forcing: an eccentric rotating mass (force grows with ω²) and movement of the support (vehicle on a road, isolation mounts). Amplitude, phase, resonance peaks and transmissibility.",
theory: R`
<h3>0. Eccentric rotating mass</h3>
<p>An out-of-balance mass $m_e$ at radius $r_e$ spinning at $\omega$ produces a force with vertical component</p>
$$f(t) = m_e r_e\omega^2\sin\omega t$$
<p>The force grows with the <b>square of the speed</b>. $m_e r_e$ (kg·m) is called the out-of-balance.</p>

<h3>1. Response to imbalance</h3>
<p>Substitute $F = m_e r_e\omega^2$ into the damped amplitude formula:</p>
$$X = \frac{m_e r_e\omega^2/k}{\sqrt{(1-r^2)^2+(2\zeta r)^2}}\qquad\Leftrightarrow\qquad \frac{mX}{m_e r_e} = \frac{r^2}{\sqrt{(1-r^2)^2+(2\zeta r)^2}}$$
<p>Here $m$ is the <b>total</b> mass of the machine (including $m_e$). Phase: same as for a direct force, $\phi = \tan^{-1}\frac{2\zeta r}{1-r^2}$.</p>
<ul>
<li>Low speed: $X \to 0$ (no force).</li>
<li>High speed: $mX/m_e r_e \to 1$, so $X \to m_e r_e/m$. The machine spins about the combined centre of mass.</li>
<li>Peak at $\omega/\omega_n = 1/\sqrt{1-2\zeta^2}$, slightly <b>above</b> $\omega_n$ because the force keeps rising with speed. $X_{max} = \dfrac{m_e r_e/m}{2\zeta\sqrt{1-\zeta^2}}$.</li>
</ul>

<h3>2. Worked example (lecture)</h3>
<p>A 35 kg motor at 60 Hz on a foundation with $k = 3$ MN/m and $c = 2000$ N·s/m; out-of-balance 0.2 kg·m.</p>
<ol class="steps">
<li>$\omega = 2\pi(60) = 377$ rad/s, $F = 0.2(377)^2 = 28\,426$ N.</li>
<li>$\omega_n = \sqrt{3\times10^6/35} = 292.8$ rad/s, $r = 1.29$, $\zeta = 2000/\sqrt{4(35)(3\times10^6)} = 0.098$.</li>
<li>$X_s = F/k = 9.48$ mm, $M = 1/\sqrt{(1-1.29^2)^2 + (2 \times 0.098 \times 1.29)^2} = 1.41$, so $X = 13.4$ mm.</li>
<li>$\tan^{-1}\frac{0.253}{1-1.664} = -20.8^\circ$ on a calculator. Since $r>1$ the actual lag is $180 - 20.8 = 159^\circ$.</li>
</ol>

<h3>3. Base (support) excitation</h3>
<p>Now the anchor moves, $y = Y\sin\omega t$, and the mass responds. The spring and damper act on the relative motion:</p>
$$m\ddot x = -c(\dot x - \dot y) - k(x - y)\ \Rightarrow\ m\ddot x + c\dot x + kx = c\dot y + ky$$

<h3>4. Transmissibility</h3>
$$\frac{X}{Y} = \sqrt{\frac{1 + (2\zeta r)^2}{(1-r^2)^2 + (2\zeta r)^2}}$$
$$\phi = \tan^{-1}\frac{2\zeta r}{1-r^2} - \tan^{-1}(2\zeta r)$$
<ul>
<li>$X/Y = 1$ at $r = 0$ and again at $r = \sqrt2$, for any damping.</li>
<li>Below $r=\sqrt2$, the mass moves <b>more</b> than the base, with a peak near resonance.</li>
<li>Above $r = \sqrt2$, $X/Y < 1$: <b>isolation</b>. Here less damping isolates better.</li>
</ul>
<div class="callout key"><b>Vibration isolation design rule:</b> make the mount soft enough that the operating frequency is well above $\sqrt2\,\omega_n$.</div>
<p>The same expression gives the force transmitted to the ground by a vibrating machine on a spring–damper mount, $F_T/F$.</p>

<h3>5. Road profiles and accelerations</h3>
<p>A vehicle at speed $v$ over a sinusoidal road of wavelength $\lambda$ sees base excitation at $f = v/\lambda$, i.e. $\omega = 2\pi v/\lambda$. The acceleration amplitude of the body is $\omega^2 X$.</p>`,
formulas: [
 {name:"Imbalance force", tex:R`F = m_e r_e\omega^2`},
 {name:"Imbalance response", tex:R`\frac{mX}{m_e r_e} = \frac{r^2}{\sqrt{(1-r^2)^2+(2\zeta r)^2}}`},
 {name:"Imbalance peak", tex:R`\frac{\omega_{max}}{\omega_n} = \frac{1}{\sqrt{1-2\zeta^2}}`},
 {name:"Base excitation EOM", tex:R`m\ddot x + c\dot x + kx = c\dot y + ky`},
 {name:"Transmissibility", tex:R`\frac{X}{Y} = \sqrt{\frac{1+(2\zeta r)^2}{(1-r^2)^2+(2\zeta r)^2}}`},
 {name:"Isolation", tex:R`X/Y<1 \iff r>\sqrt2`},
 {name:"Road forcing", tex:R`\omega = \frac{2\pi v}{\lambda}`}
],
questions: [
 {src:"Lecture 2 example", see:[2,1], q:R`A 35 kg electric motor running at 60 Hz is mounted on an elastic foundation with stiffness 3 MN/m and viscous damping 2000 N·s/m. The out-of-balance is 0.2 kg·m. Find the amplitude and phase of the response.`,
  hint:"F = m_e r_e ω². Then it's the standard damped amplitude formula; watch the phase since r > 1.",
  sol:R`<p>$\omega = 377$ rad/s, $F = 0.2(377)^2 = 28\,426$ N; $\omega_n = 292.8$ rad/s, $r = 1.29$; $\zeta = 0.098$.</p>
  <p>$M = \dfrac{1}{\sqrt{(1-1.664)^2 + (0.253)^2}} = 1.41$, $X_s = 28426/3\times10^6 = 9.48$ mm, $X = 13.4$ mm.</p>
  <p>$\tan^{-1}(0.253/-0.664)$: the lecture writes $-20.8^\circ$; since $r > 1$ the response actually lags the force by $180 - 20.8 \approx 159^\circ$.</p>`,
  ans:"X ≈ 13.4 mm, phase lag ≈ 159° (lecture: −20.8°)", prov:"From the worked example in Lecture 2. Claude added the note on the phase quadrant."},
 {src:"Tutorial 4 Q4", fig:"mom_bar", see:[3,4], q:R`A slender bar of mass $m$ is pivoted at $L/4$ from its left end. A damper $c$ acts at the left end; a spring $k$ at the right end connects to a support moving as $y = Y\sin\omega t$. With $k = 200\,000$ N/m, $c = 400$ N·s/m, $L = 1.2$ m, $m = 10$ kg, $Y = 0.01$ m and $\omega = 350$ rad/s, find the steady-state amplitude of angular oscillation.`,
  hint:"Pivot-based inertia: I = mL²/12 + m(L/4)². The spring at 3L/4 gives K_θ = k(3L/4)² and an excitation moment k(3L/4)Y sin ωt.",
  sol:R`<p>$I = \tfrac{1}{12}mL^2 + m(L/4)^2 = \tfrac{7}{48}mL^2 = 2.1$ kg·m²</p>
  <p>$K_\theta = k(3L/4)^2 = \tfrac{9}{16}kL^2 = 162\,000$ N·m/rad; $C_\theta = c(L/4)^2 = 36$ N·m·s/rad</p>
  <p>$$\tfrac{7}{48}mL^2\ddot\theta + \tfrac{1}{16}cL^2\dot\theta + \tfrac{9}{16}kL^2\theta = \tfrac34 kLY\sin\omega t$$</p>
  <p>$\omega_n = \sqrt{27k/7m} = 277.7$ rad/s; $\zeta = 3c/(14m\omega_n) = 0.0309$.</p>
  <p>$\theta_s = \dfrac{\tfrac34 kLY}{\tfrac{9}{16}kL^2} = \dfrac{4Y}{3L} = 0.0111$ rad; $r = 350/277.7 = 1.26$.</p>
  <p>$\theta = \dfrac{0.0111}{\sqrt{(1-1.26^2)^2 + (2 \times 0.0309 \times 1.26)^2}} = 0.0187$ rad (about 1.07°).</p>`,
  ans:"θ ≈ 0.0187 rad", prov:"Follows the posted solution."},
 {src:"Tutorial 5 Q1", fig:"mom_road", see:[3,4,5], q:R`A 500 kg vehicle body sits on a suspension modelled as a 400 000 N/m spring in parallel with a 3000 N·s/m damper. The rigid wheels follow a sinusoidal road with amplitude 0.01 m and wavelength 2.5 m. At 52 m/s, what is the acceleration amplitude of the vehicle?`,
  hint:"Forcing frequency = v/λ. Use the transmissibility X/Y, then acceleration = ω²X.",
  sol:R`<p>$f = 52/2.5 = 20.8$ Hz, $\omega = 130.7$ rad/s.</p>
  <p>$\omega_n = \sqrt{400000/500} = 28.28$ rad/s, $r = 4.62$; $\zeta = 3000/(2\sqrt{400000 \times 500}) = 0.106$, $2\zeta r = 0.980$.</p>
  <p>$\dfrac{X}{Y} = \sqrt{\dfrac{1 + 0.980^2}{(1-4.62^2)^2 + 0.980^2}} = \sqrt{\dfrac{1.960}{415.2}} = 0.0687$</p>
  <p>$X = 0.0687(0.01) = 0.687$ mm; acceleration amplitude $= \omega^2X = 130.7^2(0.000687) = 11.7$ m/s² (about 1.2 g).</p>
  <p class="small">The posted solution uses this exact method and the same $r = 4.62$, $\zeta = 0.1061$, but writes $X/Y \approx 0.0588$ and gets 10.04 m/s². Putting its own numbers through the formula gives 0.0687 and 11.7 m/s², so the 0.0588 looks like an arithmetic slip. If your answer is 11.7 your method matches theirs.</p>`,
  ans:"≈ 11.7 m/s² (posted: 10.0)", prov:"Worked by Claude; follows the posted method, but the posted X/Y = 0.0588 doesn't follow from its own numbers (recomputed: 0.0687). The sheet gives the stiffness in N·s/m; it's treated as N/m, as the solution does."},
 {src:"Tutorial 5 Q2", fig:"mom_wash", see:[0,1], q:R`A washing machine has total mass 15 kg. A 0.8 kg lump of clothes sits at the drum radius of 200 mm; the drum turns at 1200 rpm. The spring stiffness is 350 N/mm and damping is neglected. Find the force in the spring.`,
  hint:"F = m_e r_e ω², X = F/(k − mω²) (undamped), spring force = kX.",
  sol:R`<p>$\omega = 1200(2\pi/60) = 125.7$ rad/s; $F = 0.8(0.2)(125.7)^2 = 2527$ N.</p>
  <p>$k = 350\,000$ N/m, $\omega_n = \sqrt{350000/15} = 152.8$ rad/s, $r = 0.823$ (below resonance, in phase).</p>
  <p>$X = \dfrac{2527}{350000 - 15(125.7)^2} = \dfrac{2527}{113\,130} = 22.3$ mm.</p>
  <p>Spring force amplitude $= kX = 350\,000(0.0223) \approx 7.8$ kN.</p>`,
  ans:"≈ 7.8 kN (X ≈ 22.3 mm)", prov:"Follows the posted solution (X = 0.0223 m, F = 7805 N)."}
],
traps: [
 "Imbalance force grows with ω², so the response tends to m_e r_e/m at high speed instead of zero.",
 "Use the machine's total mass m in ω_n and in m X / m_e r_e.",
 "Transmissibility is 1 at r = √2 for every ζ. Isolation only happens above it, and there extra damping makes isolation worse.",
 "Convert rpm and Hz to rad/s before squaring: ω = 2π·rpm/60.",
 "Road excitation frequency is speed / wavelength (Hz), then ×2π for rad/s."
]
});

T.topics.push({
id: "gears", part: "Power transmission", title: "Gear Trains: Simple, Compound & Gearboxes",
lectures: "Lecture 3 (slides 1–22)", status: "lectured",
summary: "Gear terminology, speed and torque ratios for simple and compound trains, idler gears, power conservation, reflected inertia and accelerating a gear train, a manual gearbox, internal gears and rack and pinion.",
theory: R`
<h3>0. Terminology</h3>
<ul>
<li><b>Pitch circle</b>: the equivalent friction-roller circle; its diameter is the pitch diameter $d$.</li>
<li><b>Number of teeth</b> $N$; <b>module</b> $m = d/N$ (mm); <b>circular pitch</b> $p = \pi d/N$; <b>diametral pitch</b> $P_d = N/d$.</li>
<li><b>Pressure angle</b> $\phi$. Involute profiles give a straight line of contact.</li>
</ul>
<p>Meshing gears must have the same module, so $d_1/N_1 = d_2/N_2$.</p>

<h3>1. Speed and torque ratios</h3>
<p>The pitch-line speed is shared: $\omega_1 d_1 = \omega_2 d_2$, so</p>
$$\frac{\omega_{out}}{\omega_{in}} = \frac{N_{in}}{N_{out}} = \frac{d_{in}}{d_{out}}$$
<p>With no losses, power in = power out: $T_{in}\omega_{in} = T_{out}\omega_{out}$, so torque scales inversely with speed. Gearing down (slower output) multiplies torque.</p>
<div class="callout">References define "gear ratio" in different ways. The lecture uses $n = N_{in}/N_{out} = \omega_{out}/\omega_{in}$, giving $T_{out} = T_{in}/n$. Always write which way round you mean.</div>

<h3>2. Simple trains and idlers</h3>
<p>All gears in one plane. For A→B→C: $\dfrac{\omega_C}{\omega_A} = \dfrac{N_A}{N_C}$. The middle gear cancels out. An <b>idler</b> only changes the direction (or bridges a large centre distance); it does not change the ratio. Each external mesh reverses the direction.</p>

<h3>3. Compound trains</h3>
<p>Two gears on the same shaft turn together. For A→B, C on B's shaft, C→D:</p>
$$\frac{\omega_D}{\omega_A} = \frac{N_A}{N_B}\times\frac{N_C}{N_D}$$
<p>That is, the product of (driver teeth / driven teeth) over each mesh. Large reductions in a compact space.</p>
<p><b>Lecture example:</b> 20 kW at 15 Hz into A (with B on the same shaft): $T_A = 20\,000/(2\pi \cdot 15) = 212.2$ N·m $= T_B$. Mesh B (30 teeth) → C (48 teeth): $\omega_C = \omega_B(30/48) = 58.9$ rad/s, $T_C = 212.2(48/30) = 339.5$ N·m $= T_D$ (D shares C's shaft).</p>

<h3>4. Accelerating a gear train: reflected inertia</h3>
<p>An inertia $I_{out}$ on a shaft turning at $n$ times the input speed feels, at the input, like</p>
$$I_{eq} = n^2 I_{out},\qquad I_{system} = I_{in} + n^2 I_{out},\qquad T_{in} = I_{system}\,\alpha_{in}$$
<p>This collapses the whole drivetrain to one equivalent inertia on the input shaft.</p>

<h3>5. A manual gearbox</h3>
<p>Input shaft gear 1 always drives countershaft gear 2. Sliding gears pick which countershaft gear meshes with which output gear:</p>
<div class="tbl"><table class="data num">
<tr><th>Gear</th><th>Path</th><th>$\omega_{out}/\omega_{in}$</th><th>$T_{out}/T_{in}$</th></tr>
<tr><td>1st</td><td>1-2-5-8</td><td>$\frac{N_1N_5}{N_2N_8} = 0.1563$</td><td>6.40</td></tr>
<tr><td>2nd</td><td>1-2-4-7</td><td>0.3235</td><td>3.09</td></tr>
<tr><td>3rd</td><td>1-2-3-6</td><td>0.5930</td><td>1.686</td></tr>
<tr><td>4th</td><td>straight through</td><td>1</td><td>1</td></tr>
<tr><td>Reverse</td><td>1-2-5-9-10-8</td><td>$-\frac{N_1N_5N_{10}}{N_2N_9N_8} = -0.191$</td><td>−5.23</td></tr>
</table></div>
<p>Teeth: 1:17, 2:43, 3:36, 4:27, 5:17, 6:24, 7:33, 8:43, 9:18, 10:22. In reverse the idler shaft adds an extra mesh to flip the direction.</p>

<h3>6. Internal gears and rack &amp; pinion</h3>
<ul>
<li><b>Internal gear:</b> both turn the same way. Centre distance $(d_2 - d_1)/2$. Same ratio formula.</li>
<li><b>Rack and pinion:</b> converts rotation to translation, $v = r_p\omega_p$. One revolution moves the rack $\pi d_p = m\pi N_p$. Power: $T\omega = Fv$.</li>
</ul>`,
formulas: [
 {name:"Module", tex:R`m = \frac{d}{N}`, note:"Must match for meshing gears"},
 {name:"Speed ratio", tex:R`\frac{\omega_{out}}{\omega_{in}} = \frac{N_{in}}{N_{out}} = \frac{d_{in}}{d_{out}}`},
 {name:"Power", tex:R`P = T\omega,\quad T_{in}\omega_{in} = T_{out}\omega_{out}`},
 {name:"Compound train", tex:R`\frac{\omega_D}{\omega_A} = \frac{N_A}{N_B}\cdot\frac{N_C}{N_D}`},
 {name:"Reflected inertia", tex:R`I_{system} = I_{in} + n^2 I_{out}`, note:"n = ω_out/ω_in"},
 {name:"Rack travel per rev", tex:R`L = \pi d_p = m\pi N_p`}
],
questions: [
 {src:"Lecture 3 example", see:[3,1], q:R`A motor supplies 20 kW at 15 Hz to gear A. B is on A's shaft and meshes with C (B has 30 teeth, C has 48); D is on C's shaft. With no losses, find the torque available at gear D.`,
  hint:"Same shaft → same speed and torque. Across a mesh the speed scales by N_driver/N_driven and torque by the inverse.",
  sol:R`<p>$T_A = \dfrac{P}{\omega} = \dfrac{20\,000}{2\pi(15)} = 212.2$ N·m, and $T_B = T_A$, $\omega_B = \omega_A = 94.2$ rad/s.</p>
  <p>$\omega_C = \omega_B\dfrac{N_B}{N_C} = 94.2 \times \dfrac{30}{48} = 58.9$ rad/s (9.375 Hz).</p>
  <p>$T_C = T_B\dfrac{\omega_B}{\omega_C} = 212.2 \times 1.6 = 339.5$ N·m $= T_D$ (sometimes written negative to show it turns the other way).</p>`,
  ans:"T_D ≈ 339.5 N·m", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 gearbox", see:[5], q:R`For the gearbox with teeth 1:17, 2:43, 3:36, 4:27, 5:17, 6:24, 7:33, 8:43, 9:18, 10:22, find the speed ratio and torque ratio in 2nd gear (path 1-2-4-7) and in reverse (1-2-5-9-10-8).`,
  hint:"Multiply (driver/driven) for each mesh. Gears on the same shaft don't form a mesh.",
  sol:R`<p>2nd: meshes 1→2 and 4→7. $\dfrac{\omega_{out}}{\omega_{in}} = \dfrac{N_1}{N_2}\cdot\dfrac{N_4}{N_7} = \dfrac{17}{43}\cdot\dfrac{27}{33} = 0.3235$, torque ratio $1/0.3235 = 3.09$.</p>
  <p>Reverse: meshes 1→2, 5→9, 10→8 (9 and 10 share the idler shaft). $\dfrac{17}{43}\cdot\dfrac{17}{18}\cdot\dfrac{22}{43} = 0.191$, with the direction reversed: $-0.191$; torque ratio $-5.23$.</p>`,
  ans:"2nd: 0.3235 (torque ×3.09); reverse: −0.191 (torque ×5.23)", prov:"From the lecture's gearbox table; the reverse ratio was evaluated by Claude."}
],
traps: [
 "Gears on the same shaft have the same speed. Only meshes change the ratio.",
 "Idler gears don't change the ratio, only the direction.",
 "Torque goes the opposite way to speed: a speed reduction multiplies torque (no losses).",
 "Reflected inertia uses the speed ratio SQUARED.",
 "Check which way round 'gear ratio' is defined in the question before quoting a number."
]
});

T.topics.push({
id: "epicyclic", part: "Power transmission", title: "Epicyclic (Planetary) Gears",
lectures: "Lecture 3 (slides 23–38)", status: "lectured",
summary: "Sun, planets, ring and carrier: the geometry constraint, the Willis equation, the tabular method, the three standard fixed-member cases, torque balance, compound epicyclic trains and the equivalent inertia of a planetary system.",
theory: R`
<h3>0. The parts and geometry</h3>
<p><b>Sun</b> ($N_s$), <b>planets</b> ($N_p$), <b>ring</b> (internal teeth, $N_r$) and the <b>carrier</b> (arm/link) holding the planets. Geometry: $r_r = r_s + 2r_p$, so with equal module</p>
$$N_r = N_s + 2N_p,\qquad \text{carrier arm } l = r_s + r_p$$
<p>Adding identical planets on the same carrier doesn't change the kinematics; it shares the load.</p>

<h3>1. Willis equation</h3>
<p>Relative to the carrier, the train is a simple train (sun → planet → ring, with the ring turning the opposite way to the sun):</p>
$$\frac{\omega_s - \omega_c}{\omega_r - \omega_c} = -\frac{N_r}{N_s}\qquad\text{or}\qquad N_s(\omega_s - \omega_c) = N_r(\omega_c - \omega_r)$$
<p>Planet speed: $\omega_p = \omega_c - \dfrac{N_s}{N_p}(\omega_s - \omega_c)$.</p>

<h3>2. The three standard cases</h3>
<div class="tbl"><table class="data">
<tr><th>Fixed</th><th>Result</th></tr>
<tr><td>Ring ($\omega_r = 0$)</td><td>$\omega_s = \left(1 + \dfrac{N_r}{N_s}\right)\omega_c$: sun in, carrier out, big reduction, same direction</td></tr>
<tr><td>Sun ($\omega_s = 0$)</td><td>$\omega_r = \left(1 + \dfrac{N_s}{N_r}\right)\omega_c$: same direction</td></tr>
<tr><td>Carrier ($\omega_c = 0$)</td><td>$\omega_r = -\dfrac{N_s}{N_r}\omega_s$: an ordinary train, direction reversed</td></tr>
</table></div>

<h3>3. Tabular method</h3>
<p>Works for any arrangement:</p>
<ol class="steps">
<li>Lock everything and turn the whole assembly +1 rev: every member +1.</li>
<li>Fix the carrier and turn the member that is actually fixed −1 rev; work out the others by the simple-train ratios (sun −1 ⇒ planet $+N_s/N_p$, ring $+N_s/N_r$).</li>
<li>Add the rows. The fixed member now reads 0; the others give speeds per revolution of the carrier.</li>
</ol>
<div class="tbl"><table class="data">
<tr><th>Sun fixed</th><th>Carrier</th><th>Sun</th><th>Planet</th><th>Ring</th></tr>
<tr><td>Step 1</td><td>+1</td><td>+1</td><td>+1</td><td>+1</td></tr>
<tr><td>Step 2</td><td>0</td><td>−1</td><td>$+N_s/N_p$</td><td>$+N_s/N_r$</td></tr>
<tr><td>Sum</td><td>1</td><td>0</td><td>$1 + N_s/N_p$</td><td>$1 + N_s/N_r$</td></tr>
</table></div>

<h3>4. Torque balance</h3>
<p>No losses and no acceleration: power and torque both sum to zero across the three shafts:</p>
$$T_s\omega_s + T_c\omega_c + T_r\omega_r = 0,\qquad T_s + T_c + T_r = 0$$
<p>The fixed member's torque is the reaction the casing must provide. <b>Example</b> (ring fixed, $N_r = 100$, $N_s = 40$, 2 kW at 500 rpm into the sun): $T_s = 2000/52.36 = 38.2$ N·m, $T_c/T_s = -(1 + N_r/N_s) = -3.5 \Rightarrow T_c = -133.7$ N·m, $T_r = -(T_s + T_c) = 95.5$ N·m. Carrier speed $500/3.5 = 142.9$ rpm.</p>

<h3>5. Compound epicyclic trains</h3>
<p>Two or more coaxial simple trains where a member of one forms part of the next (e.g. ring 1 is the carrier of train 2, and the suns share a shaft). Use the tabular method on each train in turn, with the shared member's speed linking them.</p>

<h3>6. Equivalent inertia of a planetary system</h3>
<p>Refer everything to the input shaft with squared speed ratios. Planets have their own spin inertia and also orbit at the carrier radius (as point masses):</p>
$$I_{sys} = I_R + I_C\left(\frac{\omega_c}{\omega_r}\right)^2 + n_pI_P\left(\frac{\omega_p}{\omega_r}\right)^2 + n_pm_p\left(\frac{\omega_c}{\omega_r}\right)^2\left(\frac{d}{2}\right)^2$$`,
formulas: [
 {name:"Geometry", tex:R`N_r = N_s + 2N_p`},
 {name:"Willis equation", tex:R`\frac{\omega_s-\omega_c}{\omega_r-\omega_c} = -\frac{N_r}{N_s}`},
 {name:"Ring fixed", tex:R`\omega_s = \left(1+\frac{N_r}{N_s}\right)\omega_c`},
 {name:"Sun fixed", tex:R`\omega_r = \left(1+\frac{N_s}{N_r}\right)\omega_c`},
 {name:"Carrier fixed", tex:R`\omega_r = -\frac{N_s}{N_r}\omega_s`},
 {name:"Torque balance", tex:R`T_s+T_c+T_r = 0`},
 {name:"Power balance", tex:R`T_s\omega_s+T_c\omega_c+T_r\omega_r = 0`}
],
questions: [
 {src:"Lecture 3 example (torque)", see:[4,2], q:R`An epicyclic gear has $N_r = 100$ and $N_s = 40$. 2 kW at 500 rpm is applied to the sun shaft with the ring fixed. Find the carrier speed and the torques on the sun, carrier and ring.`,
  hint:"T_c/T_s = −ω_s/ω_c = −(1 + N_r/N_s). Then T_s + T_c + T_r = 0.",
  sol:R`<p>$\omega_s = 500(2\pi/60) = 52.36$ rad/s, $T_s = 2000/52.36 = 38.2$ N·m.</p>
  <p>Ring fixed: $\omega_s/\omega_c = 1 + 100/40 = 3.5$, so $\omega_c = 142.9$ rpm (same direction).</p>
  <p>$T_c = -3.5 T_s = -133.7$ N·m (the output torque, opposing the motion as a load).</p>
  <p>$T_r = -(T_s + T_c) = 95.5$ N·m: the reaction the casing provides to hold the ring.</p>`,
  ans:"ω_c ≈ 143 rpm; T_s = 38.2, T_c = −133.7, T_r = 95.5 N·m", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 example system", see:[3,6], q:R`Ring R (100 internal teeth) meshes with three planets P (30 teeth) on carrier C; the planets mesh with sun S (40 teeth) and sit on a 120 mm diameter circle. Each planet has mass 500 g and inertia 0.15 g·m² about its own axis. $I_R = 4.8$ g·m², $I_C = 2.4$ g·m². S is fixed and R turns at 700 rpm. Find the speeds of C and of each planet, and the torque at R needed for an angular acceleration of 50 rad/s².`,
  hint:"Sun-fixed row of the table: carrier 1, planet 1 + N_s/N_p, ring 1 + N_s/N_r. Then refer every inertia to R with (speed ratio)².",
  sol:R`<p>$\omega_r/\omega_c = 1 + 40/100 = 1.4 \Rightarrow \omega_c = 700/1.4 = 500$ rpm.</p>
  <p>$\omega_p/\omega_c = 1 + 40/30 = 2.333 \Rightarrow \omega_p = 1167$ rpm.</p>
  <p>Ratios to R: $\omega_c/\omega_r = 0.714$, $\omega_p/\omega_r = 1.667$; planet orbit radius 0.06 m.</p>
  <p>$I_{sys} = 4.8 + 2.4(0.714)^2 + 3(0.15)(1.667)^2 + 3(500)(0.714)^2(0.06)^2$ g·m²</p>
  <p>$= 4.8 + 1.224 + 1.250 + 2.755 = 10.03$ g·m² $= 10.03\times10^{-3}$ kg·m²</p>
  <p>$T_R = I_{sys}\alpha = 10.03\times10^{-3}(50) = 0.501$ N·m.</p>`,
  ans:"ω_c = 500 rpm, ω_p ≈ 1167 rpm, T_R ≈ 0.50 N·m", prov:"From the worked example in Lecture 3."},
 {src:"Lecture 3 example (carrier fixed)", see:[2,4], q:R`Same gear ($N_r = 100$, $N_s = 40$), 2 kW at 500 rpm into the sun, but now the carrier is fixed and the ring is the output. Find the ring speed and the torques.`,
  hint:"With the carrier fixed it's an ordinary train: ω_r = −(N_s/N_r)ω_s.",
  sol:R`<p>$\omega_r = -(40/100)(500) = -200$ rpm (opposite direction).</p>
  <p>$T_s = 38.2$ N·m; $T_r = -T_s\omega_s/\omega_r = 38.2/0.4 = 95.5$ N·m.</p>
  <p>$T_c = -(T_s + T_r) = -133.7$ N·m (reaction on the fixed carrier).</p>`,
  ans:"ω_r = −200 rpm; T_r = 95.5 N·m, T_c = −133.7 N·m", prov:"From the worked example in Lecture 3."},
 {src:"Tutorial 6 Q1", see:[0,2,4,1], q:R`An epicyclic gear train has a 50-tooth sun and three 30-tooth planets meshing with a fixed internal ring. The input shaft carries the sun and transmits 3 kW at 360 rpm; the output is the planet carrier (link). (a) Find the output speed and torque. (b) If the ring can be driven independently, what speed must it have for the carrier to turn at 15 rpm?`,
  hint:"N_r = N_s + 2N_p. Ring fixed: ω_s/ω_c = 1 + N_r/N_s. For (b) use the Willis equation with ω_c = 15.",
  sol:R`<p>$N_r = 50 + 2(30) = 110$ teeth.</p>
  <p><b>(a)</b> $\omega_s/\omega_c = 1 + 110/50 = 3.2 \Rightarrow \omega_c = 360/3.2 = 112.5$ rpm $= 11.78$ rad/s. Lossless, so $T_{out} = 3000/11.78 = 254.6$ N·m (3.2 × the input torque of 79.6 N·m).</p>
  <p><b>(b)</b> $\dfrac{\omega_s - \omega_c}{\omega_r - \omega_c} = -\dfrac{N_r}{N_s} = -2.2 \Rightarrow \dfrac{360 - 15}{\omega_r - 15} = -2.2 \Rightarrow \omega_r - 15 = -156.8$</p>
  <p>$\omega_r = -141.8$ rpm: the ring must turn at about 142 rpm <b>opposite</b> to the sun.</p>`,
  ans:"112.5 rpm, 254.6 N·m; ring −141.8 rpm", prov:"Follows the posted solution."},
 {src:"Tutorial 6 Q2", see:[1,2], q:R`The carrier is the input to an epicyclic train. The ring is fixed and has 110 teeth, the planet has 40 teeth, and the 30-tooth sun is the output. Find the speeds of all members when the input turns at 1200 rpm.`,
  hint:"Ring fixed: ω_s = (1 + N_r/N_s)ω_c. Then the planet from ω_p = ω_c − (N_s/N_p)(ω_s − ω_c).",
  sol:R`<p>Check: $N_s + 2N_p = 30 + 80 = 110$ ✓.</p>
  <p>Ring fixed: $\omega_s = \left(1 + \dfrac{110}{30}\right)1200 = 4.667 \times 1200 = 5600$ rpm (same direction as the carrier: a 4.67× step-up).</p>
  <p>Planet: $\omega_p = \omega_c - \dfrac{N_s}{N_p}(\omega_s - \omega_c) = 1200 - \tfrac34(5600 - 1200) = -2100$ rpm (absolute, opposite direction).</p>
  <p>Ring: 0 (fixed).</p>`,
  ans:"Carrier 1200, sun 5600, planet −2100, ring 0 rpm", prov:"Follows the posted solution."},
 {src:"Tutorial 6 Q3", see:[4,0], q:R`A sun gear takes an input torque of 540 N·m. The sun pitch radius is 60 mm and the planets are 45 mm radius; the ring is fixed. The tangential contact force at any single tooth mesh must not exceed 2500 N. What is the minimum number of planets?`,
  hint:"The sun torque is shared equally between n sun–planet meshes, each at radius r_s.",
  sol:R`<p>Each of the $n$ meshes carries $F_s = \dfrac{T_s}{n\,r_s} \le 2500$ N.</p>
  <p>$n \ge \dfrac{540}{0.06 \times 2500} = 3.6$, so round <b>up</b>: $n = 4$ (each mesh then carries $540/(4 \times 0.06) = 2250$ N).</p>
  <p>The planet radius isn't needed: the sun-side force sets the limit (and for a planet in equilibrium the ring-side force is the same).</p>`,
  ans:"4 planets", prov:"Follows the posted solution."},
 {src:"Tutorial 6 Q4", fig:"mom_compound", see:[5,1], q:R`In the compound epicyclic train shown, suns S1 and S2 are on the input shaft, which turns at 1000 rpm clockwise. Ring R2 is driven at 500 rpm the opposite way. Ring R1 is joined to the carrier of the second stage, and carrier L (holding the first-stage planets) is the output. Teeth: S1 = 24, S2 = 40, R1 = 100, R2 = 120. Find the output speed and direction.`,
  hint:"Rearrange Willis: N_s ω_s + N_r ω_r = (N_s + N_r) ω_c. Solve stage 2 first for its carrier (= R1), then stage 1.",
  sol:R`<p>Willis rearranged: $N_s(\omega_s - \omega_c) = N_r(\omega_c - \omega_r) \Rightarrow N_s\omega_s + N_r\omega_r = (N_s + N_r)\omega_c$. Take clockwise as positive.</p>
  <p><b>Stage 2</b> (S2, R2, carrier = R1): $40(1000) + 120(-500) = 160\,\omega_{R1} \Rightarrow \omega_{R1} = -20\,000/160 = -125$ rpm.</p>
  <p><b>Stage 1</b> (S1, R1, carrier L): $24(1000) + 100(-125) = 124\,\omega_L \Rightarrow \omega_L = 11\,500/124 = +92.7$ rpm.</p>
  <p>Output: <b>92.7 rpm clockwise</b> (same direction as the input).</p>`,
  ans:"≈ 92.7 rpm, clockwise", prov:"Follows the posted solution."}
],
traps: [
 "Willis equation sign: relative to the carrier, sun and ring turn in opposite directions, hence the minus sign.",
 "N_r = N_s + 2N_p. Use it to find a missing tooth count.",
 "The fixed member still carries torque: T_s + T_c + T_r = 0.",
 "In the inertia sum, planets count twice: their spin about their own axis, and their mass orbiting at the carrier radius.",
 "Planet speed from the table is its absolute speed, not relative to the carrier."
]
});
})();
