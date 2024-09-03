import { openai } from '@/utils/openai';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { feedback } = req.body;

    try {
        const ttsResponse = await openai.createAudio({
            text: feedback,
            voice: 'en-US-Wavenet-D',
        });

        const audioUrl = ttsResponse.data.audio_url;
        res.status(200).json({ audioUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to convert text to speech' });
    }
}
