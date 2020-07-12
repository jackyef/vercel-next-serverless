import { NowRequest, NowResponse } from '@now/node';
import fetch from 'node-fetch';
import qs from 'querystring';

const searchEndpoint = `http://universities.hipolabs.com/search`;

export default async (req: NowRequest, res: NowResponse) => {
  const json = await (
    await fetch(`${searchEndpoint}?${qs.stringify(req.query)}`)
  ).json();

  res.status(200).json(json);
};
