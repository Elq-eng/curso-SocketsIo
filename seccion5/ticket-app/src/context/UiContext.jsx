import React,{ createContext, useContext,useState} from 'react'

export const UiContext = createContext()

const UiProvider = ({ children }) => {

  const [ocultarMenu, setOcultarMenu] = useState(true);

  const showMenu = () =>{
    setOcultarMenu(false);
  }


  const hideMenu = () =>{
    setOcultarMenu(true);
  }

  return (
    <UiContext.Provider value={{ocultarMenu, showMenu,hideMenu}}>
      { children}

    </UiContext.Provider>
  )
}

export default UiProvider