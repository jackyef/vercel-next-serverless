import nextConnect from 'next-connect';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_CONNECTION_STRING;

const client = new MongoClient(uri, { useNewUrlParser: true });

const database = async (req, res, next) => {
  if (!client.isConnected()) await client.connect();
  req.mongoClient = client;

  await next();
}

const middleware = nextConnect();

middleware
  .use(database)

export default middleware;

