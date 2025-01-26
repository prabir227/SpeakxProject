const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://prabirghosh:prabir227@cluster0.e8hzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'questions';
const COLLECTION_NAME = 'allQuestions';


async function getAnagramsByTitle(title) {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const results = await collection.find({ title: {$regex: title, $options:"i"}}).toArray();

    return results?.map((doc) => ({
        type: doc.type || '',        
        title: doc.title || '',
      }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Database query failed');
  } finally {
    await client.close();
  }
}

module.exports = { getAnagramsByTitle };