const express = require('express');
const http = require('http');
const path = require('path');
const socketsio = require('socket.io');
const Sockets = require('./sockets')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{


  constructor(){
    this.app = express();
    this.port = process.env.PORT

    // conectar a base de datos
    dbConnection()
    
    // Http server
    this.server = http.createServer( this.app )
    

    //configuracion de sockets y sockets server
    // configuracion del socket server
    this.io = socketsio( this.server,{ /*  configuraciones */} )
    
  }

  middleware(){
    this.app.use(express.static( path.resolve(__dirname, '../public')))

    // cors
    this.app.use( cors() )

    // parseo del body
    this.app.use( express.json())

    // api ENDSPOINTS
    this.app.use('/api/login', require('../router/auth.routes'));
    this.app.use('/api/mensajes', require('../router/mensajes.routes'));

  }

  configuracionSockets(){
    new Sockets( this.io )
  }

  execute( ){

    this.middleware()

    this.configuracionSockets()

    this.server.listen( this.port,()=>{
      console.log('(ง🔥ﾛ🔥)ง  Servidor corriendo en el puerto 8080');
    });
  }


}



module.exports = Server