// Registrando os comandos de barra:

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { readdirSync } = require('fs');
const { yellow, green } = require('colors'); // npm i colors --save

//===============> Pegando todos os comandos das pastas <===============//

const commands = [];
const commandsFolders = readdirSync('./Comandos');

for (const folder of commandsFolders) {
  const commandsFiles = readdirSync(`./Comandos/${folder}`).filter(file => file.endsWith(".js"));

  for (const file of commandsFiles) {
    const command = require(`./Comandos/${folder}/${file}`);
    if (command.register) {
      commands.push(command);
    }
  }
}

//===============> Atualizações dos comandos de barra <===============//

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log(yellow('Atualizando os comandos de aplicação (/).'));

    // Registrando localmente:
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands },
    );

    // Registrando globalmente:
    /*await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID), { body: commands },
    );*/

    console.log(green('Atualizado com sucesso todos os comandos de aplicação (/)!'));
  } catch (error) {
    console.error(error);
  }
})();

// npm run register