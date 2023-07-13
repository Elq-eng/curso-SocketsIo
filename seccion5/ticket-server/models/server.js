const express = require('express');
const http = require('http');
const path = require('path');
const socketsio = require('socket.io');
const Sockets = require('./sockets')
const cors = require('cors');

class Server{


  constructor(){
    this.app = express();
    this.port = process.env.PORT
    
    // Http server
    this.server = http.createServer( this.app )
    

    //configuracion de sockets y sockets server
    // configuracion del socket server
    this.io = socketsio( this.server,{ 
      cors: {
      origin: '*',
    }} )

    // inicializar sockets 
    this.sockets = new Sockets( this.io )
    
  }

  middleware(){
    this.app.use( cors() )
    this.app.use(express.static( path.resolve(__dirname, '../public')))

    this.app.get('/ultimos', (req, res) => {

      res.json({
        ok:true,
        ultimos: this.sockets.ticketList.ultimo13
      })
    })

  }

  // configuracionSockets(){
  //   new Sockets( this.io )
  // }

  execute( ){

    this.middleware()

    // this.configuracionSockets()

    this.server.listen( this.port,()=>{
      console.log('Servidor corriendo en el puerto 8080');
    });
  }


}



module.exports = Server