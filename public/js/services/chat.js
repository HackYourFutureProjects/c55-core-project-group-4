// This function sends the user's message to the backend
// and returns the AI recipe suggestion
export async function fetchChatReply(userMessage) {
  // Send a POST request to our backend /api/chat endpoint
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Convert the JavaScript object to a JSON string for the request body
    body: JSON.stringify({ userMessage }),
  });

  // If not res ok, the server might return HTML instead of JSON (e.g. network error)
  // so we use .catch(() => ({})) to avoid a parse error
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Server error');
  }

  // Only parse JSON if the response is successful
  const data = await response.json();

  // Return only the reply text, not the whole response object
  return data.reply;
}