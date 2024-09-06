import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is correctly set in your environment variables
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { feedback } = req.body;

    try {
      // Generate audio using OpenAI's TTS API
      const response = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'nova',
        input: feedback,
        speed: 1.0,
      });

      // Log the response to understand its structure
      console.log('TTS Response:', response);

      // Example of extracting audio content (adjust based on actual structure)
      const audioUrl = response.data?.audio_url || ''; // Adjust if the actual property is different

      // Send the audio URL back to the client
      res.status(200).json({ audioUrl });
    } catch (error) {
      console.error('Error generating text-to-speech:', error);
      res.status(500).json({ error: 'Failed to convert text to speech' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
