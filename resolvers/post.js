const Post = require("../models/post");
const jwtCheck = require('../middlewares/checkJwt');
const checkJwt = require("../middlewares/checkJwt");

module.exports = {
 Query : {
  async getPosts() {
   try {
    return await Post.find().sort({createdAt : -1}).then(res => {
     return res
    })
   } catch (error) {
    console.log(error)
   }
  }, 
  async getPost(parent , args , ctx , info) {
   try{
    return await Post.findById({id : args.postId}).then(res => {
     return res
    })
   }
   catch(err) {
    console.log(err)
   }
  },
  async deletePost(parent , args , {request} , info) {

   checkJwt(request)

   try {
    return await Post.findByIdAndDelete({id : args.postId}).then(res => {
     console.log(res)
     return 'Post deleted'
    })
   } catch (error) {
    console.log(error)
   }
  },
 },
 Mutation : {
  async createPost(parent , {body} , {request , pubsub} , info) {
   const user = jwtCheck(request)

   const newPost = new Post({
    body,
    user : user._id,
    username : user.username,
    createdat : new Date().toISOString()
   })

   const post = newPost.save()

   pubsub.publish('NEW_POST' , {
    newPost : post
   })

   return 'Post is created'
  }
 },
 Subscription : {
  newPost : {
   subscribe : (parent , args , {pubsub} , info) => {
    pubsub.asyncIterator('NEW_POST')
   }
  }
 }
}