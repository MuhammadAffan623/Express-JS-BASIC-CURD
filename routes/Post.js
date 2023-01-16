const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { createPost,allPost,myPost,deletePost } = require("../controller/post-controller");

router.post('/createpost', auth, createPost);
router.get('/allpost', auth, allPost);
router.get('/mypost', auth, myPost);
router.delete("/deletepost/:postid", auth, deletePost);


module.exports = router;