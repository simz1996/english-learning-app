import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai'; // Import the OpenAI class

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is correctly set in your environment variables
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { audioBlob } = req.body;

        try {
            // Make sure the structure of the request matches the OpenAI API's expectations
            const response = await openai.audio.transcriptions.create({
                audio: audioBlob,    // Pass the audio file or blob
                model: 'whisper-1',  // Specify the transcription model
            });

            // Extract the transcription text from the response
            const transcription = response.text; // Ensure this is the correct property based on the response structure

            // Send the transcription back to the client
            res.status(200).json({ transcription });
        } catch (error) {
            console.error('Error transcribing audio:', error);
            res.status(500).json({ error: 'Failed to transcribe audio' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
