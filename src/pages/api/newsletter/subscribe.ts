import { NowRequest, NowResponse } from '@now/node';
import nextConnect from 'next-connect';
import { MongoClient } from 'mongodb';

import mongoMiddleware from '../../../utils/middlewares/mongo';
import sessionMiddleware from '../../../utils/middlewares/session';

interface SessionUser {
  name: string;
  email: string;
}

const handler = nextConnect();

handler.use(mongoMiddleware);
handler.use(sessionMiddleware);

handler.post(async (req: NowRequest, res: NowResponse) => {
  // @ts-expect-error
  const client: MongoClient = req.mongoClient;
  // @ts-expect-error
  const sessionUser: SessionUser = req.session.user;

  try {
    const subscribersCollection = client
      .db('dbname')
      .collection('newsletter-subscribers');

    if (!sessionUser) {
      throw new Error('Not signed in');
    }

    await subscribersCollection.insertOne({ email: sessionUser.email });

    res.status(200).json({
      status: 'ok',
    });
  } catch (err) {
    console.error(err);
    console.error(err.stack);

    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default handler;
