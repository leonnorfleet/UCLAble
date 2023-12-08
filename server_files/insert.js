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
        userId: body.uid, //frontend now sends userid
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

    app.put('/vote-post', async (req, res) => { // read current state of a liked post for a logged in user and make decisions
      const body = req.body;
      const query = {id: body.userid};
      const account = await accounts.findOne(query);
      const curLikes = account.likes;

      if (curLikes.includes(body.idString)) {
        updateVote(body, users, accounts, -1, body.userid)
        res.json({status: 'unvoted', code: -1});
      }
      else {
        updateVote(body, users, accounts, 1, body.userid)
        res.json({status: 'voted', code: 1});
      }
      //updateVote(body, users);
    })

    app.post('/account-interact', async (req, res) => {
      const body = req.body;
      let data = { // Data template for new accounts
        id: body.id,
        email: body.email,
        name: body.name,
        likes: []
      }
      const query = { id: data.id };
      const result = await accounts.findOne(query); // check if an account exists

      if (result == null) {
        const newact = await uploadData(data, coll);
        console.log('Account not found, created a new one.');
        res.json(newact);
      } else {
        console.log(`Account exists under document with the _id: ${result._id}`);
        res.json(result);
      }
    })

    app.get('/user-profile', async (req, res) => {
      try {
        const userId = req.query.userId;
        const userProfile = await accounts.findOne({ id: userId });
    
        if (!userProfile) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const postCount = await forms.countDocuments({ 'userId': userId });
        const likedPostCount = userProfile.likes.length;
    
        const profileData = {
          name: userProfile.name,
          email: userProfile.email,
          numberOfPosts: postCount,
          numberOfLikedPosts: likedPostCount
        };
    
        res.json(profileData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });    

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

async function updateVote(data, coll, collAcc, choice, user) {
    await coll.updateOne(
      {_id: new ObjectId(data.idString)},
      {
        $inc: {votes: choice}
      }
    );
    console.log(`The votes were updated for a document with the _id: ${data.idString}`);
    
    if (choice == 1) {
      await collAcc.updateOne(
        {id: user},
        {
          $push: {likes: data.idString}
        }
      );
    }
    else {
      await collAcc.updateOne(
        {id: user},
        {
          $pull: {likes: data.idString}
        }
      );
    }

    console.log(`The votes were updated for a user document with the _id: ${data.idString}`);
}
