import React , {Fragment , useState} from 'react'
import {useQuery , useMutation} from '@apollo/client'
import Spinner from '../components/Spinner'
import {Grid , Header , Form, Button} from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import {FETCH_ALL_POSTS} from '../graphql/index'
import gql from 'graphql-tag'

const Home = () => {

  const {body , setBody} = useState('')

 const {loading , data : {getPosts : posts} = {}} = useQuery(FETCH_ALL_POSTS)

 const [addPost] = useMutation(CREATE_POST , {
   update(proxy , result) {
     const data = proxy.readQuery({
       query : FETCH_ALL_POSTS
     })
     data.getPosts = [result.data.getPost , ...data.getPosts]
     proxy.writeQuery({query : FETCH_ALL_POSTS , data})
     setBody('')
   },
   variables : {
     $body : body
   },
   onError(err) {
     console.log(err);
   }
 })

 const clickHandler = (e) => {
   e.preventDefault()
   addPost()
 }

 return (
   <Fragment>
    <div>
     <Header as="h2" style={{margin : '40px auto' , textAlign : 'center' , color : 'tomato' , fontSize : '32px'}}>Recent Posts</Header>
    </div>
   <Grid columns={3}>
    <Grid.Row>
     {
      loading ? <Spinner /> : (
       posts && posts.map((post,i) => (
        <Grid.Column key={i}>
         <PostCard  post={post}/>
        </Grid.Column>
       ))
      )
     }
    </Grid.Row>
   </Grid>
   <div>
     <Grid centered columns={2}>
      <Grid.Row>
       <Grid.Column>
        <Header as="h2" color="purple">Create Post</Header>
        <Form>
        <Form.Field>
       <label>Body</label>
       <input placeholder='Body'  onChange={e => setBody(e.target.value)}/>
     </Form.Field>
     <Button onClick={clickHandler} color="orange">CreatePost</Button>
        </Form>
       </Grid.Column>
      </Grid.Row>
     </Grid>
    </div>
   </Fragment>
  
 )
}

const CREATE_POST = gql `

mutation createPost(
  $body : String!
){
  createPost(
    body : $body
  ){
    _id
    likescount
    commentscount
    body
    createdat
    comments {
      id
      username
      body
    }
    likes {
      id
      username
    }
  }
}

`


export default Home
