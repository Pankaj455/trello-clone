import {
  Button,
  Flex,
  Text,
  Box,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useListContext } from "../../context/listContext";
import { useAppContext } from "../../context/userContext";
import useAuth from "../../hooks/useAuth";

const AddMemberToCard = ({ members, id, listId, children }) => {
  const { addMemberToCard, removeMemberFromCard } = useListContext();
  const { boards } = useAppContext();
  const [loading, setLoading] = useState(false);

  const { id: location } = useParams();
  const board = useMemo(
    () => boards.filter((board) => board._id === location),
    [boards, location]
  );
  const boardMembers = board[0].members;
  const memberIds = useMemo(
    () => members.map((member) => member._id),
    [members]
  );

  const { isAdmin } = useAuth();

  const addMember = async (member) => {
    const newMember = {
      _id: member._id,
      name: member.name,
    };
    setLoading(true);
    await addMemberToCard(id, newMember, listId);
    setLoading(false);
  };

  const removeMember = async (memberId) => {
    setLoading(true);
    await removeMemberFromCard(id, memberId, listId);
    setLoading(false);
  };

  return (
    <Popover isLazy>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()}>
        <PopoverArrow />
        <PopoverHeader
          textAlign="center"
          fontFamily="'Poppins', sans-serif"
          fontSize="14px"
          fontWeight="500"
        >
          Members
        </PopoverHeader>
        <PopoverBody>
          <VStack gap={2} alignItems="space-between">
            {isAdmin ? (
              boardMembers.length > 0 ? (
                boardMembers.map((boardMember) => {
                  return (
                    <Flex direction="row" key={boardMember._id}>
                      <HStack flexGrow={1} spacing={4}>
                        <Avatar
                          size="xs"
                          name={boardMember.name}
                          src={boardMember.avatar?.url}
                        />
                        <Text
                          fontSize={12}
                          fontWeight={500}
                          fontFamily="'Poppins', sans-serif"
                        >
                          {boardMember.name}
                        </Text>
                      </HStack>
                      {!memberIds.includes(boardMember._id) ? (
                        <Button
                          size="xs"
                          colorScheme="blue"
                          onClick={(e) => {
                            e.stopPropagation();
                            addMember(boardMember);
                          }}
                          disabled={loading}
                        >
                          Invite
                        </Button>
                      ) : (
                        <Button
                          size="xs"
                          variant="outline"
                          colorScheme="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeMember(boardMember._id);
                          }}
                          disabled={loading}
                        >
                          Remove
                        </Button>
                      )}
                    </Flex>
                  );
                })
              ) : (
                <Box backgroundColor="#F8F9FD" borderRadius="6px" p={2}>
                  <Text
                    fontSize="12px"
                    fontFamily="'Noto Sans', serif"
                    fontWeight="400"
                    color="#828282"
                  >
                    Looks like that there are no members in the board. First add
                    them to the board and then to the card.
                  </Text>
                </Box>
              )
            ) : members.length > 0 ? (
              members.map((member) => {
                return (
                  <Flex direction="row" key={member._id}>
                    <HStack flexGrow={1} spacing={4}>
                      <Avatar
                        size="xs"
                        name={member.name}
                        src={member.avatar?.url}
                      />
                      <Text
                        fontSize={12}
                        fontWeight={500}
                        fontFamily="'Poppins', sans-serif"
                      >
                        {member.name}
                      </Text>
                    </HStack>
                  </Flex>
                );
              })
            ) : (
              <Box backgroundColor="#F8F9FD" borderRadius="6px" p={2}>
                <Text
                  fontSize="12px"
                  fontFamily="'Noto Sans', serif"
                  fontWeight="400"
                  color="#828282"
                >
                  No members are assigned to this card.
                </Text>
              </Box>
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddMemberToCard;
