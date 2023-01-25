import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import BoardDrawer from "./BoardDrawer";

const BoardMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        color="#828282"
        leftIcon={<IoEllipsisHorizontalSharp />}
        onClick={onOpen}
        style={{
          fontSize: 12,
        }}
      >
        Show Menu
      </Button>
      {isOpen && <BoardDrawer isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default BoardMenu;
