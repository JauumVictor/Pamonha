const { Client, Message } = require('discord.js');

module.exports = {
  name: 'teste',
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

  }
}