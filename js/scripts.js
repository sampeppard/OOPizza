// Business Logic
var Ticket = function(priceCategory, time, movie, movieTitle) {
  this.priceCategory = priceCategory;
  this.time = time;
  this.movie = movie;
  this.movieTitle = movieTitle;
  this.price = 11;
}

Ticket.prototype.calcCategory = function() {
  if (this.priceCategory === "under5") {
    this.price -= 4;
  }
  else if (this.priceCategory === "student" || this.priceCategory === "senior") {
    this.price -= 3;
  }
}

Ticket.prototype.calcTime = function() {
  if (this.time === "day") {
    this.price /= 2;
  }
}

Ticket.prototype.calcMovie = function() {
  if (this.movie === "new") {
    this.price += 5;
  }
}

Ticket.prototype.calcPrice = function() {
  this.calcCategory();
  this.calcTime();
  this.calcMovie();
}

var reset = function() {
  $("input[type=radio]").prop("checked", function() {
    return this.getAttribute("checked") == "checked";
  });
  $("#movies").val("Choose here:");
}

// UI Logic
$(document).ready(function() {

  $("form#user-input").submit(function(event) {
    event.preventDefault();

    var userPriceCategory = $("input:radio[name=price-group]:checked").val();
    var userTime = $("input:radio[name=time-group]:checked").val();
    var userMovie = $("#movies").val();
    var userMovieTitle = $("#movies option:selected").text();
    var userTicket = new Ticket(userPriceCategory, userTime, userMovie, userMovieTitle);

    userTicket.calcPrice();

    $("#your-movies").append("<li class='listed-movie'>" + userMovieTitle + "</li>");

    $(".listed-movie").last().click(function() {
      $("#user-output").show();
      $(".movie-name").text(userTicket.movieTitle);
      $(".movie-time").text(userTicket.time);
      $(".movie-price").text(userTicket.priceCategory);
      $(".final-price").text("$" + userTicket.price + ".00");
    });

    reset();
  });
}); // end ready
