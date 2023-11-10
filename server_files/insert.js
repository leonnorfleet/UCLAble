// Watch for changes in a collection by using a change stream
const { MongoClient } = require('mongodb');

//Express for communicating with react app
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://admin:abc1234@cluster0.laxg9wh.mongodb.net/?retryWrites=true&w=majority';

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
    await client.connect();
    const database = client.db('uclable_data');
    const users = database.collection('forms');
    console.log('Connected to MongoDB.');

    app.get('/', (req, res) => { // Ignore this it doesnt do anything, making sure the server is online
      res.send('hello');
    })

    /*
    When the app sends an object to the server, add the current date it is being sent at, convert it into a json object,
    log the data that will be uploaded for devs to see in the console and then upload it to the database
    */
    app.post('/upload', (req, res) => { 
      const body = req.body;
      let data = {
        name: body.name,
        date: new Date(),
        location: body.location,
        title: body.title,
        description: body.description
      };
      res.json(data);
      uploadData(data, users);
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
