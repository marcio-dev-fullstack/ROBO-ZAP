const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
    puppeteer: {
        headless: true, // Obrigatório no Render
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage', // Evita erro de memória compartilhada
            '--disable-gpu',
            '--no-zygote',
            '--single-process', // Roda tudo em um processo para poupar RAM
            '--disable-extensions',
            '--js-flags="--max-old-space-size=128"', // Limita V8 a 128MB
            '--disable-audio-output',
            '--disable-canvas-aa'
        ]
    }
});
// ... resto do seu código