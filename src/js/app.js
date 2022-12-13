"use strict";
//burger menu
const menu = document.querySelector(".menu");
const burgerBtn = document.querySelector(".burger");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
});

//follow section

const menuLinks = document.querySelectorAll(".menu__link");

menuLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    const key = e.target.dataset.key;

    const section =
      document.querySelector(`.${key}`).getBoundingClientRect().top + window.pageYOffset - 220;

    menu.classList.remove("active");
    burgerBtn.classList.remove("active");

    window.scrollTo({ top: section, behavior: "smooth" });
  })
);
//sticky navigation

const header = document.querySelector(".header");

const menuHeight = menu.getBoundingClientRect().height;
console.log(menuHeight);
const stickyNav = (entries) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) header.classList.add("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${menuHeight}px`,
});
headerObserver.observe(header);

// revealSection
const allSections = document.querySelectorAll(".section");
const revealSection = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
