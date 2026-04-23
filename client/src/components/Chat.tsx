import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
  image?: string;
}

interface Props {
  onBack: () => void;
}

const sessionId = Math.random().toString(36).slice(2);

const imageMap: { keywords: string[]; url: string }[] = [
  { keywords: ["גולן", "מפל", "בניאס", "חרמון"], url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
  { keywords: ["רמון", "מכתש", "מדבר", "נגב"], url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" },
  { keywords: ["ים", "חוף", "כרמל", "חיפה", "תל אביב", "אשדוד"], url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
  { keywords: ["יער", "עצים", "פארק", "בן שמן"], url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80" },
  { keywords: ["אילת", "אלמוגים", "ים אדום", "צלילה"], url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" },
  { keywords: ["הר", "מירון", "גליל", "פסגה"], url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80" },
  { keywords: ["קמפינג", "אוהל", "מדורה", "לילה"], url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80" },
  { keywords: ["נחל", "מים", "שחייה", "בריכה"], url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80" },
];

function findImage(text: string): string | undefined {
  const lower = text.toLowerCase();
  for (const item of imageMap) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.url;
    }
  }
  return undefined;
}

export default function Chat({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "היי! אני Camp Buddy 🏕️ המדריך האישי שלך לטיולים וקמפינג!\n\nספר לי — כמה אנשים נוסעים ויש ילדים? 😄",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId }),
      });
      const data = await res.json();
      const image = findImage(data.reply);
      setMessages((prev) => [...prev, { role: "bot", content: data.reply, image }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "אופס! משהו השתבש 😅 נסה שוב" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-btn" onClick={onBack}>← חזרה</button>
          <div>
            <span>🏕️ Camp Buddy</span>
            <p>המדריך האישי שלך לטיולים</p>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.role === "bot" && <span className="avatar">🤖</span>}
              <div className="bubble">
                {msg.image && (
                  <img src={msg.image} alt="המלצת יעד" className="bubble-image" />
                )}
                {msg.content}
              </div>
              {msg.role === "user" && <span className="avatar">🧑</span>}
            </div>
          ))}
          {loading && (
            <div className="message bot">
              <span className="avatar">🤖</span>
              <div className="bubble typing">מחשב... ✨</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="כתוב הודעה..."
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            שלח ➤
          </button>
        </div>
      </div>
    </div>
  );
}
