const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')
const {SECRET_KEY} = require('../config')

module.exports =  (req) => {
 const authHeader = req.req.headers.authorization
 const token = authHeader.split('Bearer ')[1]
 if(token) {
  try {

   const user = jwt.verify(token , SECRET_KEY)
   return user
   
  } catch (error) {
   console.log(error)
   throw new AuthenticationError('Invalid or expired token')
  }
 } else {
  throw new Error('Authorization failed')
 }
}