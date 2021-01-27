const {UserInputError} = require('apollo-server')

const Post = require('../models/post')

const {v4} = require('uuid')

const jwtCheck = require('../middlewares/checkJwt')

module.exports = {
 Query : {},
 Mutation : {
  createComment : async (parent , {postId , body} , {request} , info) => {
   const user = jwtCheck(request)
   if(body.trim() === '') {
    throw new UserInputError('Empty input fields' , {
     error : 'No bost is givent to text'
    })
   }
   const post = await  Post.findById({_id : postId})

   if(post) {
    post.comments.unshift({
     id : v4(),
     username : user.username,
     body,
     createdat : new Date().toISOString()
    })

    await post.save()
    return post
   }

   else {
    throw new UserInputError('Post does not exist')
   }
  },
  deleteComment : async (parent , {postId , commentId} , {request} , info) => {
   const {username} = jwtCheck(request)
   const post = await Post.findById({_id : postId})
   if(post.name === username) {
    const commentIndex = post.comments.findIndex(c => c.id === commentId)
    post.comments.splice(commentIndex , 1)
    await post.save()
    return post
   }
   else {
    throw new UserInputError('Error in deleting the comments')
   }
  },
  likePost :async (parent , {postId} , {request} , info) => {
   const {username} = jwtCheck(request)
   const post = await Post.findById({_id : postId})
   if(post) {
   if(post.likes.find(p => p.username === username)) {
    post.likes = post.likes.filter(like => like.username != username  )
    await post.save()
    return post
   }
   else {
    post.likes.push({
     id : v4(),
     username,
     createdat : new Date().toISOString()
    })
    await post.save()
    return post
   }
  }else {
   throw new UserInputError('Post not found')
  }
  }
 }
}