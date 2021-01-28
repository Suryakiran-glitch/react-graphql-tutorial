const gql = require('graphql-tag')

module.exports = gql `

type Query {
 getPosts : [Post]
 getPost(postId : ID!) : Post!
 deletePost(postId : ID!) : String!
}

type Mutation {
 createUser( data : userData!) : User!
 loginUser(data : loginData!) : User!
 createPost(body : String!) : String!
 createComment(postId : ID! , body : String!) : Post!
 deleteComment(postId : ID! , commentId : String!) : Post!
 likePost(postId : ID!) : Post!
}

type Subscription {
 newPost : Post!
}

input userData {
 username : String!
 email : String!
 password : String!
 rePassword : String!
}

input loginData {
 email : String!
 password : String!
}

type Comment {
 id : ID!
 body : String!
 createdat : String!
 username : String!
}

type Like {
 id : ID!
 username : String
 createdat : String!
}

type Post {
 _id : ID!
 username : String
 body : String!
 createdat : String!
 comments : [Comment]
 likes : [Like]
 likesCount : Int!
 commentsCount : Int!
}

type User {
 _id : ID!
 username : String!
 email : String!
 token : String!
 createdat : String!
}

`