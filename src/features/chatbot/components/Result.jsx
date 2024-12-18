export default function Result({ result }) {
  return (
    <div className="message-list">
      <div className="message bot">
        {result === "" || result == null ? (
          <p>What can I help with?</p>
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: result
                .replace(/\n\n/g, "</p><p>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        )}
      </div>
    </div>
  );
}
