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

  /**
   * Because the API doesn't provide unique ID for each university, the best we can is to delete by index
   * This is not efficient, but the other solution would be to implement our own backend, which might take much time
   * This is a tradeoff considering the limited time we have
   */
  const { index } = req.body;

  try {
    const userCollection = client.db('dbname').collection('users');
    const user = await userCollection.findOne({ email: sessionUser.email });
    if (typeof index === 'undefined')
      throw new Error('Some fields are missing!');

    // just update the user favorite list
    await userCollection.updateOne(
      { email: sessionUser.email },
      {
        $set: {
          favoriteUniversities: [
            ...user.favoriteUniversities.slice(0, index),
            ...user.favoriteUniversities.slice(
              index + 1,
              user.favoriteUniversities.length,
            ),
          ],
        },
      },
    );

    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    console.error(err.stack);

    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default handler;
