import { useAppContext } from "../context/userContext";
import Header from "../components/Header/Header";
import { AvatarGroup, Avatar, Tooltip, Flex, Box } from "@chakra-ui/react";
import { useParams, Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import BoardMenu from "../components/BoardMenu/BoardMenu";
import ListContainer from "../components/List/ListContainer";
import useAuth from "../hooks/useAuth";
import InviteCard from "../components/InviteToBoard/InviteCard";
import { useMemo } from "react";

const Board = () => {
  const { _id, boards } = useAppContext();
  const { id: location } = useParams();
  const { isAdmin } = useAuth();
  const board = useMemo(
    () => boards.filter((board) => board._id === location)[0],
    [boards, location]
  );
  const isMember = useMemo(
    () => board?.members.filter((member) => member._id === _id)[0],
    [board, _id]
  );
  if (!_id) return <Loader />;

  return isMember || isAdmin ? (
    <>
      <Header />
      <Box padding="2.2em 1.5em 0 1.5em" maxWidth="1400px" margin="0 auto">
        <Flex marginBottom="24px">
          <Flex marginLeft="8px" flexGrow={1}>
            <AvatarGroup size="sm" spacing={2} max={6}>
              {board.members.map((member) => {
                return (
                  <Avatar
                    key={member._id}
                    name={member.name}
                    src={member.avatar?.url}
                  />
                );
              })}
            </AvatarGroup>
            {isAdmin &&
              (board.members.length === 0 ? (
                <Tooltip hasArrow label="Invite" bg="blue.400" placement="top">
                  <InviteCard />
                </Tooltip>
              ) : (
                <InviteCard />
              ))}
          </Flex>
          <BoardMenu />
        </Flex>
        <ListContainer boards={boards} />
      </Box>
    </>
  ) : (
    <Navigate to="/boards" />
  );
};

export default Board;
