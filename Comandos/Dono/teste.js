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

    message.reply('Testando');

  },

  interactionExecute: (interaction) => {
    
    if (interaction.user.id !== process.env.OWNER_ID) {
      return
    }
    
    // Código aqui:
    
    interaction.reply('Testando');
  }
}
