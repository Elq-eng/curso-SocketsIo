import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { v4 } from "uuid";
import { Subject } from 'rxjs'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FzY2F2aXRhMTIzIiwiYSI6ImNsZ3ZjbWhheTJsdjIzZ2x1a3A1a3VrdW8ifQ.WpTkfeGWkJHElYvBYobjBw'



export const useMapbox = ( puntoInicial ) => {

  // referencia al div
  const mapaDiv = useRef()
  const setRef = useCallback((node)=>{
    mapaDiv.current = node
  },[])



  // referencia los marcadores
  const marcadores = useRef({})

  // observables de Rxjs
  const movimientoMarcador = useRef( new Subject() );
  const nuevoMarcador = useRef( new Subject() );

  // const [mapa, setMapa] = useState();
  const mapa = useRef();
  const [coords, setCoords] = useState( puntoInicial );




  // funcio para agregar marcadores
  const agregarMarcador = useCallback( (ev, id)=> {

      const { lng, lat } = ev.lngLat || ev;
      const marker = new mapboxgl.Marker()
      marker.id = id ??  v4() //  si el marcador ya tiene id

      marker
            .setLngLat([lng,lat])
            .addTo( mapa.current )
            .setDraggable( true )

      // asignar al objeto de marcadores
      marcadores.current[ marker.id ] = marker

      if( !id ){ 
        
        nuevoMarcador.current.next({
          id: marker.id,
          lng,
          lat
        })
      }

      // escuchar movimientos del marcador
      marker.on('drag', ( { target } ) => {
        const { id } = target
        const { lng, lat } = target.getLngLat()

        movimientoMarcador.current.next({ id, lng, lat })
      } )
  },[])

// funcion para actualizar la ubicacion del marcador

  const actualizacionPosicion = useCallback( ({ id,lng,lat })=>{

    marcadores.current[id].setLngLat([ lng, lat ])
  },[])


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ puntoInicial.lng, puntoInicial.lat ],
      zoom: puntoInicial.zoom
    });
    mapa.current = map

  }, [ puntoInicial ]);


  useEffect(() => {
    mapa.current?.on('move',()=>{
      const { lng,lat } = mapa.current.getCenter()
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2)
      })
    })
  }, []);
  



  useEffect(() => {
    mapa.current?.on('click', agregarMarcador)
    console.log('estamos aqui')
  }, [agregarMarcador]);

  return {
    actualizacionPosicion,
    agregarMarcador,
    coords,
    marcadores,
    movimientoMarcador$: movimientoMarcador.current,
    nuevoMarcador$: nuevoMarcador.current,
    setRef
  }
}

