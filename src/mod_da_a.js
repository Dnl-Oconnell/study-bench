/* MEC1029 Data Analytics for Engineers — part A: R basics, describing data, relationships, time series */
(function(){
const R = String.raw;
const T = STUDY.content.da = STUDY.content.da || { topics: [] };
const LOOP = "Worked in your MEC1029 answer bank (re-computed in R from the course datasets); Loop's marking from the 2025 sitting is noted where it was visible.";

T.topics.push({
id: "rbasics", part: "Getting started", title: "R, Data Structures & Reading Data",
lectures: "Lecture 1; Tutorials 1–2", status: "lectured",
summary: "The four types of analytics, base R vs RStudio, packages, setting the working directory and reading CSV, .data, JSON, Excel and XML files, then R's data types and structures: vectors, data frames, matrices, arrays, lists and time series.",
theory: R`
<h3>0. What data analytics is for</h3>
<p>Separating signal from noise to make useful predictions. Four components: generation, storage, retrieval, analysis. Four types:</p>
<div class="tbl"><table class="data">
<tr><th>Type</th><th>Question</th></tr>
<tr><td>Descriptive</td><td>What happened? (sales up this month?)</td></tr>
<tr><td>Diagnostic</td><td>Why did it happen? (did the weather affect sales?)</td></tr>
<tr><td>Predictive</td><td>What is likely to happen next?</td></tr>
<tr><td>Prescriptive</td><td>What should we do about it?</td></tr>
</table></div>
<p>Techniques named: regression, factor analysis, cohort analysis, Monte Carlo simulation, time-series analysis.</p>

<h3>1. R, packages and the working directory</h3>
<p>Base R is all you need (one-line commands); RStudio adds an editor, history and plot pane. Packages come from CRAN:</p>
<pre>install.packages("dplyr")   # once (quotes!)
library(dplyr)              # every session
setwd("~/R")                # folder holding your data
getwd()                     # check it</pre>
<p>The three packages the course leans on: <code>swirl</code> (interactive R course), <code>dplyr</code> (data manipulation), <code>ggplot2</code> (graphics).</p>

<h3>2. Reading data</h3>
<div class="tbl"><table class="data">
<tr><th>Format</th><th>Code</th></tr>
<tr><td>CSV (most common)</td><td><code>d &lt;- read.csv("file.csv")</code> → a data frame</td></tr>
<tr><td>.data / text</td><td><code>read.table("auto-mpg.data")</code>; add <code>sep = ","</code> for commas; name columns with <code>names(d)[1] &lt;- "mpg"</code></td></tr>
<tr><td>JSON</td><td><code>library(rjson); fromJSON(file = "iris.json")</code> → a list; <code>as.data.frame()</code></td></tr>
<tr><td>Excel</td><td><code>library(readxl); read_excel("x.xls")</code></td></tr>
<tr><td>XML</td><td><code>library(XML); xmlParse(file = "x.xml")</code></td></tr>
</table></div>
<p>Built-in datasets: <code>data()</code> lists them (iris, mtcars, airquality, women, cars, AirPassengers, ...).</p>

<h3>3. Data types and structures</h3>
<ul>
<li>Types: character <code>"25"</code>, numeric <code>12</code>, integer <code>30L</code>, complex <code>5+6i</code>, logical <code>TRUE/FALSE</code>. Check with <code>class(x)</code>.</li>
<li><b>Vector</b> <code>c(58, 85, 77)</code>, <code>1:10</code>; index <code>v[3]</code>, <code>v[c(3,4)]</code>; <code>length(v)</code>.</li>
<li><b>Data frame</b>: columns of possibly different types; what <code>read.csv</code> returns. <code>d$col</code>, <code>d[8, c(1,2,3)]</code>, <code>d[1000, 9]</code> = row 1000, column 9.</li>
<li><b>Matrix</b> (one type, 2-D): <code>matrix(c(...), nrow = 3, byrow = TRUE)</code>; <code>det(m)</code>, <code>solve(m)</code> (inverse).</li>
<li><b>Array</b> (more than 2-D), <b>list</b> (anything, <code>[[1]]</code>), <b>time series</b> <code>ts(x, start = c(2021,1), frequency = 12)</code>; class <code>"ts"</code>.</li>
</ul>
<p>First look at any dataset: <code>class</code>, <code>names</code>, <code>head</code>/<code>tail</code>, <code>dim</code>, <code>str</code>, <code>summary</code>.</p>`,
formulas: [
 {name:"Install & load", tex:R`\texttt{install.packages("pkg")};\ \texttt{library(pkg)}`},
 {name:"Element access", tex:R`\texttt{d[row, col]}`, note:"d[1000, 9] = row 1000, column 9"}
],
questions: [
 {src:"Quiz 1 (2025) Q8", see:[3], q:R`Find the determinant of the 4×4 matrix filled <b>by rows</b> with 1, 0, −1, 2, 2, 3, 4, 5, 1, 0, −1, 4, 6, −5, 7, 9.`,
  hint:"matrix(..., nrow = 4, byrow = TRUE) then det().",
  sol:R`<pre>m &lt;- matrix(c(1,0,-1,2, 2,3,4,5, 1,0,-1,4, 6,-5,7,9), nrow = 4, byrow = TRUE)
det(m)   # -138</pre>`, ans:"−138", prov:LOOP+" Marked correct."},
 {src:"Quiz 1 (2025) Q10", see:[3], q:R`For the same matrix, give the entry in row 2, column 3 of its inverse.`,
  hint:"solve(m) gives the inverse (it exists because det ≠ 0).",
  sol:R`<pre>solve(m)[2, 3]   # -0.2246377</pre>`, ans:"−0.22463768", prov:LOOP+" Marked correct."},
 {src:"Quiz 1 (2025) Q6", see:[2,3], q:R`What data structure does <code>read.csv("water_potability.csv")</code> create? And what is <code>LakeHuron</code> (Q2)?`,
  hint:"class().",
  sol:R`<p><code>class(water)</code> → <code>"data.frame"</code>. <code>class(LakeHuron)</code> → <code>"ts"</code>, a time series.</p>`, ans:"Data frame; time series", prov:LOOP+" Both marked correct."},
 {src:"Quiz 1 (2025) Q7", see:[3], q:R`In <code>water_potability.csv</code> (3276 rows × 10 columns), give the value in row 1000, column 9 to 1 dp.`,
  hint:"d[row, col].",
  sol:R`<pre>water[1000, 9]   # Turbidity 5.284233 → 5.3</pre><p>Rows: <code>nrow(water)</code> = 3276 (Q3).</p>`, ans:"5.3", prov:LOOP+" Marked correct."}
],
traps: [
 "install.packages needs quotes; library does not (both work with quotes, but install never works without).",
 "R is case sensitive: Species is not species.",
 "read.csv only finds files in the working directory: setwd first.",
 "matrix() fills by COLUMN unless byrow = TRUE."
]
});

T.topics.push({
id: "summary", part: "Describing data", title: "Summary Statistics, Missing Data & Outliers",
lectures: "Lecture 2; Tutorial 3", status: "lectured",
summary: "Every numerical column needs three things: a typical value, a spread and a frequency plot. Mean vs median, standard deviation and coefficient of variation, quantiles and the IQR, confidence intervals for the DATA, density plots, bar charts, boxplots and outliers, and handling NAs.",
theory: R`
<h3>0. Visualise first</h3>
<p><code>plot(iris)</code> gives every pairwise scatterplot. With a factor, ggplot2 shows how each level affects a numerical variable:</p>
<pre>library(ggplot2)
ggplot(iris) + aes(x = Species, y = Sepal.Width, color = Species) +
  geom_jitter() + theme(legend.position = "none")</pre>
<p><code>geom_jitter()</code> spreads points sideways so they don't overlap; <code>theme()</code> removes the pointless legend.</p>

<h3>1. The typical value</h3>
<p>Mean $\bar x = \sum x / n$ (the default). Median: the middle value, <b>robust</b> to outliers; use it when there are outliers (income, Airbnb prices). Mode: rarely useful.</p>
<p>If mean ≈ median there are probably no outliers; if mean ≫ median the data are right-skewed / have large outliers.</p>
<pre>summary(iris)                     # min, quartiles, median, mean, NA count
apply(iris[1:4], 2, mean)         # 2 = columns, 1 = rows
sapply(d, sd)                     # per column
mean(iris$Sepal.Width)</pre>

<h3>2. Spread</h3>
<p>Sample standard deviation (what R's <code>sd()</code> uses):</p>
$$s = \sqrt{\frac{\sum(x - \bar x)^2}{n-1}}$$
<p>It measures <b>consistency</b> (manufacturing tolerances). Two datasets can share mean and median yet differ wildly in spread (18 19 20 20 20 21 22 vs 1 1 1 20 39 39 39). Divide by $n$ only for a complete population (never in practice).</p>
<p><b>Coefficient of variation</b> compares spread relative to the mean: $CV = s/\bar x \times 100\%$.</p>
<p>With the median, use the <b>interquartile range</b> $IQR = Q_3 - Q_1$ (<code>IQR(x)</code>).</p>

<h3>3. Quantiles and the confidence interval for the data</h3>
<pre>quantile(x)                    # 0, 25, 50, 75, 100 %
quantile(x, 0.25)              # value below which 25% lie
quantile(x, c(0.05, 0.95))     # 90% of the DATA lies between these
range(x)</pre>
<p>"95% confidence interval for [a variable]" with no mention of the mean = <code>quantile(x, c(0.025, 0.975))</code>. This is a range for the data (wide), not for the mean (narrow, see Inference).</p>

<h3>4. Frequency plots</h3>
<ul>
<li><b>Continuous</b> (many possible values, > ~10): kernel density, <code>plot(density(x))</code>. Same mean and sd can hide very different shapes, so always plot.</li>
<li><b>Discrete</b> (few values): <code>barplot(table(mtcars$cyl))</code>.</li>
</ul>

<h3>5. Boxplots and outliers</h3>
<p>Box from $Q_1$ to $Q_3$ with the median inside; whiskers reach the most extreme data points within $1.5\times IQR$ of the box; anything beyond is plotted as an outlier.</p>
<pre>boxplot(subset(iris, Species == "setosa")$Sepal.Width)
boxplot(price ~ room_type, data = ny)</pre>
<p><b>True</b> outliers (natural variation) stay; <b>systematic</b> ones (measurement, entry or sampling errors) are investigated and possibly removed.</p>

<h3>6. Missing data (NA)</h3>
<pre>mean(airquality$Ozone)               # NA
mean(airquality$Ozone, na.rm = TRUE) # 42.13
colSums(is.na(d))                    # NAs per column
rowSums(is.na(d))                    # NAs per row: spot collection failures
aqc &lt;- na.omit(airquality)          # drops 42 of 153 rows</pre>
<p><code>na.omit</code> drops the whole row, so means of other columns change too (Ozone 42.10 instead of 42.13). It assumes the dropped rows are typical; check for a pattern first. A column with many NAs suggests a collection problem.</p>`,
formulas: [
 {name:"Mean", tex:R`\bar x = \frac{\sum x}{n}`},
 {name:"Sample sd", tex:R`s = \sqrt{\frac{\sum (x-\bar x)^2}{n-1}}`},
 {name:"Coefficient of variation", tex:R`CV = \frac{s}{\bar x}\times 100\%`},
 {name:"Interquartile range", tex:R`IQR = Q_3 - Q_1`},
 {name:"Boxplot whiskers", tex:R`Q_1 - 1.5\,IQR,\ \ Q_3 + 1.5\,IQR`}
],
questions: [
 {src:"Lecture 2 example", see:[2], q:R`Imperfections per sheet for two processes: P1 = 13 11 13 15 12 14 12 15 11 13; P2 = 13 19 13 14 13 20 12 13 15 10. Which process is better?`,
  hint:"Compare mean, sd and CV.",
  sol:R`<p>P1: $\bar x$ = 12.9, $s$ = 1.45, CV = 11.2%. P2: $\bar x$ = 14.2, $s$ = 3.08, CV = 21.7%.</p><p>P1 has fewer imperfections and is more consistent, even relative to its mean. (Strictly, decisions shouldn't rest on point estimates alone: that comes later with confidence intervals.)</p>`,
  ans:"Process 1", prov:"Lecture 2 example; CVs computed by Claude."},
 {src:"Quiz 1 (2025) Q1", see:[3,6], q:R`Sulfate (781 NAs) in <code>water_potability.csv</code>: value below which 25% of the data lie, to the nearest integer.`,
  hint:"Lower quartile, with na.rm.",
  sol:R`<pre>quantile(water$Sulfate, 0.25, na.rm = TRUE)   # 307.6995</pre><p>Round as told: <b>308</b>. (307.7 was marked wrong in 2025: rounding instructions are strict.)</p>`, ans:"308", prov:LOOP},
 {src:"Quiz 1 (2025) Q5", see:[2], q:R`IQR of Conductivity to the nearest integer.`,
  hint:"IQR(x) or Q3 − Q1.",
  sol:R`<pre>IQR(water$Conductivity)   # 116.0579 → 116</pre>`, ans:"116", prov:LOOP+" Marked correct."},
 {src:"Quiz 1 (2025) Q4", see:[1], q:R`Median and mean Organic_carbon (1 dp) (Q4 and Q9).`,
  hint:"median(), mean().",
  sol:R`<pre>median(water$Organic_carbon)   # 14.218 → 14.2
mean(water$Organic_carbon)     # 14.285 → 14.3</pre>`, ans:"14.2 and 14.3", prov:LOOP+" Both marked correct."},
 {src:"Quiz 2 (2025) Q1", see:[6], q:R`Which variable in <code>framingham.csv</code> has the most missing values?`,
  hint:"colSums(is.na(...)).",
  sol:R`<pre>colSums(is.na(fh))   # glucose 388, education 105, BPMeds 53, cigsPerDay 29 ...</pre>`, ans:"glucose", prov:LOOP+" Marked correct."},
 {src:"Quiz 2 (2025) Q6", see:[3], q:R`<code>airquality</code>: the temperature exceeded by 50% of the data (nearest integer).`,
  hint:"Exceeded by half = the middle value.",
  sol:R`<pre>median(airquality$Temp)   # 79</pre>`, ans:"79", prov:LOOP+" Marked correct."},
 {src:"Final (2025) Q1", see:[3], q:R`<code>StudentsPerformance.csv</code>: the 95% confidence interval for writing score.`,
  hint:"It doesn't say 'for the mean'.",
  sol:R`<pre>quantile(sp$writing.score, c(0.025, 0.975))   # 38 96</pre><p>The interval for the mean, (67.1, 69.0), was not an option.</p>`, ans:"(38, 96)", prov:LOOP+" Marked correct."}
],
traps: [
 "Most functions return NA if any value is NA: add na.rm = TRUE.",
 "na.omit drops the whole row, changing the other columns too.",
 "'CI for a variable' (data) uses quantile(); 'CI for the mean' uses t.test().",
 "Read rounding instructions literally: numeric answers get no partial credit.",
 "Mean much bigger than median means right skew / outliers: the median is the better typical value."
]
});

T.topics.push({
id: "factors", part: "Relationships", title: "Subsetting, Contingency Tables & Bayes' Theorem",
lectures: "Lecture 3; Tutorials 4–5", status: "lectured",
summary: "Subsetting rows and columns in base R and dplyr, two-way tables and which proportion a question wants (joint, row or column), conditional probability and Bayes' theorem, Simpson's paradox, and summarising a number by a factor with by(), tapply() and aggregate().",
theory: R`
<h3>0. Three kinds of relationship</h3>
<ol><li>One factor and one number: summaries per factor level.</li>
<li>Two factors: tables, proportions, probability.</li>
<li>Two numbers: scatterplots, correlation and regression.</li></ol>
<p>Factors are often coded as integers (framingham: <code>male</code> 1/0, <code>currentSmoker</code>, <code>BPMeds</code>).</p>

<h3>1. Subsetting</h3>
<div class="tbl"><table class="data">
<tr><th>Want</th><th>Code</th></tr>
<tr><td>Columns by number or name</td><td><code>iris[c(1,3,5)]</code>, <code>d[c("price","room_type")]</code></td></tr>
<tr><td>Rows for one level</td><td><code>subset(iris, Species == "setosa")</code></td></tr>
<tr><td>Two conditions</td><td><code>subset(d, a == "x" &amp; b > 3)</code> (or <code>|</code>)</td></tr>
<tr><td>Several levels</td><td><code>subset(d, g %in% c("A","B"))</code></td></tr>
<tr><td>Rows and columns</td><td><code>subset(iris, Species == "virginica", select = c(Sepal.Length, Sepal.Width))</code></td></tr>
<tr><td>Drop columns / rows</td><td><code>subset(d, select = -c(id, name))</code>, <code>subset(iris, Species != "setosa")</code></td></tr>
<tr><td>Count matches</td><td><code>nrow(subset(...))</code>, <code>sum(x &lt; 0, na.rm = TRUE)</code></td></tr>
<tr><td>dplyr</td><td><code>d %>% filter(g == "v") %>% select(a, b)</code></td></tr>
</table></div>
<p><code>==</code> not <code>=</code>; text levels need quotes and exact spelling (<code>unique(d$g)</code> to check).</p>

<h3>2. Contingency tables and proportions</h3>
<pre>t &lt;- table(fram$male, fram$currentSmoker)   # 1st = rows, 2nd = columns
addmargins(t)          # totals
prop.table(t)          # JOINT:   P(A and B)
prop.table(t, 1)       # ROWS:    P(column level | row level)
prop.table(t, 2)       # COLUMNS: P(row level | column level)
mosaicplot(t)</pre>
<p><b>Decoder:</b> the group after "of / from / given / among / for a ..." is the condition. Put it in the rows and use <code>prop.table(t, 1)</code>. "Proportion of all listings that are A and B" is joint.</p>

<h3>3. Probability and Bayes' theorem</h3>
$$P(E) = \frac{\text{number of data values of interest}}{\text{total number of data values}}$$
<p>Conditional probability restricts the denominator to a subset: $P(S\mid M)$ = smokers among males. Proportions describe the past; probability uses the same numbers to predict.</p>
$$P(A \text{ and } B) = P(A\mid B)P(B) = P(B\mid A)P(A)\quad\Rightarrow\quad P(A\mid B) = \frac{P(B\mid A)P(A)}{P(B)}$$

<h3>4. Simpson's paradox</h3>
<p>A trend in combined data can vanish or reverse in subgroups. Berkeley admissions: pooled, men 44.5% vs women 30.4% admitted; but in most departments women did as well or better (Dept A: women 82%, men 62%). Women applied mainly to departments with low admission rates. Always ask whether a third factor is lurking.</p>
<pre>margin.table(UCBAdmissions, c(1, 2))
prop.table(UCBAdmissions[, , "A"], 2)</pre>

<h3>5. A number by a factor</h3>
<pre>by(fh$sysBP, fh$education, median)
tapply(d$y, d$g, mean, na.rm = TRUE)
aggregate(price ~ neighbourhood_group + room_type, data = ny, FUN = mean)
by(ny$price, ny$neighbourhood_group, quantile, c(.025, .975))
sapply(S[c("PRES","DEWP","TEMP")], sd, na.rm = TRUE)</pre>`,
formulas: [
 {name:"Probability", tex:R`P(E) = \frac{\#\text{ of interest}}{\#\text{ total}}`},
 {name:"Bayes", tex:R`P(A\cap B) = P(A\mid B)P(B) = P(B\mid A)P(A)`},
 {name:"Conditional", tex:R`P(A\mid B) = \frac{P(A\cap B)}{P(B)}`}
],
questions: [
 {src:"Lecture 3 example", see:[3], q:R`Admissions: admitted 1198 M / 557 F (1755); rejected 1493 M / 1278 F (2771); totals 2691 M, 1835 F, 4526. Find (1) P(female and admitted), (2) P(female), (3) P(admitted | female), (4) P(admitted), (5) P(female | admitted), and show Bayes holds.`,
  hint:"Joint uses the grand total; conditionals use a row or column total.",
  sol:R`<p>(1) 557/4526 = 0.123. (2) 1835/4526 = 0.405. (3) 557/1835 = 0.304. (4) 1755/4526 = 0.388. (5) 557/1755 = 0.317.</p><p>(1) = (2)×(3) = 0.405 × 0.304 = 0.123, and (1) = (4)×(5) = 0.388 × 0.317 = 0.123 ✓.</p>`,
  ans:"0.123, 0.405, 0.304, 0.388, 0.317", prov:"Lecture 3 example; numbers worked by Claude."},
 {src:"Tutorial 5 Q1", see:[2], q:R`Airbnb NYC (room_type × neighbourhood_group): (1) what proportion of listings are entire homes/apts in Queens? (2) probability that a Bronx listing is a private room? (3) proportion of entire home/apt listings that are in Manhattan?`,
  hint:"(1) joint; (2) given Bronx; (3) of entire homes.",
  sol:R`<pre>t &lt;- table(ny$room_type, ny$neighbourhood_group)
prop.table(t)      # Entire/Queens 0.043
prop.table(t, 2)   # Private | Bronx 0.598
prop.table(t, 1)   # Manhattan | Entire 0.519</pre>`,
  ans:"4%, 0.60, 52%", prov:"Tutorial 5 gives the answers; R code checked by Claude."},
 {src:"Quiz 2 (2025) Q4", see:[2,3], q:R`Framingham: probability that someone on BP medication developed CHD within 10 years (3 dp).`,
  hint:"Given BPMeds: BPMeds in the rows, row proportions.",
  sol:R`<pre>prop.table(table(fh$BPMeds, fh$TenYearCHD), 1)   # 41/124 = 0.331</pre>`, ans:"0.331", prov:LOOP+" Marked correct."},
 {src:"Quiz 2 (2025) Q2", see:[2], q:R`Framingham: proportion of females (3 dp).`,
  hint:"male == 0.",
  sol:R`<pre>mean(fh$male == 0)   # 0.5707547 → 0.571</pre>`, ans:"0.571", prov:LOOP+" Marked correct."},
 {src:"Quiz 2 (2025) Q7", see:[1,5], q:R`Changping, wind direction "S" only: which of PRES, DEWP, TEMP, RAIN has the largest sd? How many TEMP readings are below 0 (Q8)?`,
  hint:"subset first, then sapply / sum.",
  sol:R`<pre>S &lt;- subset(cp, wd == "S")       # 1700 rows
sapply(S[c("PRES","DEWP","TEMP","RAIN")], sd, na.rm = TRUE)  # DEWP 12.79 largest
sum(S$TEMP &lt; 0, na.rm = TRUE)    # 94</pre>`, ans:"DEWP; 94", prov:LOOP+" Both marked correct."},
 {src:"Quiz 2 (2025) Q10", see:[5], q:R`Framingham: which education group has the largest median systolic BP?`,
  hint:"by(y, group, median).",
  sol:R`<pre>by(fh$sysBP, fh$education, median)   # 1: 131, 2: 127.5, 3: 125, 4: 125</pre>`, ans:"Education 1", prov:LOOP+" Marked correct."},
 {src:"Tutorial 4 Q1", see:[1], q:R`From the Airbnb data build: (1) entire homes/apts in Brooklyn under $150 a night; (2) the data without id, name, host_id and host_name; (3) number_of_reviews and last_review for Manhattan.`,
  hint:"subset with & and select.",
  sol:R`<pre>d1 &lt;- subset(ny, room_type == "Entire home/apt" &amp;
              neighbourhood_group == "Brooklyn" &amp; price &lt; 150)        # 4933 rows
d2 &lt;- subset(ny, select = -c(id, name, host_id, host_name))           # 12 columns
d3 &lt;- subset(ny, neighbourhood_group == "Manhattan",
              select = c(number_of_reviews, last_review))              # 21661 rows</pre>`,
  ans:"4933 rows; 12 columns; 21661 × 2", prov:"Tutorial 4 exercise; computed by Claude in R."},
 {src:"Tutorial 5 Q2", see:[5,0], q:R`Mean price of a private room in Brooklyn, and the median price by neighbourhood. Which is the better guide to what you'd pay?`,
  hint:"aggregate with two factors.",
  sol:R`<pre>aggregate(price ~ neighbourhood_group + room_type, ny, mean)   # Brooklyn private 76.50
by(ny$price, ny$neighbourhood_group, median)  # Bronx 65, Brooklyn 90, Manhattan 150, Queens 75, SI 75
quantile(ny$price, c(.025, .975))             # 35, 500</pre><p>Overall mean 152.7 vs median 106: large outliers (up to $10,000), so the <b>median</b> is the better guide.</p>`,
  ans:"$76.50; median", prov:"Tutorial 5 challenge; computed by Claude in R."}
],
traps: [
 "table(A, B): A is the rows. prop.table(t, 1) divides by ROW totals.",
 "'Probability that a [given group] is X' is a conditional: the given group goes in the rows.",
 "Use == in conditions, and quote text levels with the exact spelling.",
 "Simpson's paradox: check subgroups before trusting a pooled table."
]
});

T.topics.push({
id: "probability", part: "Relationships", title: "Random Variables & the Normal Model",
lectures: "Lecture 4", status: "lectured",
summary: "Discrete and continuous random variables, the probability mass function, density curves, probabilities by counting, pnorm and qnorm for approximately normal data, the inverse problem, and Q-Q plots to check normality.",
theory: R`
<h3>0. Random variables</h3>
<p>Think of a random variable as a measurement, or a column of a database. <b>Discrete</b>: few possible values (≤ ~10), usually integers (mtcars cyl, gear, carb). <b>Continuous</b>: many possible values (mpg, wt; hp and disp are integers but have many values, so count as continuous).</p>

<h3>1. Discrete: the probability mass function</h3>
<pre>prop.table(table(mtcars$gear))   # 3: 0.469, 4: 0.375, 5: 0.156
barplot(table(mtcars$gear))</pre>
<p>Probabilities of combined events add: P(fewer than 6 cylinders) = P(4).</p>

<h3>2. Continuous: density and counting</h3>
<p><code>plot(density(x))</code> is the probability density function $f(x)$; area under it between $a$ and $b$ is $P(a &lt; X &lt; b)$. In practice just count:</p>
<pre>mean(mtcars$wt > 3.18)     # 0.5625
quantile(mtcars$wt, 0.4375)  # inverse: 3.18</pre>

<h3>3. The normal distribution</h3>
<p>Bell-shaped; described fully by mean and sd: $X \approx N(\mu, \sigma)$. Setosa sepal length ≈ N(5.006, 0.352). Not everything is normal (Airbnb price is hugely skewed).</p>
<div class="tbl"><table class="data">
<tr><th>Want</th><th>Code</th></tr>
<tr><td>P(X &lt; A)</td><td><code>pnorm(A, m, s)</code></td></tr>
<tr><td>P(X > A)</td><td><code>1 - pnorm(A, m, s)</code></td></tr>
<tr><td>P(A &lt; X &lt; B)</td><td><code>pnorm(B, m, s) - pnorm(A, m, s)</code></td></tr>
<tr><td>Value below which p lie</td><td><code>qnorm(p, m, s)</code> (normal) or <code>quantile(x, p)</code> (data)</td></tr>
<tr><td>Value exceeded p of the time</td><td><code>qnorm(1 - p, m, s)</code></td></tr>
</table></div>
<p>Counting gives the exact proportion in the data; <code>pnorm</code> is an approximation that assumes normality. If the question says "approximately normally distributed", use <code>pnorm</code>/<code>qnorm</code> with the sample mean and sd.</p>

<h3>4. Checking normality</h3>
<pre>qqnorm(x); qqline(x)</pre>
<p>Points close to the line, with no systematic curve away from it: normal. Also look at <code>plot(density(x))</code>.</p>`,
formulas: [
 {name:"Below A", tex:R`P(X<A) = \texttt{pnorm(A, m, s)}`},
 {name:"Above A", tex:R`P(X>A) = 1-\texttt{pnorm(A, m, s)}`},
 {name:"Inverse", tex:R`x_p = \texttt{qnorm(p, m, s)}`},
 {name:"Standardise", tex:R`Z = \frac{X-\mu}{\sigma}`}
],
questions: [
 {src:"Lecture 4 example", see:[3], q:R`Setosa sepal length ≈ N(5.006, 0.352). Find P(length &lt; 5.4) by counting and by the normal model, and the value below which 33.33% of lengths lie.`,
  hint:"sum(x < 5.4)/length(x) vs pnorm; quantile vs qnorm.",
  sol:R`<pre>set_data &lt;- subset(iris, Species == "setosa")
mean(set_data$Sepal.Length &lt; 5.4)     # 0.8   (exact, from the data)
pnorm(5.4, 5.006, 0.352)               # 0.868 (normal approximation)
quantile(set_data$Sepal.Length, 0.3333) # 4.9
qnorm(0.3333, 5.006, 0.352)            # 4.854</pre>`,
  ans:"0.8 (data) / 0.868 (normal); 4.9 / 4.854", prov:"Lecture 4 example."},
 {src:"Practice (Claude)", see:[3], q:R`With the same model, find P(length > 5.4), P(4.8 &lt; length &lt; 5.2), and the length exceeded by only 10% of setosa flowers.`,
  hint:"1 − pnorm; difference of two pnorms; qnorm(0.9, ...).",
  sol:R`<pre>1 - pnorm(5.4, 5.006, 0.352)                              # 0.132
pnorm(5.2, 5.006, 0.352) - pnorm(4.8, 5.006, 0.352)       # 0.430
qnorm(0.9, 5.006, 0.352)                                  # 5.457</pre>`,
  ans:"0.132; 0.430; 5.46", prov:"Worked by Claude in R."},
 {src:"Quiz 3 (2025) Q10", see:[3], q:R`<code>CompanyABCProfit.csv</code>: Profit is approximately normally distributed. Find the profit exceeded only 10% of the time in the 20th century (1 dp).`,
  hint:"The stem says approximately normal.",
  sol:R`<pre>p20 &lt;- subset(p, Year >= 1901 &amp; Year &lt;= 2000)
qnorm(0.9, mean(p20$Profit), sd(p20$Profit))   # 1639.4
quantile(p20$Profit, 0.9)                      # 1647.8 (marked wrong)</pre><p>If the century is taken as 1900–1999 the same method gives 1657.2.</p>`,
  ans:"1639.4", prov:LOOP+" The raw quantile, 1647.8, was marked wrong, which points to the qnorm answer."},
 {src:"Practice (Claude)", see:[1], q:R`From <code>mtcars$cyl</code>: probability a car has fewer than 6 cylinders, and probability it has 4 or 6.`,
  hint:"prop.table(table()) then add.",
  sol:R`<pre>prop.table(table(mtcars$cyl))   # 4: 0.344, 6: 0.219, 8: 0.438</pre><p>P(&lt; 6) = P(4) = 0.344. P(4 or 6) = 0.344 + 0.219 = 0.563.</p>`,
  ans:"0.344; 0.563", prov:"Lecture 4 question; worked by Claude."}
],
traps: [
 "'Approximately normal' in the question: use pnorm/qnorm with mean() and sd(), not quantile().",
 "No mention of normal: use the data (mean(x < a), quantile).",
 "pnorm gives the LEFT tail. Above a value is 1 − pnorm.",
 "'Exceeded by 10%' is the 90th percentile: qnorm(0.9, ...)."
]
});

T.topics.push({
id: "regression", part: "Relationships", title: "Correlation, Regression & Model Checking",
lectures: "Lecture 5; Tutorial 6; 'How Good Is My Model' slides", status: "lectured",
summary: "Scatterplots first, then the least-squares line with lm(), prediction with predict(), the correlation coefficient and its limits (Anscombe), power-law fits on logs, multiple regression with factors, and judging a model with R², residual diagnostics and actual-vs-fitted plots.",
theory: R`
<h3>0. Look first</h3>
<pre>plot(women$height, women$weight)
plot(airquality)       # all pairwise scatterplots at once</pre>
<p>If a straight line fits by eye the relationship is linear, $y = a + bx$; otherwise non-linear (mercury vapour pressure vs temperature).</p>

<h3>1. The regression line</h3>
<pre>fit &lt;- lm(weight ~ height, data = women)    # y FIRST
coef(fit)                                     # -87.52, 3.45
predict(fit, data.frame(height = 64))         # 133.28
plot(women$height, women$weight); abline(fit, col = "red")</pre>
$$b = \frac{n\sum xy - \sum x\sum y}{n\sum x^2 - (\sum x)^2},\qquad a = \frac{\sum y}{n} - b\frac{\sum x}{n}$$
<p>Only valid within the data range (heights 58–72). "Estimate diaBP for sysBP = 119" means <code>lm(diaBP ~ sysBP)</code>. If a group is named (March only), subset before fitting.</p>

<h3>2. Correlation</h3>
$$r = \frac{n\sum xy - \sum x\sum y}{\sqrt{[n\sum x^2 - (\sum x)^2][n\sum y^2 - (\sum y)^2]}}$$
<p>−1 to +1. About ±0.3 weak, ±0.5 moderate, ±0.7 strong. <code>cor(x, y, use = "complete.obs")</code> with NAs. "Most linear" = largest |r| (−0.9 beats 0.8). women: 0.995; cars: 0.807.</p>
<p>$r$ measures <b>linear</b> fit only: mercury pressure has r = 0.76 yet is clearly curved. <b>Anscombe's quartet</b>: four datasets with the same means, variances, r = 0.816 and line y = 3 + 0.5x, but completely different plots. Always plot. Correlation is not causation.</p>

<h3>3. Non-linear: power laws</h3>
<p>If $\log y$ vs $\log x$ is linear, $\log y = a + b\log x \Leftrightarrow y = e^a x^b$. (If $\log y$ vs $x$ is linear, $y = e^a e^{bx}$, exponential.)</p>
<pre>lv  &lt;- by(log(DNase$density), log(DNase$conc), mean)
vmd &lt;- as.vector(lv); vc &lt;- as.numeric(names(lv))
cor(vc, vmd)                          # 0.992
fit &lt;- lm(vmd ~ vc)                   # -0.8558 + 0.6700 vc
exp(coef(fit)[1])                     # 0.4249  →  d = 0.42 c^0.67</pre>
<p>Always back-transform with <code>exp()</code> before reporting $y$.</p>

<h3>4. Multiple regression and factors</h3>
<pre>lm(Petal.Length ~ Species + Petal.Width, iris)   # factor coded automatically
lm(y ~ x1 * x2, d)       # with interaction
lm(y ~ x + I(x^2), d)    # quadratic
lm(log(y) ~ log(x1), d)  # transformed
lm(y ~ ., d)             # all other columns</pre>
<p>A factor becomes dummy variables: one level (setosa) is the baseline in the intercept; each other level gets its own shift (versicolor +1.70, virginica +2.28 cm, holding width fixed).</p>

<h3>5. How good is the model?</h3>
<ul>
<li><code>summary(fit)</code>: coefficients, $R^2$ (fraction of variance explained; adjusted $R^2$ penalises extra terms), residual standard error, F-statistic. Petal.Width only: R² 0.927; + Species: 0.955, RSE 0.478 → 0.378.</li>
<li><code>plot(fit)</code> diagnostics (<code>which = 1</code> is Residuals vs Fitted): residuals centred on 0 with no curve (linearity), Q-Q close to the line (normal residuals), flat Scale-Location (constant variance), no point with large Cook's distance.</li>
<li>Actual vs fitted plot with the 45° line: points close and evenly scattered = good fit; systematically above or below = underfitting (missing a variable); tiny wiggles = overfitting.</li>
<li><code>checkresiduals(fit)</code> (forecast package): Breusch–Godfrey p &gt; 0.05 means no evidence of autocorrelation in the residuals.</li>
<li><code>predict(fit, newdata, interval = "confidence")</code> is for the mean response; <code>interval = "prediction"</code> is for one new value and is wider.</li>
</ul>`,
formulas: [
 {name:"Line", tex:R`y = a + bx`},
 {name:"Slope", tex:R`b = \frac{n\sum xy-\sum x\sum y}{n\sum x^2-(\sum x)^2}`},
 {name:"Correlation", tex:R`r = \frac{n\sum xy-\sum x\sum y}{\sqrt{[n\sum x^2-(\sum x)^2][n\sum y^2-(\sum y)^2]}}`},
 {name:"Power law", tex:R`\log y = a + b\log x \iff y = e^a x^b`},
 {name:"Exponential", tex:R`\log y = a + bx \iff y = e^a e^{bx}`}
],
questions: [
 {src:"Quiz 2 (2025) Q9", see:[1], q:R`Framingham: estimate diastolic BP for a systolic BP of 119 (1 dp).`,
  hint:"diaBP is the y.",
  sol:R`<pre>fit &lt;- lm(diaBP ~ sysBP, data = fh)    # diaBP = 26.809 + 0.4238 sysBP
predict(fit, data.frame(sysBP = 119))  # 77.24</pre>`, ans:"77.2", prov:LOOP+" Marked correct."},
 {src:"Quiz 2 (2025) Q3", see:[1], q:R`Changping, March only (month = 3): linear model of TEMP against day; estimate TEMP on day 15 (2 dp).`,
  hint:"Subset, then lm(TEMP ~ day).",
  sol:R`<pre>fit &lt;- lm(TEMP ~ day, data = subset(cp, month == 3))  # 2.6213 + 0.36096 day
predict(fit, data.frame(day = 15))                    # 8.0357</pre>`, ans:"8.04", prov:LOOP+" Marked correct."},
 {src:"Quiz 3 (2025) Q1", see:[2], q:R`<code>breast-cancer.csv</code>: which pair is the most linear: concavity_se–area_se, smoothness_se–compactness_se, compactness_se–concavity_se or area_se–smoothness_se?`,
  hint:"Largest |r|.",
  sol:R`<p>r = 0.271, 0.337, <b>0.801</b>, 0.075. compactness_se – concavity_se.</p>`, ans:"compactness_se – concavity_se", prov:LOOP+" Marked correct."},
 {src:"Quiz 3 (2025) Q2", see:[5], q:R`mtcars: Model 1 <code>mpg ~ wt + hp</code>, Model 2 <code>log(mpg) ~ wt + hp</code> back-transformed. From actual-vs-fitted plots, which fits better?`,
  hint:"exp() Model 2's fitted values first; compare closeness to the 45° line.",
  sol:R`<pre>m1 &lt;- lm(mpg ~ wt + hp, mtcars); m2 &lt;- lm(log(mpg) ~ wt + hp, mtcars)
sqrt(mean((mtcars$mpg - fitted(m1))^2))        # RMSE 2.47
sqrt(mean((mtcars$mpg - exp(fitted(m2)))^2))   # RMSE 2.12</pre><p>Model 2's points sit closer to the line: Model 2 fits better.</p>`, ans:"Model 2", prov:LOOP+" The answer marked in 2025 was wrong; this is the answer the R output supports."},
 {src:"Tutorial 6 Q1", see:[3], q:R`DNase: show mean log density is linear in log concentration, find the power law, and predict density at conc = 5.`,
  hint:"lm on the logs, then exp().",
  sol:R`<p>r = 0.992. $\log d = -0.8558 + 0.670\log c$ ⇒ $d = e^{-0.8558}c^{0.670} = 0.42c^{0.67}$.</p><pre>exp(predict(fit, data.frame(vc = log(5))))   # 1.25</pre>`, ans:"d = 0.42 c^0.67; ≈ 1.25 at c = 5", prov:"Tutorial 6; prediction computed by Claude in R."},
 {src:"Final (2025) Q3", see:[4,1], q:R`<code>Exam_Results.csv</code>: model New_Scores on Previous_Scores × Hours_Studied (with interaction). For Previous_Scores = 35, what is the minimum whole number of hours to reach 40?`,
  hint:"Solve for hours, then round UP.",
  sol:R`<pre>fit &lt;- lm(New_Scores ~ Previous_Scores * Hours_Studied, data = er)
predict(fit, data.frame(Previous_Scores = 35, Hours_Studied = 11:12))  # 37.34, 40.21</pre><p>11 hours falls short, 12 passes.</p>`, ans:"12", prov:LOOP+" Marked correct."},
 {src:"Final (2025) Q9", see:[5], q:R`Which base-R call reproduces the "Residuals vs Fitted" diagnostic plot (title, red smoother, labelled points) for <code>fit &lt;- lm(y ~ x)</code>?`,
  hint:"The built-in lm plots.",
  sol:R`<pre>plot(fit, which = 1)</pre><p><code>plot(fitted(fit), resid(fit))</code> draws the points but no title, smoother or labels.</p>`, ans:"plot(fit, which = 1)", prov:LOOP+" The alternative was marked wrong in 2025."}
],
traps: [
 "lm(y ~ x): the variable you're estimating goes FIRST.",
 "r near 0 doesn't mean no relationship, only no LINEAR one. Plot it.",
 "Back-transform log models with exp() before quoting y.",
 "Subset to the named group BEFORE fitting.",
 "Don't predict outside the range of the data.",
 "A prediction interval (one new value) is wider than a confidence interval (the mean)."
]
});

T.topics.push({
id: "timeseries", part: "Relationships", title: "Time Series: Decomposition, Trend & Forecasting",
lectures: "Lecture 6; Tutorial 8", status: "lectured",
summary: "Trend, seasonal and random components; additive vs multiplicative models; decompose(), moving averages and the linear trend; forecasting by hand (AirPassengers January 1961); training/test splits, TSLM and ETS models, accuracy() metrics and checkresiduals().",
theory: R`
<h3>0. Structure</h3>
<p>Many series combine a <b>trend</b> (medium-term), <b>seasonal factors</b> (short-term, e.g. monthly) and <b>random</b> noise. AirPassengers has structure; the Nile series looks random.</p>
<pre>str(AirPassengers); start(AirPassengers); end(AirPassengers)   # 1949 1 to 1960 12</pre>

<h3>1. Additive vs multiplicative</h3>
$$\text{additive: } DATA = T + SF\qquad \text{multiplicative: } DATA = T\times SF$$
<p>Seasonal swings constant in size → additive; growing with the trend → multiplicative (AirPassengers). Ultimately use whichever predicts better.</p>
<pre>da &lt;- decompose(AirPassengers, "multiplicative")
da$figure    # the 12 seasonal factors (Jan 0.910 ... Jul 1.227)
plot(da)</pre>

<h3>2. The trend</h3>
<p><b>Moving averages</b> smooth the series (<code>rollmean(x, 5)</code> in zoo). Odd orders are symmetric. <code>decompose()</code> uses a <b>12-point centred</b> moving average (<code>ma(x, 12, centre = TRUE)</code>), so the first 6 and last 6 months have no trend value.</p>
<p>To predict, approximate the trend with a straight line in $t = 1, 2, \ldots$:</p>
<pre>t &lt;- 1:144
lmAP &lt;- lm(da$trend ~ t)     # LT = 84.648 + 2.667 t</pre>
<p>Seasonal factor (multiplicative) = mean of DATA/TREND for that month over all years. Random = DATA/(T × SF).</p>

<h3>3. Forecasting by hand</h3>
<ol class="steps"><li>Find $t$ for the target period (Jan 1961 = 145).</li>
<li>Trend: $LT = 84.648 + 2.667(145) = 471.35$.</li>
<li>Multiplicative: × SF(Jan) 0.9102 = <b>429.04</b>. (Additive: + SF.)</li></ol>
<pre>trend &lt;- predict(lmAP, data.frame(t = 145:156))
trend * as.vector(da$figure)   # Jan–Dec 1961</pre>
<p>Forecasts carry no random component.</p>

<h3>4. Train/test and model families (Tutorial 8)</h3>
<p>For a time series the test set must be the <b>most recent</b> data (random selection destroys trend and seasonality).</p>
<pre>library(forecast)
train &lt;- window(BJsales, end = 138); test &lt;- window(BJsales, start = 139)
m1 &lt;- tslm(train ~ trend)          # (+ season if seasonal)
m2 &lt;- ets(train)                    # picks e.g. ETS(A,Ad,N)
f1 &lt;- forecast(m1, h = 12); f2 &lt;- forecast(m2, h = 12)   # 80% and 95% prediction intervals
accuracy(f1, test); accuracy(f2, test)
checkresiduals(m2)</pre>
<p><b>ETS</b> = Error, Trend, Seasonality, each N (none), A (additive), M (multiplicative) or damped (Ad). Smoothing parameters α (level), β (trend), γ (season), φ (damping, &lt; 1 flattens the trend). σ is the residual sd: judge it against the range of the data.</p>

<h3>5. Judging a forecast</h3>
<div class="tbl"><table class="data">
<tr><th>Metric</th><th>Meaning</th></tr>
<tr><td>ME</td><td>Average error: bias (positive = under-forecasting)</td></tr>
<tr><td>RMSE, MAE</td><td>Typical error size (RMSE punishes big errors); lower is better</td></tr>
<tr><td>MPE, MAPE</td><td>Percentage versions; unreliable near zero</td></tr>
<tr><td>MASE</td><td>&lt; 1 beats the naïve last-value forecast</td></tr>
<tr><td>ACF1</td><td>Lag-1 autocorrelation of residuals; near 0 is good</td></tr>
<tr><td>Theil's U</td><td>&lt; 1 beats the naïve forecast</td></tr>
</table></div>
<p><code>checkresiduals()</code>: residuals should look like white noise (random about 0, bell-shaped histogram, ACF spikes inside the bounds). Breusch–Godfrey (regression) or Ljung–Box (others): <b>p &gt; 0.05</b> = no evidence of autocorrelation = good; p &lt; 0.05 = pattern left in the residuals.</p>`,
formulas: [
 {name:"Additive", tex:R`DATA = T + SF`},
 {name:"Multiplicative", tex:R`DATA = T\times SF`},
 {name:"Linear trend (AirPassengers)", tex:R`LT = 84.648 + 2.667t`},
 {name:"Seasonal factor (mult.)", tex:R`SF = \overline{DATA/T}\ \text{for that season}`}
],
questions: [
 {src:"Lecture 6 example", see:[2,3], q:R`AirPassengers (multiplicative, Jan 1949 = t = 1): predict January 1961, given LT = 84.648 + 2.667t and SF(Jan) = 0.9102304.`,
  hint:"Dec 1960 is t = 144.",
  sol:R`<p>$t = 145$; $LT = 84.648 + 2.667(145) = 471.35$; × 0.9102 = <b>429.04</b>.</p>`, ans:"429.04", prov:"Lecture 6 example."},
 {src:"Quiz 3 (2025) Q8", see:[3], q:R`Additive model: trend = 345.12 − 1.35t and the seasonal factor for period 16 is −23.62. Forecast period 16 (nearest integer).`,
  hint:"Additive: add the seasonal factor.",
  sol:R`<p>Trend = 345.12 − 1.35(16) = 323.52; + (−23.62) = 299.9 ≈ <b>300</b>.</p>`, ans:"300", prov:LOOP+" Marked correct."},
 {src:"Quiz 3 (2025) Q7", see:[2,3], q:R`JohnsonJohnson (quarterly, 1960 Q1 to 1980 Q4): linear trend value for Q1 1981 (3 dp).`,
  hint:"84 quarters, so Q1 1981 is t = 85. Regress the decompose() trend on t.",
  sol:R`<pre>da &lt;- decompose(JohnsonJohnson, "multiplicative"); t &lt;- 1:84
lmJJ &lt;- lm(da$trend ~ t)              # -2.2627 + 0.16327 t
predict(lmJJ, data.frame(t = 85))     # 11.615</pre><p>Regressing the raw series instead gives 11.729.</p>`, ans:"11.615", prov:LOOP+" 11.729 (raw-series regression) got half marks in 2025, which points to 11.615."},
 {src:"Quiz 3 (2025) Q9", see:[4,5], q:R`ausbeer: hold out the last 10 quarters, fit ETS to the rest and evaluate against the test set. Test MAPE ≈ 2.5%, MASE ≈ 0.68, ME ≈ 10.5 on a level of ~400. Interpret.`,
  hint:"MASE < 1; ME relative to the level.",
  sol:R`<pre>train &lt;- window(ausbeer, end = c(2007, 4)); test &lt;- window(ausbeer, start = c(2008, 1))
fc &lt;- forecast(ets(train), h = length(test))      # ETS(M,A,M)
accuracy(fc, test); accuracy(snaive(train, h = 10), test)   # snaive MAPE 3.17, MASE 0.85</pre><p>Accurate (MAPE 2.5%), nearly unbiased (ME ≈ 2.4% of the level), and better than seasonal naïve (MASE &lt; 1 and lower than snaive's).</p>`, ans:"Accurate, nearly unbiased, beats seasonal naïve", prov:LOOP+" Marked correct."},
 {src:"Final (2025) Q5", see:[5], q:R`ETS on <code>nottem</code>: <code>checkresiduals()</code> gives Ljung–Box Q* = 40.86, df = 24, p = 0.017. What does this say?`,
  hint:"p < 0.05.",
  sol:R`<p>p &lt; 0.05: reject "no autocorrelation". The residuals still contain autocorrelation, so the model hasn't captured all the structure. Not fully adequate, but that doesn't mean it must be discarded.</p>`, ans:"Residuals still contain autocorrelation", prov:LOOP+" Marked correct."}
],
traps: [
 "Growing seasonal swings → multiplicative (× SF). Constant swings → additive (+ SF).",
 "decompose() uses a centred moving average: no trend for the first and last half-season.",
 "Count t carefully: for monthly data from Jan 1949, Jan 1961 is t = 145.",
 "Test data for a time series = the most recent observations, never a random sample.",
 "Residual tests: a HIGH p-value (> 0.05) is the good outcome.",
 "MASE or Theil's U below 1 means better than the naïve forecast."
]
});
})();
