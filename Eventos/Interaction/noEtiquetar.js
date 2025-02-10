const { EmbedBuilder, Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate, // Evento para cuando se crea un mensaje
    async execute(message, client) {
        // ID del rol que no debe ser etiquetado (staff)
        const rolStaff = '1254337555902763008';

        // Si el autor del mensaje tiene el rol de staff, no se aplica ninguna restricción
        if (message.member && message.member.roles.cache.has(rolStaff)) {
            return;
        }

        // Verifica si hay menciones en el mensaje, si el autor no es un bot y si no es una respuesta a un mensaje
        if (message.mentions.users.size > 0 && !message.author.bot && !message.reference) {
            // Revisa cada usuario mencionado en el mensaje
            for (const [_, user] of message.mentions.users) {
                const member = message.guild.members.cache.get(user.id);

                // Verifica si se pudo obtener el miembro
                if (!member) {
                    console.log(`No se pudo obtener información para el usuario con ID ${user.id}`);
                    continue; // Si no se obtiene el miembro, pasa al siguiente
                }

                // Si el usuario mencionado tiene el rol de staff
                if (member.roles.cache.has(rolStaff)) {
                    // Borra el mensaje
                    await message.delete();

                    // Crea un embed de advertencia
                    const embed = new EmbedBuilder()
                        .setColor("#FF0000")
                        .setTitle("⚠️ No etiquetes al staff")
                        .setDescription("Por favor, evita etiquetar al staff en los mensajes.");

                    try {
                        // Envía un mensaje directo (DM) al usuario que mencionó a alguien
                        await message.author.send({ embeds: [embed] });
                    } catch (error) {
                        // Si el usuario tiene los mensajes directos desactivados, envía un mensaje en el canal
                        await message.channel.send({
                            content: `<@${message.author.id}>, no puedes etiquetar al staff.`,
                            embeds: [embed]
                        }).then(msg => {
                            setTimeout(() => msg.delete(), 5000); // Borra el mensaje después de 5 segundos
                        });
                    }

                    // Rompe el bucle si encuentra una mención al staff (evita múltiples advertencias por mensaje)
                    break;
                }
            }
        }
    }
};
