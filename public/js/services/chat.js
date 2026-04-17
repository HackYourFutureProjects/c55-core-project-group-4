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

  // Check response status before parsing — server may return HTML on error
  if (!response.ok) {
    const data = await response.json().catch((parseError) => {
      console.warn('Failed to parse error body:', parseError.message);
      return {};
    });
    throw {
      status: response.status,
      message: data.error || 'Server error',
    };
  }

  // Only parse JSON if the response is successful
  const data = await response.json();

  // Return only the reply text, not the whole response object
  return data.reply;
}
