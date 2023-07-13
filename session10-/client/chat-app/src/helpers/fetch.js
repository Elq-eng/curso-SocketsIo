const baseUrl = import.meta.env.VITE_API_URL


export const fecthSinToken = async ( endpoint, data, method = 'GET' ) =>{

  const url = `${ baseUrl }/${ endpoint }`
  if ( method === 'GET' ){
    const resp = await fetch( url )
    return await resp.json();
  }else{
    const resp = await fetch( url, {
      method,
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify( data )
    })

    return await resp.json();
  }
} 



// con token 
export const fecthConToken = async ( endpoint, data, method = 'GET' ) =>{

  const url = `${ baseUrl }/${ endpoint }`

  const token = localStorage.getItem( 'token' ) || ''; 


  if ( method === 'GET' ){
    const resp = await fetch( url,{
      headers:{
        'x-token':token
      }
    } )
    return await resp.json();
  }else{
    const resp = await fetch( url, {
      method,
        
        headers: { 'Content-Type': 'application/json','x-token':token},
      body: JSON.stringify( data )
    })

    return await resp.json();
  }
} 