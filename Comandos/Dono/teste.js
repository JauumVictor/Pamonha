const { Client, Message } = require('discord.js');

module.exports = {
  name: 'teste',
  description: '[👑 Owner] Comando exclusivo do desenvolvedor.',
  aliases: ['t'],
  register: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */
  commandExecute: (client, message, args) => {

    if (message.author.id !== process.env.OWNER_ID) {
      return;
    }

    // Código aqui:

    message.channel.send('Testando');

  },

  interactionExecute: (interaction) => {
    
    if (interaction.user.id !== process.env.OWNER_ID) {
      return
    }
    
    // Código aqui:
    
    console.log(interaction.message)
    interaction.deferUpdate();
  }
}