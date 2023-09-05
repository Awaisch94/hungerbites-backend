/*Orders:
•	id (Primary Key)
•	user_id (Foreign Key to UserProfile table)
•	order_date
•	total_amount
•	status (enum: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
*/

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserAuthentication = require("./userAuth.model");
const MenuItems = require("./menuItems.model");
// const OrderItem = require("./orderItem.model");

class DineOrder extends Model {}

DineOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    auth_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserAuthentication,
        key: "id",
      },

      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    restaurant: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    persons: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    // total_amount: {
    //   type: DataTypes.DECIMAL(10, 2),
    //   allowNull: true,
    //   validate: {
    //     min: 0,
    //   },
    // },
    menu_items: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    // status: {
    //   type: DataTypes.ENUM(
    //     "pending",
    //     "processing",
    //     "shipped",
    //     "delivered",
    //     "cancelled"
    //   ),
    //   allowNull: true,
    // },
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
    timestamps: true,
    modelName: "DineOrder",
    tableName: "dineOrder",
  }
);

DineOrder.belongsTo(UserAuthentication, {
  foreignKey: "auth_user_id",
  as: "UserAuthentication",
  targetKey: "id",
});

// Order.associations = (model) => {
//   Order.hasMany(OrderItem, { foreignKey: "order_id", as: "OrderItems"})
// }


// DineOrder.beforeCreate(async (dineOrder, options) => {
//   if (!dineOrder.order_date) {
//     throw new Error("Order date is required");
//   }

//   if (!order.total_amount || order.total_amount < 0) {
//     throw new Error("Total amount is required and must be non-negative");
//   }

//   if (!order.status) {
//     throw new Error("Status is required");
//   }
// });

module.exports = DineOrder;
