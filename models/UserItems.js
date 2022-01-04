module.exports = (sequalize, DataTypes) => {
  return sequalize.define(
    "user_items",
    {
      user_id: DataTypes.STRING,
      item_id: DataTypes.INTEGER,
      amount: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
