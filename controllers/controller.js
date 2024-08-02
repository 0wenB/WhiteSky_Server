const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Berita } = require("../models/index");

class Controller {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { message: "Email or password is required", status: 400 };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { message: "Email/password invalid", status: 401 };
      }

      if (!comparePassword(password, user.password)) {
        throw { message: "Email/password invalid", status: 401 };
      }
      const payload = {
        id: user.id,
        status: user.status,
        role: user.role,
        email: user.email,
      };
      let access_token = signToken(payload);
      res.status(200).json({ access_token, role: user.role });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async register(req, res) {
    try {
      const { email, password, name, phone } = req.body;
      const findUser = await User.findOne({
        where: { email },
      });
      if (findUser) {
        throw {
          message: "Email already exists. Try another one!",
          status: 400,
        };
      }
      await User.create({
        email,
        password,
        name,
        phone,
      });
      const createdUser = await User.findOne({
        where: { email },
        attributes: { exclude: ["password"] },
      });
      res.status(201).json({ createdUser });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async findAllNews(req, res) {
    try {
      const news = await Berita.findAll({ order: [["createdAt", "DESC"]] });
      res.status(200).json({
        message: "Successfully find all news",
        news,
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async findNewsById(req, res) {
    try {
      const { newsId } = req.params;
      const news = await Berita.findOne({ where: { id: newsId } });
      if (!news) {
        throw {
          message: "News not found!",
          status: 404,
        };
      }
      res.status(200).json({
        message: "Successfully find news by ID",
        news,
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async findUserInfo(req, res) {
    try {
      const userId = req.loginInfo.userId;
      const userInfo = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        message: "Successfully get user info",
        userInfo,
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
}

module.exports = Controller;
