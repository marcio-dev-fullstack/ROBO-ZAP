from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn

app = FastAPI(
    title="M GRUPO - API Webhook WhatsApp",
    description="Backend para processamento de mensagens integradas ao ROBO-ZAP",
    version="1.0.0"
)

# Configuração de CORS para permitir que o bot em Node.js se comunique sem bloqueios de segurança
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de dados esperado do Webhook (opcional para validação interna)
class WebhookPayload(BaseModel):
    from_number: str  # Mapeado do campo 'from' do Node
    body: str
    timestamp: int
    notifyName: Optional[str] = "Usuário"

@app.get("/")
def read_root():
    """
    Rota raiz para verificação de status do servidor.
    """
    return {
        "status": "online",
        "empresa": "M GRUPO",
        "servicos": ["KM Projetos & Engenharia", "RAZGO Tecnologia", "MAZZ", "MR Treinamentos"]
    }

@app.post("/webhook")
async def receive_webhook(request: Request):
    """
    Rota que o Node.js consome para enviar as mensagens capturadas do WhatsApp.
    """
    try:
        # Captura o JSON bruto enviado pelo Node.js
        dados = await request.json()
        
        # Extrai os dados enviados pelo payload do bot
        remetente = dados.get("from")
        mensagem = dados.get("body")
        nome_usuario = dados.get("notifyName", "Usuário")
        
        # Exibe no terminal do Python a mensagem recebida de forma organizada
        print("\n" + "="*50)
        print(f"🚀 [WEBHOOK] Nova mensagem de: {nome_usuario} ({remetente})")
        print(f"💬 Conteúdo: {mensagem}")
        print("="*50 + "\n")
        
        # ------------------------------------------------------------
        # SUA LÓGICA DE NEGÓCIO ENTRA AQUI
        # Exemplo: Processamento de comandos, IA, salvamento em Banco de Dados, etc.
        # ------------------------------------------------------------
        
        # Resposta de sucesso para o Node.js liberar a requisição
        return {
            "status": "success", 
            "message": "Mensagem recebida e processada pelo backend Python"
        }
        
    except Exception as e:
        print(f"❌ Erro ao processar dados do webhook: {str(e)}")
        raise HTTPException(
            status_code=400, 
            detail="Falha ao processar o payload enviado ou formato JSON inválido."
        )

if __name__ == "__main__":
    # Força a execução usando o host '127.0.0.1' na porta 8000 para sincronia direta com o Node
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)