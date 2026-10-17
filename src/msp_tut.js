(function(){
const R = String.raw;
STUDY.content.msp.tutorials = [{
  id: "sheet", short: "1", title: "Tutorial Question Sheet", note: "One sheet for the whole semester",
  intro: "The single MEC1015 question sheet, all 35 questions in order, grouped by part of the course. Each question links to the topic page that teaches it.",
  fromTopics: true,
  figs: {4:"q4", 5:"q5", 12:"q12", 13:"q13", 20:"q20", 25:"q25", 32:"q32", 34:"q34", 35:"q35"},
  questions: [
    {nums:[35], topic:"systems", src:"Tutorial Q35",
     q:R`The impulse response and the input signal of a sampled data system are shown in the figure. Estimate and sketch the form of the corresponding output. How long after the input has started does the output settle to a steady value?`,
     hint:"Read the values off each spike first, then do flip-and-slide: y_n = Σ h_k x_(n−k).",
     sol:R`<p>Reading the figure: $h_1 = -1$, $h_3 = 2$, $h_5 = -1$ (zero elsewhere), and $x_1 = 1$, $x_2 = x_3 = x_4 = 2$, $x_5 = 1$.</p>
     <table class="data num"><tr><th>n</th><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>
     <tr><th>y<sub>n</sub></th><td>−1</td><td>−2</td><td>0</td><td>2</td><td>2</td><td>2</td><td>0</td><td>−2</td><td>−1</td></tr></table>
     <p>For example $y_5 = h_1x_4 + h_3x_2 = -2 + 4 = 2$ and $y_6 = h_1x_5 + h_3x_3 + h_5x_1 = -1+4-1 = 2$.</p>
     <p>The output dips negative, rises to a plateau of <b>2</b> from n = 5 to 7, then dips negative again and dies away. It reaches the plateau at n = 5, <b>4 samples after the input starts</b> (input starts at n = 1).</p>
     <p class="small">The values come from my reading of a small figure, so check the spike heights against your copy. Note Σh = 0: a long constant input would give zero output once fully overlapped.</p>`}
  ]
}];
})();
