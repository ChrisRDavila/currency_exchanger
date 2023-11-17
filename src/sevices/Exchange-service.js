export default class Exchange {  
  static getExchangeAPI(amount, type) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return [response.json(), amount, type];
        }
      })      
      .catch(function(error) {
        return error;
      });
  }  
}