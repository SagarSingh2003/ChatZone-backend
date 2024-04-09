const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    save : function (req , res) {
        console.log("save message");
        const user_id = req.user_id;
        const message = req.body.message;
        const room_id = req.body.room_id;

        const currentDate = new Date();

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDay();
        const currentHour = currentDate.getHours().toString().length == 1 ? "0" + currentDate.getHours() : currentDate.getHours();
        const currentMinutes = currentDate.getMinutes().toString().length == 1 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds().toString().length == 1 ? "0" + currentDate.getSeconds() : currentDate.getSeconds();
        
        const createdAt = currentHour + ":" + currentMinutes + ":" + currentSeconds + " " + currentDay + "-" + currentMonth + "-" + currentYear;

        const ofType = req.body.ofType;

        async function runQueries(){

            try{

                const messages = await prisma.messages.create({
                    data : {
                        user_id : user_id,
                        message : message,
                        room_id : room_id,
                        createdAt : createdAt,
                        OfType : ofType
                    }
                })

                return messages;
            }catch(err){
                if(err){

                    return err;
                }
            }
        }

        runQueries().then((response) => {
            console.log(response);

            res.status(200).json({
                msg : response
           });
        })
    },
    delete : function(req ,res) {

        
        console.log('got put request')
        const messageId = req.body.messageId ;

        async function runQueries(){

            try{

                const messages = await prisma.messages.update({
                    where : {
                        id: Number(messageId)
                    },

                    data : {
                        message: req.body.messageData ?  req.body.messageData : "message was deleted by the user"
                    }
                })

                return messages;
            }catch(err){
                if(err){

                    return err;
                }
            }
        }

        runQueries().then((response) => {
            console.log(response);

            res.status(200).json({
                msg : "message deleted successfully"
           });
        })
    } , 

    makeAdmin : function(req , res){
        console.log('got put request')
        
        const userId = Number(req.body.userId);

        async function runQueries(){

            try{

                const messages = await prisma.members.update({
                    where : {
                        id: userId
                    },

                    data : {
                        isadmin : true
                    }
                })

                return messages;
            }catch(err){
                if(err){

                    return err;
                }
            }
        }

        runQueries().then((response) => {
            console.log(response);

            res.status(200).json({
                msg : "admin priveleges given"
           });
        })
    }
}