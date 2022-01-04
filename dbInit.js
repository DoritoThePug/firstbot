const Sequalize = require("sequelize");

const sequalize = new Sequalize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const CurrencyShop = require("./models/CurrencyShop.js")(
  sequalize,
  Sequalize.DataTypes
);
require("./models/Users.js")(sequalize, Sequalize.DataTypes);
require("./models/UserItems.js")(sequalize, Sequalize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequalize
  .sync({ force })
  .then(async () => {
    const shop = [
      CurrencyShop.upsert({ name: "Coffee", cost: 2 }),
      CurrencyShop.upsert({ name: "Banana", cost: 1 }),
      CurrencyShop.upsert({ name: "Cake", cost: 10 }),
    ];

    await Promise.all(shop);
    console.log("Database synced!");

    sequalize.close();
  })
  .catch(console.error);
