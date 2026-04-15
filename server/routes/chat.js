import OpenAI from 'openai';
import express from 'express';
import db from '../../database/db.js';

// Create a new router instance for cohort routes
const router = express.Router();

function getOpenAIClient() {
  return new OpenAI({
    baseURL: 'https://models.github.ai/inference/',
    apiKey: process.env.GH_TOKEN,
  });
}

function buildPrompt(dishes) {
  const dishesList = dishes
    .map((d) => `- ${d.title} (added by ${d.added_by})`)
    .join('\n');

  return `You are a friendly and enthusiastic recipe assistant! 🍳
You love helping people discover delicious recipes and cooking ideas. 🥗

Rules:
- If the user asks about food, recipes, or cooking — answer helpfully and suggest a recipe idea 🎉
- If the user asks about anything else — return: {"title":"","instructions":"I am here to help with recipe ideas and cooking suggestions only! 🍽️","ingredients":[]}
- Keep your answers warm, friendly, and fun!
- You can suggest any recipe based on what the user asks

Always respond in JSON only:
{"title": string, "instructions": string, "ingredients": [{"ingredient": string, "measure": string}]}

Use metric units.

Our cohort's special dishes — suggest these first when relevant! ⭐
${dishesList}`;
}

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const dishes = db.prepare('SELECT * FROM cohort_dishes').all();
    const openai = getOpenAIClient();
    // Get the user's message from the request body
    const { userMessage } = req.body;

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: buildPrompt(dishes) },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });
    //Extract the AI's reply from the response
    const parsed = JSON.parse(response.choices[0].message.content);
    res.json({ reply: parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

export default router;
