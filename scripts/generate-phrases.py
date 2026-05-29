"""
Generate TTS audio for the language phrasebook using Microsoft Edge neural voices.
Run once: python scripts/generate-phrases.py
Requires: pip install edge-tts
"""

import asyncio
import os
import sys
import edge_tts

sys.stdout.reconfigure(encoding="utf-8")

# Phrases in the same order as languageBasics.greetings in src/data/practical.ts.
# Slash-separated pairs are split with a pause ("Иә. Жоқ.") so TTS doesn't read "/".
PHRASES = [
    # index  lang  voice                      text
    # ── original 6 ──────────────────────────────────────────────────────────
    (0,  "kk", "kk-KZ-AigulNeural",    "Сәлем"),
    (1,  "kk", "kk-KZ-AigulNeural",    "Рахмет"),
    (2,  "kk", "kk-KZ-AigulNeural",    "Кешіріңіз"),
    (3,  "kk", "kk-KZ-AigulNeural",    "Иә. Жоқ."),
    (4,  "kk", "kk-KZ-AigulNeural",    "Қанша тұрады?"),
    (5,  "kk", "kk-KZ-AigulNeural",    "Көмек"),
    (0,  "ru", "ru-RU-SvetlanaNeural", "Привет"),
    (1,  "ru", "ru-RU-SvetlanaNeural", "Спасибо"),
    (2,  "ru", "ru-RU-SvetlanaNeural", "Извините"),
    (3,  "ru", "ru-RU-SvetlanaNeural", "Да. Нет."),
    (4,  "ru", "ru-RU-SvetlanaNeural", "Сколько стоит?"),
    (5,  "ru", "ru-RU-SvetlanaNeural", "Помогите"),
    # ── new 7 ───────────────────────────────────────────────────────────────
    (6,  "kk", "kk-KZ-AigulNeural",    "Қайда?"),
    (7,  "kk", "kk-KZ-AigulNeural",    "Сол. Оң. Тура."),
    (8,  "kk", "kk-KZ-AigulNeural",    "Су беріңіз"),
    (9,  "kk", "kk-KZ-AigulNeural",    "Есеп беріңіз"),
    (10, "kk", "kk-KZ-AigulNeural",    "Дәмді!"),
    (11, "kk", "kk-KZ-AigulNeural",    "Түсінбеймін"),
    (12, "kk", "kk-KZ-AigulNeural",    "Қымбат"),
    (6,  "ru", "ru-RU-SvetlanaNeural", "Где?"),
    (7,  "ru", "ru-RU-SvetlanaNeural", "Налево. Направо. Прямо."),
    (8,  "ru", "ru-RU-SvetlanaNeural", "Воды, пожалуйста"),
    (9,  "ru", "ru-RU-SvetlanaNeural", "Счёт, пожалуйста"),
    (10, "ru", "ru-RU-SvetlanaNeural", "Вкусно!"),
    (11, "ru", "ru-RU-SvetlanaNeural", "Не понимаю"),
    (12, "ru", "ru-RU-SvetlanaNeural", "Дорого"),
    # ── new 7 ───────────────────────────────────────────────────────────────
    (13, "kk", "kk-KZ-AigulNeural",    "Ағылшынша сөйлейсіз бе?"),
    (14, "kk", "kk-KZ-AigulNeural",    "Мен орысша сөйлемеймін."),
    (15, "kk", "kk-KZ-AigulNeural",    "Мен қазақша сөйлемеймін."),
    (16, "kk", "kk-KZ-AigulNeural",    "Дәретхана қайда?"),
    (17, "kk", "kk-KZ-AigulNeural",    "Картамен төлей аламын ба?"),
    (18, "kk", "kk-KZ-AigulNeural",    "Маған такси керек."),
    (19, "kk", "kk-KZ-AigulNeural",    "Қолма-қол ақшамен төлей аламын ба?"),
    (13, "ru", "ru-RU-SvetlanaNeural", "Вы говорите по-английски?"),
    (14, "ru", "ru-RU-SvetlanaNeural", "Я не говорю по-русски."),
    (15, "ru", "ru-RU-SvetlanaNeural", "Я не говорю по-казахски."),
    (16, "ru", "ru-RU-SvetlanaNeural", "Где туалет?"),
    (17, "ru", "ru-RU-SvetlanaNeural", "Можно оплатить картой?"),
    (18, "ru", "ru-RU-SvetlanaNeural", "Мне нужно такси."),
    (19, "ru", "ru-RU-SvetlanaNeural", "Можно оплатить наличными?"),
    # ── dietary restrictions ─────────────────────────────────────────────────
    (20, "kk", "kk-KZ-AigulNeural",    "Глютенсіз"),
    (21, "kk", "kk-KZ-AigulNeural",    "Балықсыз"),
    (22, "kk", "kk-KZ-AigulNeural",    "Дән жоқ"),
    (23, "kk", "kk-KZ-AigulNeural",    "Ұн жоқ"),
    (24, "kk", "kk-KZ-AigulNeural",    "Нан жоқ"),
    (20, "ru", "ru-RU-SvetlanaNeural", "Без глютена"),
    (21, "ru", "ru-RU-SvetlanaNeural", "Без рыбы"),
    (22, "ru", "ru-RU-SvetlanaNeural", "Без зерна"),
    (23, "ru", "ru-RU-SvetlanaNeural", "Без муки"),
    (24, "ru", "ru-RU-SvetlanaNeural", "Без хлеба"),
    (25, "kk", "kk-KZ-AigulNeural",    "Менің аллергиям бар"),
    (25, "ru", "ru-RU-SvetlanaNeural", "У меня аллергия"),
]

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "phrases")


async def generate(index: int, lang: str, voice: str, text: str, skip_existing: bool = True) -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, f"{lang}-{index}.mp3")
    if skip_existing and os.path.exists(path):
        print(f"  --  {lang}-{index}.mp3  (skipped, exists)")
        return
    communicate = edge_tts.Communicate(text, voice, rate="-10%")
    await communicate.save(path)
    size_kb = os.path.getsize(path) // 1024
    print(f"  OK  {lang}-{index}.mp3  ({size_kb} kB)  [{text}]")


async def main() -> None:
    print(f"Generating {len(PHRASES)} phrase audio files -> {OUT_DIR}\n")
    for index, lang, voice, text in PHRASES:
        await generate(index, lang, voice, text)
    print("\nDone. Commit public/audio/phrases/ to the repo.")


asyncio.run(main())
