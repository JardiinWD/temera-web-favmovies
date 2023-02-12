import Routers from '../routes/routers'
import Navbar from '../components/Navbar'
import {Fragment} from 'react'

const Layout = () => {

  return (
    <Fragment>
        <Navbar />
        <Routers />
    </Fragment>
  )
}

export default Layout