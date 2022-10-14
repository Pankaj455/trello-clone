import React, { useState } from 'react'
import { Wrapper } from './wrapper.styled'
import Card from '../Card/Card'
import Modal from '../Modal/Modal'
import { Button,
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'

const AllBoards = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section>
        <Modal isOpen={isOpen} close={setIsOpen} />
        <Wrapper>
            <div className='row'>
                <h3>All Boards</h3>
                <Button 
                  leftIcon={<AiOutlinePlus />} 
                  size='sm' 
                  onClick={() => setIsOpen(true)}
                >
                  Add
                </Button>
            </div>
            <div className="boards">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </Wrapper>
    </section>
  )
}

export default AllBoards