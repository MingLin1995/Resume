document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const thumbnails = document.querySelectorAll(".project-thumbnail");

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
      lightboxImg.src = thumbnail.src;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent body scrolling
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Restore body scrolling
  };

  closeBtn.addEventListener("click", closeLightbox);

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});
