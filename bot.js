const fs = require("fs");
const path = require("path");
const { Client, LocalAuth, List, MessageMedia } = require("whatsapp-web.js");
const qrcodeTerminal = require("qrcode-terminal");
const QRCode = require("qrcode");
const axios = require("axios");
const express = require("express");

const QR_FILE = path.join(__dirname, "qrcode_atual.txt");
const RESPOSTAS_FILE = path.join(__dirname, "respostas.json");
const API_WEBHOOK_URL = "http://127.0.0.1:8000/webhook";

// Insira seu número pessoal aqui no formato DDI+DDD+NUMERO@c.us
// Exemplo: '5511999998888@c.us'
const OWNER_NUMBER = "5562996466033@c.us";

let respostasPalavrasChave = [];
const app = express();
const PORT = 3000;

// Servidor local para visualizar o QR Code
app.get("/", (req, res) => {
  const qrData = fs.existsSync(QR_FILE) ? fs.readFileSync(QR_FILE, "utf8") : "";
  if (!qrData)
    return res.send(
      "<h1>Aguardando QR Code...</h1><script>setTimeout(()=>location.reload(), 2000)</script>",
    );

  QRCode.toDataURL(qrData, (err, url) => {
    res.send(
      `<h1>Escaneie o QR Code:</h1><img src="${url}" /><script>setTimeout(()=>location.reload(), 2000)</script>`,
    );
  });
});

app.listen(PORT, () =>
  console.log(`Visualizador disponível em http://localhost:${PORT}`),
);

// Carrega as respostas automáticas do arquivo JSON
function carregarRespostas() {
  try {
    const data = fs.readFileSync(RESPOSTAS_FILE, "utf8");
    const novasRespostas = JSON.parse(data);
    respostasPalavrasChave = novasRespostas; // Atualiza a configuração em memória
    console.log(
      "[BOT] Arquivo de respostas automáticas carregado/recarregado com sucesso.",
    );
  } catch (error) {
    console.error("[BOT] Erro ao carregar o arquivo de respostas:", error);
    console.log(
      "[BOT] Mantendo a configuração de respostas anterior devido ao erro.",
    );
  }
}

// Observa o arquivo de respostas para recarregá-lo automaticamente
function observarArquivoDeRespostas() {
  try {
    fs.watch(RESPOSTAS_FILE, (eventType, filename) => {
      if (filename && (eventType === "change" || eventType === "rename")) {
        console.log(
          `[BOT] Detectada alteração em ${filename}. Recarregando respostas...`,
        );
        carregarRespostas();
      }
    });
  } catch (error) {
    console.error(
      "[BOT] Não foi possível observar o arquivo de respostas:",
      error,
    );
  }
}
// Inicialização do Client do WhatsApp
const client = new Client({
  authStrategy: new LocalAuth({ clientId: "robo-mgrupo" }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // Aponta para o executável do Chromium baixado pelo Puppeteer
    executablePath: require("puppeteer").executablePath(),
  },
});

client.on("qr", (qr) => {
  qrcodeTerminal.generate(qr, { small: true });
  fs.writeFileSync(QR_FILE, qr, "utf8");
});

client.on("ready", () => {
  console.log("[BOT] Cliente WhatsApp pronto e conectado!");
  fs.writeFileSync(QR_FILE, "", "utf8");
});

async function sendLeadToBackend(remetente, conteudo) {
  try {
    await axios.post(
      API_WEBHOOK_URL,
      {
        remetente: remetente,
        conteudo: conteudo,
      },
      { timeout: 3000 },
    );
    console.log("[API] Lead enviado com sucesso.");
  } catch (error) {
    console.error(
      `[API] Erro ao enviar lead para o Webhook: ${error.message}. Conteúdo: "${conteudo}"`,
    );
  }
}

// Função para enviar notificação de novo lead para o seu número pessoal
async function sendNotificationToOwner(leadSender, leadContent) {
  if (!OWNER_NUMBER || OWNER_NUMBER === "SEU_NUMERO_AQUI@c.us") {
    console.warn(
      "[BOT] Número do proprietário não configurado. Pulando notificação.",
    );
    return;
  }
  try {
    const notificationMessage = `🔔 *Novo Lead Recebido* 🔔\n\n*De:* ${leadSender}\n*Mensagem:* ${leadContent}`;
    await client.sendMessage(OWNER_NUMBER, notificationMessage);
    console.log(`[BOT] Notificação de lead enviada para ${OWNER_NUMBER}.`);
  } catch (error) {
    console.error(
      `[BOT] Falha ao enviar notificação para o proprietário: ${error.message}`,
    );
  }
}

