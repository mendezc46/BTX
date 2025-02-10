const Ayuda = require("../../models/ayudaSchema");

module.exports = {
    name: "remayuda",
    description: "Elimina una ayuda específica de la base de datos.",
    options: [
        {
            name: "nombre",
            description: "El nombre de la ayuda que deseas eliminar.",
            type: 3, // STRING type
            required: true,
            autocomplete: true, // Habilita el autocompletado
        },
    ],
    async execute(client, interaction, args) {
        // Verificar si el usuario tiene el rol específico
        const roleId = '1254337555902763008';
        if (!interaction.member.roles.cache.has(roleId)) {
            return await interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
        }

        const nombre = args[0];
        const ayudaEliminada = await Ayuda.findOneAndDelete({ nombre });

        if (ayudaEliminada) {
            await interaction.reply({ content: `La ayuda "${nombre}" ha sido eliminada con éxito.`, ephemeral: true });
        } else {
            await interaction.reply({ content: `No se encontró ninguna ayuda con el nombre "${nombre}".`, ephemeral: true });
        }
    },
};
