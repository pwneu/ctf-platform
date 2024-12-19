const MessageInput = ({ message, onInputChange, onGenerateResult }) => {
  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={onInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onGenerateResult();
          }
        }}
        placeholder="Message Dash AI"
      />
      <img
        src="/assets/img/chatbot/Send-Icon.png"
        alt="Generate Answer"
        onClick={onGenerateResult}
        style={{
          cursor: "pointer",
          marginLeft: "10px",
          marginTop: "9px",
          width: "50px",
          height: "50px",
        }}
      />
    </div>
  );
};

export default MessageInput;
