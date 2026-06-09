const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');

const AUTH_PATH = path.join(__dirname, '.wwebjs_auth');
const QR_FILE = path.join(__dirname, 'qrcode_atual.txt');
const STATUS_FILE = path.join(__dirname, 'bot_status.txt');
const RECONNECT_DELAY = 15_000;

let client = null;
let reconnectTimer = null;

function clearLockFiles() {
    const lockFiles = [
        path.join(AUTH_PATH, 'SingletonLock'),
        path.join(AUTH_PATH, 'session', 'SingletonLock')
    ];
    lockFiles.forEach(file => {
        if (fs.existsSync(file)) {
            try { fs.unlinkSync(file); } catch (e) { }
        }
    });
}

function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
}

function updateStatus(status) {
    console.log(`[STATUS] ${status}`);
    writeFile(STATUS_FILE, status);
}

function updateQrFile(qr) {
    writeFile(QR_FILE, qr || '');
}

function buildClient() {
    return new Client({
        authStrategy: new LocalAuth({ 
            dataPath: AUTH_PATH,
            clientId: 'robo-mgrupo'
        }),
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-zygote',
                '--single-process',
                '--disable-extensions',
                '--disable-audio-output',
                '--disable-canvas-aa',
                '--ignore-certificate-errors'
            ]
        },
        restartOnAuthFail: true,
        takeoverOnConflict: true,
        takeoverTimeoutMs: 10000,
        disableSpins: true,
        bypassCSP: true
    });
}

function scheduleRestart(reason) {
    if (reconnectTimer) return;
    console.warn(`[RECONNECT] ${reason}. Reiniciando...`);
    updateStatus('reconnecting');
    reconnectTimer = setTimeout(async () => {
        reconnectTimer = null;
        await restartClient();
    }, RECONNECT_DELAY);
}

async function restartClient() {
    try { if (client) await client.destroy(); } catch (err) { console.error(err); }
    client = null;
    initializeClient();
}

function initializeClient() {
    if (client) return;
    clearLockFiles();
    client = buildClient();

    client.on('qr', (qr) => {
        console.log('[BOT] QR code recebido.');
        updateQrFile(qr);
        updateStatus('qr');
    });

    client.on('ready', () => {
        console.log('[BOT] WhatsApp pronto e funcionando 24/7.');
        updateStatus('ready');
        updateQrFile('');
    });

    client.on('message', async (message) => {
        if (message.fromMe) return;
        const msgBody = message.body.toLowerCase();

        const pEngenharia = ['engenharia civil', 'construção civil', 'planta baixa', 'projeto legal', 'obra', 'concreto armado', 'reforma', 'construção', 'construir', 'edificação', 'ambiental', 'licenciamento', 'licença ambiental', 'estudo ambiental', 'eia', 'rima', 'pca', 'prade', 'estudo de impacto', 'gestão de resíduos', 'plano de manejo', 'outorga', 'recurso hídrico', 'drenagem', 'saneamento', 'tratamento de esgoto', 'georreferenciamento', 'car', 'cadastro ambiental', 'topografia', 'agrimensura', 'levantamento topográfico', 'terraplenagem', 'sondagem', 'geotecnia', 'meio ambiente', 'sustentabilidade', 'monitoramento ambiental', 'segurança do trabalho', 'laudos', 'pericias', 'perícia', 'insalubridade', 'periculosidade', 'ppra', 'pgr', 'ltcat', 'pcmso', 'aso', 'treinamento', 'epi', 'epc', 'cipa', 'sesmt', 'risco ambiental', 'nr', 'segurança laboral', 'higiene ocupacional', 'avcb', 'bombeiros', 'projeto de incêndio', 'segurança contra incêndio', 'laudo técnico', 'vistoria', 'inspeção', 'perito', 'perícia judicial', 'parecer técnico', 'análise de risco', 'consultoria', 'assessoria', 'engenheiro', 'arquiteto', 'reforma residencial', 'execução de obra', 'gerenciamento de obra', 'fiscalização', 'acompanhamento técnico', 'orçamentação', 'bdi', 'sinapi', 'cronograma físico-financeiro', 'memorial descritivo', 'regularização', 'habite-se', 'alvará', 'fiscalização de obra', 'serviços de engenharia'];
        const pAcademicas = ['tcc', 'monografia', 'mestrado', 'doutorado', 'pos-graduação', 'pós-graduação', 'trabalhos academicos', 'trabalhos acadêmicos'];
        const pCursos = ['cursos', 'treinamentos', 'capacitação', 'profissionalizante', 'workshop'];

        if (pEngenharia.some(p => msgBody.includes(p))) {
            await message.reply('Olá! Seja bem-vindo(a). Como posso ajudar?\n\nAcesse nosso site para maiores informações:\nSede: Conceição do Araguaia - PA\nhttps://mgrupo.online/KM-Projetos/index.html');
        } else if (pAcademicas.some(p => msgBody.includes(p))) {
            await message.reply('MAZZ Consultoria & Assessoria\nServiços Acadêmicos\nParcelamos em até 10x no cartão de crédito.\n\nhttps://mgrupo.online/MAZZ-Cursos/academico/index.html');
        } else if (pCursos.some(p => msgBody.includes(p))) {
            await message.reply('MAZZ CURSOS\nCapacitação e Treinamentos Profissionais\n\nhttps://mgrupo.online/MAZZ-Cursos/index.html');
        }
    });

    client.on('disconnected', (reason) => {
        scheduleRestart('disconnected');
    });

    client.initialize().catch((err) => console.error(err));
}

process.on('SIGINT', async () => {
    if (client) await client.destroy();
    process.exit(0);
});

initializeClient();