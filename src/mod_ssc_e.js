/* EEN1020 — block diagrams: basics and algebra (Section 2A), reduction, overlapping loops and multiple inputs (Section 2B), plus the posted block-diagram Examples sheets */
(function(){
const R = String.raw;
const T = STUDY.content.ssc = STUDY.content.ssc || { topics: [] };

T.topics.push({
id: "bdalgebra", part: "Block diagrams", title: "Block Diagram Basics: Cascade, Parallel & Feedback",
lectures: "Section 2A – Block Diagrams", status: "lectured",
summary: "What signals, blocks and summing junctions mean, and the three combination rules: blocks in cascade multiply, parallel paths add (with the summing-junction signs), and a negative-feedback loop gives G/(1+GH). Also how to move a summing junction past a block.",
theory: R`
<h3>0. Why block diagrams</h3>
<p>So far each transfer function described one component on its own (a motor, a circuit, a mass–spring–damper). Real systems are chains of components where <b>the output of one is the input of the next</b>. A block diagram draws that chain so you can combine the pieces into one transfer function for the whole system.</p>
<p>Lecture example, a garage door opener:</p>
<div class="flow"><span>Button</span><i>→</i><span>Controller</span><i>→</i><span>Power amplifier</span><i>→</i><span>DC motor</span><i>→</i><span>Gearbox</span><i>→</i><span>Door</span></div>
<p>The problem with this chain is that nothing checks where the door actually is. Adding a <b>position sensor</b> that feeds the measured position back to compare with the desired position turns it into a closed-loop system.</p>
<p>Why use them: they break a complex system into manageable parts, show the flow of signals, and make it easy to see how the parts interact (and where a fault might be).</p>

<h3>1. Signals, blocks and summing junctions</h3>
<ul>
<li><b>A line is a signal</b>: information or energy moving between parts (a voltage, a force, a number in a computer). It is <b>unidirectional</b> (the arrowhead gives the direction) and has a unique label such as $U(s)$. Block diagrams live in the <b>Laplace domain</b>.</li>
<li><b>A block is a component or subsystem.</b> In this module every block is SISO (single input, single output). The block's transfer function is <b>output ÷ input</b>:
$$U(s)\to\boxed{G(s)}\to Y(s)\quad\Rightarrow\quad G(s)=\frac{Y(s)}{U(s)}$$</li>
<li><b>Arrows matter.</b> If the arrow goes from $Y(s)$ into $H(s)$ and out as $B(s)$, then $H(s)=\dfrac{B(s)}{Y(s)}$, even if the block is drawn right-to-left.</li>
<li><b>A summing junction</b> (circle) adds or subtracts its inputs according to the sign written at each arrow. Its output is one signal.</li>
</ul>

<h3>2. Cascade (series): multiply</h3>
<p>For $E\to\boxed{C}\to U\to\boxed{G}\to Y$:
$$\frac{Y}{E}=\frac{U}{E}\cdot\frac{Y}{U}=C(s)\,G(s)$$
The intermediate signal cancels. Any number of blocks in series multiply: $A\to B\to C$ gives $ABC(s)$.</p>
<p>Lecture example: $\dfrac{1}{s+1}$, $\dfrac{2}{s+2}$, $\dfrac{3}{s+3}$ in series give $\dfrac{Y}{R}=\dfrac{6}{(s+1)(s+2)(s+3)}$.</p>

<h3>3. Parallel: add (with the signs)</h3>
<p>One signal $U$ splits into two paths that meet again at a summing junction:
$$Y=G_1U\pm G_2U\quad\Rightarrow\quad\frac{Y}{U}=G_1(s)\pm G_2(s)$$
The sign is the one at the summing junction.</p>
<p><b>Signal-tracing method</b> (used throughout): start at the input and write the signal on every line, moving left to right. Each block output is (block) × (its input). Lecture example: paths $G_1\to G_2$ (+), $G_3$ (+), $G_4$ (−):</p>
<div class="flow"><span>$G_1U$</span><i>→</i><span>$G_1G_2U$</span></div>
$$Y(s)=\big[G_1G_2(s)+G_3(s)-G_4(s)\big]U(s)$$

<h3>4. Feedback: G/(1+GH)</h3>
<p>Standard notation: $R(s)$ reference input (what you want the output to be); $C(s)$ controller (the "brains": turns the error into a command); $G(s)$ plant (the physical process); $H(s)$ sensor / feedback element (measures the output and feeds it back).</p>
<p>Trace the signals. The summing junction gives $R-HY$. It passes through $C$ then $G$:</p>
$$Y=CG\,(R-HY)\;\Rightarrow\;Y+CGHY=CGR\;\Rightarrow\;\frac{Y(s)}{R(s)}=\frac{CG}{1+CGH}$$
<div class="callout key">Negative feedback: $\dfrac{\text{forward path}}{1+\text{forward path}\times\text{feedback path}}$. The lecturer's words: <b>remember this</b>. With unity feedback ($H=1$) it is $\dfrac{CG}{1+CG}$.</div>
<p>(If the feedback sign at the junction is +, the same steps give $\dfrac{CG}{1-CGH}$.)</p>
<p><b>Open loop vs closed loop.</b> A control system is a set of interconnected systems designed to give a desired response. Open loop: no feedback, the output is produced directly from the input. Closed loop: the output is measured and compared with the desired value; often $H(s)=1$ (<b>unity feedback</b>).</p>
<p><b>Why feedback?</b> A real plant changes with age and its environment, so an open-loop design built on the original $G(s)$ gives the wrong output. A closed loop measures the output and corrects it. (And users will misuse your product; it should still work.)</p>
<p>Cruise-control example: set 100 km/h, the road turns uphill, the car drops to 90 km/h. The sensor measures 90 (if the loop is digital $H$ may be an A/D converter; if analogue it may scale the measurement), so $E=R-Y=100-90=10$ km/h. The ECU (controller) turns this error into a command to the throttle actuator (plant), and the loop keeps correcting. Washing machine example: the drum must hold its spin speed as wet clothes get heavier then lighter, so it measures the speed and adjusts the motor voltage.</p>

<h3>5. Moving a summing junction past a block</h3>
<p>Not every diagram fits cascade, parallel and feedback directly. You have two options (and can mix them): <b>move blocks</b> until the rules apply, or <b>analyse the signals</b> directly. You must know both; a question can force either.</p>
<table class="data"><tr><th>Move</th><th>Before</th><th>After</th><th>Check</th></tr>
<tr><td>Summer moved <b>after</b> block $G$</td><td>$(R-X)\to G\to C$</td><td>$R\to G\to$ summer, side input $X$ passes through an extra $G$</td><td>$C=RG-XG$ both ways</td></tr>
<tr><td>Summer moved <b>before</b> block $G$</td><td>$R\to G\to$ summer $-X\to C$</td><td>summer before $G$, side input $X$ passes through $\frac{1}{G}$</td><td>$C=RG-X$ both ways</td></tr></table>
<p>Rule: whatever block the summer jumps over, the side input must get the same treatment: multiply by $G$ when moving forward past it, divide by $G$ when moving back past it. Always check by writing $C(s)$ for both diagrams.</p>
`,
formulas: [
 {name:"Block transfer function", tex:R`G(s)=\frac{\text{output}}{\text{input}}=\frac{Y(s)}{U(s)}`, note:"Follow the arrow: for a feedback block, H = B/Y."},
 {name:"Cascade", tex:R`G_{eq}=G_1G_2\cdots G_n`},
 {name:"Parallel", tex:R`G_{eq}=G_1\pm G_2`, note:"Signs from the summing junction."},
 {name:"Negative feedback", tex:R`\frac{Y}{R}=\frac{G}{1+GH}`, note:"G = whole forward path (e.g. CG). Unity feedback: G/(1+G)."},
 {name:"Positive feedback", tex:R`\frac{Y}{R}=\frac{G}{1-GH}`},
 {name:"Moving a summer", tex:R`\text{forward past }G:\ \times G\qquad\text{back past }G:\ \times\tfrac{1}{G}`, note:"Applied to the side input."}
],
questions: [
 {src:"Section 2A example (cascade)", see:[2], q:R`Three blocks $\dfrac{1}{s+1}$, $\dfrac{2}{s+2}$, $\dfrac{3}{s+3}$ are in series from $R(s)$ to $Y(s)$. Find $Y/R$.`,
  hint:"Series blocks multiply.",
  sol:R`$$\frac{Y}{R}=\frac{1}{s+1}\cdot\frac{2}{s+2}\cdot\frac{3}{s+3}=\frac{6}{(s+1)(s+2)(s+3)}=\frac{6}{s^3+6s^2+11s+6}$$`,
  ans:"6/((s+1)(s+2)(s+3))", prov:"From the worked example in Section 2A."},
 {src:"Section 2A example (parallel)", see:[3], q:R`$U(s)$ splits into three paths that meet at one summing junction: $G_1$ then $G_2$ in series (+), $G_3$ (+), and $G_4$ (−). Find $Y/U$ by tracing the signals.`,
  hint:"Write the signal on each line: G1U, then G1G2U, G3U, G4U. Then apply the junction signs.",
  sol:R`<p>Each path's output is its blocks times $U$: $G_1G_2U$, $G_3U$, $G_4U$. The junction adds the first two and subtracts the third:</p>$$Y=\big[G_1G_2+G_3-G_4\big]U\Rightarrow\frac{Y}{U}=G_1G_2(s)+G_3(s)-G_4(s)$$`,
  ans:"G1G2 + G3 − G4", prov:"From the worked example in Section 2A."},
 {src:"Section 2A (feedback derivation)", see:[4], q:R`Derive the closed-loop transfer function $Y/R$ of the standard loop: $R$ into a summing junction (+), feedback $HY$ subtracted, then controller $C(s)$, then plant $G(s)$ to $Y$.`,
  hint:"The junction output is R − HY. Then Y = CG × that. Collect Y terms.",
  sol:R`$$Y=CG(R-HY)=CGR-CGHY$$ $$Y(1+CGH)=CGR\Rightarrow\frac{Y}{R}=\frac{CG}{1+CGH}$$`,
  ans:"CG/(1+CGH)", prov:"From the worked example in Section 2A."},
 {src:"Section 2A (moving blocks)", see:[5], q:R`(a) A summer forms $R-X$, which then passes through $G$ to give $C$. Draw an equivalent with the summer after $G$. (b) $R$ passes through $G$ and then a summer subtracts $X$ to give $C$. Draw an equivalent with the summer before $G$. Prove each is equivalent.`,
  hint:"The side input must pass through whatever the summer jumped over: ×G going forward, ×1/G going back.",
  sol:R`<p>(a) Original: $C=G(R-X)=RG-XG$. Equivalent: $R\to G\to$ summer, with $X$ passed through its own $G$ block into the − input: $C=RG-XG$. Same.</p><p>(b) Original: $C=RG-X$. Equivalent: summer before $G$ with $X$ passed through $\frac{1}{G}$ into the − input: $C=G\left(R-\frac{X}{G}\right)=RG-X$. Same.</p>`,
  ans:"(a) extra G on X; (b) extra 1/G on X", prov:"From the worked example in Section 2A."},
 {src:"Section 2A (cruise control)", see:[4], q:R`Cruise control is set to 100 km/h. On a hill the car slows to 90 km/h. Identify $R$, $Y$, $E$, the controller, the plant and $H$, and give the error.`,
  hint:"E = R − Y with unity measurement.",
  sol:R`<p>$R=100$ km/h (set speed), $Y=90$ km/h (actual speed), $H$ = speed sensor (A/D converter if digital, scaling if analogue), controller = ECU, plant = throttle actuator and car.</p>$$E=R-Y=100-90=10\ \text{km/h}$$<p>The ECU turns this error into a throttle command; the loop repeats until the error is removed.</p>`,
  ans:"E = 10 km/h", prov:"From the worked example in Section 2A."}
],
traps: [
 "A block's transfer function is output over input along the arrow; a feedback block drawn right-to-left still has H = (its output)/(its input).",
 "The '1 +' in G/(1+GH) is for negative feedback only; a + sign at the junction gives 1 − GH.",
 "In G/(1+GH), G is the whole forward path (e.g. C·G), not just the plant.",
 "When moving a summer past a block, the side input must get the same block (forward) or its inverse (backward). Check by writing C(s) both ways."
]
});

T.topics.push({
id: "bdreduce", part: "Block diagrams", title: "Block Diagram Reduction, Overlapping Loops & Multiple Inputs",
lectures: "Section 2B – Block Diagram Reduction; posted block-diagram Examples sheets", status: "lectured",
summary: "Reducing multi-loop block diagrams to one transfer function, by block algebra or by analysing the signals: combining parallel feedback loops, inner-then-outer loops, moving a summer to untangle overlapping loops, superposition for several inputs, and reading an ODE or a stability condition off the result.",
theory: R`
<h3>0. Two methods</h3>
<p><b>Method 1, block algebra:</b> repeatedly apply cascade (multiply), parallel (add) and feedback ($\frac{G}{1+GH}$), moving summers where needed, until one block is left.</p>
<p><b>Method 2, signal analysis</b> (the lecturer's preference):</p>
<ol class="steps">
<li>Label the output of every summing junction (e.g. $X_1$, $X_2$, $E$).</li>
<li>Write one equation per summer and per block: each block output is block × input; each summer output is the signed sum of its inputs.</li>
<li>Substitute so everything is in terms of the inputs and $Y$.</li>
<li>Collect all $Y$ terms on the left, factor, and divide.</li>
</ol>
<p>A question can force either method, so practise both.</p>

<h3>1. Several feedback loops into consecutive summers</h3>
<p>Lecture example: $R\to G_1\to$ three summers in a row $\to G_2\to G_3\to C$, with $C$ fed back through $H_3$, $H_2$, $H_1$ into the first, second and third summers (all −).</p>
<p>Block algebra: $G_2G_3$ are in series. With no block between the three summers, they act as one summer, so the three feedback paths are in parallel: $H_1+H_2+H_3$. Then the feedback rule, then cascade with $G_1$:</p>
$$\frac{C}{R}=\frac{G_1G_2G_3}{1+G_2G_3\,(H_1+H_2+H_3)}$$
<p>Signal analysis gives the same: the signal into $G_2$ is $RG_1-H_3C-H_2C-H_1C$, so $C=G_1G_2G_3R-G_2G_3(H_1+H_2+H_3)C$.</p>

<h3>2. Inner loop inside an outer loop</h3>
<p>$R\to$ summer ($-H_1Y$) $\to G_1\to X\to$ summer ($-H_2Y$) $\to G_2\to G_3\to Y$. Reduce from the inside out:</p>
<ol class="steps">
<li>Cascade: $G_{eq}=G_2G_3$.</li>
<li>Inner loop (feedback): $\dfrac{Y}{X}=\dfrac{G_2G_3}{1+G_2G_3H_2}$.</li>
<li>Forward path of the outer loop: $\dfrac{G_1G_2G_3}{1+G_2G_3H_2}$.</li>
<li>Outer feedback through $H_1$, then clear the fraction:</li>
</ol>
$$\frac{Y}{R}=\frac{G_1G_2G_3}{1+G_2G_3H_2+G_1G_2G_3H_1}$$
<div class="callout key">Pattern worth learning: denominator = 1 + (sum of each loop's gain), numerator = forward path, when the loops are nested (each loop contains the smaller one).</div>

<h3>3. Overlapping loops and feedforward: move a summer</h3>
<p>Lecture example: $U\to$ summer 1 ($-H_2Y$) $\to G_1\to$ summer 2 $\to G_2\to Y$. Summer 2 also gets $+U$ directly (a feedforward path) and $-H_1Y$.</p>
<ol class="steps">
<li>Inner loop $G_2$ with $H_1$: $\dfrac{G_2}{1+G_2H_1}$.</li>
<li>The outer loop can't use the feedback rule yet: the feedforward $U$ enters <b>inside</b> it. Move summer 2 back past $G_1$; the $U$ branch then needs $\frac{1}{G_1}$.</li>
<li>Now $U$ enters through $1+\frac{1}{G_1}$ (parallel paths), and the loop $G_1\cdot\frac{G_2}{1+G_2H_1}$ with $H_2$ gives $\dfrac{G_1G_2}{1+G_2H_1+G_1G_2H_2}$.</li>
<li>Cascade:</li>
</ol>
$$\frac{Y}{U}=\left(1+\frac{1}{G_1}\right)\frac{G_1G_2}{1+G_2H_1+G_1G_2H_2}=\frac{G_2+G_1G_2}{1+G_2H_1+G_1G_2H_2}$$
<p>Signal analysis is quicker here: $X=G_1(U-H_2Y)$, so the input to $\frac{G_2}{1+G_2H_1}$ is $X+U=(1+G_1)U-G_1H_2Y$. Then $(1+G_2H_1)Y=G_2(1+G_1)U-G_1G_2H_2Y$, giving the same answer.</p>

<h3>4. Several inputs: superposition</h3>
<p>Treat it like a circuit with several sources: <b>set all inputs but one to zero</b>, find the output for that one, repeat for each input, and add.</p>
<p>Lecture example (unity feedback): $R\to$ summer $\to G_1\to$ summer ($+U$) $\to G_2\to C$, $C$ fed back to the first summer.</p>
<ul>
<li>$U=0$: ordinary loop, $C_R=\dfrac{G_1G_2}{1+G_1G_2}R$.</li>
<li>$R=0$: the feedback becomes $-1\to G_1$ into the second summer. Its output is $U-G_1C_U$, so $C_U=G_2U-G_1G_2C_U$, $C_U=\dfrac{G_2}{1+G_1G_2}U$.</li>
</ul>
$$C(s)=\frac{G_1G_2}{1+G_1G_2}R(s)+\frac{G_2}{1+G_1G_2}U(s)$$
<p>Every input sees the <b>same denominator</b> (the same closed-loop poles); only the numerators differ. That is a good check. You can also skip superposition and do signal analysis with both inputs present.</p>

<h3>5. From the closed-loop transfer function to an ODE or a stability condition</h3>
<p><b>ODE:</b> cross-multiply and inverse-Laplace with zero initial conditions ($s\to\frac{d}{dt}$). E.g. $\dfrac{Y}{X}=\dfrac{4}{s^2+2s+4}$ gives $\ddot y+2\dot y+4y=4x$.</p>
<p><b>Stability:</b> the closed-loop poles are the roots of the closed-loop denominator, so feedback can stabilise an unstable plant. With $G_1=\frac{1}{s+3}$, $G_2=\frac{1}{s-2}$ (pole at +2, unstable) and feedback gain $K$, the closed loop is $\dfrac{1}{s^2+s+K-6}$; its poles are in the left half-plane only for $K>6$.</p>
`,
formulas: [
 {name:"Feedback loops into consecutive summers", tex:R`\frac{C}{R}=\frac{G_1G_2G_3}{1+G_2G_3(H_1+H_2+H_3)}`},
 {name:"Nested inner and outer loops", tex:R`\frac{Y}{R}=\frac{G_1G_2G_3}{1+G_2G_3H_2+G_1G_2G_3H_1}`},
 {name:"Superposition (two inputs, unity feedback)", tex:R`C=\frac{G_1G_2}{1+G_1G_2}R+\frac{G_2}{1+G_1G_2}U`, note:"Same denominator for every input."},
 {name:"TF to ODE", tex:R`Y(s)\,D(s)=N(s)\,X(s)\;\Rightarrow\;s^k\to\frac{d^k}{dt^k}`, note:"Zero initial conditions."}
],
questions: [
 {src:"Section 2B Example 1", fig:"ssc_bd1", see:[1], q:R`Find $C(s)/R(s)$ for the diagram (three feedback paths $H_1$, $H_2$, $H_3$ into three consecutive summers). Do it by block algebra, then check by analysing the signals.`,
  hint:"G2G3 is a cascade. No block sits between the three summers, so H1, H2, H3 are in parallel.",
  sol:R`<p><b>Block algebra.</b> $G_2G_3$ in series; feedback paths in parallel: $H_1+H_2+H_3$. Feedback rule: $\dfrac{G_2G_3}{1+G_2G_3(H_1+H_2+H_3)}$. Cascade with $G_1$.</p><p><b>Signals.</b> After $G_1$: $RG_1$. After the summers: $RG_1-H_3C-H_2C-H_1C$. So</p>$$C=G_1G_2G_3R-G_2G_3(H_1+H_2+H_3)C$$$$\frac{C}{R}=\frac{G_1G_2G_3}{1+G_2G_3(H_1+H_2+H_3)}$$`,
  ans:"G1G2G3 / (1 + G2G3(H1+H2+H3))", prov:"From the worked example in Section 2B."},
 {src:"Section 2B Example 2", fig:"ssc_bd2", see:[2], q:R`Find the closed-loop transfer function $Y/R$.`,
  hint:"Combine G2G3, close the inner H2 loop, then treat G1 × (inner result) as the forward path of the H1 loop.",
  sol:R`<p>$G_{eq}=G_2G_3$. Inner loop: $\dfrac{Y}{X}=\dfrac{G_2G_3}{1+G_2G_3H_2}$. Forward path: $\dfrac{G_1G_2G_3}{1+G_2G_3H_2}$. Outer loop:</p>$$\frac{Y}{R}=\frac{\dfrac{G_1G_2G_3}{1+G_2G_3H_2}}{1+\dfrac{G_1G_2G_3H_1}{1+G_2G_3H_2}}=\frac{G_1G_2G_3}{1+G_2G_3H_2+G_1G_2G_3H_1}$$`,
  ans:"G1G2G3 / (1 + G2G3H2 + G1G2G3H1)", prov:"From the worked example in Section 2B."},
 {src:"Section 2B Example 3", fig:"ssc_bd3", see:[3,0], q:R`Find $Y/U$ (a) by block-diagram algebra and (b) by analysing the signals.`,
  hint:"Close the G2/H1 loop first. The feedforward from U enters inside the H2 loop, so move the second summer back past G1 (the U branch picks up 1/G1).",
  sol:R`<p>(a) Inner loop: $\dfrac{G_2}{1+G_2H_1}$. Move the second summer before $G_1$: the $U$ branch becomes $\frac{U}{G_1}$, so the first summer sees $U\left(1+\frac{1}{G_1}\right)-H_2Y$. The loop then gives $\dfrac{G_1G_2}{1+G_2H_1+G_1G_2H_2}$, and</p>$$\frac{Y}{U}=\left(1+\frac{1}{G_1}\right)\frac{G_1G_2}{1+G_2H_1+G_1G_2H_2}=\frac{G_2+G_1G_2}{1+G_2H_1+G_1G_2H_2}$$<p>(b) $X=G_1(U-H_2Y)$. Input to the inner-loop block: $X+U=(1+G_1)U-G_1H_2Y$. So $Y=\dfrac{G_2}{1+G_2H_1}\big[(1+G_1)U-G_1H_2Y\big]$, i.e. $(1+G_2H_1)Y+G_1G_2H_2Y=(G_2+G_1G_2)U$. Same result.</p>`,
  ans:"(G1G2 + G2) / (1 + G2H1 + G1G2H2)", prov:"From the worked example in Section 2B."},
 {src:"Section 2B Example 4", fig:"ssc_bd4", see:[4], q:R`Determine an expression for the output $C(s)$. Assume unity feedback ($G_3=1$).`,
  hint:"Superposition: set U = 0 and find C_R; set R = 0 and find C_U; add.",
  sol:R`<p>$U=0$: $C_R=\dfrac{G_1G_2}{1+G_1G_2}R$.</p><p>$R=0$: the second summer outputs $U-G_1C_U$, so $C_U=G_2U-G_1G_2C_U\Rightarrow C_U=\dfrac{G_2}{1+G_1G_2}U$.</p>$$C(s)=\frac{G_1G_2}{1+G_1G_2}R(s)+\frac{G_2}{1+G_1G_2}U(s)$$`,
  ans:"C = G1G2/(1+G1G2)·R + G2/(1+G1G2)·U", prov:"From the worked example in Section 2B."},
 {src:"Block Diagram Examples sheet 1 Ex 1", fig:"ssc_bdA1", see:[4,0], q:R`$R(s)$ enters a summer (feedback $8Y$ subtracted), giving $X_1$, then $\dfrac{1}{s-1}$ gives $X_2$. A second summer adds $X(s)$, then $\dfrac{1}{s+4}$ gives $Y(s)$. Find $Y(s)$ in terms of $R(s)$ and $X(s)$, (a) by signal analysis and (b) by superposition.`,
  hint:"X1 = R − 8Y, X2 = X1/(s−1), Y = (X + X2)/(s+4). The denominator (s+4)(s−1)+8 is common to both inputs.",
  sol:R`<p>(a) $Y=\dfrac{1}{s+4}\left[X+\dfrac{R-8Y}{s-1}\right]$, so $Y\left[1+\dfrac{8}{(s+4)(s-1)}\right]=\dfrac{X}{s+4}+\dfrac{R}{(s+4)(s-1)}$.</p>$$Y(s)=\frac{s-1}{(s+4)(s-1)+8}X(s)+\frac{1}{(s+4)(s-1)+8}R(s)$$<p>with $(s+4)(s-1)+8=s^2+3s+4$.</p><p>(b) $X=0$: plain loop, $Y_R=\dfrac{\frac{1}{(s-1)(s+4)}}{1+\frac{8}{(s-1)(s+4)}}R=\dfrac{R}{(s-1)(s+4)+8}$. $R=0$: redraw as $X\to$ summer $\to\frac{1}{s+4}\to Y$ with feedback $8\cdot\frac{1}{s-1}$: $Y_X=\dfrac{\frac{1}{s+4}}{1+\frac{8}{(s+4)(s-1)}}X=\dfrac{s-1}{(s+4)(s-1)+8}X$. Add.</p><p>Note: the $\frac{1}{s-1}$ block is unstable on its own, but the closed-loop poles (roots of $s^2+3s+4$, $s=-1.5\pm j1.32$) are stable.</p>`,
  ans:"Y = [R + (s−1)X] / (s² + 3s + 4)", prov:"Follows the posted solution."},
 {src:"Block Diagram Examples sheet 1 Ex 2", fig:"ssc_bdA2", see:[4,0], q:R`$X(s)$ enters a summer (unity feedback of $Y$ subtracted) giving $X_1$, then $\dfrac{1}{s+1}$ and $\dfrac{1}{s+2}$ give $X_2$. A second summer adds $R(s)$, then $\dfrac{1}{s+3}$ gives $Y(s)$. Find $Y(s)$.`,
  hint:"X1 = X − Y, X2 = X1/((s+1)(s+2)), Y = (R + X2)/(s+3).",
  sol:R`$$Y=\frac{1}{s+3}\left[R+\frac{X-Y}{(s+1)(s+2)}\right]$$$$Y\left[1+\frac{1}{(s+1)(s+2)(s+3)}\right]=\frac{R}{s+3}+\frac{X}{(s+1)(s+2)(s+3)}$$$$Y(s)=\frac{(s+1)(s+2)}{(s+1)(s+2)(s+3)+1}R(s)+\frac{1}{(s+1)(s+2)(s+3)+1}X(s)$$<p>The denominator expands to $s^3+6s^2+11s+7$.</p>`,
  ans:"Y = [(s+1)(s+2)R + X] / ((s+1)(s+2)(s+3) + 1)", prov:"Follows the posted solution."},
 {src:"Block Diagram Examples sheet 2 Ex 1", fig:"ssc_bdB1", see:[2,3], q:R`Form the transfer function $Y(s)/X(s)$. The forward path is gain 5 (output $X_1$), then an inner unity-feedback loop around $\dfrac{1}{3s+1}$ (output $Y_1$). A branch $\dfrac{2s}{s+2}$ from $X_1$ is added to $Y_1$ to give $Y$, which is fed back (unity, negative) to the input summer.`,
  hint:"Inner loop: (1/(3s+1))/(1 + 1/(3s+1)) = 1/(3s+2). That is now in parallel with 2s/(s+2).",
  sol:R`<p>Inner loop: $\dfrac{Y_1}{X_1}=\dfrac{\frac{1}{3s+1}}{1+\frac{1}{3s+1}}=\dfrac{1}{3s+2}$.</p><p>Parallel with the branch: $\dfrac{2s}{s+2}+\dfrac{1}{3s+2}=\dfrac{2s(3s+2)+(s+2)}{(s+2)(3s+2)}=\dfrac{6s^2+5s+2}{(s+2)(3s+2)}$.</p><p>Forward path $\dfrac{5(6s^2+5s+2)}{(s+2)(3s+2)}$ with unity feedback:</p>$$\frac{Y}{X}=\frac{5(6s^2+5s+2)}{(s+2)(3s+2)+5(6s^2+5s+2)}=\frac{30s^2+25s+10}{33s^2+33s+14}$$`,
  ans:"(30s² + 25s + 10)/(33s² + 33s + 14)", prov:"Follows the posted solution."},
 {src:"Block Diagram Examples sheet 2 Ex 2", fig:"ssc_bdB2", see:[2,5], q:R`Determine the differential equation that governs the system: $X(s)$ through a gain 4 into a summer; the summer feeds $\frac{1}{s}$, whose output is fed back through gain 2 (negative) to the same summer and also drives a second $\frac{1}{s}$ giving $Y(s)$; $Y$ is fed back through gain 4 (negative) to the same summer.`,
  hint:"Close the inner loop (1/s with feedback 2) first, cascade with the second 1/s, then close the outer loop with 4. Cross-multiply.",
  sol:R`<p>Inner loop: $G_{EQ1}=\dfrac{\frac1s}{1+\frac2s}=\dfrac{1}{s+2}$.</p><p>Outer loop: $G_{EQ2}=\dfrac{\frac{1}{s+2}\cdot\frac1s}{1+\frac{4}{s(s+2)}}=\dfrac{1}{s(s+2)+4}$.</p><p>With the input gain: $\dfrac{Y}{X}=\dfrac{4}{s^2+2s+4}$. Cross-multiply: $Y(s^2+2s+4)=4X$, so</p>$$\frac{d^2y}{dt^2}+2\frac{dy}{dt}+4y=4x$$`,
  ans:"y'' + 2y' + 4y = 4x", prov:"Follows the posted solution."},
 {src:"Block Diagram Examples sheet 2 Ex 3", see:[5], q:R`A unity-input loop has forward path $G_1G_2$ with $G_1(s)=\dfrac{1}{s+3}$, $G_2(s)=\dfrac{1}{s-2}$, and feedback gain $K$ (negative feedback). Determine the minimum value of $K$ for an asymptotically stable system.`,
  hint:"Closed-loop denominator (s+3)(s−2)+K = s² + s + K − 6. Find when both roots have negative real part.",
  sol:R`<p>$G_2$ alone has a pole at $+2$: unstable open loop.</p>$$G(s)=\frac{G_1G_2}{1+KG_1G_2}=\frac{1}{(s+3)(s-2)+K}=\frac{1}{s^2+s+K-6}$$<p>Poles: $p=\dfrac{-1\pm\sqrt{1-4(K-6)}}{2}=\dfrac{-1\pm\sqrt{25-4K}}{2}$. The $-$ root is always negative. The $+$ root is negative only if $\sqrt{25-4K}\lt 1$, i.e. $25-4K\lt 1$, $K\gt 6$ (for $K\gt 25/4$ the roots are complex with real part $-\frac12$, also stable). At $K=6$ there is a pole at $s=0$.</p>`,
  ans:"K > 6", prov:"Follows the posted solution."},
 {src:"Block Diagram Examples sheet 2 Ex 4", fig:"ssc_bdB3", see:[4], q:R`Determine the relationship between $V_o(s)$, $I_a(s)$ and $V_{ref}(s)$. $V_{ref}$ enters a summer (feedback $\frac{1}{20}V_o$ subtracted), then gain $K$ gives $E_a$. A second summer gives $V_o=E_a-\alpha I_a$.`,
  hint:"Ea = K(Vref − Vo/20) and Vo = Ea − αIa. Substitute Vo into the first, solve for Ea, then back-substitute.",
  sol:R`<p>$E_a=K\left(V_{ref}-\frac{1}{20}(E_a-\alpha I_a)\right)$, so $E_a\left(1+\frac{K}{20}\right)=KV_{ref}+\frac{K\alpha}{20}I_a$ and</p>$$E_a=\frac{20K}{20+K}V_{ref}+\frac{K\alpha}{20+K}I_a$$<p>Then $V_o=E_a-\alpha I_a$, and $\frac{K\alpha}{20+K}-\alpha=-\frac{20\alpha}{20+K}$:</p>$$V_o(s)=\frac{20K}{20+K}V_{ref}(s)-\frac{20\alpha}{20+K}I_a(s)$$<p>Larger $K$ pushes the $V_{ref}$ gain towards 20 and shrinks the effect of the load current $I_a$: feedback rejecting a disturbance.</p>`,
  ans:"Vo = 20K/(20+K)·Vref − 20α/(20+K)·Ia", prov:"Follows the posted solution."},
 {src:"Block Diagram Tutorial Q1", fig:["ssc_bdT1","ssc_bdT1b"], see:[2,0], q:R`<b>First diagram:</b> $R(s)$ enters a summer (unity feedback of $Y$ subtracted) giving $X_1$, then a gain $K$ gives $X_2$. $X_2$ feeds an inner loop: a summer forms $X_3=X_2-X_4$ and $\dfrac{1}{s+2}$ gives $X_4$. A branch $\dfrac{1}{s+3}$ from $X_2$ is added to $X_4$ to give $Y(s)$. <b>Second diagram:</b> the same, except the branch is a block $G_{EQ}(s)$ taken from $X_1$ (before the gain $K$). (a) What is $G_{EQ}(s)$ so that both diagrams give the same $Y/R$? (b) Find $Y(s)/R(s)$.`,
  hint:"Close the inner loop first: (1/(s+2))/(1 + 1/(s+2)) = 1/(s+3). For (a), the branch must deliver the same signal to the output summer: G_EQ·X1 = X2/(s+3) with X2 = K·X1.",
  sol:R`<p><b>(a)</b> In the first diagram the branch delivers $\dfrac{1}{s+3}X_2$ to the output summer. In the second it delivers $G_{EQ}X_1$. With $X_2=KX_1$:</p>$$G_{EQ}X_1=\frac{1}{s+3}KX_1\quad\Rightarrow\quad G_{EQ}(s)=\frac{K}{s+3}$$<p>(Moving a pick-off point back past a block multiplies the branch by that block.)</p><p><b>(b)</b> Signals: $X_1=R-Y$, $X_3=X_2-X_4$, $X_4=\dfrac{1}{s+2}X_3$. Then $X_4\left(1+\dfrac{1}{s+2}\right)=\dfrac{X_2}{s+2}$, so $X_4=\dfrac{1}{s+3}X_2$: the inner loop reduces to $\dfrac{1}{s+3}$.</p><p>It now sits in parallel with the $\dfrac{1}{s+3}$ branch: $\dfrac{1}{s+3}+\dfrac{1}{s+3}=\dfrac{2}{s+3}$. Cascade with $K$ gives forward path $\dfrac{2K}{s+3}$, inside unity negative feedback:</p>$$\frac{Y}{R}=\frac{\dfrac{2K}{s+3}}{1+\dfrac{2K}{s+3}}=\frac{2K}{s+3+2K}$$`,
  ans:"G_EQ = K/(s+3); Y/R = 2K/(s + 3 + 2K)", prov:"Follows the posted solution."},
 {src:"Block Diagram Tutorial Q2", fig:"ssc_bdT2", see:[2,5], q:R`Form the transfer function $Y(s)/R(s)$. $R(s)$ enters a summer (unity feedback of $Y$ subtracted), then $\dfrac{1}{s^2}$. Next is an inner loop: a summer feeds $\dfrac{50}{s+1}$, whose output is fed back through $\dfrac{2}{s}$ (negative). That output then splits into a branch $s$ (+) and a branch $2$ (−), which meet at a summer to give $Y(s)$.`,
  hint:"Reduce the two inner blocks separately: the 50/(s+1) loop with feedback 2/s, and the parallel pair s − 2. Then cascade with 1/s² and close the unity loop.",
  sol:R`<p><b>Inner block 1</b> (feedback): $\dfrac{\frac{50}{s+1}}{1+\frac{50}{s+1}\cdot\frac{2}{s}}=\dfrac{50s}{s(s+1)+100}=\dfrac{50s}{s^2+s+100}$.</p><p><b>Inner block 2</b> (parallel, signs from the summer): $s-2$.</p><p><b>Forward path:</b> $\dfrac{1}{s^2}\cdot\dfrac{50s}{s^2+s+100}\cdot(s-2)=\dfrac{50(s-2)}{s(s^2+s+100)}$.</p><p><b>Unity feedback:</b></p>$$\frac{Y}{R}=\frac{\dfrac{50(s-2)}{s(s^2+s+100)}}{1+\dfrac{50(s-2)}{s(s^2+s+100)}}=\frac{50(s-2)}{s(s^2+s+100)+50s-100}=\frac{50(s-2)}{s^3+s^2+150s-100}$$<p>Note (not on the sheet): the denominator has a negative constant term, so at least one closed-loop pole is in the right half-plane (numerically $s\approx0.66$). The closed loop is unstable.</p>`,
  ans:"Y/R = 50(s − 2)/(s³ + s² + 150s − 100)", prov:"Follows the posted solution; the stability note was worked by Claude."}
],
traps: [
 "You can't apply the feedback rule to a loop that has another input or a feedforward path entering inside it; move the summer first or use signal analysis.",
 "Feedback paths can be added in parallel only when no block sits between the summers they enter.",
 "With several inputs, every output term must have the same denominator; if they differ, there is an algebra slip.",
 "When setting an input to zero for superposition, keep the sign of the feedback: with R = 0 the loop becomes −1 × (feedback) into the remaining summer.",
 "Clear the fraction-within-a-fraction carefully: multiply top and bottom by the inner denominator, which then appears in the final denominator."
]
});
})();
