(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      toggle.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      toggle.textContent = "☰";
    }));
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("enquiry-form");
  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hello InkDesign Studio, I'd like to discuss a project.",
      "",
      "Name: " + data.get("name"),
      "Contact: " + data.get("contact"),
      "Project type: " + data.get("project"),
      "Project details: " + (data.get("message") || "To be discussed")
    ].join("\n");
    window.open("https://wa.me/918850915636?text=" + encodeURIComponent(message), "_blank", "noopener");
  });
})();