/**USE THIS FILE TO START THE SERVER WITH NODE OR NODEMON INSTEAD OF app.js SO WE CAN ALSO USE app.js WITH TESTING USING JEST AND SUPERTEST 
 * 
 * just:
 * 
 * nodemon server.js
*/

const app = require("./app")

app.listen(3000, function(){
  console.log("Server starting on port 3000")
})