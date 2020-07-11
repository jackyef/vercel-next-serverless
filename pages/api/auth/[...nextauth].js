import NextAuth from 'next-auth';
import { sessionOptions } from '../../../utils/middlewares/session';

export default (req, res) => NextAuth(req, res, sessionOptions);
