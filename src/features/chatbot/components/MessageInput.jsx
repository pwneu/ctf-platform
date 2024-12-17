const MessageInput = ({ message, onInputChange, onGenerateResult }) => {
    return (
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={onInputChange}
          placeholder="Message Dash AI"
        />
        <img
          src="/assets/img/chatbot/Send-Icon.gif"
          alt="Generate Answer"
          onClick={onGenerateResult}
          style={{ cursor: 'pointer',marginLeft:"10px",marginTop:"10px", width: '40px', height: '40px' }} // Resize here
        />
      </div>
    );
  };
  
  export default MessageInput;
  