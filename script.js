// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      const isOpen = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.textContent = isOpen ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.textContent = "☰";
      })
    );
  }

  // Newsletter + contact forms: front-end only demo handling
  document.querySelectorAll("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector(".form-response");
      if (note) {
        note.textContent = "Thank you — this is a front-end demo, so no message was actually sent yet. Connect the form to your backend or a service like Formspree to go live.";
      } else {
        alert("Demo form — connect this to a backend or a service like Formspree to receive real submissions.");
      }
      form.reset();
    });
  });
});
