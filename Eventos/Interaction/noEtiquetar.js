const { EmbedBuilder, Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate, 
    async execute(message, client) {
        const rolStaff = '1254337555902763008';

        if (message.member && message.member.roles.cache.has(rolStaff)) {
            return;
        }

        if (message.mentions.users.size > 0 && !message.author.bot && !message.reference) {
            for (const [_, user] of message.mentions.users) {
                const member = message.guild.members.cache.get(user.id);

                if (!member) {
                    console.log(`No se pudo obtener información para el usuario con ID ${user.id}`);
                    continue;
                }

                if (member.roles.cache.has(rolStaff)) {
                    await message.delete();

                    const embed = new EmbedBuilder()
                        .setColor("#FF0000")
                        .setTitle("⚠️ No etiquetes al staff")
                        .setDescription("Por favor, evita etiquetar al staff en los mensajes.");

                    try {
                        await message.author.send({ embeds: [embed] });
                    } catch (error) {
                        await message.channel.send({
                            content: `<@${message.author.id}>, no puedes etiquetar al staff.`,
                            embeds: [embed]
                        }).then(msg => {
                            setTimeout(() => msg.delete(), 5000);
                        });
                    }

                    break;
                }
            }
        }
    }
};
