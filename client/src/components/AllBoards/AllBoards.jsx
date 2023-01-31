import React, { useEffect } from "react";
import Card from "./Card";
import CreateBoard from "./CreateBoard";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppContext } from "../../context/userContext";
import { Link } from "react-router-dom";

const AllBoards = () => {
  const { loadUser, boards, isLoading } = useAppContext();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      {!isLoading ? (
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
              {boards.length === 0 ? (
                <Flex
                  backgroundColor="#EDF2F788"
                  borderRadius="16px"
                  padding="3em 6em"
                  color="#828282"
                  fontFamily="'Noto Sans', serif"
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                  cursor="pointer"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#edf2f7",
                    },
                    "&:active": {
                      backgroundColor: "#edf2f788",
                    },
                  }}
                  onClick={onOpen}
                >
                  <AiOutlinePlus />
                  <p style={{ userSelect: "none" }}>Create Your first Board</p>
                </Flex>
              ) : (
                <Flex gap="1.2em" flexWrap="wrap">
                  {boards.map((board) => {
                    return (
                      <Link
                        key={board._id}
                        to={`/boards/${board._id}`}
                        onClick={(e) => {
                          if (
                            e.target.localName === "svg" ||
                            e.target.localName === "button"
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Card board={board} />
                      </Link>
                    );
                  })}
                </Flex>
              )}
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
