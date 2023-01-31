import reducer from "../reducers/listReducer";
import axios from "../axios";
import { useAppContext } from "./userContext";

const { createContext, useContext, useReducer } = require("react");

const initialState = {
  allLists: [],
  isUploading: false,
};

const ListContext = createContext();

export const useListContext = () => useContext(ListContext);

const ListDataProvider = ({ children }) => {
  const { name, avatar, _id, removeMemberFromUserContext, showPopup } =
    useAppContext();
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const addNewList = async ({ title, board_id }) => {
    try {
      const response = await axios.post(
        "/board/list/new",
        { title, board_id },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "ADD_NEW_LIST",
          payload: {
            board_id,
            newList: {
              _id: response.data._id,
              title,
              cards: [],
            },
          },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      showPopup(
        "new-list",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
    }
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
      showPopup(
        "update-list",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "delete-list",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "new-card",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "update-card",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "new-comment",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "remove-comment",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "new-member",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "rem-member",
        "error",
        `${error.response.data.message}. Try again or reload the page`,
        "bottom-left"
      );
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
      dispatch({ type: "UPLOADING_FAILURE" });
      showPopup(
        "new-cover",
        "error",
        `Something went wrong. Try again later or reload the page`,
        "bottom-left"
      );
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
      dispatch({ type: "UPLOADING_FAILURE" });
      showPopup(
        "remove-cover",
        "error",
        `Something went wrong. Try again later or reload the page`,
        "bottom-left"
      );
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
      dispatch({ type: "UPLOADING_FAILURE" });
      showPopup(
        "update-cover",
        "error",
        `Something went wrong. Try again later or reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "move",
        "error",
        `${error.response.data.message}. Reload the page`,
        "bottom-left"
      );
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
      showPopup(
        "move",
        "error",
        `${error.response.data.message}. Try again later`,
        "bottom-left"
      );
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
      showPopup(
        "move",
        "error",
        `${error.response.data.message}. Reload the page`,
        "bottom-left"
      );
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
