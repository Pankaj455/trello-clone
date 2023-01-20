import {
  Avatar,
  Button,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "../../axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { useAppContext } from "../../context/userContext";
import { useParams } from "react-router-dom";
import { customScrollbar } from "../../utils/util";
import { useListContext } from "../../context/listContext";

const InviteCard = () => {
  const { _id, boards, addMemberToBoard, isLoading } = useAppContext();
  const { removeMemberFromBoard } = useListContext();
  const { onClose } = useDisclosure();
  const inputRef = useRef("");
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const board = boards.filter((board) => board._id === id)[0];

  const findUsers = async () => {
    const query = inputRef.current.value.trim();
    if (query.length) {
      setIsFetching(true);
      const response = await axios.get(`/user/search/${query}`, {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
      setIsFetching(false);
      if (!hasSearched) setHasSearched(true);
    }
  };

  const addMember = (user) => {
    addMemberToBoard(user, board._id);
  };

  const removeMember = (user) => {
    removeMemberFromBoard(user, board._id);
  };

  const onPopoverClose = () => {
    onClose();
    inputRef.current.value = "";
    setUsers([]);
    setHasSearched(false);
  };

  return (
    <Popover
      placement="bottom-end"
      initialFocusRef={inputRef}
      onClose={onPopoverClose}
    >
      <PopoverTrigger>
        <Button size="sm" colorScheme="blue" ml={2}>
          <AiOutlinePlus />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Heading
            as="h5"
            fontFamily={"'Poppins', sans-serif"}
            fontSize="12px"
            fontWeight={600}
            lineHeight="18px"
          >
            Invite to Board
          </Heading>

          <Text
            fontSize="12px"
            fontFamily={"'Noto Sans', serif"}
            color="#828282"
            mb={3}
          >
            Search users you want to invite to
          </Text>
          <Stack
            direction="row"
            mb={4}
            style={{
              boxShadow: "0 4px 4px rgba(0, 0, 0, 0.08)",
              borderRadius: "4px",
              padding: "2px",
            }}
          >
            <Input
              ref={inputRef}
              placeholder="User..."
              size="sm"
              style={{
                boxShadow: "none",
                border: "none",
              }}
            />
            <IconButton
              icon={<AiOutlineSearch />}
              size="sm"
              colorScheme="blue"
              onClick={findUsers}
              isLoading={isFetching}
            />
          </Stack>

          {users.length > 0 ? (
            <Stack
              direction="column"
              p={4}
              gap={1}
              mb={4}
              border="1px solid #E0E0E0"
              borderRadius="8px"
              maxHeight="200px"
              overflow="auto"
              sx={customScrollbar}
            >
              {users.map((user) => (
                <Stack
                  key={user._id}
                  direction="row"
                  alignItems="center"
                  gap={3}
                >
                  <Avatar
                    size="sm"
                    name={user.name}
                    // src={boardMember.avatar?.url}
                  />
                  <Text
                    fontSize={14}
                    fontWeight={500}
                    fontFamily="'Poppins', sans-serif"
                    flex={1}
                  >
                    {user.name}
                  </Text>
                  {user._id !== _id &&
                  board.members.filter((member) => member._id === user._id)
                    .length === 0 ? (
                    <Button
                      size="xs"
                      colorScheme="blue"
                      onClick={() => addMember(user)}
                      // isLoading={isLoading}
                      // loadingText="Inviting..."
                    >
                      Invite
                    </Button>
                  ) : user._id !== _id ? (
                    <Button
                      size="xs"
                      variant="outline"
                      colorScheme="orange"
                      onClick={() => removeMember(user)}
                      // isLoading={isLoading}
                      // loadingText="Removing..."
                    >
                      Remove
                    </Button>
                  ) : (
                    <Text
                      fontFamily="'Poppins', sans-serif"
                      fontSize={12}
                      fontStyle="italic"
                      fontWeight={500}
                      color="#bdbdbd"
                    >
                      Admin
                    </Text>
                  )}
                </Stack>
              ))}
            </Stack>
          ) : (
            hasSearched && <Text color="#828282">No user found...</Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default InviteCard;
