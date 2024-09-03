import { NextApiRequest, NextApiResponse } from 'next';
import openai from '../../utils/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text } = req.body;
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: text,
        max_tokens: 100,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
