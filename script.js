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

document.getElementById('hamburger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.navbar-links').classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth <= 968) {
        document.querySelector('.navbar-links').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
      }
    }
  });
});

const goToTopBtn = document.getElementById('go-to-top');
const ring = document.querySelector('.progress-ring-circle');

function updateProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollFraction = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
  
  // Dynamically get the radius from the circle element
  const radius = parseFloat(ring.getAttribute('r'));
  const circumference = 2 * Math.PI * radius;
  
  // Set stroke-dasharray and initial stroke-dashoffset only once
  if (!ring.dataset.initialized) {
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
    ring.dataset.initialized = 'true';
  }
  
  // Update stroke-dashoffset based on scroll position
  const offset = circumference - scrollFraction * circumference;
  ring.style.strokeDashoffset = offset;

  // Show/hide button based on scroll position
  if (scrollTop > 100) {
    goToTopBtn.classList.add('visible');
  } else {
    goToTopBtn.classList.remove('visible');
  }
}

// Update progress ring on resize to handle radius changes
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

// Initial call to set up progress ring
handleResize();
