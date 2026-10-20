# Maintaining Study Bench

This file is the procedure for the scheduled "Study Bench: check Modules for new files" task. It tells you how to turn new course files into study content and ship them. Read all of it before changing anything.

## Where things live

| What | Where |
|---|---|
| Course files (read only, never edit or move) | Daniel's PC: `C:\Users\dnloc\OneDrive\Documents\DCU type shit\Modules\`, reached through the linked-computer tools (`$HOME/mnt/Modules` in the device shell) |
| Record of processed files | `Modules/.study-bench-processed.json` on the PC |
| Source code and content | `src/` in this repo |
| Hosted app (GitHub Pages) | repo root: `index.html`, `sw.js`, `manifest.webmanifest`, `img/`, `icons/` → https://dnl-oconnell.github.io/study-bench/ |
| Claude version (artifact) | https://claude.ai/artifact/HV8PCvTw1jbR1tGjM9cGPP (published from `src/study-bench.html`) |
| Daniel's local copy of the app | `Modules/Study Bench app/` (copy the repo-root web files there after each update) |

## The daily run, step by step

1. **Find new or changed files.** Use the device shell to list every file under `Modules` with its size and mtime. Ignore:
   - `Study Bench app/`
   - Office lock files (`~$*`)
   - `.Rproj.user/` and `.Rhistory`
   - the processed record itself

   Compare against `.study-bench-processed.json`. A file is **new** if its path isn't in the record. It is **changed** if its size differs from the record.

   **If nothing is new or changed, stop here:** don't clone, build or publish. Send Daniel nothing, or one line saying there was nothing new.
2. **Triage each new file:**
   - **Study material** (lecture notes, tutorial sheets and solutions, past papers and solutions, class tests and solutions, cheat sheets, formula tables) gets built into content.
   - **Admin and reference files** (seating lists, lab groups, rubrics, report templates, datasets, datasheets, R project files, images of pinouts) are recorded with `"status":"skipped"` and a short `"why"`.
   - **Assessment details** (a dated test, lab or assignment): mention them in the summary so Daniel can add a work order. Don't add work orders yourself.
3. **Get the repo.** Use `add_repo` (owner `Dnl-Oconnell`, repo `study-bench`, access `push`), then clone it. All edits happen in `src/`.
4. **Read the material.** Stage only the new files into the container (`device_stage_files`) and read them properly, slides and figures included. For .pptx/.docx/.doc/.xls, convert or extract text first.
5. **Write the content** (format below):
   - New lecture material → new topic(s), or an extended theory section in the matching existing topic.
   - New tutorial sheet → a tutorial entry, with questions linked to topics.
   - A solution to an existing sheet → fill in or correct `sol`/`ans` and set `prov`.
   - New past paper → past-paper questions on the relevant topics, plus MCQs if it has them.
6. **Build and check:**
   - Run `src/build.sh` and `src/build.sh web`.
   - Open both in Playwright at 1440px and 390px. Check the module page, a new topic page and a tutorial page: math renders, no console errors, no horizontal overflow on mobile.
   - **Fixing the test browser:** Playwright can't reach cdnjs, so route the MathJax URL to an npm-installed `mathjax@3.2.2/es5/tex-svg.js`, and stub Google Fonts. Add `[hidden]{display:none!important}` in the harness only.
7. **Ship:**
   - Bump `VERSION` in `sw.js` (`sb-vN` → `sb-vN+1`).
   - Commit, ending the message with the attribution lines your session gives you, then push to `main`.
   - Republish the artifact: `Artifact` action `read` on the URL above first, then publish `src/study-bench.html` with that `url`. Omit `capabilities` so the stored ones carry forward.
   - Copy the repo-root web files into `Modules/Study Bench app/` on the PC.
8. **Update the record.** Add every processed file to `.study-bench-processed.json` with `{size, mtime, status:"built"|"skipped", why?}`. Do this only after shipping succeeds, so a failed run is retried the next day.
9. **Tell Daniel** in a few lines:
   - what was added (module → topics, tutorials, question counts);
   - anything skipped that he might care about;
   - any dated assessments spotted;
   - anything you couldn't read or place.

   Send it with `SendUserMessage` so it reaches him.

If the computer isn't reachable, stop and say so in one line. Tomorrow's run will catch up.

## Content format

Content is plain JS that writes into `window.STUDY`. **Module ids:**

| Id | Module |
|---|---|
| `msp` | MEC1015 Measurement & Signal Processing |
| `ssc` | EEN1020 Systems, Signals & Control |
| `ems` | EEN1029 Electromechanical Systems |
| `mom` | MEC1014 Mechanics of Machines |
| `da` | MEC1029 Data Analytics |
| `pd` | MEC1017 Product Design |

