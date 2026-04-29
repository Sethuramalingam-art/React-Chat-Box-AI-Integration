import React from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyBcXEHbTYppQCRV7xtoGUpdw762PaLbWzY");

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

// curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
//   -H 'Content-Type: application/json' \
//   -H 'X-goog-api-key: APIKEY' \
//   -X POST \
//   -d '{
//     "contents": [
//       {
//         "parts": [
//           {
//             "text": "Explain how AI works in a few words"
//           }
//         ]
//       }
//     ]
//   }'

// curl "https://generativelanguage.googleapis.com/v1beta/models" \
//   -H "Authorization: Bearer YOUR_API_KEY"

const useChatBot = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const sendMessageToBot = async (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    try {
      //   const res = await fetch(
      //     "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBcXEHbTYppQCRV7xtoGUpdw762PaLbWzY",
      //   );
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "X-goog-api-key": "APIKEY",
      //       },
      //       body: JSON.stringify({
      //         contents: [
      //           {
      //             parts: [
      //               {
      //                 text: message.text,
      //               },
      //             ],
      //           },
      //         ],
      //       }),
      //     },
      //   );

      //   gemini-2.0-flash

      //   const data = await res.json();
      //   console.log(data);
      //   const model = genAI.getGenerativeModel({
      //     model: "gemini-pro-latest",
      //   });

      //   const result = await model.generateContent(message.text);

      //ollama model used instead of openAI/ gemini AI they are asking subscription
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3",
          prompt: message.text,
          stream: false,
        }),
      });
      const result = await res.json();
      const response = result.response;

      console.log(response);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text: response,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error sending message to bot:", error);
    }
  };
  return { messages, sendMessageToBot };
};

export default useChatBot;
