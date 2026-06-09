const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const QRCode = require('qrcode');
const axios = require('axios');
const express = require('express');
const { exec } = require('child_process');

const AUTH_PATH = path.join(__dirname, '.wwebjs_auth');
const QR_FILE = path.join(__dirname, 'qrcode_atual.txt');
const app = express();
let client = null;

// --- SERVIDOR DE VISUALIZAÇÃO ---
app.get('/', async (req, res) => {
    if (fs.existsSync(QR_FILE)) {
        const qrData = fs.readFileSync(QR_FILE, 'utf8');
        try {
            const qrImage = await QRCode.toDataURL(qrData);
            res.send(`<h1>Escaneie o QR Code:</h1><img src="${qrImage}" /><script>setTimeout(()=>location.reload(), 2000)</script>`);
        } catch (err) {
            res.send('<h1>Aguardando processamento...</h1><script>setTimeout(()=>location.reload(), 2000)</script>');
        }
    } else {
        res.send('<h1>Aguardando QR Code...</h1><script>setTimeout(()=>location.reload(), 2000)</script>');
    }
});

app.listen(3000, () => {
    console.log('Visualizador em: http://localhost:3000');
    const start = process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${start} http://localhost:3000`);
});

// --- LÓGICA DO BOT ---
function buildClient() {
    return new Client({
        authStrategy: new LocalAuth({ dataPath: AUTH_PATH, clientId: 'robo-mgrupo' }),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });
}

async function enviarParaAPI(mensagem) {
    try {
        await axios.post('http://127.0.0.1:8000/webhook', {
            remetente: mensagem.from,
            conteudo: mensagem.body,
            timestamp: new Date().toISOString()
        });
        console.log('[API] Lead enviado.');
    } catch (error) {
        console.error('[API] Erro ao enviar lead:', error.message);
    }
}

function initializeClient() {
    client = buildClient();

    client.on('qr', (qr) => {
        console.log('[BOT] QR Code gerado.');
        qrcodeTerminal.generate(qr, { small: true });
        fs.writeFileSync(QR_FILE, qr, 'utf8');
    });

    client.on('ready', () => {
        console.log('[BOT] WhatsApp pronto.');
        fs.writeFileSync(QR_FILE, '', 'utf8');
    });

    client.on('message', async (message) => {
        if (message.fromMe) return;
        await enviarParaAPI(message);
        
        const msgBody = message.body.toLowerCase();
        if (msgBody.includes('engenharia')) {
            await message.reply('Olá! Acesse: https://mgrupo.online/KM-Projetos/index.html');
        }
    });

    client.on('disconnected', (reason) => {
        console.warn(`[BOT] Desconectado: ${reason}`);
        setTimeout(() => initializeClient(), 5000);
    });

    client.initialize().catch(err => console.error(err));
}

initializeClient();