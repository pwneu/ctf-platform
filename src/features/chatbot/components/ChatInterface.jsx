// import  { useState } from "react";
// import MessageInput from "./MessageInput";
// import MessageList from "./MessageList";
// import "./sample.css";

// function ChatInterface() {
//   const [messages, setMessages] = useState([
//     { text: "Hello, how can I assist you?", sender: "bot" },
//   ]);

//   const handleMessageSend = (message) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: message, sender: "user" },
//     ]);
//     setTimeout(() => {
//       handleBotResponse(message);
//     }, 500);
//   };

//   const handleBotResponse = (userMessage) => {
//     // Simple bot logic to respond based on user input
//     let response = "Sorry, I didn't understand that.";
//     if (userMessage.toLowerCase().includes("hello")) {
//       response = "Hi there! How can I help you today?";
//     } else if (userMessage.toLowerCase().includes("how are you")) {
//       response = "I'm good, thank you! How about you?";
//     }

//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: response, sender: "bot" },
//     ]);
//   };

//   return (
//     <div className="chatbot bg-dark-3">
//       <div className="chat-container mt-90">
//         <MessageList messages={messages} />
//         <MessageInput onSendMessage={handleMessageSend} />
//       </div>
//     </div>
//   );
//}

// export default ChatInterface;

import { useState } from "react";
import MessageInput from "./MessageInput";
import Result from "./Result";
import "./chatui.css";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  // Function to handle message input change
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to generate result based on the user's input
  const generateResult = () => {
    let response = "";

    // Basic CTF-related responses
    if (message.toLowerCase().includes("cryptography")) {
      response =
        "Try examining the cipher carefully for patterns. Look for frequency analysis.";
    } else if (message.toLowerCase().includes("xss")) {
      response =
        "Look for unfiltered user input in the form fields. Try injecting a script in the input box.";
    } else if (message.toLowerCase().includes("reverse engineering")) {
      response =
        "The flag is hidden in the second comment of the source code of the webpage.";
    } else if (message.toLowerCase().includes("sql injection")) {
      response =
        "SQL Injection (SQLi) is a type of security vulnerability that occurs when an attacker manipulates a web application's database query by injecting malicious SQL code into the input fields of an application. This happens when user input is directly included in a SQL query without proper validation or sanitization. SQL injection is one of the most dangerous vulnerabilities because it can allow attackers to view, modify, or delete data within the database, potentially leading to full system compromise. SQL injection attacks can occur in any web application that interacts with a relational database. The risk arises when an application improperly handles user inputs such as form fields, URL parameters, or even HTTP headers. Attackers can exploit these inputs to inject harmful SQL commands that the database will execute, bypassing security checks. A common example of SQL injection occurs when a web application takes a user's input, like a login form with a username and password, and builds a SQL query to validate the credentials. Consider the following insecure code: SELECT * FROM users WHERE username = ' + username + ' AND password = ' + password; In this case, the query is directly concatenating user input into the SQL query without any filtering or escaping, which allows an attacker to inject their own malicious SQL. If an attacker enters ' OR '1'='1' for both the username and password fields, the query becomes: SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '' OR '1'='1'; This query will always evaluate to true, potentially granting unauthorized access to the attacker. Types of SQL Injection: There are several types of SQL injection attacks, including: 1. In-band SQLi: The attacker uses the same channel to both launch the attack and gather the results. This is the most common form of SQL injection. 2. Blind SQLi: The attacker cannot see the result of their queries directly. Instead, they ask the database true or false questions to deduce information. 3. Out-of-band SQLi: This attack relies on the server's ability to make DNS or HTTP requests to send data to an attacker. Consequences of SQL Injection: The impact of a successful SQL injection attack can be severe. It may allow attackers to: - Retrieve sensitive data (e.g., user credentials, financial records, and personal information) - Modify or delete data - Bypass authentication controls, gaining unauthorized access to applications or systems - Execute administrative operations on the database, such as shutting down the system or altering its structure - Gain full control of the server or network, leading to further exploitation Preventing SQL Injection: To protect against SQL injection attacks, the following best practices should be implemented: 1. Use Prepared Statements/Parameterized Queries: Always use parameterized queries or prepared statements, which ensure that user input is treated as data, not executable code. This prevents SQL injection by separating user input from SQL commands. 2. Use Stored Procedures: Stored procedures provide a way to separate logic from the application layer, reducing the risk of SQL injection. However, they must still be used securely with proper input validation. 3. Input Validation and Sanitization: Ensure that all user inputs are validated against a set of expected rules (e.g., checking for length, data type, or specific characters) before they are used in SQL queries. Inputs should also be sanitized to remove harmful characters such as single quotes (') and semicolons (;). 4. Use ORM (Object-Relational Mapping) Libraries: Many modern programming languages and frameworks provide ORM libraries that automatically sanitize inputs and prevent SQL injection attacks. These libraries offer an abstraction layer between the application code and the database, making it harder for attackers to execute arbitrary SQL. 5. Least Privilege Principle: Ensure that database accounts used by the application have the least privilege necessary to perform their tasks. For example, the account used for querying the database should not have permission to delete or modify data unless absolutely necessary. 6. Error Handling: Avoid exposing database error messages to users, as these can provide attackers with valuable information about the database structure and vulnerabilities. Use generic error messages that do not reveal details about the database. 7. Regular Security Audits: Regularly test your application for SQL injection vulnerabilities using automated tools and manual code reviews. Keeping your security practices up to date is essential to mitigating new threats. By taking these precautions, developers can greatly reduce the risk of SQL injection and protect their applications and users from potentially devastating attacks.";
    } else {
      response = `Sorry, I couldn't understand your request. Could you provide more details?`;
    }

    setResult(response); // Display the result based on input
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
