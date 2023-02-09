import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Comment from "./Comment";
import { customScrollbar } from "../../../utils/util";
import { useRef, useState } from "react";
import { useListContext } from "../../../context/listContext";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../../context/userContext";
import { useParams } from "react-router-dom";

const CommentInput = ({ comments, id, listId }) => {
  const { name, avatar } = useAppContext();
  const { createNewComment, removeComment } = useListContext();
  const [loading, setLoading] = useState(false);
  const commentRef = useRef();
  const { id: boardId } = useParams();

  const createComment = async (e) => {
    e.preventDefault();
    const newComment = commentRef.current.value.trim();
    if (!newComment) return;
    commentRef.current.value = "";
    const newCommentObj = {
      _id: uuidv4(),
      comment: newComment,
      commentedAt: new Date(),
    };
    setLoading(true);
    await createNewComment(newCommentObj, id, listId, boardId);
    setLoading(false);
  };

  const deleteComment = (comment_id) => {
    removeComment(comment_id, id, listId, boardId);
  };

  return (
    <>
      <Flex
        direction="row"
        padding="12px"
        border="1px solid #E0E0E0"
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
        borderRadius="12px"
        marginBottom="35px"
        gap={1}
      >
        <Avatar size="sm" name={name} src={avatar?.url} />
        <form style={{ flex: 1 }} onSubmit={createComment}>
          <Textarea
            ref={commentRef}
            placeholder="Write a comment..."
            resize="none"
            outline="none"
            border="none"
            focusBorderColor="#fff"
            pr={0}
            fontSize={14}
            fontFamily="'Noto Sans', serif"
            fontWeight={400}
            height="60px"
            mb={2}
            sx={customScrollbar}
          />
          <Button
            type="submit"
            colorScheme="blue"
            display="block"
            size="sm"
            marginLeft="auto"
            isLoading={loading}
          >
            Comment
          </Button>
        </form>
      </Flex>
      <Container maxHeight="400px" overflow="auto" sx={customScrollbar}>
        <Text fontFamily="'Noto Sans', sans-serif" fontWeight="500">
          Comments
        </Text>
        <Divider marginBottom="20px" />
        {comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              comment={comment}
              deleteComment={deleteComment}
            />
          );
        })}
      </Container>
    </>
  );
};

export default CommentInput;
