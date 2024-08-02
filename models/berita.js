"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Berita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Berita.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title tidak boleh kosong",
          },
          notEmpty: {
            msg: "Title tidak boleh kosong",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category tidak boleh kosong",
          },
          notEmpty: {
            msg: "Category tidak boleh kosong",
          },
        },
      },
      author: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Thumbnail tidak boleh kosong",
          },
          notEmpty: {
            msg: "Thumbnail tidak boleh kosong",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description tidak boleh kosong",
          },
          notEmpty: {
            msg: "Description tidak boleh kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Berita",
    }
  );
  return Berita;
};
