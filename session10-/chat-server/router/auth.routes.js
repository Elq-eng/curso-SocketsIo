
const { Router }  = require('express');
const { check } = require('express-validator') 
const { createUser, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


// crear usuario
router.post('/new',[
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('email', 'el email es obligatorio').isEmail(),
  validarCampos
], createUser)


// login

router.post('/',[
  check('email', 'el email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validarCampos
], login)

// revalidar token 
router.get('/renew', validarJWT ,renewToken)


module.exports = router 