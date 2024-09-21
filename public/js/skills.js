document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".skill-category");

  categories.forEach((category) => {
    const toggle = category.querySelector(".category-toggle");
    const skillsGrid = category.querySelector(".skills-grid");

    // 初始狀態設置為展開
    category.classList.add("active");
    skillsGrid.style.display = "grid";

    toggle.addEventListener("click", () => {
      category.classList.toggle("active");
      if (category.classList.contains("active")) {
        skillsGrid.style.display = "grid";
      } else {
        skillsGrid.style.display = "none";
      }
    });
  });
});
