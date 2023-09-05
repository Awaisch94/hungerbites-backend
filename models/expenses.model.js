const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
class Expenses extends Model {}

Expenses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    expense_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Expenses",
    tableName: "expenses",
    timestamps: true,
  }
);

// StaffWorkingHours.beforeCreate(async (user, options) => {
//   if (!user.email) {
//     throw new Error("Email is required");
//   }
//   if (!user.password) {
//     throw new Error("Password is required");
//   }
//   if (user.changed("password")) {
//     user.password = await bcrypt.hash(user.password, 10);
//   }
// });

module.exports = Expenses;