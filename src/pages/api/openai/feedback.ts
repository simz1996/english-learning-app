import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai'; // Import the OpenAI class

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is correctly set in your environment variables
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { transcription } = req.body;

    try {
      // Generate feedback using OpenAI's GPT-4 model
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a language assistant.' },
          { role: 'user', content: `Evaluate this text for pronunciation, fluency, and intonation: "${transcription}"` },
        ],
      });

      const feedback = response.choices[0].message.content;
      res.status(200).json({ feedback });
    } catch (error) {
      console.error('Error generating feedback:', error);
      res.status(500).json({ error: 'Failed to generate feedback' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

