const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
 
populateUI();
 
let ticketPrice = +movieSelect.value;

 
function setMovieData(movieIndex) {
  
   
  localStorage.setItem("selectedMovieIndex", movieIndex);
}
 
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
 
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
 
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = `${selectedSeatsCount * ticketPrice}`;
}
 
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
    // The seats in LS get the "selected" class, which updateSelectedCount takes
    // into account (and it is called on page load)
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    // This automatically alters the ticketPrice as well, because ticketPrice = 
    // +movieSelect.value
  }
}
 
movieSelect.addEventListener("change", (e) => {
  setMovieData(e.target.selectedIndex);
  ticketPrice = e.target.value;
  updateSelectedCount();
});
 
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
 
document.addEventListener("DOMContentLoaded", updateSelectedCount);
//











































