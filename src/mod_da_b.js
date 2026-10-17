/* MEC1029 Data Analytics for Engineers — part B: inference */
(function(){
const R = String.raw;
const T = STUDY.content.da = STUDY.content.da || { topics: [] };
const LOOP = "Worked in your MEC1029 answer bank (re-computed in R from the course datasets); Loop's marking from the 2025 sitting is noted where it was visible.";

T.topics.push({
id: "inference", part: "Inference", title: "The CLT & Confidence Intervals for the Mean",
lectures: "Lectures 8 (Inference) and 9 (Small samples); Tutorials 7 and 9", status: "lectured",
summary: "Why a sample mean needs an interval, the Central Limit Theorem and its simulation, z-intervals for large samples, t-intervals for small normal samples, t.test(), the difference between intervals for the mean and for the data, and normality checks.",
theory: R`
<h3>0. Point estimates aren't enough</h3>
<p>The sample mean $\bar x$ estimates the population mean $\mu$, but another sample gives another $\bar x$ (you might have picked the 50 smallest setosa by chance). Inference puts a range on $\mu$. The sample must be representative (airquality has no winter days).</p>

<h3>1. The Central Limit Theorem</h3>
<p>For large samples ($n \ge 30$), sample means are normally distributed, whatever the population's shape:</p>
$$\bar x \approx N\!\left(\mu,\ \frac{\sigma}{\sqrt n}\right)$$
<p>$\sigma/\sqrt n$ is the <b>standard error</b>. Tutorial 7 simulation:</p>
<pre>pop &lt;- sample(1:100, 10000, replace = TRUE)          # uniform, not normal
means &lt;- vector(length = 1000)
for (i in 1:1000) means[i] &lt;- mean(sample(pop, 40))
plot(density(means))            # bell-shaped
mean(means); sd(means)          # ≈ mean(pop), ≈ sd(pop)/sqrt(40)</pre>

<h3>2. Large-sample interval</h3>
<p>From $P(-1.96 &lt; Z &lt; 1.96) = 0.95$ with $Z = (\bar x - \mu)/(\sigma/\sqrt n)$:</p>
$$\bar x \pm z\frac{\sigma}{\sqrt n},\qquad z = 1.645\ (90\%),\ 1.96\ (95\%),\ 2.58\ (99\%)$$
<p>$\pm 3\sigma/\sqrt n$ (quality control) is 99.73%. With σ unknown (always), use $s$ for $n \ge 30$. Bigger $n$ → narrower; higher confidence → wider.</p>
<pre>qnorm(c(0.025, 0.975))                    # ±1.96
t.test(airquality$Temp)$conf.int           # 76.37 79.39   ← use this in the exam
t.test(airquality$Temp, conf.level = 0.99) # 75.89 79.88</pre>

<h3>3. Small samples ($n &lt; 30$)</h3>
<p><b>Only valid if the data come from a normal population: check first.</b></p>
<pre>qqnorm(x); qqline(x)     # points on the line → normal</pre>
<p>With σ unknown use the <b>t-distribution with n − 1 degrees of freedom</b> (wider, flatter than Z; close to Z by 29 df):</p>
$$\bar x \pm t_{n-1}\frac{s}{\sqrt n}$$
<p>Alloy failure loads ($n$ = 22): $\bar x$ = 13.71, $s$ = 3.55, $t_{0.975,21}$ = 2.08 ⇒ 13.71 ± 1.57 = (12.14, 15.28). <code>t.test(alloy)</code> gives the same. <code>t.test</code> works for large samples too (practically the same as z).</p>
<p>Tutorial 7 normality checks: 1–9 → normal; 1628.75, 1613.63, ... → probably not (only six points; the shape is hard to judge); 0/1 data → not normal. A sample of 5 from a uniform population does not give normal means.</p>

<h3>4. Interval for the mean vs for the data</h3>
<div class="tbl"><table class="data">
<tr><th>Question says</th><th>Means</th><th>Code</th></tr>
<tr><td>"95% CI for the mean [var]", "population mean"</td><td>Where μ lies</td><td><code>t.test(x, conf.level = .95)$conf.int</code></td></tr>
<tr><td>"95% CI for [var]", "middle 95% of the data"</td><td>Where the data lie</td><td><code>quantile(x, c(.025, .975))</code></td></tr>
</table></div>
<p>Framingham sysBP: mean interval (131.69, 133.02), data interval (100.5, 188.0). If someone claims a typical sysBP is 130, we're 95% sure they're wrong.</p>`,
formulas: [
 {name:"CLT", tex:R`\bar x \approx N\left(\mu, \frac{\sigma}{\sqrt n}\right)`},
 {name:"Large-sample CI", tex:R`\bar x \pm z\frac{s}{\sqrt n}`},
 {name:"Small-sample CI", tex:R`\bar x \pm t_{n-1}\frac{s}{\sqrt n}`},
 {name:"z values", tex:R`1.645,\ 1.96,\ 2.58`, note:"90%, 95%, 99%"}
],
questions: [
 {src:"Lecture 8 example", see:[2], q:R`airquality Temp: $\bar x$ = 77.882, $s$ = 9.465, $n$ = 153. Find the 95% CI by formula and compare with <code>t.test</code>. What are the 90% and the ±3 SE confidence levels?`,
  hint:"1.96 × s/√n.",
  sol:R`<p>$77.882 \pm 1.96(9.465/\sqrt{153}) = 77.882 \pm 1.500 = (76.38, 79.38)$. t.test: (76.37, 79.39), slightly wider and the one to use.</p><p>90%: z = <code>qnorm(0.95)</code> = 1.645. ±3 SE: <code>pnorm(3) - pnorm(-3)</code> = 0.9973, i.e. 99.73%.</p>`,
  ans:"(76.38, 79.38); 1.645; 99.73%", prov:"Lecture 8 example and exercises; worked by Claude."},
 {src:"Lecture 9 example", see:[3], q:R`Battery life (min): 176, 191, 214, 220, 205, 192, 201, 190, 183, 185. Is it normal? Give a 95% CI for the mean.`,
  hint:"Q-Q plot first, then t.test.",
  sol:R`<pre>sam &lt;- c(176,191,214,220,205,192,201,190,183,185)
qqnorm(sam); qqline(sam)    # close to the line: normal
t.test(sam)$conf.int         # 185.66 205.74</pre><p>$\bar x$ = 195.7, $s$ = 14.03, $t_{9}$ = 2.26.</p>`,
  ans:"(185.7, 205.7) min", prov:"Lecture 9 example; interval computed by Claude in R."},
 {src:"Quiz 3 (2025) Q3", see:[3], q:R`Downtime (h) for 10 shifts: 1.8, 2.1, 1.5, 3.0, 2.4, 1.9, 1.6, 2.3, 2.0, 1.7. 99% CI for the mean.`,
  hint:"Small sample: check normality, then t.test with conf.level.",
  sol:R`<pre>qqnorm(x3); qqline(x3)                   # roughly linear
t.test(x3, conf.level = 0.99)$conf.int   # 1.570276 2.489724</pre><p>(1.71, 2.35) was the 95% interval: a trap option.</p>`, ans:"(1.570276, 2.489724)", prov:LOOP+" Marked correct."},
 {src:"Quiz 3 (2025) Q4", see:[3], q:R`Diameter deviations (mm): 0.12, 0.09, 0.15, 0.11, 0.13, 0.12, 0.10, 0.14. Give the 95% CI for the mean and the engineering conclusion.`,
  hint:"How wide is it, and where is it?",
  sol:R`<pre>t.test(x4)$conf.int   # 0.1033 0.1367</pre><p>Narrow (≈ 0.033 mm wide), so the process is highly consistent, with the mean deviation pinned at about 0.10–0.14 mm.</p>`, ans:"(0.103, 0.137): consistent process", prov:LOOP+" The answer chosen in 2025 was marked wrong; this is the one the output supports."},
 {src:"Quiz 3 (2025) Q5", see:[2], q:R`<code>breast-cancer.csv</code>, diagnosis B: 95% CI for the mean concavity_se.`,
  hint:"Subset, then t.test.",
  sol:R`<pre>B &lt;- subset(bc, diagnosis == "B")    # n = 357
t.test(B$concavity_se)$conf.int      # 0.02257040 0.02942307</pre>`, ans:"(0.02257, 0.02942)", prov:LOOP+" Marked correct."},
 {src:"Quiz 3 (2025) Q6", see:[2,4], q:R`mtcars: 95% CI for mean mpg is (17.92, 22.26) against a spec of "at least 20 mpg". What should the engineer conclude?`,
  hint:"Is 20 inside? Look at the group means by cyl.",
  sol:R`<p>20 is inside the interval, so you can neither conclude the spec is met nor failed. The means differ hugely by cylinders (4: 26.7, 6: 19.7, 8: 15.1), so the pooled interval hides subgroups: investigate variation across engine configurations.</p>`, ans:"Investigate variation across engine configurations", prov:LOOP+" The answer chosen in 2025 was marked wrong; this is the one the analysis supports."},
 {src:"Quiz 2 (2025) Q5", see:[4], q:R`airquality, September only: the 99% confidence interval for Ozone.`,
  hint:"It doesn't say 'mean'.",
  sol:R`<pre>sep &lt;- subset(airquality, Month == 9)
quantile(sep$Ozone, c(0.005, 0.995), na.rm = TRUE)   # 7.28 95.30</pre><p>The mean interval (19.06, 43.84) wasn't an option.</p>`, ans:"(7.28, 95.30)", prov:LOOP+" The option chosen in 2025 was marked wrong; this one matches R exactly."},
 {src:"Tutorial 9 Q1", see:[2,4], q:R`Framingham sysBP: 95% CI for the mean, 95% interval for the data, and 95% CIs for the mean for men and women separately.`,
  hint:"t.test vs quantile; subset by male.",
  sol:R`<pre>t.test(fd$sysBP)$conf.int                 # 131.69 133.02
quantile(fd$sysBP, c(.025, .975))         # 100.5 188.0
t.test(subset(fd, male == 1)$sysBP)$conf.int   # 130.55 132.34
t.test(subset(fd, male == 0)$sysBP)$conf.int   # 132.09 133.99</pre>`, ans:"(131.69, 133.02); (100.5, 188.0); M (130.55, 132.34), F (132.09, 133.99)", prov:"Tutorial 9 gives these answers."}
],
traps: [
 "Small samples (n < 30): CHECK NORMALITY FIRST, then t with n − 1 df.",
 "The other confidence level is almost always offered as a distractor.",
 "Mean interval (t.test) is narrow; data interval (quantile) is wide.",
 "Higher confidence → wider interval. Bigger sample → narrower interval.",
 "CLT is about the distribution of sample MEANS, not of the data."
]
});

T.topics.push({
id: "twomeans", part: "Inference", title: "Comparing Two Means: Welch & Paired t-Tests",
lectures: "Lectures 10–11; Tutorial 9", status: "lectured",
summary: "Independent vs dependent samples, overlapping intervals, the interval for the difference in means and why 0 is the number to look for, hypothesis-testing language, Welch's t-test for small independent samples, and the paired t-test.",
theory: R`
<h3>0. Independent or dependent?</h3>
<p><b>Dependent</b> (paired): a definite reason to match values, e.g. the same car carrying one tyre of each brand, the same girder tested by two methods, the same subject before and after. <b>Independent</b>: no reason to pair, e.g. tyres worn on a machine, two separate groups of volunteers.</p>

<h3>1. Large independent samples</h3>
<p>Rough approach: build each CI; no overlap ⇒ different means. Better: the CLT for the difference,</p>
$$(\bar x_1 - \bar x_2) \pm 1.96\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$$
<p><b>0 is the important number.</b> 0 inside ⇒ $\mu_1$ could equal $\mu_2$. 0 outside ⇒ different, and the interval says by how much.</p>
<pre>ps  &lt;- subset(iris, Species == "setosa")$Petal.Length
pvs &lt;- subset(iris, Species == "versicolor")$Petal.Length
t.test(ps, pvs)$conf.int     # -2.94 -2.66: setosa petals 2.66–2.94 cm shorter</pre>

<h3>2. Hypothesis testing language</h3>
<p>$H_0$: $\mu_1 = \mu_2$; $H_a$: $\mu_1 \ne \mu_2$. We either reject $H_0$ or fail to reject it (never "prove" $H_0$). 0 outside the 95% CI ⇔ p &lt; 0.05 ⇔ reject $H_0$ at 5%. The maximum confidence at which the means differ is $(1 - p)\times 100\%$.</p>

<h3>3. Small independent samples</h3>
<p>Check <b>each</b> sample is normal (two Q-Q plots). Then Welch's t-interval, with degrees of freedom</p>
$$\nu = \frac{\left(\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1-1} + \frac{(s_2^2/n_2)^2}{n_2-1}},\qquad (\bar x_1-\bar x_2) \pm t_{\nu}\sqrt{\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2}}$$
<pre>t.test(bt, rm, conf.level = 0.9)   # Welch is R's default</pre>

<h3>4. Paired samples</h3>
<p>Work with the differences $d_i = x_i - y_i$. For small samples <b>check the differences are normal</b>, then</p>
$$\bar d \pm t_{n-1}\frac{s_d}{\sqrt n}$$
<pre>d &lt;- m1 - m2; qqnorm(d); qqline(d)
t.test(m1, m2, paired = TRUE)</pre>
<p>Using the unpaired test on paired data gives a different interval and possibly the wrong conclusion.</p>`,
formulas: [
 {name:"Large, independent", tex:R`(\bar x_1-\bar x_2)\pm z\sqrt{\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2}}`},
 {name:"Small, independent (Welch)", tex:R`(\bar x_1-\bar x_2)\pm t_\nu\sqrt{\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2}}`},
 {name:"Paired", tex:R`\bar d \pm t_{n-1}\frac{s_d}{\sqrt n}`},
 {name:"Decision", tex:R`0\in CI \Rightarrow \text{could be equal}`}
],
questions: [
 {src:"Lecture 10 example", see:[1], q:R`Petrol prices: Texgas $n$ = 35, $\bar x$ = €1.48, $s$ = 0.12; Quick-Check $n$ = 40, $\bar x$ = €1.39, $s$ = 0.10. Is Quick-Check cheaper (95%)? Use both approaches.`,
  hint:"Two separate CIs; then the CI for the difference.",
  sol:R`<p>Texgas 1.48 ± 1.96(0.12/√35) = (1.44, 1.52). Quick-Check 1.39 ± 1.96(0.10/√40) = (1.36, 1.42). No overlap.</p>
  <p>Difference: $0.09 \pm 1.96\sqrt{0.12^2/35 + 0.10^2/40} = 0.09 \pm 0.05 = (0.04, 0.14)$. 0 is outside: 95% sure Texgas is 4c–14c dearer.</p>`,
  ans:"Yes: Texgas 4c–14c dearer", prov:"Lecture 10 example."},
 {src:"Lecture 11 example", see:[3], q:R`Blowout times (h). Beltex: 3.82, 3.11, 3.21, 2.64, 4.16, 3.51, 2.44. Roadmaster: 4.16, 3.92, 3.94, 4.22, 4.15, 3.62, 4.11. Compare at 90% and 99%.`,
  hint:"Independent (machine-worn), small: two normality checks, then Welch.",
  sol:R`<pre>t.test(bt, rm, conf.level = 0.90)$conf.int   # -1.209 -0.286
t.test(bt, rm, conf.level = 0.99)$conf.int   # -1.591  0.097</pre><p>90%: Beltex lasts 0.3–1.2 h less. 99%: 0 is inside, so no difference can be claimed at 99%.</p>`,
  ans:"90%: Beltex 0.3–1.2 h shorter; 99%: not significant", prov:"Lecture 11 example."},
 {src:"Lecture 11 example", see:[4], q:R`Shear strength predictions for nine girders, Method 1: 1.186, 1.151, 1.322, 1.339, 1.200, 1.402, 1.365, 1.537, 1.559; Method 2: 1.061, 0.992, 1.063, 1.062, 1.065, 1.178, 1.037, 1.086, 1.052. Is there a difference (95%)?`,
  hint:"Same girders → paired. Check the differences.",
  sol:R`<pre>d &lt;- m1 - m2; qqnorm(d); qqline(d)          # normal enough
t.test(m1, m2, paired = TRUE)$conf.int      # 0.170 0.378</pre><p>Method 1 predicts 0.17–0.38 higher. (Unpaired would give (0.159, 0.389): a different interval.)</p>`,
  ans:"Method 1 higher by 0.17–0.38", prov:"Lecture 11 example."},
 {src:"Final (2025) Q7", see:[1], q:R`<code>forestfires.csv</code>: 99% CI for the difference in mean FFMC, August minus September.`,
  hint:"Large independent samples.",
  sol:R`<pre>aug &lt;- subset(ff, month == "aug")$FFMC   # n = 184
sep &lt;- subset(ff, month == "sep")$FFMC   # n = 172
t.test(aug, sep, conf.level = 0.99)$conf.int   # 0.0598 2.1281</pre>`, ans:"(0.0597903, 2.1280762)", prov:LOOP+" Marked correct."},
 {src:"Tutorial 9 Q2", see:[1,2], q:R`Framingham: 95% and 99% CIs for the difference in mean sysBP, men minus women. What's the highest confidence at which you can say men's mean is lower?`,
  hint:"0 in or out? Then use the p-value.",
  sol:R`<pre>t.test(m$sysBP, f$sysBP)$conf.int                    # -2.899 -0.295
t.test(m$sysBP, f$sysBP, conf.level = 0.99)$conf.int # -3.309  0.115
t.test(m$sysBP, f$sysBP)$p.value                     # 0.0162</pre><p>95%: 0 outside → men lower. 99%: 0 inside. The two-sided interval just touches 0 at 1 − 0.0162 = <b>98.4%</b>.</p>`,
  ans:"95% yes, 99% no; up to ≈ 98.4%", prov:"Tutorial 9 gives the intervals; the 98.4% is worked by Claude in R."}
],
traps: [
 "0 is the key number for a DIFFERENCE in means; 1 is the key number for a RATIO of variances.",
 "Same subjects or items measured twice → paired = TRUE.",
 "Small samples: check normality of EACH sample (independent) or of the DIFFERENCES (paired).",
 "Say 'fail to reject H0', not 'accept H0'.",
 "Watch the direction: t.test(a, b) gives an interval for μa − μb."
]
});

T.topics.push({
id: "variance", part: "Inference", title: "Confidence Intervals for σ & Comparing Variances",
lectures: "Lecture 12 (CIs for the population standard deviation)", status: "lectured",
summary: "Why spread matters in manufacturing, the chi-squared interval for σ (varTest in EnvStats), comparing two variances with the F-distribution and var.test, and why 1 is the number to look for. Normality is required throughout.",
theory: R`
<h3>0. Spread is the quality measure</h3>
<p>Controlling variability is central to operations management. The point estimate of σ is $s$; σ mainly has meaning when compared.</p>

<h3>1. Chi-squared interval for σ</h3>
<p>For a sample from a <b>normal</b> population, $(n-1)s^2/\sigma^2$ has a $\chi^2$ distribution with $n - 1$ df. <code>qchisq(p, df)</code> gives the value with area p to its LEFT: <code>qchisq(c(.025,.975), 5)</code> = (0.83, 12.83).</p>
$$\sqrt{\frac{(n-1)s^2}{\chi^2_{0.975,\,n-1}}}\ \le\ \sigma\ \le\ \sqrt{\frac{(n-1)s^2}{\chi^2_{0.025,\,n-1}}}$$
<pre>library(EnvStats)
qqnorm(samp); qqline(samp)          # must be normal
sqrt(varTest(samp)$conf.int)         # CI for σ  (varTest gives the variance)</pre>
<p>Alloy loads: σ between 2.73 and 5.08 (95%).</p>

<h3>2. Comparing two variances: the F test</h3>
<p>For two independent normal samples with equal variances, $s_1^2/s_2^2$ follows an F distribution with $(n_1 - 1, n_2 - 1)$ df. CI for $\sigma_1^2/\sigma_2^2$:</p>
$$\left(\frac{s_1^2/s_2^2}{F_{0.975}},\ \frac{s_1^2/s_2^2}{F_{0.025}}\right)$$
<pre>var.test(set, ver)                     # CI for the ratio of variances
sqrt(var.test(set, ver)$conf.int)      # ratio of sds
var.test(B, A, alternative = "greater")</pre>
<p><b>1 is the important number.</b> 1 inside ⇒ variances could be equal; outside ⇒ different. Setosa vs versicolor sepal length: ratio (0.26, 0.82), sd ratio (0.51, 0.91): setosa is less variable.</p>`,
formulas: [
 {name:"Chi-squared statistic", tex:R`\frac{(n-1)s^2}{\sigma^2}\sim\chi^2_{n-1}`},
 {name:"F statistic", tex:R`\frac{s_1^2}{s_2^2}\sim F_{n_1-1,\,n_2-1}`},
 {name:"Decision", tex:R`1\in CI\Rightarrow\ \text{variances could be equal}`}
],
questions: [
 {src:"Lecture 12 example", see:[1], q:R`Alloy failure loads (n = 22, $s$ = 3.554, normal). 95% CI for σ by formula and in R.`,
  hint:"χ² values for 21 df: qchisq(c(.025,.975), 21) = 10.28, 35.48.",
  sol:R`<p>$\sqrt{21(3.554^2)/35.48} = 2.73$ and $\sqrt{21(3.554^2)/10.28} = 5.08$.</p><pre>sqrt(varTest(alloy)$conf.int)   # 2.733948 5.078290</pre><p>95% sure σ for all U-700 alloys is between 2.7 and 5.1.</p>`,
  ans:"(2.73, 5.08)", prov:"Lecture 12 example; formula check by Claude."},
 {src:"Final (2025) Q2", see:[2], q:R`Machine A and B (15 parts each). Is B's standard deviation significantly greater than A's at 5%?`,
  hint:"Normality, then var.test.",
  sol:R`<pre>qqnorm(A); qqline(A); qqnorm(B); qqline(B)     # both fine
var.test(B, A, alternative = "greater")        # F = 6.17, p = 0.0008
var.test(A, B)$conf.int                        # 0.054 0.483 (1 outside)</pre><p>sd A = 1.49, sd B = 3.71: B is significantly more variable.</p>`, ans:"Yes, B has a significantly larger sd", prov:LOOP+" Marked correct."},
 {src:"Final (2025) Q4", see:[1], q:R`95% CI for the standard deviation of female math scores in <code>StudentsPerformance.csv</code>. Options: (14.60, 16.50); can't be calculated; (213.2, 272.2); (62.3, 65.0).`,
  hint:"What does the chi-squared interval require?",
  sol:R`<pre>f &lt;- subset(sp, gender == "female")$math.score
qqnorm(f); qqline(f)     # lower tail bends away (scores of 0 and 8)
shapiro.test(f)          # p = 0.0035 → not normal</pre><p>The interval needs normal data, so it <b>can't be calculated</b> validly. (14.60, 16.50) is what you'd get ignoring the check; the others are the variance and mean intervals.</p>`, ans:"Can not be calculated", prov:LOOP+" (14.60, 16.50) was marked wrong in 2025, which points to this answer."}
],
traps: [
 "varTest gives the VARIANCE interval: square-root it for σ.",
 "No normality → no chi-squared or F interval.",
 "For variances the key number is 1, not 0.",
 "qchisq gives LEFT-tail areas; the lecture's notation uses right-tail areas."
]
});

T.topics.push({
id: "anova", part: "Inference", title: "ANOVA, Tukey & Assumption Checks",
lectures: "Lectures 12 (ANOVA) and 13 (ANOVA of the iris data)", status: "lectured",
summary: "Comparing three or more means: the three assumptions (independence, normal residuals, equal variances) and how to check them, aov() and the F test, Tukey's post-hoc comparisons, two-way ANOVA with interaction, and the alternatives when assumptions fail.",
theory: R`
<h3>0. Why ANOVA</h3>
<p>Three or more groups (iris species). Repeated t-tests on every pair inflate the chance of a false difference, so use one ANOVA then a multiple-comparisons procedure. Visualise first with ggplot2 + <code>geom_jitter()</code>.</p>

<h3>1. The three assumptions</h3>
<ol>
<li><b>Independence:</b> random, independent replicates (essential; the F test is sensitive to this). Iris: no reason to pair flowers; we hope they were sampled randomly.</li>
<li><b>Normal residuals:</b> robust to mild departures, especially with large samples.
<pre>library(onewaytests); nor.test(Sepal.Width ~ Species, data = iris)
res &lt;- aov(Sepal.Width ~ Species, data = iris)$residuals
library(car); qqPlot(res); shapiro.test(res)</pre></li>
<li><b>Equal variances:</b> not critical with equal group sizes, but check: visual (<code>plot(iris)</code> ranges), rule of thumb largest/smallest variance ≤ 4 (3–5 depending on author), or Levene's test.
<pre>leveneTest(Sepal.Width ~ Species, data = iris)   # p > 0.05 → equal variances OK</pre>
Sepal width variances (0.144, 0.098, 0.104) pass; petal width (0.011, 0.039, 0.075, ratio ≈ 7) fails.</li>
</ol>

<h3>2. One-way ANOVA and Tukey</h3>
<pre>a &lt;- aov(Sepal.Width ~ Species, data = iris)
summary(a)        # F = 49.2, Pr(>F) &lt; 2e-16 → means not all equal
TukeyHSD(a)       # pairwise differences with adjusted p</pre>
<p>Each Tukey row compares two groups: <code>p adj</code> &lt; 0.05 ⇒ significantly different; its interval excludes 0. Iris: setosa is 0.658 wider than versicolor and 0.454 wider than virginica; virginica 0.204 wider than versicolor (p = 0.009). All three differ.</p>

<h3>3. Two-way ANOVA</h3>
<p>ToothGrowth: <code>len</code> depends on <code>supp</code> (OJ, VC) and <code>dose</code> (0.5, 1, 2), a 2×3 factorial design. Dose is stored as a number, so convert it first.</p>
<pre>tg &lt;- ToothGrowth; tg$dose &lt;- as.factor(tg$dose)
a2 &lt;- aov(len ~ supp * dose, data = tg)
summary(a2)     # supp p = 0.0002, dose p &lt; 2e-16, supp:dose p = 0.022
TukeyHSD(a2)
library(HH); interaction2wt(len ~ supp * dose, data = tg)</pre>
<p>Main effects: OJ gives longer teeth; length rises with dose. Interaction: the effect of dose depends on the supplement (at dose 2, OJ and VC are the same). Equal group sizes keep the factors orthogonal and the assumptions robust. ANOVA is a linear model: the intercept is the OJ/0.5 cell.</p>

<h3>4. When assumptions fail</h3>
<div class="tbl"><table class="data">
<tr><th>Problem</th><th>Use</th></tr>
<tr><td>Unbalanced two-way</td><td>Type II (no interaction) or Type III (<code>car::Anova(m, type = "III")</code>)</td></tr>
<tr><td>Unequal variances, one-way</td><td>Welch: <code>oneway.test(y ~ g, var.equal = FALSE)</code>; Games–Howell post hoc</td></tr>
<tr><td>Unequal variances, two-way</td><td>Robust ANOVA, <code>WRS2::t2way</code></td></tr>
<tr><td>Dependent samples</td><td>Repeated-measures ANOVA (<code>rstatix::anova_test</code>)</td></tr>
<tr><td>Non-normal residuals</td><td>Kruskal–Wallis (one-way), ART (two-way), Friedman (repeated)</td></tr>
</table></div>`,
formulas: [
 {name:"Hypotheses", tex:R`H_0: \mu_1=\mu_2=\cdots=\mu_k`},
 {name:"Variance rule of thumb", tex:R`\frac{s^2_{max}}{s^2_{min}} \le 4`},
 {name:"Decision", tex:R`p < 0.05 \Rightarrow \text{reject } H_0`}
],
questions: [
 {src:"Lecture 13 example", see:[1,2], q:R`Check the assumptions and run a one-way ANOVA on iris Sepal.Width by Species. Which species differ?`,
  hint:"Variance ratio, aov, TukeyHSD.",
  sol:R`<p>Variances 0.144 / 0.098 / 0.104: ratio 1.46 &lt; 4 ✓. Equal group sizes (50). Residuals roughly normal.</p><pre>summary(aov(Sepal.Width ~ Species, iris))   # F = 49.16, p &lt; 2e-16
TukeyHSD(aov(Sepal.Width ~ Species, iris))
# versicolor-setosa -0.658, virginica-setosa -0.454, virginica-versicolor 0.204 (p = 0.0088)</pre><p>All three means differ significantly at 5%.</p>`,
  ans:"All three differ", prov:"Lecture 12/13 example; values checked by Claude in R."},
 {src:"Practice (Claude)", see:[1], q:R`Could you run the same one-way ANOVA on iris Petal.Width?`,
  hint:"Compare the largest and smallest group variances.",
  sol:R`<p>Variances 0.0111 (setosa), 0.0391, 0.0754: ratio ≈ 6.8 &gt; 4, and Levene's test rejects equal variances. Not advisable even with equal group sizes; use Welch's ANOVA (<code>oneway.test(..., var.equal = FALSE)</code>) instead.</p>`,
  ans:"No: variances too unequal (ratio ≈ 6.8)", prov:"Lecture 12 slides make this point; ratio computed by Claude in R."},
 {src:"Final (2025) Q8", see:[3,2], q:R`penguins (palmerpenguins): two-way ANOVA of body_mass_g on species + sex, then Tukey HSD for sex. Conclusion?`,
  hint:"na.omit first; does the Tukey interval include 0?",
  sol:R`<pre>pg &lt;- na.omit(penguins)
a2 &lt;- aov(body_mass_g ~ species + sex, data = pg)
TukeyHSD(a2, "sex")    # male-female 667.5 g, CI (599.2, 735.7), p ≈ 0</pre><p>Males are significantly heavier. (Tukey works fine with two levels.)</p>`, ans:"Male penguins significantly heavier", prov:LOOP+" Marked correct."},
 {src:"Final (2025) Q10", see:[1], q:R`Radon data: dose D (6 levels) and response RR. Run Levene's test and give Pr(>F) (4 dp).`,
  hint:"D must be a factor.",
  sol:R`<pre>leveneTest(RR ~ as.factor(D))   # F = 0.860, Pr(>F) = 0.5261</pre><p>The default <code>center = median</code> gives 0.5261 (mean centring gives 0.3303).</p>`, ans:"0.5261", prov:LOOP+" Marked correct."}
],
traps: [
 "Convert numeric group codes to factors (as.factor) before aov or leveneTest.",
 "A significant F only says SOME means differ: Tukey says which.",
 "Don't run all the pairwise t-tests instead of ANOVA.",
 "Levene/Shapiro: p > 0.05 is the GOOD outcome (assumption holds).",
 "Large variance ratio (> 4): use Welch's ANOVA, not aov."
]
});

T.topics.push({
id: "nonparam", part: "Inference", title: "Non-Parametric Tests",
lectures: "Tutorial 10", status: "lectured",
summary: "Rank-based alternatives when normality fails: Spearman's rank correlation, the Mann–Whitney U (Wilcoxon rank-sum) test for independent samples, the Wilcoxon signed-rank test for paired samples, their confidence intervals, and bootstrapping.",
theory: R`
<h3>0. Ranks instead of values</h3>
<p>Order all values and replace each with its rank. Robust to outliers and skew, no distribution assumed, works across different scales. But when normality holds, <b>parametric tests are more powerful</b> (more likely to detect a real effect, narrower intervals), so prefer them then.</p>

<h3>1. Which test</h3>
<div class="tbl"><table class="data">
<tr><th>Parametric</th><th>Non-parametric</th><th>R</th></tr>
<tr><td>Pearson correlation</td><td>Spearman's ρ (monotonic relationship)</td><td><code>cor.test(x, y, method = "spearman")</code></td></tr>
<tr><td>Welch two-sample t</td><td>Mann–Whitney U / Wilcoxon rank-sum</td><td><code>wilcox.test(x, y, conf.int = TRUE)</code></td></tr>
<tr><td>Paired t</td><td>Wilcoxon signed-rank</td><td><code>wilcox.test(x, y, paired = TRUE, conf.int = TRUE)</code></td></tr>
<tr><td>One-way ANOVA</td><td>Kruskal–Wallis</td><td><code>kruskal.test(y ~ g)</code></td></tr>
</table></div>
<p>p &lt; 0.05 ⇒ significant difference (or relationship). The <code>conf.int</code> output estimates the location shift (≈ difference in medians; "pseudo-median" for paired); 0 outside ⇒ significant.</p>

<h3>2. Bootstrapping</h3>
<p>Resample the data with replacement many times, compute the statistic each time, and read the interval off its distribution. Used for intervals where no formula exists (e.g. Spearman's ρ):</p>
<pre>library(boot)
f &lt;- function(d, i) cor(d$x[i], d$y[i], method = "spearman")
b &lt;- boot(data.frame(x, y), f, R = 1000)
boot.ci(b, type = "perc")</pre>`,
formulas: [
 {name:"Spearman", tex:R`\rho \in [-1, 1]`, note:"monotonic, rank-based"},
 {name:"Decision", tex:R`p < 0.05 \Rightarrow \text{significant}`}
],
questions: [
 {src:"Tutorial 10 Q1", see:[1], q:R`Girder data (Method 1 x, Method 2 y): Spearman correlation, Mann–Whitney and Wilcoxon signed-rank. Interpret each.`,
  hint:"Which design is the data really?",
  sol:R`<p>Spearman: ρ = 0.33, p = 0.39 → no evidence of a monotonic relationship (bootstrap CI (−0.54, 0.95) includes 0).</p><p>Mann–Whitney: W = 80, p = 8.2×10⁻⁵, shift 0.277, CI (0.135, 0.381) → x higher.</p><p>Signed-rank (the right one, since girders are paired): V = 45, p = 0.0039, pseudo-median 0.268, CI (0.159, 0.390) → Method 1 significantly higher.</p>`,
  ans:"Paired: Method 1 significantly higher", prov:"Tutorial 10 outputs."},
 {src:"Tutorial 10 Q2", see:[1], q:R`Iris Petal.Length, versicolor vs virginica, non-parametrically: (1) independent data; (2) 50 growers each supplying one flower of each species.`,
  hint:"(1) rank-sum; (2) signed-rank.",
  sol:R`<pre>wilcox.test(vs, vg, conf.int = TRUE)                 # W = 44.5, p &lt; 2.2e-16, shift -1.20 (-1.50, -1.00)
wilcox.test(vs, vg, paired = TRUE, conf.int = TRUE)  # V = 3.5, p = 2.1e-9, pseudo-median -1.30 (-1.55, -1.10)</pre><p>Either way virginica petals are significantly longer, by about 1.2–1.3 cm.</p>`,
  ans:"Virginica longer by ≈ 1.2–1.3 cm in both cases", prov:"Tutorial 10 challenge; computed by Claude in R (ties make R use the normal approximation)."},
 {src:"Final (2025) Q6", see:[1], q:R`<code>sleep</code>: the same 10 subjects under two conditions. Use a non-parametric test to compare extra sleep.`,
  hint:"Same subjects → paired.",
  sol:R`<pre>wilcox.test(g2, g1, paired = TRUE, conf.int = TRUE)
# p = 0.0091, pseudo-median 1.40, 95% CI (1.05, 2.95): entirely positive</pre><p>Median extra sleep is significantly higher under condition 2.</p>`, ans:"Condition 2 significantly higher", prov:LOOP+" Marked correct."}
],
traps: [
 "Paired design → signed-rank (paired = TRUE); independent → rank-sum.",
 "Non-parametric tests compare medians/location, not means.",
 "If the data ARE normal, the t-test is more powerful: use it."
]
});
})();
