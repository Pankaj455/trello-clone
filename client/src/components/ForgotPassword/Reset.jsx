import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/updated-logo-bold.svg";
import { useAppContext } from "../../context/userContext";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Reset = () => {
  const { resetPassword, isLoading, showPopup } = useAppContext();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [status, setStatus] = useState(0);
  const { token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPass = password.trim();
    if (userPass.length === 0) return;
    else if (userPass.length < 6) {
      showPopup(
        "reset-alert",
        "info",
        "Password must be at least of 6 characters",
        "top"
      );
      return;
    } else if (userPass !== confirmPassword) {
      showPopup("reset-alert2", "info", "Please confirm password", "top");
      return;
    }
    // console.log("reset-password");
    const resetStatus = await resetPassword(userPass, token);
    setStatus(resetStatus);
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Container maxW="400px" boxShadow="0 0 8px rgba(0, 0, 0, 0.15)" p={4}>
        {status === 1 ? (
          <>
            <Text fontSize="3xl">Password Updated</Text>
            <Text fontSize="lg" color="#000000a2" mb={4}>
              Your password has been successfully changed.
            </Text>
            <Text fontSize="lg">
              <Link to="/" style={{ marginLeft: "6px" }}>
                <Button colorScheme="blue" size="sm">
                  Login now
                </Button>
              </Link>
            </Text>
          </>
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
              <InputGroup>
                <Input
                  placeholder="New Password"
                  type={showPass ? "text" : "password"}
                  mb={2}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement
                  children={
                    <Icon
                      as={showPass ? AiFillEye : AiFillEyeInvisible}
                      onClick={() => setShowPass(!showPass)}
                      color="blackAlpha.500"
                      cursor="pointer"
                    />
                  }
                />
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Confirm Password"
                  type={showConfirmPass ? "text" : "password"}
                  mb={2}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement
                  children={
                    <Icon
                      as={showConfirmPass ? AiFillEye : AiFillEyeInvisible}
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      color="blackAlpha.500"
                      cursor="pointer"
                    />
                  }
                />
              </InputGroup>
              <Box
                sx={{
                  textAlign: "right",
                  paddingRight: "2px",
                  marginBottom: "15px",
                  fontFamily: "'Noto-Sans', sans-serif",
                  color: "#828282",
                  "& a:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <Link to="/user/forgot-password">Resend link?</Link>
              </Box>
              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Submit
              </Button>
            </form>
          </>
        )}
      </Container>
    </Flex>
  );
};

export default Reset;
