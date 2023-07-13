

class Sockets{
  constructor( io ){

    this.io = io;
    this.socketEvent()
  }

  socketEvent(){

    this.io.on( 'connection', ( sockets ) =>{

      sockets.on('mensaje-to-server', ( data ) =>{
        console.log( data )
        this.io.emit('mensaje-from-server', data );
      })
    } )
  }
}

module.exports = Sockets