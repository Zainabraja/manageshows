const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const { cookieAuth, verifyUser } = require("../middleware/authMiddleware");

router.get("/signin", authController.signin_get);
router.post("/signin", authController.signin_post);
router.get("/manage", verifyUser, cookieAuth, (req, res) => {
  console.log("Inside manage");
  console.log(req.user);
  res.send(req.user);
});
router.post("/addshow", authController.addshow_post);
router.post("/updateshow", authController.updateshow_post);
router.post("/deleteshow", authController.deleteshow_post);
router.get("/logout", authController.logout_get);

module.exports = router;
