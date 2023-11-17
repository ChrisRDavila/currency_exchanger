import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css'
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

function printElements(response) {
  const amount = document.querySelector('#amount').value;
  const type = document.querySelector('#type').value.toUpperCase();
  const rates = response[0];
  const resultRate = rates.conversion_rates[type];
  const resultAmount  = (resultRate * amount).toFixed(2);
  if (rates.conversion_rates[type] === undefined) {
    document.querySelector('#show-results').innerText = `${response[2]} is not a real country code`;
    document.querySelector('#type').value = null;
    document.querySelector('#amount').value = null;
  } else { 
    document.querySelector("#show-results").innerHTML = `<p>Your exchange from ${response[1]}$ USD<p>
    <p>in ${response[2]} equals ${resultAmount}<p>`;
    document.querySelector('#type').value = null;
    document.querySelector('#amount').value = null;
  }  
}

function printError(error) {
  document.querySelector('#show-results').innerText = `There was an error accessing the data from exchange rate API ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const type = document.querySelector('#type').value; 
  const amount = document.querySelector('#amount').value;
  getRates(amount, type);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});