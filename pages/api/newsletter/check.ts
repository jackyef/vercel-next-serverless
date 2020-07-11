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

handler.get(async (req: NowRequest, res: NowResponse) => {
  // @ts-expect-error
  const client: MongoClient = req.mongoClient;
  // @ts-expect-error
  const sessionUser: SessionUser = req.session.user;

  try {
    const subscribersCollection = client
      .db('dbname')
      .collection('newsletter-subscribers');

    const user = await subscribersCollection.findOne({
      email: sessionUser.email,
    });

    if (!user) {
      res.status(200).json({
        status: 'NOT_SUBSCRIBED',
      });
    } else {
      res.status(200).json({
        status: 'SUBSCRIBED',
      });
    }
  } catch (err) {
    console.error(err);
    console.error(err.stack);

    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default handler;
