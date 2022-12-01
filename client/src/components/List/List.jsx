import {
    Text,
    VStack,
    HStack,
    MenuList,
    Menu,
    MenuButton,
    MenuItem,
    Divider,
    Button,
    Box,
    Input,
    Textarea
} from "@chakra-ui/react"
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { MdAdd } from 'react-icons/md'
import { useRef, useState } from "react"
import Card from "../TodoCard/Card"
import { useListContext } from "../../context/listContext"

const List = ({list, board_id}) => {
    const {updateListTitle, deleteListFromBoard, createCard} = useListContext()
    const [editTitle, setEditTitle] = useState(false)
    const [addingCard, setAddingCard] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const titleRef = useRef(list.title)
    const cardTitleRef = useRef()

    const cards = list.cards

    const createNewCard = e => {
        e.preventDefault()
        const title = cardTitleRef.current.value.trim()
        if(!title)  return;
        setIsLoading(true)
        createCard(title, list._id, board_id)
        setIsLoading(false)
        setAddingCard(false)
    }

    const renameListTitle = (e) => {
        e.preventDefault()
        const title = titleRef.current.value
        if(!title.trim()){
            return
        }
        else if(title.trim() === list.title){
            setEditTitle(false)
            return
        }
        setIsLoading(true)
        updateListTitle(title, list._id, board_id)
        setIsLoading(false)
        setEditTitle(false)
        
    }

    const deleteList = () => {
        deleteListFromBoard(list._id, board_id)
    }

  return (
    <Box w='260px'
        height='fit-content'
        flexShrink={0}
    >
        <HStack mb={4} justifyContent='space-between' alignItems='flex-start'>
            {
                editTitle ? (
                    <form onSubmit={renameListTitle}>
                        <Input 
                            ref={titleRef}
                            defaultValue={list.title}
                            width="100%"
                            mb={1}
                        />
                        <Button
                            size='sm'
                            type='submit'
                            colorScheme='blue'
                            loadingText="Saving"
                            isLoading={isLoading}
                            onClick={renameListTitle}
                        >Save</Button>
                        <Button
                            size='sm'
                            variant='outline'
                            ml={2}
                            onClick={()=> setEditTitle(false)}
                        >Cancel</Button>
                    </form>
                ) : (
                    <Text
                        fontFamily="'Poppins', sans-serif"
                        fontSize="14px"
                        fontWeight={500}
                        width='25ch'
                    >{list.title ?? "Title not found"}</Text>
                )
            }
            <Menu>
                <MenuButton
                    size='sm'
                ><IoEllipsisHorizontalSharp />
                </MenuButton>
                <MenuList 
                    fontFamily="'Poppins', sans-serif"
                    fontSize="12px"
                    fontWeight={500}
                    overflow='none'
                >
                    <MenuItem onClick={()=> setEditTitle(true)}>Rename</MenuItem>
                </MenuList>
            </Menu>
        </HStack>
        <VStack gap={6}>
            {
                cards?.map(card =>
                    <Card
                        key={card._id}
                        id={card._id}
                        listId={list._id}
                        listTitle={list.title}
                        title={card.title}
                        cover={card.cover}
                        members={card.members}
                        labels={card.labels}
                        comments={card.comments}
                        description={card.description ?? ''}
                    />
                )
            }
            {
                addingCard ? (
                    <>
                        <form onSubmit={createNewCard}>
                            <Textarea
                                ref={cardTitleRef}
                                defaultValue=""
                                placeholder="Enter a title..."
                                mb={1}
                                bg='white'
                                fontFamily="'Poppins', sans-serif"
                                fontSize="14px"
                                resize="none"
                                minHeight="70px"
                            />
                            <Button
                                size='sm'
                                type='submit'
                                colorScheme='blue'
                                loadingText="Adding"
                                isLoading={isLoading}
                            >Add Card</Button>
                            <Button
                                size='sm'
                                variant='outline'
                                ml={2}
                                onClick={() => setAddingCard(false)}
                            >Cancel</Button>
                        </form>
                    </>
                ) : (
                    <Button
                        leftIcon={<MdAdd />}
                        width='100%'
                        justifyContent='flex-start'
                        fontFamily="'Noto Sans', serif"
                        fontSize='14px'
                        fontWeight='500'
                        color='#2F80ED'
                        bg='#DAE4FD'
                        _hover={{
                        bg: '#DAE4FDc2'
                        }}
                        onClick={()=> setAddingCard(true)}
                    >Add {cards?.length === 0 ? "a" : "another"} card</Button>
                )
            }
        </VStack>
    </Box>
  )
}

export default List