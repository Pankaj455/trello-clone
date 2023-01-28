import React, { useRef, useState } from "react";
import {
  Image,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Flex,
} from "@chakra-ui/react";
import { MdHttps, MdImage, MdPublic } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppContext } from "../../context/userContext";

const CreateBoard = ({ isOpen, onClose }) => {
  const { createBoard } = useAppContext();

  const [title, setTitle] = useState("");
  // const [visibility, setVisibility] = useState(false);
  const [cover, setCover] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef();

  const handleInputChange = (e) => {
    if (e.target.value === "") setIsError(true);
    else {
      if (isError) setIsError(false);
    }
    setTitle(e.target.value);
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    // console.log(image);
    if (image && image.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = function () {
        setCover(reader.result.toString());
      };
      reader.readAsDataURL(image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      if (!isError) setIsError(true);
      return;
    }

    const newBoard = {
      title,
      // visibility,
      cover,
    };
    setLoading(true);
    await createBoard(newBoard);
    setTitle("");
    setCover(null);
    setLoading(false);
    // setVisibility(false);
    imgRef.current.value = null;
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent maxWidth="340" minHeight="300px">
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
        <ModalBody pt={5} pb={5} width="100%">
          <Box
            sx={{
              height: "100px",
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
            {cover && <Image src={cover} fit alt="board-cover" />}
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl size="xs" isInvalid={isError} mb={5}>
              <Input
                size="md"
                value={title}
                placeholder="Add board title"
                fontSize={14}
                onChange={handleInputChange}
              />
              {isError ? (
                <FormErrorMessage className="errMsg">
                  Add board title
                </FormErrorMessage>
              ) : null}
            </FormControl>
            <Flex
              justifyContent="space-between"
              gap="1.1em"
              marginBottom="25px"
              sx={{
                "&>button": {
                  flexGrow: 1,
                  color: "#828282",
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "12px",
                  fontWeight: "300",
                },
              }}
            >
              <input
                type="file"
                ref={imgRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <Button
                leftIcon={<MdImage />}
                size="sm"
                onClick={() => imgRef.current.click()}
              >
                Cover
              </Button>
              {/* <Button
                leftIcon={!visibility ? <MdHttps /> : <MdPublic />}
                size="sm"
                onClick={() => setVisibility(!visibility)}
              >
                {visibility ? "Public" : "Private"}
              </Button> */}
            </Flex>
            <Flex justifyContent="flex-end" gap="1em">
              <Button size="sm" color="#828282" onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={loading}
                loadingText="Creating"
                size="sm"
                leftIcon={<AiOutlinePlus />}
                type="submit"
                sx={{
                  background: "#2f80ed",
                  color: "#fff",
                  "&:hover": {
                    background: "#2b6cb0",
                  },
                  "&:active": {
                    background: "#2c5282",
                  },
                }}
              >
                Create
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateBoard;
