const { PrismaClient } = require('@prisma/client')
const z = require('zod');
const jwt = require('jsonwebtoken');

const emailSchema = z.string().email({ message: "Invalid email address" });
const usernameSchema = z.string().min(2 ,{message : "username too short"});
const passwordSchema = z.coerce.string();

const prisma = new PrismaClient()

const privateKey = 'sflaskdflnsdlfasdfasldfjk';

module.exports = {
    privateKey : privateKey ,
    
    signup : function (req , res){
    
         console.log('signup request recieved....');
         const username = req.body.username;
         const email = req.body.email;
         const password = req.body.password;

        const userCheck = usernameSchema.safeParse(username);
        const emailCheck = emailSchema.safeParse(email);
        const passwordCheck = passwordSchema.safeParse(password);

        var passwordHash = jwt.sign(password, privateKey);


         //after validation done CREATE USER
         async function runQueries(){
            try{
                const user = await prisma.user.create({
                    data: {
                      email: email,
                      username: username.replaceAll(' ' , ''),
                      password: passwordHash
                    },
                  })
    
            }catch(err){
                console.log(err);
                res.status(422).json({
                    "message" : "user already exists or validation failed please check the input"
                })
                return null
            }
              const token = jwt.sign({email : email , username : username} , privateKey);

              res.status(200).json({
                "message" : "user created successfully",
                "jwt" : token          
              })
         }


        if(userCheck.success === true && passwordCheck.success === true && emailCheck.success === true){

                console.log('validation passed')
                runQueries()

                .then(async () => {
        
                    await prisma.$disconnect()
                    
                })
        
                .catch(async (e) => {
        
                    console.error(e)
                    
                    
                    await prisma.$disconnect()
                    res.status(422).json({
                        "message" : 'validation failed'
                    })
                    process.exit(1)
        
                })
             
        }else{
            const failiureMessageArr = new Array;
            if(userCheck.success === false){
                failiureMessageArr.push(userCheck)
            }

            if(emailCheck.success === false){
                failiureMessageArr.push(emailCheck)
            }

            if(passwordCheck.success === false){
                failiureMessageArr.push(password)
            }
            res.status(422).json({
                "message" : failiureMessageArr
            })
        }
    },

    signin : function (req ,res) {
        const email = req.headers.email;
        const password = req.headers.password;

        const passwordHash = jwt.sign( password, privateKey);

        const emailCheck = emailSchema.safeParse(email);
        const passwordCheck = passwordSchema.safeParse(password);


        async function runQueries(){

            try{
                const user = await prisma.user.findMany({
                    where: {
                      email: email,
                      password : passwordHash
                    },
                })

                return user;
            }catch(err){
                console.log(err);
                res.status(422).json({
                    "message" : "some error occured please refresh the page and try again"
                });
                return [];
            }



        }

        if(emailCheck.success === true && passwordCheck.success === true){
            runQueries().then(async (data) => {
                if(data.length !== 0){

                    const token = jwt.sign({email : email , username : data[0].username} , privateKey);
                    await prisma.$disconnect()
                    res.status(200).json({
                        "message" : "user found successfully",
                        "jwt" : token
                    })
                }else{
                    res.status(404).json({
                        "message" : "user not found please sign up first"
                    })
                }
            })
    
        }else{
            const failiureMessageArr = new Array;

            if(emailCheck.success === false){
                failiureMessageArr.push(emailCheck)
            }

            if(passwordCheck.success === false){
                failiureMessageArr.push(password)
            }
            res.status(422).json({
                "message" : failiureMessageArr
            })
        }
    }
}