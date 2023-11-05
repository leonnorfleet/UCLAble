# UCLAble---CS35L-Group-Project
Repo for CS35L Group Project

How to run server code:
  1. cd into the server directory
  2. run the command <npm install>
  3. go to the shared MongoDB project
  4. Database Access => add new database user => remember the username and password
  5. Database => Connect => Drivers => copy the connection string and replace the <username> and <password> fields
  6. paste this into the <const uri> variable and save the files
  7. run the command <nodemon insert.js> to run the server

How to run the client application:
  1.  cd into the client directory
  2.  run the command <npm install>
  3. keep in mind that the react app only works properly when the <insert.js> file in the server directory is running
  4. changes can be seen on the MongoDB database

Notes:
  - insert.js(located in the server directory) is a prototype for uploading data into the MongoDB database(works properly, need to implement a react form and send the data that way)
  - changes.js(located in the server directory) is a prototype for listening for changes to the data in the MongoDB database(works)
  - index.js(located in the server directory) was a random first attempt, isn't important
  - The react code for uploading the data is in Post.js(located in client/src)

  
