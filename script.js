const districts = {
  Sehore: {
    state: "Madhya Pradesh",
    total: 1000,
    approved: 700,
    pending: 200,
    rejected: 100,
    forest: 72,
    delayed: 37,
    mismatch: 12,
    lat: 23.20,
    lng: 77.08,
    color: "#d6b744"
  },

  Raisen: {
    state: "Madhya Pradesh",
    total: 820,
    approved: 590,
    pending: 145,
    rejected: 85,
    forest: 64,
    delayed: 21,
    mismatch: 7,
    lat: 23.33,
    lng: 77.78,
    color: "#6f9a4e"
  },

  Betul: {
    state: "Madhya Pradesh",
    total: 1120,
    approved: 860,
    pending: 110,
    rejected: 150,
    forest: 58,
    delayed: 11,
    mismatch: 18,
    lat: 21.90,
    lng: 77.90,
    color: "#d6b744"
  },

  Chhindwara: {
    state: "Madhya Pradesh",
    total: 960,
    approved: 780,
    pending: 70,
    rejected: 110,
    forest: 49,
    delayed: 8,
    mismatch: 9,
    lat: 22.06,
    lng: 78.94,
    color: "#e0c84a"
  },

  Mandla: {
    state: "Madhya Pradesh",
    total: 1340,
    approved: 1100,
    pending: 90,
    rejected: 150,
    forest: 78,
    delayed: 5,
    mismatch: 5,
    lat: 22.60,
    lng: 80.38,
    color: "#4f8b50"
  },

  Balaghat: {
    state: "Madhya Pradesh",
    total: 1180,
    approved: 900,
    pending: 180,
    rejected: 100,
    forest: 70,
    delayed: 26,
    mismatch: 10,
    lat: 21.81,
    lng: 80.18,
    color: "#6f9a4e"
  }
};


/* =========================================
   GLOBAL VARIABLES
========================================= */

let map;
let markers = [];


/* =========================================
   SHORTCUT FOR GETTING HTML ELEMENTS
========================================= */

const $ = (id) => document.getElementById(id);


/* =========================================
   INITIALIZE LEAFLET MAP
========================================= */

function initMap() {

  map = L.map("map", {
    zoomControl: false
  }).setView(
    [23.1, 78.1],
    6.2
  );


  /* Zoom buttons */

  L.control.zoom({
    position: "bottomright"
  }).addTo(map);


  /* OpenStreetMap */

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors"
    }
  ).addTo(map);


  /* Create district markers */

  Object.entries(districts).forEach(
    ([name, district]) => {

      const marker = L.circleMarker(
        [
          district.lat,
          district.lng
        ],
        {
          radius:
            10 +
            Math.min(
              8,
              district.delayed / 7
            ),

          fillColor:
            district.color,

          color: "#ffffff",

          weight: 2,

          fillOpacity: 0.9
        }
      ).addTo(map);


      /* Tooltip */

      marker.bindTooltip(
        `
        <b>${name}</b>
        <br>
        ${district.total.toLocaleString()} claims
        `,
        {
          direction: "top"
        }
      );


      /* Click district */

      marker.on(
        "click",
        () => selectDistrict(name)
      );


      markers.push(marker);
    }
  );
}


/* =========================================
   SELECT DISTRICT
========================================= */

function selectDistrict(name) {

  const district = districts[name];

  if (!district) {
    return;
  }


  /* District name */

  $("districtName").textContent =
    name;


  /* State */

  $("districtState").textContent =
    district.state;


  /* Claims */

  $("totalClaims").textContent =
    district.total.toLocaleString();


  $("approvedClaims").textContent =
    district.approved.toLocaleString();


  $("pendingClaims").textContent =
    district.pending.toLocaleString();


  $("rejectedClaims").textContent =
    district.rejected.toLocaleString();


  /* Approval percentage */

  const approvalRate =
    Math.round(
      (district.approved /
        district.total) *
        100
    );


  $("approvalRate").textContent =
    approvalRate + "%";


  /* Progress bar */

  $("approvalBar").style.width =
    approvalRate + "%";


  /* Alerts */

  const alertCount =
    district.delayed +
    district.mismatch;


  $("alertCount").textContent =
    alertCount;


  /* Alert buttons */

  const alertButtons =
    document.querySelectorAll(
      ".alert-box button"
    );


  if (alertButtons.length >= 2) {

    alertButtons[0].innerHTML =
      `
      ${district.delayed}
      delayed claims
      <span>→</span>
      `;


    alertButtons[1].innerHTML =
      `
      ${district.mismatch}
      land mismatches
      <span>→</span>
      `;
  }


  /* AI explanation */

  $("aiText").textContent =
    `
    ${name} has processed ${approvalRate}% 
    of its FRA claims. ${district.delayed} 
    claims have exceeded the 180-day monitoring 
    threshold, while ${district.mismatch} records 
    show differences between claimed and recorded 
    land area. These cases should be prioritized 
    for administrative review.
    `;


  /* Move map */

  map.flyTo(
    [
      district.lat,
      district.lng
    ],
    7.4,
    {
      duration: 0.8
    }
  );
}


