const {Router} = require('express');
const userController = require('../controller/userController');
const authmiddleware = require('../middleware/authmiddleware');



const router = Router();



router.get('/getmydata'   , authmiddleware , userController.getUserData);

router.get('/getmyservers'  , authmiddleware ,  userController.getUserServers);

router.get('/getmyrooms/:server_id' , authmiddleware , userController.getUserRooms);

router.get('/getallservers' , authmiddleware , userController.getAllServers);

router.get('/getjoinedservers' , authmiddleware , userController.getJoinedServers);

router.get('/getservermembers/:server_id' , authmiddleware , userController.getMembersOfServer);

router.get('/getallroomsandservers' , authmiddleware , userController.getAllUserRoomsAndServers);

router.post('/createServer'  , authmiddleware , userController.createServer);

router.post('/joinserver' , authmiddleware , userController.joinServer);

router.post('/createRoom'  , authmiddleware , userController.createRoom);

router.delete('/deleteRoom/:room_id' , authmiddleware , userController.deleteRoom);

router.delete('/leaveServer/:member_id', authmiddleware , userController.leaveServer);



module.exports = router;
