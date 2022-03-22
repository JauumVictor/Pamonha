// eslint-disable-next-line no-unused-vars
const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: 'avatar',
  description: '[⚙️ Utilidades] Avatar do usuário mencionado ou do seu próprio avatar.',
  category: '⚙️ Utilidades',
  aliases: ['av', 'icon'],
  usage: [],
  options: [
    {
      name: 'membro',
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
    let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
    let avatar = member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

    const embed = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTitle('📷 Avatar de Perfil')
      .addField(`Avatar de:`, `\`${member.user.username}\``, true)
      .setImage(avatar)
      .setFooter({ text: client.user.username })
      .setTimestamp();

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setEmoji('🔗')
        .setLabel('Baixar')
        .setURL(`${avatar}`)
        .setStyle('LINK')
      );

    message.reply({ embeds: [embed], components: [row] });
    msg.delete()
  },
  
  /**
   * @param {CommandInteraction} interaction 
   */
  interactionExecute: async (interaction) => {
    let member = interaction.options.getMember('membro') || interaction.member;
    let avatar = member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

    const embed = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTitle('📷 Avatar de Perfil')
      .addField(`Avatar de:`, `\`${member.user.username}\``, true)
      .setImage(avatar)
      .setFooter({ text: interaction.client.user.username })
      .setTimestamp();

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setEmoji('🔗')
        .setLabel('Baixar')
        .setURL(`${avatar}`)
        .setStyle('LINK')
      );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};