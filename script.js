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

document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("commercial-projects");

  if (!gallery) return;

  fetch("commercial-projects.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load project data");
      }
      return response.json();
    })
    .then(function (projects) {
      gallery.innerHTML = "";

      projects.forEach(function (project) {
        const card = document.createElement("article");
        card.className = "project-card";

        const imageWrap = document.createElement("div");
        imageWrap.className = "project-image";

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.title || "Commercial interior project";
        image.loading = "lazy";

        image.onerror = function () {
          card.style.display = "none";
          console.warn("Image not found:", project.image);
        };

        const title = document.createElement("h3");
        title.textContent = project.title || "Commercial Project";

        const location = document.createElement("p");
        location.textContent = project.location || "";

        imageWrap.appendChild(image);
        card.appendChild(imageWrap);
        card.appendChild(title);
        card.appendChild(location);
        gallery.appendChild(card);
      });

      if (projects.length === 0) {
        gallery.textContent = "Projects will be added soon.";
      }
    })
    .catch(function (error) {
      gallery.textContent =
        "Projects could not load. Please check commercial-projects.json.";
      console.error(error);
    });
});
