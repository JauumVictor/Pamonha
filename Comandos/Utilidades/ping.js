// eslint-disable-next-line no-unused-vars
const { Client, Message, Util, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: '[⚙️ Utilidades] Exibe o ping de resposta entre usuário e cliente e do host do BOT.',
  category: '⚙️ Utilidades',
  aliases: ['pong'],
  usage: [],
  /**
   * @param {Client} client
   * @param {Message} message
   */
  commandExecute: async (message) => {
    let msg = await message.channel.send('**🔍 | Processando...**');

    const created = Math.round(Date.now() - message.createdTimestamp);
    const host = Math.round(message.client.ws.ping);

    const embed = new EmbedBuilder()
      .setTitle('Pong! 🏓')
      .setDescription(`💓 **Ping de resposta:** \`${created}\`ms \n` + `🛰️ **Ping da host**: \`${host}\`ms.`)
      .setFooter({ text: message.client.user.username })
      .setTimestamp();

    switch (true) {
      case (created => 500):
        embed.setColor(Util.resolveColor('Red'));
        break;
      case (created <= 299):
        embed.setColor(Util.resolveColor('Green'));
        break;
      default:
        embed.setColor(Util.resolveColor('Yellow'));
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
        embed.setColor(Util.resolveColor('Red'));
        break;
      case (created <= 299):
        embed.setColor(Util.resolveColor('Green'));
        break;
      default:
        embed.setColor(Util.resolveColor('Yellow'));
        break;
    }

    interaction.reply({ embeds: [embed] });
  },
};