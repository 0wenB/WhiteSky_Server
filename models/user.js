"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nama tidak boleh kosong",
          },
          notEmpty: {
            msg: "Nama tidak boleh kosong",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone tidak boleh kosong",
          },
          notEmpty: {
            msg: "Phone tidak boleh kosong",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email tidak boleh kosong",
          },
          notEmpty: {
            msg: "Email tidak boleh kosong",
          },
          isEmail: {
            msg: "Email harus berupa format email yang valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password tidak boleh kosong",
          },
          notEmpty: {
            msg: "Password tidak boleh kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
