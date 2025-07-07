      const burger = document.getElementById("burger");
      const navLinks = document.getElementById("nav-links");

      burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        navLinks.classList.toggle("active");
      });

      document.querySelectorAll(".nav-left a").forEach((link) => {
        link.addEventListener("click", () => {
          burger.classList.remove("active");
          navLinks.classList.remove("active");
        });
      });

      // Ripple effect
      $(function () {
        $(".nav-left a")
          .on("mouseenter", function (e) {
            const parentOffset = $(this).offset();
            const relX = e.pageX - parentOffset.left;
            const relY = e.pageY - parentOffset.top;
            $(this).find("span").css({ top: relY, left: relX });
          })
          .on("mouseout", function (e) {
            const parentOffset = $(this).offset();
            const relX = e.pageX - parentOffset.left;
            const relY = e.pageY - parentOffset.top;
            $(this).find("span").css({ top: relY, left: relX });
          });
      });

      gsap.registerPlugin(ScrollTrigger);

      const tape = document.querySelector(".tape");
      const tapeContainer = document.querySelector(".tape-container");

      // Set initial position
      gsap.set(tape, { x: 0 });

      // Create the scroll-triggered animation
      gsap.to(tape, {
        x: () => -(tape.scrollWidth - window.innerWidth + 100), // Scroll to the right
        ease: "none",
        scrollTrigger: {
          trigger: ".tape-section",
          start: "top 80%", // Start when the top of the tape section is 80% down the viewport
          end: () => `+=${tape.scrollWidth}`, // End after scrolling the tape's width
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true, // Recalculate on resize
          onUpdate: (self) => {
            // Reverse direction when scrolling up
            if (self.direction === -1) {
              gsap.to(tape, {
                x: 0, // Scroll back to the left
                ease: "none",
                duration: 0,
                overwrite: "auto",
              });
            }
          },
        },
      });

      const goToTopBtn = document.getElementById('go-to-top');
const ring = document.querySelector('.progress-ring-circle');

function updateProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollFraction = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

  // Get radius and calculate circumference
  const radius = parseFloat(ring.getAttribute('r'));
  const circumference = 2 * Math.PI * radius;

  // Initialize once
  if (!ring.dataset.initialized) {
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
    ring.dataset.initialized = 'true';
  }

  // Update stroke offset
  const offset = circumference - scrollFraction * circumference;
  ring.style.strokeDashoffset = offset;

  // Toggle visibility
  if (scrollTop > 100) {
    goToTopBtn.classList.add('visible');
  } else {
    goToTopBtn.classList.remove('visible');
  }
}

// Handle resize (in case circle size changes)
function handleResize() {
  const radius = parseFloat(ring.getAttribute('r'));
  const circumference = 2 * Math.PI * radius;
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference;
  updateProgress();
}

goToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', handleResize);

// Initial setup
handleResize();

// ---------------- Contact --------------

const openBtn = document.getElementById("open-modal");
  const closeBtn = document.getElementById("close-modal");
  const modal = document.getElementById("contact-modal");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hide");
    modal.classList.add("show");
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.classList.add("hide");
    setTimeout(() => {
      modal.style.display = "none";
    }, 400);
  });

  // Optional: Close when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      modal.classList.add("hide");
      setTimeout(() => {
        modal.style.display = "none";
      }, 400);
    }
  });

  // --------------- Slider -------------------

  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  setInterval(nextSlide, 4000); // Change slide every 5 seconds
