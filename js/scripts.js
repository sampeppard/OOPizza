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
  if (this.pizzaSize === "small") {
    this.price += 5;
  }
  else if (this.pizzaSize === "medium") {
    this.price += 8;
  }
  else if (this.pizzaSize === "large") {
    this.price += 11;
  }
  else if (this.pizzaSize === "extra-large") {
    this.price += 14;
  }
};


Pizza.prototype.calcStyleSize = function() {
  this.calcOrderStyle();
  this.calcSize();
}

Pizza.prototype.calcToppings = function(toppingsCount) {
  this.price += toppingsCount;
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
    $(".customer-profile-section").slideDown(500);
    $("#user-input").slideDown(500);

  }); // end submit

  $("form#user-input").submit(function(event) {
    event.preventDefault();

    var orderStyleInput = $("input:radio[name='order-style-group']:checked").val();
    var sizeInput = $("input:radio[name='size-group']:checked").val();
    var toppingCountInput = $("input[type='checkbox']:checked").length;
    var customerPizza = new Pizza(orderStyleInput, sizeInput);

    customerPizza.calcStyleSize();
    customerPizza.calcToppings(toppingCountInput);

    var profileName = $("#name-output").text();

    console.log(customerPizza.price);
    $("#your-orders").append("<li class='listed-order'>" +  + "</li>");

    $(".listed-order").last().click(function() {
      $(".order-output-section").slideDown(500);
      $(".movie-name").text(userTicket.movieTitle);
      $(".movie-time").text(userTicket.time);
      $(".movie-price").text(userTicket.priceCategory);
      $(".final-price").text("$" + userTicket.price + ".00");
    }); // end click

    //reset();
  }); // end submit

}); // end ready
