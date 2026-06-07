FROM python:3.11-slim

WORKDIR /app

# Instalação unificada e limpa de dependências
RUN apt-get update && apt-get install -y \
    curl gnupg ca-certificates procps git chromium \
    libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json requirements.txt ./

# Instalação única de pacotes
RUN npm install && pip install --no-cache-dir -r requirements.txt

COPY . .

# Garante permissão na pasta de sessão
RUN mkdir -p .wwebjs_auth && chmod -R 777 .wwebjs_auth

# Inicializador eficiente
RUN echo '#!/bin/sh\nnode bot.js &\nexec uvicorn main:app --host 0.0.0.0 --port 8000' > entrypoint.sh && chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]