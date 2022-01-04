const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns pong!"),
  async execute(interaction) {
    await interaction.reply("Pong 🏓!");
  },
};
