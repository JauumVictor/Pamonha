const { version } = require('discord.js'); // npm i discord.js --save
const c = require("colors"); // npm i colors --save
const express = require('express'); // npm i express --save

module.exports = {
    name: 'ready',
    once: true,
    execute: (client) => {

        //===============> Importações <===============//

        const app = express();

        //===============> Atividades <===============//

        let activities = [
            `O meu nome é ${client.user.username}!`,
            `Fui feito em JavaScript`
        ],
            i = 0;
        setInterval(
            () =>
                client.user.setActivity(`${activities[i++ % activities.length]}`, {
                    type: 'PLAYING'
                }),
            500 * 30
        );
        client.user.setStatus('online');

        //===============> Finalizações <===============//

        app.get('/', (req, res) => {
            res.send(`<h>${client.user.username}</h><br><br>NodeJS: ${process.version}<br>Discord.JS: ${version}`);
        });

        app.listen(process.env.PORT, () => {
            console.log(c.green(`[Web] Framework online rodando na porta: ${process.env.PORT}`))
        })

        console.log(c.green('[Status] Status do BOT sendo transmitido!'));
        console.log(c.green('[Inicialização] - O BOT foi inicializado com sucesso.'))
    }
}
