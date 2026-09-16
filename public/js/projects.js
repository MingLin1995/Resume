document.addEventListener("DOMContentLoaded", () => {
  // --- Image Lightbox ---
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const thumbnails = document.querySelectorAll(".project-thumbnail");

  if (lightbox && lightboxImg && closeBtn) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        lightboxImg.src = thumbnail.src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent body scrolling
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      if (!isDeepDiveModalActive()) {
        document.body.style.overflow = ""; // Restore body scrolling
      }
    };

    closeBtn.addEventListener("click", closeLightbox);

    // Close when clicking outside the image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // --- Deep Dive Modal ---
  const deepDiveModal = document.getElementById("deep-dive-modal");
  const openDeepDiveBtn = document.getElementById("open-deep-dive-btn");
  const closeDeepDiveBtn = document.getElementById("modal-close-btn");
  const footerCloseDeepDiveBtn = document.getElementById("modal-footer-close-btn");

  const isDeepDiveModalActive = () => {
    return deepDiveModal && deepDiveModal.classList.contains("active");
  };

  const openDeepDive = () => {
    if (deepDiveModal) {
      deepDiveModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeDeepDive = () => {
    if (deepDiveModal) {
      deepDiveModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  if (openDeepDiveBtn) {
    openDeepDiveBtn.addEventListener("click", openDeepDive);
  }

  if (closeDeepDiveBtn) {
    closeDeepDiveBtn.addEventListener("click", closeDeepDive);
  }

  if (footerCloseDeepDiveBtn) {
    footerCloseDeepDiveBtn.addEventListener("click", closeDeepDive);
  }

  if (deepDiveModal) {
    deepDiveModal.addEventListener("click", (e) => {
      if (e.target === deepDiveModal) {
        closeDeepDive();
      }
    });
  }

  // Handle Escape key for both modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox && lightbox.classList.contains("active")) {
        lightbox.classList.remove("active");
        if (!isDeepDiveModalActive()) {
          document.body.style.overflow = "";
        }
      } else if (isDeepDiveModalActive()) {
        closeDeepDive();
      }
    }
  });
});
