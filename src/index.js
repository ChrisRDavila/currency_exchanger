import Exchange from "./sevices/Exchange-service"; 

//business Logic

function getRates(amount, type) {
  Exchange.getExchangeAPI(amount, type)
    .then(function(response) {
      if (response.result) {
        printElements(response, amount, type);
      } else {
        printError(response, amount, type);
      }
    });
}

// UI Logic

// function printElements(response, amount, type) {
//   document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${response.main.humidity}%.
//   The temperature in Kelvins is ${response.main.temp} degrees.`;
// }

// function printError(error, amount, type) {
//   document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: 
//   ${error}.`;
// }

// function handleFormSubmission(event) {
//   event.preventDefault();
//   const amount = document.querySelector('#amount').value;
//   const type = document.querySelector('#type').value;
//   document.querySelector('#amount').value = null;
//   document.querySelector('#type').value = null;
//   getRates(amount, type);
// }

// window.addEventListener("load", function() {
//   document.querySelector('form').addEventListener("submit", handleFormSubmission);
// });