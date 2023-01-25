import React, { useState, useEffect } from "react";
import Card from "../BoardCard/Card";
import CreateBoard from "../CreateBoard/CreateBoard";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppContext } from "../../context/userContext";

const AllBoards = () => {
  const { loadUser, boards, loadingUser } = useAppContext();
  const { isOpen, onClose, onOpen } = useDisclosure();
  // const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (loadingUser) {
      loadUser();
    }
  }, []);

  return (
    <>
      {!loadingUser ? (
        <>
          <Header />
          <section
            style={{
              backgroundColor: "#F8F9FD",
              minHeight: "calc(100vh - 70px)",
            }}
          >
            {isOpen && <CreateBoard isOpen={isOpen} onClose={onClose} />}
            <Box
              maxWidth="1200px"
              padding="2em 5em"
              margin="0 auto"
              backgroundColor="#f8f9fd"
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                marginBottom="2.2em"
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                    color: "#333",
                  }}
                >
                  All Boards
                </h3>
                <Button
                  colorScheme="blue"
                  leftIcon={<AiOutlinePlus />}
                  size="sm"
                  onClick={onOpen}
                >
                  Add
                </Button>
              </Flex>
              <Flex gap="1.2em" flexWrap="wrap">
                {boards.map((board) => {
                  return <Card key={board._id} board={board} />;
                })}
              </Flex>
            </Box>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AllBoards;
