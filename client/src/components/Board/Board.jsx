import { useAppContext } from '../../context/AppProvider'
import Header from '../Header/Header'
import Visibility from '../Visibility/Visibility'
import BoardDrawer from '../BoardDrawer/BoardDrawer'
import { Button,
  AvatarGroup,
  Avatar,
  Tooltip,
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { StyledBoard } from './board.styled'
import BoardMenu from '../BoardMenu/BoardMenu'

const Board = () => {
  const {boards, loadingUser, loadUser, error} = useAppContext()
  const location = useLocation()

  const board = boards.filter(board => board._id === location.state);

  useEffect(() => {
    if(loadingUser){
      loadUser()
    }
  }, [])

  return (
    !loadingUser &&
    <>
      <Header />
      <StyledBoard>
        <div className="row">
          <Visibility />
          <div className="members">
            <AvatarGroup size='sm' spacing={2}>
              {
                board.length > 0 && board[0].members.map(member => {
                  return <Avatar key={member._id} name={member.name} />
                })
              }
              {/* <Avatar size='sm' src='https://bit.ly/dan-abramov' />
              <Avatar size='sm' src='https://bit.ly/kent-c-dodds' />
              <Avatar size='sm' src='https://bit.ly/ryan-florence' />
              <Avatar size='sm' src='https://bit.ly/prosper-baba' /> */}
            </AvatarGroup>
            {
              board.length > 0 && board[0].members.length === 0 ?
              (<Tooltip
                hasArrow
                label='Invite'
                bg='blue.400'
                placement='top'
              >
                <Button
                  size='sm'
                  colorScheme='blue'
                  ml={2}
                >
                  <AiOutlinePlus />
                </Button>
              </Tooltip>
              ): (<Button size='sm'
                colorScheme='blue'
                ml={2}
              >
                <AiOutlinePlus />
              </Button>)
            }
          </div>
          <BoardMenu />
        </div>
      </StyledBoard>
    </>
  )
}

export default Board