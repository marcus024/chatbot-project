from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')

    if "hello" in user_message.lower():
        bot_response = "Hello! How can I help you today?"
    elif "bye" in user_message.lower():
        bot_response = "Goodbye! Have a great day!"
    else:
        bot_response = "I'm not sure how to respond to that."

    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)
