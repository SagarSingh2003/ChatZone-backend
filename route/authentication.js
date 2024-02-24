const {Router} = require('express');

const router = Router();

router.post('/signin' , authController.singin );

router.post('/signup' , authController.signup );



module.exports = Router;