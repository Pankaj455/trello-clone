import React, { useState, useEffect } from 'react'
import { Wrapper } from './wrapper.styled'
import Card from '../Card/Card'
import Modal from '../Modal/Modal'
import Header from '../Header/Header'
import { 
  Button,
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import axios from '../../axios'
import { useAppContext } from '../../context/AppProvider'

const AllBoards = () => {
  const {loadUser, name, avatar, boards} = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {data} = await axios.get('/user/me', {
          headers: {
            token: localStorage.getItem('auth-token')
          }
        })
        // console.log(data.user);
        loadUser(data.user)
      } catch (error) {
        console.log(error.response);
      }
      setLoading(false)
    }

    fetchUser()
  }, [])
  
  return (
    <>
      {
      !loading ? (
        <>
        <Header name={name} avatar={avatar} />
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
                      {
                        boards.map(board => {
                          return <Card key={board._id} board={board} />
                        })
                      }
                  </div>
              </Wrapper>
          </section>
        </>
        )  
        :
        <h1>Loading...</h1>
      }
    </>
  )
}

export default AllBoards