/* MEC1015 Measurement & Signal Processing — topics 1–8 (sensors & measurement data) */
(function(){
const R = String.raw;
const T = STUDY.content.msp = STUDY.content.msp || { topics: [] };

T.topics.push({
id: "static", part: "Sensors and their characteristics", title: "Measurement Systems & Static Characteristics",
lectures: "Lectures 1.1, 1.2, 1.3, 2.2", status: "lectured",
summary: "What a sensor is, how sensors are classified, and the numbers that describe how a sensor behaves when the input changes slowly: sensitivity, offset, non-linearity, drift, hysteresis, accuracy and precision.",
theory: R`
<h3>1. The measurement system</h3>
<p>Every measurement has a <b>true value</b> (the input $x$) and a <b>measured value</b> (the output $y$). The measurement system sits between the process you're observing and the observer. The whole module is about how big the gap between $x$ and $y$ is, and why.</p>
<div class="flow"><span>Process under observation</span><i>→</i><span>Measurement system (sensor + conditioning)</span><i>→</i><span>Observer / display</span></div>

<h3>2. Classifying sensors</h3>
<table class="data">
<tr><th></th><th>Definition</th><th>Examples</th></tr>
<tr><td><b>Passive</b></td><td>Takes the energy it needs from the quantity being measured</td><td>Mercury-in-glass thermometer, spring balance, tape measure, bourdon pressure gauge</td></tr>
<tr><td><b>Active</b></td><td>The measurand modulates power from a <i>second</i> (external) supply, which produces the output</td><td>Strain gauge / Wheatstone bridge load cell (needs excitation voltage), digital voltmeter, Fitbit heart-rate monitor</td></tr>
<tr><td><b>Null type</b></td><td>Output is balanced against a known reference until a detector reads zero</td><td>Beam balance, balanced Wheatstone bridge. Accurate, used for calibration, slower to use</td></tr>
<tr><td><b>Deflection type</b></td><td>Output deflects in proportion to the input</td><td>Spring balance, pressure gauge. Easy, general-purpose, less accurate</td></tr>
</table>
<div class="callout"><b>Exam pattern:</b> "Which is <i>not</i> a passive sensor?" → the strain gauge (it needs an external supply). "Which is <i>not</i> an active sensor?" → the spring balance. "Null or deflection: which is more accurate?" → null.</div>
<p><b>Calibration</b> compares the sensor against a standard. Key words: <i>traceability</i> (documented chain back to national "gold" standards) and a <i>calibration interval</i> set by the quality-assurance system.</p>

<h3>3. Static characteristics</h3>
<p>"Static" means the input changes slowly enough that its <i>rate</i> of change doesn't affect the output. (When it does, you need the dynamic characteristics in the next topics.)</p>
<ol class="steps">
<li><b>Range and span.</b> Range is the min and max of input $[x_{min}, x_{max}]$ or output $[y_{min}, y_{max}]$. Span is the difference: $x_{max}-x_{min}$.</li>
<li><b>Sensitivity</b> $m$ is the slope: change in output per change in input, $m = \dfrac{y_2-y_1}{x_2-x_1}$. Its units are output/input (e.g. V/N for a force cell, mV/°C for a thermocouple).</li>
<li><b>Zero offset</b> $c$: the output at zero input. Linear sensor: $y = mx + c$.</li>
<li><b>Non-linearity.</b> Fit the best straight line; the biggest deviation from it is $n_{max}$. Quote it as a percentage of full-scale deflection: $\dfrac{n_{max}}{y_{max}-y_{min}}\times 100\%$. Large non-linearities are modelled with a polynomial instead (e.g. thermocouple $V = 38.74T + 3.319\times10^{-2}T^2 + \dots$).</li>
<li><b>Drift</b>: the output changes because of something other than the input (an <i>extraneous input</i> $e$, usually temperature).
  <ul>
  <li><b>Zero drift</b> shifts the whole line up/down: $y = mx + c + m_c e$, where $m_c$ is the zero drift sensitivity (e.g. mm/°C).</li>
  <li><b>Sensitivity drift</b> changes the slope: $y = (m + m_m e)x + c$, where $m_m$ is the sensitivity drift sensitivity (e.g. mm/kg/°C).</li>
  </ul></li>
<li><b>Hysteresis</b>: the output differs depending on whether the input is increasing or decreasing. Max hysteresis = biggest gap between the up and down readings, usually as % f.s.d. Dead space (e.g. gear backlash) is one form.</li>
<li><b>Resolution</b>: smallest change in input that shows up at the output.</li>
<li><b>Accuracy</b>: how far the measured value is from the true value (usually % f.s.d.).</li>
<li><b>Precision</b>: consistency of repeated readings of the same input, regardless of whether they're right. Split into <i>repeatability</i> (same conditions) and <i>reproducibility</i> (conditions change).</li>
</ol>
<div class="callout key"><b>Accuracy vs precision.</b> A sensor can be precise but inaccurate: readings cluster tightly but around the wrong value. That's the signature of a <i>systematic</i> error (e.g. drift). Imprecise readings scatter: that's <i>random</i> error.</div>
<div class="plot" data-plot="drift"></div>

<h3>Worked example: spring balance (Lecture 1.3)</h3>
<table class="data num"><tr><th>Load (kg)</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
<tr><th>Deflection @ 20°C (mm)</th><td>0</td><td>20</td><td>40</td><td>60</td></tr>
<tr><th>Deflection @ 30°C (mm)</th><td>5</td><td>27</td><td>49</td><td>71</td></tr></table>
<ol class="steps">
<li>Sensitivity @20°C $= 60/3 = 20$ mm/kg. Sensitivity @30°C $= (71-5)/3 = 22$ mm/kg.</li>
<li>Zero drift = reading at zero load at 30°C = <b>5 mm</b>.</li>
<li>Zero drift sensitivity $m_c = 5/(30-20) = $ <b>0.5 mm/°C</b>.</li>
<li>Sensitivity drift $= 22-20 = 2$ mm/kg.</li>
<li>Sensitivity drift sensitivity $m_m = 2/10 = $ <b>0.2 mm/kg/°C</b>.</li>
</ol>`,
formulas: [
 {name:"Sensitivity", tex:R`m = \frac{\Delta y}{\Delta x} = \frac{y_2-y_1}{x_2-x_1}`, note:"Units: output per input"},
 {name:"Linear sensor", tex:R`y = mx + c`},
 {name:"Non-linearity (% f.s.d.)", tex:R`\frac{n_{max}}{y_{max}-y_{min}}\times100\%`},
 {name:"Zero drift", tex:R`y = mx + c + m_c\,e`, note:"m_c = change in zero / change in e"},
 {name:"Sensitivity drift", tex:R`y = (m + m_m e)\,x + c`, note:"m_m = change in sensitivity / change in e"},
 {name:"Max hysteresis (% f.s.d.)", tex:R`\frac{\max|y_{\downarrow}-y_{\uparrow}|}{y_{max}-y_{min}}\times100\%`}
],
questions: [
 {src:"Tutorial Q1", q:R`A liquid level sensor has an input range of 0 to 15 cm. Use the calibration results to estimate the maximum hysteresis as a percentage of full scale deflection.
 <div class="tbl"><table class="data num"><tr><th>h (cm)</th><td>0</td><td>1.5</td><td>3.0</td><td>4.5</td><td>6.0</td><td>7.5</td><td>9.0</td><td>10.5</td><td>12.0</td><td>13.5</td><td>15.0</td></tr>
 <tr><th>V, h↑</th><td>0.0</td><td>0.35</td><td>1.42</td><td>2.4</td><td>3.43</td><td>4.35</td><td>5.61</td><td>6.5</td><td>7.77</td><td>8.85</td><td>10.2</td></tr>
 <tr><th>V, h↓</th><td>0.14</td><td>1.25</td><td>2.32</td><td>3.55</td><td>4.43</td><td>5.70</td><td>6.78</td><td>7.80</td><td>8.87</td><td>9.65</td><td>10.2</td></tr></table></div>`,
  hint:"Subtract the increasing reading from the decreasing reading at each level and find the biggest gap. Full scale is the output span.",
  sol:R`<p>Differences $V_\downarrow - V_\uparrow$: 0.14, 0.90, 0.90, 1.15, 1.00, <b>1.35</b>, 1.17, 1.30, 1.10, 0.80, 0.</p>
  <p>Maximum is 1.35 V at h = 7.5 cm. Full-scale output = 10.2 − 0 = 10.2 V.</p>
  <p>$$\text{hysteresis} = \frac{1.35}{10.2}\times100 = 13.2\%\ \text{f.s.d.}$$</p>`, ans:"13.2% f.s.d."},
 {src:"2025 Resit, Q1 (30 marks)", q:R`(a) Distinguish between static and dynamic characteristics of a sensor. (b) What is the ideal static response characteristic? Sketch it and give the output–input relationship. (c) Explain accuracy, precision and resolution. (d) At 20°C a pressure transducer is accurate and precise. At 30°C it is inaccurate but still precise. Explain how. (e) Scale A always reads +0.5 g out. Scale B is accurate on average but individual readings have random scatter σ = 0.1 g. Which is better and why?`,
  hint:"For (d), think about which type of error keeps readings consistent but shifts them. For (e), which error can be removed by calibration?",
  sol:R`<p><b>(a)</b> Static characteristics describe the output when the input is constant or changing slowly enough that the rate of change has no effect (sensitivity, offset, non-linearity, hysteresis, drift, resolution, accuracy, precision). Dynamic characteristics describe the response over time when the input changes quickly (order, time constant, natural frequency, damping).</p>
  <p><b>(b)</b> Ideal: a straight line through the origin, $y = mx$: linear, no offset, no hysteresis, no drift. Sketch: straight line from (0,0) with slope $m$ = sensitivity.</p>
  <p><b>(c)</b> Accuracy: closeness of the measured value to the true value (often % f.s.d.). Precision: consistency of repeated readings of the same input (repeatability and reproducibility); says nothing about correctness. Resolution: smallest input change that produces a detectable output change.</p>
  <p><b>(d)</b> Temperature is an extraneous input. At 30°C it causes zero drift and/or sensitivity drift, a <i>systematic</i> error, so every reading is shifted by the same predictable amount. The scatter (random error) is unchanged, so it stays precise but is no longer accurate.</p>
  <p><b>(e)</b> A has a known systematic error of +0.5 g: it is precise, and the offset can be removed by subtracting 0.5 g (calibration/correction factor), giving accurate single readings. B has random error; each reading is only good to about ±0.2 g at 95% confidence and needs several readings averaged. So A is better provided the offset is corrected; B only wins if you can't correct A and can afford to average many readings.</p>`},
 {src:"MCQ · 2025 & 2023 Resit", q:R`The maximum deviation from a linear response for a pressure sensor is 3 mV. The sensor operates from 10 to 130 mV. What is the non-linearity as % f.s.d.?<br>A) 4% &nbsp; B) 2.3% &nbsp; C) 3% &nbsp; D) 2.5%`,
  sol:R`$$\frac{3}{130-10}\times100 = 2.5\%$$ Use the output <b>span</b>, not the maximum value (3/130 = 2.3% is the trap).`, ans:"D) 2.5%"},
 {src:"MCQ · 2025 & 2023 Resit", q:R`Pressure sensor response:<div class="tbl"><table class="data num"><tr><th>Pressure (Pa)</th><td>0</td><td>10</td><td>30</td></tr><tr><th>V @ 10°C</th><td>2</td><td>6</td><td>14</td></tr><tr><th>V @ 20°C</th><td>3</td><td>8</td><td>18</td></tr></table></div>(i) What is the zero drift sensitivity to temperature? (ii) What is the sensitivity drift sensitivity?`,
  hint:"Zero drift: compare the readings at 0 Pa. Sensitivity: slope of each line.",
  sol:R`<p><b>(i)</b> Zero reading moves from 2 V to 3 V over 10°C: $m_c = 1/10 = 0.1$ V/°C.</p>
  <p><b>(ii)</b> Sensitivity at 10°C $= (14-2)/30 = 0.4$ V/Pa. At 20°C $= (18-3)/30 = 0.5$ V/Pa. Change 0.1 V/Pa over 10°C: $m_m = 0.01$ V/Pa/°C.</p>`, ans:"0.1 V/°C and 0.01 V/Pa/°C"},
 {src:"MCQ · 2025 Resit", q:R`A thermocouple is calibrated: 10°C gives 15 mV and 15°C gives 25 mV. Assuming a linear response, what is its sensitivity?`,
  sol:R`$m = (25-15)/(15-10) = 10/5 = 2$ mV/°C.`, ans:"2 mV/°C"},
 {src:"MCQ · several years", q:R`(i) Which is not a static characteristic: sensitivity, non-linearity, time constant, hysteresis? (ii) A force cell outputs a voltage proportional to force: units of sensitivity? (iii) Which is not a passive sensor: mercury thermometer, strain gauge, tape measure, spring balance? (iv) Which is not an active sensor: digital voltmeter, Wheatstone bridge load cell, spring balance, Fitbit?`,
  sol:R`(i) Time constant (dynamic). (ii) V/N (output per input). (iii) Strain gauge (needs external excitation). (iv) Spring balance (passive).`}
],
traps: ["Non-linearity and hysteresis are divided by the output span (y_max − y_min), not by y_max.", "Sensitivity units are output/input. N/V is the inverse and is a classic wrong option.", "Drift-sensitivity units carry an extra '/°C': zero drift sensitivity in V/°C, sensitivity drift sensitivity in V/Pa/°C."]
});

T.topics.push({
id: "regression", part: "Sensors and their characteristics", title: "Curve Fitting & Linear Regression",
lectures: "Lecture 2.1", status: "lectured",
summary: "Fitting a straight line to calibration data by least squares, measuring how good the fit is (standard error and correlation coefficient), and turning exponential relationships into straight lines.",
theory: R`
<h3>1. The idea</h3>
<p>You have measured pairs $(x_i, y_i)$ and want the line $y = ax + b$ that best describes them. "Best" means the line that makes the total squared vertical distance from the points to the line as small as possible:</p>
$$S = \sum_{i=1}^{n}\big(y_i - (ax_i+b)\big)^2$$
<p>This assumes the $x$ values are known accurately and all the error is in $y$ (we regress <i>y on x</i>).</p>

<h3>2. Deriving the formulas</h3>
<ol class="steps">
<li>Differentiate $S$ with respect to $a$ and to $b$ and set both to zero:
$$\frac{\partial S}{\partial a} = -2\sum (y_i - ax_i - b)x_i = 0 \qquad \frac{\partial S}{\partial b} = -2\sum (y_i - ax_i - b) = 0$$</li>
<li>That gives two simultaneous ("normal") equations:
$$a\sum x_i^2 + b\sum x_i = \sum x_iy_i \qquad a\sum x_i + nb = \sum y_i$$</li>
<li>Solve them:
$$a = \frac{n\sum x_iy_i - \sum x_i\sum y_i}{n\sum x_i^2 - \left(\sum x_i\right)^2} \qquad b = \frac{\sum y_i\sum x_i^2 - \sum x_iy_i\sum x_i}{n\sum x_i^2-\left(\sum x_i\right)^2}$$</li>
</ol>
<div class="callout"><b>Exam method:</b> build a table with columns $x$, $y$, $x^2$, $xy$, sum each column, then substitute. It's mechanical and quick if your table is tidy.</div>

<h3>3. How good is the fit?</h3>
<p><b>Standard error of the estimate</b> (spread of points about the line):</p>
$$\sigma_{yx} = \left[\frac{\sum (y_i-\hat y_i)^2}{n-2}\right]^{1/2}$$
<p>It's $n-2$ because two degrees of freedom were used up computing $a$ and $b$ from the same sample, and we're treating them as correct. (This exact question has been an MCQ several times.)</p>
<p><b>Correlation coefficient</b> (course form):</p>
$$r = \left[1-\frac{\sigma_{yx}^2}{\sigma_y^2}\right]^{1/2}, \qquad \sigma_y = \left[\frac{\sum(y_i-y_m)^2}{n-1}\right]^{1/2}$$
<p>Perfect fit: $\sigma_{yx}=0$ so $r = 1$. Lots of scatter: $\sigma_{yx}\to\sigma_y$ so $r\to0$. Always plot the data too.</p>

<h3>4. Worked example (Lecture 2.1)</h3>
<div class="tbl"><table class="data num"><tr><th>x</th><th>y</th><th>x²</th><th>xy</th><th>ŷ = 0.54x+0.879</th><th>(y−ŷ)²</th></tr>
<tr><td>1.0</td><td>1.2</td><td>1.00</td><td>1.20</td><td>1.419</td><td>0.048</td></tr>
<tr><td>1.6</td><td>2.0</td><td>2.56</td><td>3.20</td><td>1.743</td><td>0.066</td></tr>
<tr><td>3.4</td><td>2.4</td><td>11.56</td><td>8.16</td><td>2.715</td><td>0.099</td></tr>
<tr><td>4.0</td><td>3.5</td><td>16.00</td><td>14.00</td><td>3.309</td><td>0.036</td></tr>
<tr><td>5.2</td><td>3.5</td><td>27.04</td><td>18.20</td><td>3.687</td><td>0.035</td></tr>
<tr class="sum"><td>15.2</td><td>12.6</td><td>58.16</td><td>44.76</td><td></td><td>0.284*</td></tr></table></div>
$$a = \frac{5(44.76)-15.2(12.6)}{5(58.16)-15.2^2} = 0.54 \qquad b = \frac{12.6(58.16)-44.76(15.2)}{5(58.16)-15.2^2}=0.879$$
<p>The lecture then gets $\sigma_{yx} = 0.392$, $\sigma_y = 0.987$ and $r = [1-(0.392/0.987)^2]^{1/2} = 0.918$.</p>
<p class="small">*The lecture slide sums the last column to 0.4607, which is where its 0.392 comes from; the five values shown actually add to about 0.28, which would give $r\approx0.95$. Learn the method; don't worry about which number.</p>

<h3>5. Linearising other models</h3>
<p>Least squares fits straight lines, so transform curved models first:</p>
<table class="data"><tr><th>Model</th><th>Take</th><th>Straight line</th><th>Slope / intercept</th></tr>
<tr><td>$y = Ce^{-at}$</td><td>$\ln$</td><td>$\ln y = -a\,t + \ln C$</td><td>slope $=-a$, intercept $=\ln C$</td></tr>
<tr><td>$y = Cx^{k}$</td><td>$\ln$</td><td>$\ln y = k\ln x + \ln C$</td><td>slope $=k$, intercept $=\ln C$</td></tr></table>
<p>Then fit $z=\ln y$ against $t$ (or $\ln x$) with the same formulas and transform back: $C = e^{\text{intercept}}$.</p>`,
formulas: [
 {name:"Least-squares slope", tex:R`a = \frac{n\sum xy - \sum x\sum y}{n\sum x^2-(\sum x)^2}`},
 {name:"Least-squares intercept", tex:R`b = \frac{\sum y\sum x^2 - \sum xy\sum x}{n\sum x^2-(\sum x)^2}`, note:"Or simply b = ȳ − a x̄"},
 {name:"Standard error of estimate", tex:R`\sigma_{yx} = \left[\frac{\sum (y_i-\hat y_i)^2}{n-2}\right]^{1/2}`},
 {name:"Correlation coefficient", tex:R`r = \left[1-\frac{\sigma_{yx}^2}{\sigma_y^2}\right]^{1/2}`},
 {name:"Exponential model", tex:R`y=Ce^{-at}\ \Rightarrow\ \ln y = \ln C - a t`}
],
questions: [
 {src:"Tutorial Q2", q:R`The data below are believed to follow $y = Ce^{-at}$. Determine the values of $C$ and $a$ that give the best fit.<div class="tbl"><table class="data num"><tr><th>t</th><td>0.1</td><td>0.5</td><td>0.9</td><td>1.2</td><td>1.7</td><td>2.3</td><td>4.6</td></tr><tr><th>y</th><td>0.9</td><td>0.8</td><td>0.4</td><td>0.3</td><td>0.2</td><td>0.1</td><td>0.01</td></tr></table></div>`,
  hint:"Take natural logs: ln y = ln C + (−a)t. Regress z = ln y on t.",
  sol:R`<ol class="steps"><li>Linearise: $\ln y = \ln C + (-a)t$, i.e. $z = At + B$ with $z=\ln y$, $A=-a$, $B=\ln C$.</li>
  <li>Column sums ($n=7$): $\sum t = 11.3$, $\sum z = -10.966$, $\sum t^2 = 31.85$, $\sum tz = -31.607$.</li>
  <li>$$A = \frac{7(-31.607) - 11.3(-10.966)}{7(31.85)-11.3^2} = \frac{-221.25+123.92}{222.95-127.69} = -1.0218$$</li>
  <li>$$B = \frac{\sum z - A\sum t}{n} = \frac{-10.966 + 1.0218(11.3)}{7} = 0.0829$$</li>
  <li>$C = e^{B} = 1.0864$ and $a = -A = 1.0218$, so $y = 1.086\,e^{-1.022t}$, with $|r|\approx0.997$.</li></ol>
  <p class="small">The answer key prints "−1.02179": that's the slope $A=-a$. The decay constant itself is $a = +1.022$.</p>`, ans:"C ≈ 1.086, a ≈ 1.022"},
 {src:"Lecture 2.1 example", q:R`For the lecture data (x = 1.0, 1.6, 3.4, 4.0, 5.2; y = 1.2, 2.0, 2.4, 3.5, 3.5) find the regression line and then the correlation coefficient.`,
  sol:R`See the worked example in the theory section: $y = 0.54x + 0.879$; with the lecture's $\sigma_{yx}=0.392$, $\sigma_y = 0.987$: $r = 0.918$.`},
 {src:"MCQ · 2025, 2023 Resit", q:R`When regressing $y$ onto $x$ for $y=ax+b$, the standard error uses $n-2$ in the denominator. Why?<br>A) Because we are using the square root &nbsp; B) Because we are assuming that the values a and b are correct based on our samples &nbsp; C) Because each point has an x and a y coordinate &nbsp; D) Because end points on the line are not included`,
  sol:R`B. Two degrees of freedom are lost because $a$ and $b$ are both computed from the same sample.`, ans:"B"},
 {src:"MCQ · 2025 Resit", q:R`When trying to fit $y = ax+b$ to data, what technique does one use? Chauvenet's criterion / probability theory / chi-squared analysis / linear regression.`, sol:"Linear regression (least squares).", ans:"Linear regression"}
],
traps: ["Exponential fits: the slope of ln y vs t is −a, not a. Watch the sign.", "Standard error divides by n − 2; the standard deviation of y divides by n − 1.", "Carry 4+ significant figures through the sums; the denominator n∑x² − (∑x)² often subtracts two similar numbers."]
});

T.topics.push({
id: "dynamic", part: "Sensors and their characteristics", title: "Dynamic Characteristics (Zero, First & Second Order)",
lectures: "Lectures 3.1–3.4", status: "lectured",
summary: "How a sensor responds when the input changes with time. Zero, first and second order sensors, the time constant, step responses, and solving the first-order equation the way the course does.",
theory: R`
<h3>1. The general model</h3>
<p>When the input changes faster than the sensor can follow, the output depends on derivatives as well. The general linear model is</p>
$$a_0y + a_1\frac{dy}{dt} + a_2\frac{d^2y}{dt^2}+\dots = b_0x + b_1\frac{dx}{dt}+\dots$$
<p>A <b>step input</b> is the standard test: $x$ jumps from one constant to another, so all the $dx/dt$ terms vanish except at the instant of the jump and the right-hand side is just $b_0x$. The <b>order</b> of a sensor is the highest derivative of $y$ that appears.</p>

<h3>2. Zero order: the ideal</h3>
$$a_0y = b_0x \quad\Rightarrow\quad y = \frac{b_0}{a_0}x = mx$$
<p>The output follows the input instantly. This is the <b>ideal dynamic response</b>. It can't happen in practice because every real sensor stores energy (mass/inertia, thermal capacity, capacitance, spring stiffness), and stored energy can't change instantaneously.</p>

<h3>3. First order</h3>
$$a_0y + a_1\frac{dy}{dt} = b_0x \quad\Rightarrow\quad y + \tau\frac{dy}{dt} = mx,\qquad \tau = \frac{a_1}{a_0},\ m=\frac{b_0}{a_0}$$
<p>In operator form with $D = d/dt$: $y(1+\tau D) = mx$. $\tau$ is the <b>time constant</b>.</p>
<div class="callout key"><b>Reading τ off an equation:</b> divide through so the $y$ term has coefficient 1. Then τ is the coefficient of $dy/dt$. Example: $2y + 3\,dy/dt = 5x$ → $y + 1.5\,dy/dt = 2.5x$ → τ = 1.5 s.</div>
<p><b>Step response</b> from initial value $y_0$ to final value $y_\infty = mx$:</p>
$$y(t) = y_\infty + (y_0 - y_\infty)\,e^{-t/\tau}$$
<table class="data num"><tr><th>t</th><td>τ</td><td>2τ</td><td>3τ</td><td>5τ</td></tr><tr><th>% of change completed</th><td>63.2%</td><td>86.5%</td><td>95.0%</td><td>99.3%</td></tr></table>
<p>So the time constant is the time to reach 63% of the final change; that's how you read τ off a graph.</p>
<div class="plot" data-plot="steps"></div>

<h3>4. Why a thermocouple is first order (Lecture 3.3)</h3>
<ol class="steps">
<li>Energy balance: rate of heat stored = rate of heat transfer in: $mc_p\dfrac{dT_c}{dt} = k(T_s - T_c)$.</li>
<li>Rearrange: $\dfrac{mc_p}{k}\dfrac{dT_c}{dt} + T_c = T_s$, i.e. $T_c(1+\tau D) = T_s$ with $\tau = \dfrac{mc_p}{k}$.</li>
<li><b>Trial function</b> (the course method): try $T_c = Ae^{xt} + B$. The $e^{xt}$ part solves the equation with right side 0; the constant $B$ handles the constant right side.</li>
<li>Substitute: $Ae^{xt} + B + \tau xAe^{xt} = T_s$. Match like terms: $B = T_s$ and $1+\tau x = 0 \Rightarrow x = -1/\tau$.</li>
<li>Initial condition $T_c = T_0$ at $t=0$: $A = T_0 - T_s$, so $T_c = (T_0-T_s)e^{-t/\tau} + T_s$.</li>
</ol>
<p><b>Lecture numbers:</b> m = 0.05 kg, c<sub>p</sub> = 0.2, k<sub>water</sub> = 1×10⁻³, k<sub>air</sub> = 2×10⁻⁴ → τ<sub>water</sub> = 10 s, τ<sub>air</sub> = 50 s. Plunged from 20°C air into 100°C water: $T_c = 100 - 80e^{-t/10}$, so readings 70.6, 89.2, 99.5°C at 10, 20, 50 s (errors −29.4, −10.8, −0.5). Removed at 60 s into 20°C air: $T_c = 20 + 80e^{-(t-60)/50}$: 44.1°C at 120 s, 20.7°C at 300 s. Note how τ changes with the surroundings.</p>

<h3>5. Ramp inputs (Tutorial Q3)</h3>
<p>If the input rises steadily, $x = rt$, the trial function needs a ramp term too: $y = Ae^{-t/\tau} + B + Ct$. The result for a first-order sensor starting in equilibrium is that, once the transient dies away, the reading <b>lags</b> the true value by a constant $r\tau$ (rate × time constant).</p>

<h3>6. Second order</h3>
$$\frac{1}{\omega_n^2}\frac{d^2y}{dt^2} + \frac{2\zeta}{\omega_n}\frac{dy}{dt} + y = mx \quad\Longleftrightarrow\quad y\,(D^2 + 2\zeta\omega_nD + \omega_n^2) = m\,\omega_n^2x$$
<p>$\omega_n$ = undamped natural frequency, $\zeta$ = damping ratio. $\zeta<1$ underdamped (overshoots and rings), $\zeta = 1$ critically damped, $\zeta>1$ overdamped (sluggish). <b>Preferred: ζ ≈ 0.6–0.8</b> (the MCQ answer is 0.7): fast rise with only small overshoot.</p>`,
formulas: [
 {name:"Zero order (ideal)", tex:R`y = \frac{b_0}{a_0}x = mx`},
 {name:"First order", tex:R`y+\tau\frac{dy}{dt}=mx,\quad \tau=\frac{a_1}{a_0}`},
 {name:"First-order step response", tex:R`y(t) = y_\infty + (y_0-y_\infty)e^{-t/\tau}`},
 {name:"Thermocouple time constant", tex:R`\tau = \frac{mc_p}{k}`},
 {name:"Ramp lag (steady state)", tex:R`\text{error} = r\tau`, note:"r = rate of change of the input"},
 {name:"Second order", tex:R`\ddot y + 2\zeta\omega_n\dot y + \omega_n^2y = m\omega_n^2x`, note:"ζ ≈ 0.7 preferred"}
],
questions: [
 {src:"2025 Exam, Q1 (30 marks)", q:R`(a) What is the ideal dynamic response of a sensor to a step input? (b) Why does it not occur in practice? (c) Sketch zero, first and underdamped second order step responses. (d)–(e) A sensor obeys $2\dfrac{dy}{dt} + y = x$: what order is it and what is its time constant? (f) A step $x = 3$ is applied at $t=0$ (initial reading 0). Find the output at 0.5, 1, 2, 5 and 20 s. (g) Sketch and show how to read τ off the graph.`,
  hint:"Compare with y + τ dy/dt = mx. For (f) use y = y∞(1 − e^(−t/τ)).",
  sol:R`<p><b>(a)</b> Zero order: output is an exact scaled copy of the input, jumping instantly, $y = mx$.</p>
  <p><b>(b)</b> Real sensors store energy (inertia, thermal capacity, capacitance, compliance). Stored energy can't change instantaneously, so the output needs time to respond.</p>
  <p><b>(c)</b> See the plot in the theory section: zero order is a step; first order is an exponential approach with no overshoot; underdamped second order overshoots and oscillates before settling.</p>
  <p><b>(d)</b> First order (highest derivative is 1st). <b>(e)</b> Already in the form $y + \tau\,dy/dt = mx$, so τ = 2 s (and m = 1).</p>
  <p><b>(f)</b> $y = 3(1-e^{-t/2})$:</p>
  <table class="data num"><tr><th>t (s)</th><td>0.5</td><td>1</td><td>2</td><td>5</td><td>20</td></tr><tr><th>y</th><td>0.664</td><td>1.180</td><td>1.896</td><td>2.754</td><td>3.000</td></tr></table>
  <p><b>(g)</b> Plot the curve rising towards 3. Draw a horizontal line at 63.2% of the final value (0.632 × 3 = 1.90); where it meets the curve, read down: t = τ = 2 s. Alternatively the tangent at t = 0 hits the final value at t = τ.</p>`},
 {src:"Tutorial Q3", q:R`A submarine's depth sensor is zero order and its temperature sensor is first order with τ = 50 s. Sea surface temperature $T_0 = 20$°C and $T_x = T_0 - 0.01x$ at depth x m. It starts in steady state at the surface and dives at 0.5 m/s. (a) Tabulate depth, reported temperature and error every 100 s for 500 s. (b) What temperature does it report at 1000 m?`,
  hint:"The sensor sees a ramp: T_s = 20 − 0.01(0.5t) = 20 − 0.005t. Use the trial function T_c = Ae^(−t/τ) + B + Ct.",
  sol:R`<ol class="steps"><li>Governing equation: $T_c + \tau\dfrac{dT_c}{dt} = T_0 - 0.01vt$ with $v = 0.5$.</li>
  <li>Trial: $T_c = Ae^{-t/\tau} + B + Ct$. Substituting, the exponential terms cancel; matching $t$ terms gives $C = -0.01v$; constants give $B + \tau C = T_0 \Rightarrow B = T_0 + 0.01v\tau$.</li>
  <li>At $t=0$, $T_c = T_0$: $A = -0.01v\tau$.</li>
  <li>So $T_c = T_0 - 0.01v\tau\,e^{-t/\tau} + 0.01v\tau - 0.01vt = 20.25 - 0.25e^{-t/50} - 0.005t$.</li></ol>
  <table class="data num"><tr><th>t (s)</th><th>Depth (m)</th><th>True T (°C)</th><th>Reading (°C)</th><th>Error</th></tr>
  <tr><td>0</td><td>0</td><td>20.0</td><td>20.000</td><td>0</td></tr><tr><td>100</td><td>50</td><td>19.5</td><td>19.716</td><td>0.216</td></tr><tr><td>200</td><td>100</td><td>19.0</td><td>19.245</td><td>0.245</td></tr><tr><td>300</td><td>150</td><td>18.5</td><td>18.749</td><td>0.249</td></tr><tr><td>400</td><td>200</td><td>18.0</td><td>18.250</td><td>0.250</td></tr><tr><td>500</td><td>250</td><td>17.5</td><td>17.750</td><td>0.250</td></tr></table>
  <p><b>(b)</b> 1000 m is reached at t = 2000 s; the transient has gone, so the lag is $r\tau = 0.005\times50 = 0.25$°C. True temperature 10°C, reported <b>10.25°C</b>.</p>`, ans:"10.25°C"},
 {src:"MCQ · 2024", q:R`The first-order response of a sensor is $2y + 3\dfrac{dy}{dt} = 5x$. What is the time constant? 3 s / 1.5 s / 5 s / 2 s`,
  sol:R`Divide by 2: $y + 1.5\dfrac{dy}{dt} = 2.5x$, so τ = 1.5 s.`, ans:"1.5 s"},
 {src:"MCQ · several years", q:R`(i) Desired damping ratio for a second-order sensor: 1, 0.2, 2, 0.7? (ii) Which is not a dynamic characteristic: time constant, damping, natural frequency, hysteresis?`,
  sol:"(i) 0.7. (ii) Hysteresis (it's static)."},
 {src:"Lecture 3.3 example", q:R`A thermocouple (m = 0.05 kg, c<sub>p</sub> = 0.2 J/kg°C) at 20°C in air is plunged into boiling water (k = 1×10⁻³ W/°C) and removed after 60 s into 20°C air (k = 2×10⁻⁴ W/°C). Find the reading error at 10, 20, 50, 120 and 300 s.`,
  sol:R`τ<sub>water</sub> = 0.05×0.2/10⁻³ = 10 s; τ<sub>air</sub> = 50 s. In water: $T_c = 100-80e^{-t/10}$ → errors −29.4, −10.8, −0.5°C. In air (assume it reached 100°C; restart the clock at 60 s): $T_c = 20 + 80e^{-(t-60)/50}$ → 44.1°C at 120 s (+24.1), 20.7°C at 300 s (+0.7).`}
],
traps: ["Normalise the equation (coefficient of y = 1) before reading τ.", "When the surroundings change mid-problem, restart the clock and use the new τ.", "63.2% is of the change, measured from the starting value, not of the final value from zero (unless it starts at zero)."]
});

T.topics.push({
id: "systematic", part: "Analysis of measurement data", title: "Systematic Errors, Loading & Feedback",
lectures: "Lectures 4.1–4.3", status: "lectured",
summary: "Errors with a cause: the instrument disturbing what it measures (voltmeter loading, solved with Thevenin), extraneous inputs and the four ways to counteract them including high-gain feedback, plus wear, leads and thermal EMFs.",
theory: R`
<h3>1. Two broad types of error</h3>
<p><b>Systematic</b> errors push readings consistently one way. Either the cause is known (so it can often be removed) or the cause is unknown but the size is known (so it can be corrected for). <b>Random</b> errors come from many small unpredictable influences and scatter either side (next topics).</p>

<h3>2. The measurement disturbs the reading (loading)</h3>
<p>Examples: a thermometer's thermal inertia cools the liquid it's dipped into; a voltmeter with finite internal resistance $R_M$ draws current and lowers the voltage it's measuring.</p>
<p><b>Thevenin method for voltmeter loading:</b></p>
<ol class="steps">
<li>Remove the meter. Look into the two terminals (A, B) and reduce the circuit to one source $E_0$ in series with one resistance $R_{AB}$. To find $R_{AB}$, short every voltage source and combine resistors.</li>
<li>Reconnect the meter: one loop, $I = \dfrac{E_0}{R_{AB}+R_M}$, and the meter reads $E_M = IR_M$.</li>
<li>So $$\frac{E_M}{E_0} = \frac{R_M}{R_{AB}+R_M}, \qquad \text{error} = 1-\frac{E_M}{E_0} = \frac{R_{AB}}{R_{AB}+R_M}$$</li>
<li>To find the meter resistance for a target ratio $E_M/E_0$: $R_M = \dfrac{R_{AB}\,(E_M/E_0)}{1-E_M/E_0}$. For 1% error, $R_M = 99R_{AB}$.</li>
</ol>
<div class="callout"><b>Fix:</b> put an op-amp voltage follower (buffer) between circuit and meter. Its huge input impedance draws almost no current, so it barely loads the circuit; its low output impedance drives the meter.</div>

<h3>3. Extraneous inputs and how to counteract them</h3>
<p>An input you didn't intend to measure still changes the output, e.g. temperature changes a strain gauge's resistance. (That's the zero/sensitivity drift from topic 1: $y = mx + c + m_ce$.)</p>
<ol class="steps">
<li><b>Correction factor</b>: measure the interfering input and adjust the output.</li>
<li><b>Compensating element</b>: add an element whose response to the interfering input cancels the sensor's (e.g. a resistor whose resistance falls with temperature).</li>
<li><b>High gain + feedback</b>: see below.</li>
<li><b>Filtering</b>: remove narrow-band noise (e.g. mains pickup) with a filter.</li>
</ol>
<h4>High gain and feedback</h4>
<p>Sensor $G$ with a disturbance $n$ added. Put an amplifier $k_A$ in front and feed the output back through a stable element $H$:</p>
<div class="plot" data-plot="feedback"></div>
<ol class="steps">
<li>Error signal: $e = x - Hy$. Output: $y = k_AGe + Gn$.</li>
<li>Substitute: $y = k_AGx - k_AGHy + Gn \Rightarrow y(1+k_AGH) = k_AGx + Gn$.</li>
<li>$$y = \frac{k_AG\,x + G\,n}{1+k_AGH}$$</li>
<li>If $k_AGH \gg 1$ and $k_Ax\gg n$: $$y \approx \frac{x}{H}$$ The output depends only on the feedback element. Changes in $G$ (and the disturbance) are suppressed. Too much feedback can make the system unstable.</li>
</ol>

<h3>4. Other sources</h3>
<ul>
<li><b>Wear</b>: caught by routine calibration against traceable standards; adjust, repair or decommission.</li>
<li><b>Connecting leads</b>: long leads add resistance and pick up noise (mains). Use screened cable and route it well.</li>
<li><b>Thermal EMFs</b>: junctions of dissimilar metals at different temperatures create small voltages (the thermocouple effect). Use similar metals and keep junctions at the same temperature so the EMFs cancel.</li>
<li><b>Intelligent instruments</b> use a processor and a secondary sensor to correct the main reading automatically.</li>
</ul>`,
formulas: [
 {name:"Meter reading ratio", tex:R`\frac{E_M}{E_0} = \frac{R_M}{R_{AB}+R_M}`},
 {name:"Loading error", tex:R`\varepsilon = \frac{R_{AB}}{R_{AB}+R_M}`},
 {name:"Meter resistance needed", tex:R`R_M = \frac{R_{AB}\,(E_M/E_0)}{1-E_M/E_0}`},
 {name:"Feedback system", tex:R`y = \frac{k_AGx + Gn}{1+k_AGH}\ \xrightarrow{k_AGH\gg1}\ \frac{x}{H}`},
 {name:"Parallel resistors", tex:R`R_\parallel = \frac{R_1R_2}{R_1+R_2}`}
],
questions: [
 {src:"Tutorial Q4", q:R`The voltage across $R_5$ is measured by a voltmeter connected across it. $R_1=200$, $R_2 = 300$, $R_3 = 500$, $R_4 = 250$, $R_5 = 500\ \Omega$. In the circuit, $R_1$ and $R_2$ are in series with each other on the source side, with $R_3$ across them (between nodes C and D); $R_4$ then connects C to B; $R_5$ sits across A–B where the meter connects (see the tutorial sheet figure). (a) Meter resistance 4750 Ω: what is the measurement error? (b) What meter resistance gives 1% error?`,
  hint:"Short the sources. R_CD = R_3 ∥ (R_1 + R_2). Then R_AB = R_5 ∥ (R_4 + R_CD).",
  sol:R`<ol class="steps"><li>$R_{CD} = \dfrac{(R_1+R_2)R_3}{R_1+R_2+R_3} = \dfrac{500\times500}{1000} = 250\ \Omega$.</li>
  <li>$R_{AB} = \dfrac{(R_4+R_{CD})R_5}{R_4+R_{CD}+R_5} = \dfrac{500\times500}{1000} = 250\ \Omega$.</li>
  <li>$\dfrac{E_M}{E_0} = \dfrac{4750}{250+4750} = 0.95$, so the error is <b>5%</b> (reads low).</li>
  <li>For 1%: $R_M = \dfrac{250\times0.99}{1-0.99} = $ <b>24 750 Ω</b>.</li></ol>`, ans:"5%; 24 750 Ω"},
 {src:"Tutorial Q5", q:R`A voltmeter: motor $K_m = 2\times10^{-1}$ Nm/V drives a spring $K_s = 5\times10^{-2}$ rad/Nm (±10%). Available: a dc amplifier of gain 1000, a voltage subtraction unit, and a stable angle transducer of sensitivity 100 V/rad. Draw a modified system that reduces the effect of $K_s$ changes and find the effect of a 10% increase in $K_s$ on sensitivity.`,
  hint:"Amplifier → motor → spring in the forward path, transducer in the feedback path into the subtractor.",
  sol:R`<p>Block diagram: $V_i \to (+)\!\!\!\bigcirc\!\!(-) \to K_a \to K_m \to K_s \to \theta$, with $\theta \to K_t \to$ back into the (−) input of the subtractor.</p>
  <ol class="steps"><li>$e = V_i - K_t\theta$ and $\theta = K_aK_mK_s\,e$, so $$\frac{\theta}{V_i} = \frac{K_aK_mK_s}{1+K_aK_mK_sK_t}$$</li>
  <li>Nominal: $K_aK_mK_s = 1000\times0.2\times0.05 = 10$; sensitivity $= 10/(1+10\times100) = 9.99001\times10^{-3}$ rad/V.</li>
  <li>With $K_s$ up 10%: $K_aK_mK_s = 11$; sensitivity $= 11/1101 = 9.99092\times10^{-3}$ rad/V.</li>
  <li>Change ≈ $9.1\times10^{-7}$ rad/V, about 0.01%, compared with 10% in the original open-loop design. (Sensitivity ≈ $1/K_t = 0.01$ rad/V.)</li></ol>`, ans:"≈ 9.1×10⁻⁷ rad/V (0.01%)"},
 {src:"2023 Exam, Q1 (30 marks)", q:R`(a) Difference between random and systematic errors. (b) A voltmeter measures the output of a Wheatstone bridge: $R_1 = R_3 = 120\ \Omega$, $R_2 = R_4 = 122\ \Omega$, meter resistance 2000 Ω. What is the measurement error? (Hint: treat the R1/R2 junction and the R3/R4 junction as the same point when reducing.) (c) How would you classify this error? (d) What meter resistance gives 1% error? (e) Show an op-amp circuit that reduces the error and explain why. (f) How would you amplify the measurement?`,
  hint:"With the excitation source shorted, the output terminals see (R1 ∥ R2) in series with (R3 ∥ R4).",
  sol:R`<p><b>(a)</b> Systematic: consistent bias with a cause (known cause, or unknown cause but known size), can be corrected. Random: unpredictable scatter from many small influences, equally likely ±, reduced by averaging.</p>
  <p><b>(b)</b> $R_{th} = \dfrac{120\times122}{242} + \dfrac{120\times122}{242} = 60.50 + 60.50 = 121.0\ \Omega$. Error $= \dfrac{121.0}{121.0+2000} = 0.0570$, i.e. <b>5.7%</b> low.</p>
  <p><b>(c)</b> Systematic: the measuring system disturbs the reading (loading) by a predictable amount.</p>
  <p><b>(d)</b> $R_M = 99R_{th} = 99\times121.0 \approx$ <b>11 980 Ω</b>.</p>
  <p><b>(e)</b> A voltage follower (buffer): bridge output to the + input, output tied to the − input, meter on the output. Ideal op-amp input currents are ~0 (very high input impedance), so it draws no current from the bridge and doesn't load it; its low output impedance drives the meter without error.</p>
  <p><b>(f)</b> Use an op-amp amplifier, e.g. inverting with gain $-R_f/R_1$ followed by a unity-gain inverter, or (better for a bridge) a differential/instrumentation amplifier, which also rejects common-mode noise.</p>`},
 {src:"MCQ · 2025 Resit, 2023 Resit", q:R`A voltmeter with internal impedance 10 000 Ω reads 2% below the voltage before it was attached. What is the resistance of the circuit to the nearest ohm? 200 / 204 / 196 / 210`,
  sol:R`$0.98 = \dfrac{10000}{R+10000} \Rightarrow R = 10000/0.98 - 10000 = 204\ \Omega$.`, ans:"204 Ω"},
 {src:"MCQ · 2025 Resit", q:R`A feedback system for noise suppression: forward path amplifier gain 1000 then sensor gain 5; feedback element 2. To two decimal places, what is the sensitivity? 0.50 / 0.40 / 1.05 / 2.00`,
  sol:R`$\dfrac{1000\times5}{1+1000\times5\times2} = \dfrac{5000}{10001} = 0.49995 \approx 0.50$ (≈ 1/H).`, ans:"0.50"},
 {src:"MCQ · 2025", q:R`A pressure gauge always reads 5% over-pressure but the cause is unknown. What type of error is this?`, sol:"Systematic (unknown cause, known level, so it can be corrected).", ans:"Systematic"}
],
traps: ["Error is R_AB/(R_AB + R_M), not R_AB/R_M.", "When finding R_AB, short-circuit voltage sources; don't leave them open.", "Feedback sensitivity → 1/H only when k_A·G·H ≫ 1; compute it exactly if asked to 2 d.p."]
});

T.topics.push({
id: "random", part: "Analysis of measurement data", title: "Random Errors & the Normal Distribution",
lectures: "Lectures 5.1–5.3", status: "lectured",
summary: "Random scatter, the normal (Gaussian) distribution, z-scores, and using normal tables to find the probability of a reading falling in a range.",
theory: R`
<h3>1. Random errors</h3>
<p>Random errors come from many small unpredictable influences. A reading is equally likely to be too high or too low, so averaging many readings cancels them out. With infinitely many readings, the mean of the population equals the true value.</p>
<p>Lecture example: 19 weighings of a mass give mean 81.18 g and $\sigma_{n-1} = 0.318$ g. The histogram peaks at the mean and tails off symmetrically.</p>

<h3>2. The normal distribution</h3>
$$h(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-(x-x_m)^2/2\sigma^2}$$
<p>$h(x)$ is the likelihood of a value near $x$. The probability of a reading between two values is the area under the curve between them.</p>
<div class="plot" data-plot="normal"></div>

<h3>3. Standardising: the z-score</h3>
<p>Tables are built for mean 0 and σ = 1. Convert any value to "how many standard deviations from the mean":</p>
$$z = \frac{x_i - x_m}{\sigma}$$
<p>The table gives $P(Z \le z)$, the area to the left. Useful identities:</p>
<ul>
<li>$P(Z > z) = 1 - P(Z\le z)$</li>
<li>$P(Z < -z) = 1 - P(Z\le z)$ (symmetry)</li>
<li>$P(-z<Z<z) = 2P(Z\le z) - 1$</li>
<li>$P(a<Z<b) = P(Z\le b) - P(Z\le a)$</li>
</ul>
<table class="data num"><tr><th>±z</th><td>1</td><td>2</td><td>3</td></tr><tr><th>P(within)</th><td>68.3%</td><td>95.4%</td><td>99.7%</td></tr></table>
<h4>Normal table values you'll keep using</h4>
<table class="data num"><tr><th>z</th><td>1.0</td><td>1.5</td><td>1.645</td><td>1.96</td><td>2.0</td><td>2.24</td><td>2.5</td><td>2.576</td><td>2.7</td><td>3.0</td></tr>
<tr><th>P(Z≤z)</th><td>.8413</td><td>.9332</td><td>.9500</td><td>.9750</td><td>.9772</td><td>.9875</td><td>.9938</td><td>.9950</td><td>.9965</td><td>.9987</td></tr></table>

<h3>Worked example (Lecture 5.3)</h3>
<p>A supply gives 10.0 V with σ = 0.1 V. Probability a single reading is between 10.1 and 10.2 V?</p>
<ol class="steps"><li>$z_1 = (10.1-10.0)/0.1 = 1 \Rightarrow P = 0.8413$.</li><li>$z_2 = (10.2-10.0)/0.1 = 2 \Rightarrow P = 0.9772$.</li><li>$P = 0.9772-0.8413 = 0.1359$, i.e. <b>13.6%</b>.</li></ol>`,
formulas: [
 {name:"Normal distribution", tex:R`h(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-x_m)^2/2\sigma^2}`},
 {name:"z-score", tex:R`z=\frac{x_i-x_m}{\sigma}`},
 {name:"Two-sided probability", tex:R`P(-z<Z<z) = 2P(Z\le z)-1`},
 {name:"Sample standard deviation", tex:R`\sigma_{n-1} = \left[\frac{\sum(x_i-\bar x)^2}{n-1}\right]^{1/2}`},
 {name:"Coverage", tex:R`\pm1\sigma: 68.3\%\quad \pm2\sigma: 95.4\%\quad \pm3\sigma: 99.7\%`}
],
questions: [
 {src:"MCQ · 2025, 2024", q:R`A very large number of seat-belt strength tests have σ = 150 N. If 2000 belts are tested, how many would be expected to fail at a load 405 N or more below the mean? 14 / 7 / 6 / 12`,
  hint:"z = −405/150. You want the one-sided tail.",
  sol:R`$z = 405/150 = 2.7$. One tail: $P(Z<-2.7) = 1-0.9965 = 0.0035$. Expected number $= 0.0035\times2000 \approx 7$.`, ans:"7"},
 {src:"MCQ · 2025", q:R`What confidence interval is associated with a z value of 3? 99.7% / 68.3% / 95.4% / 90%`, sol:"±3σ covers 99.7%.", ans:"99.7%"},
 {src:"Lecture 5.3", q:R`A power supply gives 10.0 V with σ = 0.1 V (normal). Find the probability a single value lies between 10.1 and 10.2 V.`, sol:R`$0.9772-0.8413 = 0.1359$ (13.6%). See the worked example.`, ans:"13.6%"},
 {src:"Lecture 5.1", q:R`Find the mean and $\sigma_{n-1}$ of the 19 weighings (g): 81.6, 81.1, 81.4, 80.9, 81.1, 80.5, 81.3, 80.8, 81.2, 81.8, 81.1, 81.5, 81.0, 81.3, 81.1, 80.8, 81.3, 81.6, 81.1.`,
  sol:R`Sum = 1542.5, mean = 81.18 g. $\sigma_{n-1} = 0.318$ g. Use your calculator's SD mode and make sure it's the $n-1$ (sample) version, often labelled $s_x$ or $\sigma_{n-1}$.`}
],
traps: ["One-sided vs two-sided: 'more than X below the mean' is one tail; 'within ±X' is two-sided.", "Use σₙ₋₁ (sample) for measured data unless told the population σ.", "Look up the positive z then use symmetry; most tables only list z ≥ 0."]
});

T.topics.push({
id: "confidence", part: "Analysis of measurement data", title: "Confidence Intervals, Student t & Chauvenet",
lectures: "Lectures 6.1–6.3", status: "lectured",
summary: "Quoting a measured mean with an uncertainty: the standard error, how many readings you need, the t-distribution for small samples, and Chauvenet's criterion for throwing out outliers.",
theory: R`
<h3>1. Averaging improves the estimate</h3>
<p>Averaging $n$ readings gives a mean whose own scatter is much smaller than that of single readings (Central Limit Theorem). The spread of the mean is the <b>standard error</b>:</p>
$$\text{standard error} = \frac{\sigma_{n-1}}{\sqrt n}$$
<p>Use $\sigma_{n-1}$ (divide by $n-1$) because the sample mean stands in for the true mean, costing one degree of freedom.</p>

<h3>2. Quoting a result (large samples, n > ~30)</h3>
<ol class="steps"><li>Compute the sample mean $\bar x$ and $\sigma_{n-1}$.</li><li>Choose a confidence level and its z: 68% → 1, 95% → 2 (1.96), 99.7% → 3.</li><li>$\Delta = z\dfrac{\sigma_{n-1}}{\sqrt n}$ and quote $\bar x \pm \Delta$.</li></ol>
<p>Lecture example: mass 81.18 g, σ = 0.318 g, n = 19 → 68%: 81.18 ± 0.07 g; 95%: 81.03–81.33 g; 99.7%: 80.96–81.40 g.</p>
<div class="callout"><b>How many readings?</b> Rearrange: $n = \left(\dfrac{z\sigma}{\Delta}\right)^2$, then round <b>up</b>. Lecture: σ = 0.5 mm, Δ = 0.2 mm at 95% (z = 2) → $n = (2\times0.5/0.2)^2 = 25$. The course uses z = 2 for 95% in these; say which you use.</div>
<p>Because of the $\sqrt n$, 4× the readings halves the uncertainty; 100× the readings cuts it by 10.</p>

<h3>3. Small samples: Student's t</h3>
<p>With few readings (especially n &lt; 10) $\sigma_{n-1}$ is itself uncertain, so use the wider t-distribution with $v = n-1$ degrees of freedom:</p>
$$\Delta = \frac{t\,\sigma_{n-1}}{\sqrt n}$$
<table class="data num"><tr><th>v</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>15</td><td>17</td><td>20</td><td>25</td><td>29</td><td>∞</td></tr>
<tr><th>t (95%)</th><td>12.71</td><td>4.303</td><td>3.182</td><td>2.776</td><td>2.571</td><td>2.447</td><td>2.365</td><td>2.306</td><td>2.262</td><td>2.228</td><td>2.131</td><td>2.110</td><td>2.086</td><td>2.060</td><td>2.045</td><td>1.960</td></tr></table>
<p class="small">Also for v = 9: t<sub>90%</sub> = 1.833, t<sub>98%</sub> = 2.821, t<sub>99%</sub> = 3.250. Use the exam's log tables in the exam.</p>
<h4>Worked example (Lecture 6.2)</h4>
<p>Ten plate thicknesses: mean 3.617 mm, $\sigma_{n-1} = 0.0125$ mm. 90%, v = 9: t = 1.833, $\Delta = 1.833(0.0125)/\sqrt{10} = 0.00725$ mm → <b>3.617 ± 0.0073 mm</b>.</p>
<p><b>Going backwards:</b> what confidence goes with ±0.01 mm? $t = 0.01\sqrt{10}/0.0125 = 2.53$. Between 2.262 (95%) and 2.821 (98%); interpolate: $95 + \frac{2.53-2.262}{2.821-2.262}(3) = 96.4\%$.</p>
<p><b>How many readings with t?</b> t itself depends on n, so iterate. Steel bar (σ = 0.5, Δ = 0.2, 95%): need $t \le \Delta\sqrt n/\sigma = 0.4\sqrt n$.</p>
<table class="data num"><tr><th>n</th><th>v</th><th>t table</th><th>0.4√n</th></tr><tr><td>25</td><td>24</td><td>2.064</td><td>2.000 ✗</td></tr><tr><td>26</td><td>25</td><td>2.060</td><td>2.040 ✗</td></tr><tr><td>27</td><td>26</td><td>2.056</td><td>2.078 ✓</td></tr></table>
<p>So 27 readings, two more than the normal-distribution estimate.</p>

<h3>4. Chauvenet's criterion: rejecting outliers</h3>
<p>Discard a reading if the probability of getting a deviation that large is less than $1/(2n)$.</p>
<ol class="steps"><li>Compute $\bar x$ and $\sigma_{n-1}$ from all the data.</li><li>Find the critical ratio $d_{max}/\sigma$ for your $n$ (table, or: two tails totalling $1/2n$, so look up $P(Z\le z) = 1-\frac{1}{4n}$).</li><li>For each point compute $|x_i-\bar x|/\sigma_{n-1}$. Discard any above the critical value.</li><li>Recalculate mean and σ from what's left. <b>Apply only once</b>; don't repeat with the new data.</li></ol>
<table class="data num"><tr><th>n</th><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>10</td><td>15</td><td>20</td><td>25</td><td>50</td><td>100</td></tr><tr><th>d<sub>max</sub>/σ</th><td>1.38</td><td>1.54</td><td>1.65</td><td>1.73</td><td>1.80</td><td>1.96</td><td>2.13</td><td>2.24</td><td>2.33</td><td>2.57</td><td>2.81</td></tr></table>`,
formulas: [
 {name:"Standard error", tex:R`\sigma_{\bar x} = \frac{\sigma_{n-1}}{\sqrt n}`},
 {name:"Confidence interval (large n)", tex:R`\bar x \pm z\frac{\sigma_{n-1}}{\sqrt n}`},
 {name:"Confidence interval (small n)", tex:R`\bar x \pm t_{v}\frac{\sigma_{n-1}}{\sqrt n},\quad v = n-1`},
 {name:"Readings required", tex:R`n = \left(\frac{z\,\sigma}{\Delta}\right)^2`, note:"Round up. With t, iterate."},
 {name:"Chauvenet", tex:R`\text{reject if } P(\text{deviation}) < \frac{1}{2n}`}
],
questions: [
 {src:"Tutorial Q6", q:R`Ten readings (V): 1.53, 1.57, 1.54, 1.54, 1.50, 1.51, 1.55, 1.54, 1.56, 1.53. Find the mean and standard deviation, and the accuracy of the mean to 68% confidence (normal distribution). If 1000 readings were taken with the same σ, how much would the accuracy improve?`,
  sol:R`$\bar x = 1.537$ V, $\sigma_{n-1} = 0.021$ V. 68% → z = 1: $\Delta = 0.021/\sqrt{10} = 0.007$ → <b>1.537 ± 0.007 V</b>. (95%: ±0.013.) Going from 10 to 1000 readings multiplies n by 100, so $\sqrt n$ by 10: accuracy improves by a <b>factor of ten</b>.`, ans:"1.537, 0.021, ±0.007, ×10"},
 {src:"Tutorial Q7", q:R`Lengths (mm): 49.36, 50.12, 48.98, 49.24, 49.26, 50.56, 49.18, 49.89, 49.33, 49.39. Find the mean and σ, quote to 99.7% confidence, check for outliers (Chauvenet), and find the change in σ if outliers are removed.`,
  hint:"n = 10: critical ratio 1.96.",
  sol:R`<ol class="steps"><li>$\bar x = 49.531$, $\sigma_{n-1} = 0.495$. 99.7% (z = 3): $\Delta = 3(0.495)/\sqrt{10} = 0.47$ → 49.53 ± 0.47 mm.</li>
  <li>Chauvenet, n = 10: $1/2n = 0.05$ → critical z = 1.96.</li>
  <li>Ratios $|x_i-\bar x|/\sigma$: 0.35, 1.19, 1.11, 0.59, 0.55, <b>2.08</b>, 0.71, 0.72, 0.41, 0.28. Only point 6 (50.56) exceeds 1.96: discard.</li>
  <li>Remaining nine: $\bar x = 49.42$, $\sigma_{n-1} = 0.359$ = 73% of before, i.e. σ falls by <b>27%</b>.</li></ol>`, ans:"Discard 50.56; σ drops 27%"},
 {src:"Tutorial Q8", q:R`Ten observations of a voltage: mean 15 V, σ = 0.1 V. Quote the voltage to 95% and 99% confidence using t-tables.`,
  sol:R`v = 9. 95%: t = 2.262, $\Delta = 2.262(0.1)/\sqrt{10} = 0.0715$ → 15 ± 0.0715 V. 99%: t = 3.250, $\Delta = 0.1028$ → 15 ± 0.1028 V.`, ans:"15 ± 0.0715 V; 15 ± 0.1028 V"},
 {src:"Tutorial Q9", q:R`A mass is weighed with σ = 0.01 g. How many readings are needed for ±0.005 g at 95%? Repeat using t-tables.`,
  sol:R`<p>Normal (z = 2): $n = (2\times0.01/0.005)^2 = 16$.</p><p>t: need $t \le 0.005\sqrt n/0.01 = 0.5\sqrt n$. n = 17 (v = 16): t = 2.120 vs 2.062 ✗. n = 18 (v = 17): t = 2.110 vs 2.121 ✓. So <b>18</b>.</p>`, ans:"16; 18"},
 {src:"2023 Resit, Q1 (30 marks)", q:R`(a) Define the standard error and explain how it's used with large and small samples. (b) Adhesive strength after 5 tests is 25 ± 2 N/mm² to 95% confidence. What was σ? (c) Same result after 30 tests: σ? (d) Explain Chauvenet's criterion. (e) Strengths: 19.8, 35.1, 24.6, 20.7, 25.4, 28.2, 29.0, 22.4, 23.9, 25.1 (mean 25.42, σ<sub>n−1</sub> = 4.48). Any outliers?`,
  sol:R`<p><b>(a)</b> Standard error $=\sigma_{n-1}/\sqrt n$, the standard deviation of the mean. Large n: $\bar x\pm z\sigma/\sqrt n$ with normal z. Small n: $\bar x\pm t\sigma/\sqrt n$ with t from tables at $v = n-1$, because σ is poorly known.</p>
  <p><b>(b)</b> n = 5, v = 4, t = 2.776: $\sigma = \Delta\sqrt n/t = 2\sqrt5/2.776 = $ <b>1.61 N/mm²</b>.</p>
  <p><b>(c)</b> n = 30, large sample: $\sigma = 2\sqrt{30}/1.96 = $ <b>5.59 N/mm²</b> (5.48 with z = 2; 5.36 with t = 2.045). Same interval from more tests means the scatter was larger.</p>
  <p><b>(d)</b> See the method above.</p>
  <p><b>(e)</b> n = 10 → critical 1.96. 35.1: $(35.1-25.42)/4.48 = 2.16 > 1.96$ → <b>outlier</b>. Lowest, 19.8: 1.25, keep. Everything else is closer.</p>`},
 {src:"2022 Exam, Q1 c–d", q:R`Average flow rate 2.4 m/s with σ = 0.2 m/s. (c) How many measurements to quote it to ±0.1 m/s at 95%? (d) Based on (c), when would a reading be an outlier by Chauvenet?`,
  sol:R`<p><b>(c)</b> $n = (2\times0.2/0.1)^2 = 16$ (1.96 gives 15.4 → 16).</p><p><b>(d)</b> n = 16: $1/2n = 1/32$, two tails → $P(Z\le z) = 1-1/64 = 0.984$ → z ≈ 2.15. Outlier if $|v-2.4| > 2.15\times0.2 = 0.43$, i.e. below <b>1.97</b> or above <b>2.83 m/s</b>.</p>`},
 {src:"MCQ · 2025 Resit, 2023 Resit", q:R`Ten measurements give a precision of 0.25 V. What would it be for 40 measurements with the same σ?`, sol:R`n × 4 → √n × 2 → 0.25/2 = 0.125 V.`, ans:"0.125 V"},
 {src:"MCQ · 2024", q:R`For random error, what z-score decides whether there's an outlier in 20 measurements? 1.96 / 0.025 / 2.24 / 0.05`, sol:R`1/(2n) = 0.025 split over two tails = 0.0125 each → $P(Z\le z) = 0.9875$ → z = 2.24.`, ans:"2.24"}
],
traps: ["Divide by √n for the uncertainty of the mean; σ alone is the scatter of single readings.", "Chauvenet: apply once only; don't recompute and test again.", "'How many readings' always rounds up.", "t uses v = n − 1, not n."]
});

T.topics.push({
id: "chisq", part: "Analysis of measurement data", title: "Chi-Squared Test (Hypothesis Testing)",
lectures: "Lectures 7.1–7.4", status: "lectured",
summary: "Testing whether observed counts agree with what a hypothesis predicts: dice, coins, defect patterns and surveys.",
theory: R`
<h3>1. The question it answers</h3>
<p>Observed counts never match predictions exactly. Is the difference just random, or is the model (hypothesis) wrong?</p>
$$\chi^2 = \sum_{i=1}^{n}\frac{(\text{observed}_i - \text{expected}_i)^2}{\text{expected}_i}$$
<p>Small χ² means observed ≈ expected.</p>

<h3>2. Method</h3>
<ol class="steps">
<li><b>State the hypothesis</b> (e.g. "the dice are fair", "servicing has no effect").</li>
<li><b>Expected counts</b> in each cell from the hypothesis. Each cell should have at least ~5; merge small cells.</li>
<li>Compute χ².</li>
<li><b>Degrees of freedom</b> $v = n - c$: $n$ = number of cells, $c$ = number of constraints (usually 1: totals must match; one per independent set of totals).</li>
<li>Look up the probability P for χ² at v.</li>
<li><b>Interpret:</b>
  <ul><li>0.05 &lt; P &lt; 0.95: differences are consistent with random variation → accept the hypothesis.</li>
  <li>P &lt; 0.05: very unlikely to be chance → reject the hypothesis.</li>
  <li>P &gt; 0.95: agreement is suspiciously good ("too good"): question the data.</li></ul></li>
</ol>
<h4>Critical χ² values</h4>
<table class="data num"><tr><th>v</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>
<tr><th>P = 0.95</th><td>0.0039</td><td>0.103</td><td>0.352</td><td>0.711</td><td>1.145</td><td>1.635</td><td>2.167</td><td>2.733</td><td>3.325</td><td>3.940</td><td>4.575</td></tr>
<tr><th>P = 0.05</th><td>3.841</td><td>5.991</td><td>7.815</td><td>9.488</td><td>11.07</td><td>12.59</td><td>14.07</td><td>15.51</td><td>16.92</td><td>18.31</td><td>19.68</td></tr></table>
<p>Accept if χ² lies between the two values in your row.</p>

<h3>3. The lecture examples</h3>
<p><b>Dice</b> (two dice, 300 throws): expected for totals 2…12 are 300×(1,2,3,4,5,6,5,4,3,2,1)/36. 11 cells, 1 constraint, v = 10. χ² lies between 3.94 and 18.31 → dice are fair. <span class="small">(The slide quotes χ² = 8.03; working it through gives 8.93. Same conclusion.)</span></p>
<p><b>Cups</b>: defect types 1–3 have fewer than 5, so merge them → 6 cells, v = 5, χ² = 7.145 → P between 0.05 and 0.95 → same defect pattern. <span class="small">(Slide quotes P = 0.406; tables give ≈ 0.21. Same conclusion.)</span></p>
<p><b>Coin</b>: 5 heads, 15 tails in 20: expected 10/10, χ² = 25/10 + 25/10 = 5, v = 1, P ≈ 0.025 &lt; 0.05 → looks weighted. Adding a second 20 tosses (9 H, 11 T): 4 cells, 2 constraints, v = 2, χ² = 5.2, P ≈ 0.07 → no longer enough evidence. <span class="small">(Slide says P = 0.17; either way it's above 0.05.)</span></p>`,
formulas: [
 {name:"Chi-squared", tex:R`\chi^2=\sum\frac{(O_i-E_i)^2}{E_i}`},
 {name:"Degrees of freedom", tex:R`v = n - c`, note:"cells − constraints"},
 {name:"Decision", tex:R`0.05 < P < 0.95 \Rightarrow \text{accept}`}
],
questions: [
 {src:"Tutorial Q10", q:R`30% of cars are not serviced regularly. Of 100 cars in accidents, 50 had not been serviced regularly. Does regular servicing reduce the likelihood of an accident?`,
  hint:"Hypothesis: servicing makes no difference, so 30 of 100 accident cars should be unserviced.",
  sol:R`<table class="data num"><tr><th></th><th>Expected</th><th>Observed</th></tr><tr><td>Unserviced</td><td>30</td><td>50</td></tr><tr><td>Serviced</td><td>70</td><td>50</td></tr></table>
  $$\chi^2 = \frac{(50-30)^2}{30}+\frac{(50-70)^2}{70} = 13.33+5.71 = 19.05$$
  <p>v = 2 − 1 = 1. Even the 0.005 value is only 7.88, so P &lt; 0.5%. Reject "no effect": unserviced cars are over-represented, so <b>yes</b>, regular servicing reduces accident likelihood.</p>`, ans:"Yes (χ² = 19.05, P < 0.005)"},
 {src:"Lecture 7.2", q:R`Two dice are rolled 300 times. Totals 2–12 occurred 6, 9, 27, 36, 39, 57, 45, 39, 24, 12, 6 times. Are the dice loaded?`,
  sol:R`Expected: 8.33, 16.67, 25, 33.33, 41.67, 50, 41.67, 33.33, 25, 16.67, 8.33. χ² ≈ 8.9 (slide: 8.03). v = 10: limits 3.94 and 18.31. Inside → not loaded.`, ans:"Not loaded"},
 {src:"MCQ · 2025, 2024", q:R`A χ² test with 12 measurement cells and one constraint rejects the hypothesis. What is the possible range of χ²?<br>A) 4.5748 &lt; χ² &lt; 19.675 &nbsp; B) 3.9403 &lt; χ² &lt; 18.307 &nbsp; C) χ² &lt; 4.5748 or χ² &gt; 19.675 &nbsp; D) χ² &lt; 3.9403 or χ² &gt; 18.307`,
  sol:R`v = 12 − 1 = 11. Accept range 4.5748–19.675, so rejection is outside it: <b>C</b>. (B/D are for v = 10, the trap.)`, ans:"C"},
 {src:"MCQ · 2025 Resit", q:R`What probability range is deemed acceptable when validating a hypothesis with χ²?`, sol:"From 5% to 95%.", ans:"5% to 95%"}
],
traps: ["v = cells − constraints. 12 cells with 1 constraint is v = 11.", "Merge cells with expected counts under 5 before computing.", "P > 0.95 isn't 'great': it means the data look too good."]
});

T.topics.push({
id: "propagation", part: "Analysis of measurement data", title: "Error Propagation & Uncertainty Analysis",
lectures: "Lectures 8.1–8.3", status: "lectured",
summary: "How uncertainties in measured quantities combine into the uncertainty of a calculated result, which term dominates, and choosing the better measurement method.",
theory: R`
<h3>1. The simple (worst-case) rule</h3>
<p>For a product $P = xy$ with fractional errors $a$ and $b$: max $= xy(1+a+b+ab)$, min $= xy(1-a-b+ab)$. Ignoring the tiny $ab$ term, $P = xy(1\pm(a+b))$: <b>fractional errors add</b>. Same for a quotient. This overestimates, because the worst cases rarely line up.</p>

<h3>2. The realistic rule (root-sum-square)</h3>
<p>For a result $R = R(x_1, x_2, \dots, x_n)$ with uncertainties $w_1, w_2, \dots$:</p>
$$w_R = \left[\left(\frac{\partial R}{\partial x_1}w_1\right)^2 + \left(\frac{\partial R}{\partial x_2}w_2\right)^2+\dots+\left(\frac{\partial R}{\partial x_n}w_n\right)^2\right]^{1/2}$$
<div class="callout key"><b>Two rules the exam asks about:</b> (1) the $w_i$ are <b>absolute</b> values (convert % to units first); (2) all $w_i$ must be at the <b>same confidence level</b> (e.g. all 95%).</div>
<ol class="steps"><li>Write $R$ and compute its nominal value.</li><li>Differentiate with respect to each variable; evaluate at the nominal values.</li><li>Convert every uncertainty to absolute.</li><li>Multiply each partial by its $w$, square, add, square root.</li><li>Quote $R \pm w_R$, and as a percentage.</li></ol>

<h3>3. Shortcut for products and powers</h3>
<p>If $R = k\,x_1^{a}x_2^{b}x_3^{c}$, divide through by $R$:</p>
$$\frac{w_R}{R} = \left[\left(a\frac{w_1}{x_1}\right)^2+\left(b\frac{w_2}{x_2}\right)^2+\left(c\frac{w_3}{x_3}\right)^2\right]^{1/2}$$
<p>Fractional errors, each multiplied by its power. A squared variable counts double.</p>

<h3>4. Which term dominates?</h3>
<p>Because terms are squared, the biggest contribution dominates: contributions 1, 1, 1, 5 give $\sqrt{28} = 5.3$, barely more than 5. <b>To improve a result, reduce the largest contribution first.</b></p>

<h3>Worked example (Lecture 8.2)</h3>
<p>$R = R_0[1+\alpha(T-20)]$, $R_0 = 6\ \Omega \pm 0.3\%$, $\alpha = 0.004 \pm 1\%$, $T = 30 \pm 1$°C.</p>
<ol class="steps"><li>Nominal: $R = 6[1+0.004(10)] = 6.24\ \Omega$.</li>
<li>Partials: $\partial R/\partial R_0 = 1.04$; $\partial R/\partial\alpha = R_0(T-20) = 60$; $\partial R/\partial T = R_0\alpha = 0.024$.</li>
<li>Absolute: $w_{R_0} = 0.018$, $w_\alpha = 4\times10^{-5}$, $w_T = 1$.</li>
<li>$w_R = [(1.04\times0.018)^2+(60\times4\times10^{-5})^2+(0.024\times1)^2]^{1/2} = 0.0305\ \Omega$ (0.49%).</li></ol>

<h3>Choosing a method (Lecture 8.3)</h3>
<p>Power in a resistor, everything ±1%, E = 100 V, I = 10 A, R = 10 Ω. (i) $P = E^2/R$: $\frac{w_P}{P} = [4(0.01)^2+(0.01)^2]^{1/2} = 2.24\%$. (ii) $P = EI$: $[(0.01)^2+(0.01)^2]^{1/2} = 1.41\%$. Choose (ii).</p>`,
formulas: [
 {name:"Uncertainty propagation", tex:R`w_R=\left[\sum_i\left(\frac{\partial R}{\partial x_i}w_i\right)^2\right]^{1/2}`},
 {name:"Power-law shortcut", tex:R`\frac{w_R}{R}=\left[\sum_i\left(a_i\frac{w_i}{x_i}\right)^2\right]^{1/2}`, note:"for R = k·x₁^a₁·x₂^a₂…"},
 {name:"Worst case (product/quotient)", tex:R`\frac{\Delta R}{R}\approx a+b`}
],
questions: [
 {src:"Tutorial Q11", q:R`Volume collected in 10 min is $V = (h_2-h_1)\pi(d/2)^2$, with $h_1 = 2$ m, $h_2 = 3$ m, $d = 2$ m, each ±1%. Find the flow rate in m³/min and its uncertainty (time exact).`,
  sol:R`<ol class="steps"><li>$Q = \dfrac{\pi d^2(h_2-h_1)}{4T} = \dfrac{\pi(4)(1)}{40} = 0.314$ m³/min.</li>
  <li>Partials: $\partial Q/\partial h_2 = \pi d^2/4T = 0.314$; $\partial Q/\partial h_1 = -0.314$; $\partial Q/\partial d = \pi d(h_2-h_1)/2T = 0.314$.</li>
  <li>Absolute: $w_{h_2} = 0.03$, $w_{h_1} = 0.02$, $w_d = 0.02$ m.</li>
  <li>$w_Q = 0.314[0.03^2+0.02^2+0.02^2]^{1/2} = 0.314(0.0412) = 0.0129$ → <b>4.1%</b>.</li></ol>
  <p class="small">The solution slide prints 0.0113 and 3.6%, but its own expression evaluates to 0.0129 (4.1%), which matches the tutorial sheet.</p>`, ans:"0.314 m³/min ± 4.1%"},
 {src:"Tutorial Q12", q:R`Power $P = EI - E^2/R_m$ with $R_m = 1000\ \Omega \pm 5\%$, $I = 5$ A ± 1%, $E = 500$ V ± 1%. Find the uncertainty.`,
  sol:R`<ol class="steps"><li>$P = 500(5) - 500^2/1000 = 2250$ W.</li>
  <li>$\partial P/\partial E = I - 2E/R_m = 4$; $\partial P/\partial I = E = 500$; $\partial P/\partial R_m = E^2/R_m^2 = 0.25$.</li>
  <li>$w_E = 5$, $w_I = 0.05$, $w_{R_m} = 50$.</li>
  <li>$w_P = [(4\times5)^2 + (500\times0.05)^2 + (0.25\times50)^2]^{1/2} = [400+625+156.25]^{1/2} = 34.4$ W → <b>1.53%</b>.</li></ol>`, ans:"2250 ± 34.4 W (1.53%)"},
 {src:"Tutorial Q13", q:R`Venturi mass flow $\dot m = CA\left[\dfrac{2g_cp_1}{RT_1}(p_1-p_2)\right]^{1/2}$ with $C = 0.92\pm0.005$, $p_1 = 10^5$ Pa, $T_1 = 295\pm2$ K, $R = 287.058$, $\Delta p = 10^4$ Pa ± 1%, $A = 500$ mm² ± 0.1%, $g_c = 9.81$. Find the uncertainty in flow rate.`,
  hint:"It's a product of powers: C¹ A¹ Δp^½ T^−½. Use the shortcut.",
  sol:R`$$\frac{w}{\dot m} = \left[\left(\tfrac{0.005}{0.92}\right)^2 + (0.001)^2 + \left(\tfrac12\cdot0.01\right)^2 + \left(\tfrac12\cdot\tfrac{2}{295}\right)^2\right]^{1/2}$$
  $$=[0.00543^2 + 0.001^2+0.005^2+0.00339^2]^{1/2} = 0.0082 \Rightarrow \pm0.82\%$$
  <p>The square roots halve the Δp and T contributions. C dominates, with Δp close behind.</p>`, ans:"≈ ±0.82%"},
 {src:"Tutorial Q14", q:R`$Re = \rho uD/\mu$ with $\rho = 1.23\pm0.2$ kg/m³, $u = 35\pm1$ m/s, $D = 0.1\pm0.001$ m, $\mu = 10^{-3}$ Pa·s ± 1%. Which parameter contributes most?`,
  sol:R`Contributions $\frac{\partial Re}{\partial x}w$: ρ: $(uD/\mu)(0.2) = 700$; u: $(\rho D/\mu)(1) = 123$; D: $(\rho u/\mu)(0.001) = 43$; μ: $(\rho uD/\mu^2)(10^{-5}) = 43$. $Re = 4305 \pm 713$. <b>Density</b> dominates.`, ans:"Density"},
 {src:"2024 Exam, Q1 (30 marks)", q:R`(a) Explain confidence intervals for measurement error. (b) How is the error in a compound value found? (c) $V = \dfrac{x_1^2x_2}{2x_3}$ with $x_1 = 24\pm4$, $x_2 = 10\pm2\%$, $x_3 = 5\pm1$. Find V and its error. (d) What requirements are placed on the individual errors? (e) If the error were too large, what would you do first?`,
  sol:R`<p><b>(a)</b> Quote $\bar x\pm z\sigma_{n-1}/\sqrt n$ (or t for small n): the interval that contains the true value with the stated probability.</p><p><b>(b)</b> Root-sum-square of partial-derivative-weighted uncertainties (formula above).</p>
  <p><b>(c)</b> $V = 576\times10/10 = 576$. Partials: $\partial V/\partial x_1 = x_1x_2/x_3 = 48$; $\partial V/\partial x_2 = x_1^2/2x_3 = 57.6$; $\partial V/\partial x_3 = -x_1^2x_2/2x_3^2 = -115.2$. Absolute: $w_1 = 4$, $w_2 = 0.2$, $w_3 = 1$.
  $$w_V = [(48\cdot4)^2+(57.6\cdot0.2)^2+(115.2\cdot1)^2]^{1/2} = [36864+133+13271]^{1/2} = 224$$ → <b>V = 576 ± 224 (≈ 39%)</b>.</p>
  <p><b>(d)</b> Absolute uncertainties, all at the same confidence level.</p><p><b>(e)</b> Reduce the largest contribution first: $x_1$ (192, partly because it's squared), so measure $x_1$ more precisely.</p>`},
 {src:"2022 Resit, Q1 (30 marks)", q:R`(b) 50 measurements of D: mean 0.2 m, σ = 0.002 m. 6 measurements of U: mean 4 m/s, σ = 0.2 m/s. 8 measurements of μ: mean 0.001 Pa·s, σ = 0.0001. Quote each to 95% confidence using the correct distribution. (c) With ρ = 1000 exactly, quote $Re = \rho UD/\mu$ to 95% confidence. (d) First step to reduce the error?`,
  sol:R`<p><b>(b)</b> D (n = 50, normal): $1.96(0.002)/\sqrt{50} = 0.00055$ → 0.2 ± 0.00055 m. U (n = 6, t₅ = 2.571): $2.571(0.2)/\sqrt6 = 0.210$ → 4 ± 0.21 m/s. μ (n = 8, t₇ = 2.365): $2.365(10^{-4})/\sqrt8 = 8.4\times10^{-5}$ → 0.001 ± 0.000084 Pa·s.</p>
  <p><b>(c)</b> $Re = 1000(4)(0.2)/0.001 = 800\,000$. $\frac{w}{Re} = [(0.21/4)^2 + (0.00055/0.2)^2 + (0.084)^2]^{1/2} = [0.00276+0.0000076+0.00699]^{1/2} = 0.099$ → <b>Re = 800 000 ± 79 000 (9.9%)</b>.</p>
  <p><b>(d)</b> Viscosity has the largest contribution: take more μ measurements (or use a better method).</p>`},
 {src:"MCQ · 2025, 2023 Resit", q:R`For a compound expression of measured quantities with random error, which is true? A) All errors must be at 95% &nbsp; B) All errors must be based on the same confidence interval &nbsp; C) Overall error is the sum &nbsp; D) Positive errors cancel negative ones`, sol:"B.", ans:"B"}
],
traps: ["Convert % uncertainties to absolute before multiplying by the partial derivatives.", "A squared variable doubles its fractional contribution; a square root halves it.", "Don't add the contributions; square, add, then root."]
});
})();
