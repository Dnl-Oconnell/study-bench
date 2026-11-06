/* Recall cards for the linearisation topic added with the past papers. */
(function(){
const R = String.raw;
STUDY.cards = STUDY.cards || {}; STUDY.cards.ssc = STUDY.cards.ssc || {};
STUDY.cards.ssc.linearise = [
  { k:"def", q:R`What makes a system nonlinear? Give two examples from the past papers.`, a:R`Any term that isn't a constant times a state, input or derivative, so superposition fails: $\sin\vartheta$ (pendulum), $xy$, $v^2$.` },
  { k:"def", q:R`How do you find (or check) an equilibrium point?`, a:R`Set every derivative to zero with the stated input (usually $u=0$) and solve, or substitute the given point and show every $\dot x=0$.` },
  { k:"f", q:R`How is the linear model about an equilibrium formed?`, a:R`First-order Taylor expansion: $$\delta\dot{\mathbf x}=A\,\delta\mathbf x+B\,\delta u,\quad A_{ij}=\left.\frac{\partial f_i}{\partial x_j}\right|_e$$ It is in deviations from the equilibrium.` },
  { k:"def", q:R`What do $xy$ and $v^2$ become when linearised?`, a:R`$xy\to y_e\,\delta x+x_e\,\delta y$ (zero about the origin). $v^2\to2v_e\,\delta v$.` },
  { k:"why", q:R`Why is the pendulum's linear model only valid for small angles?`, a:R`$\sin\vartheta\approx\vartheta$ is the tangent line at 0; the error grows with angle (about 1% at 0.25 rad).` },
  { k:"why", q:R`Why is the upright (inverted) pendulum unstable?`, a:R`Near $\vartheta=\pi$ (or for the inverted form) gravity's sign flips: $\ddot\vartheta-\frac gL\vartheta=\dots$, giving a pole at $+\sqrt{g/L}$, so $e^{\sqrt{g/L}\,t}$ grows. Feedback (PID) can move the poles into the left half-plane.` },
  { k:"def", q:R`How do you judge the stability of an equilibrium?`, a:R`From the eigenvalues of the Jacobian A: all with negative real parts → locally asymptotically stable (complex → oscillatory); any positive → unstable.` }
];
})();
