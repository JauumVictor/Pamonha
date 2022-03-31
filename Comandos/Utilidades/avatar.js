// eslint-disable-next-line no-unused-vars
const { Client, Message, CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: '[⚙️ Utilidades] Avatar do usuário mencionado ou do seu próprio avatar.',
  category: '⚙️ Utilidades',
  aliases: ['av', 'icon'],
  usage: [],
  register: true,
  options: [
    {
      name: 'user',
      type: 6,
      description: 'Selecione um usuário:'
    },
  ],
  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args 
   */
  commandExecute: async (client, message, args) => {

    let msg = await message.channel.send('**🔍 | Processando...**');
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

    const embed = new EmbedBuilder()
      .setColor(process.env.EMBED_COLOR)
      .setTitle('📷 Avatar de Perfil')
      .addFields({ name: `Avatar de:`, value: `\`${user.username}\``, inline: true })
      .setImage(avatar)
      .setFooter({ text: client.user.username })
      .setTimestamp();

    let row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setEmoji({ name: '🔗' })
        .setLabel('Baixar')
        .setURL(`${avatar}`)
        .setStyle(ButtonStyle.Link)
      );

    message.reply({ embeds: [embed], components: [row] });
    msg.delete()
  },

  /**
   * @param {CommandInteraction} interaction 
   */
  interactionExecute: (interaction) => {
    let user = interaction.options.getUser('user') || interaction.user;
    let avatar = user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

    const embed = new EmbedBuilder()
      .setColor(process.env.EMBED_COLOR)
      .setTitle('📷 Avatar de Perfil')
      .addFields({ name: `Avatar de:`, value: `\`${user.username}\``, inline: true })
      .setImage(avatar)
      .setFooter({ text: interaction.client.user.username })
      .setTimestamp();

    let row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setEmoji({ name: '🔗' })
        .setLabel('Baixar')
        .setURL(`${avatar}`)
        .setStyle(ButtonStyle.Link)
      );

    interaction.reply({ embeds: [embed], components: [row] });
  },
};