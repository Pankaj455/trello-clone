import React, { useState, useEffect } from 'react'
import { Wrapper } from './wrapper.styled'
import Card from '../BoardCard/Card'
import Modal from '../CreateBoard/Modal'
import Header from '../Header/Header'
import Loader from '../Loader/Loader'
import { 
  Button,
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useAppContext } from '../../context/userContext'

const AllBoards = () => {
  const {loadUser, boards, loadingUser} = useAppContext()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if(loadingUser){
      loadUser()
    }
  }, [])
  
  return (
    <>
      {
      !loadingUser ? (
        <>
        <Header />
          <section style={{ backgroundColor: "#F8F9FD", minHeight: "calc(100vh - 70px)" }}>
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
                      {
                        boards.map(board => {
                          return <Card
                            key={board._id}
                            board={board}
                          />
                        })
                      }
                  </div>
              </Wrapper>
          </section>
        </>
        )  
        :
        <Loader />
      }
    </>
  )
}

export default AllBoards