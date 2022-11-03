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
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppProvider';

const Header = ({name, avatar}) => {
    const navigate = useNavigate()
    const {clearUser} = useAppContext()

    const logout = () => {
        localStorage.removeItem('auth-token')
        clearUser()
        navigate('/auth')
    }

    const myProfile = () => {
        navigate('/me')
    }
  return (
    <StyledHeader>
        <img src={logo} alt="Crello Logo" className='logo' />
        {
            !window.location.pathname.includes('/boards') &&
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
        }
        <div className="profile">
            {
                <Avatar 
                    size='sm'
                    name={name}
                    // src='https://bit.ly/dan-abramov'
                    src={avatar ? avatar.url : ''}
                />
            }
            <Menu>
                <MenuButton 
                    as={Button} 
                    size='sm'
                    bg='#fff'
                    rightIcon={<BsCaretDownFill />}
                >
                    {name}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={myProfile}>My profile</MenuItem>
                    <MenuItem onClick={logout}>Log out</MenuItem>
                </MenuList>
            </Menu>
        </div>

    </StyledHeader>
  )
}

export default Header