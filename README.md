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

---

### 💻 **<font size="4">⚡ Engine Backend (FastAPI)</font>**

- **Responsabilidade:** Exposição de endpoints REST, processamento de payloads, gerenciamento das regras de negócio e gateway estável de dados.
- **Ambiente:** Python 3.11.

---

### 🤖 **<font size="4">⚙️ Engine de Automação (WWebJS)</font>**

- **Responsabilidade:** Controle do ciclo de vida do cliente WhatsApp, escuta ativa de eventos em tempo real e injeção automatizada de mensagens.
- **Ambiente:** Node.js v18+.

---

```text
┌──────────────────────────────────────────────────────────┐
│                        PC LOCAL                          │
│                                                          │
│  ┌────────────────────────┐    ┌──────────────────────┐  │
│  │      API FASTAPI       │    │   BOT ASSISTENTE     │  │
│  │      (Python 3.11)     │◄──►│    (Node.js v18+)     │  │
│  └───────────┬────────────┘    └──────────┬───────────┘  │
└──────────────┼────────────────────────────┼──────────────┘
               ▼                            ▼
         Endpoints REST               Eventos Webhook

```

### 💎 Vantagens Estratégicas da Solução

- **Comunicação IPC de Baixa Latência:** Como os serviços coexistem na mesma rede virtualizada (`localhost`), a troca de dados entre a API e o Bot ocorre de forma instantânea.
- **Orquestração Simplificada:** Um único blueprint de deploy gerencia todo o ciclo de vida da aplicação, reduzindo drasticamente o custo de infraestrutura em plataformas PaaS (como o Render).
- **Gerenciamento de Processos Isolado:** Monitoramento de saúde individualizado dos serviços concorrentes, garantindo resiliência caso uma das pontas precise reiniciar o barramento.

---

## 📊 Stack Tecnológica e Recursos do Ecossistema

### Componentes de Infraestrutura

| Camada             | Tecnologia                        | Função Principal                                             |
| ------------------ | --------------------------------- | ------------------------------------------------------------ |
| **Backend**        | Python 3.11 / FastAPI / Uvicorn   | API assíncrona para monitoramento e rotas de controle.       |
| **Automação**      | Node.js v18+ / WhatsApp-Web.js    | Core do bot e manipulação do Puppeteer em modo Headless.     |
| **Infraestrutura** | Ambiente local / Windows ou Linux | Execução do bot e da API diretamente no PC.                  |
| **Cloud**          | Opcional                          | Deploy remoto opcional se desejar usar serviços como Render. |

### 🛠️ Funcionalidades Implementadas

- 📌 **Rotas de Monitoramento & Endpoint de Sincronização**
- 📌 **Gatilhos Comerciais Ativos com Rotação de Mensagens Únicas**
- 📌 **Painel Web de Controle Integrado**
- 📌 **Persistência de Sessão Segura e Anti-Spam**

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

- � **Engenharias**
- 📚 **Educação**
- � **Desenvolvimento de Tecnologias Inovadoras**

---

## 🚀 Instalação e Execução (Windows)

Esta aplicação foi projetada para ser configurada e executada de forma automatizada no Windows através de um único script. Siga os passos abaixo.

### Pré-requisitos

1.  **Node.js**: Instale a versão 18 ou superior.
2.  **Python**: Instale a versão 3.11 (durante a instalação, marque a opção "Add Python to PATH").
3.  **Git**: Necessário para clonar o projeto.

### Passo a Passo para Execução

1.  **Clonar o Repositório**
    - Abra um terminal (CMD ou PowerShell) e execute:

    ```bash
    git clone https://github.com/marcio-dev-fullstack/ROBO-ZAP.git
    cd ROBO-ZAP
    ```

2.  **Executar o Script de Automação (ÚNICO PASSO)**
    - **Abra o PowerShell como Administrador**.
    - Navegue até a pasta do projeto que você acabou de clonar.
    - Execute o seguinte comando para permitir que o script rode:

    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process
    ```

    - Agora, execute o script de automação. Ele fará **TUDO** para você:

    ```powershell
    .\run.ps1
    ```

O script irá instalar todas as dependências, configurar os ambientes e iniciar o bot e a API com o PM2, que os manterá rodando 24/7.

### 3. Verificação e Autenticação

Após a execução do script, siga estes passos para verificar se tudo está funcionando e para autenticar o bot:

1.  **Verifique o Status dos Processos**
    -   No terminal, execute `pm2 status`. Você deve ver `robo-zap-bot` e `robo-zap-api` com o status `online`.

2.  **Verifique a API**
    -   Abra seu navegador e acesse **http://127.0.0.1:8000/**. Você deve ver uma mensagem JSON com `"status": "online"`.

3.  **Autentique o Bot (QR Code)**
    -   Abra outra aba no navegador e acesse **http://localhost:3000**.
    -   Escaneie o QR Code exibido com o seu WhatsApp (em `Aparelhos conectados`). Após alguns segundos, o bot estará online.

### 4. Monitoramento e Logs

Após a execução do script, você pode usar os seguintes comandos PM2 em qualquer terminal:

- **Ver status dos processos:** `pm2 status`
- **Ver logs em tempo real:** `pm2 logs`
- **Parar todos os processos:** `pm2 stop all`
- **Reiniciar todos os processos:** `pm2 restart all`

Dicas de depuração:

- Se o QR Code não aparecer, verifique os logs com `pm2 logs robo-zap-bot`. Se o bot estiver pronto, você pode acessar o QR Code no navegador em `http://localhost:3000`.
- Use `pm2 restart <name>` para reiniciar um processo individualmente.

---

## 👥 Créditos e Desenvolvimento

**Desenvolvido e Gerenciado por Márcio Rodrigues de Oliveira**

_Engenheiro de Software | Engenheiro Civil | Engenheiro de Segurança do Trabalho_

---

## ☁️ Produção e Deploy (Docker)

Para deploy em produção ou em ambientes que não sejam Windows, o projeto utiliza Docker.

- **Build da imagem:** `docker build -t robo-zap .`
- **Execução do container:** `docker run -d --name robo-zap-container -p 8000:8000 -v "%cd%/.wwebjs_auth":/app/.wwebjs_auth robo-zap`

```

```
