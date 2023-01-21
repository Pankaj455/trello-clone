import { useAppContext } from "../../context/userContext";
import Header from "../Header/Header";
import Visibility from "../Visibility/Visibility";
import {
  Button,
  AvatarGroup,
  Avatar,
  Tooltip,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledBoard } from "./board.styled";
import Loader from "../Loader/Loader";
import BoardMenu from "../BoardMenu/BoardMenu";
import ListContainer from "../ListContainer/ListContainer";
import useAuth from "../../hooks/useAuth";
import { useListContext } from "../../context/listContext";
import InviteCard from "../InviteToBoard/InviteCard";

const Board = () => {
  const { _id, boards, loadingUser, loadUser, error } = useAppContext();
  const { moveCard } = useListContext();
  const location = useLocation();
  const navigate = useNavigate();

  const board = boards.filter((board) => board._id === location.state);

  const { isAdmin } = useAuth();

  return !loadingUser ? (
    board[0]?.members.filter((member) => member._id === _id) ? (
      <>
        <Header />
        <StyledBoard>
          <div className="row">
            {/* <Visibility /> */}
            <div className="members">
              <AvatarGroup size="sm" spacing={2}>
                {board[0].members.map((member) => {
                  return <Avatar key={member._id} name={member.name} />;
                })}
                {/* <Avatar size='sm' src='https://bit.ly/dan-abramov' />
              <Avatar size='sm' src='https://bit.ly/kent-c-dodds' />
              <Avatar size='sm' src='https://bit.ly/ryan-florence' />
              <Avatar size='sm' src='https://bit.ly/prosper-baba' /> */}
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
            </div>
            <BoardMenu />
          </div>
          <ListContainer boards={boards} />
        </StyledBoard>
      </>
    ) : (
      navigate("/boards")
    )
  ) : (
    <Loader />
  );
};

export default Board;
