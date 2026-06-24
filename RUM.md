# 1. Clonar repositório

git clone https://github.com/marcio-dev-fullstack/ROBO-ZAP.git
cd ROBO-ZAP

# 2. Instalar dependências Node.js

npm install

# 3. Preparar ambiente e instalar dependências Python

# Cria um ambiente virtual (apenas na primeira vez)

py -3.14 -m venv .venv

# Instala as dependências dentro do ambiente virtual

# No Windows:

.\.venv\Scripts\pip.exe install -r requirements.txt

# No Linux/macOS:

# source .venv/bin/activate && pip install -r requirements.txt

# 4. Iniciar localmente (Terminal 1 - Bot WhatsApp)

npm run start

# 5. Iniciar localmente (Terminal 2 - API Backend)

npm run start:api

# 6. Docker - Build da imagem

docker build -t robo-zap .

# 7. Docker - Execução do container

docker run -d --name robo-zap-container -p 8000:8000 -v "%cd%/.wwebjs_auth":/app/.wwebjs_auth robo-zap
