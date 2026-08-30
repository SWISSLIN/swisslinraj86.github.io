/* =========================================================
   SWISSLIN RAJ V
   SPACE ENGINEERING PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   1. SPACE STARFIELD
========================================================= */

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let devicePixelRatioValue = 1;

let stars = [];
let particles = [];

const STAR_COUNT = 260;
const PARTICLE_COUNT = 75;


/* ---------------------------------------------------------
   Resize Canvas
--------------------------------------------------------- */

function resizeCanvas() {

  devicePixelRatioValue =
    Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width =
    width * devicePixelRatioValue;

  canvas.height =
    height * devicePixelRatioValue;

  canvas.style.width =
    width + "px";

  canvas.style.height =
    height + "px";

  ctx.setTransform(
    devicePixelRatioValue,
    0,
    0,
    devicePixelRatioValue,
    0,
    0
  );

  createStars();
  createParticles();
}


/* ---------------------------------------------------------
   Create Stars
--------------------------------------------------------- */

function createStars() {

  const count =
    Math.min(
      STAR_COUNT,
      Math.floor(
        (width * height) / 6000
      )
    );

  stars = [];

  for (let i = 0; i < count; i++) {

    stars.push({

      x: Math.random() * width,

      y: Math.random() * height,

      radius:
        Math.random() * 1.35 + 0.2,

      opacity:
        Math.random() * 0.75 + 0.15,

      speed:
        Math.random() * 0.18 + 0.025,

      twinkle:
        Math.random() * Math.PI * 2

    });

  }
}


/* ---------------------------------------------------------
   Create Floating Particles
--------------------------------------------------------- */

function createParticles() {

  particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {

    particles.push({

      x: Math.random() * width,

      y: Math.random() * height,

      radius:
        Math.random() * 1.7 + 0.25,

      opacity:
        Math.random() * 0.25 + 0.05,

      velocityX:
        (Math.random() - 0.5) * 0.15,

      velocityY:
        (Math.random() - 0.5) * 0.15

    });

  }
}


/* ---------------------------------------------------------
   Draw Space
--------------------------------------------------------- */

function drawSpace() {

  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  /* Stars */

  const time =
    Date.now() * 0.001;


  stars.forEach(star => {

    star.y += star.speed;

    if (star.y > height) {
      star.y = 0;
    }


    const twinkle =
      0.65 +
      Math.sin(
        time * 1.2 +
        star.twinkle
      ) * 0.35;


    ctx.globalAlpha =
      star.opacity * twinkle;

    ctx.fillStyle =
      "#dbeeff";

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });


  /* Particles */

  particles.forEach(particle => {

    particle.x +=
      particle.velocityX;

    particle.y +=
      particle.velocityY;


    if (particle.x < 0) {
      particle.x = width;
    }

    if (particle.x > width) {
      particle.x = 0;
    }

    if (particle.y < 0) {
      particle.y = height;
    }

    if (particle.y > height) {
      particle.y = 0;
    }


    ctx.globalAlpha =
      particle.opacity;

    ctx.fillStyle =
      "#71e6ff";

    ctx.beginPath();

    ctx.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });


  ctx.globalAlpha = 1;

  requestAnimationFrame(drawSpace);
}


resizeCanvas();

window.addEventListener(
  "resize",
  resizeCanvas
);

drawSpace();



/* =========================================================
   2. CURSOR SPACE GLOW
========================================================= */

const cursorGlow =
  document.querySelector(".cursor-glow");


if (cursorGlow) {

  window.addEventListener(
    "pointermove",
    event => {

      cursorGlow.style.left =
        event.clientX + "px";

      cursorGlow.style.top =
        event.clientY + "px";

    }
  );

}



/* =========================================================
   3. PORTRAIT 3D INTERACTION
========================================================= */

const portraitCard =
  document.querySelector(".portrait-card");


