import { Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppContext } from "../../context/userContext";
import Loader from "../Loader/Loader";

const UserCards = () => {
  const { cards, getUserCards, isLoading } = useAppContext();
  useEffect(() => {
    getUserCards();
  }, []);
  if (!cards || isLoading) {
    return (
      <Flex paddingLeft="40px" flexGrow={1} justifyContent="center" pt="8">
        <Loader height="fit-content" />
      </Flex>
    );
  }
  return (
    <Flex direction="row" gap={4} paddingLeft="40px" flexGrow={1}>
      {cards.length > 0 ? (
        cards.map((card) => (
          <Card key={card._id} title={card.title} cover={card.cover} />
        ))
      ) : (
        <Flex
          backgroundColor="#EDF2F788"
          borderRadius="16px"
          height="fit-content"
          padding="3em 6em"
          color="#828282"
          fontFamily="'Noto Sans', serif"
        >
          No visible cards. You must be added to a card for it to appear here.
        </Flex>
      )}
    </Flex>
  );
};

const Card = ({ title, cover }) => {
  return (
    <Stack
      direction="column"
      width="260px"
      height="fit-content"
      backgroundColor="#fff"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
      borderRadius="12px"
      padding="12px 12px 20px 12px"
    >
      <Box
        sx={{
          height: "100px",
          marginBottom: "10px",
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
        {cover && (
          <Image
            src={cover.url}
            width="100%"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            fit
            alt="board-cover"
          />
        )}
      </Box>
      <Heading
        as="h5"
        size="sm"
        fontFamily="'Noto Sans', serif"
        fontWeight={500}
        lineHeight="22px"
        style={{
          marginBottom: 8,
        }}
      >
        {title}
      </Heading>
    </Stack>
  );
};

export default UserCards;
