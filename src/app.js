(function(){
const S = window.STUDY;
const root = document.getElementById("app");
root.innerHTML = `<div class="shell"><aside class="modpane" id="modpane" aria-label="Modules"></aside><div class="pagepane" id="pagepane"></div><div class="view" id="view"></div></div>`;
const app = document.getElementById("view");
const PANE = { open: false, mobileMods: false };
const store = {
  get(k, d){ try{ const v = localStorage.getItem("sb:"+k); return v===null? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("sb:"+k, JSON.stringify(v)); }catch(e){} }
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plain = html => { const d = document.createElement("div"); d.innerHTML = html; return (d.textContent||"").replace(/\s+/g," ").trim(); };

function typeset(el){
  if (window.MathJax && MathJax.typesetPromise){ MathJax.typesetClear && MathJax.typesetClear([el]); MathJax.typesetPromise([el]).then(()=>fitMath(el)).catch(()=>{}); }
  else { window.__pendingTypeset = el; }
}
function fitMath(root){ root.querySelectorAll("mjx-container").forEach(m => { const p = m.parentElement; const r = m.getBoundingClientRect(), pr = p.getBoundingClientRect(); if (r.width > p.clientWidth + 1 || r.right > pr.right + 1) m.classList.add("wide"); }); }
window.addEventListener("resize", () => fitMath(app));
window.__onMathReady = () => { if (window.__pendingTypeset) typeset(window.__pendingTypeset); };

function toast(msg){ const t = document.createElement("div"); t.className="toast"; t.textContent=msg; t.setAttribute("role","status"); document.body.appendChild(t); setTimeout(()=>t.remove(), 2200); }
async function copy(text){
  try{ await navigator.clipboard.writeText(text); toast("Copied. Paste it into the chat"); }
  catch(e){ const ta=document.createElement("textarea"); ta.value=text; document.body.appendChild(ta); ta.select(); try{document.execCommand("copy"); toast("Copied. Paste it into the chat");}catch(_){ toast("Select and copy the text manually"); } ta.remove(); }
}

function ratings(mid){ return store.get("rate:"+mid, {}); }
function progress(mid){
  const c = S.content[mid]; if(!c) return {done:0,total:0};
  const r = ratings(mid); const total = c.topics.length;
  return { done: c.topics.filter(t => r[t.id]==="good").length, total };
}

/* ---------- deadlines (todo list) ---------- */
const DL = { items: [], mode: "loading", api: null, canWrite: true, confirm: null };
const DL_TYPES = ["Test","Exam","Lab","Assignment","Tutorial","Other"];
function todayStr(){ const d = new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function daysUntil(ds){ const [y,m,d] = ds.split("-").map(Number); const t = new Date(); return Math.round((new Date(y,m-1,d) - new Date(t.getFullYear(),t.getMonth(),t.getDate()))/86400000); }
function whenLabel(n){ return n===0?"Today":n===1?"Tomorrow":n===-1?"Yesterday":n<0?`${-n} days ago`:n<14?`in ${n} days`:`in ${Math.round(n/7)} weeks`; }
function fmtDate(ds, time){ const [y,m,d] = ds.split("-").map(Number); return new Date(y,m-1,d).toLocaleDateString("en-IE",{weekday:"short",day:"numeric",month:"short"}) + (time?` · ${time}`:""); }

const localApi = {
  load(){ DL.items = store.get("deadlines", []); dlChanged(); },
  save(){ store.set("deadlines", DL.items); dlChanged(); },
  async add(x){ DL.items.push(Object.assign({id: "l"+Date.now().toString(36)}, x)); this.save(); },
  async update(id, patch){ const it = DL.items.find(i=>i.id===id); if(it) Object.assign(it, patch); this.save(); },
  async remove(id){ DL.items = DL.items.filter(i=>i.id!==id); this.save(); }
};
function dbApi(db){
  const col = db.collection("deadlines");
  col.onSnapshot(snap => { DL.items = snap.docs.map(d => Object.assign({id: d.id}, d.data())); dlChanged(); },
    () => { DL.mode = "local"; DL.api = localApi; localApi.load(); });
  return {
    add: x => col.add(x),
    update: (id, patch) => col.doc(id).update(patch),
    remove: id => col.doc(id).delete()
  };
}
async function initDeadlines(){
  let db = null, user = null;
  try { if (window.claude && window.claude.use){ [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]); } } catch(e){ db = null; }
  if (user && typeof user.isOwner === "function"){ try { DL.canWrite = (await user.isOwner()) !== false; } catch(e){} }
  if (db){ DL.mode = "db"; DL.api = dbApi(db); }
  else { DL.mode = "local"; DL.api = localApi; localApi.load(); }
  dlChanged();
}
function dlChanged(){ document.querySelectorAll("[data-dl]").forEach(el => renderDeadlines(el, el.dataset.dl || null)); const mini = document.getElementById("dlmini"); if (mini) renderMini(mini); }
function renderMini(el){
  const open = DL.items.filter(i=>!i.done).sort((a,b)=>(a.date+(a.time||"")).localeCompare(b.date+(b.time||""))).slice(0,4);
  el.innerHTML = `<div class="minihead"><a href="#home">Work orders</a>${DL.canWrite?`<button class="miniadd" id="miniadd" aria-label="Add a deadline">+</button>`:""}</div>` +
    (open.length ? `<ul>${open.map(it=>{ const m=S.modules[it.module]; const n=daysUntil(it.date); return `<li style="${m?`--mc:var(${m.color})`:""}"><span class="dot"></span><span class="mt">${esc(it.title)}</span><span class="mw ${n<0?"over":n<=3?"soon":""}">${n<0?"overdue":n===0?"today":n===1?"tmrw":n<14?n+" days":Math.round(n/7)+" wks"}</span></li>`; }).join("")}</ul>` : `<p>${DL.mode==="loading"?"Loading…":"Nothing scheduled."}</p>`);
  const b = document.getElementById("miniadd"); if (b) b.onclick = () => { DL.formOpen = DL.formOpen || {}; DL.formOpen.all = true; if (location.hash==="#home"||!location.hash) route(); else location.hash = "home"; };
}

function deadlinesPanel(mid){
  return `<section class="dl" data-dl="${mid||""}" aria-label="Deadlines"></section>`;
}
function renderDeadlines(el, mid){
  const all = DL.items.filter(i => !mid || i.module===mid);
  const open = all.filter(i=>!i.done).sort((a,b)=> (a.date+(a.time||"")).localeCompare(b.date+(b.time||"")));
  const done = all.filter(i=>i.done).sort((a,b)=> b.date.localeCompare(a.date));
  const sem = S.semesters[0].modules;
  const modOpt = id => { const m = S.modules[id]; return `<option value="${id}" ${id===mid?"selected":""}>${m.code} ${esc(m.name)}</option>`; };
  const row = it => {
    const m = S.modules[it.module]; const n = daysUntil(it.date);
    const urg = it.done ? "" : n<0 ? "over" : n<=3 ? "soon" : n<=7 ? "week" : "";
    const confirming = DL.confirm===it.id;
    return `<li class="dli ${urg} ${it.done?"isdone":""}" style="${m?`--mc:var(${m.color})`:""}">
      <input type="checkbox" class="dlck" data-dl-done="${it.id}" ${it.done?"checked":""} ${DL.canWrite?"":"disabled"} aria-label="Mark ${esc(it.title)} done">
      <div class="dlmain"><div class="dltitle">${esc(it.title)}</div>
        <div class="dlmeta"><span class="dltype t-${(it.type||"Other").toLowerCase()}">${esc(it.type||"Other")}</span>${m&&!mid?`<a class="dlmod" href="#${it.module}">${m.code}</a>`:!m?`<span class="dlmod gen">General</span>`:""}<span>${fmtDate(it.date, it.time)}</span></div></div>
      <div class="dlwhen">${it.done?"Done":whenLabel(n)}</div>
      ${DL.canWrite?`<button class="dlx ${confirming?"confirm":""}" data-dl-del="${it.id}" aria-label="Delete ${esc(it.title)}">${confirming?"Delete?":"✕"}</button>`:""}
    </li>`;
  };
  const scope = mid ? `${S.modules[mid].code} work orders` : "Work orders";
  const key = mid||"all"; const formOpen = !!(DL.formOpen && DL.formOpen[key]);
  el.innerHTML = `<div class="dlhead"><h2>${scope}</h2>${DL.canWrite?`<button class="dladd" id="dladd-${key}" aria-expanded="${formOpen}" aria-controls="dlform-${key}" title="Add a deadline"><span aria-hidden="true">${formOpen?"−":"+"}</span><span class="sr">Add a deadline</span></button>`:""}<span class="small dlstat">${DL.mode==="loading"?"Loading…":DL.mode==="local"?"Saved in this browser only":`${open.length} open · tests, labs &amp; deadlines`}</span></div>
    ${DL.canWrite?`<form class="dlform" id="dlform-${mid||"all"}" autocomplete="off" ${formOpen?"":"hidden"}>
      <input id="dl-title-${mid||"all"}" name="title" required maxlength="120" placeholder="${mid?"e.g. Class test 2 or Load cell lab report":"e.g. MEC1015 class test"}" aria-label="What's due">
      ${mid?`<input type="hidden" name="module" value="${mid}">`:`<select id="dl-mod-all" name="module" aria-label="Module"><option value="general">General</option>${sem.map(modOpt).join("")}</select>`}
      <select id="dl-type-${mid||"all"}" name="type" aria-label="Type">${DL_TYPES.map(t=>`<option>${t}</option>`).join("")}</select>
      <input id="dl-date-${mid||"all"}" name="date" type="date" required value="" aria-label="Date">
      <input id="dl-time-${mid||"all"}" name="time" type="time" aria-label="Time (optional)">
      <button class="btn primary small" type="submit">Add</button>
    </form>`:""}
    ${open.length ? `<ul class="dllist">${open.map(row).join("")}</ul>` : `<p class="dlempty">${DL.mode==="loading"?"Loading your deadlines…":`Nothing scheduled${mid?" for this module":""}. Use + to add your next test, lab or assignment.`}</p>`}
    ${done.length ? `<details class="dldone"><summary>Completed (${done.length})</summary><ul class="dllist">${done.map(row).join("")}</ul></details>` : ""}`;
  const addBtn = el.querySelector(".dladd");
  if (addBtn) addBtn.onclick = () => { DL.formOpen = DL.formOpen || {}; DL.formOpen[key] = !formOpen; renderDeadlines(el, mid); if (DL.formOpen[key]) { const t = el.querySelector("input[name=title]"); t && t.focus(); } };
  const f = el.querySelector("form");
  if (f) f.onsubmit = async e => { e.preventDefault(); const fd = new FormData(f);
    const x = { title: String(fd.get("title")).trim(), module: String(fd.get("module")||"general"), type: String(fd.get("type")), date: String(fd.get("date")), time: String(fd.get("time")||""), done: false, created: Date.now() };
    if (!x.title || !x.date) return;
    f.querySelector("button").disabled = true;
    try { await DL.api.add(x); toast("Added"); DL.formOpen[key] = false; renderDeadlines(el, mid); } catch(err){ toast(err && err.code==="quota_exceeded" ? "List is full. Delete some old items." : "Couldn't save. Try again."); }
  };
  el.querySelectorAll("[data-dl-done]").forEach(cb => cb.onchange = async () => { try { await DL.api.update(cb.dataset.dlDone, {done: cb.checked}); } catch(e){ toast("Couldn't save. Try again."); cb.checked = !cb.checked; } });
  el.querySelectorAll("[data-dl-del]").forEach(b => b.onclick = async () => {
    const id = b.dataset.dlDel;
    if (DL.confirm !== id){ DL.confirm = id; dlChanged(); setTimeout(()=>{ if(DL.confirm===id){ DL.confirm=null; dlChanged(); } }, 4000); return; }
    DL.confirm = null; try { await DL.api.remove(id); toast("Deleted"); } catch(e){ toast("Couldn't delete. Try again."); dlChanged(); }
  });
}


/* ---------- theory links & provenance ---------- */
const SLIDES = new Set([2,3,4,5,6,7,8,9,10,11,12,14]);
const SHEET_ANS = new Set([1,15,16,17,18,19,20,21,22,24,25,26,29,30,31,33,34]);
function provenance(src){
  const m = /^Tutorial Q([\d\s&Q]+)/.exec(src);
  if (m){ const n = (m[1].match(/\d+/g)||[]).map(Number);
    if (n.some(x=>SLIDES.has(x))) return "Follows the lecturer's solution slides, written out step by step with the numbers checked.";
    if (n.some(x=>SHEET_ANS.has(x))) return "Worked by Claude. The tutorial sheet only gives the final answer, which this was checked against.";
    return "Worked by Claude. The tutorial sheet gives no answer for this one."; }
  if (/^Lecture/.test(src)) return "From the worked example in the lecture notes.";
  return "Worked by Claude. There are no marking schemes for the past papers in your folder.";
}
function theoryHeads(t){ return [...t.theory.matchAll(/<h3>(.*?)<\/h3>/g)].map(m=>m[1].replace(/<[^>]+>/g,"")); }
function numberHeads(html){ let i=-1; return html.replace(/<h3>/g, () => `<h3 id="th-${++i}" tabindex="-1">`); }
function hintBlock(mid, t, q, ret){
  const heads = theoryHeads(t);
  const links = (q.see||[]).filter(n=>heads[n]).map(n=>`<button class="thlink" data-th="${t.id}|${n}" data-ret="${esc(JSON.stringify(ret))}">${esc(heads[n])}</button>`).join("");
  if (!q.hint && !links) return "";
  return `<details><summary>Hint</summary><div class="sol">${q.hint||""}${links?`<div class="thlinks"><span class="small">Revise the theory:</span>${links}</div>`:""}</div></details>`;
}
let PENDING = null;
function wireTheoryLinks(mid, curTopic){
  app.querySelectorAll("[data-th]").forEach(b => b.onclick = () => {
    const [tid, n] = b.dataset.th.split("|"); const ret = JSON.parse(b.dataset.ret);
    if (tid === curTopic){ goTheory(n, ret); }
    else { PENDING = {n, ret}; location.hash = mid+"."+tid; }
  });
}
function goTheory(n, ret){
  const h = document.getElementById("th-"+n); if(!h) return;
  h.scrollIntoView({block:"start"}); h.focus({preventScroll:true}); h.classList.add("flash"); setTimeout(()=>h.classList.remove("flash"),1600);
  let fb = document.getElementById("retbtn"); if (fb) fb.remove();
  fb = document.createElement("button"); fb.id="retbtn"; fb.className="retbtn"; fb.textContent = "↩ Back to "+ret.label;
  fb.onclick = () => { fb.remove(); if (location.hash.slice(1) === ret.hash){ const el = document.getElementById(ret.id); el && el.scrollIntoView({block:"start"}); } else { PENDING = {back: ret.id}; location.hash = ret.hash; } };
  document.body.appendChild(fb);
}

/* ---------- views ---------- */
function home(){
  const sem = curSem();
  const ready = sem.modules.filter(id=>S.content[id]);
  const nTopics = ready.reduce((a,id)=>a+S.content[id].topics.length,0), nQ = ready.reduce((a,id)=>a+S.content[id].topics.reduce((x,t)=>x+t.questions.length,0),0);
  let h = `<div class="hero"><img class="heroimg" src="${S.art.bay}" alt="" style="object-position:62% 12%"><div class="sign" aria-hidden="true"><span class="tri"><i></i></span><span class="txt"><b>Caution</b><span>Unit in maintenance</span></span></div><div class="hero-txt"><div class="wrap">
    <span class="eyebrow">DCU · ${esc(sem.year||"Year 3")} · Engineering hangar</span>
    <h1>${esc(sem.year||"Year 3")} · ${esc(sem.name)}</h1>
    <div class="readout"><span><b>${sem.modules.length}</b> modules docked</span><span><b>${nTopics}</b> topics ready</span><span><b>${nQ}</b> practice questions</span></div>
  </div></div></div><div class="grate" aria-hidden="true"></div><main><div class="wrap">
  ${deadlinesPanel(null)}`;
  if(!sem.modules.length){
    h += `<div class="empty"><b>${esc(sem.name)}</b> (${esc(sem.note)}) has no modules yet. Add the folder for next semester and ask Claude in the chat to build it in the same format.</div>`;
  } else {
    h += `<h2 class="mods-h">Modules</h2><div class="grid">` + sem.modules.map(id => {
      const m = S.modules[id]; const c = S.content[id];
      const n = c ? c.topics.length : (m.planned||[]).length;
      const p = progress(id);
      return `<a class="mod" href="#${id}" style="--mc:var(${m.color})">
        <span class="code">${m.code}</span><h3>${esc(m.name)}</h3>
        <div class="foot">${m.ready ? `<span class="chip ready">${n} topics ready</span>` : `<span class="chip pending">${n} topics planned</span>`}
        ${m.ready ? `<span class="meter" title="${p.done} of ${p.total} topics marked confident"><i style="width:${p.total?100*p.done/p.total:0}%"></i></span>` : ``}</div></a>`;
    }).join("") + `</div>`;
  }
  h += `</div></main>`;
  app.innerHTML = h; dlChanged(); mountHangars();
}

function subnav(){ return ""; }
function wireSubnav(){}

function module(mid){
  const m = S.modules[mid]; if(!m) return home();
  const c = S.content[mid];
  let h = subnav(mid,"topics") + `<div class="hero short" style="--mc:var(${m.color})"><img class="heroimg" src="${S.art.head}" alt="" style="object-position:60% 32%"><div class="sign dark" aria-hidden="true"><span class="tri"><i></i></span><span class="txt"><b>Authorised</b><span>Personnel only</span></span></div><div class="hero-txt"><div class="wrap">
    <span class="plateid">${m.code}</span>
    <h1>${esc(m.name)}</h1>
    <div class="readout">${m.assess?`<span><b>Assessment</b> ${esc(m.assess)}</span>`:`<span>${esc(m.blurb)}</span>`}</div>
  </div></div></div><div class="grate" aria-hidden="true"></div><main style="--mc:var(${m.color})"><div class="wrap">`;
  h += deadlinesPanel(mid);
  if (c){
    const r = ratings(mid); const parts = [...new Set(c.topics.map(t=>t.part))];
    h += `<h2 class="ovh">Progress</h2><div class="ovgrid">` + parts.map((p,pi)=>{ const ts=c.topics.filter(t=>t.part===p); const g=ts.filter(t=>r[t.id]==="good").length, bd=ts.filter(t=>r[t.id]==="bad").length;
      return `<a class="ovcard" href="#${mid}.${ts[0].id}"><span class="pn">${pi+1}</span><span class="ovt">${esc(p)}</span><span class="ovm">${ts.length} topics · ${g} confident${bd?` · ${bd} need work`:""}</span><span class="meter"><i style="width:${100*g/ts.length}%"></i></span></a>`; }).join("") + `</div>`;
  } else {
    h += `<div class="empty">Topic pages for this module haven't been written yet. The pages panel lists the topics found in your lecture files. Ask in the chat when you want this one built.</div>`;
  }
  h += askBox() + `</div></main>`;
  app.innerHTML = h;
  wireSubnav(mid); dlChanged(); mountHangars();
}

/* ---------- tutorials ---------- */
function tutQuestions(mid, tut){
  const c = S.content[mid]; let qs = [];
  if (tut.fromTopics){
    c.topics.forEach(t => t.questions.forEach(q => {
      const pre = typeof tut.fromTopics === "string" ? tut.fromTopics : "Tutorial ";
      if (q.src.indexOf(pre) !== 0) return;
      const mm = /^(Q[\d\s&,Q]+)/.exec(q.src.slice(pre.length)); if(!mm) return;
      const nums = (mm[1].match(/\d+/g)||[]).map(Number);
      qs.push(Object.assign({}, q, {nums, topic:t.id}));
    }));
  }
  (tut.questions||[]).forEach(q => qs.push(q));
  qs.sort((a,b)=>a.nums[0]-b.nums[0]);
  return qs;
}
function tutorials(mid){
  const m = S.modules[mid], c = S.content[mid];
  const list = c && c.tutorials;
  let h = subnav(mid,"tutorials") + `<div class="band" style="--mc:var(${m.color})"><div class="wrap">
    <nav class="crumbs"><a href="#${mid}">${m.code}</a><span>/</span><span>Tutorials</span></nav>
    <span class="plateid">Field manual</span>
    <h1>Tutorials</h1><p class="lede">${list ? "Tutorial sheets with every question, its figure, a hint and a worked solution. Tick questions off as you finish them." : "Tutorial sheets for this module will be added here as they're released."}</p>
  </div></div><main style="--mc:var(${m.color})"><div class="wrap">`;
  if (list){
    h += `<ul class="topics">` + list.map(t => { const qs = tutQuestions(mid,t); const done = store.get("done:"+mid+":"+t.id, {}); const d = qs.filter(q=>done[q.nums[0]]).length;
      return `<li><a class="trow" href="#${mid}.tut-${t.id}"><span class="n">${esc(t.short||"T")}</span><span class="tt">${esc(t.title)}</span><span class="sub">${esc(t.note||"")} · ${qs.length} questions</span><span class="right"><span class="chip ${d===qs.length?"done":""}">${d} / ${qs.length} done</span></span></a></li>`; }).join("") + `</ul>`;
  }
  if (m.tutorials && m.tutorials.length){
    h += `${list?`<h2 style="margin-top:28px">Still to build</h2>`:""}<ul class="topics">` + m.tutorials.map((t,i)=>`<li><div class="trow off"><span class="n">${String(i+1).padStart(2,"0")}</span><span class="tt">${esc(t)}</span><span class="right"><span class="chip">Coming</span></span></div></li>`).join("") + `</ul>`;
  } else if (!list) {
    h += `<div class="empty">No tutorial sheets for this module in your folder yet. When one comes out, drop it in the module's Tutorials folder and ask in the chat to add it.</div>`;
  }
  h += askBox() + `</div></main>`;
  app.innerHTML = h; wireSubnav(mid);
}
function tutorial(mid, id){
  const m = S.modules[mid], c = S.content[mid];
  const tut = c && c.tutorials && c.tutorials.find(t=>t.id===id); if(!tut) return tutorials(mid);
  const qs = tutQuestions(mid, tut);
  const titles = Object.fromEntries(c.topics.map(t=>[t.id,t.title]));
  const key = "done:"+mid+":"+id; const done = store.get(key, {});
  const label = q => "Q"+q.nums.join(" & Q");
  let h = subnav(mid,"tutorials") + `<div class="band" style="--mc:var(${m.color})"><div class="wrap">
    <nav class="crumbs"><a href="#${mid}">${m.code}</a><span>/</span><a href="#${mid}.tutorials">Tutorials</a><span>/</span><span>${esc(tut.title)}</span></nav>
    <h1>${esc(tut.title)}</h1><p class="lede">${esc(tut.intro||"")}</p>
  </div></div><main style="--mc:var(${m.color})"><div class="wrap">
  <div class="qgrid-head"><span class="small"><b id="donecount"></b> done. Jump to a question:</span><button class="btn small" id="cleardone">Clear ticks</button></div>
  <nav class="qgrid" aria-label="Questions">${qs.map(q=>`<a href="#${mid}.tut-${id}" data-go="tq${q.nums[0]}" class="${done[q.nums[0]]?"done":""}" data-n="${q.nums[0]}">${q.nums.join("+")}</a>`).join("")}</nav>
  <div class="qlist">`;
  let lastPart = null;
  qs.forEach((q,i) => {
    const t = c.topics.find(x=>x.id===q.topic);
    if (t && t.part !== lastPart){ lastPart = t.part; h += `<h2 class="tsec">${esc(t.part)}</h2>`; }
    const figs = [].concat(q.fig||[], q.nums.map(n=>tut.figs&&tut.figs[n]).filter(Boolean));
    h += `<article class="q ${done[q.nums[0]]?"is-done":""}" id="tq${q.nums[0]}"><div class="qh"><span class="qn">${label(q)}</span>${t?`<a class="src" href="#${mid}.${t.id}" style="text-decoration:none">Topic: ${esc(t.title)}</a>`:""}
      <label class="tick"><input type="checkbox" data-done="${q.nums[0]}" ${done[q.nums[0]]?"checked":""}> Done</label></div>
      <div class="qt">${q.q}</div>
      ${figs.map(f=>`<figure class="tfig"><img src="${S.figs[f]}" alt="Figure from the tutorial sheet for ${label(q)}"></figure>`).join("")}
      ${t ? hintBlock(mid, t, q, {hash: mid+".tut-"+id, id: "tq"+q.nums[0], label: label(q)}) : (q.hint?`<details><summary>Hint</summary><div class="sol">${q.hint}</div></details>`:"")}
      ${q.sol?`<details><summary>Worked solution</summary><div class="sol">${q.sol}${q.ans?`<div class="ans">Answer: ${esc(q.ans)}</div>`:""}<p class="prov">${esc(q.prov||provenance(q.src||("Tutorial Q"+q.nums.join(" & Q"))))}</p></div></details>`:""}
      <div class="tools"><button class="btn small" data-copy="${i}">Copy question for Claude</button>${t?`<a class="btn small" href="#${mid}.${t.id}">Revise the theory</a>`:""}</div></article>`;
  });
  h += `</div>` + askBox() + `</div></main>`;
  app.innerHTML = h; wireSubnav(mid);
  const count = () => { const d = store.get(key, {}); document.getElementById("donecount").textContent = `${qs.filter(q=>d[q.nums[0]]).length} of ${qs.length}`; };
  app.querySelectorAll("[data-done]").forEach(cb => cb.onchange = () => { const d = store.get(key, {}); const n = cb.dataset.done; if (cb.checked) d[n]=1; else delete d[n]; store.set(key, d);
    cb.closest("article").classList.toggle("is-done", cb.checked); app.querySelector(`.qgrid [data-n="${n}"]`).classList.toggle("done", cb.checked); count(); });
  app.querySelectorAll("[data-go]").forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById(a.dataset.go).scrollIntoView(); });
  document.getElementById("cleardone").onclick = () => { store.set(key, {}); tutorial(mid, id); };
  app.querySelectorAll("[data-copy]").forEach(b => b.onclick = () => { const q = qs[+b.dataset.copy]; copy(`${m.code} ${m.name} · ${tut.title} · ${label(q)}\n\n${plain(q.q)}\n\nMy question: `); });
  count(); typeset(app); wireTheoryLinks(mid, null);
  if (PENDING && PENDING.back){ const id2 = PENDING.back; PENDING = null; setTimeout(()=>{ const el=document.getElementById(id2); el && el.scrollIntoView({block:"start"}); }, 60); }
}

function askBox(){ return ""; }

function topic(mid, tid){
  const m = S.modules[mid], c = S.content[mid]; if(!c) return module(mid);
  const idx = c.topics.findIndex(t=>t.id===tid); if(idx<0) return module(mid);
  const t = c.topics[idx], prev = c.topics[idx-1], next = c.topics[idx+1];
  const rate = ratings(mid)[t.id];
  let h = subnav(mid,"topics",tid) + `<div class="band" style="--mc:var(${m.color})"><div class="wrap">
    <span class="plateid">Schematic ${[...new Set(c.topics.map(x=>x.part))].indexOf(t.part)+1}.${c.topics.filter(x=>x.part===t.part).indexOf(t)+1}</span>
    <div class="eyebrow" style="margin-top:14px">${esc(t.part)} · ${esc(t.lectures)}</div>
    <h1>${esc(t.title)}</h1><p class="lede">${esc(t.summary)}</p>
  </div></div><main style="--mc:var(${m.color})"><div class="wrap"><div class="topic-layout">
  <nav class="toc" aria-label="On this page">
    <a href="#${mid}.${tid}" data-jump="theory">Theory</a><a href="#${mid}.${tid}" data-jump="formulae">Formulae</a><a href="#${mid}.${tid}" data-jump="practice">Practice (${t.questions.length})</a>${t.traps&&t.traps.length?`<a href="#${mid}.${tid}" data-jump="traps">Hazards</a>`:""}
    <div class="rate"><p>System status</p>
      <button class="rbtn good" data-rate="good" aria-pressed="${rate==="good"}">✓ Mission ready</button>
      <button class="rbtn bad" data-rate="bad" aria-pressed="${rate==="bad"}">⚠ Needs work</button></div>
  </nav><div>
  <section class="block" id="theory"><h2>Theory <small>operating manual</small></h2><div class="prose">${numberHeads(t.theory)}</div></section>
  <section class="block" id="formulae"><h2>Formulae <small>spec sheet · ${t.formulas.length}</small></h2><div class="formulas">${t.formulas.map(f=>`<div class="fcard"><div class="fn">${esc(f.name)}</div><div class="fx">$$${f.tex}$$</div>${f.note?`<div class="fnote">${esc(f.note)}</div>`:""}</div>`).join("")}</div></section>
  <section class="block" id="practice"><h2>Practice <small>field tests · tutorial &amp; past papers</small></h2><div class="qlist">${t.questions.map((q,i)=>`
    <article class="q" id="pq${i}"><div class="qh"><span class="qn">Q${i+1}</span><span class="src">${esc(q.src)}</span></div>
    <div class="qt">${q.q}</div>
    ${[].concat(q.fig||[]).map(f=>`<figure class="tfig"><img src="${S.figs[f]}" alt="Figure for Q${i+1}"></figure>`).join("")}
    ${hintBlock(mid, t, q, {hash: mid+"."+tid, id: "pq"+i, label: "Q"+(i+1)})}
    <details><summary>Worked solution</summary><div class="sol">${q.sol}${q.ans?`<div class="ans">Answer: ${esc(q.ans)}</div>`:""}<p class="prov">${esc(q.prov||provenance(q.src))}</p></div></details>
    <div class="tools"><button class="btn small" data-copy="${i}">Copy question for Claude</button></div></article>`).join("")}</div>
</section>
  ${t.traps&&t.traps.length?`<section class="block" id="traps"><h2>Hazards <small>common traps</small></h2><ul class="traps">${t.traps.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>`:""}
  ${askBox(t.title)}
  <div class="pager">${prev?`<a href="#${mid}.${prev.id}"><small>← Previous</small>${esc(prev.title)}</a>`:"<span></span>"}${next?`<a class="nx" href="#${mid}.${next.id}"><small>Next →</small>${esc(next.title)}</a>`:""}</div>
  </div></div></div></main>`;
  app.innerHTML = h; wireSubnav(mid);
  app.querySelectorAll("[data-jump]").forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById(a.dataset.jump).scrollIntoView(); });
  app.querySelectorAll("[data-rate]").forEach(b => b.onclick = () => {
    const r = ratings(mid); r[t.id] = (r[t.id]===b.dataset.rate) ? undefined : b.dataset.rate; store.set("rate:"+mid, r);
    app.querySelectorAll("[data-rate]").forEach(x => x.setAttribute("aria-pressed", String(r[t.id]===x.dataset.rate)));
    renderPages(mid, tid);
  });
  app.querySelectorAll("[data-copy]").forEach(b => b.onclick = () => {
    const q = t.questions[+b.dataset.copy];
    copy(`${m.code} ${m.name} · ${t.title} · ${q.src}\n\n${plain(q.q)}\n\nMy question: `);
  });
  drawPlots(app); typeset(app); wireTheoryLinks(mid, tid);
  if (PENDING){ const p = PENDING; PENDING = null; setTimeout(() => { if (p.n!==undefined) goTheory(p.n, p.ret); else if (p.back){ const el=document.getElementById(p.back); el && el.scrollIntoView({block:"start"}); } }, 60); }
}

