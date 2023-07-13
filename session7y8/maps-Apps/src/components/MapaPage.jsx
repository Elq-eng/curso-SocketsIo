import  { useContext, useEffect }  from 'react';

import "../index.css";
import { SocketContext } from '../context/SocketContext';
import { useMapbox } from '../hooks/useMapbox';




const puntoInicial = {
  lng:-122.4725,
  lat:37.8010,
  zoom:13.55
}


export const MapaPage = () => {
  
  const { coords,setRef, nuevoMarcador$, movimientoMarcador$, agregarMarcador, actualizacionPosicion } =  useMapbox(puntoInicial)
  const { socket } = useContext(SocketContext);
  
  // escuchar los marcadores existentes

  useEffect(() => {
    socket.on('marcadores-activos', ( marcadores )=> {
      for (const key of Object.keys( marcadores )) {
        agregarMarcador(marcadores[key], key)        
      }
      
      
    }) 
  }, [socket, agregarMarcador]);



  // genera un nuevo marcador
  useEffect(() => {
    nuevoMarcador$.subscribe( marcador =>{
      // NUEVO MARCADOR EMITIR
      socket.emit('marcador-nuevo', marcador )
    })
  }, [nuevoMarcador$, socket]);

  // escuchar nuevos marcadores
  useEffect(() => {

    socket.on('marcador-nuevo',(marcador)=>{
      agregarMarcador( marcador, marcador.id)
    })
  }, [socket,agregarMarcador]);


  // mover marcador mediante sochets
  useEffect(() => {
    socket.on('marcador-movimiento',(marcador)=>{
      actualizacionPosicion( marcador)
    })
  }, [ socket,actualizacionPosicion ]);
  
  // movimiento marcador
  
  useEffect(() => {
    movimientoMarcador$.subscribe( marcador =>{

      socket.emit('marcador-movimiento', marcador)
    })
  }, [socket, movimientoMarcador$]);

  
  return (
    <>

    <div className='info'> 
      Llng: {coords.lng } | lat: { coords.lng} | zoom: { coords.zoom}
    </div>

    <div 
    ref={ setRef }
    className='mapContainer'>
    
    </div> 


    </>
  )
}
