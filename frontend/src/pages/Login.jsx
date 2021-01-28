import React , {useState} from 'react'
import {Form , Button , Header} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'
import Spinner from '../components/Spinner'

const Login = () => {

 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const history = useHistory()

 const [login , {loading}] = useMutation(LOGIN_USER , {
  update(proxy , result){
   console.log(result);
  },
  onError(err) {
   console.log(err);
  },
  variables : {
   email,
   password
  }
 })

 const submitHandler = (e) => {
  e.preventDefault()
  login()
  history.push('/')
 }

 return (
 <div style={{margin : '100px auto'}}>
  {
   loading ? <Spinner /> : (
    <div style={{width : '500px' , height : '300px'}}>
    <Form  onSubmit={submitHandler}>
     <Header as="h2" color="olive" style={{textAlign : 'center' , fontSize : '32px'}}>Login</Header>
     <Form.Field>
       <label>E-mail</label>
       <input placeholder='E-mail'  onChange={e => setEmail(e.target.value)}/>
     </Form.Field>
     <Form.Field>
       <label>Password</label>
       <input placeholder='Password'  onChange={e => setPassword(e.target.value)} />
     </Form.Field>
     <Button type="submit" color="brown">Login</Button>
    </Form>
   </div>
   )
  }
 </div>
 )
}

const LOGIN_USER = gql `
mutation loginUser(
 $email : String!
 $password : String!
){
 loginUser(
  data : {
   email : $email
   password : $password
  }
 ){
  username
  token
 }
}

`

export default Login