**Files.** MSP lives in `msp_*.js`. Every other module goes in `mod_<id>_<part>.js`, e.g. `mod_mom_a.js`, `mod_mom_mcq.js`, `mod_mom_tut.js`. `build.sh` includes every `mod_*.js` alphabetically, so the alphabetically first file of a module must create the container: `STUDY.content.<id> = STUDY.content.<id> || { topics: [] };`. Also do this defensively in every file.

**Turning a module on.** When a module first gets content, edit its entry in `registry.js`:
- set `ready:true`;
- keep `planned` only as a guide (it is shown only while not ready);
- update `blurb`;
- add `assess` if the module descriptor gives the assessment split.

**Topic object.** Copy the shape from `msp_a.js`:
```js
T.topics.push({
  id: "freevib", part: "Vibration", title: "Free Vibration (Undamped)",
  lectures: "Lecture 1", status: "lectured",
  summary: "One or two sentences.",
  theory: R`<h3>1. Section</h3><p>... $inline$ and $$display$$ math ...</p>`,
  formulas: [ {name:"Natural frequency", tex:R`\omega_n=\sqrt{k/m}`, note:"optional"} ],
  questions: [ {src:"Tutorial 1 Q2", q:R`...`, hint:"...", see:[1], sol:R`...`, ans:"short final answer", prov:"Follows the posted solution."} ],
  traps: ["Common mistake, one sentence each."]
});
```

**Rules:**
- Every rich string uses `String.raw` (`const R = String.raw;`). **Never write `${` inside content.**
- Theory sections are `<h3>` blocks numbered from 0. A question's `see:[n]` links its hint to theory section `n` of the same topic.
  - MSP keeps these in `msp_see.js`. Other modules put `see` directly on each question.
- `prov` is mandatory outside MSP, and must be honest:
  - "Follows the posted solution",
  - "From the worked example in Lecture N",
  - "Worked by Claude; the sheet gives only the final answer, which this matches",
  - "Worked by Claude; no solution is available".

  Check every number: run the arithmetic in code.
- Usable HTML helpers: `<table class="data">` (add `num` for numeric tables), `<div class="callout">` (and `callout key`), `<ol class="steps">`, `<div class="flow"><span>..</span><i>→</i><span>..</span></div>`.
- Keep the writing plain and direct. Cover the actual lecture content; don't pad.

**Tutorials** (`STUDY.content.<id>.tutorials`):
```js
[{ id:"t1", short:"1", title:"Tutorial 1: Free Vibration", note:"Solution posted",
   intro:"...", questions:[ {nums:[1], topic:"freevib", src:"Tutorial 1 Q1", q:R`...`, hint:"...", sol:R`...`, ans:"...", prov:"..."} ] }]
```
- Figures go in `figs.js` as `STUDY.figs.<key> = "data:image/..."` (crop them from the PDF, keep them small).
- Reference figures from a tutorial with `figs:{<qnum>:"<key>"}`.

**MCQs** (`STUDY.content.<id>.mcq`): `{t:"<topicId>", s:"<source>", q:"...", o:["a","b","c","d"], a:<index>, w:"why"}`. Only add these from real past papers or class tests, and name the source in `s`.

## Formula-sheet drawer

Every module page has a pull-out "Formula sheet" tab on the right. It has two tabs:
- **Exam sheets** come from `src/sheets.js`. Each item has a `kind`, a `title`, a `note` and `pages` (image keys). The kinds are:
  - `exam`: issued in the exam or class tests.
  - `lecture`: tables shown in lectures.
  - `own`: Daniel's own sheet.
- **Compiled from topics** is generated automatically from every topic's `formulas`. Nothing to maintain.

To add a sheet:
1. Render each page to a JPEG about 1240–1400px wide, then save it as `img/sheets/<module>_<name>-<n>.jpg`.
2. Regenerate `src/sheets_art.js` (data URIs) and `src/sheets_art_web.js` (paths) so both list every file in `img/sheets/`.
3. Add the item to that module's entry in `sheets.js`. Keep the module's `intro` truthful about what the exam actually provides.

## Don'ts

- Don't edit, move, rename or delete anything in `Modules` except `.study-bench-processed.json` and the `Study Bench app/` copy.
- Don't change the theme, layout, images or `app.js` behaviour as part of a content run.
- Don't add work orders or touch the artifact's stored data.
- Don't put anything into the repo except the app and its source. It is public.
