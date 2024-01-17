import { DataTypes } from "sequelize";
import db from "../config/db.js";

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
    city: {
      type: DataTypes.STRING,
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

export default Order;
