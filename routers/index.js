const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const router = require("express").Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.get("/", Controller.findAllNews);
router.get("/news", Controller.findAllNewsPaginated);
router.get("/berita/:newsId", Controller.findNewsById);

router.use(authentication);

router.get("/profile", Controller.findUserInfo);

module.exports = router;
