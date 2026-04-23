import httpx
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

# בדיקת חיבור בסיסית
try:
    r = httpx.get("https://api.openai.com")
    print("חיבור לאינטרנט: OK", r.status_code)
except Exception as e:
    print("חיבור לאינטרנט: FAILED", e)

# בדיקת OpenAI
try:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "say hi"}],
    )
    print("OpenAI: OK", completion.choices[0].message.content)
except Exception as e:
    print("OpenAI: FAILED", e)
