import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Ensure the API key is set correctly
});

export default client;
