const {AuthModel} = require("../Modals/auth.modal")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signup = async (req,res) =>{
    const {username,email,password} = req.body;

    const isUser = await AuthModel.findOne({email});
    if(isUser){
        res.send("user already existed")
    }
    else{
        bcrypt.hash(password,4 ,async function (err,hash){
            if(err){
                res.status(401).send("something went wrong")
            }
            const user = new AuthModel({username,email,password:hash})
            try{

                const newuser = await user.save()
                 res.status(200).send("user added succesfully")
             }
             catch(err){
                 res.status(400).send(err)
             }
        })
       
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;
    const user = await AuthModel.findOne({email})
    if(user){
        const hased_pass = user.password
        const user_id = user._id
        const username = user.username
        
        bcrypt.compare(password,hased_pass, async function (err,result){
            if(err){
                res.status(500).json("Something went wrong")
            }
            if(result){
                const token = jwt.sign({user_id:user_id,email:email,username:username,},process.env.secret_key,{expiresIn:"10h"})
                const refreshtoken = jwt.sign({},process.env.REFRESH_KEY,{expiresIn:"28 days"})
                res.status(200).json({ msg: "Login Succesfull!", token,refreshtoken,user});
            }else{
                res.status(401).send("checked detail and try again !")
            }
        })


    }else{
        res.status(400).send("user does not exist !")
    }

}
const Authcontroller = {
    signup,
    login
}
module.exports = {
    Authcontroller
}