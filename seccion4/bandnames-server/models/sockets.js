const BandList = require('./band-list')

class Sockets{
  constructor( io ){

    this.io = io;

    this.bandList = new BandList()
    this.socketEvent()
  }

  socketEvent(){

    this.io.on( 'connection', ( sockets ) =>{

      console.log('Cliente conectado')

      //Emitir al cliente conectado, todas las bandas actuales
      sockets.emit( 'current-bands',this.bandList.getBands() )

      // para votar 
      sockets.on('votar-banda', ( id )=> {
        this.bandList.increaseBand( id )
        this.io.emit( 'current-bands',this.bandList.getBands() )
      })


      // para borrar 
      sockets.on('borrar-banda', ( id )=> {
        this.bandList.removeBand( id )
        this.io.emit( 'current-bands',this.bandList.getBands() )
      })


      sockets.on('cambiar-nombre', ( payload )=>{
        const {id, nombre } = payload
        this.bandList.changeName( id, nombre )
        this.io.emit( 'current-bands',this.bandList.getBands() )
      })

      sockets.on('nueva-banda', ( { nombre }) => {
        this.bandList.addBand( nombre )
        this.io.emit( 'current-bands',this.bandList.getBands() )
      })

    } )
  }
}

module.exports = Sockets