/* =========================================
   RESET MAP
========================================= */

function resetDistrict() {

  selectDistrict("Sehore");

  map.flyTo(
    [23.1, 78.1],
    6.2,
    {
      duration: 0.8
    }
  );
}


/* =========================================
   AI MODAL
========================================= */

function showAI() {

  const modal =
    $("aiModal");

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";
}


function closeAI() {

  const modal =
    $("aiModal");

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";
}


/* =========================================
   CLOSE MODAL WHEN CLICKING BACKDROP
========================================= */

document.addEventListener(
  "click",
  function (event) {

    const modal =
      $("aiModal");

    if (
      event.target.classList.contains(
        "modal-backdrop"
      )
    ) {
      closeAI();
    }

  }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape"
    ) {
      closeAI();
    }

  }
);


/* =========================================
   SCROLL ANIMATION
========================================= */

function handleScroll() {

  const scrollY =
    window.scrollY;


  const documentHeight =
    document.documentElement
      .scrollHeight;


  const windowHeight =
    window.innerHeight;


  const maxScroll =
    documentHeight -
    windowHeight;


  let progress =
    scrollY / maxScroll;


  progress =
    Math.max(
      0,
      Math.min(
        1,
        progress
      )
    );


  /* =====================================
     TOP SCROLL BAR
  ===================================== */

  $("scrollProgress").style.width =
    progress * 100 + "%";


  /* =====================================
     FOREST REDUCTION
  ===================================== */

  const forest =
    Math.max(
      0,
      1 - progress * 1.45
    );


  const trees =
    document.querySelectorAll(
      ".tree"
    );


  trees.forEach(
    (tree, index) => {

      const stagger =
        (index % 4) * 0.07;


      const opacity =
        Math.max(
          0,
          forest - stagger
        );


      tree.style.opacity =
        opacity;


      const movement =
        (1 - forest) * 18;


      const scale =
        1 +
        (index % 3) *
          0.15;


      tree.style.transform =
        `
        translateY(${movement}px)
        scale(${scale})
        `;
    }
  );


  /* =====================================
     BUILDINGS APPEAR
  ===================================== */

  const buildingProgress =
    Math.max(
      0,
      (progress - 0.22) /
        0.58
    );


  const buildings =
    document.querySelectorAll(
      ".building"
    );


  buildings.forEach(
    (building, index) => {

      const stagger =
        (index % 5) * 0.11;


      const value =
        Math.max(
          0,
          Math.min(
            1,
            buildingProgress -
              stagger
          )
        );


      building.style.opacity =
        value;


      building.style.transform =
        `
        translateY(
          ${80 * (1 - value)}px
        )
        scale(
          ${0.6 + 0.4 * value}
        )
        `;
    }
  );


  /* =====================================
     ROAD APPEARS
  ===================================== */

  const road =
    document.querySelector(
      ".road"
    );


  if (road) {

    road.style.opacity =
      Math.max(
        0,
        (progress - 0.38) /
          0.35
      );
  }


  /* =====================================
     FOREST → YELLOW ENVIRONMENT
  ===================================== */

  const hue =
    progress * 42;


  const hero =
    document.querySelector(
      ".hero"
    );


  if (hero) {

    hero.style.background =
      `
      linear-gradient(
        180deg,
        hsl(
          ${145 - hue},
          42%,
          ${12 + progress * 16}%
        ) 0%,

        hsl(
          ${145 - hue},
          35%,
          ${23 + progress * 15}%
        ) 72%,

        hsl(
          ${105 - hue * 0.55},
          35%,
          ${30 + progress * 35}%
        ) 100%
      )
      `;
  }


  /* =====================================
     REVEAL SECTIONS
  ===================================== */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  revealElements.forEach(
    (element) => {

      const rect =
        element.getBoundingClientRect();


      if (
        rect.top <
        windowHeight * 0.88
      ) {

        element.classList.add(
          "visible"
        );
      }
    }
  );
}


/* =========================================
   SCROLL EVENT
========================================= */

window.addEventListener(
  "scroll",
  () => {

    requestAnimationFrame(
      handleScroll
    );

  },
  {
    passive: true
  }
);


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener(
  "load",
  () => {

    /* Start map */

    initMap();


    /* Default district */

    selectDistrict(
      "Sehore"
    );


    /* Start animation */

    handleScroll();


    /* Hero reveal */

    setTimeout(
      () => {

        document
          .querySelectorAll(
            ".hero .reveal"
          )
          .forEach(
            (element) => {

              element.classList.add(
                "visible"
              );

            }
          );

      },
      250
    );

  }
);
