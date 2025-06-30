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
