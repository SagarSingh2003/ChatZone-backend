<h1>ChatZone</h1>
Functionalities and current state of application :

![image](https://github.com/SagarSingh2003/chat-applciation-backend/assets/129133613/35756abd-cf61-4b51-bd62-9d5cc63994dc)

Working demo (will give a detailed one on
ce the app is complete): 




https://github.com/SagarSingh2003/chat-applciation-backend/assets/129133613/691022d8-e732-4f9c-b0a7-8b7ee73f8733




https://github.com/SagarSingh2003/chat-applciation-backend/assets/129133613/99026907-76a7-44f4-89a6-6edb21dc0da2


#### Tech Stack
- prisma as the ORM
- backend route handling using express.js
- postgreSql as the database
- zod for input validation
- jwt for auth
- socket.io for realtime communication
- backend written following MVC (model view controller) architecture
  

Endpoints : 

- /authenticate/signin
- /authenticate/signup
- /user/getmydata
- /user/getmyservers
- /user/getmyrooms/:server_id
- /user/getallservers
- /user/getjoinedservers
- /user/getservermembers/:server_id
- /user/getalroomsandservers
- /user/createServer
- /user/joinserver
- /user/createRoom
- /user/deleteRoom/:room_id
- /user/leaveServer/:member_id  
- /messages/save-message
- /messages/delete-message
- /messages/make-admin
