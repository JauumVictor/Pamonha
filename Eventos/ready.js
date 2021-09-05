const c = require("colors");

module.exports = {
    name: 'ready',
    once: true,
    execute: (client) => {

        let activities = [
            `O meu nome é ${client.user.username}!`,
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

        console.log(c.green('[Status] Status do BOT sendo transmitido!'));
        console.log(c.green('[Inicialização] - O BOT foi inicializado com sucesso.'))
    }
}