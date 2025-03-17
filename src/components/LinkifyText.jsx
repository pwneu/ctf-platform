export default function LinkifyText({ text }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const boldRegex = /\*\*(.*?)\*\*/g;

  // Split text by URLs first
  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (urlRegex.test(part)) {
          // If it's a URL, return an anchor tag
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              {part}
            </a>
          );
        } else {
          // Handle bold formatting inside non-URL text
          const boldParts = part.split(boldRegex);
          return boldParts.map((subPart, subIndex) =>
            subIndex % 2 === 1 ? (
              <strong key={`${index}-${subIndex}`}>{subPart}</strong>
            ) : (
              subPart
            )
          );
        }
      })}
    </>
  );
}
