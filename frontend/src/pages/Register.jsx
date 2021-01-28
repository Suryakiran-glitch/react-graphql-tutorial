import React , {useState} from 'react'
import {Form , Button} from 'semantic-ui-react'
import Spinner from '../components/Spinner'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'
import {useHistory} from 'react-router-dom'
import cookie from 'js-cookie'

const Login = () => {

 const [username , setUsername] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [rePassword , setrePass] =useState('')
 const history = useHistory()

 const submitHandler = (e) => {
  e.preventDefault()
  addUser()
  history.push('/')
 }

 const [addUser , {loading}] = useMutation(ADD_USER , {
  update(proxy , result){
   console.log(result);
   const {username , token , _id} = result.data.createUser
   cookie.set('username' , username)
   cookie.set('token' , token)
   cookie.set('id' , _id)
  },
  onError(err) {
   console.log(err);
  }
  ,
  variables : {
   username,
   email,
   password,
   rePassword
  }
 })

 return (
 <div>
  {
   loading ? <Spinner /> : (
    <div style={{width : '500px' , height : '300px'}}>
   <Form onSubmit={submitHandler} noValidate>
    <h2 style={{margin : '50px auto' , textAlign : 'center' , fontSize : '32px' , color : '#9BDA25 '}}>Register</h2>
    <Form.Field>
      <label>Username</label>
      <input placeholder='Username' onChange={e => setUsername(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>E-mail</label>
      <input placeholder='email' onChange={e => setEmail(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='password' onChange={e => setPassword(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>Re-Password</label>
      <input placeholder='Re-password' onChange={e => setrePass(e.target.value)} />
    </Form.Field>
    <Button color='olive'>Register</Button>
   </Form>
  </div>
   )
  }
 </div>
 )
}

const ADD_USER = gql `
mutation
createUser(
  $username : String!
  $email : String!
  $password : String!
  $rePassword : String!
 ){
  createUser(
   data : {
    username : $username
    email : $email
    password : $password
    rePassword : $rePassword
   }
  ){
    _id
    email
    username
    token
  }
 }
  
`



export default Login
