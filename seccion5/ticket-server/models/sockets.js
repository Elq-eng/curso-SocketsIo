const TicketList = require("./tikcet-list");


class Sockets{
  constructor( io ){

    this.io = io;

    // crear instacia de nuestro ticketlist
    this.ticketList = new TicketList()

    this.socketEvent()
  }

  socketEvent(){

    this.io.on( 'connection', ( sockets ) =>{
      console.log('cliente conectado ')

      sockets.on('solicitar-ticket', ( data, callback)=> {
        const nuevoTicket = this.ticketList.crearTicket();
        callback( nuevoTicket )
      })

      sockets.on('siguiente-ticket-trabajar', ( { agente, escritorio }, callback )=> {
        const suTikcet = this.ticketList.asignarTicket( agente, escritorio )
        callback( suTikcet)

        this.io.emit('ticket-asignado', this.ticketList.ultimo13)
      })

      

    } )
  }
}

module.exports = Sockets