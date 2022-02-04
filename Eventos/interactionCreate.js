module.exports = {
    name: 'interactionCreate',
    execute: async (interaction, client) => {
        if (interaction.isCommand()) {
            await interaction.deferReply({ ephemeral: false }).catch(() => { });

            const command = client.applications.get(interaction.commandName);

            if (!command) {
                return;
            } else {
                try {
                    command && command.execute(interaction);
                } catch (err) {
                    console.error(err);
                    await interaction.followUp({ content: 'Ocorreu um erro ao executar esta aplicação, tente novamente mais tarde.', ephemeral: true });
                }
            }
        }
    }
}