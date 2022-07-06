var express = require('express');
var router = express.Router();
const {
    getAllPrices,
    getSellByPrice
} = require('../controllers/bitcoin_controller');

router.get('/', getAllPrices);
router.get('/detail/:date', getSellByPrice);

module.exports = router;