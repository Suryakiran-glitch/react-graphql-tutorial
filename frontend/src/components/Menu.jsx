import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const MenuExampleBasic  = () => {

 const pathname = window.location.pathname
 const path = pathname === '/' ? 'home' : pathname.substr(1)

 const [activeItem , setactiveItem] = useState(path)
  

  const handleItemClick = (e, { name }) => setactiveItem(name)

    return (
      <Menu size="massive" color="teal">
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
          
      </Menu>
    )
  
}

export default MenuExampleBasic
