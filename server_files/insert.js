
// Watch for changes in a collection by using a change stream
const { MongoClient, ObjectId } = require('mongodb');

//Express for communicating with react app
const express = require('express');
const session = require('express-session'); //session-based authentication 
const cookieParser = require('cookie-parser'); //session-based authentication 
const cors = require('cors');
const app = express();
const port = 8080;

//google login
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '77081081456-7du49eo167ere00c7npqidttt56qcjlu.apps.googleusercontent.com';
const gclient = new OAuth2Client(CLIENT_ID);
const jwt = require('jsonwebtoken');
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://user:etT59jHnbIxskq2U@cluster0.laxg9wh.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

//Password hashing
const bcrypt = require('bcrypt');

//session key
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);

/*
This js script is for uploading javascript objects to the mongodb database in json form
*/

// Define an asynchronous function to insert new data in the collection
async function run() {
  try {

    app.use(cors());
    app.use(express.json());
    // Middleware for sessions, cookies, and CORS
    app.use(cookieParser());
    app.use(
      session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: true, //cookies are sent over HTTPS only
          httpOnly: true, // cookies are not accessible via client-side script
        },
      })
    );

    app.listen(port, () => { // Port that the server is listening on
        console.log(`Server listening on port ${port}`)
    })

    // Connect to the proper database and collection
    const mongoClient = await client.connect();
    const database = mongoClient.db('uclable_data');
    const users = database.collection('forms');
    // Use 'accounts' collection for signups
    const accounts = database.collection('accounts'); 
    console.log('Connected to MongoDB.');


    /*
    When the app sends a request to the server, pull all report forms from the mongodb database and send them to the client
    Might format the form before sending it to the user based on how we are designing the feature
    */
    app.get('/view-posts', async (req, res) => {
      let forms = await users.find({}).toArray()
      res.json(forms)
    })

    /*
    When the app sends an object to the server, add the current date it is being sent at, convert it into a json object,
    log the data that will be uploaded for devs to see in the console and then upload it to the database
    */
    app.post('/upload-report', (req, res) => { 
      const body = req.body;
      let data = {
        name: body.name,
        date: new Date(),
        location: body.location,
        title: body.title,
        description: body.description,
        votes: 0
      };
      res.json(data);
      uploadData(data, users);
    })

    app.post('/google-login', async (req, res) => {
      try {
        const { token } = req.body;
        const ticket = await gclient.verifyIdToken({  // Use gclient for verification
          idToken: token,
          audience: '77081081456-7du49eo167ere00c7npqidttt56qcjlu.apps.googleusercontent.com'
        });
        // Extract user information from the verified token.
        const payload = ticket.getPayload();
        const userId = payload.sub;
        const userEmail = payload.email;
        const userName = payload.name;
    
        const user = await accounts.findOneAndUpdate(
          { email: payload.email },
          { $setOnInsert: { /* ... */ } }, 
          { upsert: true, returnDocument: 'after' }
        );
        // Create a token
        const token = jwt.sign({ userId: userId, email: userEmail, name: userName }, secretKey);
        res.status(200).json({ success: true, token: userToken });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.put('/vote-post', (req, res) => {
      const body = req.body;
      res.json(body);
      updateVote(body, users);
    })

  } finally {
    // Close the MongoDB client connection
    //await client.close();
    //console.log('Disconnected from MongoDB.');
  }
}
run().catch(console.dir);

async function uploadData(data, coll) {
  const result = await coll.insertOne(data);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);  
}

/*
voting implementation
DOES NOT WORK PROPERLY!!!
Since there are no accounts yet, one can press vote, close the popup and reopen it to vote infinitely
*/
async function updateVote(data, coll) {
  if (data.liked) {
    await coll.updateOne(
      {_id: new ObjectId(data.idString)},
      {
        $inc: {votes: -1}
      }
    );
    console.log(`The votes were updated for a document with the _id: ${data.idString}`);
  }
  else {
    await coll.updateOne(
      {_id: new ObjectId(data.idString)},
      {
        $inc: {votes: 1}
      }
    );
    console.log(`The votes were updated for a document with the _id: ${data.idString}`);
  }
}
