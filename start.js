require("./doc/global");
const func = require("./doc/place");
const readline = require("readline");
const yargs = require('yargs/yargs');
const _ = require('lodash');
const usePairingCode = true;
async function fetchJsonMulti(url) {
const fetch = require("node-fetch")
const response = await fetch(url);
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
}
const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve);
    });
};

async function XeonSession() {
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
    const { state, saveCreds } = await useMultiFileAuthState(`./session`);
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const getMessage = async (key) => {
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
            return msg?.message || undefined;
        }
        return { conversation: 'WHATSAPP' };
    };

    const connectionOptions = {
        isLatest,
        getMessage,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "fatal" }),
        auth: state,
        browser: ['Ubuntu', 'Chrome', '20.0.04']
    };

    const sam = func.makeWASocket(connectionOptions);

    if (usePairingCode && !sam.authState.creds.registered) {

const botnumber = await question(chalk.green.bold(`







please enter your bot number, for example: +254742491666:                               
                                                                           
        




`));
 {
console.log(chalk.blue.bold(`🦄 YOUR NUMBER IS CONNECTED SUCCEFUL\n`))
await sleep(1500)
const code = await sam.requestPairingCode(botnumber.trim())
console.log(chalk.green.bold(`[ Your WhatsApp Pair Code ] ${code}`))
}}
    
store.bind(sam.ev)

sam.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
sam.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
sam.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await XeonSession()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
XeonSession()
}
        } else if (connection === "connecting") {
            console.log(chalk.blue.bold(`Connecting...`));
        } else if (connection === "open") {
console.log(chalk.blue.bold(`Connected to ${sam.user.id.split(":")[0]}`));
            sam.sendMessage("254742491666@s.whatsapp.net", { text: `🦄 Endpoint is online!!` });
        }
    });

    sam.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            let m = chatUpdate.messages[0];
            if (!m.message) return;
            m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message;
            if (m.key && m.key.remoteJid === 'status@broadcast') return sam.readMessages([m.key]);
            if (!sam.public && m.key.remoteJid !== global.owner + "@s.whatsapp.net" && !m.key.fromMe && chatUpdate.type === 'notify') return;
            if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return;
            if (global.autoread) sam.readMessages([m.key]);
            m = func.smsg(sam, m, store);
            require("./server.js")(sam, m, store);
        } catch (err) {
            console.log(err);
        }
    });

    
    sam.public = true;

    sam.ev.on('creds.update', saveCreds);
    return sam;
}

XeonSession();

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});
