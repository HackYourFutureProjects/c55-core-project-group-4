
// This function sends the user's message to the server
// and returns the AI recipe suggestion
export async function fetchChatReply(userMessage) {

  // Send a POST request to our backend endpoint
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Convert the JavaScript object to a JSON string for the request body
    body: JSON.stringify({ userMessage }),
  });

  // Parse the response from JSON text into a JavaScript object
  const data = await response.json();
if (!response.ok) {
  throw new Error(data.error || 'Server error');
}
  // Return only the recipe reply, not the whole response object
  return data.reply;
}
