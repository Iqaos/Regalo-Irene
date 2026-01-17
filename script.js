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

document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  const daysContainer = document.querySelector(".days");
  const daysInMonth = new Date(year, 6, 0).getDate(); // giugno

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, 5, d);
    const div = document.createElement("div");
    div.className = "day";
    div.innerText = d;
    div.dataset.date = date.toISOString().split("T")[0];

    div.onclick = () => {
      document.querySelectorAll(".day").forEach(el =>
        el.classList.remove("selected","range")
      );

      selectedStartDate = div.dataset.date;

      const end = new Date(date);
      end.setDate(date.getDate() + 1);
      selectedEndDate = end.toISOString().split("T")[0];

      div.classList.add("selected");

      document.querySelectorAll(".day").forEach(el => {
        if (el.dataset.date === selectedEndDate) {
          el.classList.add("range");
        }
      });

      document.getElementById("datePreview").innerText =
        `Dal ${date.toLocaleDateString("it-IT")} al ${end.toLocaleDateString("it-IT")}`;

      document.getElementById("confirmBtn").classList.remove("hidden");
      document.getElementById("summary").innerText =
        `Meta: ${selectedCity}\n${document.getElementById("datePreview").innerText}`;
    };

    daysContainer.appendChild(div);
  }
});
