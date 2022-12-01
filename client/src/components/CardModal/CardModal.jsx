import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Box,
    Grid,
    GridItem,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image,
    SkeletonCircle,
    SkeletonText,
  } from "@chakra-ui/react"
import { AiOutlineCheck } from 'react-icons/ai'
import { MdClose, MdImage, MdPeople } from 'react-icons/md'
import CardDescription from "../CardDescription/CardDescription"
import { useState, useRef } from "react"
import CommentInput from "../CommentInput/CommentInput"
import { FaUserCircle } from "react-icons/fa"
import { useListContext } from "../../context/listContext"
import AddMemberToCard from "../AddMemberToCard/AddMemberToCard"
import { useEffect } from "react"

const CardModal = ({id, listId, isOpen, onClose, listTitle, title, description, comments, members, cover}) => {
    const {updateCardTitle, loadComments, setCover, removeCover, isUploading} = useListContext()
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [loading, setLoading] = useState(true)
    const [coverLoadingText, setCoverLoadingText] = useState()
    const titleRef = useRef()
    const imgRef = useRef()


    const loadCardData = async () => {
        await loadComments(listId, id)
        setLoading(false)
    }

    useEffect(() => {
        loadCardData()
    }, [])
    
    const updateTitle = e => {
        e.preventDefault()
        const cardTitle = titleRef.current.value.trim()
        if(!cardTitle)    return
        if(cardTitle === title){
            setIsEditingTitle(false)
            return
        }
        updateCardTitle(id, cardTitle, listId)
        setIsEditingTitle(false)
    }

    const handleImageUpload = e => {
        const image = e.target.files[0]
        if(image && image.type.substr(0, 5) === 'image'){
            const reader = new FileReader()
            reader.onloadend = function () {
                setCover(reader.result.toString(), id, listId)
            }
            reader.readAsDataURL(image)
        }
    }

    const removeCardCover = () => {
        removeCover(cover, id, listId)
    }
  return (
    <Modal 
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent maxWidth="700px" minHeight="500px">
            
          <ModalCloseButton
            sx={{
                backgroundColor: "#3182ce",
                color: "#FFF",
                "&:hover": {
                    backgroundColor: "#3074b3"
              },
              "&:active": {
                backgroundColor: "#2e5b85"
              },
            }}
            />
            <ModalBody pt={5} pb={5} width="100%">
                    {
                        cover && (
                            <Image
                                width="100%"
                                height="160px"
                                bg="#80808024"
                                borderRadius="12px"
                                mb={3}
                                src={cover.url}
                                objectFit='contain'
                            />
                        )
                    }
                    <Grid templateColumns='3fr 1fr' gap='15px'>
                        <GridItem>
                            {
                            isEditingTitle ? (
                                <form onSubmit={updateTitle}>
                                    <Input 
                                        ref={titleRef} 
                                        defaultValue={title} 
                                        mb={1}
                                    />
                                    <Button 
                                        type="submit"
                                        size='xs'
                                        colorScheme={'blue'}
                                    ><AiOutlineCheck /></Button>
                                    <Button 
                                        size='xs' 
                                        ml={1}
                                        onClick={() => setIsEditingTitle(false)}
                                    ><MdClose /></Button>
                                </form>
                                ) : (
                                <Flex onClick={() => setIsEditingTitle(true)} cursor="text" >
                                <Text 
                                    fontFamily="'Noto Sans', serif"
                                    fontWeight="400"
                                    fontSize="16px"
                                >{title}</Text>
                                </Flex>
                            )
                            }
                            <Text as="span"
                            fontSize="11px"
                            fontFamily="'Poppins', sans-serif"
                            fontWeight="600"
                            color="#BDBDBD"
                            >in list &nbsp;<Text as="span" color="#000">{listTitle}</Text>
                            </Text>
                            <br />
                            <CardDescription 
                                id={id}
                                listId={listId}
                                description={description}
                            />
                            {
                                !loading ? (
                                    <CommentInput
                                        comments={comments}
                                        id={id}
                                        listId={listId}
                                    />
                                ) : (
                                    <Box padding='4' boxShadow='lg' bg='white'>
                                        <SkeletonCircle size='10' />
                                        <SkeletonText mt='4' noOfLines={3} spacing='2' />
                                    </Box>
                                )
                            }
                        </GridItem>
                        <GridItem
                            marginTop='20px'
                            sx={{
                                "& > button": {
                                    color: "#828282",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                }
                            }}
                        >
                            <HStack
                                fontSize={11}
                                fontWeight={500}
                                color="#BDBDBD"
                                fontFamily="'Poppins', sans-serif"
                                mb={3}
                            >
                                <FaUserCircle />
                                <Text>Actions</Text>
                            </HStack>
                            <AddMemberToCard
                                members={members}
                                id={id}
                                listId={listId}
                            >
                                <Button
                                    width="100%"
                                    justifyContent='flex-start'
                                    leftIcon={<MdPeople />}
                                    size='sm'
                                    mb={2}
                                >Members</Button>
                            </AddMemberToCard>
                            
                            <input
                                type="file" 
                                ref={imgRef} style={{display: 'none'}}
                                onChange={handleImageUpload}
                            />
                            {
                                cover ? (
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            width="100%"
                                            leftIcon={<MdImage />}
                                            textAlign="start"
                                            size='sm'
                                            isLoading={isUploading}
                                            loadingText={coverLoadingText}
                                        >
                                            Cover
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={()=>{
                                                setCoverLoadingText("Updating")
                                                imgRef.current.click()
                                            }}>Update Cover</MenuItem>
                                            <MenuItem onClick={()=>{
                                                setCoverLoadingText("Removing")
                                                removeCardCover()
                                            }}>Remove</MenuItem>
                                        </MenuList>
                                    </Menu>
                                ) : (
                                    <Button
                                        width="100%"
                                        leftIcon={<MdImage />}
                                        justifyContent='flex-start'
                                        size='sm'
                                        isLoading={isUploading}
                                        loadingText="Uploading"
                                        onClick={()=>imgRef.current.click()}
                                    >Cover</Button>
                                )
                            }
                        </GridItem>
                    </Grid>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default CardModal