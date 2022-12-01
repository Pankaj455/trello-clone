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
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/userContext';

const Header = () => {
    const {name, avatar, clearUser, boards} = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()

    const board = boards.filter(board => board._id === location.state)

    const logout = () => {
        localStorage.removeItem('auth-token')
        clearUser()
        navigate('/auth')
    }

    const myProfile = () => {
        navigate('/me')
    }

    const pathArr = window.location.pathname.split('/')
  return (
    <StyledHeader>
        <img src={logo} alt="Crello Logo" className='logo' />
        {
            pathArr.length === 3 &&
            <div className="board">
                <h1>{board[0].title} | </h1>
                <Button 
                    leftIcon={<CgMenuGridR />}
                    size='sm'
                    ml={3}
                    color="#828282"
                    onClick={() => navigate('/boards')}
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
                    textTransform="capitalize"
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