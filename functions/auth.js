const userValidator = (username , email , pass , rePass) => {
 if(!username , !email , !pass , !rePass) {
  throw new Error('Fields are empty')
 }

 else {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!email.match(regex)) {
   throw new Error('Email is in invalid format')
  }
 }

}

const loginValidator = (email , password) => {
 if(!email) {
  throw new Error('Email field must be empty')
 }
 else if(!password) {
  throw new Error('Password field must be empty')
 }
}

module.exports = {
 userValidator,
 loginValidator
}

