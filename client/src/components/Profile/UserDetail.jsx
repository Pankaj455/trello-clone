import {
  Box,
  Avatar,
  useToast,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalOverlay,
  Divider,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useAppContext } from "../../context/userContext";

const UserDetail = () => {
  const { name, avatar, isLoading, uploadProfile, updateProfile } =
    useAppContext();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [username, setUsername] = useState(name);
  const [isNameErr, setIsNameErr] = useState(false);
  const avatarRef = useRef();
  const toast = useToast();
  const toastId = "toast";

  const upload = async (image) => {
    if (avatar) {
      await updateProfile({ image, public_id: avatar.public_id });
    } else await uploadProfile(image);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNameErr || username.trim().length < 3) {
      if (!isNameErr) setIsNameErr(true);
      return;
    }
    await updateProfile({ name: username });
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    if (image && image.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = function () {
        upload(reader.result.toString());
      };
      reader.readAsDataURL(image);
    } else {
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          position: "top-right",
          description: "Please upload image!",
          status: "warning",
          duration: 4000,
        });
      }
    }
    // clearing input value in case of failure when updating avatar
    e.target.value = null;
  };

  return (
    <Box
      style={{
        width: "25vw",
        minWidth: "200px",
        maxWidth: "400px",
        paddingLeft: "40px",
      }}
    >
      <input
        style={{ display: "none" }}
        ref={avatarRef}
        type="file"
        onChange={handleImageUpload}
      />
      {avatar === undefined ? (
        <>
          <Avatar
            size="2xl"
            name={name}
            cursor="pointer"
            onClick={() => (avatar ? onOpen() : avatarRef.current.click())}
          />
        </>
      ) : (
        <Avatar
          size="2xl"
          name={name}
          cursor="pointer"
          src={avatar.url}
          onClick={() => (avatar ? onOpen() : avatarRef.current.click())}
        />
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent width="250px" overflow="hidden">
            <ModalBody
              width="100%"
              color="#000"
              p={0}
              textAlign="center"
              sx={{
                "&>div": {
                  padding: 2,
                  cursor: "pointer",
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: "500",
                },
                "&>div:hover": {
                  backgroundColor: "#00000022",
                },
              }}
            >
              <Box
                onClick={() => {
                  avatarRef.current.click();
                  onClose();
                }}
              >
                Update Profile
              </Box>
              <Divider backgroundColor="#000" height="0.5px" />
              <Box
                onClick={() => {
                  updateProfile({ public_id: avatar.public_id });
                  avatarRef.current.value = null;
                  onClose();
                }}
              >
                Remove Profile
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isNameErr} mt="10px">
          <Input
            size="md"
            backgroundColor="#fff"
            value={username}
            onChange={(e) => {
              if (e.target.value.trim() === "") setIsNameErr(true);
              else {
                if (isNameErr) setIsNameErr(false);
              }
              setUsername(e.target.value);
            }}
          />
          {isNameErr && (
            <FormErrorMessage>
              Username must have at least 3 characters
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          size="md"
          colorScheme="blue"
          mt={5}
          width="100%"
          type="submit"
          loadingText="Saving..."
          isLoading={isLoading}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default UserDetail;
