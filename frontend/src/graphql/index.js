import gql from 'graphql-tag'

export const FETCH_ALL_POSTS = gql `
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