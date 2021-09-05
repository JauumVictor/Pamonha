
module.exports = {
    name: 'interactionCreate',
    execute: async (interaction, client) => {

        if (interaction.isCommand()) {
            const command = client.applications.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Ocorreu um erro ao executar esta aplicação, tente novamente mais tarde.', ephemeral: true });
            }
        }
    }
}