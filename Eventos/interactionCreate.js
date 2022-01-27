module.exports = {
    name: 'interactionCreate',
    execute: async (interaction, client) => {
        if (interaction.isCommand()) {
            await interaction.deferReply({ ephemeral: false }).catch(() => { });

            const command = client.applications.get(interaction.commandName);

            if (!command) {
                await interaction.followUp({ content: 'Ocorreu um erro ao executar esta aplicação, tente novamente mais tarde.', ephemeral: true });
            } else {
                interaction.member = interaction.guild.members.cache.get(interaction.user.id);

                try {
                    command.execute(interaction);
                } catch (err) {
                    console.error(err);
                    await interaction.followUp({ content: 'Ocorreu um erro ao executar esta aplicação, tente novamente mais tarde.', ephemeral: true });
                }
            }
        }
    }
}