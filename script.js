const root = document.documentElement;
const navLinks = document.querySelector("#navLinks");
const menuButton = document.querySelector("#menuButton");
const commandModal = document.querySelector("#commandModal");
const openCommand = document.querySelector("#openCommand");
const closeCommand = document.querySelector("#closeCommand");
const closeCommandButton = document.querySelector("#closeCommandButton");
const filterButtons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll(".project");

window.addEventListener("mousemove", (event) => {
  root.style.setProperty("--x", `${event.clientX}px`);
  root.style.setProperty("--y", `${event.clientY}px`);
});

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

function setCommand(open) {
  commandModal.classList.toggle("open", open);
  commandModal.setAttribute("aria-hidden", open ? "false" : "true");
}

openCommand.addEventListener("click", () => setCommand(true));
closeCommand.addEventListener("click", () => setCommand(false));
closeCommandButton.addEventListener("click", () => setCommand(false));

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    setCommand(true);
  }

  if (event.key === "Escape") {
    setCommand(false);
    navLinks.classList.remove("open");
  }
});

document.querySelectorAll(".command-panel a, .nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    setCommand(false);
    navLinks.classList.remove("open");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projects.forEach((project) => {
      const tags = project.dataset.tags || "";
      project.classList.toggle("hide", filter !== "all" && !tags.includes(filter));
    });
  });
});

projects.forEach((project) => {
  project.addEventListener("mousemove", (event) => {
    const rect = project.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    project.style.transform = `translateY(-3px) rotateX(${(-y / rect.height) * 4}deg) rotateY(${(x / rect.width) * 4}deg)`;
  });

  project.addEventListener("mouseleave", () => {
    project.style.transform = "";
  });
});
