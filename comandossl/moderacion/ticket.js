const { Permissions, EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "ticket",
    description: "Envia el iniciador de tickets!",

    async execute(client, interaction) {
        if (!interaction.member.permissions.has("MuteMembers")) {
            const permiso = new EmbedBuilder()
                .setColor("#ff0000")
                .setDescription("**No tienes permisos para hacer esto**");
            return interaction.reply({ embeds: [permiso], ephemeral: true });
        }

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('ticketType')
            .setPlaceholder('Selecciona el tipo de ticket')
            .addOptions([
                {
                    label: 'Soporte Tunel',
                    description: 'Obten ayuda sobre los Tuneles',
                    value: 'soporte_tecnico',
                },
                {
                    label: 'Crasheos',
                    description: 'Obten ayuda sobre los Crasheos',
                    value: 'quejas',
                },
                {
                    label: 'Consultas Generales',
                    description: 'Cualquier otro tipo de consulta',
                    value: 'consultas_generales',
                }
            ]);

        const archivoButton = new ButtonBuilder()
            .setCustomId('archivoButton')
            .setLabel('Archivo necesario para crear un servidor!')
            .setStyle(ButtonStyle.Primary);

        const row1 = new ActionRowBuilder().addComponents(selectMenu);
        const row2 = new ActionRowBuilder().addComponents(archivoButton);

        const contentMessage = `
        # Si estás en este canal es porque necesitas ayuda con algún problema o duda que te ha surgido...
        
        > 1. Verifica si tu problema ya fue solucionado en uno de los hilos del foro https://discord.com/channels/1254334294286008340/1282568478670192640
        
        > 2. Pregunta en el canal de https://discord.com/channels/1254334294286008340/1289637096864088148 para ver si tu problema ya fue resuelto por alguien más (¿seguro de que revisaste https://discord.com/channels/1254334294286008340/1282568478670192640 ?)
        
        > 3. Si tu problema consiste en suspensiones de GitHub (que te baneen la cuenta o se te acaben las horas) no podemos hacer nada, más que recomendarte que hagas una cuenta nueva. En https://discord.com/channels/1254334294286008340/1282568478670192640 hay una guía específica sobre las horas del codespace.
        
        > 4. Si tu problema consiste en que el servidor no inicia correctamente y tienes (o sospechas de) errores o incompatibilidades con mods (servidores forge, fabric mohist etc.) no te podremos ayudar. Puedes pedirle ayuda a otros usuarios en https://discord.com/channels/1254334294286008340/1289637096864088148.
        
        > 5. Si nada de lo anterior sirvió, abre un ticket.
        
        > 6. Si necesitas el archivo usado en los videos para crear un servidor, apreta el boton de abajo.
        `;

        await interaction.reply({ content: contentMessage, components: [row1, row2] });
    },
};

// En el manejador de eventos principal (event handler)

