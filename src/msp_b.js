/* MEC1015 — topics 9–15 (signal conditioning & signal processing) */
(function(){
const R = String.raw;
const T = STUDY.content.msp;

T.topics.push({
id: "opamps", part: "Signal conditioning", title: "Op-Amp Signal Conditioning & Filtering",
lectures: "Lectures 9.1–9.3", status: "lectured",
summary: "The ideal op-amp, the inverting amplifier derivation, attenuation, linearisation, bias removal, integration, voltage-to-current conversion, and filters: ideal vs real, the −3 dB cut-off and why linear phase matters.",
theory: R`
<h3>1. The ideal op-amp</h3>
<p>$V_o = A(V_2 - V_1)$ where $V_2$ is the + input, $V_1$ the − input. The four ideal properties and why each matters:</p>
<ol class="steps">
<li><b>Very high (infinite) input impedance</b>: input currents ≈ 0, so it draws almost no power from the sensor and doesn't load it.</li>
<li><b>Very high (infinite) gain</b>: since $V_o$ is finite, $V_2 - V_1 \to 0$, i.e. $V_+ = V_-$.</li>
<li><b>Very low output impedance</b>: whatever is connected after it can't load it, so it isolates one circuit from the next.</li>
<li><b>High common-mode rejection</b>: any voltage common to both inputs (noise picked up equally on both wires) cancels. That's why twisted-pair signal wires are used.</li>
</ol>
<div class="callout key"><b>Golden rules for analysis:</b> $i_+ = i_- = 0$ and $V_+ = V_-$.</div>

<h3>2. Inverting amplifier (derivation)</h3>
<p>Input $V_i$ through $R_1$ into the − input; feedback $R_f$ from output to − input; + input grounded (through R).</p>
<ol class="steps"><li>$i_1 = \dfrac{V_i - V_-}{R_1}$ and $i_f = \dfrac{V_- - V_o}{R_f}$.</li>
<li>No current into the op-amp, so $i_1 = i_f$.</li>
<li>$i_+ = 0$ so $V_+ = 0$, and $V_- = V_+ = 0$ (virtual earth).</li>
<li>$\dfrac{V_i}{R_1} = \dfrac{-V_o}{R_f} \Rightarrow \dfrac{V_o}{V_i} = -\dfrac{R_f}{R_1}$.</li></ol>
<p>Choose resistors to amplify ($R_f > R_1$) or attenuate ($R_f < R_1$). The sign inversion can be undone with a second unity-gain stage ($R_f = R_1$). Feeding the signal into the + input with the output tied to the − input gives a <b>voltage follower</b> (buffer), used for isolation. Several op-amps combine into an <b>instrumentation amplifier</b> with very high CMRR.</p>

<h3>3. Other conditioning circuits</h3>
<table class="data">
<tr><th>Job</th><th>Circuit</th><th>Relationship</th></tr>
<tr><td>Attenuation</td><td>Potentiometer (or op-amp)</td><td>$V_o/V_i = x/x_T$</td></tr>
<tr><td>Linearisation</td><td>Diode in the feedback path (log amp)</td><td>$V_o = C\ln V_i$</td></tr>
<tr><td>Bias removal</td><td>Differential amp with an adjustable reference $V_c$</td><td>$V_o = \dfrac{R_2}{R_1}(V_c - V_i)$</td></tr>
<tr><td>Integration</td><td>Capacitor in the feedback path</td><td>$V_o = \dfrac{1}{RC}\int V_i\,dt$</td></tr>
<tr><td>Voltage → current</td><td>Op-amp current source</td><td>$I_{out} = -\dfrac{R_2}{R_1R_3}V_i$</td></tr>
<tr><td>Current → voltage</td><td>Resistor in feedback at receiver</td><td>$V_o = I_{in}R$</td></tr></table>
<h4>Linearising a light sensor (worked chain)</h4>
<ol class="steps"><li>Sensor: $V_i = ke^{-\alpha Q}$ (non-linear in light intensity Q).</li><li>Log amp: $V_o = C\ln(ke^{-\alpha Q}) = C\ln k - C\alpha Q$, linear in Q but with an offset.</li><li>Bias removal with $V_c = C\ln k$: $V_o = \frac{R_2}{R_1}(C\ln k - C\ln k + C\alpha Q) = \frac{R_2}{R_1}C\alpha Q$, i.e. output = constant × Q.</li></ol>

<h3>4. Filtering</h3>
<p>Filters keep part of a signal's frequency content and remove the rest. Ideal shapes: <b>low-pass</b> (pass below $f_c$), <b>high-pass</b> (pass above $f_c$), <b>band-pass</b> (pass $F_1$–$F_2$), <b>band-stop</b>.</p>
<div class="plot" data-plot="lowpass"></div>
<p>Real filters can't have vertical edges: gain rolls off gradually and there's a time delay (phase shift). The <b>cut-off (bandwidth)</b> is where the gain has fallen 3 dB from the pass band:</p>
$$\text{dB} = 20\log_{10}\frac{V_o}{V_i}, \qquad 20\log_{10}\frac{1}{\sqrt2} = -3.01\ \text{dB}$$
<p>At −3 dB the amplitude is $1/\sqrt2$ of the pass-band value. Power ∝ V², so it's the <b>half-power point</b>.</p>
<div class="callout key"><b>Ideal phase = linear in frequency.</b> A delay $t_d$ turns $\cos\omega t$ into $\cos(\omega t - \omega t_d)$: phase $\varphi = -\omega t_d$. If phase is proportional to ω, every frequency is delayed by the same $t_d$, so the waveform keeps its shape (no phase distortion). Any other phase curve delays different frequencies by different amounts and distorts the signal.</div>
<p><b>Passive filters</b> use networks of impedances (ideally pure L and C). For a T-section, $Z_o = \sqrt{Z_1Z_2}\sqrt{1+Z_1/4Z_2}$. Low-pass: $Z_1 = j\omega L$, $Z_2 = 1/j\omega C$; high-pass swaps them. Cascading sections sharpens the cut-off, but real L and C have resistance and imperfect impedance matching, so the benefit is lost. <b>Active filters</b> (op-amps with R and C) overcome this.</p>`,
formulas: [
 {name:"Op-amp", tex:R`V_o = A(V_+ - V_-)`, note:"Ideal: i₊ = i₋ = 0, V₊ = V₋"},
 {name:"Inverting amplifier", tex:R`\frac{V_o}{V_i} = -\frac{R_f}{R_1}`},
 {name:"Integrator", tex:R`V_o = \frac{1}{RC}\int V_i\,dt`},
 {name:"Bias removal", tex:R`V_o=\frac{R_2}{R_1}(V_c-V_i)`},
 {name:"V → I converter", tex:R`I_{out}=-\frac{R_2}{R_1R_3}V_i`},
 {name:"Decibels", tex:R`\text{dB}=20\log_{10}\frac{V_o}{V_i}`, note:"−3 dB ⇔ ×1/√2 ⇔ half power"},
 {name:"Linear phase", tex:R`\varphi(\omega) = -\omega t_d`}
],
questions: [
 {src:"2023 Resit, Q2 a–c", q:R`(a) Explain the difference between an ideal and a real low-pass filter, with a sketch. (b) For a constant time delay at all frequencies, what should the phase characteristic be? Explain mathematically. (c) How is the bandwidth of a filter determined and what is its physical significance?`,
  sol:R`<p><b>(a)</b> Ideal: gain exactly 1 up to $f_c$, exactly 0 above, a vertical edge, and no phase distortion. Real: gain is ~1 in the pass band, rolls off gradually through $f_c$ (finite slope), some signal above $f_c$ still passes, and there's a frequency-dependent phase shift/time delay. (Sketch both on gain vs frequency axes.)</p>
  <p><b>(b)</b> Linear: $\varphi = -\omega t_d$. A component $\cos\omega t$ delayed by $t_d$ is $\cos(\omega(t-t_d)) = \cos(\omega t - \omega t_d)$, so a delay of $t_d$ at every frequency needs a phase proportional to ω with slope $-t_d$.</p>
  <p><b>(c)</b> Bandwidth is the frequency where the gain has dropped by 3 dB from the pass band, $|H| = |H_{pass}|/\sqrt2$. There the output power is half the input power (half-power point).</p>`},
 {src:"MCQ · several years", q:R`(i) Why is −3 dB used for cut-off frequency? (ii) Why is a linear dependence of phase on frequency ideal for a filter? (iii) Why is high input impedance in an op-amp useful in a measurement system?`,
  sol:R`(i) It's the half-power point of the filter. (ii) Because all frequencies are time-shifted by the same amount. (iii) The op-amp draws very little current from the sensor, so it doesn't affect the measured value.`},
 {src:"Lecture 9.1", q:R`Derive the gain of the inverting amplifier using ideal op-amp assumptions. What resistor values give a gain of −10 with $R_1 = 10$ kΩ?`,
  sol:R`Derivation as in section 2: $V_o/V_i = -R_f/R_1$. For −10: $R_f = 100$ kΩ.`}
],
traps: ["−3 dB is a ratio of 1/√2 (0.707) in amplitude, 1/2 in power.", "The inverting amplifier's gain is negative; add a unity inverter if sign matters.", "Linear phase means a constant time delay, not zero phase."]
});

T.topics.push({
id: "adc", part: "Signal conditioning", title: "A/D Conversion & Noise in Signal Transmission",
lectures: "Lectures 10.1–10.2", status: "lectured",
summary: "How a successive-approximation A/D converter works, resolution in volts and in engineering units, sampling rate and the Nyquist criterion, and seven ways to keep noise out of a signal.",
theory: R`
<h3>1. Why convert</h3>
<p>Sensors give continuous analogue voltages; computers work with discrete binary numbers. The A/D converter bridges the two. The course uses the <b>successive approximation</b> method, built around a D/A converter.</p>

<h3>2. The D/A converter (R–2R ladder)</h3>
<p>Each bit switches the reference into the ladder. The most significant bit contributes the most: with 4 bits, $b_3$ adds $V_{ref}$, $b_2$ adds $V_{ref}/2$, $b_1$ adds $V_{ref}/4$, $b_0$ adds $V_{ref}/8$ (relative weights). The output is the binary-weighted sum.</p>

<h3>3. Successive approximation</h3>
<ol class="steps"><li>Set the MSB to 1, convert to analogue with the D/A, and compare with the input.</li><li>If the D/A output exceeds the input, clear the bit; otherwise keep it.</li><li>Move to the next bit and repeat down to the LSB.</li></ol>
<p><b>Example</b> (4-bit, 0–16 V, 1 V steps), input 11.4 V: try 1000 = 8 ✓ keep → 1100 = 12 ✗ clear → 1010 = 10 ✓ keep → 1011 = 11 ✓ keep → output <b>1011</b> = 11 V. n bits take n comparisons.</p>

<h3>4. Resolution</h3>
<p>The smallest step is one LSB:</p>
$$\text{resolution} = \frac{V_{range}}{2^n}$$
<p>8-bit over 5 V: 5/256 = 19.5 mV (≈ 20 mV). To get resolution in the measured quantity, divide by the sensor sensitivity.</p>

<h3>5. Sampling rate and aliasing</h3>
<p>Conversion takes time. If the signal changes significantly during and between conversions, it's misrepresented (aliasing). Prevent this by:</p>
<ul><li>sampling at <b>at least twice</b> the highest frequency present (Nyquist criterion), or</li><li>low-pass filtering out everything above half the sampling frequency before converting (<b>anti-aliasing filter</b>).</li></ul>
<p>Maximum analysable frequency $= f_s/2$ (the Nyquist frequency). More in the Sampling topic.</p>

<h3>6. Reducing noise in signal transmission</h3>
<ol class="steps"><li>Amplify the small signal at the sensor before sending it.</li><li>Shield the cable: coaxial cable with the outer sheath at signal ground channels noise to earth.</li><li>Route cables away from power cables and sources.</li><li>Put capacitors across switches to stop arcing and electromagnetic pulses.</li><li><b>Current-loop transmission</b>: send a current proportional to the signal. Line resistance doesn't reduce a current the way it drops a voltage, and it's less susceptible to noise. Convert back to voltage at the receiver ($V = IR$).</li><li>Convert voltage to frequency and use frequency-modulation transmission.</li><li>Use fibre-optic transmission (immune to electrical noise).</li></ol>`,
formulas: [
 {name:"A/D resolution", tex:R`\Delta V=\frac{V_{range}}{2^n}`},
 {name:"Resolution in units", tex:R`\Delta x = \frac{\Delta V}{\text{sensitivity}}`},
 {name:"Nyquist", tex:R`f_s \ge 2f_{max},\quad f_{Nyq} = \frac{f_s}{2}`}
],
questions: [
 {src:"Tutorial Q15", q:R`A 12-bit A/D converts the output of a load cell (sensitivity 0.2 mV/N) over a 5 V range. Find the resolution in volts and in newtons. If the minimum time between samples is 0.01 ms, what's the maximum frequency that can be analysed?`,
  sol:R`<ol class="steps"><li>$5/2^{12} = 5/4096 = 1.22$ mV.</li><li>$1.22\ \text{mV} / 0.2\ \text{mV/N} = 6.1$ N.</li><li>$f_s = 1/0.01\ \text{ms} = 100$ kHz → max frequency $f_s/2 = 50$ kHz.</li></ol>`, ans:"1.22 mV, 6.1 N, 50 kHz", prov:"Follows the posted solution."},
 {src:"MCQ · several years", q:R`What is the voltage resolution of a 12-bit A/D converter operating over a 10 V range? 2.44 mV / 0.833 V / 4.88 mV / 20 mV`, sol:R`$10/4096 = 2.44$ mV. (4.88 mV is 10/2048, the 11-bit trap.)`, ans:"2.44 mV"},
 {src:"MCQ · 2025", q:R`Why are current loops used in signal transmission?`, sol:"To avoid problems with voltage drops along the line and to minimise the effect of noise.", ans:"Voltage drops & noise"},
 {src:"MCQ · 2025 Resit", q:R`A signal is sampled every 20 ms. What is the Nyquist frequency? 50 / 100 / 25 / 10 Hz`, sol:R`$f_s = 1/0.02 = 50$ Hz; Nyquist $= f_s/2 = 25$ Hz.`, ans:"25 Hz"},
 {src:"Lecture 10.1", q:R`A sensor gives 0–5 V into an 8-bit converter. What voltage band does each code represent?`, sol:R`$2^8 = 256$ states: 5/256 = 19.5 mV ≈ 20 mV per code (0–20 mV, 20–40 mV, …).`}
],
traps: ["Resolution uses 2ⁿ (4096 for 12-bit), not 2ⁿ⁻¹ or 2ⁿ − 1.", "Nyquist frequency is half the sampling frequency; sampling frequency is 1/(time between samples)."]
});

T.topics.push({
id: "sinusoids", part: "Signal processing", title: "Sinusoids, Time Shifts & Phasors",
lectures: "Lectures 11.1–12.3", status: "lectured",
summary: "Describing periodic signals with A cos(ωt + φ): amplitude, period, frequency, phase and time shift. Converting a cos + b sin, adding signals with phasors, and the inverse Euler form with positive and negative frequencies.",
theory: R`
<h3>1. Why sinusoids</h3>
<ol class="steps"><li>Many physical systems respond harmonically, so sinusoids describe their motion.</li><li>A linear system driven by a sinusoid responds with a sinusoid of the <b>same frequency</b>; only amplitude and phase change, and those characterise the system.</li><li>The maths is well developed in the frequency domain.</li><li>A sinusoid and its harmonics form an <b>orthogonal set</b>, so complex signals can be built from them (Fourier series). Adding harmonics to a fundamental gradually builds up a sawtooth.</li></ol>

<h3>2. Anatomy of a cosine</h3>
$$x(t) = A\cos(\omega t + \varphi)$$
<table class="data"><tr><td>$A$</td><td>amplitude (peak). Peak-to-peak = $2A$.</td></tr>
<tr><td>$\omega$</td><td>radian frequency, rad/s</td></tr>
<tr><td>$T = 2\pi/\omega$</td><td>period, s</td></tr>
<tr><td>$f = 1/T = \omega/2\pi$</td><td>frequency, Hz (cycles per second)</td></tr>
<tr><td>$\varphi$</td><td>phase, rad. Negative = delayed (lag); positive = advanced (lead).</td></tr></table>
<p>Tuning fork: $x = 10\cos(2\pi\cdot440t - 0.4\pi)$: amplitude 10, f = 440 Hz, T = 2.27 ms, lagging by 0.4π rad.</p>
<p>Handy facts: $\sin\theta = \cos(\theta-\pi/2)$; $\dfrac{d}{d\theta}\sin\theta = \cos\theta$, $\dfrac{d}{d\theta}\cos\theta = -\sin\theta$.</p>

<h3>3. Time shift ↔ phase</h3>
<p>Replacing $t$ by $t - t_s$ <b>delays</b> any signal by $t_s$ (moves it right). For a cosine:</p>
$$A\cos(\omega(t-t_s)) = A\cos(\omega t - \omega t_s) \quad\Rightarrow\quad \varphi = -\omega t_s$$
<p>Lecture example: $x(t) = 2t$ for $0\lt t\lt \tfrac12$ and $(4-2t)/3$ for $\tfrac12\lt t\lt 2$. Delayed by 2 s: replace $t$ with $t-2$ everywhere, including the limits: $2(t-2)$ for $2\lt t\lt 2\tfrac12$, $(8-2t)/3$ for $2\tfrac12 < t < 4$. Advanced by 1 s: replace $t$ with $t+1$.</p>
<div class="callout">MCQ: $x(t) = 4 - t^2$ delayed by 2 s → $4-(t-2)^2 = 4t - t^2$.</div>

<h3>4. Combining a cos + b sin</h3>
<p>Expand $C\cos(\omega t+\varphi) = C\cos\varphi\cos\omega t - C\sin\varphi\sin\omega t$ and match with $a\cos\omega t + b\sin\omega t$:</p>
$$C\cos\varphi = a,\quad -C\sin\varphi = b\quad\Rightarrow\quad C=\sqrt{a^2+b^2},\quad \varphi = \operatorname{atan2}(-b,\ a)$$
<p>Check the quadrant from the signs of $\cos\varphi$ and $\sin\varphi$; a bare $\tan^{-1}$ can be off by π. Example: $\cos3t + 2\sin3t = \sqrt5\cos(3t - \tan^{-1}2)$.</p>
<p>The total amplitude $\sqrt{a^2+b^2}$ doesn't change when the signal is shifted in time: $4\cos2t + 3\sin2t$ has amplitude 5, so if the cosine part becomes 1, the sine part becomes $\sqrt{25-1} = \sqrt{24}$.</p>

<h3>5. Complex exponentials and phasors</h3>
<p>Euler: $e^{j\theta} = \cos\theta + j\sin\theta$, so</p>
$$A\cos(\omega t+\varphi) = \text{Re}\left[Ae^{j(\omega t+\varphi)}\right] = \text{Re}\left[\underbrace{Ae^{j\varphi}}_{\text{complex phasor}}\cdot\underbrace{e^{j\omega t}}_{\text{rotating phasor}}\right]$$
<p><b>Adding signals of the same frequency</b>: drop the common $e^{j\omega t}$, add the complex phasors in rectangular form, convert back.</p>
<ol class="steps"><li>$1.7\cos(\omega t+\pi/3) + 1.9\cos(\omega t+\pi/4)$ → phasors $1.7e^{j\pi/3}$, $1.9e^{j\pi/4}$.</li><li>Rectangular: $0.85+j1.472$ and $1.344+j1.344$. Sum: $2.194+j2.816$.</li><li>Polar: magnitude $\sqrt{2.194^2+2.816^2} = 3.57$, angle $\tan^{-1}(2.816/2.194) = 0.289\pi$.</li><li>Result: $3.57\cos(\omega t + 0.289\pi)$.</li></ol>

<h3>6. Inverse Euler: positive and negative frequencies</h3>
$$\cos\theta = \frac{e^{j\theta}+e^{-j\theta}}{2},\qquad \sin\theta = \frac{e^{j\theta}-e^{-j\theta}}{2j}$$
<p>So $\cos\omega t$ is two counter-rotating phasors of half amplitude: one anticlockwise (frequency +ω) and one clockwise (frequency −ω). Their imaginary parts cancel. This is the basis of the two-sided (complex) spectrum.</p>

<h3>7. Tide example (Lecture 12.3)</h3>
<p>Tide between 2 ft and 8 ft, high at 6 h, period 12.5 h. $A = \tfrac12(8-2) = 3$, mean 5, $\omega = 2\pi/12.5 = 0.5$ rad/h: $h = 5 + 3\cos\frac{2\pi}{12.5}(t-6)$, phase $-\frac{2\pi}{12.5}6 = -3.0$ rad. High tide 2 h later: $h = 5+3\cos\frac{2\pi}{12.5}(t-8)$, phase −4.0 rad, a change of −1.0 rad. Phasors: $3e^{-3j}$ and $3e^{-4j}$, rotating phasor $e^{0.5jt}$.</p>`,
formulas: [
 {name:"Sinusoid", tex:R`x(t) = A\cos(\omega t+\varphi)`},
 {name:"Period & frequency", tex:R`T=\frac{2\pi}{\omega},\quad f=\frac1T,\quad \omega = 2\pi f`},
 {name:"Phase from delay", tex:R`\varphi = -\omega t_s`},
 {name:"a cos + b sin", tex:R`C=\sqrt{a^2+b^2},\ \ C\cos\varphi=a,\ \ C\sin\varphi = -b`},
 {name:"Euler", tex:R`e^{j\theta}=\cos\theta+j\sin\theta`},
 {name:"Inverse Euler", tex:R`\cos\theta=\frac{e^{j\theta}+e^{-j\theta}}{2},\ \ \sin\theta=\frac{e^{j\theta}-e^{-j\theta}}{2j}`},
 {name:"Phasor", tex:R`A\cos(\omega t+\varphi)=\text{Re}[Ae^{j\varphi}e^{j\omega t}]`}
],
questions: [
 {src:"Tutorial Q16", q:R`High tide in Dublin is at 11:30 am and the following low tide at 5:40 pm. What is the frequency of the tidal stream in rad/s?`,
  sol:R`High to low is half a period: 6 h 10 min = 370 min. $T = 740$ min = 44 400 s. $\omega = 2\pi/44400 = 1.42\times10^{-4}$ rad/s.`, ans:"0.142×10⁻³ rad/s", prov:"Follows the posted solution."},
 {src:"Tutorial Q17", q:R`High tide in Schull is at 4:40 am. What is the phase difference between Schull and Dublin in radians? Lag or lead?`,
  sol:R`<p>Schull's high is 6 h 50 min = 24 600 s earlier. $\varphi = \omega t = 1.415\times10^{-4}\times24600 = 3.48 \approx 3.5$ rad. Earlier means it's ahead: a <b>phase lead</b>.</p><p class="small">3.5 rad is more than π, so it could also be called a lag of $2\pi - 3.5 = 2.78$ rad; the posted solution keeps "lead" because we know Schull's tide arrives first.</p>`, ans:"≈ 3.5 rad lead", prov:"Follows the posted solution."},
 {src:"Tutorial Q18", q:R`Low-to-high range is 4 m in Dublin and 3.2 m in Schull. Describe the tidal streams in complex polar form relative to Dublin's time base. What are the phasors?`,
  sol:R`Amplitudes are half the range: 2 m and 1.6 m. Dublin: $2e^{j\omega t}$ (phasor $2$, i.e. $2e^{j0}$). Schull: $1.6e^{j(\omega t + 3.5)}$ (phasor $1.6e^{j3.5}$).`, ans:"2 and 1.6e^{j3.5}", prov:"Follows the posted solution."},
 {src:"Tutorial Q19", q:R`If both tidal streams were added together, what would result? Give it in complex polar form.`,
  sol:R`$2 + 1.6e^{j3.5} = 2 + 1.6(\cos3.5 + j\sin3.5) = 2 - 1.498 - j0.561 = 0.502 - j0.561$. Magnitude 0.753, angle $-0.84$ rad. Result: $\text{Re}[0.75e^{j(\omega t-0.84)}]$.`, ans:"Re[0.75 e^{j(ωt−0.84)}]", prov:"Follows the posted solution."},
 {src:"Tutorial Q21", q:R`Write $f(t) = 4\sin\omega t - \cos\omega t$ in the form $C\cos(\omega t+\varphi)$.`,
  hint:"a = −1 (cos coefficient), b = 4 (sin coefficient). Watch the quadrant.",
  sol:R`<p>$C = \sqrt{(-1)^2+4^2} = \sqrt{17}$. Need $\cos\varphi = -1/\sqrt{17}$ and $\sin\varphi = -4/\sqrt{17}$: both negative → third quadrant: $\varphi = -(\pi - \tan^{-1}4) = -1.816$ rad.</p>
  <p>$$f(t) = \sqrt{17}\cos(\omega t - 1.816)$$</p>
  <p class="small">The sheet's answer $\sqrt{17}\cos(\omega t + \tan^{-1}4)$ expands to $\cos\omega t - 4\sin\omega t$, which is $-f(t)$. Check by expanding; that's the quickest way to catch a quadrant mistake.</p>`, ans:"√17 cos(ωt − 1.816)"},
 {src:"MCQ · several years", q:R`(i) A 10 rad/s signal is delayed by 0.04 s: phase shift? (ii) Peak-to-peak 3, 5 rad/s, delay 0.1 s as a sinusoid? (iii) Period 8 ms: frequency in rad/s? (iv) Frequency 2 rad/s, amplitude 6, time shift +0.5 s in phasor form? (v) $\cos3t + 2\sin3t = R\cos(3t+p)$: R and p? (vi) $4\cos2t+3\sin2t$ shifted so the cosine amplitude is 1: new sine amplitude?`,
  sol:R`(i) $-\omega t_s = -0.4$ rad. (ii) $A = 1.5$, phase $-5(0.1) = -0.5$: $1.5\cos(5t-0.5)$. (iii) $2\pi/0.008 = 785.4$ rad/s. (iv) Phase $2(0.5) = 1$: $6e^{j(2t+1)}$. (v) $R = \sqrt5$, $p = -\tan^{-1}2$. (vi) $\sqrt{5^2-1^2} = \sqrt{24}$.`},
 {src:"Lecture 12.3", q:R`A tide varies between 2 and 8 ft with high tide at 06:00 and period 12.5 h. (a) Write a cosine expression. (b) If high tide arrives 2 h later, rewrite it and find the phase change. (c) Give both in phasor form.`,
  sol:R`(a) $h = 5 + 3\cos\frac{2\pi}{12.5}(t-6)$. (b) $h = 5+3\cos\frac{2\pi}{12.5}(t-8)$; phase change $-\frac{2\pi}{12.5}(2) = -1.0$ rad. (c) Complex phasors $3e^{-3j}$ and $3e^{-4j}$, each times the rotating phasor $e^{0.5jt}$.`}
],
traps: ["Phase = −ω × delay. A delay gives negative phase.", "Peak-to-peak is 2A.", "After a cos + b sin → C cos(ωt + φ), expand your answer to check the signs."]
});

T.topics.push({
id: "fourier-series", part: "Signal processing", title: "Fourier Series",
lectures: "Lectures 13.1–14.3", status: "lectured",
summary: "Representing any periodic signal as a sum of harmonics: orthogonality and the least-squares origin of the coefficients, the sawtooth and square-wave examples, symmetry shortcuts, the three ways to draw a spectrum, the complex coefficients Dₙ, what a phase shift does, Dirichlet's conditions and Gibbs phenomenon.",
theory: R`
<h3>1. The series</h3>
<p>Why build signals from sinusoids (Lecture 13.1): many physical systems respond harmonically; a linear system answers a sinusoid with a sinusoid of the same frequency, so its behaviour shows up as a gain and a phase shift; the maths is well developed in the frequency domain; and a sinusoid and its harmonics form an <b>orthogonal set</b>.</p>
<p>Any periodic signal with period $T$ (fundamental $\omega = 2\pi/T$) can be written as</p>
$$f(t) = A_0 + \sum_{n=1}^{\infty}\left(A_n\cos n\omega t + B_n\sin n\omega t\right)$$
$$A_0 = \frac1T\int_{-T/2}^{T/2}f(t)\,dt\qquad A_n = \frac2T\int_{-T/2}^{T/2}f(t)\cos n\omega t\,dt\qquad B_n = \frac2T\int_{-T/2}^{T/2}f(t)\sin n\omega t\,dt$$
<p>$A_0$ is the mean (DC) value. These integrals are printed on the exam paper; the work is in setting them up and integrating by parts.</p>
<p><b>Fourier series → periodic signals. Fourier transform → aperiodic signals.</b></p>

<h3>2. Why it works: orthogonality</h3>
<p>Over one period, $\int \cos m\omega t\cos n\omega t\,dt = 0$ unless $m = n$ (same for sin·sin, and sin·cos is always 0). The harmonics are independent of each other, like perpendicular axes. Multiplying $f(t)$ by $\cos n\omega t$ and integrating kills every term except the $n$th, which is why each coefficient can be found separately and adding more terms never changes the ones you already have.</p>
<p><b>Where the formulas come from (Lecture 13.1).</b> Model $f(t)$ as $a\,f_1(t)$. The error is $f - af_1$; choose $a$ to minimise the time-averaged squared error over $t_1$ to $t_2$:</p>
$$\frac{d}{da}\left[\frac{1}{t_2-t_1}\int_{t_1}^{t_2}\big(f(t)-af_1(t)\big)^2dt\right]=0\quad\Rightarrow\quad a=\frac{\int_{t_1}^{t_2}f\,f_1\,dt}{\int_{t_1}^{t_2}f_1^2\,dt}$$
<p>Try to model $\sin mt$ with $\sin nt$ ($n \ne m$): the numerator is $\int \sin mt\sin nt\,dt = \tfrac12\int[\cos(n-m)t - \cos(n+m)t]\,dt = 0$ over a full period, so the best $a$ is <b>0</b>. A sine wave can't be represented by any of its harmonics.</p>
<p>Now fit two terms, $f \approx af_1 + bf_2$ with $f_1 = \sin t$, $f_2 = \sin nt$. Differentiating with respect to $a$, the cross term $\int f_1f_2\,dt$ vanishes over the fundamental period, leaving exactly the same $a$ as the one-term fit. That's the practical meaning of orthogonality: <b>adding a term never changes the coefficients already found.</b></p>
<p>Applying the same least-squares result with $f_1 = 1$, $\cos n\omega t$ or $\sin n\omega t$ gives the three coefficient formulas, because $\int_{-T/2}^{T/2}1\,dt = T$ and $\int_{-T/2}^{T/2}\cos^2 n\omega t\,dt = \int\sin^2 n\omega t\,dt = T/2$ (use $\cos^2 x = \tfrac12[1+\cos2x]$). That's where the $1/T$ and $2/T$ come from.</p>

<h3>3. Symmetry rules (save most of the work)</h3>
<table class="data"><tr><th>If the signal is…</th><th>then…</th></tr>
<tr><td><b>Even</b>: $f(-t) = f(t)$ (mirror in the y-axis)</td><td>$B_n = 0$: cosines only. $A_n = \frac4T\int_0^{T/2}f\cos n\omega t\,dt$</td></tr>
<tr><td><b>Odd</b>: $f(-t) = -f(t)$</td><td>$A_0 = A_n = 0$: sines only. $B_n = \frac4T\int_0^{T/2}f\sin n\omega t\,dt$</td></tr>
<tr><td>Zero mean</td><td>$A_0 = 0$</td></tr>
<tr><td>Half-wave symmetric: $f(t+T/2) = -f(t)$</td><td>Only odd harmonics</td></tr></table>
<p>If the function is even or odd, the $A_n$ or $B_n$ integral only needs evaluating over half the period, then doubling. Choose the time origin to create symmetry where you can. MCQ: "even with zero mean" → $3\cos5t$ (not $4\cos(2t+1)$, which isn't even, nor $2+\cos2t$, which has a mean).</p>

<h3>4. Three ways to show the spectrum</h3>
<ol class="steps"><li><b>$A_n$ and $B_n$</b> plotted against $n\omega$ (one-sided).</li><li><b>Amplitude and phase</b>: $C_n = \sqrt{A_n^2+B_n^2}$ and $\varphi_n$, from $A_n\cos + B_n\sin = C_n\cos(n\omega t + \varphi_n)$.</li><li><b>Complex (two-sided)</b>: $f(t) = \sum_{n=-\infty}^{\infty}D_ne^{jn\omega t}$ with $D_n = \frac1T\int f(t)e^{-jn\omega t}dt = \frac{A_n - jB_n}{2}$, $D_{-n} = D_n^*$, $D_0 = A_0$. Lines at ±nω of height $|D_n| = C_n/2$.</li></ol>
<p>A time shift changes the phases but not $C_n = \sqrt{A_n^2+B_n^2}$, so it only changes the angles of the $D_n$, not their magnitudes.</p>
<p><b>Amplitude–phase form (Lecture 14.1).</b> $A\cos\omega t + B\sin\omega t = \sqrt{A^2+B^2}\cos\left(\omega t - \tan^{-1}\frac BA\right)$, so</p>
$$f(t) = A_0 + \sum_{n=1}^{\infty}C_n\cos(n\omega t - \varphi_n),\qquad C_n=\sqrt{A_n^2+B_n^2},\ \ \varphi_n=\tan^{-1}\frac{B_n}{A_n}$$
<p>Plotting $C_n$ and $\varphi_n$ against frequency is the "Bode plot" of the signal. For the sawtooth: $\sin\omega t = \cos(\omega t - \pi/2)$, $-\tfrac12\sin2\omega t = \tfrac12\cos(2\omega t + \pi/2)$, $\tfrac13\sin3\omega t = \tfrac13\cos(3\omega t-\pi/2)$, … so the amplitudes are $1, \tfrac12, \tfrac13, \tfrac14$ and the phases alternate $-\pi/2, +\pi/2, \dots$ (with $A_n = 0$, take the quadrant from the sign of $B_n$, not from $\tan^{-1}(B/0)$).</p>
<p><b>Complex form (Lecture 14.2).</b> Substitute $\cos x = \frac12(e^{jx}+e^{-jx})$ and $\sin x = \frac1{2j}(e^{jx}-e^{-jx})$:</p>
$$f(t)=A_0+\sum_{n=1}^{\infty}\left(\frac{A_n-jB_n}{2}e^{jn\omega t}+\frac{A_n+jB_n}{2}e^{-jn\omega t}\right)$$
<p>Since $A_{-n} = A_n$ and $B_{-n} = -B_n$, the second sum is the first one run over negative $n$, which gives $f(t) = \sum_{-\infty}^{\infty}D_ne^{jn\omega t}$ with $D_n = \frac1T\int_{-T/2}^{T/2}f(t)e^{-jn\omega t}dt$ and $D_0 = A_0$. Real parts of $D_n$ come from the cosine terms, imaginary parts from the sine terms. The spectrum now runs over negative as well as positive frequencies.</p>

<h3>5. Convergence, Dirichlet and Gibbs phenomenon</h3>
<p>Rapidly changing signals need many high-frequency terms: only fast harmonics can follow fast changes. Compare the $D_n$ of $\sin10t + 3\sin20t$ (four imaginary lines at ±10 and ±20 rad/s) with a fluctuating signal (lines spread out to high frequency, real and imaginary). Smooth signals give a series that dies away quickly; a <b>piecewise smooth</b> signal (finitely many discontinuities, like the sawtooth or square wave) still converges.</p>
<p><b>Dirichlet conditions</b> for the series to converge: the signal is absolutely integrable, and has a finite number of maxima, minima and discontinuities in a period. The series equals $f(t)$ where $f$ is continuous; at a jump it converges to the <b>midpoint</b> $\tfrac12[f(t^+) + f(t^-)]$.</p>
<p><b>Gibbs phenomenon:</b> rebuilding a signal with a jump from a finite number of harmonics gives ringing and an overshoot next to the jump. With 5, 25 and 125 terms the ripple gets narrower and squeezes towards the jump, but the overshoot never drops below about <b>0.0895 × the jump</b> (≈ 9%).</p>

<h3>Worked: triangle wave (Tutorial Q20)</h3>
<p>Period 2π, peak 1 at t = 0, −1 at ±π: $f(t) = 1 - 2|t|/\pi$ on $(-\pi,\pi)$, $\omega = 1$.</p>
<ol class="steps"><li>Even → $B_n = 0$. Mean is zero → $A_0 = 0$.</li>
<li>$A_n = \frac{2}{\pi}\int_0^{\pi}\left(1-\frac{2t}{\pi}\right)\cos nt\,dt$. The "1" part integrates to $\sin(n\pi)/n = 0$.</li>
<li>Remaining: $A_n = -\frac{4}{\pi^2}\int_0^\pi t\cos nt\,dt = -\frac{4}{\pi^2}\cdot\frac{1}{n^2}\Big[\cos nt + nt\sin nt\Big]_0^\pi = \frac{4}{\pi^2n^2}(1-\cos n\pi)$.</li>
<li>$1-\cos n\pi = 2$ for odd n, 0 for even n: $A_n = \dfrac{8}{\pi^2n^2}$ (odd n only).</li></ol>
$$f(t) = \frac{8}{\pi^2}\left(\cos t + \frac19\cos3t+\frac1{25}\cos5t+\dots\right)$$
<p class="small">The tutorial sheet prints cos 2t and cos 3t in the bracket; it should be cos 3t and cos 5t (odd harmonics only, the 1/9 and 1/25 give it away).</p>

<h3>Worked: sawtooth (Lecture 13.2)</h3>
<p>Period $T$, rising linearly through the origin to $\pi/2$ at $t = T/2$, then dropping to $-\pi/2$. Slope $= \frac{\pi/2}{T/2} = \frac{\pi}{T} = \frac{\omega}{2}$, so $f(t) = \frac{\omega t}{2}$ on $(-T/2, T/2)$.</p>
<ol class="steps"><li>$A_0 = \frac1T\int_{-T/2}^{T/2}\frac{\omega}{2}t\,dt = \frac1T\left[\frac\omega4t^2\right]_{-T/2}^{T/2} = 0$: average value zero.</li>
<li>Odd function, so $A_n = 0$ (the $t\cos n\omega t$ integrand is odd).</li>
<li>$B_n = \frac2T\int_{-T/2}^{T/2}\frac\omega2t\sin n\omega t\,dt = \frac{\omega^2}{2\pi}\left[-\frac{t\cos n\omega t}{n\omega}+\frac{\sin n\omega t}{(n\omega)^2}\right]_{-T/2}^{T/2}$. With $T/2 = \pi/\omega$: $B_n = -\frac{\cos n\pi}{n} = \frac{(-1)^{n+1}}{n}$.</li></ol>
$$\text{sawtooth} = \sin\omega t - \tfrac12\sin2\omega t + \tfrac13\sin3\omega t - \tfrac14\sin4\omega t + \dots$$
<p>Because it's odd you could integrate from 0 to $T/2$ and double. The lecture builds it up term by term: each extra harmonic sharpens the fit, and the coefficients already found don't change (orthogonality).</p>

<h3>Worked: square wave (Lecture 13.3)</h3>
<p>Amplitude ±1, period $T$: $+1$ for $|t| < T/4$, $-1$ for $T/4 < |t| < T/2$.</p>
<ol class="steps"><li>Even → $B_n = 0$. Equal areas above and below → $A_0 = 0$.</li>
<li>Evaluate from $-T/4$ to $T/4$ and double: $A_n = \frac{4}{n\pi}\sin\frac{n\pi}{2}$.</li>
<li>$A_1 = \frac4\pi$, $A_2 = 0$, $A_3 = -\frac{4}{3\pi}$, $A_4 = 0$, $A_5 = \frac{4}{5\pi}$. It is also half-wave symmetric, which is why the even harmonics vanish.</li></ol>
$$f(t) = \frac4\pi\left(\cos\omega t - \tfrac13\cos3\omega t + \tfrac15\cos5\omega t - \dots\right)$$
<p><b>Shifting it (Lecture 14.3).</b> Delay the same wave by a quarter period ($\pi/2$ when $T = 2\pi$) and it becomes odd: $+1$ on $(0, T/2)$. Now only $B_n$ terms exist: $B_n = \frac{2}{T}\cdot2\int_0^{T/2}\sin n\omega t\,dt = \frac{2(1-\cos n\pi)}{n\pi} = \frac{4}{n\pi}$ for odd $n$:</p>
$$f(t) = \frac4\pi\left(\sin\omega t + \tfrac13\sin3\omega t + \tfrac15\sin5\omega t + \dots\right)$$
<p>A delay anywhere between gives a mix of $A_n$ and $B_n$ terms. The amplitudes $\frac{4}{n\pi}$ are the same in every case; only the phases move.</p>
<p class="small">The slide writes the sine-series coefficients as $\frac{4}{n\pi}\sin\frac{n\pi}{2}$ (alternating signs, carried over from the cosine case) and calls the shift "half a period". Integrating directly gives all-positive $\frac{4}{n\pi}$, and the plotted shift is a quarter period ($\pi/2$ of $2\pi$); a half-period delay would just turn the wave upside down.</p>

<h3>Worked: Dₙ for sin ωt (Lecture 14.2)</h3>
$$D_n = \frac1T\int_{-T/2}^{T/2}\sin\omega t\,e^{-jn\omega t}dt = \frac1T\int_{-T/2}^{T/2}\frac{e^{j(1-n)\omega t}-e^{-j(1+n)\omega t}}{2j}dt$$
<p>With $T/2 = \pi/\omega$ this works out to</p>
$$D_n = -\frac j2\left[\frac{\sin(1-n)\pi}{(1-n)\pi} - \frac{\sin(1+n)\pi}{(1+n)\pi}\right]$$
<p>Every term is zero except where a denominator is zero, and $\frac{\sin x}{x} \to 1$ as $x \to 0$: $D_1 = -\frac j2$, $D_{-1} = +\frac j2$, all others 0. Check: $\sin\omega t = \frac{1}{2j}e^{j\omega t} - \frac{1}{2j}e^{-j\omega t}$ and $\frac1{2j} = -\frac j2$. A sine gives two <b>imaginary</b> lines of opposite sign at ±ω; a cosine gives two <b>real</b> lines of $+\frac12$ (Tutorial Q22).</p>
<p>Relating back: $D_0 = A_0$, $D_n = \frac12(A_n - jB_n)$, $D_{-n} = \frac12(A_n + jB_n)$ (with $n$ positive on the right).</p>

<h3>Phase shifts keep A² + B² constant (Lecture 14.3)</h3>
<p>Shifting a wave doesn't change its shape, so something about the coefficients must stay fixed. Take $f = A\cos\omega t + B\sin\omega t$ and average $f^2$ over a period (squaring stops negative area cancelling positive):</p>
$$\frac1T\int_{-T/2}^{T/2}f^2dt = \frac1T\int\left(A^2\cos^2\omega t + 2AB\cos\omega t\sin\omega t + B^2\sin^2\omega t\right)dt = \tfrac12\left(A^2+B^2\right)$$
<p>The cross term integrates to zero (orthogonality again). The mean square doesn't change when the curve is shifted, so <b>$A_n^2 + B_n^2$ is constant under a phase change</b>, for every harmonic.</p>
<div class="callout key"><b>Lecture example.</b> $f(t) = 2\cos\omega t + 5\sin\omega t$. The phase changes so the cosine (real) amplitude rises by 50% to 3. $A^2 + B^2 = 4 + 25 = 29$, so $9 + B^2 = 29$, $B = \pm\sqrt{20} = \pm4.47$: $f(t) = 3\cos\omega t \pm \sqrt{20}\sin\omega t$.</div>`,
formulas: [
 {name:"Fourier series", tex:R`f(t)=A_0+\sum_{n=1}^\infty(A_n\cos n\omega t+B_n\sin n\omega t)`},
 {name:"Mean term", tex:R`A_0=\frac1T\int_{-T/2}^{T/2}f\,dt`},
 {name:"Cosine coefficients", tex:R`A_n=\frac2T\int_{-T/2}^{T/2}f\cos n\omega t\,dt`},
 {name:"Sine coefficients", tex:R`B_n=\frac2T\int_{-T/2}^{T/2}f\sin n\omega t\,dt`},
 {name:"Amplitude–phase form", tex:R`f(t)=A_0+\sum C_n\cos(n\omega t-\varphi_n),\ \ C_n=\sqrt{A_n^2+B_n^2},\ \ \varphi_n=\tan^{-1}\frac{B_n}{A_n}`},
 {name:"Complex series", tex:R`f(t)=\sum_{n=-\infty}^{\infty}D_ne^{jn\omega t},\quad D_n=\frac1T\int_{-T/2}^{T/2}f(t)e^{-jn\omega t}dt`},
 {name:"Complex coefficients", tex:R`D_n=\frac{A_n-jB_n}{2},\quad |D_n|=\tfrac12\sqrt{A_n^2+B_n^2}`},
 {name:"Mean square (phase-invariant)", tex:R`\frac1T\int_{-T/2}^{T/2}(A\cos\omega t+B\sin\omega t)^2dt=\tfrac12(A^2+B^2)`},
 {name:"Square wave (±1, even)", tex:R`f(t)=\frac4\pi\left(\cos\omega t-\tfrac13\cos3\omega t+\tfrac15\cos5\omega t-\dots\right)`},
 {name:"Sawtooth (peak π/2)", tex:R`f(t)=\sin\omega t-\tfrac12\sin2\omega t+\tfrac13\sin3\omega t-\dots`},
 {name:"At a discontinuity", tex:R`\text{series}\to\tfrac12\left[f(t^+)+f(t^-)\right]`},
 {name:"Integration by parts results", tex:R`\int x\cos ax\,dx=\frac{\cos ax+ax\sin ax}{a^2},\ \ \int x\sin ax\,dx=\frac{\sin ax-ax\cos ax}{a^2}`},
 {name:"Useful values", tex:R`\sin n\pi=0,\quad \cos n\pi=(-1)^n`}
],
questions: [
 {src:"Tutorial Q20", q:R`Determine the Fourier sine and cosine series for the triangle wave of period 2π, amplitude 1, with peaks at t = 0, ±2π and troughs (−1) at ±π.`, sol:R`Worked in full in the theory section: $f(t) = \frac{8}{\pi^2}\left(\cos t + \frac19\cos3t + \frac1{25}\cos5t+\dots\right)$.`, ans:"8/π² Σ cos(nt)/n², n odd"},
 {src:"Tutorial Q22", q:R`Derive the $D_n$ terms for $\cos\omega t$.`, sol:R`$\cos\omega t = \frac12e^{j\omega t}+\frac12e^{-j\omega t}$, so $D_1 = \tfrac12$, $D_{-1} = \tfrac12$, all others zero.`, ans:"½ at n = ±1"},
 {src:"Tutorial Q23", q:R`If $A_n^2+B_n^2$ stays constant for a signal regardless of its phase, what does this imply for the $D_n$?`, sol:R`$|D_n| = \frac12\sqrt{A_n^2+B_n^2}$ is constant: shifting the signal only rotates each $D_n$ (changes its angle), its magnitude stays the same. The amplitude spectrum is unaffected by a time shift; only the phase spectrum changes.`},
 {src:"Tutorial Q24", q:R`$f(t) = 3\cos\omega t + 4\sin\omega t$ changes phase so that the sine component is halved. What is the new $A_n$?`, sol:R`$A^2+B^2 = 9 + 16 = 25$ stays fixed. New $B = 2$: $A = \pm\sqrt{25-4} = \pm\sqrt{21}$.`, ans:"±√21"},
 {src:"2023 Exam, Q2 (30 marks)", q:R`(a) What is the spectrum of a signal? (b) Three ways to represent the spectrum of a periodic signal. (c) Rules that reduce computation. (d) Find the Fourier series of the period-2π sawtooth that rises linearly from −π/2 at t = −π to π/2 at t = π (i.e. $f(t) = t/2$). (e) What happens at discontinuities when rebuilding the signal from its spectrum?`,
  sol:R`<p><b>(a)</b> The description of the signal by the amplitude (and phase) of the frequency components it contains: what frequencies are present and how strong.</p>
  <p><b>(b)</b> $A_n$/$B_n$ vs frequency; amplitude $C_n$ and phase $\varphi_n$ vs frequency; complex two-sided $D_n$ at ±nω.</p>
  <p><b>(c)</b> Even → no sine terms; odd → no cosine terms and no mean; zero mean → $A_0 = 0$; half-wave symmetry → odd harmonics only; integrate over half a period and double; choose the origin to create symmetry.</p>
  <p><b>(d)</b> Odd, so $A_0 = A_n = 0$. $B_n = \frac{2}{2\pi}\int_{-\pi}^{\pi}\frac t2\sin nt\,dt = \frac1\pi\int_0^\pi t\sin nt\,dt = \frac1\pi\left[\frac{\sin nt - nt\cos nt}{n^2}\right]_0^\pi = -\frac{\cos n\pi}{n} = \frac{(-1)^{n+1}}{n}$.
  $$f(t) = \sin t - \tfrac12\sin2t + \tfrac13\sin3t - \dots$$</p>
  <p><b>(e)</b> Overshoot and ringing next to each jump, about 9% of the jump, which doesn't go away with more terms: <b>Gibbs phenomenon</b>.</p>`},
 {src:"2022 Resit, Q2 (30 marks)", q:R`(a) What signals can the Fourier series represent? (b) Significance of orthogonality. (c) A function is given on 0 ≤ x ≤ π/2: it rises linearly from 0 to 1 by x = π/4 and stays at 1 to π/2. Complete it over −π to π so the series has (i) only cosines, (ii) only sines, (iii) zero mean. (d) Find the nth coefficient for case (i).`,
  hint:"(i) mirror it to make it even. (ii) flip it to make it odd. Reading of the figure is an assumption; see the note in the solution.",
  sol:R`<p><b>(a)</b> Periodic signals (piecewise continuous over a period).</p><p><b>(b)</b> Each harmonic is independent of the others, so every coefficient is found separately by one integral, and adding more harmonics never changes the earlier coefficients.</p>
  <p><b>(c)</b> (i) Even extension: mirror about the y-axis. (ii) Odd extension: rotate 180° about the origin. (iii) Fill the rest of the period with negative values so the total area is zero (e.g. the odd extension, or a negative copy on π/2 to π).</p>
  <p><b>(d)</b> Assume the even extension is zero for π/2 &lt; |x| &lt; π (state your choice in the exam). T = 2π, ω = 1:
  $$A_n = \frac{2}{\pi}\left[\int_0^{\pi/4}\frac{4x}{\pi}\cos nx\,dx + \int_{\pi/4}^{\pi/2}\cos nx\,dx\right]$$
  Using the printed integral: first part $= \frac{4}{\pi n^2}\left(\cos\frac{n\pi}4 - 1\right) + \frac1n\sin\frac{n\pi}{4}$; second $= \frac1n\left(\sin\frac{n\pi}2 - \sin\frac{n\pi}4\right)$.
  $$A_n = \frac2\pi\left[\frac{4}{\pi n^2}\left(\cos\frac{n\pi}{4}-1\right) + \frac{1}{n}\sin\frac{n\pi}{2}\right],\qquad A_0 = \frac{3}{8}$$</p>
  <p class="small">The figure on the paper is small; this reading (ramp to π/4) is my best reading of it. The method is what matters.</p>`},
 {src:"MCQ · several years", q:R`(i) Why is the Fourier series an orthogonal basis for periodic signals? (ii) Which is even with zero mean: 3cos5t, 4cos(2t+1), 2sin2t, 2+cos2t?`, sol:"(i) The sinusoids are a set of independent harmonic functions. (ii) 3cos5t.", ans:"(i) independent harmonics (ii) 3cos5t"},
 {src:"Lecture 14 notes example", q:R`A signal is $f(t) = 2\cos\omega t + 5\sin\omega t$. Its phase changes so that the real (cosine) component's amplitude increases by 50%. How is the new signal described?`,
  hint:"A shift leaves A² + B² unchanged.",
  sol:R`<p>$A^2 + B^2 = 2^2 + 5^2 = 29$ is fixed by the shape. New $A = 1.5 \times 2 = 3$, so $3^2 + B^2 = 29$, $B^2 = 20$, $B = \pm\sqrt{20} = \pm4.47$.</p><p>$$f(t) = 3\cos\omega t \pm \sqrt{20}\sin\omega t$$</p><p class="small">The notes' last line reads "3cos ωt ±5 ±√20 sin ωt"; the "±5" is a leftover typo.</p>`,
  ans:"3cos ωt ± √20 sin ωt", prov:"From the worked example in the Lecture 14 additional notes."},
 {src:"Lecture 13.3 / 14.3", q:R`A square wave of amplitude 1 and period $2\pi$ is $+1$ for $|t| < \pi/2$ and $-1$ elsewhere in the period. (a) Find its Fourier series. (b) Find the series after the wave is delayed by $\pi/2$. (c) What stays the same?`,
  hint:"(a) Even and zero mean. (b) The delayed wave is odd: +1 on (0, π).",
  sol:R`<p><b>(a)</b> Even → $B_n = 0$; zero mean → $A_0 = 0$. $A_n = \frac{2}{\pi}\int_0^{\pi/2}\cos nt\,dt - \frac2\pi\int_{\pi/2}^{\pi}\cos nt\,dt = \frac{4}{n\pi}\sin\frac{n\pi}{2}$, so $f = \frac4\pi(\cos t - \frac13\cos3t + \frac15\cos5t - \dots)$.</p>
  <p><b>(b)</b> Odd → $A_n = 0$. $B_n = \frac2\pi\int_0^\pi\sin nt\,dt = \frac{2(1-\cos n\pi)}{n\pi} = \frac{4}{n\pi}$ (odd $n$): $f = \frac4\pi(\sin t + \frac13\sin3t + \frac15\sin5t + \dots)$.</p>
  <p><b>(c)</b> $\sqrt{A_n^2 + B_n^2} = \frac{4}{n\pi}$ for each odd $n$ in both cases: the amplitude spectrum is unchanged, only the phases move. Only odd harmonics appear in both (half-wave symmetry).</p>`,
  ans:"(4/π)Σ cos terms → (4/π)Σ sin(nt)/n, n odd", prov:"From the worked examples in Lectures 13.3 and 14.3; the sine-series signs were checked by direct integration (see the note in the theory)."},
 {src:"Lecture 14.2", q:R`Find the complex Fourier coefficients $D_n$ of $f(t) = \sin\omega t$ and sketch the two-sided spectrum.`,
  hint:"Either integrate D_n = (1/T)∫ f e^{−jnωt} dt, or just write sin with the inverse Euler formula.",
  sol:R`<p>$\sin\omega t = \frac{e^{j\omega t} - e^{-j\omega t}}{2j} = -\frac j2e^{j\omega t} + \frac j2e^{-j\omega t}$.</p><p>So $D_1 = -\frac j2$, $D_{-1} = +\frac j2$, all others zero. The real-part plot is empty; the imaginary-part plot has a line of $-\frac12$ at $+\omega$ and $+\frac12$ at $-\omega$. (Integrating gives the same: every $\frac{\sin x}{x}$ term is zero except at $n = \pm1$, where it is 1.)</p>`,
  ans:"D₁ = −j/2, D₋₁ = +j/2", prov:"From the worked example in Lecture 14.2 and its additional notes."},
 {src:"Lecture 14.3", q:R`(a) State Dirichlet's conditions for a Fourier series to converge. (b) What value does the series take at a discontinuity? (c) Describe Gibbs phenomenon.`,
  sol:R`<p><b>(a)</b> The signal must be absolutely integrable and have a finite number of maxima, minima and discontinuities in a period.</p><p><b>(b)</b> The midpoint of the jump: $\tfrac12[f(t^+) + f(t^-)]$.</p><p><b>(c)</b> A finite series rebuilding a jump rings and overshoots next to it. More terms make the ringing narrower and push it towards the jump, but the overshoot stays at about 0.0895 × the jump height (≈ 9%).</p>`,
  prov:"From Lecture 14.3."}
],
traps: ["Check symmetry before integrating; it often kills half the coefficients.", "A₀ has 1/T in front; Aₙ and Bₙ have 2/T.", "cos nπ = (−1)ⁿ and sin nπ = 0: write these in early.", "When Aₙ = 0, tan⁻¹(Bₙ/Aₙ) is ±π/2 depending on the sign of Bₙ; don't just write tan⁻¹(∞).", "Dₙ for a sine is imaginary (−j/2 at +ω); for a cosine it's real (½ at ±ω).", "A shift changes Aₙ and Bₙ individually but never Aₙ² + Bₙ²."]
});

T.topics.push({
id: "fourier-transform", part: "Signal processing", title: "Fourier Transform of Aperiodic Signals",
lectures: "Not yet lectured · built from tutorial sheet & past papers", status: "pending",
summary: "From lines to a continuous spectrum: the Fourier transform integral, the rectangular pulse and sinc function, and the shift, differentiation and integration properties the MCQs test.",
theory: R`
<div class="callout warn">Lectures not yet released. Built from tutorial Q25 and past papers.</div>
<h3>1. From series to transform</h3>
<p>Take a periodic signal and let the period $T\to\infty$: the line spacing $\omega = 2\pi/T$ shrinks to zero and the lines merge into a continuous curve. A one-off (aperiodic) signal therefore has a <b>continuous spectrum</b>:</p>
$$F(\omega) = \int_{-\infty}^{\infty}f(t)e^{-j\omega t}\,dt \qquad f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)e^{j\omega t}\,d\omega$$
<p>$F(\omega)$ is complex: show it as magnitude $|F|$ and phase $\angle F$ against ω, or as real and imaginary parts.</p>

<h3>2. Properties the exam uses</h3>
<table class="data"><tr><th>Time domain</th><th>Frequency domain</th></tr>
<tr><td>$f(t-t_0)$ (delay)</td><td>$F(\omega)e^{-j\omega t_0}$: magnitude unchanged, phase $-\omega t_0$ added</td></tr>
<tr><td>$\dfrac{df}{dt}$</td><td>$j\omega F(\omega)$</td></tr>
<tr><td>$\int f\,dt$</td><td>$\dfrac{F(\omega)}{j\omega}$</td></tr>
<tr><td>$af+bg$</td><td>$aF + bG$ (linear)</td></tr>
<tr><td>Real and even</td><td>Real spectrum (no imaginary part)</td></tr>
<tr><td>Real and odd</td><td>Purely imaginary spectrum</td></tr>
<tr><td>Impulse $\delta(t)$</td><td>$1$: all frequencies equally</td></tr></table>
<p>The derivative rule is why an ODE turns into algebra: each $d/dt$ becomes $j\omega$ (used in the Systems topic).</p>

<h3>3. Rectangular pulse</h3>
<p>Height 1 from $-\tau$ to $+\tau$:</p>
$$F(\omega) = \int_{-\tau}^{\tau}e^{-j\omega t}dt = \frac{e^{j\omega\tau}-e^{-j\omega\tau}}{j\omega} = \frac{2\sin\omega\tau}{\omega} = 2\tau\,\frac{\sin\omega\tau}{\omega\tau} = 2\tau\,\text{sinc}(\omega\tau)$$
<p>with $\text{sinc}(x) = \sin x/x$. Real, because the pulse is even. Zeros at $\omega = k\pi/\tau$. A narrower pulse spreads the spectrum wider.</p>
<div class="plot" data-plot="sinc"></div>`,
formulas: [
 {name:"Fourier transform", tex:R`F(\omega)=\int_{-\infty}^{\infty}f(t)e^{-j\omega t}dt`},
 {name:"Inverse", tex:R`f(t)=\frac1{2\pi}\int_{-\infty}^\infty F(\omega)e^{j\omega t}d\omega`},
 {name:"Time shift", tex:R`f(t-t_0)\ \leftrightarrow\ F(\omega)e^{-j\omega t_0}`},
 {name:"Derivative / integral", tex:R`\frac{df}{dt}\leftrightarrow j\omega F,\qquad \int f\,dt\leftrightarrow\frac{F}{j\omega}`},
 {name:"Rectangular pulse (±τ, height 1)", tex:R`F(\omega)=\frac{2\sin\omega\tau}{\omega}=2\tau\,\text{sinc}(\omega\tau)`},
 {name:"Sinc", tex:R`\text{sinc}(x)=\frac{\sin x}{x},\quad \lim_{x\to0}\text{sinc}(x)=1`}
],
questions: [
 {src:"2025 Resit, Q2 (30 marks)", q:R`(a) When is the Fourier series used and when the Fourier transform? (b) Fourier transform of the rectangular pulse (height 1, from −τ to +τ). (c) How does the spectrum change if the pulse is delayed by τ? (d) Express (b) with sinc. (e) Does the spectrum have imaginary components? Explain from the shape. (f) As the pulse duration → 0 for a signal of fixed strength, what happens to the spectrum? Prove it.`,
  sol:R`<p><b>(a)</b> Series: periodic signals (discrete spectrum lines at harmonics). Transform: aperiodic signals (continuous spectrum).</p>
  <p><b>(b)</b> $F(\omega) = \int_{-\tau}^{\tau}e^{-j\omega t}dt = \left[\frac{e^{-j\omega t}}{-j\omega}\right]_{-\tau}^{\tau} = \frac{e^{j\omega\tau}-e^{-j\omega\tau}}{j\omega} = \frac{2\sin\omega\tau}{\omega}$.</p>
  <p><b>(c)</b> $F_d(\omega) = \int_0^{2\tau}e^{-j\omega t}dt = \frac{2\sin\omega\tau}{\omega}e^{-j\omega\tau}$: same magnitude, extra phase $-\omega\tau$.</p>
  <p><b>(d)</b> $F(\omega) = 2\tau\,\frac{\sin\omega\tau}{\omega\tau} = 2\tau\,\text{sinc}(\omega\tau)$.</p>
  <p><b>(e)</b> No. The pulse is even ($f(-t) = f(t)$); the imaginary part comes from $\int f(t)\sin\omega t\,dt$, which is zero for an even function (odd integrand). The delayed version in (c) is not even, so it does have imaginary components.</p>
  <p><b>(f)</b> Keep the area fixed: height $1/2\tau$, so $F(\omega) = \frac{1}{2\tau}\cdot2\tau\,\text{sinc}(\omega\tau) = \text{sinc}(\omega\tau)$. As $\tau\to0$, $\omega\tau\to0$ for every finite ω and $\sin x/x\to1$, so $F(\omega)\to1$: a flat spectrum. The pulse becomes an impulse, which contains all frequencies equally.</p>`},
 {src:"Tutorial Q25", q:R`Determine the spectrum of the signal that is −1 from −τ to 0 and +1 from 0 to τ (zero elsewhere).`,
  sol:R`<ol class="steps"><li>$F = \int_0^\tau e^{-j\omega t}dt - \int_{-\tau}^0e^{-j\omega t}dt = \frac{1-e^{-j\omega\tau}}{j\omega} - \frac{e^{j\omega\tau}-1}{j\omega}$.</li>
  <li>$= \frac{2 - (e^{j\omega\tau}+e^{-j\omega\tau})}{j\omega} = \frac{2(1-\cos\omega\tau)}{j\omega} = \frac{4\sin^2(\omega\tau/2)}{j\omega}$.</li>
  <li>Multiply top and bottom to match the sheet: $F(\omega) = -j\omega\tau^2\,\dfrac{\sin^2(\omega\tau/2)}{(\omega\tau/2)^2}$.</li></ol>
  <p>Purely imaginary, as expected for an odd signal.</p>`, ans:"−jωτ² sin²(ωτ/2)/(ωτ/2)²"},
 {src:"MCQ · several years", q:R`(i) $X(\omega)$ is delayed by 3 s: new description? (ii) Spectrum of the signal integrated with respect to time? (iii) Spectrum of the signal differentiated?`, sol:R`(i) $X(\omega)e^{-3j\omega}$. (ii) $X(\omega)/(j\omega)$. (iii) $j\omega X(\omega)$.`}
],
traps: ["Delay gives e^(−jωt₀): negative exponent, with j. X(ω − 3) is a frequency shift, not a delay.", "Even signal → real spectrum; odd → imaginary.", "sinc(x) = sin x / x in this course (no π inside)."]
});

T.topics.push({
id: "sampling", part: "Signal processing", title: "Sampling, Aliasing, DFT & FFT",
lectures: "Not yet lectured · built from tutorial sheet & past papers", status: "pending",
summary: "What sampling does to a spectrum, aliasing and the anti-aliasing filter, reading sampled spectra, computing a small DFT by hand, and counting multiplications for the DFT vs the Cooley–Tukey FFT.",
theory: R`
<div class="callout warn">Lectures not yet released. Built from tutorial Q26–Q30, Lecture 10.1 and past papers.</div>
<h3>1. Why sample</h3>
<p>Computers can only store and process numbers at discrete instants, so continuous signals are sampled (and quantised by an A/D) for digital storage, processing, transmission and analysis such as the FFT.</p>
<p>An analogue signal is defined at every instant; its sampled counterpart only at $t = 0, t_s, 2t_s, \dots$ (a train of weighted impulses):</p>
$$x^*(t) = \sum_k x(kt_s)\,\delta(t-kt_s), \qquad x(2) = \int_0^\infty \delta(t-2)\,x(t)\,dt$$

<h3>2. What sampling does to the spectrum</h3>
<p>Sampling at $\omega_s = 2\pi/t_s$ <b>replicates</b> the original spectrum around every multiple of $\omega_s$. A cosine at $\omega_0$ shows lines at</p>
$$\omega_0,\ \ \omega_s\pm\omega_0,\ \ 2\omega_s\pm\omega_0,\ \dots$$
<p>If $\omega_0 > \omega_s/2$, the image at $\omega_s - \omega_0$ lands below the Nyquist frequency and is indistinguishable from a real component: <b>aliasing</b> (the frequency "folds back").</p>
<div class="plot" data-plot="alias"></div>
<div class="callout key"><b>Two effects in a sampled spectrum:</b> (1) images/replicas around multiples of the sampling frequency; (2) aliasing, where replicas overlap the baseband because the sampling rate was too low and high frequencies appear at false low frequencies.</div>
<p><b>Reading a sampled spectrum backwards:</b> lines at 20, 80, 120, 180, 220… rad/s → pairs $(\omega_s - \omega_0, \omega_s+\omega_0)$ = (80, 120) → $\omega_s = 100$, $\omega_0 = 20$: a cosine at 20 rad/s.</p>

<h3>3. Anti-aliasing filter</h3>
<p>An analogue low-pass filter placed <i>before</i> the A/D removes everything above half the sampling frequency, so nothing can fold back. Because real filters roll off gradually, sample comfortably above twice the cut-off. For signals of interest in 0–100 Hz: low-pass at about 100 Hz and sample at several times that (e.g. 500 Hz–1 kHz), so the filter has fully attenuated anything above $f_s/2$.</p>

<h3>4. The DFT</h3>
<p>$N$ samples $x_0, \dots, x_{N-1}$ at spacing $t_s$ give $N$ spectral values:</p>
$$X_k = \sum_{n=0}^{N-1}x_n\,e^{-j2\pi kn/N},\qquad \omega_k = \frac{2\pi k}{Nt_s}$$
<p>Resolution $\Delta f = 1/(Nt_s) = 1/T_{record}$. Maximum analysable frequency $= f_s/2$. For N = 4, $e^{-j2\pi kn/4}$ is just $1, -j, -1, j$, so small DFTs are quick by hand.</p>

<h3>5. Cost: DFT vs FFT</h3>
<p>The DFT needs about $N^2$ complex multiplications. The Cooley–Tukey FFT ($N = 2^m$) splits it repeatedly in half and needs about $N\log_2N$ in this course's counting (32 samples → 160; the tutorial Q30 answer uses the same count). Some textbooks quote $\tfrac N2\log_2N$; follow the course.</p>
<table class="data num"><tr><th>N</th><th>DFT N²</th><th>FFT N log₂N</th></tr><tr><td>32</td><td>1 024</td><td>160</td></tr><tr><td>512</td><td>262 144</td><td>4 608</td></tr><tr><td>1024</td><td>1 048 576</td><td>10 240</td></tr><tr><td>2048</td><td>4 194 304</td><td>22 528</td></tr></table>`,
formulas: [
 {name:"Sampling frequency", tex:R`\omega_s=\frac{2\pi}{t_s},\quad f_s=\frac1{t_s}`},
 {name:"Nyquist criterion", tex:R`f_s\ge2f_{max}`},
 {name:"Image locations", tex:R`k\,\omega_s\pm\omega_0`},
 {name:"Alias frequency", tex:R`f_{alias}=|f_0-kf_s|`, note:"nearest multiple of f_s"},
 {name:"DFT", tex:R`X_k=\sum_{n=0}^{N-1}x_ne^{-j2\pi kn/N}`},
 {name:"Resolution / max frequency", tex:R`\Delta f=\frac1{Nt_s},\quad f_{max}=\frac{f_s}2`},
 {name:"Operation counts", tex:R`\text{DFT}: N^2\qquad \text{FFT}: N\log_2N`}
],
questions: [
 {src:"Tutorial Q26", q:R`A sampled signal has values 1, 2, −2, −5 starting at t = 0 with interval $t_s$. Describe it in continuous time and find the spectral components at $\omega = 0$, $\pi/2t_s$, $\pi/t_s$.`,
  sol:R`<p>$x^*(t) = \delta(t) + 2\delta(t-t_s) - 2\delta(t-2t_s) - 5\delta(t-3t_s)$.</p>
  <p>N = 4, so $\omega_k = 2\pi k/4t_s$: k = 0, 1, 2 give 0, $\pi/2t_s$, $\pi/t_s$.</p>
  <ul><li>$X_0 = 1+2-2-5 = -4$</li><li>$X_1 = 1 + 2(-j) - 2(-1) - 5(j) = 3-7j$</li><li>$X_2 = 1 + 2(-1) - 2(1) - 5(-1) = 2$</li></ul>`, ans:"−4, 3−7j, 2"},
 {src:"Tutorial Q27", q:R`$f(t) = 3\sin100\pi t$ is sampled (a) every 12.5 ms and (b) every 5 ms. Sketch the spectrum up to the sampling frequency in each case.`,
  sol:R`<p>Signal: $f_0 = 50$ Hz.</p><p><b>(a)</b> $f_s = 80$ Hz &lt; 2×50: aliasing. Lines at 50 Hz and $80-50 = 30$ Hz (up to 80 Hz). The 30 Hz line is an alias and falls below the Nyquist frequency of 40 Hz.</p><p><b>(b)</b> $f_s = 200$ Hz: no aliasing. Lines at 50 Hz and $200-50 = 150$ Hz; Nyquist 100 Hz, so only 50 Hz appears in the analysed range.</p>`},
 {src:"Tutorial Q28", q:R`A sampled cosine has unit-amplitude real components at 150, 250, 550, 650, 950, 1050, … rad/s. Describe the signal and the sampling frequency.`,
  sol:R`Lines come in $k\omega_s\pm\omega_0$: (250, 550) centred on 400, (650, 950) centred on 800, (1050, …) on 1200. So $\omega_s = 400$ rad/s and $\omega_0 = 150$ rad/s: $f(t) = \cos150t$ (amplitude per the plot's scaling).`, ans:"cos 150t, ωs = 400 rad/s"},
 {src:"Tutorial Q29", q:R`A 35 kHz dog whistle is recorded with a microphone sampled at 40 kHz and played back up to the Nyquist frequency. What frequency is heard?`, sol:R`Nyquist = 20 kHz &lt; 35 kHz. Alias at $40-35 = 5$ kHz.`, ans:"5 kHz"},
 {src:"Tutorial Q30", q:R`A signal is sampled over 2 s. With 512 points, what's the maximum frequency that can be analysed? How many extra multiplications (Cooley–Tukey FFT) to get the maximum frequency above 300 Hz?`,
  sol:R`<ol class="steps"><li>$f_s = 512/2 = 256$ Hz → $f_{max} = 128$ Hz.</li><li>Need $f_s > 600$ Hz → more than 1200 points in 2 s; next power of 2 is 2048 ($f_{max} = 512$ Hz). (1024 only gives 256 Hz.)</li><li>FFT cost: $2048\log_2 2048 - 512\log_2512 = 22528 - 4608 = 17\,920$ extra.</li></ol>`, ans:"128 Hz; 17 920 extra"},
 {src:"2024 Exam, Q2 (30 marks)", q:R`(a) Analogue vs sampled signal. (b) Why sample? (c) Two effects in the spectrum of a sampled signal, with a sketch. (d) How does an anti-aliasing filter work and what sampling/filtering would you design for 0–100 Hz? (e) What signal gives lines at 20, 80, 120, 180, 220, 280, 320, 380 rad/s (unit height)? (f) Ideal phase characteristic of a filter?`,
  sol:R`<p><b>(a)</b> Analogue: defined at every instant (continuous). Sampled: values only at discrete instants $kt_s$, a train of weighted impulses.</p><p><b>(b)</b> Digital computers need discrete values to store, process (e.g. FFT), transmit and display data.</p><p><b>(c)</b> Replication of the spectrum about multiples of $\omega_s$; aliasing (folding of components above $\omega_s/2$ to false lower frequencies) when sampling too slowly. Sketch the original lines and their mirror images about $\omega_s$, $2\omega_s$.</p><p><b>(d)</b> Analogue low-pass before the A/D removes content above $f_s/2$ so nothing can alias. For 0–100 Hz: cut-off ≈ 100 Hz and sample at several hundred Hz (≥ 2×, in practice 5–10× because of the gradual roll-off).</p><p><b>(e)</b> Pairs (80, 120), (180, 220), (280, 320) centre on 100, 200, 300 → $\omega_s = 100$ rad/s; baseline 20 rad/s: $\cos20t$.</p><p><b>(f)</b> Phase linear in frequency, $\varphi = -\omega t_d$: constant delay at all frequencies, no distortion (sketch a straight line through the origin with negative slope).</p>`},
 {src:"2022 Exam, Q2e", q:R`512 points are converted with the DFT. What reduction in multiplications does the FFT give?`, sol:R`DFT $512^2 = 262\,144$; FFT $512\times9 = 4\,608$. Reduction $= 257\,536$ (about 57× fewer).`, ans:"257 536"},
 {src:"MCQ · several years", q:R`(i) 32 samples through a Cooley–Tukey FFT: multiplications? 160 / 320 / 80 / 256. (ii) How is $x(t)$ sampled after 2 s described mathematically? (iii) Which signal gives a sampled spectrum with lines at 20, 80, 120, 180, 220…: 2cos80t, cos20t, 2sin80t, cos80t?`,
  sol:R`(i) $32\log_2 32 = 160$. (ii) $\int_0^\infty\delta(t-2)x(t)\,dt$. (iii) cos 20t.`}
],
traps: ["The alias appears at f_s − f₀, not at f₀ − f_s/2.", "Record length sets resolution; sampling rate sets the maximum frequency.", "FFT needs N = 2^m; round point counts up to the next power of two."]
});

T.topics.push({
id: "systems", part: "Signal processing", title: "Systems Analysis: Frequency Response & Convolution",
lectures: "Not yet lectured · built from tutorial sheet & past papers", status: "pending",
summary: "How a linear system changes a signal: the frequency response function H(ω) from an ODE or a circuit, gain and phase at a frequency, −3 dB bandwidth, the impulse response, and convolution of sampled signals.",
theory: R`
<div class="callout warn">Lectures not yet released. Built from tutorial Q31–Q35 and past papers.</div>
<h3>1. Linear systems keep frequency</h3>
<p>A sinusoid into a linear system comes out as a sinusoid of the <b>same frequency</b>, scaled in amplitude and shifted in phase. Describing a system means saying how much it scales and shifts each frequency.</p>

<h3>2. Frequency response function</h3>
$$H(\omega) = \frac{Y(\omega)}{X(\omega)}\qquad\Longleftrightarrow\qquad Y(\omega) = H(\omega)X(\omega)$$
<p><b>From an ODE:</b> Fourier-transform both sides; each $d/dt$ becomes $j\omega$. E.g. $y + 2\dfrac{dy}{dt} = 3x$ → $Y(1+2j\omega) = 3X$ → $H = \dfrac{3}{1+2j\omega}$.</p>
<p><b>From a circuit:</b> use impedances $Z_R = R$, $Z_L = j\omega L$, $Z_C = 1/j\omega C$ and the voltage-divider rule.</p>
<p><b>At a particular frequency</b> substitute ω and find:</p>
<ul><li><b>Gain</b> $|H(\omega)|$: output amplitude / input amplitude.</li><li><b>Phase</b> $\angle H(\omega)$: angle of numerator − angle of denominator.</li></ul>
<div class="callout key"><b>First-order low-pass</b> $H = \dfrac{K}{1+j\omega\tau}$: $|H| = K/\sqrt{1+\omega^2\tau^2}$, phase $= -\tan^{-1}\omega\tau$. −3 dB when $\omega\tau = 1$: <b>bandwidth $\omega_c = 1/\tau$</b>, where gain is $K/\sqrt2$ and phase −45°.</div>

<h3>3. Impulse response</h3>
<p>The impulse response $h(t)$ is the output when the input is a unit impulse $\delta(t)$. Since an impulse contains all frequencies equally ($\delta\leftrightarrow1$), $h(t)$ and $H(\omega)$ are a Fourier-transform pair. Find it by hitting the system with a short sharp input (e.g. a hammer tap) and recording the output, or by inverse-transforming $H(\omega)$.</p>

<h3>4. Convolution: output in the time domain</h3>
<p>Treat the input as a string of impulses; each produces a scaled, delayed copy of $h$, and the output is their sum:</p>
$$y(t) = \int_{0}^{t}h(\tau)\,x(t-\tau)\,d\tau \qquad\text{sampled: } y_n = \sum_k h_k\,x_{n-k}$$
<p>Convolution in time ⇔ multiplication in frequency ($Y = HX$).</p>
<ol class="steps"><li>Write $h_0, h_1, h_2,\dots$ and $x_0, x_1,\dots$</li><li>For each output index n, multiply every pair whose indices add to n and sum them (flip-and-slide).</li><li>The output lasts (length of x) + (length of h) − 1 samples.</li><li>For a constant input, the output is steady once the whole of h overlaps the input: steady value = input × sum of $h$. After the input stops, it takes (length of h − 1) samples to die away.</li></ol>`,
formulas: [
 {name:"Frequency response", tex:R`H(\omega)=\frac{Y(\omega)}{X(\omega)}`},
 {name:"ODE → H(ω)", tex:R`\frac{d}{dt}\ \to\ j\omega`},
 {name:"Impedances", tex:R`Z_R=R,\ \ Z_L=j\omega L,\ \ Z_C=\frac1{j\omega C}`},
 {name:"Gain and phase", tex:R`|H|=\frac{|N|}{|D|},\quad \angle H=\angle N-\angle D`},
 {name:"First-order bandwidth", tex:R`H=\frac{K}{1+j\omega\tau}\Rightarrow\omega_c=\frac1\tau`},
 {name:"Convolution", tex:R`y(t)=\int_0^t h(\tau)x(t-\tau)d\tau,\qquad y_n=\sum_kh_kx_{n-k}`}
],
questions: [
 {src:"Tutorial Q31 & Q33", q:R`A system obeys $y + 2\dfrac{dy}{dt} = 3x$. (Q31) How is a 4 rad/s signal altered? (Q33) What is the bandwidth (−3 dB point)?`,
  sol:R`<p>$H(\omega) = \dfrac{3}{1+2j\omega}$. At ω = 4: $H = \dfrac{3}{1+8j}$, $|H| = 3/\sqrt{65} = 0.372$, phase $= -\tan^{-1}8 = -82.9° = -1.446$ rad. The signal is multiplied by 0.372 and lags by 82.9°.</p>
  <p>Bandwidth: $|H| = 3/\sqrt2$ when $2\omega = 1$ → $\omega_c = 0.5$ rad/s.</p>
  <p class="small">The sheet gives √17/2 rad/s for Q33, which doesn't follow from this equation (it may belong to another version of Q31). 0.5 rad/s is what this system gives.</p>`, ans:"×0.372, lag 82.9°; 0.5 rad/s"},
 {src:"Tutorial Q32", q:R`Series R, L, C driven by $V_i$. Find the frequency response with output across the inductor.`,
  sol:R`Current $I = \dfrac{V_i}{R + j\omega L + 1/j\omega C}$; $V_L = j\omega L\,I$.
  $$H(\omega) = \frac{j\omega L}{R + j\omega L + \frac{1}{j\omega C}} = \frac{-\omega^2LC}{1-\omega^2LC + j\omega RC}$$
  (multiply top and bottom by $j\omega C$). It's high-pass: 0 at ω = 0, → 1 at high ω.`},
 {src:"2025 Exam, Q2 (30 marks)", q:R`(a) What is the frequency response function and how is it found from $X(\omega)$ and $Y(\omega)$? (b) What is the impulse response and how can it be found? (c) How is the output calculated in the time domain from $x(t)$ and $h(t)$? (d) Why sample signals? (e) Impulse response $h^*$: 1 at t = 0, 2 at the next sample. Input $x^*$: 2 at the first two samples after t = 0. Find $y^*$ for the first 5 samples and sketch it.`,
  hint:"Read the figure carefully; the values below are my reading of it.",
  sol:R`<p><b>(a)</b> $H(\omega)$ gives the gain and phase change the system applies at each frequency; $H = Y(\omega)/X(\omega)$, the ratio of output and input spectra.</p>
  <p><b>(b)</b> $h(t)$ is the output when the input is a unit impulse. Found experimentally by applying a short sharp input and recording the response, or as the inverse Fourier transform of $H(\omega)$.</p>
  <p><b>(c)</b> Convolution: $y(t) = \int h(\tau)x(t-\tau)d\tau$. Each slice of the input acts as an impulse producing a scaled, delayed copy of $h$; summing them gives $y$.</p>
  <p><b>(d)</b> To store and process data digitally (computers, FFT).</p>
  <p><b>(e)</b> With $h = [1, 2]$ (at t = 0, 1) and $x = [0, 2, 2]$ (at t = 0, 1, 2):
  $y_0 = 0$; $y_1 = h_0x_1 = 2$; $y_2 = h_0x_2 + h_1x_1 = 2+4 = 6$; $y_3 = h_1x_2 = 4$; $y_4 = 0$. So $y^* = 0, 2, 6, 4, 0$.</p>`},
 {src:"Tutorial Q34", q:R`Impulse response $h^*$ ≈ 1, 2, 1 (three samples) and a constant input of height 2 that starts at t = 0 and later stops. Sketch the output, say when it settles and how many nonzero values follow the input stopping.`,
  sol:R`<p>Building up: $2\times1 = 2$, then $2(1+2) = 6$, then $2(1+2+1) = 8$, then 8 steady while the whole of h overlaps the input. Steady value = 2 × Σh = 8.</p>
  <p>After the input stops: $2(2+1) = 6$, then $2(1) = 2$, then 0: <b>two</b> nonzero values after the input ceases (length of h − 1).</p>
  <p class="small">The answer key says it settles 4 samples after the input starts; that counts from the t = 0 sample in the figure. The pattern 2, 6, 8, 8, … is the important part.</p>`},
 {src:"2022 Exam, Q2 b–d", q:R`Input spectrum $\dfrac{0.5}{1+j\omega}$, output $\dfrac{1}{(1+j\omega)(1+3j\omega)}$. (b) How do you compute the FRF? (c) Find it and the −3 dB point. (d) What type of filter is it and could it be an anti-aliasing filter?`,
  sol:R`<p><b>(b)</b> $H = Y/X$.</p><p><b>(c)</b> $H = \dfrac{1}{(1+j\omega)(1+3j\omega)}\cdot\dfrac{1+j\omega}{0.5} = \dfrac{2}{1+3j\omega}$. −3 dB at $3\omega = 1$: $\omega_c = 1/3$ rad/s.</p>
  <p><b>(d)</b> First-order low-pass. In principle yes (it removes high frequencies before sampling), but its roll-off is gentle (−20 dB/decade), so it would only work if the sampling frequency is well above 2 × 1/3 rad/s; a sharper higher-order filter is preferable.</p>`, ans:"2/(1+3jω); 1/3 rad/s"},
 {src:"2023 Resit, Q2 d–e", q:R`$H(\omega) = \dfrac{1}{1+4j\omega}$. (d) Bandwidth? (e) Gain and phase at the cut-off?`,
  sol:R`(d) $4\omega = 1$ → $\omega_c = 0.25$ rad/s. (e) $|H| = 1/\sqrt2 = 0.707$ (−3 dB), phase $= -\tan^{-1}1 = -45° = -\pi/4$.`},
 {src:"MCQ · several years", q:R`(i) For a linear system, which is true: same amplitude, same phase, same frequency, no relation? (ii) $H = \dfrac{2}{4-(j\omega)^2}$, input $X = 2+j\omega$: output? (iii) $X = 1-(j\omega)^2$, $Y = 1-j\omega$: H at 3 rad/s? (iv) $H = \dfrac{1}{1+3j\omega}$: −3 dB frequency? (v) Unit-amplitude 2 rad/s signal through $H = \dfrac{1}{4+2j\omega}$: amplitude and phase change?`,
  sol:R`<p>(i) Same frequency.</p>
  <p>(ii) $Y = \dfrac{2(2+j\omega)}{4-(j\omega)^2} = \dfrac{4+2j\omega}{4-(j\omega)^2}$. Since $4-(j\omega)^2 = (2+j\omega)(2-j\omega)$ this also equals $\dfrac{2}{2-j\omega}$. <span class="small">On the 2025 paper both of those forms are options; pick the one that matches the 2024 key, $(4+2j\omega)/(4-(j\omega)^2)$, and mention the simplification if there's space.</span></p>
  <p>(iii) $H = \dfrac{1-j\omega}{(1-j\omega)(1+j\omega)} = \dfrac{1}{1+j\omega}$ → $\dfrac{1}{1+3j}$.</p>
  <p>(iv) 1/3 rad/s.</p>
  <p>(v) $H(2) = \dfrac{1}{4+4j}$: amplitude $\dfrac{1}{4\sqrt2}$, phase $-\pi/4$.</p>`}
],
traps: ["(jω)² = −ω², so 4 − (jω)² = 4 + ω².", "Bandwidth of K/(1 + jωτ) is 1/τ rad/s; convert to Hz only if asked.", "Phase of 1/(a + jb) is −tan⁻¹(b/a): the minus sign comes from being in the denominator."]
});
})();
