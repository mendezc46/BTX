const { EmbedBuilder } = require("discord.js");
const { status } = require("minecraft-server-util");

module.exports = {
    name: "servidor",
    description: "Muestra el estado del servidor de Minecraft.",
    options: [],
    async execute(client, interaction, args) {
        const ip = "199.127.63.47";
        const port = 19204;

        try {
            const response = await status(ip, port);
            
            const embed = new EmbedBuilder()
                .setColor("#00FF00")
                .setTitle("Estado del Servidor de Minecraft")
                .addFields(
                    { name: "Estado", value: "🟢 En línea", inline: true },
                    { name: "Jugadores Conectados", value: `${response.players.online}/${response.players.max}`, inline: true }
                )
                .setFooter({ text: "Descarga nuestro Launcher usando !Launcher" })

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            const embed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("Estado del Servidor de Minecraft")
                .addFields(
                    { name: "Estado", value: "🔴 Fuera de línea", inline: true }
                )
                .setFooter({ text: "Descarga nuestro Launcher usando !Launcher" })


            await interaction.reply({ embeds: [embed] });
        }
    },
};
