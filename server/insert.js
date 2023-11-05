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

// Define an asynchronous function to insert new data in the collection
async function run() {
  try {

    app.use(cors());
    app.use(express.json());

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })

    // Connect to the proper database and collection
    await client.connect();
    const database = client.db('sample_mflix');
    const users = database.collection('users');
    console.log('Connected to MongoDB.');

    app.get('/', (req, res) => {
      res.send('hello message');
    })

    app.post('/upload', (req, res) => {
      const body = req.body;
      res.json(body);
      uploadData(body, users);
    })
    /*
    // Upload the data in the proper format
    const result = await users.insertOne({
        name: 'name2022',
        email: 'name2022@email.com',
        password: 'passwordnumber50044'
    });
    
    console.log(`A document was inserted with the _id: ${result.insertedId}`);*/
  } finally {
    // Close the MongoDB client connection
    //await client.close();
    //console.log('Disconnected from MongoDB.');
  }
}
run().catch(console.dir);

async function uploadData(body, coll) {
  const result = await coll.insertOne({
    name: body.name,
    email: body.email,
    password: body.password
  });

  console.log(`A document was inserted with the _id: ${result.insertedId}`);  
}
