// eslint-disable-next-line no-unused-vars
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: {
    name: 'update',
    description: '[🤖 Developer] Updates the client user.',
    category: '🤖 Developer',
    cooldown: 0,
    usage: ['username: <new username> | avatar: <attachment>'],
    type: 1,
    options: [
      {
        name: 'username',
        type: 3,
        description: 'Insira o novo nome:',
        required: false
      },
      {
        name: 'attachment',
        type: 3,
        description: 'Insira um link ou anexo:',
        required: false,
      }
    ]
  },
  /**
   * @param {CommandInteraction} interaction 
   */
  execute: async (interaction) => {

    if (interaction.user.id !== process.env.OWNER_ID) {
      return;
    }

    //Código aqui:

    let input = interaction.options.getString('username');
    let attachment = interaction.options.getString('attachment');

    if (input) {
      interaction.client.user.setUsername(input).catch((e) => {
        console.error(e);
        return interaction.reply('Ocorreu um erro, tente novamente mais tarde');
      });
    } else if (attachment) {
      interaction.reply('Insira um link ou anexo:');
      
      let filter = (i) = i.user.id === interaction.user.id;
      let collector = interaction.channel.createMessageCollector({ filter: filter, time: 60000 * 5, max: 1, errors: ['time'] });
      
      collector.on('collect', async (i) => {
        let collected = i.content;
        
        console.log(collected)
      });
    } else {
      let avatar = interaction.client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });
      let username = interaction.client.user.username;

      let embed = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setThumbnail(avatar)
        .setDescription(`O meu nome atual é: ${username}`)
        .setFooter({ text: username, iconURL: avatar })
        .setTimestamp();

      let row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setEmoji('🔗')
          .setLabel('Avatar')
          .setURL(avatar)
          .setStyle('LINK')
        );
        
      await interaction.reply({ embeds: [embed], components: [row] });
    }
  }
}