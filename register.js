const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

module.exports = (client) => {
  const commands = client.applications
  //===============> Atualizações dos comandos de barra <===============//

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  (async () => {
    try {
      console.log(c.yellow('Atualizando os comandos de barra (/).'));

      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID), { body: commands },
      );

      console.log(c.green('Atualizado com sucesso todos os comandos de barra (/)!'));
    } catch (error) {
      console.error(error);
    }
  })();
}