const generateWelcomeImage = require("../generateWelcomeImage");

const welcomeChannelId = "927607224816250930";

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(interaction) {
    const img = await generateWelcomeImage(interaction.user);
    interaction.guild.channels.cache.get(welcomeChannelId).send({
      content: `<@${interaction.user.id}> Welcome to ${interaction.guild.name}`,
      files: [img],
    });
  },
};