function drill(mid){
  const m = S.modules[mid], c = S.content[mid]; if(!c||!c.mcq) return module(mid);
  const filt = store.get("drill:"+mid, "all");
  const titles = Object.fromEntries(c.topics.map(t=>[t.id,t.title]));
  const list = c.mcq.filter(q => filt==="all" || q.t===filt);
  const used = [...new Set(c.mcq.map(q=>q.t))];
  let h = subnav(mid,"mcq") + `<div class="band" style="--mc:var(${m.color})"><div class="wrap">
    <nav class="crumbs"><a href="#${mid}">${m.code}</a><span>/</span><span>MCQ drill</span></nav>
    <span class="plateid">Target range</span>
    <h1>Past-paper MCQ drill</h1><p class="lede">Questions from the 2023 resit, 2024, 2025 and 2025 resit papers. The questions and options are copied exactly from the papers. The answers and explanations are worked out by Claude, since there are no official keys in your folder. In the exam each is worth 2 marks with no negative marking, so never leave one blank.</p>
  </div></div><main style="--mc:var(${m.color})"><div class="wrap">
  <div class="drill-bar"><label for="dfilter" class="small">Topic</label><select id="dfilter"><option value="all">All topics (${c.mcq.length})</option>${used.map(id=>`<option value="${id}" ${filt===id?"selected":""}>${esc(titles[id]||id)} (${c.mcq.filter(q=>q.t===id).length})</option>`).join("")}</select>
  <button class="btn small" id="dreset">Reset answers</button><span class="score" id="dscore"></span></div>
  <div class="qlist">${list.map((q,i)=>`<article class="q" data-q="${c.mcq.indexOf(q)}"><div class="qh"><span class="qn">Q${i+1}</span><span class="src">${esc(q.s)}</span><a class="src" href="#${mid}.${q.t}" style="text-decoration:none">${esc(titles[q.t]||"")}</a></div>
    <div class="qt">${q.q}</div><div class="opts">${q.o.map((o,j)=>`<button class="opt" data-o="${j}"><b>${"ABCD"[j]}</b><span>${o}</span></button>`).join("")}</div><div class="why" hidden></div></article>`).join("")}</div>
  ${askBox("MCQ drill")}</div></main>`;
  app.innerHTML = h; wireSubnav(mid);
  const answers = store.get("ans:"+mid, {});
  const score = () => { const ids = list.map(q=>c.mcq.indexOf(q)).filter(i=>answers[i]!==undefined); const ok = ids.filter(i=>answers[i]===c.mcq[i].a).length; document.getElementById("dscore").textContent = ids.length? `${ok} / ${ids.length} correct` : `${list.length} questions`; };
  const show = (art) => { const qi=+art.dataset.q, q=c.mcq[qi], a=answers[qi]; if(a===undefined) return;
    art.querySelectorAll(".opt").forEach(b=>{ const j=+b.dataset.o; b.disabled=true; if(j===q.a) b.classList.add("right"); else if(j===a) b.classList.add("wrong"); });
    const w = art.querySelector(".why"); w.hidden=false; w.innerHTML = `<b style="color:var(${a===q.a?"--good":"--bad"})">${a===q.a?"Correct.":"Not quite. Answer: "+"ABCD"[q.a]+"."}</b> ${q.w}`; typeset(w); };
  app.querySelectorAll("article[data-q]").forEach(art => { show(art); art.querySelectorAll(".opt").forEach(b => b.onclick = () => { answers[+art.dataset.q] = +b.dataset.o; store.set("ans:"+mid, answers); show(art); score(); }); });
  document.getElementById("dfilter").onchange = e => { store.set("drill:"+mid, e.target.value); drill(mid); };
  document.getElementById("dreset").onclick = () => { store.set("ans:"+mid, {}); drill(mid); };
  score(); typeset(app);
}

