import React from 'react'
import { MapaPage } from "./components/MapaPage"
import { SocketProvider } from "./context/SocketContext.jsx";

const MapApp = () => {
  return (
    <>
      <SocketProvider>
        <MapaPage/>
      </SocketProvider>

    </>
  )
}

export default MapApp