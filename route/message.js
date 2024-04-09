const express = require('express');
const messageController = require('../controller/messageController');
const authmiddleware = require('../middleware/authmiddleware');

const router = express.Router();


router.post('/save-message' , authmiddleware ,  messageController.save);

router.put('/delete-message', authmiddleware , messageController.delete);

router.put('/make-admin' , authmiddleware , messageController.makeAdmin);


module.exports = router;