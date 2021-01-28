import React , {Fragment} from 'react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/client'
import Spinner from '../components/Spinner'
import {Grid , Header} from 'semantic-ui-react'
import PostCard from '../components/PostCard'

const Home = () => {

 const {loading , data : {getPosts : posts} = {}} = useQuery(FETCH_ALL_POSTS)

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
   </Fragment>
  
 )
}

const FETCH_ALL_POSTS = gql `
{
 getPosts {
  _id
    body
    likesCount
    commentsCount
    likes {
      id
    }
    comments {
      id
      body
      createdat
    }
  }
}

`

export default Home
