import React from 'react'
import { StyledCard } from './card.styled.'
import { Image, AvatarGroup, Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Card = ({board}) => {
  const navigate = useNavigate()
  return (
    <StyledCard onClick={() => navigate(`/boards/${board._id}`, {state: board._id})}>
      <div className="cover">
        {
          board.cover && <Image src={board.cover.url} fit alt='board-cover' />
        }
      </div>
      <h3 className="title">{board.title}</h3>
      <AvatarGroup size='sm' max={3} spacing={1}>
        {
          board.members.map(member => {
            return <Avatar key={member._id} name={member.name} />
          })
        }
      </AvatarGroup>
    </StyledCard>
    
  )
}

export default Card