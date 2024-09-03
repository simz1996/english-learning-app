import { openai } from '@/utils/openai';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { audioBlob } = req.body;

        try {
            const response = await openai.createTranscription({
                audio: audioBlob,
                model: 'whisper-1',
            });

            const transcription = response.data.text;
            res.status(200).json({ transcription });
        } catch (error) {
            res.status(500).json({ error: 'Failed to transcribe audio' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
