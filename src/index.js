import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css'
import Exchange from "./sevices/Exchange-service"; 

//business Logic

function getRates(type, amount) {
  Exchange.getExchangeAPI(type, amount)
    .then(function(response) {
      if (response.result) {
        useInput(response, type, amount)
        // printElements(response, amount, type);
      } else {
        printError(response);
      }
    });
}

function useInput(response, type, amount) {
  const resultRate = response.conversion_rates[type];
  let resultAmount  = (resultRate * amount).toFixed(2);
  printElements(response, amount, type, resultAmount);
  
}

// UI Logic

function printElements(response, amount, type, resultAmount) {
  if (response.conversion_rates[type] === undefined) {
    document.querySelector('#show-results').innerText = `${type} is not a real country code`;
    document.querySelector('#type').value = null;
    document.querySelector('#amount').value = null;
  } else { 
    document.querySelector("#show-results").innerHTML = `<p>Your exchange from ${amount}$ USD<p>
    <p>in ${type} equals ${resultAmount}<p>`;
    document.querySelector('#type').value = null;
    document.querySelector('#amount').value = null;
  }  
}

function printError(error) {
  document.querySelector('#show-results').innerText = `There was an error accessing the data from exchange rate API ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const type = document.querySelector('#type').value.toUpperCase(); 
  const amount = document.querySelector('#amount').value;
  getRates(type, amount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});