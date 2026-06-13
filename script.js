const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".main-nav a");

menuButton.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const wasOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach((faqItem) => {
      faqItem.classList.remove("open");
      faqItem.querySelector("button").setAttribute("aria-expanded", "false");
      faqItem.querySelector("button i").textContent = "+";
    });

    if (!wasOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      button.querySelector("i").textContent = "−";
    }
  });
});

const billingButtons = document.querySelectorAll(".billing-toggle button");
const priceValues = document.querySelectorAll(".price strong[data-monthly]");

billingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    billingButtons.forEach((billingButton) => billingButton.classList.remove("active"));
    button.classList.add("active");

    const period = button.dataset.period;
    priceValues.forEach((price) => {
      price.textContent = price.dataset[period];
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 30);
});
