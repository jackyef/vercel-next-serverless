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
// handler.use(authMiddleware);
handler.use(mongoMiddleware);
handler.use(sessionMiddleware);
handler.post(async (req: NowRequest, res: NowResponse) => {
  // @ts-expect-error
  const client: MongoClient = req.mongoClient;
  // @ts-expect-error
  const sessionUser: SessionUser = req.session.user;
  const { name, country, website } = req.body;

  try {
    if (!name || !country || !website)
      throw new Error('Some fields are missing!');

    const userCollection = client.db('dbname').collection('users');
    const user = await userCollection.findOne({ email: sessionUser.email });

    if (!user) {
      // insert a new user to collection, and add the selected university to its favorite list
      await userCollection.insertOne({
        email: sessionUser.email,
        name: sessionUser.name,
        favoriteUniversities: [
          {
            name,
            country,
            website,
          },
        ],
      });
    } else {
      // just update the user favorite list
      await userCollection.updateOne(
        { email: sessionUser.email },
        {
          $set: {
            favoriteUniversities: [
              ...user.favoriteUniversities,
              {
                name,
                country,
                website,
              },
            ],
          },
        },
      );
    }

    res.status(200).json({ status: 'ok', user });
  } catch (err) {
    console.error(err);
    console.error(err.stack);

    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default handler;
