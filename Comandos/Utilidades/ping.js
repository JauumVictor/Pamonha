// eslint-disable-next-line no-unused-vars
const { Client, Message, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: '[⚙️ Utilidades] Exibe o ping de resposta entre usuário e cliente e do host do BOT.',
  category: '⚙️ Utilidades',
  aliases: ['pong'],
  usage: [],
  register: true,
  /**
   * @param {Client} client
   * @param {Message} message
   */
  commandExecute: async (client, message) => {
    let msg = await message.channel.send('**🔍 | Processando...**');

    const created = Math.round(Date.now() - message.createdTimestamp);
    const host = Math.round(client.ws.ping);

    const embed = new EmbedBuilder()
      .setTitle('Pong! 🏓')
      .setDescription(`💓 **Ping de resposta:** \`${created}\`ms \n` + `🛰️ **Ping da host**: \`${host}\`ms.`)
      .setFooter({ text: client.user.username })
      .setTimestamp();

    switch (true) {
      case (created => 500):
        embed.setColor('RED');
        break;
      case (created <= 299):
        embed.setColor('GREEN');
        break;
      default:
        embed.setColor('YELLOW');
        break;
    }

    message.reply({ embeds: [embed] });
    msg.delete();
  },

  /**
   * @param {CommandInteraction} interaction
   */
  interactionExecute: (interaction) => {

    const created = Math.round(Date.now() - interaction.createdTimestamp);
    const host = Math.round(interaction.client.ws.ping);

    const embed = new EmbedBuilder()
      .setTitle('Pong! 🏓')
      .setDescription(`💓 **Ping de resposta:** \`${created}\`ms \n` + `🛰️ **Ping da host**: \`${host}\`ms.`)
      .setFooter({ text: interaction.client.user.username })
      .setTimestamp();

    switch (true) {
      case (created => 500):
        embed.setColor('RED');
        break;
      case (created <= 299):
        embed.setColor('GREEN');
        break;
      default:
        embed.setColor('YELLOW');
        break;
    }

    interaction.reply({ embeds: [embed] });
  },
};