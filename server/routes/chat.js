import OpenAI from 'openai';
import express from 'express';
import { prompt } from '../utils/helpers.js';

// Create a new router instance for cohort routes
const router = express.Router();

function getOpenAIClient() {
  return new OpenAI({
    baseURL: 'https://models.github.ai/inference/',
    apiKey: process.env.GH_TOKEN,
  });
}


// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const openai = getOpenAIClient();
    // Get the user's message from the request body
    const { userMessage } = req.body;
    if (!userMessage) {
  throw new Error('userMessage is required');
}

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });
    //Extract the AI's reply from the response
    const content = response.choices[0].message.content;
    // Parse the JSON string into a JavaScript object
    const parsed = JSON.parse(content);
    // If parsed response is missing required fields — throw an error
if (!parsed.title || !parsed.instructions) {
  throw new Error('Invalid response format from AI');
}
     // Send the reply back to the frontend
res.json({ reply: parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

export default router;
