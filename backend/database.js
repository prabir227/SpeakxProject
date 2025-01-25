const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'questions';
const COLLECTION_NAME = 'allQuestions';


async function getAnagramsByTitle(title) {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const results = await collection.find({ title: title }).toArray();

    return results?.map((doc) => ({
        id: doc._id?.toString() || '',
        type: doc.type || '',
        anagramType: doc.anagramType || '',
        blocks: Array.isArray(doc.blocks) ? doc.blocks.map((block) => ({
          text: block.text || '',
          showInOption: block.showInOption || false,
          isAnswer: block.isAnswer || false,
        })) : [],
        siblingId: doc.siblingId?.$oid || '',
        solution: doc.solution || '',
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
