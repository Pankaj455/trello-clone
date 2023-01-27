import React, { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Auth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  useEffect(() => {
    if (token) {
      navigate("/boards");
    }
  }, []);
  return !token ? (
    <Container
      maxW="450px"
      color="black"
      mt={10}
      p={0}
      boxShadow="0 0 8px rgba(0, 0, 0, 0.15)"
    >
      <Tabs isFitted size="lg" align="center" variant="unstyled">
        <TabList>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>
            <Text fontSize="md">Log In</Text>
          </Tab>
          <Tab _selected={{ color: "white", bg: "green.400" }}>
            <Text fontSize="md">Sign Up</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  ) : (
    <Loader />
  );
};

export default Auth;
