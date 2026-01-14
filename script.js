let currentPage = 1;
let selectedCity = "";

function goToPage(pageNumber) {
  currentPage = pageNumber;

  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "none";

  document.getElementById("page" + pageNumber).style.display = "block";
}

function goBack() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function selectCity(city) {
  selectedCity = city;
  alert("Hai scelto " + city + " 💖");
}
