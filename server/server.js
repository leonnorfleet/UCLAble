// Watch for changes in a collection by using a change stream
const { MongoClient } = require('mongodb')

//Express for communicating with react app
const http = require('http')
const port = 5000

const server = http.createServer(
    (req, res) => {
        res.statusCode = 200,
        res.setHeader = ('ContentType', 'text/plain')
        res.end('Ending Response')
})

async function run() {
  try {
    server.listen(port, () => {
        console.log('Server Running')
    })

  } finally {

  }
}
run().catch(console.dir)
