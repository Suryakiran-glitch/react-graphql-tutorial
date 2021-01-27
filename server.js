const {ApolloServer , PubSub} = require('apollo-server')
const mongoose = require("mongoose");
const {MONGO_URI} = require('./config');
const resolvers = require('./resolvers/index');
const typeDefs = require('./typeDefs');

const pubsub = new PubSub()

const server = new ApolloServer({
 typeDefs,
 resolvers,
 context(request) {
  return {
   request,
   pubsub
  }
 }
})

//Database Connection
mongoose.connect(MONGO_URI , {useNewUrlParser : true , useUnifiedTopology : true}).then(() => {
 console.log('Connected to database')
}).catch(err => console.log(err))

server.listen({port : 5000}).then(res => console.log(`Server is running on ${res.url}`)).catch(err => {
 console.log(err)
})