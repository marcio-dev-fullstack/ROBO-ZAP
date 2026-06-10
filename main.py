from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import datetime

# 1. Inicialização do App
app = FastAPI(
    title="M GRUPO - API Central de Monitoramento",
    description="Backend de controle concorrente para monitoramento de rotas.",
    version="1.0.0"
)

# 2. Configuração de CORS (Essencial para comunicação local)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Rota de Status (para testar se a API responde)
@app.get("/")
async def status():
    return {
        "status": "online",
        "empresa": "M GRUPO",
        "servicos": ["KM Projetos", "RAZGO Tecnologia", "MAZZ Cursos", "MR Treinamentos"]
    }

# 4. Rota do Webhook (Onde o bot envia os dados)
@app.post("/webhook")
async def receber_mensagem(request: Request):
    try:
        dados = await request.json()
        remetente = dados.get("remetente", "Desconhecido")
        conteudo = dados.get("conteudo", "Sem conteúdo")
        
        # Log no terminal do Python
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] LEAD RECEBIDO | De: {remetente} | Msg: {conteudo}")
        
        return {"status": "recebido"}
    
    except Exception as e:
        print(f"Erro ao processar webhook: {e}")
        raise HTTPException(status_code=400, detail="Erro ao processar dados")

# 5. Execução do Servidor
if __name__ == "__main__":
    # O host 127.0.0.1 garante que a comunicação fique apenas na sua máquina local
    uvicorn.run(app, host="127.0.0.1", port=8000)