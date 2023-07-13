const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets{
  constructor( io ){

    this.io = io;
    this.socketEvent()
  }

  socketEvent(){

    this.io.on( 'connection', async  ( sockets ) =>{
      
      // //todo: validar el token 
      const [ valido, uid ] = comprobarJWT( sockets.handshake.query.token);

      if( !valido ){
        console.log('socket no identificado')
        return sockets.disconnect()
      }

      await usuarioConectado( uid  )


      

      // si el token no es valido desconectar
      // todo saber que usuario esta activo mendiando el uid
      // todo: emitir todos los usuarios conectados
      
      
      this.io.emit('lista-usuarios', await getUsuarios())
      
      
      //todo: socket join 
      // unir al usuario a una sala de socket io
      sockets.join( uid )

      // todo: escuchar cuando el cliente manda un mensajes mensaje personal 
      sockets.on('mensaje-personal',async( payload )=> {
        console.log( payload )
        const mensaje = await grabarMensaje( payload ) 
        this.io.to( payload.para ).emit('mensaje-personal', mensaje)
        this.io.to( payload.de ).emit('mensaje-personal', mensaje)


      })

      //  todo Disconnect 
      //  narcar en la bd que el usuario se desconecto 
      // todo  emitir todos los usuarios  conectados  
      sockets.on('disconnect', async () =>{
        console.log('cliente desconectado')
        await usuarioDesconectado( uid )
        this.io.emit('lista-usuarios', await getUsuarios())

      })

    } )
  }
}

module.exports = Sockets