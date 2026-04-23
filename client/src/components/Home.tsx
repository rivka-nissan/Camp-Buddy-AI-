interface Props {
  onStartChat: () => void;
}

const destinations = [
  {
    emoji: "🏔️",
    name: "הרי הגולן",
    desc: "נופים מרהיבים, מפלים וטבע ירוק",
    tags: ["משפחות", "טבע"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  },
  {
    emoji: "🏜️",
    name: "מכתש רמון",
    desc: "שמי לילה זרועי כוכבים במדבר",
    tags: ["זוגות", "הרפתקה"],
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
  },
  {
    emoji: "🌊",
    name: "חוף הכרמל",
    desc: "קמפינג על הים עם שקיעות מדהימות",
    tags: ["משפחות", "ים"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  },
  {
    emoji: "🌲",
    name: "יער בן שמן",
    desc: "יער ירוק ושקט ליד המרכז",
    tags: ["מתחילים", "קרוב"],
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
  },
  {
    emoji: "🏝️",
    name: "אילת",
    desc: "שונית אלמוגים וים אדום קסום",
    tags: ["זוגות", "ים"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  },
  {
    emoji: "⛰️",
    name: "הר מירון",
    desc: "הר הגבוה בישראל עם נוף עוצר נשימה",
    tags: ["מטיילים", "טבע"],
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80",
  },
];

const tips = [
  { emoji: "🎒", title: "ציוד חובה", desc: "שק שינה, אוהל, פנס ראש ומים מספיק" },
  { emoji: "🔥", title: "מדורה בטוחה", desc: "תמיד שמרו מרחק ואל תשאירו לבד" },
  { emoji: "🌡️", title: "בדקו מזג אוויר", desc: "הכינו ציוד לכל תרחיש" },
  { emoji: "🗺️", title: "תכנון מסלול", desc: "הורידו מפות אופליין לפני היציאה" },
];

export default function Home({ onStartChat }: Props) {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>🏕️ CampAI</h1>
          <p className="hero-sub">גלה את הטיול המושלם עבורך עם עוזר AI אישי</p>
          <button className="btn-primary" onClick={onStartChat}>
            🤖 דבר עם Camp Buddy
          </button>
        </div>
      </section>

      {/* יעדים מומלצים */}
      <section className="section">
        <h2>✨ יעדים מומלצים</h2>
        <div className="cards-grid">
          {destinations.map((d, i) => (
            <div key={i} className="card" onClick={onStartChat}>
              <div className="card-image">
                <img src={d.image} alt={d.name} />
                <div className="card-emoji-overlay">{d.emoji}</div>
              </div>
              <div className="card-body">
                <h3>{d.name}</h3>
                <p>{d.desc}</p>
                <div className="tags">
                  {d.tags.map((t, j) => (
                    <span key={j} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* טיפים */}
      <section className="section dark">
        <h2>💡 טיפים לקמפינג</h2>
        <div className="tips-grid">
          {tips.map((t, i) => (
            <div key={i} className="tip">
              <span className="tip-emoji">{t.emoji}</span>
              <div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>מוכן לצאת להרפתקה? 🚀</h2>
        <p>ספר ל-Camp Buddy מי אתה ולאן אתה חולם — והוא יבנה לך תוכנית מושלמת</p>
        <button className="btn-primary" onClick={onStartChat}>
          בואו נתכנן ביחד! 🏕️
        </button>
      </section>
    </div>
  );
}
