import { useAppContext } from "../../context/userContext";
import Header from "../Header/Header";
import {
  Button,
  AvatarGroup,
  Avatar,
  Tooltip,
  Flex,
  Image,
  Box,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import BoardMenu from "../BoardMenu/BoardMenu";
import ListContainer from "../List/ListContainer";
import useAuth from "../../hooks/useAuth";
import { useListContext } from "../../context/listContext";
import InviteCard from "../InviteToBoard/InviteCard";

const Board = () => {
  const { _id, boards, loadingUser, loadUser, error } = useAppContext();
  const { moveCard } = useListContext();
  const { id: location } = useParams();
  const navigate = useNavigate();

  const board = boards.filter((board) => board._id === location);

  const { isAdmin } = useAuth();

  return !loadingUser ? (
    board[0]?.members.filter((member) => member._id === _id) ? (
      <>
        <Header />
        <Box padding="2.2em 1.5em 0 1.5em">
          <Flex marginBottom="24px">
            <Flex marginLeft="8px" flexGrow={1}>
              <AvatarGroup size="sm" spacing={2}>
                {board[0].members.map((member) => {
                  return <Avatar key={member._id} name={member.name} />;
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
