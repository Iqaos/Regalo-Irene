let currentPage = 1;
let selectedCity = "";
let selectedDate = "";

// mostra solo una pagina
function showPage(pageNumber) {
  const pages = document.querySelectorAll('[id^="page"]');

  pages.forEach(page => {
    page.classList.add("hidden");
  });

  const pageToShow = document.getElementById("page" + pageNumber);
  if (pageToShow) {
    pageToShow.classList.remove("hidden");
    currentPage = pageNumber;
  }
}

// avanti
function goToPage(pageNumber) {
  showPage(pageNumber);
}

// indietro
function goBack() {
  if (currentPage > 1) {
    showPage(currentPage - 1);
  }
}

// selezione città
function selectCity(city) {
  selectedCity = city;

  document.querySelectorAll(".cities button").forEach(btn => {
    btn.classList.remove("selected");
  });

  event.target.classList.add("selected");

  // vai automaticamente al calendario
  showPage(4);
}

// ===== CALENDARIO =====
document.addEventListener("DOMContentLoaded", () => {
  showPage(1);
  generateCalendar();
});

function generateCalendar() {
  const months = document.querySelectorAll(".month");

  months.forEach(month => {
    const monthIndex = parseInt(month.dataset.month);
    const daysContainer = month.querySelector(".days");

    const year = new Date().getFullYear();
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    // spazio vuoto prima del giorno 1 (lunedi first)
    const offset = (firstDay + 6) % 7;
    for (let i = 0; i < offset; i++) {
      const empty = document.createElement("div");
      daysContainer.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const day = document.createElement("div");
      day.classList.add("day");
      day.textContent = d;

      day.addEventListener("click", () => {
        document.querySelectorAll(".day").forEach(el => {
          el.classList.remove("selected");
        });

        day.classList.add("selected");
        selectedDate = `${d}/${monthIndex + 1}/${year}`;

        document.getElementById("datePreview").textContent =
          `Hai scelto il ${selectedDate} 💖`;

        updateSummary();
        showPage(5);
      });

      daysContainer.appendChild(day);
    }
  });
}

function updateSummary() {
  document.getElementById("summary").innerHTML = `
    📍 Destinazione: <strong>${selectedCity}</strong><br>
    📅 Data: <strong>${selectedDate}</strong>
  `;
}
