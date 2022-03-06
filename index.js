// Para usar o Discord.js, você precisará instalar o Node.js. Mais informações no site: https://nodejs.org/en/.
// Discord.js v13 ou superior requer Node.js v16.6.0 ou superior. Você pode conferir a versão do seu node digitando: 'node -v' no terminal.
// Ative as intents do seu BOT no site: https://discord.com/developers/applications/.
// Calcule as intents necessárias para seu BOT no site: https://ziad87.net/intents/.

const { Client, Collection, MessageEmbed } = require('discord.js'); // npm i discord.js --save
const client = new Client({ intents: 32767 }); // Insira o valor das intents necessárias.
const fs = require('fs'); // npm i fs --save
const dotenv = require('dotenv'); // npm i dotenv --save
dotenv.config(); // Configurando o arquivo .env
const { REST } = require('@discordjs/rest'); // npm i @discordjs/rest --save
const { Routes } = require('discord-api-types/v9');
const c = require('colors'); // npm i colors --save

//===============> Exportações <===============//

module.exports = client;
client.commands = new Collection();
client.applications = new Collection();

//===============> Handlers <===============//

// Uma pasta dedicada para comandos:
const commandFolders = fs.readdirSync('./Comandos');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./Comandos/${folder}`).filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./Comandos/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}
// Uma pasta dedicada para eventos:
const eventFiles = fs.readdirSync('./Eventos').filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./Eventos/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}
// Uma pasta dedicada para comandos de barra:
const application = [];
const applicationFolders = fs.readdirSync('./Aplicação');
for (const folder of applicationFolders) {
  const applicationFiles = fs.readdirSync(`./Aplicação/${folder}`).filter(file => file.endsWith(".js"));

  for (const file of applicationFiles) {
    const command = require(`./Aplicação/${folder}/${file}`);
    client.applications.set(command.data.name, command);
    application.push(command.data);
  }
}

//===============> Atualizações dos comandos de barra <===============//

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log(c.yellow('Atualizando os comandos de barra (/).'));

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID), { body: application },
    );

    console.log(c.green('Atualizado com sucesso todos os comandos de barra (/)!'));
  } catch (error) {
    console.error(error);
  }
})();

//Evento anti-spam:
const usersMap = new Map();
const LIMIT = 5;
const TIME = 60000;
const DIFF = 3000;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    //console.log(Diferença.);

    if (difference > DIFF) {
      clearTimeout(timer);
      //console.log('Tempo limite apagado.');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        //console.log('Removido do mapa.')
      }, TIME);
      usersMap.set(message.author.id, userData);
    } else {
      ++msgCount;
      if (parseInt(msgCount) > LIMIT) {
        let muterole = message.guild.roles.cache.find((r) => r.name === 'Silenciado(a)');

        if (!muterole) {
          try {
            muterole = await message.guild.roles.create({ name: "Silenciado(a)", color: "BLACK" })

            message.guild.channels.cache.forEach(async (channel) => {
              await channel.permissionOverwrites.create(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SPEAK: false,
                STREAM: false,
              });
            });
          } catch (e) {
            console.log(e);
          }
        }

        const mutado = new MessageEmbed()
          .setColor(process.env.EMBED_COLOR)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))
          .setTitle(`Você foi mutado temporariamente! 😔`)
          .setDescription(`Olá, \`${message.author.username}\`, você foi mutado temporariamente no servidor: \`${message.guild.name}\`, por enviar uma grande quantidade de mensagens por segundo. \n**Floodar** ou **raidar** um servidor é estritamente proibido, leia as regras para evitar um banimento permanente.`)
          .setFooter({ text: `2021 © ${message.guild.name}` })
          .setTimestamp();

        const log = new MessageEmbed()
          .setColor(process.env.EMBED_COLOR)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }))
          .setTitle(`Mute automático!`)
          .setDescription(`O usuário \`${message.author.tag}\` \`(${message.member.id})\` estava enviando uma alta quantidade de mensagens por segundo, ele/ela foi mutado(a) temporariamente por \`60 segundos\`.`)
          .setFooter({ text: `2021 © ${message.guild.name}` })
          .setTimestamp();

        message.member.roles.add(muterole);
        let logchannel = message.guild.channels.cache.get('934567809961320538');

        if (!logchannel) {
          message.reply(`Você está enviando uma alta quantidade de mensagens por segundo, você foi mutado(a) temporariamente por \`60 segundos\`.`);
        } else {
          client.channels.cache.get(logchannel.id).send({ embeds: [log] });
          message.reply(`Você está enviando uma alta quantidade de mensagens por segundo, você foi mutado(a) temporariamente por \`60 segundos\`.`);
        }

        message.member.send({ embeds: [mutado] }).catch(() => {});

        setTimeout(() => {
          if (!message.member) return;
          message.member.roles.remove(muterole);
          message.reply(`Você foi desmutado(a). \n**Floodar** (spammar) ou **raidar** um servidor é estritamente proibido, leia as regras para evitar um banimento permanente.`);
        }, TIME);
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  } else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      //console.log('Removido do mapa.')
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
});

//===============> Finalizações <===============//

client.login(process.env.TOKEN);