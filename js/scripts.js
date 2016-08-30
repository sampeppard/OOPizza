// Business Logic

var Customer = function(first, last, street, city, state, zip) {
  this.firstName = first;
  this.lastName = last;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
};

Customer.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Customer.prototype.address = function() {
  return "<p>Address: " + this.street + "</p>" + "<p>City: " + this.city + "</p>" + "<p>State: " + this.state + "</p>" + "<p>Zip Code: " + this.zip + "</p>";
};

var Pizza = function(orderStyle, size, orderID) {
  this.orderStyle= orderStyle;
  this.pizzaSize = size;
  this.toppings = [];
  this.price = 0;
  this.orderID = orderID;
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

Pizza.prototype.calcPrice = function(toppingCountInput) {
  this.calcOrderStyle();
  this.calcSize();
  this.calcToppings(toppingCountInput);
};

Pizza.prototype.calcToppings = function(toppingsCount) {
  this.price += toppingsCount;
};

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
    $(".customer-profile-section").show();
    $("#user-input").show();
    $("#order-list").show();

  }); // end submit

  var orderIncrement = 0;

  $("form#user-input").submit(function(event) {
    event.preventDefault();
    orderIncrement++;
    var orderStyleInput = $("input:radio[name='order-style-group']:checked").val();
    var sizeInput = $("input:radio[name='size-group']:checked").val();
    var toppingCountInput = $("input[type='checkbox']:checked").length;
    var customerPizza = new Pizza(orderStyleInput, sizeInput, orderIncrement);

    customerPizza.calcPrice(toppingCountInput);

    var profileName = $("#name-output").text();

    $("#your-orders").append("<li class='listed-order'>" + profileName + ": order " + customerPizza.orderID + "</li>");

    $(".listed-order").last().click(function() {
      $(".order-output-section").show();
      $(".order-style-output").text(customerPizza.orderStyle);
      $(".size-output").text(customerPizza.pizzaSize);

      $(".final-price").text("$" + customerPizza.price + ".00");
    }); // end click

  }); // end submit

}); // end ready
