import { Button, ButtonGroup, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppContext } from "../../context/userContext";

const EditDescription = ({ setEdit, boardId, description }) => {
  const { updateBoard, isLoading } = useAppContext();

  const [value, setValue] = useState(description);

  const saveDescription = async () => {
    const newDescription = value.trim();
    if (newDescription === description) {
      setEdit(false);
      return;
    }

    const data = { description: newDescription, board_id: boardId };

    await updateBoard(data);
    setEdit(false);
  };

  return (
    <>
      <Textarea
        resize="none"
        fontSize={14}
        fontFamily="'Noto Sans', serif"
        fontWeight={400}
        autoFocus
        height="250px"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <ButtonGroup
        fontFamily="'Poppins', sans-serif"
        size="sm"
        spacing={3}
        mb={5}
      >
        <Button
          isLoading={isLoading}
          loadingText="Saving"
          bg="#219653"
          fontSize={11}
          fontWeight={400}
          color="#fff"
          _hover={{
            bg: "#219653c1",
          }}
          borderRadius={10}
          onClick={saveDescription}
        >
          Save
        </Button>
        <Button
          variant="ghost"
          color="#828282"
          fontSize={11}
          fontWeight={400}
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </>
  );
};

export default EditDescription;
