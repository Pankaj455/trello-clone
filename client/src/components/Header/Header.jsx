import React from 'react'
import logo from '../../assets/updated-logo-bold.svg'
import { StyledHeader } from './header.styled'
import { 
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar
} from '@chakra-ui/react'
import { CgMenuGridR } from "react-icons/cg";
import { BsCaretDownFill } from "react-icons/bs";

const Header = () => {
  return (
    <StyledHeader>
        <img src={logo} alt="Crello Logo" className='logo' />
        <div className="board">
            <h1>DevChallenges Board | </h1>
            <Button 
                leftIcon={<CgMenuGridR />} 
                size='sm'
                ml={3}
                color="#828282"
            >
                All board
            </Button>
        </div>
        <div className="profile">
            <Avatar 
                size='sm'
                name='Pankaj Das'
                src='https://bit.ly/dan-abramov'
            />
            <Menu>
                <MenuButton 
                    as={Button} 
                    size='sm'
                    bg='#fff'
                    
                    rightIcon={<BsCaretDownFill />}
                >
                    Pankaj Das
                </MenuButton>
                <MenuList>
                    <MenuItem>My profile</MenuItem>
                    <MenuItem>Log out</MenuItem>
                </MenuList>
            </Menu>
        </div>

    </StyledHeader>
  )
}

export default Header