// Função para simular um atraso "humano" (entre 1 e 3 segundos)
const humanLikeDelay = () => {
  const delay = Math.floor(Math.random() * 2000) + 1000; // Gera um número entre 1000 e 2999
  return new Promise((resolve) => setTimeout(resolve, delay));
};

async function handleAutomatedReply(msg) {
  const mensagemTexto = msg.body.toLowerCase();
  let replied = false;

  for (const item of respostasPalavrasChave) {
    // Usamos uma expressão regular para encontrar a palavra-chave como uma palavra inteira (\b)
    // e de forma insensível a maiúsculas/minúsculas (i)
    const regex = new RegExp(`\\b${item.keyword.toLowerCase()}\\b`, "i");

    if (regex.test(mensagemTexto)) {
      console.log(
        `[BOT] Palavra-chave encontrada: "${item.keyword}". Respondendo para ${msg.from}.`,
      );
      const chat = await msg.getChat();
      await chat.sendStateTyping(); // Simula o "digitando..."
      await humanLikeDelay(); // Adiciona o atraso

      if (item.media) {
        const mediaPath = path.join(__dirname, item.media);
        if (fs.existsSync(mediaPath)) {
          const media = MessageMedia.fromFilePath(mediaPath);
          // Envia a mídia com o texto do 'reply' como legenda
          await client.sendMessage(msg.from, media, { caption: item.reply });
        } else {
          console.error(`[BOT] Arquivo de mídia não encontrado: ${mediaPath}`);
          // Se a mídia não for encontrada, envia apenas o texto como fallback
          if (item.reply) await msg.reply(item.reply);
        }
      } else if (item.reply) {
        await msg.reply(item.reply);
      }

      await chat.clearState(); // Limpa o status "digitando..."
      replied = true; // Marca que pelo menos uma resposta foi enviada
    }
  }
  return replied; // Retorna true se alguma resposta foi enviada, senão false
}

client.on("message", async (msg) => {
  // Ignora mensagens de status, de grupos ou do próprio bot
  if (
    msg.from === "status@broadcast" ||
    msg.from.endsWith("@g.us") ||
    msg.fromMe
  ) {
    return;
  }

  await sendLeadToBackend(msg.from, msg.body);
  await sendNotificationToOwner(msg.from, msg.body); // Envia a notificação
  const replied = await handleAutomatedReply(msg);

  // Se nenhuma palavra-chave foi encontrada, envia uma mensagem padrão.
  if (!replied) {
    console.log(
      `[BOT] Nenhuma palavra-chave encontrada. Enviando menu de opções para ${msg.from}.`,
    );
    const chat = await msg.getChat();
    await chat.sendStateTyping(); // Simula o "digitando..."
    await humanLikeDelay(); // Adiciona o atraso

    const sections = [
      {
        title: "Selecione uma opção",
        rows: [
          {
            title: "Engenharia",
            description: "Para saber mais sobre nossos serviços de engenharia.",
          },
          {
            title: "Orçamento",
            description: "Para solicitar um orçamento detalhado.",
          },
          {
            title: "Contato",
            description: "Para ver nossas informações de contato.",
          },
        ],
      },
    ];

    const list = new List(
      "Olá! Sou o assistente virtual do M GRUPO. Como posso te ajudar hoje?",
      "Ver Opções",
      sections,
      "Escolha uma das opções abaixo:",
    );
    await client.sendMessage(msg.from, list);
    await chat.clearState(); // Limpa o status "digitando..."
  }
});

client.on("disconnected", (reason) => {
  console.log("[BOT] Cliente desconectado:", reason);
});

client.on("auth_failure", (msg) => {
  console.error(
    "[BOT] Falha na autenticação. Pode ser necessário limpar a pasta de sessão:",
    msg,
  );
});

carregarRespostas(); // Carga inicial
observarArquivoDeRespostas(); // Inicia a observação de alterações
client.initialize();
