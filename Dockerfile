# ==============================================================================
# Estágio 1: Builder - Instala dependências Node.js e Python
# ==============================================================================
FROM node:18-slim as builder

WORKDIR /app

# Instala python, pip e git para as dependências
RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip git

# Copia os arquivos de dependência primeiro para otimizar o cache
COPY package*.json requirements.txt ./
RUN npm install && pip install --no-cache-dir -r requirements.txt

COPY . .

# ==============================================================================
# Estágio 2: Final - A imagem de produção leve
# ==============================================================================
FROM python:3.11-slim

WORKDIR /app

# Instala apenas as dependências de sistema necessárias para o Puppeteer/Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Copia as dependências instaladas do estágio de build
# O diretório de pacotes do Debian para python3 é /usr/lib/python3/dist-packages
COPY --from=builder /usr/lib/python3/dist-packages /usr/lib/python3/dist-packages
COPY --from=builder /app/node_modules ./node_modules

# Copia o código da aplicação e arquivos de configuração
COPY . .

# Expõe a porta da API
EXPOSE 8000

# Usa pm2-runtime para gerenciar os processos de forma otimizada para contêineres
CMD ["pm2-runtime", "ecosystem.config.js"]