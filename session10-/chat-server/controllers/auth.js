const { response } = require("express");
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


const createUser = async(req, res=response) =>{

  try {
    const { email,password } = req.body;

    // verificar que el email no exista
    const existeEmail = await Usuario.findOne({ email })

    if ( existeEmail ){
      return res.status(400).json({
        ok:false,
        msg:'El correo ya existe'
      })
    }
    const usuario = new Usuario( req.body );

    // encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync( password, salt )

    //Guardar usuario en BD
    
    await usuario.save()

    // generar un token
    const token =  await generarJWT( usuario.id )

    res.json({
      ok: true,
      usuario,
      token
    })
    
  } catch (error) {
    console.log( error )
    res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    })
  }
}


// login
const login = async(req, res=response) =>{

  const { email,password } = req.body;

  try {

    const usuarioDB = await Usuario.findOne({ email})
    if( !usuarioDB ){
      return res.status(404).json({
        ok:false,
        msg: 'Email no encontrado'
      })
    }

    const validPassword = bcrypt.compareSync( password, usuarioDB.password )

    if( !validPassword ){
      return res.status(404).json({
        ok: false,
        msg: 'Password no encontrado'
      })
    }

    const token = await generarJWT( usuarioDB.id );

    res.json({
      ok: true,
      usuarioDB,
      token
    })


    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    })
  }

 
}

const renewToken = async(req, res=response) =>{

  const uid = req.uid;

  // generar un nuevo token 
  const token = await generarJWT( uid );

  const usuario = await Usuario.findById( uid )

  res.json({
    ok:true,
    usuario,
    token
  })
}





module.exports = {
  createUser: createUser,
  login: login,
  renewToken: renewToken
}