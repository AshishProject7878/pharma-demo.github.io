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

const tabButtons = document.querySelectorAll(".specialties-categories button");
    const tabContents = document.querySelectorAll(".mobile-accordion-content");

    const image = document.querySelector(".specialties-image img");
    const title = document.querySelector(".specialties-content h2");
    const desc = document.querySelector(".specialties-desc");
    const features = document.querySelector(".specialties-features");

    const tabData = [
      {
        title: "Merchant Exports",
        img: "img/export.jpg",
        desc: "The success of a pharmaceutical product depends on the quality of sourced goods. At Zywie, we export pharma products with utmost care and compliance.",
        features: ["GDP-compliant shipping", "Cold chain management", "Reliable global delivery"]
      },
      {
        title: "Technical Support",
        img: "img/technical.jpg",
        desc: "Our experienced technical team provides assistance in regulatory documents, product information, and export procedures tailored to pharma needs.",
        features: ["Regulatory compliance support", "Stability documentation guidance", "Global pharmacopoeia understanding"]
      },
      {
        title: "Trading",
        img: "img/trading.jpg",
        desc: "Years of experience in pharmaceutical trading taught us the importance of market insight, demand forecasting, and authentic sourcing.",
        features: ["Validated supply chain", "Pharma-grade sourcing", "Market-specific solutions"]
      },
      {
        title: "Indenting",
        img: "img/indent.jpg",
        desc: "We help global buyers procure pharmaceuticals from trusted Indian manufacturers by handling indent orders and documentation seamlessly.",
        features: ["Transparent order processing", "Global buyer coordination", "Customs & compliance handling"]
      },
      {
        title: "Strategic Sourcing",
        img: "img/strategic.jpg",
        desc: "We ensure strategic sourcing of pharma formulations based on region-specific regulations, pricing strategy, and product registration timelines.",
        features: ["Region-specific sourcing", "WHO-GMP product alignment", "Regulatory roadmap planning"]
      },
      {
        title: "Facilitating Contract",
        img: "img/contract.jpg",
        desc: "We bridge global partners through transparent agreements for pharma trade, reducing ambiguity and enhancing mutual trust.",
        features: ["B2B pharma contracts", "Quality & pricing transparency", "Flexible negotiation terms"]
      }
    ];

    tabButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const width = window.innerWidth;
        const icon = button.querySelector("i");

        if (width <= 768) {
          const current = tabContents[index];
          const isVisible = current.style.display === "block";

          tabContents.forEach((c) => (c.style.display = "none"));
          tabButtons.forEach(btn => btn.classList.remove("expanded"));
          document.querySelectorAll(".specialties-categories i").forEach((i) => {
            i.classList.remove("enter", "exit");
          });

          if (!isVisible) {
            icon.classList.add("enter");
            button.classList.add("expanded");
            current.style.display = "block";
            current.innerHTML = `
              <h2>${tabData[index].title}</h2>
              <p>${tabData[index].desc}</p>
              <ul>
                ${tabData[index].features
                  .map((f) => `<li><i class="fas fa-check-circle"></i> ${f}</li>`)
                  .join("")}
              </ul>`;
          } else {
            icon.classList.add("exit");
            button.classList.remove("expanded");
          }
        } else {
          tabButtons.forEach((btn, i) => {
            btn.classList.remove("active");
            const iTag = btn.querySelector("i");
            if (iTag) iTag.classList.remove("enter", "exit");
            btn.innerHTML = `${tabData[i].title} <i class="fas fa-arrow-right"></i>`;
          });

          button.classList.add("active");
          icon.classList.add("enter");

          image.src = tabData[index].img;
          title.textContent = tabData[index].title;
          desc.textContent = tabData[index].desc;
          features.innerHTML = "";
          tabData[index].features.forEach((f) => {
            features.innerHTML += `<li><i class="fas fa-check-circle"></i> ${f}</li>`;
          });
        }
      });
    });

    // Auto-expand default for mobile
    if (window.innerWidth <= 768) {
      tabContents[0].style.display = "block";
      tabContents[0].innerHTML = `
        <h2>${tabData[0].title}</h2>
        <p>${tabData[0].desc}</p>
        <ul>
          ${tabData[0].features
            .map((f) => `<li><i class="fas fa-check-circle"></i> ${f}</li>`)
            .join("")}
        </ul>`;
    }
