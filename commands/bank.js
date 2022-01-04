const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const { currency } = require("../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bank")
    .setDescription("Accesses the bank of the user"),
  async execute(interaction) {
    const bankEmbed = new MessageEmbed()
      .setColor("#ff970f")
      .setTitle("Bank 🏦")
      .addFields({
        name: "Balance",
        value: currency.getBalance({ id: interaction.user.id }),
      });

    await interaction.reply({ embeds: [bankEmbed] });
  },
};
