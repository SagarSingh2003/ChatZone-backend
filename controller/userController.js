const { PrismaClient } = require('@prisma/client');
const server = require('../server');
const prisma = new PrismaClient()


module.exports = {
    getUserData : function (req ,res ) {
        
        if(req.username && req.email){
            res.json({
                "user_id" : req.user_id,
                "username" : req.username,
                "email" : req.email
            })
        }
    },

    getUserServers : function (req , res){
        const user_id = req.user_id;

        async function runQueries(){
            try{
                const serverData = await prisma.servers.findMany({
                    where: {
                      user_id : user_id
                    }
                  })
                
                  if(serverData.length === 0 ){
                    res.status(404).json({
                        "message" : "servers not found" 
                    })
                }else{
    
                    
                    res.status(200).json({
                        server_data : serverData
                    });

                    
                }

                return serverData;

            }catch(err){
                console.log(err);
                res.status(422).json({
                    "message" : "unable to find servers please create one first!"
                })
                return []
            }

        }

        runQueries().then(async (serverData) => {
            
        })
    },

    getUserRooms: function(req , res){
        
        console.log('getting rooms....')
        const server_id = req.params.server_id;
            
            
        async function runQueries(){
            try{
                const roomData = await prisma.rooms.findMany({
                    where: {
                        server_id : server_id
                    }
                  })
                 

                if(roomData.length === 0 ){
                    res.status(200).json({
                        "message" : "rooms not found" 
                    })
                }else{
                    
                    res.status(200).json({
                        room_data : roomData
                    });
                    
                }
    
                return roomData;
            }catch(err){
                console.log(err);
                res.status(422).json({
                    "message" : "unable to find room please create one first!"
                })
                return []
            }

        }

        runQueries().then(async (roomData) => {
        })

    },

    createServer : function (req , res){
        const serverId = crypto.randomUUID();
        const server_name = req.body.server_name;
        const user_id = req.user_id;

        async function runQueries(){
            try{
                const serverData = await prisma.servers.create({
                    data: {
                      server_id : serverId,
                      server_name: server_name,
                      user_id : user_id
                    },
                  })
                  
                  res.status(200).json({
                    "message" : "server created successfully", 
                     "server_name" : serverData.server_name       
                    })
                    
                  return true;
            }catch(err){
                console.log(err);
                res.status(422).json({
                    "message" : "server name already exists please choose a different name"
                })
                return null
            }

            
        }

        runQueries()

                .then(async () => {
        
                })
        
                .catch(async (e) => {
        
                    console.error(e)
                    
                    
                    res.status(422).json({
                        "message" : 'could not create server'
                    })
                    process.exit(1)
        
                })
    },

    createRoom : function (req , res){
        const server_id = req.body.server_id;
        const user_id = req.user_id;
        const room_name = req.body.room_name + server_id;
        const room_id = crypto.randomUUID();

        async function runQueries(){
            try{
                const roomData = await prisma.rooms.create({
                    data: {
                      server_id : server_id,
                      room_id: room_id,
                      room_name: room_name
                    }
                  })
                  
                  res.status(200).json({
                     "message" : "room created successfully", 
                     "room_name" : roomData.room_name,  
                     "room_id" : roomData.room_id     
                    })
                    
                  return true;
            }catch(err){
                console.log(err);
                res.status(422).json({
                    "message" : "room name already exists please choose a different name"
                })
                return null
            }

            
        }

        runQueries()

                .then(async () => {
        
                })
        
    },

    deleteRoom : function(req , res){
        const room_id = req.params.room_id;
        

        async function runQueries(){
            try{
                const deletedUser = await prisma.rooms.delete({
                    where: {
                      room_id : room_id
                    },
                })
    
                return deletedUser
            }catch(err){
                console.log(err);
                return null;
            }
        }

        runQueries().then(async (response) => {
             res.json({
                "successful" : "true",
                "message" : "deleted room successfully"
             })
        })
    }, 

    getAllServers : function (req ,res){
        const user_id = req.user_id;

        async function runQueries(){
            try{
                const serverData = await prisma.servers.findMany({
                    where: {},
                  })
                  
                return serverData;
            }catch(err){
                console.log(err);
                return []
            }

        }

        runQueries().then(async (serverData) => {

            if(serverData.length === 0 ){
                res.status(404).json({
                    "message" : "servers not found" 
                })
            }else{
                res.status(200).json({
                    server_data : serverData
                });
                
            }
        })

    }, 

    joinServer : function (req , res){
        const user_id = req.user_id;
        const server_id = req.body.server_id;

        //Checking if the server exists : 
        async function runQueries(){
            try{
                const memberData = await prisma.members.findMany({
                    where: {
                        user_id : user_id,
                        server_id : server_id
                    }
                  })
                  
                return memberData;
            }catch(err){
                console.log(err);
                return []
            }

        }

        runQueries().then(async (memberData) => {

            if(memberData.length === 0 ){
                            
                            
                    async function runQueries(){
                        try{
                            const newmemberdata = await prisma.members.create({
                                data: {
                                server_id : server_id,
                                user_id : user_id
                                },
                                relationLoadStrategy: 'join',
                                include: {
                                  server: {
                                    select : {
                                        server_name : true,
                                        user_id : true,
                                        id : true
                                    }
                                  }
                                }
                            })
                            
                            res.status(200).json({
                                "message" : "server joined successfully", 
                                "memberData" : newmemberdata      
                                })
                                
                            return true;
                        }catch(err){
                            console.log(err);
                            res.status(422).json({
                                "message" : "some error occured please try again!",
                            })
                            return null
                        }

                        
                    }

                    runQueries()

                    .then(async () => {
                    })
            }else{


                
                res.status(422).json({
                    "message" : "you are already a member!",
                    "memberData" : {user_id :memberData[0].user_id , server_id : memberData[0].server_id}  
                })

            }
        })
        
        
    }, 

    getJoinedServers : function (req ,res){
        const user_id = req.user_id;

            async function runQueries(){
                try{
                    const memberData = await prisma.members.findMany({
                        where: {
                            user_id : user_id
                        },relationLoadStrategy: 'join',
                        include: {
                          server: {
                            select : {
                                server_name : true,
                                user_id : true,
                                id : true
                            }
                          }
                        }
                      })
                    
                    
                    if(memberData.length === 0 ){
                        res.status(422).json({
                            "message" : "servers not found" 
                        })
                    }else{
                        
                        res.status(200).json({
                            "message" : "servers found",
                            "joinedServer" : memberData
                        });
                        
                    }

                    return memberData;
                }catch(err){
                    console.log(err);
                    res.status(422).json({
                        "message" : "unable to find servers please create one first!"
                    })
                    return []
                }
    
            }
    
            runQueries().then(async (memberData) => {
            })
          
        
        
        
    },
    
    getMembersOfServer : function(req ,res){
        
        const server_id = req.params.server_id;

        async function runQueries(){
            try{
                const memberData = await prisma.members.findMany({
                    where: {
                        server_id : server_id,
                    },
                    relationLoadStrategy: 'join',
                    include: {
                      user: true,
                      select : {
                        username : true ,                       
                      }
                    },
                  })
                  
                return memberData;
            }catch(err){
                console.log(err);
                res.status(422).json({
                    "message" : "unable to find servers please create one first!"
                })
                return []
            }

        }

        runQueries().then(async (memberData) => {
            if(memberData.length === 0 ){
                res.status(422).json({
                    "message" : "servers not found" 
                })
            }else{


                
                await prisma.$disconnect();
                res.status(200).json({
                    "joinedMember" : {id : memberData.user_id , user_id : memberData.server_id}
                });
                
            }
        })
    } , 

    leaveServer : function(req , res){
        const member_id = Number(req.params.member_id);

    
        
        async function runQueries(){
            try{
                const deletedUser = await prisma.members.delete({
                    where: {
                      id : member_id
                    },
                })
                
                res.status(200).json({
                    "successful" : "true",
                    "message" : "left server successfully"
                 })

                return deletedUser
            }catch(err){
                console.log(err);
               
                
                res.json({
                    "successful" : "false",
                    "message" : "some error occured or left server already"
                })
                return null;
            }
        }

        runQueries().then(async (response) => {
             
        })       
        
    }, 

    getAllUserRoomsAndServers : function (req , res){

        const user_id = req.user_id;


        async function runQueriesAndGetCreatedServerRooms(){
            try{
                const roomData = await prisma.servers.findMany({
                    where: {
                        user_id : user_id
                    },
                    relationLoadStrategy: 'join',
                    include: {
                      room: true,
                      member: {
                        include : {
                            user: true
                        }
                      }
                    },
                  })
 
                 

                if(roomData.length === 0 ){
                    // res.status(200).json({
                    //     "message" : "rooms not found" 
                    // })
                }else{
                    
                    // res.status(200).json({
                    //     room_data : roomData
                    // });
                    
                }
    
                return roomData;
            }catch(err){
                console.log(err);
                // res.status(422).json({
                //     "message" : "unable to find room please create one first!"
                // })
                return []
            }

        }

        async function runQueriesAndGetJoinedServerRooms(){
            try{
                const memberData = await prisma.members.findMany({
                        where: { user_id: user_id },
                        select: {
                          server_id: true,
                          id : true,
                          server: { 
                            select : {
                            server_name: true,
                            id: true ,
                            user: {
                                select : {
                                    id : true,
                                    email : true,
                                    username : true
                                }
                            },
                            room: true,
                            member : {
                                include : {
                                    user : true
                                }
                            }
                          },
                        },
                      }});
                return memberData;
            }catch(err){

                return []
            }

        }

       

        Promise.all( [runQueriesAndGetCreatedServerRooms() , runQueriesAndGetJoinedServerRooms()] ).then(values => res.status(200).json({createdServerRooms : values[0] , joinedServerRooms : values[1]}));



    },

}