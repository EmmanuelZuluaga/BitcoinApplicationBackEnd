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
        let difference=responseAxios.data[index][4]-responseAxios.data[(index+1)==responseAxios.data.length?responseAxios.data.length-1:index+1][4];
        let date=  new Date();
        date.setDate(currrentDate.getDate()-index);
        pricesBitcoin.push({
          timestamp:dataBitcoin[0] , 
          priceLow: dataBitcoin[1] , 
          priceHigh: dataBitcoin[2],
          priceOpen: dataBitcoin[3],
          priceClose:  dataBitcoin[4],
          difference:difference,
          date: date.toLocaleDateString('sv')
        })
      })
    );
    return res.json({
      data: pricesBitcoin,
    });
  })
  .catch(error => {
    console.log('A problem has occurred with the connection...');
  });
  };

  const getSellByPrice = async (req= request, res = response) => {
    const { date } = req.params;
    let data=[];
    let closePriceCOP;
    let closePriceEUR;
    let closePriceUSD;
    await axios.get('https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=86400&start='+date+'&end='+date)
    .then(responseAxios => {

        data= responseAxios.data[0]

        
      })
    .catch(error => {
      console.log('A problem has occurred with the connection...');
    });
  
   await  axios.get('https://api.coinbase.com/v2/exchange-rates?currency=USD')
    .then(responseAxios => {
      closePriceUSD=responseAxios.data.data.rates.USD;
      closePriceCOP=responseAxios.data.data.rates.COP;
      closePriceEUR=responseAxios.data.data.rates.EUR;
  
    })
    .catch(error => {
      console.log('A problem has occurred with the connection...');
    });
    return res.json({
      data: {
        date:date,
        closePriceUSD: data[4]*closePriceUSD,
        closePriceCOP: data[4]*closePriceCOP,
        closePriceEUR: data[4]*closePriceEUR
      },
    });
    };

  

module.exports = {
    getAllPrices,
    getSellByPrice
  };