import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Text,
  Grid,
  Select,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useState } from "react";
import { useListContext } from "../../context/listContext";

const Movecard = ({ listId, listTitle, index, card_id }) => {
  const { allLists, moveCard } = useListContext();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [selectedList, setSelectedList] = useState(listId);
  const [currPosition, setCurrPosition] = useState(index);

  const currList = useMemo(
    () => allLists.filter((list) => list._id === selectedList)[0],
    [allLists, selectedList]
  );
  const totalCards = currList.cards.length;
  if (currPosition > totalCards) {
    setCurrPosition(totalCards);
  }

  const positions = useMemo(
    () =>
      Array.from(
        { length: selectedList === listId ? totalCards : totalCards + 1 },
        (_, i) => i + 1
      ),
    [selectedList, listId, totalCards]
  );

  const move = () => {
    moveCard(listId, selectedList, index, currPosition, card_id);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start">
      <PopoverTrigger>
        <Button size="xs" variant="link" color="#000" onClick={onToggle}>
          {listTitle}
        </Button>
      </PopoverTrigger>
      <PopoverContent boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)" color="#000">
        <PopoverCloseButton />
        <PopoverHeader
          textAlign="center"
          fontFamily="'Noto Sans', serif"
          fontSize="14px"
          fontWeight="400"
        >
          Move Card
        </PopoverHeader>
        <PopoverBody>
          <Text
            fontFamily="'Noto Sans', serif"
            fontSize={14}
            fontWeight={500}
            mb={2}
          >
            Select Destination
          </Text>
          <Grid templateColumns="repeat(6, 1fr)" gap={2} mb={2}>
            <GridItem colSpan={4}>
              <Text fontSize="12px" fontWeight="400">
                List
              </Text>
              <Select
                size="sm"
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
              >
                {allLists.map((list) => {
                  return (
                    <option key={list._id} value={list._id}>{`${list.title} ${
                      list._id === listId ? "*" : ""
                    }`}</option>
                  );
                })}
              </Select>
            </GridItem>
            <GridItem colSpan={2}>
              <Text fontSize="12px" fontWeight="400">
                Position
              </Text>
              <Select
                size="sm"
                value={currPosition}
                onChange={(e) => setCurrPosition(e.target.value)}
              >
                {positions.map((position, cardIndex) => {
                  return (
                    <option key={cardIndex} value={cardIndex}>{`${position} ${
                      selectedList === listId && cardIndex === index ? "*" : ""
                    }`}</option>
                  );
                })}
              </Select>
            </GridItem>
          </Grid>
          <Button
            colorScheme="blue"
            size="sm"
            fontWeight="normal"
            onClick={move}
          >
            Move
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Movecard;
