const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const { loadSlash } = require("./handlers/slashHandler");
const { loadEvents } = require("./handlers/eventHandler");
const { bienvenida } = require('./Eventos/Client/bienvenida');
const { handlerTI } = require("./handlers/ticketHandler");
require("dotenv").config();

const client = new Client({ intents: 3276799 });
client.slashCommands = new Collection();

client.on('guildMemberAdd', bienvenida);

client.on("interactionCreate", async (interaction) => {
    await handlerTI(interaction);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'archivoButton') {
        await interaction.reply({ content: 'El archivo está en https://discord.com/channels/1254334294286008340/1254526349041733703', ephemeral: true });
    }
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const categoryId = "1254525800481292309";
    const roleId = "1254525595430289548";
    const keywords = ["ayuda", "ayudar", "una duda", "una pregunta"];
    const isKeyword = keywords.some(keyword => message.content.toLowerCase().includes(keyword));

    if (message.member.roles.cache.has(roleId)) return;

    if (isKeyword && message.channel.parentId !== categoryId) {
        message.reply({ content: 'Parece que necesitas ayuda. Para obtener asistencia, usa el comando `/ayuda [tema]`.', ephemeral: true });
    }

    if (message.content.toLowerCase().includes("ayudita")) {
        message.reply({ content: 'Hable bien!!', ephemeral: true });
    }
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("Conectado a MongoDB");

        await client.login(process.env.TOKEN);
        console.log("Bot iniciado");

        await loadEvents(client);
        await loadSlash(client);
        console.log("Se cargaron los comandos");

        const canalId = "1289848708602789910";
        const canal = client.channels.cache.get(canalId);
        if (canal) {
            canal.send("Bot Iniciado");
        } else {
            console.error("La id del canal no existe");
        }
        
    } catch (error) {
        console.error(`No se inició el bot, error ${error}`);
    }
})();
