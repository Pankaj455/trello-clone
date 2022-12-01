import React, {useState} from 'react'
import { Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  PopoverTrigger,
  Text,
  VStack,
  Box,
  useDisclosure
} from '@chakra-ui/react'
import { MdHttps, MdPublic } from 'react-icons/md'
import { StyledVisibility } from './visibility.styled'
import useAuth from '../../hooks/useAuth'

const Visibility = () => {
    const { isOpen, onToggle, onClose } = useDisclosure()
    const [visibility, setVisibility] = useState(false)

    const {isAdmin} = useAuth()
    
  return (
    <StyledVisibility>
        {
            isAdmin ? (
                <Popover
                        isOpen={isOpen}
                        onClose={onClose}
                        placement="bottom-end"
                    >
                    <PopoverTrigger>
                        <Button
                            color="#828282"
                            leftIcon={!visibility ? <MdHttps /> : <MdPublic />}
                            size="sm"
                            onClick={onToggle}
                        >
                        {
                            visibility ? "Public" : "Private"
                        }
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        p={1}
                        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.05)"
                        borderRadius="12px"
                        width={250}
                    >
                        <PopoverArrow />
                        <PopoverBody>
                        <Text className='visible title'>
                            Visibility
                        </Text>
                        <Text className='visible choose'>
                            Choose who can see to this board.
                        </Text>
                        <VStack alignItems="flex-start" mt={2}>
                            <Box 
                            className="visible-option"
                            onClick={()=> {
                                if(!visibility){
                                setVisibility(true)
                                onClose()
                                }
                            }}
                            >
                            <Text 
                                className='visible choose option-content'
                                mb={2}
                            >
                                <MdPublic />
                                Public
                            </Text>
                            <Text 
                                className="visible choose"
                                style={{
                                fontSize: "10px"
                                }}
                            >Anyone on the internet can see this.</Text>
                            </Box>
                            <Box 
                            className="visible-option"
                            onClick={()=> {
                                if(visibility){
                                setVisibility(false)
                                onClose()
                                }
                            }}
                            >
                            <Text 
                                className='visible choose option-content'
                                mb={2}
                                >
                                <MdHttps />
                                Private
                                </Text>
                            <Text
                                className="visible choose"
                                style={{
                                fontSize: "10px"
                                }}
                            >Only board members can see this.</Text>
                            </Box>
                        </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            ) : (
                <Button
                    color="#828282"
                    leftIcon={!visibility ? <MdHttps /> : <MdPublic />}
                    size="sm"
                    disabled
                    cursor="auto"
                    _disabled="inherit"
                >
                {
                    visibility ? "Public" : "Private"
                }
                </Button>
            )
        }
    </StyledVisibility>
  )
}

export default Visibility