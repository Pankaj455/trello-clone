import React, { useState } from "react";
import logo from "../../assets/updated-logo-bold.svg";
import {
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  Image,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { MdEmail, MdHttps, MdPermIdentity } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/userContext";

const SignUp = () => {
  const { register, isLoading } = useAppContext();

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameErr || name.trim().length < 3) {
      if (!nameErr) setNameErr(true);
      return;
    } else if (emailErr || !email.includes("@")) {
      if (!emailErr) setEmailErr(true);
      return;
    } else if (passErr || password.trim().length < 6) {
      if (!passErr) setPassErr(true);
      return;
    }

    const user = {
      name,
      email,
      password,
    };
    await register(user);
    if (localStorage.getItem("auth-token")) {
      navigate("/boards");
    }
  };

  return (
    <>
      <Image boxSize="150px" objectFit="fill" src={logo} alt="Logo" />
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={nameErr}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={MdPermIdentity} color="blackAlpha.500" />}
            />
            <Input
              size="md"
              value={name}
              placeholder="Username"
              onChange={(e) => {
                if (e.target.value.trim() === "") setNameErr(true);
                else {
                  if (nameErr) setNameErr(false);
                }
                setName(e.target.value);
              }}
            />
          </InputGroup>
          {nameErr && (
            <FormErrorMessage>
              {name === ""
                ? "Please enter username"
                : "Username must have atleast 3 characters without any whitespace"}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl mt={4} isInvalid={emailErr}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={MdEmail} color="blackAlpha.500" />}
            />
            <Input
              size="md"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                if (e.target.value.trim() === "") setEmailErr(true);
                else {
                  if (emailErr) setEmailErr(false);
                }
                setEmail(e.target.value);
              }}
            />
          </InputGroup>
          {emailErr && (
            <FormErrorMessage>
              {email === ""
                ? "Please enter email"
                : !email.includes("@") && "Email is not valid"}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl mt={4} isInvalid={passErr}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={MdHttps} color="blackAlpha.500" />}
            />
            <Input
              size="md"
              type={show ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => {
                if (e.target.value.trim() === "") setPassErr(true);
                else {
                  if (passErr) setPassErr(false);
                }
                setPassword(e.target.value);
              }}
            />
            <InputRightElement
              children={
                <Icon
                  as={show ? AiFillEye : AiFillEyeInvisible}
                  onClick={() => setShow(!show)}
                  color="blackAlpha.500"
                  cursor="pointer"
                />
              }
            />
          </InputGroup>
          {passErr && (
            <FormErrorMessage>
              {password === ""
                ? "Please enter password"
                : "Password must have atleast 6 characters without any whitespace"}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          size="md"
          colorScheme="green"
          mt={5}
          width="100%"
          type="submit"
          loadingText="Sign Up"
          isLoading={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignUp;
