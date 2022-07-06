var express = require('express');
var router = express.Router();
const {
    getAllSells
} = require('../controllers/bitcoin_controller');

router.get('/', getAllSells);

module.exports = router;