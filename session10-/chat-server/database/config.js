const mongoose = require('mongoose')



const dbConnection = async()=>{

  try {
    
    await mongoose.connect( process.env.DB_CNN_STRING,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // createIndexes: true
    })

    console.log('🔰 DB is connected')


  } catch (error) {
    console.log(error)
    throw new Error('Error en la base de datos - vea los logs')
  }
}


module.exports = {
  dbConnection
}