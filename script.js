let currentPage = 1;
let selectedCity = "";
let selectedStartDate = "";
let selectedEndDate = "";

function goToPage(page) {
  currentPage = page;
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById("page" + page).classList.remove("hidden");
}

function goBack() {
  if (currentPage > 1) goToPage(currentPage - 1);
}

function selectCity(city) {
  selectedCity = city;
  goToPage(4);
}

function confirmDate() {
  updateSummary();
  goToPage(5);
}

function updateSummary() {
  document.getElementById("summary").innerText =
    `Meta: ${selectedCity}\nDal ${formatDate(selectedStartDate)} al ${formatDate(selectedEndDate)}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long"
  });
}

/* CALENDARIO */
document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();

  document.querySelectorAll(".month").forEach(monthEl => {
    const month = parseInt(monthEl.dataset.month);
    const daysContainer = monthEl.querySelector(".days");
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const div = document.createElement("div");
      div.className = "day";
      div.innerText = d;
      div.dataset.date = date.toISOString().split("T")[0];

      const today = new Date();
      today.setHours(0,0,0,0);
      if (date < today) div.classList.add("disabled");

      div.onclick = () => {
        document.querySelectorAll(".day").forEach(el =>
          el.classList.remove("selected","range")
        );

        selectedStartDate = div.dataset.date;

        const start = new Date(selectedStartDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        selectedEndDate = end.toISOString().split("T")[0];

        div.classList.add("selected");

        document.querySelectorAll(".day").forEach(el => {
          if (el.dataset.date === selectedEndDate) {
            el.classList.add("range");
          }
        });

        document.getElementById("datePreview").innerText =
          `Dal ${formatDate(selectedStartDate)} al ${formatDate(selectedEndDate)}`;

        document.getElementById("confirmDate").style.display = "inline-block";
      };

      daysContainer.appendChild(div);
    }
  });
});
