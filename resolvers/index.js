const postsResolvers = require('./post')
const usersResolvers = require('./user')
const commentResolvers = require('./comment')

const resolvers = {
 Post : {
  likesCount : (parent) => {
   return parent.likes.length
  },
  commentsCount : (parent) => {
   return parent.comments.length
  }
 },
 Query : {
  ...postsResolvers.Query
 },

 Mutation : {
  ...usersResolvers.Mutation,
  ...postsResolvers.Mutation,
  ...commentResolvers.Mutation
 },
 Subscription : {
  ...postsResolvers.Subscription
 }
}

module.exports = resolvers