const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 5000;

async function run() {

  //connection uri for mongodb cluster
  const uri = 'mongodb+srv://<username>:<password>@cluster0.laxg9wh.mongodb.net/?retryWrites=true&w=majority';

  const client = new MongoClient(uri);

  try {
    //connect to the mongodb server
    await client.connect();

    console.log('Connected to the database.');

    const pipeline = [
      {
          '$match': {
              'operationType': 'update',
          },
      }
    ];

    await monitorListingsUsingEventEmitter(client, 60000, pipeline);

    /* Query for a user with the indicated email
    const query = { email: 'mercedes_tyler@fakegmail.com' };
    const result = await collection.findOne(query);

    //console.log(movie);
    app.get('/api', (req, res) => {
        res.json({'name': 'leon'})
    })
    
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })*/
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();

    console.log('Disconnected from the database.');
  }
}
run().catch(console.error);

function closeChangeStream(timeInMs = 60000, changeStream) {
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log('Closing the change stream');
          resolve(changeStream.close());
      }, timeInMs)
  })
};

async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []){ 
  const database = client.db('sample_mflix');
  const collection = database.collection('comments');

  const changeStream = collection.watch(pipeline);

  changeStream.on('change', (next) => {
    console.log(next.updateDescription.updatedFields.text);  
  });

  changeStream.on('error', (error) => {
    console.error('Encountered an error in the change stream:', error);
  });

  await closeChangeStream(timeInMs, changeStream);
}
