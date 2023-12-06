// Watch for changes in a collection by using a change stream
const { MongoClient } = require('mongodb');

// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://user:etT59jHnbIxskq2U@cluster0.laxg9wh.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

// Declare a variable to hold the change stream
let changeStream;

/*
This js script is for viewing when changes happen to the mongodb database. Mainly for testing interactions with the app 
*/

// Define an asynchronous function to manage the change stream
async function run() {
  try {

    await client.connect();
    console.log('Connected to MongoDB.');

    const database = client.db('uclable_data'); // Connecting to the proper database and collection
    const users = database.collection('forms');
    
    // Open a Change Stream on the 'users' collection
    changeStream = users.watch();
    console.log('Listening for changes...');

    // Print change events as they occur
    for await (const change of changeStream) {
      console.log('Received change:\n', change);
    }
    // Close the change stream when done
    await changeStream.close();
    
  } finally {
    // Close the MongoDB client connection
    await client.close();
    console.log('Disconnected from MongoDB.');
  }
}
run().catch(console.dir);
