import React from 'react'
import { StyledCard } from './card.styled.'
import { Image, AvatarGroup, Avatar } from '@chakra-ui/react'

const Card = () => {
  return (
    <StyledCard>
      <div className="cover">
        <Image src='https://bit.ly/2Z4KKcF' fit alt='board-cover' />
      </div>
      <h3 className="title">Devchallenges Board</h3>
      <AvatarGroup size='sm' max={3} spacing={1}>
        <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
        <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
        <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
      </AvatarGroup>
    </StyledCard>
    
  )
}

export default Card