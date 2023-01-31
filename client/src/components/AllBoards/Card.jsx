import React, { useRef } from "react";
import {
  Image,
  AvatarGroup,
  Avatar,
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { TbDotsVertical } from "react-icons/tb";
import { useAppContext } from "../../context/userContext";

const Card = ({ board }) => {
  const { deleteBoard, updateBoard, _id: userId } = useAppContext();
  const coverRef = useRef();
  const removeBoard = () => {
    console.log("board has been deleted");
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    if (image && image.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = function () {
        updateBoard({
          newCover: reader.result,
          prevCover: board.cover,
          board_id: board._id,
        });
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <Box
      sx={{
        width: "243px",
        minHeight: "243px",
        background: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        borderRadius: "0.75em",
        padding: "0.75em",
        cursor: "pointer",
        flexBasis: "243px",
        transition: "all 0.3s",

        "&:hover": {
          boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.12)",
          transform: "scale(1.01)",
        },
      }}
    >
      <Box
        sx={{
          height: "130px",
          marginBottom: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(201, 217, 208)",
          background:
            "linear-gradient(90deg, rgba(201, 217, 208, 1) 0%,rgba(219, 243, 229, 1) 33%,rgba(213, 220, 217, 1) 65%)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {board.cover && (
          <Image
            src={board.cover.url}
            height="100%"
            width="100%"
            fit="cover"
            alt="board-cover"
          />
        )}
      </Box>
      <h3
        style={{
          fontSize: "16px",
          fontFamily: '"Noto Sans", serif',
          fontWeight: 500,
          marginBottom: "1.5em",
        }}
      >
        {board.title}
      </h3>
      <Flex justifyContent="space-between">
        <AvatarGroup
          size="sm"
          max={3}
          spacing={board.members.length <= 3 ? 1 : -2}
        >
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
        {board.admin === userId && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<TbDotsVertical />}
              variant="ghost"
            />
            <Portal>
              <MenuList
                fontFamily={"'Poppins', sans-serif"}
                fontSize="12px"
                fontWeight={500}
              >
                <input
                  ref={coverRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  onClick={(e) => e.stopPropagation()}
                />
                <MenuItem onClick={() => deleteBoard(board._id)}>
                  Delete Board
                </MenuItem>
                <MenuItem onClick={() => coverRef.current.click()}>
                  Update Cover
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};

export default Card;
