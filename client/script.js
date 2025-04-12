// Handle form submission for health data and get AI tip
document.getElementById('health-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const data = {
      weight: document.getElementById('weight').value,
      steps: document.getElementById('steps').value,
      calories: document.getElementById('calories').value,
      sleep: document.getElementById('sleep').value
    };
  
    try {
      const res = await fetch('https://healthsync-backend-diwp.onrender.com/api/health/submit', {  // <-- Make sure "/submit" is included
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await res.json();
      document.getElementById('ai-tips').innerText = result.tip || "No tip received.";
    } catch (err) {
      document.getElementById('ai-tips').innerText = 'Error getting AI tip.';
      console.error(err);
    }
  });
  
  
  // Handle chatbot conversation
  async function sendChat() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;
  
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `<p class="user">${userInput}</p>`;
  
    try {
      const res = await fetch('https://healthsync-backend-diwp.onrender.com/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });
  
      const data = await res.json();
      chatMessages.innerHTML += `<p class="bot">${data.reply}</p>`;
      chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll to bottom
      document.getElementById('user-input').value = '';
    } catch (err) {
      chatMessages.innerHTML += `<p class="bot error">Error getting response.</p>`;
      console.error(err);
    }
  }
  
