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

  // --- Deep Dive Modals ---
  const allModals = document.querySelectorAll(".modal-overlay:not(#image-lightbox)");
  const openModalButtons = document.querySelectorAll("[data-modal-target]");
  const legacyOpenBtn = document.getElementById("open-deep-dive-btn");

  const hasAnyActiveModal = () => {
    return Array.from(allModals).some((modal) => modal.classList.contains("active"));
  };

  const openModal = (modal) => {
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove("active");
      if (!hasAnyActiveModal() && !(lightbox && lightbox.classList.contains("active"))) {
        document.body.style.overflow = "";
      }
    }
  };

  const closeAllModals = () => {
    allModals.forEach((modal) => modal.classList.remove("active"));
    if (!(lightbox && lightbox.classList.contains("active"))) {
      document.body.style.overflow = "";
    }
  };

  // Bind data-modal-target buttons
  openModalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-modal-target");
      const targetModal = document.querySelector(targetSelector);
      if (targetModal) {
        openModal(targetModal);
      }
    });
  });

  // Legacy button fallback
  if (legacyOpenBtn) {
    legacyOpenBtn.addEventListener("click", () => {
      const defaultModal = document.getElementById("deep-dive-modal-17668") || document.getElementById("deep-dive-modal");
      if (defaultModal) {
        openModal(defaultModal);
      }
    });
  }

  // Setup close events for each modal
  allModals.forEach((modal) => {
    const closeTriggers = modal.querySelectorAll(".modal-close-trigger, .modal-close-btn, #modal-close-btn, #modal-footer-close-btn");
    closeTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => closeModal(modal));
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Handle Escape key for all modals & lightbox
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox && lightbox.classList.contains("active")) {
        lightbox.classList.remove("active");
        if (!hasAnyActiveModal()) {
          document.body.style.overflow = "";
        }
      } else if (hasAnyActiveModal()) {
        closeAllModals();
      }
    }
  });
});
