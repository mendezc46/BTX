const Ayuda = require("../../models/ayudaSchema");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isAutocomplete()) {
            const { name, value } = interaction.options.getFocused(true);

            if (name === "nombre") {
                const ayudas = await Ayuda.find({ nombre: new RegExp(value, 'i') }).limit(25);
                const opciones = ayudas.map(ayuda => ({
                    name: ayuda.nombre,
                    value: ayuda.nombre
                }));

                await interaction.respond(opciones);
            }
        }
    },
};