if (portraitCard) {

  document.addEventListener(
    "mousemove",
    event => {

      if (window.innerWidth < 900) {
        return;
      }


      const rect =
        portraitCard.getBoundingClientRect();


      const centerX =
        rect.left +
        rect.width / 2;

      const centerY =
        rect.top +
        rect.height / 2;


      const mouseX =
        event.clientX -
        centerX;

      const mouseY =
        event.clientY -
        centerY;


      const rotateY =
        (mouseX / rect.width) * 12;

      const rotateX =
        -(mouseY / rect.height) * 12;


      portraitCard.style.transform =
        `
        perspective(1000px)
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)
        translateZ(8px)
        `;

    }
  );


  portraitCard.addEventListener(
    "mouseleave",
    () => {

      portraitCard.style.transform =
        `
        perspective(1000px)
        rotateY(-8deg)
        rotateX(3deg)
        `;

    }
  );

}



/* =========================================================
   4. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {

  revealObserver.observe(
    element
  );

});



/* =========================================================
   5. PROJECT DATABASE
========================================================= */

const projects = {

  vera: {

    category:
      "VLSI · RTL · FPGA",

    title:
      "VERA-E",

    description:
      "A 32-bit processor project built around RTL experimentation, instruction flow, registers, ALU, control logic, memory and pipelined execution.",

    flow: [
      "FETCH",
      "DECODE",
      "EXECUTE",
      "MEMORY",
      "WRITE BACK"
    ],

    github:
      "https://github.com/SWISSLIN"

  },


  axon: {

    category:
      "AI · HCI · EMBEDDED",

    title:
      "AXON AIR",

    description:
      "A research-driven aerial interface concept exploring a novel human-computer interaction approach through intelligent sensing and execution.",

    flow: [
      "SENSING",
      "INTERPRETATION",
      "AI CORE",
      "RESPONSE",
      "INTERFACE"
    ],

    github:
      "https://github.com/SWISSLIN"

  },


  hppai: {

    category:
      "AI · COMPUTER VISION · EMBEDDED",

    title:
      "HPPAI-CG",

    description:
      "A portable AI companion glasses concept combining camera sensing, edge processing, audio, display and intelligent assistance.",

    flow: [
      "CAMERA",
      "PROCESSING",
      "UNDERSTANDING",
      "AUDIO",
      "DISPLAY"
    ],

    github:
      "https://github.com/SWISSLIN"

  },


  tinyml: {

    category:
      "TINYML · EDGE AI · HARDWARE",

    title:
      "TINYML SOC",

    description:
      "An exploration of deploying machine-learning inference on constrained hardware, connecting sensing, preprocessing, model inference and output.",

    flow: [
      "SENSOR",
      "PREPROCESS",
      "MODEL",
      "INFERENCE",
      "OUTPUT"
    ],

    github:
      "https://github.com/SWISSLIN"

  },


  village: {

    category:
      "EMBEDDED · SENSORS · AUTOMATION",

    title:
      "SMART VILLAGE",

    description:
      "A microcontroller-based prototype integrating environmental sensing, water monitoring, solar tracking and automated responses.",

    flow: [
      "SENSORS",
      "MICROCONTROLLER",
      "CONTROL",
      "ACTUATORS"
    ],

    github:
      "https://github.com/SWISSLIN"

  },


  relay: {

    category:
      "ARDUINO · AUTOMATION · CONTROL",

    title:
      "AUTOMATED RELAY SYSTEM",

    description:
      "A time-based relay switching project for automated control of electrical appliances using a microcontroller.",

    flow: [
      "TIME",
      "MICROCONTROLLER",
      "LOGIC",
      "RELAY",
      "LOAD"
    ],

    github:
      "https://github.com/SWISSLIN/Automated-Time-Based-Relay-Switching-System"

  }

};



/* =========================================================
   6. PROJECT MODAL
========================================================= */

const projectModal =
  document.getElementById(
    "projectModal"
  );

const modalKicker =
  document.getElementById(
    "modalKicker"
  );

const modalTitle =
  document.getElementById(
    "modalTitle"
  );

const modalText =
  document.getElementById(
    "modalText"
  );

const modalFlow =
  document.getElementById(
    "modalFlow"
  );

const modalGithub =
  document.getElementById(
    "modalGithub"
  );

const modalClose =
  document.querySelector(
    ".modal-close"
  );



/* ---------------------------------------------------------
   Open Project
--------------------------------------------------------- */

