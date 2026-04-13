import OpenAI from 'openai';
import express from 'express';

// Create a new router instance for cohort routes
const router = express.Router();

function getOpenAIClient() {
  return new OpenAI({
    baseURL: 'https://models.github.ai/inference/',
    apiKey: process.env.GH_TOKEN,
  });
}

const prompt = `You are a helpful recipe assistant. 
You help users find recipe ideas and cooking suggestions.

Rules:
- If the user asks about food, recipes, or cooking — answer helpfully and suggest a recipe idea
- If the user asks about anything else — respond only with: "I am here to help with recipe ideas and cooking suggestions only!"
- Keep your answers friendly and short
- You can suggest any recipe based on what the user asks`;

// POST /api/chat
router.post('/', async (req, res) => {
  try {
      const openai = getOpenAIClient();
    // Get the user's message from the request body
    const { userMessage } = req.body;

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
    });
    //Extract the AI's reply from the response
    const content = response.choices[0].message.content;
    // Send the reply back to the frontend
    res.json({ reply: content });
  } catch {
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

export default router;
