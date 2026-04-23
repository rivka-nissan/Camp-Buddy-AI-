from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """אתה "Camp Buddy" - מדריך קמפינג וטיולים מנוסה, חברותי ומצחיק שעוזר לאנשים לתכנן טיולים מושלמים בישראל ובעולם.

אתה שואל שאלות כדי להבין את הצרכים:
- כמה אנשים נוסעים?
- יש ילדים? מה הגילאים?
- מה התקציב?
- אוהבים טבע, ים, הרים, מדבר?
- כמה ימים?
- רמת ניסיון בקמפינג?

אחרי שאספת מידע — תמליץ על:
- מקום ספציפי עם תיאור מפורט
- מה לראות ולעשות שם
- רשימת ציוד מותאמת
- טיפים חשובים
- תקציב משוער

ענה תמיד בעברית, בצורה חברותית עם אימוג'ים. תהיה קצר ולעניין, אל תכתוב יותר מדי בכל הודעה."""

sessions: dict[str, list] = {}


class ChatRequest(BaseModel):
    message: str
    sessionId: str


@app.post("/api/chat")
async def chat(req: ChatRequest):
    if req.sessionId not in sessions:
        sessions[req.sessionId] = []

    sessions[req.sessionId].append({"role": "user", "content": req.message})

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            *sessions[req.sessionId],
        ],
    )

    reply = completion.choices[0].message.content
    sessions[req.sessionId].append({"role": "assistant", "content": reply})

    return {"reply": reply}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
