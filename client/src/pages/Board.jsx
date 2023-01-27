import { useAppContext } from "../context/userContext";
import Header from "../components/Header/Header";
import { AvatarGroup, Avatar, Tooltip, Flex, Box } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import BoardMenu from "../components/BoardMenu/BoardMenu";
import ListContainer from "../components/List/ListContainer";
import useAuth from "../hooks/useAuth";
import InviteCard from "../components/InviteToBoard/InviteCard";

const Board = () => {
  const { _id, boards, isLoading } = useAppContext();
  const { id: location } = useParams();
  const navigate = useNavigate();

  const board = boards.filter((board) => board._id === location);

  const { isAdmin } = useAuth();

  return !isLoading ? (
    board[0]?.members.filter((member) => member._id === _id) ? (
      <>
        <Header />
        <Box padding="2.2em 1.5em 0 1.5em">
          <Flex marginBottom="24px">
            <Flex marginLeft="8px" flexGrow={1}>
              <AvatarGroup size="sm" spacing={2}>
                {board[0].members.map((member) => {
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
                (board[0].members.length === 0 ? (
                  <Tooltip
                    hasArrow
                    label="Invite"
                    bg="blue.400"
                    placement="top"
                  >
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
      navigate("/boards")
    )
  ) : (
    <Loader />
  );
};

export default Board;
