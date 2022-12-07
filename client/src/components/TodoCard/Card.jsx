import { 
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Flex,
  Heading,
  Box,
  HStack,
  Image,
  Stack,
  useDisclosure
} from "@chakra-ui/react"
import { AiOutlinePlus } from 'react-icons/ai'
import AddMemberToCard from "../AddMemberToCard/AddMemberToCard"
import CardModal from "../CardModal/CardModal"
import useAuth from '../../hooks/useAuth'


const Card = ({id, listId, listTitle, title, cover, labels, comments, members, description, index}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {isAdmin} = useAuth()

  return (
    <Stack
      direction="column"
      width="100%"
      backgroundColor="#fff"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
      borderRadius="12px"
      padding="12px 12px 20px 12px"
      cursor="pointer"
      onClick={onOpen}
    >
      {
        isOpen ? (
          <CardModal
            id={id}
            listId={listId}
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            listTitle={listTitle}
            description={description}
            comments={comments}
            members={members}
            cover={cover}
            index={index}
          />
        ) : null
      }
      {
        cover && (
          <Box
            width="100%"
            borderRadius="12px"
            overflow="hidden"
            display='flex'
            justifyContent='center'
          >
            <Image
              src={cover.url}
              alt="card-cover"
            />
          </Box>
        )
      }
      <Heading
        as="h5" 
        size="sm"
        fontFamily="'Noto Sans', serif"
        fontWeight={500}
        lineHeight="22px"
        style={{
          marginBottom: 8
        }}
      >{title}</Heading>
      {
        labels?.length > 0 && (
          <Flex 
            direction="row"
            flexWrap="wrap"
            gap="10px"
            style={{
              marginBottom: 24
            }}
          >
            {
              labels?.map((label, index) => {
                return <Badge
                  key={index} 
                  padding="2px 12px"
                  textTransform="capitalize"
                  borderRadius="8px"
                  fontFamily="'Noto Sans', serif"
                  fontSize="10px"
                  fontWeight={500}
                  backgroundColor={label.theme.bg}
                  color={label.theme.color}
                >{label.name}</Badge>
              })
            }
          </Flex>
        )
      }
      <Flex
        direction="row"
        gap={1}
      >
        <AvatarGroup size="sm" max={2}>
        {
          members?.map(member => {
            return <Avatar
              key={member._id}
              name={member.name}
              src={member.avatar?.url}
            />
          })
        }
        </AvatarGroup>
        {
          isAdmin && (
            <AddMemberToCard
              id={id}
              listId={listId}
              members={members}
            >
              <Button
                size='sm'
                colorScheme='blue'
                borderRadius="10px"
                fontSize="16px"
                onClick={e => e.stopPropagation()}
              >
                <AiOutlinePlus />
              </Button>
            </AddMemberToCard>
          )
        }
      </Flex>
    </Stack>
  )
}

export default Card