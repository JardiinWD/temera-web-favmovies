import React, {Fragment} from 'react'
import Heading from '../components/Heading'
import Helmet from '../components/Helmet'

const Home = () => {
  return (
    <Fragment>
      <Helmet page="Homepage" />
      <Heading type="logo-title" title="Movies" />
    </Fragment>
  )
}

export default Home