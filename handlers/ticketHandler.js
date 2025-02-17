const { ButtonBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

async function handlerTI(interaction) {
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'ticketType') {
            const selectedValue = interaction.values[0];
            let modal, nick, problema, faqConfirm;

            switch (selectedValue) {
                case 'soporte_tecnico':
                    modal = new ModalBuilder()
                        .setCustomId("soporte_tecnico_modal")
                        .setTitle("Ticket de ayuda | TUNEL");

                    nick = new TextInputBuilder()
                        .setCustomId("nick")
                        .setLabel("Cual tunel usas?")
                        .setPlaceholder("Ingresa el nombre del Tunel")
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(6)
                        .setMaxLength(20);

                    problema = new TextInputBuilder()
                        .setCustomId("problema")
                        .setLabel("Describe el problema ")
                        .setPlaceholder("Da una breve descripción del problema ")
                        .setStyle(TextInputStyle.Paragraph)
                        .setMaxLength(1000);
                    
                    faqConfirm = new TextInputBuilder()
                        .setCustomId("faqConfirm")
                        .setLabel("¿Ya leiste FAQ?")
                        .setPlaceholder("Escribe SI o NO")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                        .setMaxLength(2);

                    break;

                case 'quejas':
                    modal = new ModalBuilder()
                        .setCustomId("quejas_modal")
                        .setTitle("Ticket de Crasheo");

                    nick = new TextInputBuilder()
                        .setCustomId("nick")
                        .setLabel("Que JAR usas?")
                        .setPlaceholder("FORGE/SPIGOT/FABRIC")
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(4)
                        .setMaxLength(20);

                    problema = new TextInputBuilder()
                        .setCustomId("problema")
                        .setLabel("Describe tu problema")
                        .setPlaceholder("Da una breve descripción de tu problema")
                        .setStyle(TextInputStyle.Paragraph)
                        .setMaxLength(1000);
                    
                    faqConfirm = new TextInputBuilder()
                        .setCustomId("faqConfirm")
                        .setLabel("¿Ya leiste FAQ?")
                        .setPlaceholder("Escribe SI o NO")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                        .setMaxLength(2);

                    break;

                case 'consultas_generales':
                    modal = new ModalBuilder()
                        .setCustomId("consultas_generales_modal")
                        .setTitle("Ticket de Consultas Generales");

                    nick = new TextInputBuilder()
                        .setCustomId("nick")
                        .setLabel("Consulta")
                        .setPlaceholder("Que relacion de consulta tienes")
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(4)
                        .setMaxLength(20);

                    problema = new TextInputBuilder()
                        .setCustomId("problema")
                        .setLabel("Describe tu consulta")
                        .setPlaceholder("Da una breve descripción de tu consulta")
                        .setStyle(TextInputStyle.Paragraph)
                        .setMaxLength(1000);

                    faqConfirm = new TextInputBuilder()
                        .setCustomId("faqConfirm")
                        .setLabel("¿Ya leiste FAQ?")
                        .setPlaceholder("Escribe SI o NO")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                        .setMaxLength(2);

                    break;

                default:
                    return;
            }

            const l1 = new ActionRowBuilder().addComponents(nick);
            const l2 = new ActionRowBuilder().addComponents(problema);
            const l3 = new ActionRowBuilder().addComponents(faqConfirm);

            modal.addComponents(l1, l2, l3);

            try {
                await interaction.showModal(modal);
            } catch (error) {
                console.error("Error al mostrar el modal de tickets: ", error);
                await interaction.reply({ content: `Hubo un error al abrir el modal de tickets.`, ephemeral: true });
            }
        }
    } else if (interaction.isModalSubmit()) {
        if (interaction.customId.includes("_modal")) {
            const nick = interaction.fields.getTextInputValue("nick");
            const problema = interaction.fields.getTextInputValue("problema");
            const faqConfirm = interaction.fields.getTextInputValue("faqConfirm").toUpperCase();

            if (faqConfirm !== "SI") {
                await interaction.reply({ content: `Por favor, asegúrate de leer el canal FAQ antes de abrir un ticket. <#1282568478670192640>`, ephemeral: true });
                return;
            }

            console.log("Nick:", nick);
            console.log("Problema:", problema);

            const staffRoleId = "1254525595430289548";
            const category = "1254604536568348724";

            async function createTicket(interaction, category, nick, problema) {
                try {
                    const channel = await interaction.guild.channels.create({
                        name: `𝓣icket-${interaction.user.username}`,
                        type: 0, 
                        parent: category,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: staffRoleId,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                        ]
                    });

                    let embedTicketCreado;
                    switch (interaction.customId) {
                        case 'soporte_tecnico_modal':
                            embedTicketCreado = {
                                color: 0x0099ff,
                                title: 'Soporte para Tunel - Espera mientras un staff revisa tu Ticket!',
                                author: {
                                    name: 'MSX | 2024',
                                    icon_url: 'https://i.imgur.com/trOadhA.png',
                                },
                                fields: [
                                    {
                                        name: 'Tunel',
                                        value: `\`\`\`${nick}\`\`\``,
                                    },
                                    {
                                        name: 'Problema',
                                        value: `\`\`\`${problema}\`\`\``,
                                    },
                                    {
                                        name: 'FAQ Confirmación',
                                        value: `\`\`\`${faqConfirm}\`\`\``,
                                    },
                                ]
                            };
                            break;

                        case 'quejas_modal':
                            embedTicketCreado = {
                                color: 0xff0000,
                                title: 'Crash - Espera mientras un staff revisa tu Ticket!',
                                author: {
                                    name: 'MSX | 2024',
                                    icon_url: 'https://i.imgur.com/trOadhA.png',
                                },
                                fields: [
                                    {
                                        name: 'JAR',
                                        value: `\`\`\`${nick}\`\`\``,
                                    },
                                    {
                                        name: 'Problema',
                                        value: `\`\`\`${problema}\`\`\``,
                                    },
                                    {
                                        name: 'FAQ Confirmación',
                                        value: `\`\`\`${faqConfirm}\`\`\``,
                                    },
                                    {
                                        name: "ATENCION!",
                                        value: 'Ten en cuenta que este ticket no presenta prioridad de atencion, es decir, se atendera cuando algun staff este libre y quiera responderlo. Mejor pide ayuda en General.'
                                    }
                                ]
                            };
                            break;

                        case 'consultas_generales_modal':
                            embedTicketCreado = {
                                color: 0x00ff00,
                                title: 'Consultas Generales - Espera mientras un staff revisa tu Ticket!',
                                author: {
                                    name: 'MSX | 2024',
                                    icon_url: 'https://i.imgur.com/trOadhA.png',
                                },
                                fields: [
                                    {
                                        name: 'Tema',
                                        value: `\`\`\`${nick}\`\`\``,
                                    },
                                    {
                                        name: 'Consulta',
                                        value: `\`\`\`${problema}\`\`\``,
                                    },
                                    {
                                        name: 'FAQ Confirmación',
                                        value: `\`\`\`${faqConfirm}\`\`\``,
                                    },
                                ]
                            };
                            break;

                        default:
                            embedTicketCreado = {
                                color: 0x0099ff,
                                title: 'Ticket - Espera mientras un staff revisa tu Ticket!',
                                author: {
                                    name: 'MSX | 2024',
                                    icon_url: 'https://i.imgur.com/trOadhA.png',
                                },
                                fields: [
                                    {
                                        name: 'Nick',
                                        value: `\`\`\`${nick}\`\`\``,
                                    },
                                    {
                                        name: 'Descripción',
                                        value: `\`\`\`${problema}\`\`\``,
                                    },
                                ]
                            };
                            break;
                    }

                    const cerrar = new ButtonBuilder()
                        .setCustomId('cerrarTicket')
                        .setLabel('Cerrar Ticket')
                        .setStyle(4);

                    const row = new ActionRowBuilder()
                        .addComponents(cerrar);

                    await channel.send({ embeds: [embedTicketCreado], components: [row], content: `<@${interaction.user.id}>` });
                    await interaction.reply({ content: `Tu Ticket ha sido generado!`, ephemeral: true });
                } catch (error) {
                    console.error("Error al crear el ticket: ", error);
                    await interaction.reply({ content: `Hubo un error al crear el ticket.`, ephemeral: true });
                }
            }

            await createTicket(interaction, category, nick, problema);
        }
    } else if (interaction.isButton()) {
        if (interaction.customId === "cerrarTicket") {
            try {
                await interaction.deferUpdate();
        
                const everyoneRole = interaction.guild.roles.everyone;
                await interaction.channel.permissionOverwrites.edit(everyoneRole, { SendMessages: false });
        
                const embedCerrado = new EmbedBuilder()
                    .setColor("#791B08")
                    .setTitle('Ticket Cerrado')
                    .setDescription(`Ticket cerrado por: ${interaction.user}`);
        
                await interaction.channel.send({ embeds: [embedCerrado] });
        
                const embedGracias = new EmbedBuilder()
                    .setColor("#085D77")
                    .setTitle('Gracias por usar este servicio!')
                    .setDescription('Asegúrate de siempre leer FAQ primero!');
        
                const botonBorrar = new ButtonBuilder()
                    .setCustomId('borrarCanal')
                    .setLabel('🗑️ Borrar Canal')
                    .setStyle(4); 
        
                const botonReabrir = new ButtonBuilder()
                    .setCustomId('reabrirTicket')
                    .setLabel('🔓 Reaperturar Ticket')
                    .setStyle(3);
        
                const l1 = new ActionRowBuilder()
                    .addComponents(botonBorrar, botonReabrir);
        
                const message = await interaction.channel.send({ embeds: [embedGracias], components: [l1] });
        
                const filter = i => (i.customId === 'borrarCanal' || i.customId === 'reabrirTicket') && i.member.roles.cache.has('1254525595430289548');

                const collector = message.createMessageComponentCollector({ filter, time: 60000 });
        
                collector.on('collect', async i => {
                    if (i.customId === 'borrarCanal') {
                        collector.stop('borrado');
                    } else if (i.customId === 'reabrirTicket') {
                        if (!i.member.permissions.has('MuteMembers')) {
                            await i.reply({ content: 'No tienes permiso para reaperturar el ticket.', ephemeral: true });
                            return;
                        }
                        collector.stop('reabierto');
                    }
                });
        
                collector.on('end', async (collected, reason) => {
                    if (message.deletable) await message.delete();
        
                    if (reason === 'borrado') {
                        const messages = await interaction.channel.messages.fetch({ limit: 100 });
                        const logMessages = messages.map(m => `${m.author.tag}: ${m.content}`).reverse().join('\n');
        
                        let ticketInfo = `Ticket Cerrado: ${interaction.channel.name}\n`;
                        const embedMessage = messages.find(msg => msg.embeds.length > 0);
                        if (embedMessage) {
                            const embed = embedMessage.embeds[0];
                            ticketInfo += `\n--- Información del Ticket ---\n`;
                            embed.fields.forEach(field => {
                                ticketInfo += `${field.name}: ${field.value}\n`;
                            });
                            ticketInfo += `\n--- Historial de Mensajes ---\n`;
                        }
                        const logFileName = `ticket-${interaction.channel.name}.txt`;
                        const logFilePath = path.join(__dirname, logFileName);
                        fs.writeFileSync(logFilePath, `${ticketInfo}\n${logMessages}`);
        
                        const logChannelId = '1290495277001605120';
                        const logChannel = await interaction.guild.channels.fetch(logChannelId);
                        const attachment = new AttachmentBuilder(logFilePath);
                        await logChannel.send({ content: `Historial del ticket ${interaction.channel.name}`, files: [attachment] });
                        await interaction.channel.delete();
                        fs.unlinkSync(logFilePath);
                    } else if (reason === 'reabierto') {

                        await interaction.channel.permissionOverwrites.edit(everyoneRole, { SendMessages: true });
        

                        const embedReaperturado = new EmbedBuilder()
                            .setColor("#64CD1E")
                            .setTitle('Ticket Reaperturado')
                            .setDescription('El ticket ha sido reaperturado.');
        
                        await interaction.channel.send({ embeds: [embedReaperturado] });
                    }
                });
            } catch (error) {
                console.error("Error al cerrar el ticket: ", error);
                await interaction.reply({ content: `Hubo un error al cerrar el ticket.`, ephemeral: true });
            }
        }
        
        
        
        
    }
}

module.exports = { handlerTI };
