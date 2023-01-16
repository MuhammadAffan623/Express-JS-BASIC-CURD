const express = require("express");
const router = express.Router();
const { signUp, login,updateUser,findUser } = require("../controller/user-controller");
const { auth } = require("../middleware/auth")


/* */
router.post("/user/signup", signUp); 

//
router.get("/user/login", login);

//
router.get("/auth", auth);

router.post("/updateuser", auth, updateUser);

router.get("/finduser",findUser )

module.exports = router;
