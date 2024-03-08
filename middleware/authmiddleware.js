const jwt = require("jsonwebtoken");
const {privateKey} = require('../controller/authController');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


const authenticate = function (req , res , next){
        const authToken = req.headers.authentication;
        console.log('authToken recieved');
        const decodedData = jwt.verify(authToken , privateKey);

        async function runQueries(){

            try{
                const user = await prisma.user.findMany({
                    where: {
                      email: decodedData.email,
                      username : decodedData.username
                    },
                })

                return user;

            }catch(err){
                console.log(err);
                return [];
            }



        }

        
            runQueries().then(async (data) => {

                if(data.length !== 0){
                    await prisma.$disconnect();
                    console.log('user found successfully');
                    req.user_id = data[0].id;
                    req.username = data[0].username;
                    req.email = data[0].email;

                    next();
                }else{
                    res.status(404).json({
                        "message" : "user not found"
                    })
                }
            })
            
            .catch(async (e) => {
    
                console.error(e)
    
                await prisma.$disconnect()
                res.status(404).json({
                    "message" : "user not found"
                })
                process.exit(1)
    
            })
    }

module.exports = authenticate;