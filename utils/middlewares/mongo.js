import nextConnect from 'next-connect';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_CONNECTION_STRING;

const client = new MongoClient(uri, { useNewUrlParser: true });

const database = async (req, res, next) => {
  try {
    if (!client.isConnected()) await client.connect();
    req.mongoClient = client;
  
    await next();
  } catch (err) {
    console.error(err)
    console.error(err.stack)

    res.status(500).json({ status: 'error', message: err.message });
  }
}

const middleware = nextConnect();

middleware
  .use(database)

export default middleware;

