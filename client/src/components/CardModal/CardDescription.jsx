import { Button, ButtonGroup, Textarea, Box } from "@chakra-ui/react";
import { useRef } from "react";
import { useState } from "react";
import { MdAdd, MdDescription, MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useListContext } from "../../context/listContext";
import useAuth from "../../hooks/useAuth";
import { customScrollbar } from "../../utils/util";

const CardDescription = ({ id, listId, description }) => {
  const { updateCard } = useListContext();
  const descriptionRef = useRef();
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id: boardId } = useParams();

  const { isAdmin } = useAuth();

  const updateCardDescription = async () => {
    const cardDescription = descriptionRef.current.value.trim();
    if (cardDescription === description) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    await updateCard({
      id,
      description: cardDescription,
      list_id: listId,
      board_id: boardId,
    });
    setSaving(false);
    setIsEditing(false);
  };
  return (
    <Box marginBottom="40px">
      <ButtonGroup fontFamily="'Poppins', sans-serif" spacing={4} mt={3} mb={3}>
        <Button
          variant="text"
          size="xs"
          leftIcon={<MdDescription />}
          p={0}
          color="#bdbdbd"
          fontSize={14}
          fontWeight={500}
          cursor="auto"
        >
          Description
        </Button>
        {isAdmin && (
          <Button
            variant="outline"
            size="xs"
            leftIcon={description ? <MdEdit /> : <MdAdd />}
            fontSize={10}
            fontWeight={500}
            color="#828282"
            disabled={isEditing}
            onClick={() => setIsEditing(true)}
          >
            {description ? "Edit" : "Add"}
          </Button>
        )}
      </ButtonGroup>
      {isEditing ? (
        <>
          <Textarea
            fontSize={14}
            fontFamily="'Noto Sans', serif"
            fontWeight={400}
            height="80px"
            autoFocus
            mb={2}
            ref={descriptionRef}
            defaultValue={description}
            sx={customScrollbar}
          />
          <ButtonGroup
            fontFamily="'Poppins', sans-serif"
            size="sm"
            spacing={3}
            mb={5}
          >
            <Button
              isLoading={saving}
              loadingText="Saving"
              bg="#219653"
              fontSize={11}
              fontWeight={400}
              color="#fff"
              _hover={{
                bg: "#219653c1",
              }}
              borderRadius={10}
              onClick={updateCardDescription}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              color="#828282"
              fontSize={11}
              fontWeight={400}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </>
      ) : (
        description && (
          <pre
            style={{
              fontFamily: "'Noto Sans', serif",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "19px",
              whiteSpace: "pre-line",
              marginBottom: 20,
            }}
          >
            {description}
          </pre>
        )
      )}
    </Box>
  );
};

export default CardDescription;
