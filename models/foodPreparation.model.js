const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
class FoodPreparation extends Model {}

const MenuItem = require('./menuItems.model')

FoodPreparation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      references: {
        model: MenuItem,
        key: "id",
      },
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preparation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quantity: {
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
    modelName: "FoodPreparation",
    tableName: "foodPreparation",
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

module.exports = FoodPreparation;