/* ---------- plots ---------- */
function svg(w,h,body){ return `<svg viewBox="0 0 ${w} ${h}" role="img" font-family="Source Sans 3, sans-serif" font-size="13">${body}</svg>`; }
function poly(fn, x0, x1, X, Y, n=160){ let p=[]; for(let i=0;i<=n;i++){ const x=x0+(x1-x0)*i/n; p.push(`${X(x).toFixed(1)},${Y(fn(x)).toFixed(1)}`);} return p.join(" "); }
function axes(L,T,W,H,xl,yl){ return `<line x1="${L}" y1="${T+H}" x2="${L+W}" y2="${T+H}" stroke="var(--muted)"/><line x1="${L}" y1="${T}" x2="${L}" y2="${T+H}" stroke="var(--muted)"/><text x="${L+W}" y="${T+H+18}" text-anchor="end" fill="var(--muted)">${xl}</text><text x="${L-8}" y="${T+4}" text-anchor="end" fill="var(--muted)">${yl}</text>`; }
const PLOTS = {
  steps(){ const L=40,T=16,W=480,H=180, X=t=>L+t/10*W, Y=y=>T+H-y/1.5*H;
    const z=1, wn=1.6, zeta=0.25, wd=wn*Math.sqrt(1-zeta*zeta);
    const second=t=> t<1?0: 1-Math.exp(-zeta*wn*(t-1))*(Math.cos(wd*(t-1))+zeta/Math.sqrt(1-zeta*zeta)*Math.sin(wd*(t-1)));
    const first=t=> t<1?0: 1-Math.exp(-(t-1)/1.5);
    return svg(560,240, axes(L,T,W,H,"time","output") +
      `<line x1="${X(0)}" y1="${Y(1)}" x2="${X(10)}" y2="${Y(1)}" stroke="var(--rule)" stroke-dasharray="4 4"/>`+
      `<polyline fill="none" stroke="var(--ink)" stroke-width="2" points="${X(0)},${Y(0)} ${X(1)},${Y(0)} ${X(1)},${Y(1)} ${X(10)},${Y(1)}"/>`+
      `<polyline fill="none" stroke="var(--mc)" stroke-width="2.5" points="${poly(first,0,10,X,Y)}"/>`+
      `<polyline fill="none" stroke="var(--warn)" stroke-width="2.5" points="${poly(second,0,10,X,Y)}"/>`+
      `<line x1="${X(2.5)}" y1="${Y(0.632)}" x2="${X(2.5)}" y2="${Y(0)}" stroke="var(--mc)" stroke-dasharray="3 3"/><text x="${X(2.5)}" y="${Y(0)-6}" text-anchor="middle" fill="var(--mc)">τ</text>`+
      `<text x="${X(6.2)}" y="${Y(1)-8}" fill="var(--ink)">zero order (= input step)</text><text x="${X(4.1)}" y="${Y(0.82)+4}" fill="var(--mc)">first order</text><text x="${X(2.3)}" y="${Y(1.42)}" fill="var(--warn)">underdamped 2nd order</text>`)
      + `<figcaption>Step responses. First order reaches 63% at t = τ; underdamped second order overshoots and rings.</figcaption>`; },
  drift(){ const L=40,T=12,W=460,H=180, X=x=>L+x/3.3*W, Y=y=>T+H-y/75*H;
    return svg(540,230, axes(L,T,W,H,"load (kg)","deflection (mm)") +
      `<polyline fill="none" stroke="var(--mc)" stroke-width="2.5" points="${X(0)},${Y(0)} ${X(3)},${Y(60)}"/>`+
      `<polyline fill="none" stroke="var(--warn)" stroke-width="2.5" points="${X(0)},${Y(5)} ${X(3)},${Y(71)}"/>`+
      [0,1,2,3].map(x=>`<circle cx="${X(x)}" cy="${Y(20*x)}" r="3.5" fill="var(--mc)"/><circle cx="${X(x)}" cy="${Y(5+22*x)}" r="3.5" fill="var(--warn)"/>`).join("")+
      `<text x="${X(3)+6}" y="${Y(60)+4}" fill="var(--mc)">20°C</text><text x="${X(3)+6}" y="${Y(71)+4}" fill="var(--warn)">30°C</text>`+
      `<text x="${X(0)+8}" y="${Y(5)-6}" fill="var(--warn)">zero drift 5 mm</text>`)
      + `<figcaption>Spring balance: the 30°C line is shifted up (zero drift) and steeper (sensitivity drift).</figcaption>`; },
  normal(){ const L=20,T=14,W=500,H=170, X=z=>L+(z+3.6)/7.2*W, Y=y=>T+H-y/0.42*H, f=z=>Math.exp(-z*z/2)/Math.sqrt(2*Math.PI);
    const band=(a,b,op)=>`<polygon fill="var(--mc)" fill-opacity="${op}" points="${X(a)},${Y(0)} ${poly(f,a,b,X,Y,60)} ${X(b)},${Y(0)}"/>`;
    return svg(540,220, band(-3,3,.12)+band(-2,2,.18)+band(-1,1,.28)+`<polyline fill="none" stroke="var(--mc)" stroke-width="2.5" points="${poly(f,-3.6,3.6,X,Y)}"/><line x1="${L}" y1="${Y(0)}" x2="${L+W}" y2="${Y(0)}" stroke="var(--muted)"/>`+
      [-3,-2,-1,0,1,2,3].map(z=>`<text x="${X(z)}" y="${Y(0)+16}" text-anchor="middle" fill="var(--muted)">${z===0?"x̄":(z>0?"+":"−")+Math.abs(z)+"σ"}</text>`).join("")+
      `<text x="${X(0)}" y="${Y(0.2)}" text-anchor="middle" fill="var(--ink)">68.3%</text><text x="${X(1.5)}" y="${Y(0.05)}" text-anchor="middle" fill="var(--ink)">95.4%</text><text x="${X(2.6)}" y="${Y(0.02)-14}" text-anchor="middle" fill="var(--ink)">99.7%</text>`)
      + `<figcaption>Areas under the normal curve within ±1σ, ±2σ, ±3σ of the mean.</figcaption>`; },
  lowpass(){ const L=44,T=14,W=460,H=170, X=w=>L+w/4*W, Y=g=>T+H-g/1.15*H, real=w=>1/Math.sqrt(1+w*w);
    return svg(540,226, axes(L,T,W,H,"frequency ω","|H|")+
      `<polyline fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 4" points="${X(0)},${Y(1)} ${X(1)},${Y(1)} ${X(1)},${Y(0)} ${X(4)},${Y(0)}"/>`+
      `<polyline fill="none" stroke="var(--mc)" stroke-width="2.5" points="${poly(real,0,4,X,Y)}"/>`+
      `<line x1="${L}" y1="${Y(0.707)}" x2="${X(1)}" y2="${Y(0.707)}" stroke="var(--warn)" stroke-dasharray="3 3"/><circle cx="${X(1)}" cy="${Y(0.707)}" r="4" fill="var(--warn)"/>`+
      `<text x="${L-6}" y="${Y(0.707)+4}" text-anchor="end" fill="var(--warn)">0.707</text><text x="${L-6}" y="${Y(1)+4}" text-anchor="end" fill="var(--muted)">1</text>`+
      `<text x="${X(1)+8}" y="${Y(0.707)-6}" fill="var(--warn)">−3 dB at ω_c</text><text x="${X(1)+8}" y="${Y(1)+16}" fill="var(--ink)">ideal</text><text x="${X(2.6)}" y="${Y(real(2.6))-8}" fill="var(--mc)">real (1st order)</text>`)
      + `<figcaption>Ideal low-pass (dashed) vs a real first-order filter. The cut-off is where gain falls to 1/√2.</figcaption>`; },
  sinc(){ const L=30,T=14,W=480,H=170, X=w=>L+(w+12)/24*W, Y=y=>T+H*0.78-y/2.1*H*0.78, f=w=>Math.abs(w)<1e-9?2:2*Math.sin(w)/w;
    return svg(540,220, `<line x1="${L}" y1="${Y(0)}" x2="${L+W}" y2="${Y(0)}" stroke="var(--muted)"/><line x1="${X(0)}" y1="${T}" x2="${X(0)}" y2="${T+H}" stroke="var(--muted)"/>`+
      `<polyline fill="none" stroke="var(--mc)" stroke-width="2.5" points="${poly(f,-12,12,X,Y,300)}"/>`+
      [-3,-2,-1,1,2,3].map(k=>`<text x="${X(k*Math.PI)}" y="${Y(0)+16}" text-anchor="middle" fill="var(--muted)">${k<0?"−":""}${Math.abs(k)===1?"":Math.abs(k)}π/τ</text>`).join("")+
      `<text x="${X(0)+8}" y="${Y(2)+4}" fill="var(--ink)">2τ</text><text x="${L+W}" y="${Y(0)-8}" text-anchor="end" fill="var(--muted)">ω</text>`)
      + `<figcaption>Spectrum of a rectangular pulse of width 2τ: F(ω) = 2τ sinc(ωτ), zeros at multiples of π/τ.</figcaption>`; },
  alias(){ const L=20,T=20,W=500,H=150, X=w=>L+w/1300*W, base=T+H;
    const line=(w,c,lab)=>`<line x1="${X(w)}" y1="${base}" x2="${X(w)}" y2="${base-90}" stroke="${c}" stroke-width="3"/><circle cx="${X(w)}" cy="${base-90}" r="3.5" fill="${c}"/><text x="${X(w)}" y="${base+16}" text-anchor="middle" fill="var(--muted)">${lab}</text>`;
    return svg(540,210, `<line x1="${L}" y1="${base}" x2="${L+W}" y2="${base}" stroke="var(--muted)"/>`+
      `<rect x="${X(0)}" y="${T}" width="${X(200)-X(0)}" height="${H}" fill="var(--mc)" fill-opacity=".08"/><line x1="${X(200)}" y1="${T}" x2="${X(200)}" y2="${base}" stroke="var(--warn)" stroke-dasharray="4 3"/><text x="${X(200)+4}" y="${T+12}" fill="var(--warn)">ω_s/2</text>`+
      line(150,"var(--mc)","150")+line(250,"var(--muted)","250")+line(550,"var(--muted)","550")+line(650,"var(--muted)","650")+line(950,"var(--muted)","950")+line(1050,"var(--muted)","1050")+
      `<text x="${X(400)}" y="${base+34}" text-anchor="middle" fill="var(--ink)">ω_s = 400</text><text x="${X(800)}" y="${base+34}" text-anchor="middle" fill="var(--ink)">2ω_s</text><text x="${X(1200)}" y="${base+34}" text-anchor="middle" fill="var(--ink)">3ω_s</text>`)
      + `<figcaption>cos 150t sampled at ω_s = 400 rad/s (tutorial Q28): the true line plus images at kω_s ± 150. Only the shaded band below ω_s/2 is analysable.</figcaption>`; },
  feedback(){ const box=(x,y,w,t)=>`<rect x="${x}" y="${y}" width="${w}" height="34" rx="5" fill="var(--paper)" stroke="var(--ink)"/><text x="${x+w/2}" y="${y+22}" text-anchor="middle" fill="var(--ink)">${t}</text>`;
    const arr=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--ink)" marker-end="url(#ah)"/>`;
    return svg(540,160, `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink)"/></marker></defs>`+
      `<text x="8" y="47" fill="var(--ink)">x</text>`+arr(22,42,88,42)+`<circle cx="100" cy="42" r="12" fill="var(--paper)" stroke="var(--ink)"/><text x="92" y="36" font-size="11" fill="var(--ink)">+</text><text x="96" y="64" font-size="13" fill="var(--ink)">−</text>`+
      arr(112,42,170,42)+`<text x="132" y="34" fill="var(--muted)">e</text>`+box(170,25,70,"k_A")+arr(240,42,300,42)+box(300,25,70,"G")+arr(370,42,500,42)+`<text x="510" y="47" fill="var(--ink)">y</text>`+
      `<text x="330" y="12" fill="var(--warn)">n</text>`+arr(335,14,335,25)+
      `<polyline fill="none" stroke="var(--ink)" points="440,42 440,118 300,118"/>`+box(230,101,70,"H")+arr(230,118,100,118)+arr(100,118,100,54))
      + `<figcaption>High gain plus feedback: with k_A·G·H ≫ 1, y ≈ x/H and the disturbance n is suppressed.</figcaption>`; }
};
function drawPlots(root){ root.querySelectorAll(".plot[data-plot]").forEach(el => { const f = PLOTS[el.dataset.plot]; if(f) el.outerHTML = `<figure class="plot" style="margin-left:0">${f()}</figure>`; }); }


