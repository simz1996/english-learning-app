import { openai } from '@/utils/openai';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { transcription } = req.body;

    try {
        const feedbackResponse = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a language assistant.' },
                { role: 'user', content: `Evaluate this text for pronunciation, fluency, and intonation: "${transcription}"` },
            ],
        });

        const feedback = feedbackResponse.data.choices[0].message.content;
        res.status(200).json({ feedback });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate feedback' });
    }
}
