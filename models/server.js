const { request } = require('express');
const express = require('express');

const newsPath = require('../routes/newsRoute');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            articles : '/api/news'
        }

        //this.usuariosPath = '/api/usuarios';

        //  Middlewares
        this.middlewares();

        // Lectura  y parseo del body
        this.app.use(express.json());
        

        //  Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        // Cors
       // this.app.use(cors());

        //  Directorio publico
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.paths.articles, newsPath)
    }

    listen(){
        this.app.listen(this.port, () => console.log(`Server Ready on http://localhost:${this.port}`))
    }
}

module.exports = Server;