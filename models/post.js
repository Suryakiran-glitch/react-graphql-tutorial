const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types

const postSchema = mongoose.Schema({
 body : String,
 username : String,
 createdat : String,
 comments : [
  {
   body : String,
   username : String,
   createdat : String,
  }
 ],
 likes : [
  {
   username : String,
  eatedat : String,
  }
 ], 
 user : {
  type : ObjectId,
  ref : "User"
 }

})

module.exports = mongoose.model('Post' , postSchema)