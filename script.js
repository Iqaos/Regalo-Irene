let selectedCity = "";

function goToPage(pageNumber) {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "none";

  document.getElementById("page" + pageNumber).style.display = "block";
}

function selectCity(city) {
  selectedCity = city;
  alert("Hai scelto " + city + " 💖");
}

