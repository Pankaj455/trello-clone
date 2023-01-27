import { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  Divider,
  HStack,
  Text,
  Avatar,
  VStack,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { MdAdd, MdClose, MdDescription, MdEdit } from "react-icons/md";
import { useAppContext } from "../../context/userContext";
import { useParams } from "react-router-dom";
import EditDescription from "./EditDescription";
import Loader from "../Loader/Loader";
import { useListContext } from "../../context/listContext";
import { formatDate } from "../../utils/util";

const BoardDrawer = ({ isOpen, onClose }) => {
  const {
    boards,
    _id: userId,
    admin,
    getAdminProfile,
    name,
    avatar,
  } = useAppContext();
  const { removeMemberFromBoard } = useListContext();
  const { id: location } = useParams();

  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const board = boards.filter((board) => board._id === location);
  const { description, createdAt } = board[0];

  const getAdminInfo = async (adminId) => {
    setIsLoading(true);
    await getAdminProfile(adminId);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!admin && board[0].admin !== userId) {
      getAdminInfo(board[0].admin);
    }
  }, []);

  return (
    <Drawer placement="right" size="xs" isOpen={isOpen} onClose={onClose}>
      <DrawerContent style={{ top: 70 }}>
        <DrawerHeader
          fontSize={12}
          fontWeight={600}
          fontFamily="'Poppins', sans-serif"
        >
          <span style={{ display: "inline", marginRight: "auto" }}>
            Board Menu
          </span>
          <Button onClick={onClose} size="sm" variant="ghost" fontSize="16px">
            <MdClose />
          </Button>
        </DrawerHeader>
        <Divider backgroundColor="#E0E0E0" mb={3} />
        {!isLoading ? (
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
              mb={!description && userId !== board[0].admin ? 0 : 3}
            >
              <Avatar
                size="sm"
                name={userId === board[0].admin ? name : admin?.name}
                src={
                  userId === board[0].admin ? avatar?.url : admin?.avatar?.url
                }
              />
              <VStack
                fontFamily="'Poppins', sans-serif"
                spacing={0}
                alignItems="flex-start"
              >
                <Text fontSize={12} fontWeight={600} color="#333">
                  {userId === board[0].admin ? name : admin?.name}
                </Text>
                <Text fontSize={10} fontWeight={500} color="#bdbdbd">
                  {`created at ${formatDate(createdAt)}`}
                </Text>
              </VStack>
            </HStack>
            <ButtonGroup
              fontFamily="'Poppins', sans-serif"
              spacing={4}
              mb={3}
              display={
                !description && userId !== board[0].admin
                  ? "none"
                  : "inline-flex"
              }
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
              >
                Description
              </Button>
              {userId === board[0].admin && (
                <Button
                  variant="outline"
                  size="xs"
                  leftIcon={description ? <MdEdit /> : <MdAdd />}
                  fontSize={10}
                  fontWeight={500}
                  color="#828282"
                  onClick={() => setEdit(!edit)}
                  disabled={edit}
                >
                  {description ? "Edit" : "Add"}
                </Button>
              )}
            </ButtonGroup>
            <br />
            {edit ? (
              <EditDescription
                setEdit={setEdit}
                boardId={location}
                description={description ?? ""}
              />
            ) : (
              description && (
                <pre
                  style={{
                    fontFamily: "'Noto Sans', serif",
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "19px",
                    whiteSpace: "pre-line",
                    marginBottom: 20,
                  }}
                >
                  {description}
                </pre>
              )
            )}

            {board.length && board[0].members.length > 0 && (
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
                >
                  Teams
                </Button>
                <Box>
                  {board[0].admin !== userId && admin && (
                    <HStack alignItems="center" mb={5}>
                      <HStack flexGrow={1} spacing={4}>
                        <Avatar size="xs" name={name} src={avatar?.url} />
                        <Text
                          fontSize={11}
                          fontWeight={500}
                          fontFamily="'Poppins', sans-serif"
                        >
                          {admin.name}
                        </Text>
                      </HStack>
                      <Text
                        fontFamily="'Poppins', sans-serif"
                        fontSize={11}
                        fontWeight={500}
                        color="#bdbdbd"
                      >
                        Admin
                      </Text>
                    </HStack>
                  )}
                  {board[0].members.map((member) => {
                    return (
                      <Box key={member._id}>
                        {member._id !== userId && (
                          <HStack key={member._id} alignItems="center" mb={5}>
                            <HStack flexGrow={1} spacing={4}>
                              <Avatar
                                size="xs"
                                name={member.name}
                                src={member.avatar?.url}
                              />
                              <Text
                                fontSize={11}
                                fontWeight={500}
                                fontFamily="'Poppins', sans-serif"
                              >
                                {member.name}
                              </Text>
                            </HStack>
                            {board[0].admin === userId && (
                              <Button
                                size="xs"
                                variant="outline"
                                colorScheme="orange"
                                onClick={() =>
                                  removeMemberFromBoard(
                                    { _id: member._id, name: member.name },
                                    board[0]._id
                                  )
                                }
                              >
                                Remove
                              </Button>
                            )}
                          </HStack>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </DrawerBody>
        ) : (
          <Loader width="50px" />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default BoardDrawer;
