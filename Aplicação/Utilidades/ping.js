// eslint-disable-next-line no-unused-vars
const { CommandInteraction } = require('discord.js');
const ClientEmbed = require('../../Structures/ClientEmbed');

module.exports = {
    data: {
        name: 'ping',
        description: '[⚙️ Utilidades] Vê o ping de resposta entre usuário e cliente e do host do BOT.',
    },
    /**
     * @param {CommandInteraction} interaction
     */
    execute: async (interaction) => {

        const created = Date.now() - interaction.createdTimestamp;
        const host = Math.round(interaction.client.ws.ping);

        const embed = new ClientEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle("Pong! 🏓")
            .setDescription(`💓 **Ping de resposta:** \`${created}\`ms \n` + `🛰️ **Ping da host**: \`${host}\`ms.`)
            .setFooter({ text: interaction.client.user.username })
            .setTimestamp();

        interaction.followUp({ embeds: [embed] });
    },
};