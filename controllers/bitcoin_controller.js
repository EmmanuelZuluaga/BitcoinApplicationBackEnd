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
      responseAxios.data.map(async (dataBitcoin, index) => {
          console.log(index)
        pricesBitcoin.push({
          timestamp:dataBitcoin[0] , 
          priceLow: dataBitcoin[1] , 
          priceHigh: dataBitcoin[2],
          priceOpen: dataBitcoin[3],
          priceClose:  dataBitcoin[4],
          difference: responseAxios.data[index][4]-responseAxios.data[(index+1)==responseAxios.data.length?responseAxios.data.length-1:index+1][4]
           
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
    console.log(date)
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