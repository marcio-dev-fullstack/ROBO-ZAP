# 1. Clonar repositório
git clone https://github.com/marcio-dev-fullstack/ROBO-ZAP.git
cd ROBO-ZAP

# 2. Instalar dependências Node.js
npm install

# 3. Instalar dependências Python
pip install -r requirements.txt

# 4. Iniciar localmente (Terminal 1 - Bot)
node bot.js

# 5. Iniciar localmente (Terminal 2 - API)
uvicorn main:app --reload

# 6. Docker - Build da imagem
docker build -t robo-zap .

# 7. Docker - Execução do container
docker run -d --name robo-zap-container -p 8000:8000 robo-zap