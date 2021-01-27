const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config');
const { userValidator , loginValidator } = require("../functions/auth");

module.exports = {
 Query : {

 },
 Mutation : {
  async createUser(parent , {data} , ctx , info) {

   const {password , rePassword} = data
   if(password != rePassword) {
    throw new Error('Passwords do not match')
   }
   else if(password.length < 6) {
    throw new Error('Password must be atleast 6 characters')
   }

   userValidator(data.username , data.email , password , rePassword)

   const userExists = await User.findOne({email : data.email})

   if(userExists) {
    throw new Error('User is already taken')
  }

   const hashedPassword = bcrypt.hashSync(password , 10)

   const user = new User({
    username : data.username,
    password : hashedPassword,
    email : data.email,
    createdat : new Date().toISOString()
   })
  
   return await user.save().then(res => {

    const token = jwt.sign({
     id : res._id
    } , SECRET_KEY , {expiresIn : '1h'})
    res.password = null
    res.token = token
    return res
   }).catch(err => console.log(err))

  },
  async loginUser(parent , {data} , ctx , info) {
   const {email , password} = data
   const res = await User.findOne({email})
   const passwordMatches = bcrypt.compareSync(password , res.password)
   if(!res || !passwordMatches) {
    throw new Error('Password does not matches or user does not exist')
   }

   loginValidator(email , password)
   
   const token = jwt.sign({
    id : res._id
   } , SECRET_KEY , {expiresIn : '2h'})

   if(res) {
    res.token = token
    return res
  }
  }
 }
}