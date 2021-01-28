import React from 'react'
import {Loader , Segment} from 'semantic-ui-react'

const Spinner = () => {
 return (
  <Segment>
   <Loader active size="massive">Loading ....</Loader>
  </Segment>
 )
}

export default Spinner
