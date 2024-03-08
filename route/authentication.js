const {Router} = require('express');
const authController = require('../controller/authController');
const router = Router();



router.get('/signin' , authController.signin);

router.post('/signup' , authController.signup );




module.exports = router;