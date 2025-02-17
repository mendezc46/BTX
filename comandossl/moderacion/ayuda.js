const Ayuda = require("../../models/ayudaSchema");

module.exports = {
    name: "ayuda",
    description: "Obtén una ayuda específica o lista todas las ayudas.",
    options: [
        {
            name: "nombre",
            description: "El nombre de la ayuda que deseas obtener.",
            type: 3, 
            required: true,
            autocomplete: true,
        },
    ],
    async execute(client, interaction, args) {
        const nombre = args[0];

        if (nombre) {
            const ayuda = await Ayuda.findOne({ nombre });
            if (ayuda) {
                await interaction.reply({ content: `**${ayuda.nombre}**: ${ayuda.contenido}`, ephemeral: false });
            } else {
                await interaction.reply({ content: `No se encontró ninguna ayuda con el nombre "${nombre}".`, ephemeral: true });
            }
        } else {
            const ayudas = await Ayuda.find({});
            if (ayudas.length > 0) {
                const listaAyudas = ayudas.map(a => `**${a.nombre}**`).join("\n");
                await interaction.reply({ content: `Lista de ayudas disponibles:\n${listaAyudas}`, ephemeral: true });
            } else {
                await interaction.reply({ content: "No hay ayudas disponibles.", ephemeral: true });
            }
        }
    },
};
