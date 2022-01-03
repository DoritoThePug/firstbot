const { Client, Intents } = require("discord.js");
const { token, clientId, guildId } = require("config.jsn");

const generateWelcomeImage = require("./generateWelcomeImage");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});

client.once("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  let args;

  if (message.guild) {
  }
});

const welcomeChannelId = "927607224816250930";

client.on("guildMemberAdd", async (member) => {
  const img = await generateWelcomeImage(member);
  member.guild.channels.cache.get(welcomeChannelId).send({
    content: `<@${member.id}> Welcome to ${member.guild.name}`,
    files: [img],
  });
});

client.login(token);
