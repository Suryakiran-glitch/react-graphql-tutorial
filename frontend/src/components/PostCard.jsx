import React from 'react'
import {Card , Image ,Icon , Button , Label} from 'semantic-ui-react'
import moment from 'moment'
import {Link} from 'react-router-dom'

const PostCard = ({post}) => {
 const {_id , createdat , body , likescount , commentscount , likes} = post

 const likePost = () => {

 }

 const createComment = () => {
  
 }
 

 return (
  <Card fluid as={Link} to={`post/${_id}`}>
  <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
  <Card.Content>
    <Card.Header>{_id}</Card.Header>
    <Card.Meta>
      <span className='date'>{moment(createdat).fromNow()}</span>
    </Card.Meta>
    <Card.Description>
      {body}
    </Card.Description>
  </Card.Content>
  <Card.Content extra>
  <Button as='div' labelPosition='right'>
      <Button color='red' onClick={likePost}>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic color='red' pointing='left'>
        {likescount}
      </Label>
    </Button>
    <Button as='div' labelPosition='left'>
      <Button color='blue' onClick={createComment}>
        <Icon name='comments' />
        Comments
      </Button>
      <Label as='a' basic color='reblued' pointing='left'>
        {commentscount}
      </Label>
    </Button>
  </Card.Content>
</Card>
 )
}

export default PostCard
