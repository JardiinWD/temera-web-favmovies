import React, {Fragment} from 'react'
import Routers from '../routes/routers'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <Fragment>
        <Navbar />
        <Routers />
    </Fragment>
  )
}

export default Layout