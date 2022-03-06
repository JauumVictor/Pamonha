// eslint-disable-next-line no-unused-vars
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: {
    name: 'update',
    description: '[🤖 Developer] Atualiza o cliente.',
    category: '🤖 Developer',
    cooldown: 0,
    usage: [''],
    type: 1,
    options: [
      {
        name: 'client',
        type: 3,
        description: 'Escolha uma opção:',
        required: false,
        choices: [
          {
            name: 'username',
            value: 'username'
          },
          {
            name: 'avatar',
            value: 'avatar'
          }
        ]
      },
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

    let client = interaction.options.getString('client');
    let avatar = interaction.client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });
    let username = interaction.client.user.username;

    if (client == 'username') {
      await interaction.reply('Insira o novo nome:');

      let filter = (i) => i.author.id === interaction.user.id;
      let collector = interaction.channel.createMessageCollector({ filter: filter, time: 60000 * 5, max: 1, errors: ['time'] });

      collector.on('collect', (i) => {
        let collected = i.content;

        interaction.client.user.setUsername(collected)
          .then(() => interaction.followUp(`O nome do cliente foi atualizado com sucesso para: \`${username}\`.`))
          .catch((e) => {
            console.error(e);
            return interaction.followUp('Ocorreu um erro, tente novamente mais tarde');
          });
      });

      collector.on('end', (c, r) => {
        if (r == 'time') {
          interaction.followUp('Acabou o tempo.');
        }
      });

    } else if (client == 'avatar') {
      await interaction.reply('Insira um link ou anexo:');

      let filter = (i) => i.author.id === interaction.user.id;
      let collector = interaction.channel.createMessageCollector({ filter: filter, time: 60000 * 5, max: 1, errors: ['time'] });

      collector.on('collect', async (i) => {
        let regex = /(https?:\/\/)/g;

        if (i.content == 'cancelar') {
          return interaction.followUp('Cancelado!');
        }
        
        if (regex.test(i.content)) {
          interaction.client.user.setAvatar(i.content)
            .then(() => interaction.followUp(`O novo avatar foi definido com sucesso.`))
            .catch((e) => {
              console.error(e);
              return interaction.followUp('Ocorreu um erro, tente novamente.');
            });
        } else if (i.attachments.size > 0) {
          let url = await i.attachments.first().url;

          interaction.client.user.setAvatar(url)
            .then(() => interaction.followUp(`O novo avatar foi definido com sucesso.`))
            .catch((e) => {
              console.error(e);
              return interaction.followUp('Ocorreu um erro, tente novamente.');
            });
        } else {
          return interaction.followUp(`Você deve inserir um link ou uma imagem para que eu possa defini-la como avatar.`)
        }
      });

      collector.on('end', (c, r) => {
        if (r == 'time') {
          interaction.followUp('Acabou o tempo.');
        }
      });

    } else {
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