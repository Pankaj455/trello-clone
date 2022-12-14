import { useState, useEffect } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
  HStack,
  Text,
  Avatar,
  VStack,
  ButtonGroup,
  Box,
  Textarea
} from "@chakra-ui/react"
import { FaUserCircle } from 'react-icons/fa'
import { MdAdd, MdDescription, MdEdit } from 'react-icons/md'
import axios from '../../axios'
import { useAppContext } from '../../context/userContext'
import { useLocation } from 'react-router-dom'
import EditDescription from '../EditDescription/EditDescription'


const BoardDrawer = ({isOpen, onClose}) => {
    const {boards, _id: userId, admin, getAdminProfile, name, avatar} = useAppContext()
    const location = useLocation()

    const [edit, setEdit] = useState(false)

    const board = boards.filter(board => board._id === location.state);
    const {description} = board[0]
    
    useEffect(()=>{
        if(!admin && board[0].admin !== userId){
            const getAdmin = async () => {
                try {
                    const {data} = await axios.get(`/user/me/?id=${board[0].admin}`,
                        { headers: {
                            token: localStorage.getItem('auth-token')
                        },
                    })
                    if(data){
                        getAdminProfile(data.user)
                    }
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
    
            getAdmin()
        }
    }, [])

  return (
    <>
        <Drawer
            placement='right'
            size="xs"
            isOpen={isOpen}
            onClose={onClose}
        >
            <DrawerContent style={{top: 70 }}>
                <DrawerCloseButton />
                <DrawerHeader 
                    fontSize={12}
                    fontWeight={600}
                    fontFamily="'Poppins', sans-serif"
                >Board Menu</DrawerHeader>
                <Divider backgroundColor="#E0E0E0" mb={3} />
                <DrawerBody>
                    <HStack
                        fontSize={10}
                        fontWeight={500}
                        color="#BDBDBD"
                        fontFamily="'Poppins', sans-serif"
                        mb={3}
                    >
                        <FaUserCircle />
                        <Text>Made by</Text>
                    </HStack>
                    <HStack 
                        spacing={4} 
                        mb={3}
                    >
                        <Avatar size='sm' name={name} src={avatar?.url} />
                        <VStack
                            fontFamily="'Poppins', sans-serif"
                            spacing={0}
                            alignItems="flex-start"
                            >
                            {
                                (userId === board[0].admin) ? (
                                    <Text
                                        fontSize={12}
                                        fontWeight={600}
                                        color="#333"
                                    >{name}</Text> 
                                ) : (
                                    admin && <Text
                                        fontSize={12}
                                        fontWeight={600}
                                        color="#333"
                                    >{admin.name}</Text> 
                                )

                            }
                            <Text 
                                fontSize={10}
                                fontWeight={500}
                                color="#bdbdbd"
                            >on 24th October, 2022</Text>
                        </VStack>
                    </HStack>
                    <ButtonGroup
                        fontFamily="'Poppins', sans-serif"
                        spacing={4}
                        mb={3}
                    >
                        <Button 
                            variant="text"
                            size="xs"
                            leftIcon={<MdDescription />}
                            p={0}
                            color="#bdbdbd"
                            fontSize={10}
                            fontWeight={500}
                            cursor="auto"
                        >Description</Button>
                        {
                            (userId === board[0].admin) &&
                            <Button
                                variant="outline"
                                size="xs"
                                leftIcon={description ? <MdEdit /> : <MdAdd />}
                                fontSize={10}
                                fontWeight={500}
                                color="#828282"
                                onClick={() => setEdit(!edit)}
                                disabled={edit}
                            >{description ? "Edit" : "Add"}</Button>
                        }
                    </ButtonGroup>
                    <br />
                    {
                        edit ? (
                            <EditDescription 
                                setEdit={setEdit} 
                                boardId={location.state}
                                description={description ?? ""}
                            />
                        ) : (
                            description &&
                            <pre
                                style={{
                                    fontFamily: "'Noto Sans', serif",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    lineHeight: "19px",
                                    whiteSpace: "pre-line",
                                    marginBottom: 20
                                }}
                            >
                                {description}
                            </pre>
                        )
                    }
                    

                    {
                        (board.length && board[0].members.length > 0) && (
                            <Box>
                                <Button
                                    variant="text"
                                    size="xs"
                                    leftIcon={<MdDescription />}
                                    p={0}
                                    mb={2}
                                    color="#bdbdbd"
                                    fontFamily="'Poppins', sans-serif"
                                    fontSize={10}
                                    fontWeight={500}
                                    cursor="auto"
                                >Teams</Button>
                                <Box>
                                {
                                    (board[0].admin !== userId && admin) && (
                                        <HStack alignItems="center" mb={5}>
                                            <HStack
                                                flexGrow={1}
                                                spacing={4}
                                            >
                                                <Avatar 
                                                    size='xs'
                                                    name={name}
                                                    src={avatar?.url} 
                                                />
                                                <Text
                                                    fontSize={11}
                                                    fontWeight={500}
                                                    fontFamily="'Poppins', sans-serif"
                                                    >{admin.name}</Text>
                                            </HStack>
                                            <Text 
                                                fontFamily="'Poppins', sans-serif"
                                                fontSize={11}
                                                fontWeight={500}
                                                color="#bdbdbd"
                                            >Admin</Text>
                                        </HStack>
                                    )
                                }
                                {
                                    board[0].members.map(member => {
                                    return <Box key={member._id}>
                                        {
                                            member._id !== userId && (
                                                <HStack key={member._id} alignItems="center" mb={5}>
                                                    <HStack
                                                        flexGrow={1}
                                                        spacing={4}
                                                    >
                                                        <Avatar 
                                                            size='xs'
                                                            name={member.name}
                                                            src={member.avatar?.url}
                                                        />
                                                        <Text
                                                            fontSize={11}
                                                            fontWeight={500}
                                                            fontFamily="'Poppins', sans-serif"
                                                        >{member.name}</Text>
                                                    </HStack>
                                                    {
                                                        board[0].admin === userId && (
                                                            <Button
                                                                size="xs"
                                                                variant="outline"
                                                                colorScheme="orange"
                                                            >Remove</Button>
                                                        )
                                                    }
                                                </HStack>
                                            )
                                        }
                                    </Box>
                                    })
                                }
                                </Box>
                            </Box>
                        )
                    }
                    
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default BoardDrawer