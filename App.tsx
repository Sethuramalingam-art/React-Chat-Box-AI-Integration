import "./App.css";
import ChatBot from "./ChatBot";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full border rounded-lg p-4">
      <ChatBot headerText="Chat Bot: Q&A" />
    </div>
  );
}

export default App;
