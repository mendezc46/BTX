const { EmbedBuilder } = require('discord.js');

async function bienvenida(member) {
    const totalUsuarios = member.guild.memberCount;

    const embed = new EmbedBuilder()
        .setTitle('💻 Bienvenido a MSX | 2024 ⚒️')
        .setDescription(`
¡Hola, **${member.user.tag}**! 🎊 

>  Nos alegra mucho que te unas a nuestro servidor. 
>  Asegúrate de leer <#1282568478670192640>.
>  ¡Explora los canales y crea tu servidor gratuitamente!

🛠 Si necesitas ayuda, no dudes en preguntar.

👥 **Actualmente somos ${totalUsuarios} miembros en el servidor.**
        `)
        .setColor('#3f1d68')
        .setTimestamp()
        .setFooter({
            text: "MSX | 2024",
            iconURL: 'https://i.imgur.com/n04xosC.png',
        })
        .setThumbnail('https://i.imgur.com/9U9ylXu.gif') 


    const channelId = '1310734381601788046';
    const channel = member.guild.channels.cache.get(channelId);

    if (channel) {
        channel.send({ embeds: [embed] });
    } else {
        console.error("El canal de bienvenida no existe");
    }
}

module.exports = { bienvenida };
