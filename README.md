
<div align="center">

![Status do Deploy](https://img.shields.io/badge/Render-Live-brightgreen?style=for-the-badge&logo=render)
![Tecnologia](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Ambiente](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Plataforma](https://img.shields.io/badge/WhatsApp_Web.js-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

# 🤖 ROBÔ ZAP — Inteligência Comercial & Automação

**Conjunto de microsserviços corporativos que integra uma API de monitoramento assíncrona a um assistente inteligente focado em alta conversão de leads, vendas e direcionamento estratégico.**

</div>

---

## 🏗️ Arquitetura Local no PC

O projeto agora roda diretamente no seu PC local com dois processos independentes: o backend em Python e o bot de automação em Node.js. A comunicação entre eles ocorre via `localhost` e não depende de containerização.

### ⚙️ Funcionamento Concorrente

O sistema é executado em dois processos locais que podem ser iniciados em terminais separados:
=======
## 🏗️ Arquitetura Híbrida do Projeto

O sistema adota uma abordagem **Side-by-Side (Lado a Lado)** encapsulada em um único container Docker. Esse ecossistema garante isolamento completo de processos, latência zero na comunicação interna e otimização máxima dos recursos computacionais em nuvem.

### ⚙️ Funcionamento Concorrente

Em vez de fragmentar a infraestrutura em múltiplas instâncias, o container gerencia dois motores independentes que rodam de forma síncrona:

---

### 💻 **<font size="4">⚡ Engine Backend (FastAPI)</font>**
* **Responsabilidade:** Exposição de endpoints REST, processamento de payloads, gerenciamento das regras de negócio e gateway estável de dados.

* **Ambiente:** Python 3.11.

* **Ambiente:** Python 3.11 Slim.

---

### 🤖 **<font size="4">⚙️ Engine de Automação (WWebJS)</font>**
* **Responsabilidade:** Controle do ciclo de vida do cliente WhatsApp, escuta ativa de eventos em tempo real e injeção automatizada de mensagens.

* **Ambiente:** Node.js v18+.
=======
* **Ambiente:** Node.js v18.


---

```text
┌──────────────────────────────────────────────────────────┐
<<<<<<< HEAD
│                        PC LOCAL                          │
│                                                          │
│  ┌────────────────────────┐    ┌──────────────────────┐  │
│  │      API FASTAPI       │    │   BOT ASSISTENTE     │  │
│  │      (Python 3.11)     │◄──►│    (Node.js v18+)     │  │
=======
│                     CONTAINER DOCKER                     │
│                                                          │
│  ┌────────────────────────┐    ┌──────────────────────┐  │
│  │      API FASTAPI       │    │   BOT ASSISTENTE     │  │
│  │      (Python 3.11)     │◄──►│    (Node.js v18)     │  │
>>>>>>> d5065d422adbf6aea6830d3809a463e1f8bfc848
│  └───────────┬────────────┘    └──────────┬───────────┘  │
└──────────────┼────────────────────────────┼──────────────┘
               ▼                            ▼
         Endpoints REST               Eventos Webhook

```

### 💎 Vantagens Estratégicas da Solução

* **Comunicação IPC de Baixa Latência:** Como os serviços coexistem na mesma rede virtualizada (`localhost`), a troca de dados entre a API e o Bot ocorre de forma instantânea.
* **Orquestração Simplificada:** Um único blueprint de deploy gerencia todo o ciclo de vida da aplicação, reduzindo drasticamente o custo de infraestrutura em plataformas PaaS (como o Render).
* **Gerenciamento de Processos Isolado:** Monitoramento de saúde individualizado dos serviços concorrentes, garantindo resiliência caso uma das pontas precise reiniciar o barramento.

---

## 📊 Stack Tecnológica e Recursos do Ecossistema

### Componentes de Infraestrutura

| Camada | Tecnologia | Função Principal |
| --- | --- | --- |
| **Backend** | Python 3.11 / FastAPI / Uvicorn | API assíncrona para monitoramento e rotas de controle. |
| **Automação** | Node.js v18+ / WhatsApp-Web.js | Core do bot e manipulação do Puppeteer em modo Headless. |
| **Infraestrutura** | Ambiente local / Windows ou Linux | Execução do bot e da API diretamente no PC. |
| **Cloud** | Opcional | Deploy remoto opcional se desejar usar serviços como Render. |
| **Automação** | Node.js v18 / WhatsApp-Web.js | Core do bot e manipulação do Puppeteer em modo Headless. |
| **Infraestrutura** | Docker / Debian Slim Environment | Containerização estável e isolamento de dependências. |
| **Cloud** | Render Web Services | Hospedagem em nuvem com esteira de deploy automático. |

### 🛠️ Funcionalidades Implementadas

* 📌 **Rotas de Monitoramento & Endpoint de Sincronização**
* 📌 **Gatilhos Comerciais Ativos com Rotação de Mensagens Únicas**
* 📌 **Painel Web de Controle Integrado**
* 📌 **Persistência de Sessão Segura e Anti-Spam**

---

## 🧠 Lógica de Atendimento (Anti-Spam)

O assistente virtual monitora as mensagens recebidas e, ao detectar um gatilho válido, realiza um sorteio algorítmico entre **10 variações de textos comerciais em primeira pessoa ("Eu")**. Essa abordagem humaniza o fluxo e previne bloqueios na plataforma.

### Formato de Saída padronizado (WhatsApp)

```text
[Mensagem Comercial Humanizada Sorteada]

M GRUPO

```

---

## 🏢 M GRUPO

O **M GRUPO** atua com excelência e rigor técnico entregando soluções completas nas áreas de:

* 📐 **Engenharias**
* 📚 **Educação**
* 💻 **Desenvolvimento de Tecnologias Inovadoras**

---

## 🚀 Instalação e Execução Local

Agora o projeto roda diretamente no seu PC local. Siga os passos abaixo para iniciar o bot e a API sem usar Docker.

Siga os passos abaixo sequencialmente para rodar o ambiente de desenvolvimento:

### 1. Clonar o Repositório

```bash
git clone https://github.com/marcio-dev-fullstack/ROBO-ZAP.git
cd ROBO-ZAP
```

### 2. Preparar o Ambiente Local

Instale as dependências para Node.js e Python no seu computador:

```powershell
# Instala dependências do ecossistema JavaScript
npm install

# Instala dependências do ecossistema Python no Windows
py -3.11 -m pip install -r requirements.txt
```

> 💡 Recomendado: use Python 3.11 e Node.js 18+ para compatibilidade completa.

### 3. Executar os Serviços Localmente

Abra dois terminais no seu PC ou no VS Code para rodar os dois serviços simultaneamente.

* **Terminal 1 (Assistente WhatsApp):**
```powershell
npm run start
```

* **Terminal 2 (API Backend):**
```powershell
npm run start:api
```

> 💡 Nota: se você estiver usando o Windows, o backend pode ser iniciado com `py -3.11 -m uvicorn main:app --reload` quando `uvicorn` não estiver disponível globalmente.

### 4. Acessar a API

A API estará disponível em:

```text
http://127.0.0.1:8000
```

### 5. Verificar o Status e o QR Code de Autenticação

Use o endpoint de saúde para verificar se o backend está online e se o bot está aguardando autenticação:

```powershell
curl http://127.0.0.1:8000/status
```

Se o retorno exibir `"bot_status":"qr"`, abra:

```text
http://127.0.0.1:8000/qr
```

E escaneie o QR Code no WhatsApp para autenticar a sessão.

### 6. Parar os Serviços

Use `Ctrl+C` em cada terminal para encerrar o bot e a API.

### 🛡️ Executando 24/7 (Windows)

Opção A — PM2 (recomendado):

- Instale o PM2 globalmente:

```powershell
npm install -g pm2
```

- Inicie os processos usando o arquivo de configuração Windows já preparado:

```powershell
pm2 start ecosystem.config.windows.json --update-env
```

- Salve a lista de processos e habilite no boot:

```powershell
pm2 save
pm2 startup
```

> Se preferir iniciar manualmente pelos scripts `package.json`, use `pm2 start npm --name "robo-zap-bot" -- run start` e `pm2 start npm --name "robo-zap-api" -- run start:api`.

Opção B — NSSM (instalar como serviço do Windows):

- Exemplo de criação de serviços (ajuste caminhos conforme seu sistema):

```bash
nssm install robo-zap-bot "C:\\Program Files\\nodejs\\node.exe" "C:\\src\\ROBO-ZAP\\bot.js"
nssm install robo-zap-api "C:\\Python311\\python.exe" "-m uvicorn main:app --reload"
```

- Iniciar os serviços:

```bash
nssm start robo-zap-bot
nssm start robo-zap-api
```

Monitoramento / Healthcheck

- Verifique o status do bot pela API:

```bash
curl http://127.0.0.1:8000/status
```


Observações:

- Ajuste os caminhos do `node` e do `python` conforme a instalação do seu sistema.
- `PM2` é a forma mais simples para rodar e monitorar processos Node; ele também consegue gerenciar a execução do comando Python via `npm run start:api`.

### Comandos PowerShell e exemplos de `pm2 logs`

Use os comandos abaixo no PowerShell quando quiser iniciar, inspecionar ou depurar os processos.

Iniciar (script automático):
```powershell
cd C:\src\ROBO-ZAP
.\run-windows.ps1
```

Comandos PM2 manuais equivalentes:
```powershell
# iniciar usando o ecosystem
pm2 start ecosystem.config.js
# listar processos
pm2 status
# ver logs do bot (últimas 200 linhas)
pm2 logs robo-zap-bot --lines 200
# ver logs da API (últimas 200 linhas)
pm2 logs robo-zap-api --lines 200
# ver logs em tempo real
pm2 logs
# visualizar métricas e monitoramento interativo
pm2 monit
```

Dicas de depuração:

- Se o QR não aparecer, verifique o conteúdo de `qrcode_atual.txt` e o status do bot em `/status`.
- Use `pm2 restart <name>` para reiniciar um processo individualmente.
- Para limpar logs: `pm2 flush`.

Arquivo Windows pronto:

Se preferir um arquivo com caminhos Windows já preenchidos (ajuste se necessário), veja `ecosystem.config.windows.json` no repositório. Use:

```powershell
pm2 start ecosystem.config.windows.json
git clone [https://github.com/marcio-dev-fullstack/Bot.git](https://github.com/marcio-dev-fullstack/Bot.git)
cd Bot

```

### 2. Configurar os Ambientes e Dependências

Instale os pacotes necessários tanto para a runtime do Node.js quanto para o ecossistema Python:

```bash
# Instala dependências do ecossistema JavaScript
npm install

# Instala dependências do ecossistema Python
pip install -r requirements.txt

```

### 3. Inicialização dos Serviços

Abra dois terminais no seu VS Code para rodar os serviços concorrentes de forma independente:

* **Terminal 1 (Assistente WhatsApp):**
```bash
node bot.js

```


> 💡 **Nota:** Escaneie o QR Code gerado diretamente no terminal para autenticar o aparelho corporativo.


* **Terminal 2 (API Backend):**
```bash
uvicorn main:app --reload

```

---

## ☁️ Produção e Deploy no Render

O deploy na nuvem é gerenciado de forma 100% automatizada via **Dockerfile**.

> 🔒 **Otimização de Segurança:** Graças aos filtros configurados no `.gitignore`, os dados pesados de cache do navegador local são totalmente descartados. O deploy envia para o servidor apenas o token criptografado essencial de autenticação (`.wwebjs_auth`), preservando a sessão ativa.

### 🏗️ Fluxo de Automação do Dockerfile

O blueprint de build executa as seguintes etapas sequenciais na nuvem durante o deploy:

1. **Base OS:** Provisiona o ambiente oficial isolado `Python 3.11 Slim`.
2. **Browsers:** Injeta as dependências estáveis e bibliotecas do Chromium moderno (`Debian Trixie`).
3. **Runtimes:** Instala a runtime do `Node.js v18+` de forma independente.
4. **Packages:** Instala e sincroniza os pacotes via `NPM` e Python `PIP`.
5. **Auth:** Importa o token da sessão local estável para evitar novas leituras de QR Code.
6. **Engine:** Inicializa os serviços concorrentes, rodando a API FastAPI e o Bot lado a lado.

---

## 👥 Créditos e Desenvolvimento

**Desenvolvido e Gerenciado por Márcio Rodrigues de Oliveira**

*Engenheiro de Software | Engenheiro Civil | Engenheiro de Segurança do Trabalho*

```

```
