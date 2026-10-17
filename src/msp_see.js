/* Which theory section(s) each practice question relies on (index of <h3> in that topic's theory) */
(function(){
const see = {
 static:[[2],[2],[2],[2,3],[2],[1,2]],
 regression:[[4,1],[3,2],[2],[0]],
 dynamic:[[1,2,5],[4],[2],[5],[3]],
 systematic:[[1],[2],[0,1],[1],[2],[0]],
 random:[[2],[2],[3],[1]],
 confidence:[[1],[3],[2],[2],[0,2,3],[1,3],[1],[3]],
 chisq:[[1],[2],[1],[1]],
 propagation:[[1],[1],[2],[3],[1,3],[2,3],[1]],
 opamps:[[3],[3,0],[1]],
 adc:[[3,4],[3],[5],[4],[3]],
 sinusoids:[[1],[2],[4],[4],[3],[1,2,3],[6]],
 "fourier-series":[[5],[3],[3],[3],[3,2,4],[2,1],[1,2]],
 "fourier-transform":[[2,1],[1,0],[1]],
 sampling:[[3],[1],[1],[1],[4,3],[1,2],[4],[4]],
 systems:[[1],[1],[2,3],[3],[1],[1],[1]]
};
const c = STUDY.content.msp;
c.topics.forEach(t => (see[t.id]||[]).forEach((s,i) => { if (t.questions[i]) t.questions[i].see = s; }));
c.tutorials[0].questions.forEach(q => { if (q.nums[0]===35) q.see = [3]; });
})();
