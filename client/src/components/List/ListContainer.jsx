import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import List from "./List";
import { customScrollbar } from "../../utils/util";
import { useListContext } from "../../context/listContext";
import Loader from "../Loader/Loader";

const ListContainer = () => {
  const { addNewList, clearAllLists, loadAllLists, allLists, isUploading } =
    useListContext();
  const [addingList, setAddingList] = useState(false);
  const [loading, setLoading] = useState(false);
  const listInputRef = useRef(null);
  const { id: location } = useParams();

  const lists = allLists;

  useEffect(() => {
    loadAllLists(location);
    return () => {
      clearAllLists();
    };
  }, []);

  const createNewList = async (e) => {
    e.preventDefault();
    const title = listInputRef.current.value;
    if (!title.trim()) return;
    setLoading(true);
    await addNewList({
      board_id: location,
      title,
    });

    setLoading(false);
    setAddingList(false);
  };

  return (
    <Flex
      flexDirection="row"
      gap={10}
      backgroundColor="#F8F9FD"
      borderRadius="24px"
      padding="28px 24px"
      maxHeight="calc(100vh - 140px)"
      minHeight="calc(100vh - 140px)"
      overflowX="auto"
      sx={customScrollbar}
    >
      {isUploading ? (
        <Flex
          height="200px"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Loader width="80px" />
        </Flex>
      ) : (
        <>
          {lists &&
            lists.map((li, index) => {
              return (
                <List
                  key={li._id}
                  list={li}
                  index={index}
                  board_id={location}
                />
              );
            })}
          <Box w="260px" height="fit-content" flexShrink={0}>
            {addingList ? (
              <>
                <form onSubmit={createNewList}>
                  <Input ref={listInputRef} bg="white" mb={1} autoFocus />
                  <Button
                    size="sm"
                    type="submit"
                    colorScheme="blue"
                    isLoading={loading}
                    loadingText="Adding..."
                  >
                    Add list
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    ml={2}
                    onClick={() => setAddingList(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </>
            ) : (
              <Button
                leftIcon={<MdAdd />}
                width="100%"
                justifyContent="flex-start"
                fontFamily="'Noto Sans', serif"
                fontSize="14px"
                fontWeight="500"
                color="#2F80ED"
                bg="#DAE4FD"
                _hover={{
                  bg: "#DAE4FDc2",
                }}
                onClick={() => setAddingList(true)}
              >
                Add {lists?.length === 0 ? "a" : "another"} list
              </Button>
            )}
          </Box>
        </>
      )}
    </Flex>
  );
};

export default ListContainer;
