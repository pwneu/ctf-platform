import { useState } from "react";
import MessageInput from "./MessageInput";
import Result from "./Result";
import "./chatui.css";
import { api } from "@/api"; // Uncomment if testing chatbot
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // Function to handle message input change
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to generate result based on the user's input
  const generateResult = async () => {
    if (isGenerating || message === "") return;

    try {
      setIsGenerating(true);
      setResult("Generating...");

      const response = await api.post("/chat/conversations", {
        input: message,
      });

      setResult(response.data);

      // setTimeout(() => {
      //   setResult(sampleResult);
      // }, 1000);
    } catch (error) {
      const status = error?.response?.status;

      setResult("Failed...");

      if (status === 401) {
        navigate("/login");
      } else if (status === 400) {
        toast.info(error.response?.data?.message);
      } else if (status === 403) {
        toast.info("Managers and admins are not allowed to chat with the bot");
      } else if (status === 429) {
        toast.warn("Slow down on chatting!");
      } else {
        toast.error("Error creating conversation. Please try again later");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="chatbot bg-dark-3 "
      data-aos="fade-up"
      data-aos-offset="80"
      data-aos-duration={900}
    >
      <div className="chat-container">
        <MessageInput
          message={message}
          onInputChange={handleInputChange}
          onGenerateResult={generateResult}
        />
        <Result result={result} />
      </div>
    </div>
  );
};

export default ChatInterface;
