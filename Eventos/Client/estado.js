const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,

	async execute(client) {
		// Función para obtener la cantidad total de usuarios
		const getTotalUsers = () => {
			return client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
		};

		let estado = [
			{
				name: "Tickets",
				type: ActivityType.Watching,
				status: "online"
			},
			{
				name: "MSX",
				type: ActivityType.Playing,
				status: "online"
			},
			{
				name: () => `${getTotalUsers()} usuarios 🪪`,
				type: ActivityType.Watching,
				status: "online"
			}
		];

		setInterval(() => {
			const option = Math.floor(Math.random() * estado.length);

			client.user.setPresence({
				activities: [
					{
						name: typeof estado[option].name === "function" ? estado[option].name() : estado[option].name,
						type: estado[option].type
					}
				],
				status: estado[option].status
			});
		}, 5000); // Cambia el estado cada 5 segundos
	}
};
