const Ayuda = require('../../models/ayudaSchema');

module.exports = {
    name: 'addayuda',
    description: 'Añadir una ayuda a la base de datos',
    options: [
        {
            name: 'nombre',
            description: 'Nombre de la ayuda',
            type: 3,
            required: true,
        },
        {
            name: 'contenido',
            description: 'Contenido de la ayuda',
            type: 3, 
            required: true,
        }
    ],

    async execute(client, interaction) {
        const roleId = '1254337555902763008';
        if (!interaction.member.roles.cache.has(roleId)) {
            return await interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
        }

        const nombre = interaction.options.getString('nombre');
        const contenido = interaction.options.getString('contenido');

        try {
            const ayuda = new Ayuda({ nombre, contenido });
            await ayuda.save();
            await interaction.reply({ content: `Ayuda '${nombre}' añadida con éxito.`, ephemeral: true });
        } catch (error) {
            if (error.code === 11000) {
                await interaction.reply({ content: `La ayuda '${nombre}' ya existe.`, ephemeral: true });
            } else {
                console.error(error);
                await interaction.reply({ content: 'Hubo un error al intentar añadir la ayuda.', ephemeral: true });
            }
        }
    },
};