function openProject(projectID) {

  const project =
    projects[projectID];


  if (!project) {
    return;
  }


  modalKicker.textContent =
    project.category;


  modalTitle.textContent =
    project.title;


  modalText.textContent =
    project.description;


  modalFlow.innerHTML = "";


  project.flow.forEach(
    step => {

      const span =
        document.createElement(
          "span"
        );

      span.textContent =
        step;

      modalFlow.appendChild(
        span
      );

    }
  );


  modalGithub.href =
    project.github;


  projectModal.classList.add(
    "active"
  );


  projectModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "modal-open"
  );

}



/* ---------------------------------------------------------
   Close Project
--------------------------------------------------------- */

function closeProject() {

  projectModal.classList.remove(
    "active"
  );


  projectModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "modal-open"
  );

}



/* ---------------------------------------------------------
   Project Click
--------------------------------------------------------- */

const missionCards =
  document.querySelectorAll(
    ".mission"
  );


missionCards.forEach(
  card => {

    card.addEventListener(
      "click",
      event => {

        /*
          Prevent the project button from
          causing duplicate behavior.
        */

        const projectID =
          card.dataset.project;


        openProject(
          projectID
        );

      }
    );

  }
);



/* Close button */

if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeProject
  );

}



/* Click outside */

if (projectModal) {

  projectModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        projectModal
      ) {

        closeProject();

      }

    }
  );

}



/* ESC key */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      projectModal.classList.contains(
        "active"
      )
    ) {

      closeProject();

    }

  }
);



/* =========================================================
   7. MOBILE NAVIGATION
========================================================= */

const menuButton =
  document.querySelector(
    ".menu-btn"
  );

const navigation =
  document.querySelector(
    ".nav nav"
  );


if (
  menuButton &&
  navigation
) {

  menuButton.addEventListener(
    "click",
    () => {

      navigation.classList.toggle(
        "open"
      );

    }
  );


  /*
    Close mobile menu after
    clicking a navigation link.
  */

  navigation
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          navigation.classList.remove(
            "open"
          );

        }
      );

    });

}



/* =========================================================
   8. ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav nav a"
  );


const activeSectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            const currentID =
              entry.target.id;


            navLinks.forEach(
              link => {

                link.classList.remove(
                  "active"
                );


                if (
                  link.getAttribute(
                    "href"
                  ) ===
                  "#" + currentID
                ) {

                  link.classList.add(
                    "active"
                  );

                }

              }
            );

          }

        }
      );

    },
    {
      threshold: 0.45
    }
  );


sections.forEach(
  section => {

    activeSectionObserver.observe(
      section
    );

  }
);



/* =========================================================
   9. PARALLAX SPACE EFFECT
========================================================= */

const heroCopy =
  document.querySelector(
    ".hero-copy"
  );


window.addEventListener(
  "scroll",
  () => {

    if (
      !heroCopy ||
      window.innerWidth < 800
    ) {

      return;

    }


    const scrollY =
      window.scrollY;


    if (scrollY < window.innerHeight) {

      const opacity =
        Math.max(
          0,
          1 -
          scrollY /
          (window.innerHeight * 0.75)
        );


      const translate =
        scrollY * 0.18;


      heroCopy.style.opacity =
        opacity;


      heroCopy.style.transform =
        `
        translateY(
          ${translate}px
        )
        `;

    }

  },
  {
    passive: true
  }
);



/* =========================================================
   10. SMOOTH INTERNAL LINKS
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute(
              "href"
            );


          if (
            targetID === "#" ||
            targetID === ""
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetID
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );



/* =========================================================
   11. IMAGE FALLBACK
========================================================= */

const profileImage =
  document.querySelector(
    ".portrait-card img"
  );


if (profileImage) {

  profileImage.addEventListener(
    "error",
    () => {

      console.warn(
        "profile.jpg was not found. Upload profile.jpg to the repository root."
      );

      profileImage.style.opacity =
        "0";

    }
  );

}



/* =========================================================
   12. PAGE LOAD
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

  }
);



/* =========================================================
   13. PREVENT RIGHT-CLICK ON CANVAS ONLY
========================================================= */

if (canvas) {

  canvas.addEventListener(
    "contextmenu",
    event => {

      event.preventDefault();

    }
  );

}



/* =========================================================
   END
========================================================= */

console.log(
  "%cSWISSLIN RAJ V",
  "color:#71e6ff;font-size:20px;font-weight:bold;"
);

console.log(
  "%cEngineering Beyond Boundaries.",
  "color:#9aa8c4;font-size:12px;"
);
