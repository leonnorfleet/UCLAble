// Watch for changes in a collection by using a change stream
const { MongoClient, ObjectId } = require('mongodb');

//Express for communicating with react app
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://user:etT59jHnbIxskq2U@cluster0.laxg9wh.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

//Password hashing
const bcrypt = require('bcrypt');

/*
This js script is for uploading javascript objects to the mongodb database in json form
*/

// Define an asynchronous function to insert new data in the collection
async function run() {
  try {

    app.use(cors());
    app.use(express.json());

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

    // Add Signup Route
    app.post('/signup', async (req, res) => {
      try {
        // Validate input, hash password, store new user in database
        const { email, password } = req.body;

        // Validate Email
        if (!/@(g\.)?ucla\.edu$/.test(email)) {
          return res.status(400).send("Invalid email. UCLA members only.");
        }

        // Validate Password
        if (!/(?=.*[A-Z])(?=.*[@$%!^&#]).{8,}/.test(password)) {
          return res.status(400).send('Password must have at least eight characters, at least one uppercase letter, and at least one of the special characters: "@", "$", "%", "!", "^", "&", or "#".');
        }

        // Check if user already exists in 'accounts' collection
        const existingUser = await accounts.findOne({ email });
        if (existingUser) {
          return res.status(400).send("User already exists.");
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in 'accounts' collection
        await accounts.insertOne({ email, password: hashedPassword, name: req.body.name, likes: [] });
        res.status(201).send("User created successfully.");
      
      } catch (error) {
        res.status(500).send("Error during signup");
      }
    });

    // Add Login Route, THIS SHOULD BE A GET REQUEST
    app.post('/login', async (req, res) => {
      try {
       // Validate input, verify user, issue token if applicable
       const { email, password } = req.body;

        // Validate Email and Password Format
        if (!/@(g\.)?ucla\.edu$/.test(email) || !/(?=.*[A-Z])(?=.*[@$%!^&#]).{8,}/.test(password)) {
          return res.status(400).send("Invalid email or password format.");
        }

        // Check if user exists
        const user = await accounts.findOne({ email });
        if (!user) {
          return res.status(401).send("User not found.");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).send("Invalid password.");
        }
      } catch (error) {
        res.status(500).send("Error during login");
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
