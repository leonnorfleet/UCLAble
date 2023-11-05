# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

-----------------------------------------------------------------------------------------------------------
# UCLAble---CS35L-Group-Project
Repo for CS35L Group Project

While in the client/ directory, run the command <npm install>

How to run server code:
  1. cd into client/server_files/
  3. go to the shared MongoDB project
  4. Database Access => add new database user => remember the username and password
  5. Database => Connect => Drivers => copy the connection string and replace the <username> and <password> fields
  6. paste this into the <const uri> variable and save the files
  7. run the command <nodemon insert.js> to run the server

How to run the client application:
  1. cd into client/
  2. run the command <npm start>
  3. keep in mind that the react app only works properly when the <insert.js> file in the server directory is running
  4. changes can be seen on the MongoDB database

Notes:
  - insert.js(located in the server_files directory) is a prototype for uploading data into the MongoDB database(works properly, need to implement a react form and send the data that way)
  - changes.js(located in the server_files directory) is a prototype for listening for changes to the data in the MongoDB database(works)
  - index.js(located in the server_files directory) was a random first attempt, isn't important
  - The react code for uploading the data is in Post.js(located in client/src)
  - WARNING!!! I did not add error handling for posting duplicates to MongoDB so keep that in mind when the node server crashes/the react app gives errors in the console

  

