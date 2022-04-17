const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

module.exports = {
    name: 'messageCreate',
    execute: (message) => {
      try {
        if (message.author.bot || !message.guild) return;

        let prefix = process.env.PREFIX;

        if (message.content.match(GetMention(message.client.user.id))) {
          return message.reply(`Olá ${message.author}, o meu prefixo é: **\`${prefix}\`**.`);
        }

        if (message.content.startsWith(prefix)) {
          const [commandName, ...args] = message.content.slice(prefix.length).trim().split(/ +/);
          const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

          if (command) {
            if (message.channel.type == 'DM') {
              return message.reply('Ei, comandos não podem ser executados na minha DM, utilize o canal de comandos do servidor.');
            }

            try {
              command && command.commandExecute(message, args, prefix);
            } catch (err) {
              console.error(err);
              return message.reply('Ouve um erro ao executar o comando! Tente novamente mais tarde.');
            }
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
}
