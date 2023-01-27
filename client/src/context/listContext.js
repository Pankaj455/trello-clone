import reducer from "../reducers/listReducer";
import axios from "../axios";
import { useAppContext } from "./userContext";
import { useToast } from "@chakra-ui/react";

const { createContext, useContext, useReducer } = require("react");

const initialState = {
  allLists: [],
  isUploading: false,
};

const ListContext = createContext();

export const useListContext = () => useContext(ListContext);

const ListDataProvider = ({ children }) => {
  const { name, avatar, _id, removeMemberFromUserContext } = useAppContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();

  const showPopup = (id, status, description) => {
    toast({
      id,
      position: "bottom-left",
      description,
      status,
      duration: 3500,
    });
  };

  const loadAllLists = async (board_id) => {
    try {
      const response = await axios.get(`/board/list/all?id=${board_id}`, {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });
      dispatch({ type: "LOAD_ALL_LISTS", payload: response.data });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const clearAllLists = () => {
    dispatch({ type: "CLEAR_ALL_LISTS" });
  };

  const addNewList = (payload) => {
    dispatch({ type: "ADD_NEW_LIST", payload });
  };

  const updateListTitle = async (title, list_id, board_id) => {
    try {
      const response = await axios.put(
        "/board/list/update",
        {
          board_id,
          list_id,
          title,
        },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({ type: "UPDATE_LIST_TITLE", payload: { title, list_id } });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const deleteListFromBoard = async (list_id, board_id) => {
    try {
      const response = await axios.post(
        "/board/list/delete",
        { list_id, board_id },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({ type: "REMOVE_LIST", payload: list_id });
        showPopup("delete-list", "success", response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const createCard = async (title, list_id, board_id) => {
    try {
      const response = await axios.post(
        "/board/card/new",
        {
          board_id,
          list_id,
          title,
        },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "CREATE_NEW_CARD",
          payload: { card: response.data.card, list_id },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const updateCard = async ({ id, title, description, list_id }) => {
    try {
      const response = await axios.put(
        "/board/card/update",
        {
          card_id: id,
          title,
          description,
        },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "UPDATE_CARD",
          payload: { id, title, description, list_id },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const createNewComment = async (newComment, card_id, list_id) => {
    try {
      const response = await axios.post(
        "/board/card/comment/new",
        {
          ...newComment,
          card_id,
        },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        newComment.user = {
          _id,
          name,
          avatar,
        };
        dispatch({
          type: "CREATE_NEW_COMMENT",
          payload: { newComment, list_id, card_id },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const removeComment = async (comment_id, card_id, list_id) => {
    try {
      const response = await axios.post(
        "/board/card/comment/delete",
        {
          comment_id,
          card_id,
        },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "DELETE_COMMENT",
          payload: { comment_id, list_id, card_id },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const loadComments = async (list_id, card_id) => {
    try {
      const response = await axios.get(`/board/card/restinfo?id=${card_id}`, {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });
      if (response.data.success) {
        dispatch({
          type: "LOAD_COMMENTS",
          payload: {
            list_id,
            card_id,
            comments: response.data.comments.reverse(),
          },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const addMemberToCard = async (card_id, newMember, list_id) => {
    try {
      const response = await axios.post(
        "/board/card/addMember",
        {
          member_id: newMember._id,
          card_id,
        },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "ADD_MEMBER_TO_CARD",
          payload: { list_id, card_id, newMember },
        });
        showPopup("add-member", "success", "Member added successfully");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const removeMemberFromCard = async (card_id, member_id, list_id) => {
    try {
      const response = await axios.post(
        "/board/card/removeMember",
        {
          member_id,
          card_id,
        },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "REMOVE_MEMBER_FROM_CARD",
          payload: { list_id, card_id, member_id },
        });
        showPopup("remove-member", "success", response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const setCover = async (cover, card_id, list_id) => {
    try {
      dispatch({ type: "UPLOADING_REQUEST" });
      const response = await axios.post(
        "/board/card/setCover",
        { card_id, cover },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "SET_CARD_COVER",
          payload: { card_id, cover: response.data.cover, list_id },
        });
        showPopup("set-cover", "success", "cover is updated successfully");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("Something went wrong. Try again later!");
    }
  };

  const removeCover = async (cover, card_id, list_id) => {
    try {
      dispatch({ type: "UPLOADING_REQUEST" });
      const response = await axios.put(
        "/board/card/removeCover",
        { card_id, cover_id: cover.public_id },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "REMOVE_CARD_COVER",
          payload: { card_id, list_id },
        });
        showPopup("remove-cover", "success", "cover is removed successfully");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("Something went wrong. Try again later!");
    }
  };

  const updateCover = async (prev_cover_id, cover, card_id, list_id) => {
    try {
      dispatch({ type: "UPLOADING_REQUEST" });
      const response = await axios.put(
        "/board/card/updateCover",
        { card_id, cover, prev_cover_id },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "SET_CARD_COVER",
          payload: { card_id, cover: response.data.cover, list_id },
        });
        showPopup("update-cover", "success", "cover is updated successfully");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("Something went wrong. Try again later!");
    }
  };

  const moveCard = async (fromList, toList, fromIndex, toIndex, card_id) => {
    if (fromList === toList && fromIndex === toIndex) {
      return;
    }
    try {
      const response = await axios.put(
        "/board/card/move",
        { card_id, fromList, toList, fromIndex, toIndex },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "MOVE_CARD",
          payload: { fromList, toList, fromIndex, toIndex },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const removeMemberFromBoard = async (user, board_id) => {
    try {
      const response = await axios.post(
        "/board/removeMember",
        { user_id: user._id, board_id },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        removeMemberFromUserContext({ user, board_id });
        dispatch({ type: "REMOVE_MEMBER_FROM_ALL_CARDS", payload: { user } });
        showPopup("remove-member", "success", response.data.message);
      } else {
      }
    } catch (error) {
      dispatch({ type: "LOADING_FAILURE", payload: error.message });
      console.log("Error: ", error);
    }
  };

  const deleteCard = async (cover_id, card_id, list_id, board_id) => {
    try {
      const response = await axios.post(
        "/board/card/delete",
        { cover_id, card_id, list_id, board_id },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({ type: "DELETE_CARD", payload: { card_id, list_id } });
        showPopup("delete-card", "success", response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <ListContext.Provider
      value={{
        ...state,
        clearAllLists,
        loadAllLists,
        addNewList,
        updateListTitle,
        deleteListFromBoard,
        createCard,
        updateCard,
        createNewComment,
        loadComments,
        removeComment,
        addMemberToCard,
        removeMemberFromCard,
        setCover,
        updateCover,
        removeCover,
        moveCard,
        deleteCard,
        removeMemberFromBoard,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListDataProvider;
