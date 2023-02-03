import {
  Center,
  Container,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../../assets/updated-logo-bold.svg";
import { MdSend, MdVerifiedUser } from "react-icons/md";
import { useAppContext } from "../../context/userContext";

const Forgot = () => {
  const { sendEmail, isLoading } = useAppContext();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = email.trim();
    if (userEmail.length === 0) return;
    const resetStatus = await sendEmail(userEmail);
    setStatus(resetStatus);
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Container maxW="400px" boxShadow="0 0 8px rgba(0, 0, 0, 0.15)" p={4}>
        {status === 1 ? (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minHeight="100px"
          >
            <MdVerifiedUser fontSize="3em" color="#3182ce" />
            <Text mt={4} mb={1} fontSize="2xl" fontWeight="500">
              A link is sent to your email to reset password
            </Text>
          </Flex>
        ) : (
          <>
            <Center>
              <Image boxSize="150px" objectFit="fill" src={logo} alt="Logo" />
            </Center>
            <Text
              fontSize="xl"
              textAlign="center"
              mt="-18px"
              mb={3}
              fontWeight="500"
              fontFamily="'Noto Sans', serif"
            >
              Reset Password
            </Text>
            <form onSubmit={handleSubmit}>
              <InputGroup gap={2}>
                <Input
                  placeholder="Enter your registerd email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <IconButton
                  colorScheme="blue"
                  aria-label="Send Email"
                  icon={<MdSend />}
                  type="submit"
                  isLoading={isLoading}
                />
              </InputGroup>
            </form>
          </>
        )}
      </Container>
    </Flex>
  );
};

export default Forgot;
