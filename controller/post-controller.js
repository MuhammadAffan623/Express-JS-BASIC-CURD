const Post = require("../model/post");


const createPost = ((req, res) => {
    console.log("in create post")
    const { title, body, pic } = req.body
    if (!title || !body) {
        // if(!title || !body || !pic){
        return res.status(422).json({ error: "Plase add all the fields" })
    }
    console.log("in post ..", req.user);
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        // photo:pic,
        postedBy: req.user
    })
    post.save().then(result =>res.json({ post: result })).catch(err => console.log(err))
});


const allPost = ((req, res) => {
    Post.find().populate("postedBy", "_id name").populate("comments.postedBy", "_id name")
        .sort('-createdAt')
        .then((posts) => { res.json({ posts }) })
        .catch(err => { console.log(err)})
});

const myPost = ((req, res) => {
    Post.find({ "postedBy": req.user._id })
        .populate("postedBy", "_id name")
        .then((myallpost) => {
            res.json(myallpost)
        })
        .catch((err) => {
            res.json(err);
        })
});


const deletePost = ((req, res) => {
    Post.findOne({ _id: req.params.postid })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            console.log(post.postedBy._id)
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.deleteOne()
                    .then(result => res.json({ message: "successfully deleted" }))
                    .catch(err => console.log(err))
            }
        })
});




module.exports = { createPost ,allPost,myPost,deletePost };