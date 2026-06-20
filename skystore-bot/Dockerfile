# Собирать из КОРНЕВОЙ папки проекта (skystore/):
#   docker build -t skystore-bot -f skystore-bot/Dockerfile .
FROM python:3.12-slim

WORKDIR /app

COPY skystore-bot/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY skystore-bot/ /app/
COPY skystore-landing/images /skystore-landing/images

EXPOSE 10000

CMD ["python", "bot.py"]
