import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Grid,
  GridItem,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import Loader from "../Loader/Loader";
import { MdClose, MdImage, MdPeople } from "react-icons/md";
import CardDescription from "./CardDescription";
import { useState, useRef } from "react";
import CommentInput from "./Comment/CommentInput";
import { FaUserCircle } from "react-icons/fa";
import { useListContext } from "../../context/listContext";
import AddMemberToCard from "./AddMemberToCard";
import { useEffect } from "react";
import Movecard from "./Movecard";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

const CardModal = ({
  index,
  id,
  listId,
  isOpen,
  onClose,
  listTitle,
  title,
  description,
  comments,
  members,
  cover,
}) => {
  const {
    updateCard,
    loadComments,
    setCover,
    updateCover,
    removeCover,
    isUploading,
    deleteCard,
  } = useListContext();
  const {
    isOpen: isPopoverOpen,
    onClose: onPopoverClose,
    onToggle: onPopoverToggle,
  } = useDisclosure();
  const { id: boardId } = useParams();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [coverLoadingText, setCoverLoadingText] = useState();
  const [isRemovingCard, setIsRemovingCard] = useState(false);
  const titleRef = useRef();
  const imgRef = useRef();

  const { isAdmin } = useAuth();

  const loadCardData = async () => {
    await loadComments(listId, id);
    setLoadingComments(false);
  };

  useEffect(() => {
    loadCardData();
  }, []);

  const updateTitle = async (e) => {
    e.preventDefault();
    const cardTitle = titleRef.current.value.trim();
    if (!cardTitle) return;
    if (cardTitle === title) {
      setIsEditingTitle(false);
      return;
    }
    setLoading(true);
    await updateCard({
      id,
      title: cardTitle,
      list_id: listId,
      board_id: boardId,
    });
    setLoading(false);
    setIsEditingTitle(false);
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    if (image && image.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = function () {
        if (cover) {
          updateCover(
            cover.public_id,
            reader.result.toString(),
            id,
            listId,
            boardId
          );
        } else {
          setCover(reader.result.toString(), id, listId, boardId);
        }
      };
      reader.readAsDataURL(image);
    }
    imgRef.current.value = null;
  };

  const removeCardCover = () => {
    removeCover(cover, id, listId, boardId);
    imgRef.current.value = null;
  };

  const removeCard = async () => {
    setIsRemovingCard(true);
    await deleteCard(cover ? cover.public_id : null, id, listId);
    setIsRemovingCard(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent maxWidth="700px" minHeight="500px">
        <ModalCloseButton
          sx={{
            backgroundColor: "#3182ce",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#3074b3",
            },
            "&:active": {
              backgroundColor: "#2e5b85",
            },
          }}
        />
        {loadingComments ? (
          <Loader width="80px" />
        ) : (
          <ModalBody pt={5} pb={5} width="100%">
            {cover && (
              <Image
                width="100%"
                height="160px"
                bg="#80808024"
                borderRadius="12px"
                mb={3}
                src={cover.url}
                objectFit="contain"
              />
            )}
            <Grid templateColumns="3fr 1fr" gap="15px">
              <GridItem>
                {isEditingTitle ? (
                  <form onSubmit={updateTitle}>
                    <Input
                      ref={titleRef}
                      defaultValue={title}
                      mb={1}
                      autoFocus
                    />
                    <Button
                      type="submit"
                      size="xs"
                      colorScheme={"blue"}
                      isLoading={loading}
                    >
                      <AiOutlineCheck />
                    </Button>
                    <Button
                      size="xs"
                      ml={1}
                      onClick={() => setIsEditingTitle(false)}
                    >
                      <MdClose />
                    </Button>
                  </form>
                ) : (
                  <Flex onClick={(e) => setIsEditingTitle(true)} cursor="text">
                    <Text
                      fontFamily="'Noto Sans', serif"
                      fontWeight="400"
                      fontSize="16px"
                    >
                      {title}
                    </Text>
                  </Flex>
                )}
                <Text
                  as="span"
                  fontSize="11px"
                  fontFamily="'Poppins', sans-serif"
                  fontWeight="600"
                  color="#BDBDBD"
                  display="inline-block"
                  mb="18px"
                >
                  in list &nbsp;
                  <Movecard
                    listId={listId}
                    index={index}
                    listTitle={listTitle}
                    card_id={id}
                  />
                </Text>
                {description ? (
                  <CardDescription
                    id={id}
                    listId={listId}
                    description={description}
                  />
                ) : (
                  isAdmin && (
                    <CardDescription
                      id={id}
                      listId={listId}
                      description={description}
                    />
                  )
                )}
                <CommentInput comments={comments} id={id} listId={listId} />
              </GridItem>
              <GridItem
                marginTop="20px"
                sx={{
                  "& > button": {
                    color: "#828282",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                  },
                }}
              >
                <HStack
                  fontSize={11}
                  fontWeight={500}
                  color="#BDBDBD"
                  fontFamily="'Poppins', sans-serif"
                  mb={3}
                >
                  <FaUserCircle />
                  <Text>Actions</Text>
                </HStack>
                <AddMemberToCard members={members} id={id} listId={listId}>
                  <Button
                    width="100%"
                    justifyContent="flex-start"
                    leftIcon={<MdPeople />}
                    size="sm"
                    mb={2}
                  >
                    Members
                  </Button>
                </AddMemberToCard>

                <input
                  type="file"
                  ref={imgRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                {cover ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      width="100%"
                      leftIcon={<MdImage />}
                      textAlign="start"
                      size="sm"
                      mb={2}
                      isLoading={isUploading}
                      loadingText={coverLoadingText}
                    >
                      Cover
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          setCoverLoadingText("Updating");
                          imgRef.current.click();
                        }}
                      >
                        Update Cover
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setCoverLoadingText("Removing");
                          removeCardCover();
                        }}
                      >
                        Remove
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Button
                    width="100%"
                    leftIcon={<MdImage />}
                    justifyContent="flex-start"
                    size="sm"
                    mb={2}
                    isLoading={isUploading}
                    loadingText="Uploading"
                    onClick={() => imgRef.current.click()}
                  >
                    Cover
                  </Button>
                )}
                {isAdmin && (
                  <Popover isOpen={isPopoverOpen} onClose={onPopoverClose}>
                    <PopoverTrigger>
                      <Button
                        width="100%"
                        colorScheme="red"
                        leftIcon={<AiOutlineDelete />}
                        justifyContent="flex-start"
                        size="sm"
                        style={{ color: "white" }}
                        onClick={onPopoverToggle}
                        isLoading={isRemovingCard}
                        loadingText="Deleting..."
                      >
                        Delete Card
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverBody>
                        This card will be deleted permanently. Are you sure want
                        to delete it?
                      </PopoverBody>
                      <PopoverFooter border="0" display="flex" pb={4}>
                        <ButtonGroup spacing="3">
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={removeCard}
                            disabled={isRemovingCard}
                          >
                            Yes
                          </Button>
                          <Button size="sm" onClick={onPopoverClose}>
                            No
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                )}
              </GridItem>
            </Grid>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CardModal;