/* ---------- styles (skins) ---------- */
const SKINS = [["classic","Classic"],["sleek","Sleek (blue & white)"],["workshop","Mech workshop (black & yellow)"],["chalk","Chalkboard"]];
function curSkin(){ return "workshop"; }
function setSkin(v){ store.set("skin", v); document.documentElement.dataset.skin = v; }
document.documentElement.dataset.skin = curSkin();

function mountHangars(){}

/* ---------- OneNote-style shell ---------- */
function curSem(){ const id = store.get("sem","s1"); return S.semesters.find(s=>s.id===id) || S.semesters[0]; }
function renderShell(mid, sub){
  const sem = curSem();
  const mp = document.getElementById("modpane");
  mp.className = "modpane" + (PANE.mobileMods ? " mopen" : "");
  mp.innerHTML = `<div class="semrow"><label class="sr" for="semsel">Year and semester</label>
      <select id="semsel" class="semsel">${S.semesters.map(s=>`<option value="${s.id}" ${s.id===sem.id?"selected":""}>${esc(s.year||"Year 3")} · ${esc(s.name)}</option>`).join("")}</select>
      <button class="mobmods" id="mobmods" aria-expanded="${PANE.mobileMods}" aria-controls="modlist">${mid&&S.modules[mid]?esc(S.modules[mid].code):"Modules"} ▾</button></div>
    <a class="homelink ${!mid?"on":""}" href="#home">Hangar overview</a><div class="panelabel">Modules</div>
    <nav id="modlist" class="modlist" aria-label="Modules in ${esc(sem.name)}">${sem.modules.length ? sem.modules.map((id,i)=>{ const m=S.modules[id]; return `<a href="#${id}" class="mrow ${id===mid?"on":""}" style="--mc:var(${m.color})"><span class="sw"></span><span class="mtx"><span class="mcode">${m.code}</span><span class="mname">${esc(m.name)}</span></span><span class="bay">B${String(i+1).padStart(2,"0")}</span></a>`; }).join("") : `<p class="small" style="padding:6px 10px">No modules in ${esc(sem.name)} yet.</p>`}</nav>
    <div class="mini" id="dlmini"></div>`;
  document.getElementById("semsel").onchange = e => { store.set("sem", e.target.value); location.hash = "home"; renderShell(null); };
  document.getElementById("mobmods").onclick = () => { PANE.mobileMods = !PANE.mobileMods; renderShell(mid, sub); };
  renderMini(document.getElementById("dlmini"));
  renderPages(mid, sub);
}
function renderPages(mid, sub){
  const pp = document.getElementById("pagepane");
  const m = mid && S.modules[mid];
  if (!m){ pp.className = "pagepane gone"; pp.innerHTML = ""; const sc0 = document.getElementById("scrim"); if (sc0) sc0.remove(); return; }
  const c = S.content[mid];
  pp.className = "pagepane " + (PANE.open ? "open" : "shut");
  pp.style.setProperty("--mc", `var(${m.color})`);
  const r = ratings(mid); const openParts = store.get("open:"+mid, null);
  let list = `<a class="pg ${!sub?"on":""}" href="#${mid}">Overview &amp; deadlines</a>`;
  const tuts = c && c.tutorials;
  list += `<a class="pg ${sub==="tutorials"?"on":""}" href="#${mid}.tutorials">Tutorials</a>`;
  if (tuts) list += tuts.map(t=>`<a class="pg sub2 ${sub==="tut-"+t.id?"on":""}" href="#${mid}.tut-${t.id}">${esc(t.title)}</a>`).join("");
  if (c && c.mcq) list += `<a class="pg ${sub==="mcq"?"on":""}" href="#${mid}.mcq">Past-paper MCQ drill</a>`;
  list += `<div class="pgrule"></div>`;
  if (c){
    const parts = [...new Set(c.topics.map(t=>t.part))];
    parts.forEach((p,pi) => {
      const ts = c.topics.filter(t=>t.part===p);
      const isOpen = openParts ? openParts.includes(pi) : ts.some(t=>t.id===sub);
      list += `<details class="pgpart" data-part="${pi}" ${isOpen||ts.some(t=>t.id===sub)?"open":""}><summary><span class="chev" aria-hidden="true"></span>${pi+1} · ${esc(p)}</summary>` +
        ts.map((t,j)=>`<a class="pg topic ${t.id===sub?"on":""}" href="#${mid}.${t.id}"><span class="tn">${pi+1}.${j+1}</span><span class="tl">${esc(t.title)}</span>${r[t.id]==="good"?`<span class="rk good" title="Confident">✓</span>`:r[t.id]==="bad"?`<span class="rk bad" title="Needs work">↻</span>`:""}</a>`).join("") + `</details>`;
    });
  } else {
    const parts = [...new Set(m.planned.map(x=>x[0]))];
    parts.forEach((p,pi) => { list += `<details class="pgpart"><summary><span class="chev" aria-hidden="true"></span>${pi+1} · ${esc(p)}</summary>` + m.planned.filter(x=>x[0]===p).map(x=>`<span class="pg topic off">${esc(x[1])}</span>`).join("") + `</details>`; });
  }
  pp.innerHTML = `<div class="ppinner" ${PANE.open?"":"hidden"}><div class="pphead"><span class="ppcode">${m.code}</span><span class="ppname">${esc(m.name)}</span><button class="pphide" id="pphide" aria-label="Hide pages"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M15 6l-6 6 6 6"></path></svg></button></div><nav class="pplist" aria-label="${m.code} pages">${list}</nav></div>
    <button class="ppstrip" id="ppstrip" aria-label="Show ${m.code} pages" ${PANE.open?"hidden":""}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg><span>${m.code} pages</span></button>`;
  document.getElementById("pphide").onclick = () => { PANE.open = false; renderPages(mid, sub); };
  document.getElementById("ppstrip").onclick = () => { PANE.open = true; renderPages(mid, sub); };
  pp.querySelectorAll("details.pgpart[data-part]").forEach(d => d.addEventListener("toggle", () => { store.set("open:"+mid, [...pp.querySelectorAll("details.pgpart[data-part]")].filter(x=>x.open).map(x=>+x.dataset.part)); }));
  pp.querySelectorAll("a.pg").forEach(a => a.addEventListener("click", () => { if (window.matchMedia("(max-width: 820px)").matches) { PANE.open = false; } }));
  let sc = document.getElementById("scrim");
  const showScrim = PANE.open && window.matchMedia("(max-width: 820px)").matches;
  if (showScrim && !sc){ sc = document.createElement("div"); sc.id = "scrim"; sc.className = "scrim"; document.body.appendChild(sc); }
  if (sc){ if (showScrim) sc.onclick = () => { PANE.open = false; renderPages(mid, sub); }; else sc.remove(); }
}


