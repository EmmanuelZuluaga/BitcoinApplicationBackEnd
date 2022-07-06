const { response } = require('express');
const axios = require('axios');


const getAllPrices = async (req, res = response) => {

  let currrentDate= new Date(Date.now());
  let initialDate=new Date(Date.now());

  initialDate.setDate(initialDate.getDate()-14);
  
  let pricesBitcoin=[];
  axios.get('https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=86400&start='+initialDate.toLocaleDateString('sv')+'&end='+currrentDate.toLocaleDateString('sv'))
  .then(responseAxios => {
   Promise.all(
      responseAxios.data.map(async (dataBitcoin) => {
        
        pricesBitcoin.push({
          timestamp:dataBitcoin[0] , 
          price_low: dataBitcoin[1] , 
          price_high: dataBitcoin[2],
           price_open: dataBitcoin[3],
           price_close:  dataBitcoin[4]
           
        })
      })
    );
    return res.json({
      data: pricesBitcoin,
    });
  })
  .catch(error => {
    console.log(error);
  });
  };

  const getSellByPrice = async (req= request, res = response) => {
    const { date } = req.params;

    axios.get('https://api.coinbase.com/v2/prices/BTC-USD/sell/'+date)
    .then(responseAxios => {
      return res.json({
        data: responseAxios.data.data,
      });
    })
    .catch(error => {
      console.log(error.response.status);
    });
    };

  

module.exports = {
    getAllPrices,
    getSellByPrice
  };