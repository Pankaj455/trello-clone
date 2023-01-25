import {
  Avatar,
  Button,
  Container,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "../../../context/userContext";
import { months } from "../../../utils/util";

const Comment = ({ comment, deleteComment }) => {
  const { _id } = useAppContext();
  let { commentedAt } = comment;
  commentedAt = new Date(commentedAt);
  const date = commentedAt.getDate();
  const month = commentedAt.getMonth();
  const hour = commentedAt.getHours();
  const minute = commentedAt.getMinutes();

  return (
    <Container p={3} backgroundColor="#d3d3d326" borderRadius="12px" mb={4}>
      <HStack spacing={4} mb={3}>
        <Avatar
          size="sm"
          name={comment.user.name}
          src={typeof comment.user === Object ? comment.user.avatar?.url : ""}
        />
        <VStack
          fontFamily="'Poppins', sans-serif"
          spacing={0}
          alignItems="flex-start"
          flexGrow={1}
        >
          <Text fontSize={12} fontWeight={600} color="#333">
            {comment.user.name}
          </Text>
          <Text
            fontSize={10}
            fontWeight={500}
            color="#bdbdbd"
          >{`${date} ${months[month]} at ${hour}:${minute}`}</Text>
        </VStack>
        {comment.user._id === _id && (
          <Popover>
            <PopoverTrigger>
              <IconButton
                icon={<MdDelete />}
                variant="ghost"
                size="sm"
                color="#828282"
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                Are you sure want to delete? There is no undo.
              </PopoverBody>
              <PopoverFooter border="0" display="flex" pb={4}>
                <Button
                  colorScheme="red"
                  flexGrow="1"
                  size="sm"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        )}
      </HStack>
      <Text
        style={{
          fontFamily: "'Noto Sans', serif",
          fontSize: "14px",
          fontWeight: "400",
        }}
      >
        {comment.comment}
      </Text>
    </Container>
  );
};

export default Comment;
