import { Box, Button, Flex, Input, Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import List from "./List";
import axios from "../../axios";
import { customScrollbar } from "../../utils/util";
import { useListContext } from "../../context/listContext";

const ListContainer = ({ boards }) => {
  const { addNewList, clearAllLists, loadAllLists, allLists } =
    useListContext();
  const [addingList, setAddingList] = useState(false);
  const [loading, setLoading] = useState(false);
  const listInputRef = useRef(null);
  const { id: location } = useParams();

  // console.log(allLists);
  const lists = allLists;
  // console.log(lists);

  useEffect(() => {
    loadAllLists(location);
    return () => {
      // console.log("unmounting");
      clearAllLists();
    };
  }, []);

  const createNewList = async (e) => {
    e.preventDefault();
    const title = listInputRef.current.value;
    if (!title.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "/board/list/new",
        { title, board_id: location },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        addNewList({
          board_id: location,
          newList: {
            _id: response.data._id,
            title,
            cards: [],
          },
        });
      }
      // addNewList({
      //     board_id: location.state,
      //     newList: {
      //         _id: response.data._id,
      //         title,
      //         cards: []
      //     }
      // })
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
      setAddingList(false);
    }
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
      {lists &&
        lists.map((li, index) => {
          return (
            <List key={li._id} list={li} index={index} board_id={location} />
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
    </Flex>
  );
};

export default ListContainer;
