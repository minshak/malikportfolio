/* ===== EDITABLE CONTENT ===== */
const TBD = "[Edit: add from resume]";

// Experience — titles, companies, places and dates as provided. Add bullets from your resume.
const jobs = [
  ["Technical Manager", "Xgen Business System", "Kerala, India", "2020 – Present"],
  ["Technical Lead & Manager", "Consyst Technologies", "Kerala, India", "2012 – 2020"],
  ["Solution Architect", "Techno Alliance India", "Kerala, India", "2012"],
  ["Software Consultant", "Global Computers", "Sultanate of Oman", "2009 – 2010"],
  ["Senior Software Engineer & Project Lead", "Techno Alliance India", "Kerala, India", "2006 – 2009"],
  ["Application Support Engineer", "ITS", "Kerala, India", "2002 – 2005"]
].map(j => ({ role: j[0], co: j[1], loc: j[2], when: j[3], bullets: [TBD + " — responsibility 1", TBD + " — responsibility 2"] }));

const skills = {
  "Leadership & Management": ["Software Development Management", "Agile", "Scrum", "SDLC", "Team Building", "Technical Leadership"],
  "Architecture & Design": ["Solution Architecture", "System Design", "Design Patterns", "Enterprise Architecture"],
  "Backend Development": ["C#", ".NET", "ASP.NET MVC", "Web API", "Python", "Node.js"],
  "Frontend Development": ["React.js", "JavaScript", "HTML5", "CSS", "jQuery", "AJAX"],
  "Databases": ["Oracle", "SQL Server", "PostgreSQL", "MySQL", "PL/SQL", "T-SQL"],
  "Cloud & DevOps": ["AWS", "CI/CD", "Docker", "Kubernetes"],
  "Business Intelligence": ["Data Analysis", "Business Intelligence", "Dashboard Development", "Reporting", "Data Visualization"]
};
const skillIcon = { "Leadership & Management": "👥", "Architecture & Design": "🏛️", "Backend Development": "⚙️", "Frontend Development": "🖥️", "Databases": "🗄️", "Cloud & DevOps": "☁️", "Business Intelligence": "📊" };

// Projects — names from the brief; overview is a neutral description from the title only.
// Replace each placeholder with real details from the resume (do not add unverified metrics).
const projects = [
  ["Healthcare EMR Platform", "Electronic medical records platform for healthcare organisations."],
  ["E-Dash — Application Dashboard", "Dashboard application for consolidated data views."],
  ["Pharmacy Management System", "Application for managing pharmacy operations."],
  ["Radiation Management System (RMS)", "System for managing radiation-related records and workflows."],
  ["EES — Education Accreditation System", "System supporting education accreditation processes."],
  ["EAGLE — Student Performance Evaluation System", "System for evaluating student performance."],
  ["FCP — Facility Management System", "Application for managing facilities."],
  ["RIMS — School Management System", "School administration and management system."],
  ["CBware — Banking Application", "Banking application."]
].map(p => ({ name: p[0], overview: p[1], problem: TBD, features: TBD, stack: [TBD], role: TBD, url: "#" }));

const competencies = ["Strategic Technology Planning", "Enterprise Solution Architecture", "Technical Team Leadership", "Agile Project Management", "Software Engineering", "Database Design and Administration", "Cloud Infrastructure", "Application Modernization", "Problem Solving and Innovation", "Stakeholder Collaboration"];

/* ===== RENDERING ===== */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const badges = a => a.map(t => `<span class="badge">${esc(t)}</span>`).join("");

$("#timeline").innerHTML = jobs.map(j => `<article class="job card reveal">
  <span class="when">${j.when}</span><h3>${esc(j.role)}</h3><p>${esc(j.co)} · ${esc(j.loc)}</p>
  <ul>${j.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul></article>`).join("");

$("#skillGrid").innerHTML = Object.entries(skills).map(([k, v]) =>
  `<div class="card reveal"><h3>${skillIcon[k]} ${k}</h3><div class="badges">${badges(v)}</div></div>`).join("");

