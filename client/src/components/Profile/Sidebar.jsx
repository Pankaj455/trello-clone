import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <Flex
      direction="column"
      width="10vw"
      minWidth="120px"
      maxWidth="200px"
      height="calc(100vh - 75px)"
      gap={2}
      sx={{
        backgroundColor: "#EDF2F7",
        padding: "8px 6px 0 6px",
        "&>div": {
          padding: "1em",
          borderRadius: "8px",
          color: "#828282",
          fontSize: "1em",
          fontWeight: 500,
          fontFamily: "'Poppins', sans-serif",
          cursor: "pointer",
          transition: "all 0.2s",
        },
        "&>div:hover": {
          backgroundColor: "#fff",
        },
      }}
    >
      <Box
        backgroundColor={selectedTab === "profile" ? "#fff" : "transparent"}
        onClick={() => setSelectedTab("profile")}
      >
        Profile
      </Box>
      <Box
        backgroundColor={selectedTab === "cards" ? "#fff" : "transparent"}
        onClick={() => setSelectedTab("cards")}
      >
        Cards
      </Box>
    </Flex>
  );
};

export default Sidebar;
