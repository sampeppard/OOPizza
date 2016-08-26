// Business Logic

var Customer = function(first, last, street, city, state, zip) {
  this.firstName = first;
  this.lastName = last;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

Customer.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Customer.prototype.address = function() {
  return "<p>Address: " + this.street + "</p>" + "<p>City: " + this.city + "</p>" + "<p>State: " + this.state + "</p>" + "<p>Zip Code: " + this.zip + "</p>";
}

var Pizza = function(orderStyle, size) {
  this.orderStyle= orderStyle;
  this.pizzaSize = size;
  this.toppings = [];
  this.price = 0;
};

Pizza.prototype.calcOrderStyle = function() {
  if (this.orderStyle === "delivery") {
    this.price += 3;
  }
};

Pizza.prototype.calcSize = function() {
  if (this.size === "small") {
    this.price += 5;
  }
  else if (this.size === "medium") {
    this.price += 8;
  }
  else if (this.size === "large") {
    this.price += 11;
  }
  else if (this.size === "etra-large") {
    this.price += 14;
  }
};

Pizza.prototype.calcToppings = function() {
  for (var i = 0; i < this.toppings.length; i++) {
    this.price += 1;
  }
}

Pizza.prototype.calcPrice = function() {
  this.calcOrderStyle();
  this.calcSize();
  this.calcToppings();
}

// UI Logic
$(document).ready(function() {

  $("form#new-customer").submit(function(event) {
    event.preventDefault();

    var firstNameInput = $("#new-name-first").val();
    var lastNameInput = $("#new-name-last").val();
    var streetInput = $("#new-address-street").val();
    var cityInput = $("#new-address-city").val();
    var stateInput = $("#new-address-state").val();
    var zipInput = $("#new-address-zip").val();

    var newCustomer = new Customer(firstNameInput, lastNameInput, streetInput, cityInput, stateInput, zipInput);

    $("#name-output").text(newCustomer.fullName());
    $("#address-output").html(newCustomer.address());

  }); // end submit

  $("form#user-input").submit(function(event) {
    event.preventDefault();

    var orderStyleInput = $("input:radio[name=order-style-group]:checked").val();
    var sizeInpunt = $("input:radio[name=size-group]:checked").val();
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
    }); // end click

    reset();
  }); // end submit

}); // end ready
