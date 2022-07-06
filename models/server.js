const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {
  constructor() {
    
    this.app = express();
    this.app.use(bodyParser.json({ limit: '500mb', extended: true }));
    this.app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
    this.app.disable('x-powered-by');
    this.app.use(express.urlencoded({ extended: true }));
    this.port = process.env.PORT;
    this.paths = {
      bitcoin: '/api/bitcoin',
    };


 
    this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.bitcoin, require('../routes/bitcoin'));
  
    
    this.app.get('***', (req, res) => {
      res.sendFile(path.join(__dirname, 'public/index.html'));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}

module.exports = Server;