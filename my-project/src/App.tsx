import { useState } from 'react';
import './App.css';

interface Message {
  user: string;
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { user: 'You', text: input };
      setMessages([...messages, userMessage]);
      setInput('');

      // Send the user message to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      // Add the bot's response to the chat
      const botMessage = { user: 'Bot', text: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  return (
    <div className="chat-container">
      <h1>Simple Chat Bot</h1>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user === 'You' ? 'user' : 'bot'}`}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
