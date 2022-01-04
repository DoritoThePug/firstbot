const fs = require("fs");
const sequelize = require("sequelize");
const { Client, Intents, Interaction, Collection } = require("discord.js");
const { token, clientId, guildId } = require("./config.json");
const { Users, CurrencyShop } = require("./dbObject");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});
const currency = new Collection();

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);

  Reflect.defineProperty(currency, "add", {
    value: async function add(id, amount) {
      const user = currency.get(id);

      if (user) {
        user.balance += Number(amount);
        return user.save();
      } else {
        const newUser = await new Users.create({
          user_id: id,
          balance: amount,
        });
        currency.set(id, newUser);

        return newUser;
      }
    },
  });
}

client.login(token);
