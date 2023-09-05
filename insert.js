const fs = require('fs');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;

const csvFilePath = './Movie_list.csv'; // Replace with the path to your CSV file
const databaseURL = 'mongodb+srv://hiteshselvarajan:4252229044@cluster0.iuccbki.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URL
const dbName = 'MOVIE'; // Replace with your MongoDB database name
const collectionName = 'Movies'; // Replace with your MongoDB collection name

// Create a MongoDB client
const client = new MongoClient(databaseURL, { useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect(async (err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  console.log("Db connected")

  // Read the CSV file and insert data into MongoDB
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      // Insert each CSV row as a document into the MongoDB collection
      collection.insertOne(data, (err) => {
        if (err) {
          console.error('Error inserting document:', err);
        }
      });
    })
    .on('end', () => {
      console.log('CSV file import completed.');
      client.close();
    });
});
