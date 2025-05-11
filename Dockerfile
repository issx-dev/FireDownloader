FROM python:3.12.3-slim

WORKDIR /app

# Instalar dependencias del sistema, como ffmpeg
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y ffmpeg

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
