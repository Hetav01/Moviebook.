$(window).on("load", function () {
    $(".loader-wrapper").fadeOut(2000);
});


var container = document.querySelector(".container2");
var seats = document.querySelectorAll(".row .seat:not(.occupied)");
var count = document.querySelector(".count");
var price = document.querySelector(".price");
var movieSelector = document.querySelector(".movie");
var ticketPrice = +movieSelector.value;
populateUI();


function setMovieData(Movieindex, Movieprice){
    localStorage.setItem("selectedMovieIndex", Movieindex);
    localStorage.setItem("setMoviePrice", Movieprice);

}

//update total and counts
function updateCount(){
    var selectedSeats = document.querySelectorAll(".row .seat.selected"); //using querySelectorAll because it will make the seats into a nodeList.
    
    //copy the selectedSeats array or nodeList to another array using the spread operator.
    //map through the array.
    //return a new array of indexes.
    var seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat); 
    });

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //this stores the seaats in the local storage successfully.


    selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount;    
    price.textContent = ticketPrice * selectedSeatsCount;
}

movieSelector.addEventListener("change", function(e){
   
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateCount();
})


seats.forEach(function(e){
    e.addEventListener("click", function(){
        if (e.classList.contains("seat")){
            e.classList.toggle("selected");
            updateCount();
        }      
    })
});

function populateUI(){
    //get data from storage and use it's functionality on the UI.
    var selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); //parse is the opposite of stringify in local storage. converts it back in an array.

    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }
//now for the applying local storage to the movie selector UI.
    var selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null){
        movieSelector.selectedIndex = selectedMovieIndex;
    }
    updateCount();
}

//both the methods are working, i will use the one created by me.
/*container.addEventListener("click", function(e){
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
        count++;
    }
});*/

updateCount();