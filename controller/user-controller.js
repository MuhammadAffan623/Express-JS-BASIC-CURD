const User = require("../model/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const tokengenerator = require("../middleware/tokengenertor")


const signUp = ((req, res) => {
    const user = req.body;
    console.log(user);
    const newUser = new User(req.body);

    if(!newUser.email || !newUser.firstName || !newUser.lastName || !newUser.password || !req.body.confirmPassword){
        res.status(400).send('Fill all the fields...');
    }
    else{
        if(newUser.password === req.body.confirmPassword){
            const hashedPassword = bcrypt.hashSync(newUser.password , 10);
            newUser.password = hashedPassword;
            console.log(newUser.password);
            newUser.save();
           
            res.status(200).send("saved to db");
        }
        else{
            res.status(422).send('Password Does Not Match...');
        }
        
    }    
});

const login = ((req,res) => {
    const { email, password } = req.body;
  
    User.findOne({ "email": email }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const token = tokengenerator(user);
                    res.status(200).json({token});
                } else {
                    res.status(200).send("password not match");
                }
            })
        } else {
          res.status(200).send("user not found")
        }
    })
});

const updateUser = ((req, res) => {
    const eMail = req.user.email;
    User.findOne({ "email": eMail }).then((user) => {
        if (user) {
            if (req.body.firstName) { user.firstName = req.body.firstName }
            if (req.body.lastName) { user.lastName = req.body.lastName }
            if (req.body.gender) { user.gender = req.body.gender }
            if (req.body.age) { user.age = req.body.age}
            if (req.body.phone) { user.phone = req.body.phone}
            user.save().then(() => res.status(200).json({ message: "user updated" }))
                .catch((err)=>{res.status(422).json({message:"user not updated"})})
        } else {
            res.status(200).send("user not found")
        }
    })
});

const findUser = ((req, res) => {

    const re = new RegExp("^" + req.query.keyword, "i")
    User.find().or([{ "email": { $regex: re } } , { "firstName": { $regex: re } } , { "lastName": { $regex: re } }]).then((result) => {
        res.status(200).send(result)
       }).catch((err)=>{res.status(422).json({message:"doesnot find any thing"})})

   
    
})

module.exports = { signUp, login,updateUser,findUser };