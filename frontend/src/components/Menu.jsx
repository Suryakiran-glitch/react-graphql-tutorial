import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import cookie from 'js-cookie'

const MenuExampleBasic  = () => {

  const history = useHistory()

 const pathname = window.location.pathname
 const path = pathname === '/' ? 'home' : pathname.substr(1)

 const [activeItem , setactiveItem] = useState(path)

 const logoutHandler = () => {
   cookie.remove('token')
   cookie.remove('username')
   cookie.remove('id')
   history.push('/login')
 }
  

  const handleItemClick = (e, { name }) => setactiveItem(name)

    return (
      <Menu size="massive" color="olive">
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        

        <Menu.Item
          name='Register'
          active={activeItem === 'Register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
       
        <Menu.Item        
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />

<Menu.Item        
          name='logout'
          active={activeItem === 'logout'}
          onClick={logoutHandler}
        />
          
      </Menu>
    )
  
}

export default MenuExampleBasic
