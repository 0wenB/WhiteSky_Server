const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const router = require("express").Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);

router.use(authentication);

router.get("/", Controller.findAllNews);
router.get("/berita/:newsId", Controller.findNewsById);
router.get("/profile", Controller.findUserInfo);

module.exports = router;
