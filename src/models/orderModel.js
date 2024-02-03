import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Customer from "./customerModel.js";

const Order = db.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    final_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateOfOrder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Order.belongsTo(Customer, { foreignKey: 'customerId' });

export default Order;
