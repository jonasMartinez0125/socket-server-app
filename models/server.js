//servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {
    
    constructor() {
        this.app = express();;
        this.port = process.env.PORT;

        // HTTP server
        this.server = http.createServer(this.app);

        // configuraciones de sockets
        this.io = socketio(this.server, { /* configuraciones */});
    }

    middlewares() {
        // desplegar el directorio publico
        this.app.use( express.static( path.resolve(__dirname, '../public') ) );

        // CORS
        this.app.use( cors() );
    }

    configSockets() {
        new Sockets(this.io);
    }

    execute() {
        // Inicializar middlewares
        this.middlewares();
        // Inicializar sockets
        this.configSockets();
        // Inicializar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;