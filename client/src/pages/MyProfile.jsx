import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import UserDetail from "../components/Profile/UserDetail";
import UserCards from "../components/Profile/UserCards";
import Sidebar from "../components/Profile/Sidebar";
import { useAppContext } from "../context/userContext";

function MyProfile() {
  const { _id, loadUser } = useAppContext();
  const [selectedTab, setSelectedTab] = useState("profile");

  useEffect(() => {
    if (!_id) {
      loadUser();
    }
  }, []);

  return _id ? (
    <>
      <Header />
      <Flex direction="row">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Box
          style={{
            flexGrow: 1,
            padding: "6px",
            display: "flex",
            backgroundColor: "rgb(248, 249, 253)",
            // justifyContent: "center",
            paddingTop: "15px",
          }}
        >
          {selectedTab === "profile" ? <UserDetail /> : <UserCards />}
        </Box>
      </Flex>
    </>
  ) : (
    <Loader />
  );
}

export default MyProfile;
