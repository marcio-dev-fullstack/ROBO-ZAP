
<div align="center">

![Status do Deploy](https://img.shields.io/badge/Render-Live-brightgreen?style=for-the-badge&logo=render)
![Tecnologia](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Ambiente](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Plataforma](https://img.shields.io/badge/WhatsApp_Web.js-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

# 🤖 ROBÔ ZAP — Inteligência Comercial & Automação

**Conjunto de microsserviços corporativos que integra uma API de monitoramento assíncrona a um assistente inteligente focado em alta conversão de leads, vendas e direcionamento estratégico.**

</div>

---

## 🏗️ Arquitetura Híbrida do Projeto

O sistema adota uma abordagem **Side-by-Side (Lado a Lado)** encapsulada em um único container Docker. Esse ecossistema garante isolamento completo de processos, latência zero na comunicação interna e otimização máxima dos recursos computacionais em nuvem.

### ⚙️ Funcionamento Concorrente

Em vez de fragmentar a infraestrutura em múltiplas instâncias, o container gerencia dois motores independentes que rodam de forma síncrona:

---

### 💻 **<font size="4">⚡ Engine Backend (FastAPI)</font>**
* **Responsabilidade:** Exposição de endpoints REST, processamento de payloads, gerenciamento das regras de negócio e gateway estável de dados.
* **Ambiente:** Python 3.11 Slim.

---

### 🤖 **<font size="4">⚙️ Engine de Automação (WWebJS)</font>**
* **Responsabilidade:** Controle do ciclo de vida do cliente WhatsApp, escuta ativa de eventos em tempo real e injeção automatizada de mensagens.
* **Ambiente:** Node.js v18.

---

```text
┌──────────────────────────────────────────────────────────┐
│                     CONTAINER DOCKER                     │
│                                                          │
│  ┌────────────────────────┐    ┌──────────────────────┐  │
│  │      API FASTAPI       │    │   BOT ASSISTENTE     │  │
│  │      (Python 3.11)     │◄──►│    (Node.js v18)     │  │
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

Siga os passos abaixo sequencialmente para rodar o ambiente de desenvolvimento:

### 1. Clonar o Repositório

```bash
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
3. **Runtimes:** Instala a runtime do `Node.js v18` de forma independente.
4. **Packages:** Instala e sincroniza os pacotes via `NPM` e Python `PIP`.
5. **Auth:** Importa o token da sessão local estável para evitar novas leituras de QR Code.
6. **Engine:** Inicializa os serviços concorrentes, rodando a API FastAPI e o Bot lado a lado.

---

## 👥 Créditos e Desenvolvimento

**Desenvolvido e Gerenciado por Márcio Rodrigues de Oliveira**

*Engenheiro de Software | Engenheiro Civil | Engenheiro de Segurança do Trabalho*

```

```