$("#projectGrid").innerHTML = projects.map((p, i) => `<article class="card proj reveal">
  <span class="tag">Project ${String(i + 1).padStart(2, "0")}</span><h3>${esc(p.name)}</h3><p>${esc(p.overview)}</p>
  <div class="badges stack">${badges(p.stack)}</div>
  <div class="row"><button class="btn" data-detail="${i}">View Details</button><button class="btn ghost" data-stack>Technology Stack</button></div></article>`).join("");

$("#compGrid").innerHTML = competencies.map(c => `<span class="reveal">${c}</span>`).join("");

/* ===== INTERACTIONS ===== */
// Project cards: toggle stack, open details dialog
document.addEventListener("click", e => {
  const s = e.target.closest("[data-stack]");
  if (s) s.closest(".proj").classList.toggle("open");
  const d = e.target.closest("[data-detail]");
  if (d) {
    const p = projects[d.dataset.detail];
    $("#dlgBody").innerHTML = `<h3>${esc(p.name)}</h3><h4>Overview</h4><p>${esc(p.overview)}</p>
      <h4>Business problem solved</h4><p>${esc(p.problem)}</p><h4>Key features</h4><p>${esc(p.features)}</p>
      <h4>Technologies</h4><div class="badges">${badges(p.stack)}</div><h4>My role &amp; contributions</h4><p>${esc(p.role)}</p>
      <p style="margin-top:1rem"><a href="${p.url}" target="_blank" rel="noopener" style="color:var(--gold)">Project link →</a></p>`;
    $("#dlg").showModal();
  }
});
$("#dlgClose").onclick = () => $("#dlg").close();
$("#dlg").addEventListener("click", e => { if (e.target.id === "dlg") e.target.close(); });

// Mobile menu
const menu = $("#menu"), burger = $("#burger");
burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
menu.addEventListener("click", e => { if (e.target.tagName === "A") menu.classList.remove("open"); });

// Sticky nav, back-to-top
addEventListener("scroll", () => {
  $("#nav").classList.toggle("solid", scrollY > 40);
  $("#top").classList.toggle("show", scrollY > 600);
}, { passive: true });
$("#top").onclick = () => scrollTo({ top: 0, behavior: "smooth" });
$("#year").textContent = new Date().getFullYear();

// Scroll reveal + animated counters
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in"); io.unobserve(en.target);
  const n = en.target.querySelector("[data-count]");
  if (n) {
    const end = +n.dataset.count; let t0;
    const step = t => { t0 ??= t; const k = Math.min((t - t0) / 1400, 1); n.textContent = Math.round(end * k); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Contact form: validate, then send the message to WhatsApp (default) or email.
// EDIT these two values if the contact details change (number: country code + digits, no "+").
const WHATSAPP_NUMBER = "919746117052";
const CONTACT_EMAIL = "mohamedali.se@gmail.com";
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, msg = $("#formMsg"); let ok = true;
  f.querySelectorAll("input,textarea").forEach(i => {
    const bad = !i.value.trim() || (i.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value));
    i.classList.toggle("bad", bad); if (bad) ok = false;
  });
  if (!ok) { msg.style.color = "#ff8a8a"; msg.textContent = "Please complete all fields with a valid email."; return; }
  const d = { n: f.name.value.trim(), m: f.email.value.trim(), s: f.subject.value.trim(), t: f.message.value.trim() };
  if (e.submitter && e.submitter.value === "email") {
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(d.s)}&body=${encodeURIComponent(d.t + "\n\n— " + d.n + " (" + d.m + ")")}`;
  } else {
    const text = `Hello Mohamed,\n\n*Name:* ${d.n}\n*Email:* ${d.m}\n*Subject:* ${d.s}\n\n${d.t}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }
  msg.style.color = "#7ee2a8"; msg.textContent = "Opening your message app…"; f.reset();
});

// Close the mobile menu when tapping outside it or pressing Escape
document.addEventListener("click", e => { if (!e.target.closest("#menu,#burger")) menu.classList.remove("open"); });
document.addEventListener("keydown", e => { if (e.key === "Escape") menu.classList.remove("open"); });