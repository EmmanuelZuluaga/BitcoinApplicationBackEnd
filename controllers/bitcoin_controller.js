const { response } = require('express');

const getAllSells = async (req, res = response) => {

    return res.json({
      admins: 'Hola',
    });
  };

module.exports = {
    getAllSells
  };