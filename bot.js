const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const QRCode = require('qrcode');
const axios = require('axios');
const express = require('express');

const QR_FILE = path.join(__dirname, 'qrcode_atual.txt');
const app = express();
const PORT = 3000;

// Servidor local para visualizar o QR Code
app.get('/', (req, res) => {
    const qrData = fs.existsSync(QR_FILE) ? fs.readFileSync(QR_FILE, 'utf8') : '';
    if (!qrData) return res.send('<h1>Aguardando QR Code...</h1><script>setTimeout(()=>location.reload(), 2000)</script>');
    
    QRCode.toDataURL(qrData, (err, url) => {
        res.send(`<h1>Escaneie o QR Code:</h1><img src="${url}" /><script>setTimeout(()=>location.reload(), 2000)</script>`);
    });
});

app.listen(PORT, () => console.log(`Visualizador disponível em http://localhost:${PORT}`));

// Inicialização do Client do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'robo-mgrupo' }),
    puppeteer: { headless: true, args: ['--no-sandbox'] }
});

client.on('qr', (qr) => {
    qrcodeTerminal.generate(qr, { small: true });
    fs.writeFileSync(QR_FILE, qr, 'utf8');
});

client.on('ready', () => {
    console.log('[BOT] WhatsApp pronto.');
    fs.writeFileSync(QR_FILE, '', 'utf8');
});

client.on('message', async (msg) => {
    if (msg.fromMe) return;

    // Envio para o Backend FastAPI
    try {
        await axios.post('http://127.0.0.1:8000/webhook', {
            remetente: msg.from,
            conteudo: msg.body
        }, { timeout: 3000 });
        console.log('[API] Lead enviado com sucesso.');
    } catch (e) {
        console.log('[API] Erro ao enviar: Verifique se o main.py tem a rota /webhook');
    }

    if (msg.body.toLowerCase().includes('engenharia')) {
        await msg.reply('Olá! Acesse: https://mgrupo.online/KM-Projetos/index.html');
    }
});

client.initialize();