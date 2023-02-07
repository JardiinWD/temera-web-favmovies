import React, {Fragment} from 'react'
import Routers from '../routes/routers'
import Header from '../components/Header'

const Layout = () => {
  return (
    <Fragment>
        <Header />
        <Routers />
    </Fragment>
  )
}

export default Layout