/* ---------- formula-sheet drawer (pull-out from the right) ---------- */
const DRAWER = { open: false, mid: null, zoom: {} };
function renderDrawer(mid){
  let host = document.getElementById("fsheet");
  if (!host){ host = document.createElement("div"); host.id = "fsheet"; document.body.appendChild(host);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && DRAWER.open){ DRAWER.open = false; renderDrawer(DRAWER.mid); } }); }
  const m = mid && S.modules[mid];
  if (!m){ host.innerHTML = ""; host.className = ""; DRAWER.open = false; DRAWER.mid = null; return; }
  if (DRAWER.mid !== mid){ DRAWER.mid = mid; DRAWER.zoom = {}; }
  const sh = (S.sheets && S.sheets[mid]) || { items: [] };
  const body = sh.items.length ? sh.items.map(it => `<section class="fs-item"><div class="fs-ih"><h3>${esc(it.title)}</h3><span class="fs-note">${esc(it.note||"")}</span></div>` +
      it.pages.map(k => `<button class="fs-page ${DRAWER.zoom[k]?"zoomed":""}" data-zoom="${k}" aria-label="Enlarge or shrink ${esc(it.title)}"><img src="${S.sheetImg[k]}" alt="${esc(it.title)}" loading="lazy"></button>`).join("") + `</section>`).join("")
    : `<div class="fs-blank"><div class="fs-warn"><span class="fs-tri" aria-hidden="true"></span><div><b>No formula sheet issued</b><span>${m.code} exam</span></div></div>${sh.blank?`<p class="fs-quip">${esc(sh.blank)}</p>`:""}</div>`;
  host.className = "fsheet" + (DRAWER.open ? " open" : "");
  host.style.setProperty("--mc", `var(${m.color})`);
  host.innerHTML = `<button class="fs-tab" id="fs-tab" aria-expanded="${DRAWER.open}" aria-controls="fs-panel"><span>Formula sheet</span></button>
    <div class="fs-scrim" id="fs-scrim" ${DRAWER.open?"":"hidden"}></div>
    <aside class="fs-panel" id="fs-panel" aria-label="${m.code} formula sheet" ${DRAWER.open?"":"inert"}>
      <div class="fs-head"><span class="fs-code">${m.code}</span><span class="fs-title">Formula sheet</span><button class="fs-close" id="fs-close" aria-label="Close formula sheet">✕</button></div>
      <div class="fs-body" id="fs-body">${body}</div>
    </aside>`;
  const toggle = v => { DRAWER.open = v; renderDrawer(mid); if (v) setTimeout(()=>{ const b=document.getElementById("fs-close"); b && b.focus({preventScroll:true}); }, 50); else { const t=document.getElementById("fs-tab"); t && t.focus({preventScroll:true}); } };
  document.getElementById("fs-tab").onclick = () => toggle(!DRAWER.open);
  document.getElementById("fs-close").onclick = () => toggle(false);
  document.getElementById("fs-scrim").onclick = () => toggle(false);
  host.querySelectorAll("[data-zoom]").forEach(b => b.onclick = () => { const k = b.dataset.zoom; DRAWER.zoom[k] = !DRAWER.zoom[k]; b.classList.toggle("zoomed", DRAWER.zoom[k]); });
}

/* ---------- router ---------- */
function route(){
  const h = (location.hash||"#home").slice(1);
  const [mid, sub] = h.split(".");
  const isTopic = sub && !["mcq","tutorials"].includes(sub) && !sub.startsWith("tut-");
  const narrow = window.matchMedia("(max-width: 820px)").matches;
  if (mid && S.modules[mid]) PANE.open = isTopic ? false : narrow ? !sub : true;
  PANE.mobileMods = false;
  renderShell(S.modules[mid] ? mid : null, sub);
  renderDrawer(S.modules[mid] ? mid : null);
  if (!mid || mid==="home" || !S.modules[mid]) home();
  else if (!sub) module(mid);
  else if (sub==="mcq") drill(mid);
  else if (sub==="tutorials") tutorials(mid);
  else if (sub.startsWith("tut-")) tutorial(mid, sub.slice(4));
  else topic(mid, sub);
  if (!PENDING) window.scrollTo(0,0);
  const rb = document.getElementById("retbtn"); if (rb && !PENDING) rb.remove();
}
window.addEventListener("hashchange", route);
route();
initDeadlines();
})();
