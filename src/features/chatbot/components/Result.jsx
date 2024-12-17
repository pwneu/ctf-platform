
const Result = ({ result }) => {
  return (
    <div className="message-list">
      <div className="message bot">
        <p>{result ? result : 'What can I help with?'}</p>
      </div>
    </div>
  );
};

export default Result;

