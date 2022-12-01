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
  const { name, avatar, _id } = useAppContext();
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
      // dispatch({ type: "UPDATE_LIST_TITLE", payload: { title, list_id } });
      // console.log("title updated");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const deleteListFromBoard = async (list_id, board_id) => {
    /*
      API CAll
    */
    dispatch({ type: "REMOVE_LIST", payload: list_id });
  };

  const createCard = async (title, list_id, board_id) => {
    try {
      const response = await axios.post(
        "/board/list/card/new",
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
        // console.log(response.data.card);
        dispatch({
          type: "CREATE_NEW_CARD",
          payload: { card: response.data.card, list_id },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    // dispatch({ type: "CREATE_NEW_CARD", payload: { title, list_id } });
  };

  const updateCardTitle = async (id, title, list_id) => {
    try {
      const response = await axios.put(
        "/board/card/update",
        {
          card_id: id,
          title,
        },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        // console.log(response.data.card);
        dispatch({
          type: "UPDATE_CARD_TITLE",
          payload: { id, title, list_id },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    // dispatch({ type: "UPDATE_CARD_TITLE", payload: { id, title, list_id } });
  };

  const updateCardDescription = async (id, description, list_id) => {
    try {
      const response = await axios.put(
        "/board/card/update",
        {
          card_id: id,
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
          type: "UPDATE_CARD_DESCRIPTION",
          payload: { id, description, list_id },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    // dispatch({
    //   type: "UPDATE_CARD_DESCRIPTION",
    //   payload: { id, description, list_id },
    // });
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

    // dispatch({
    //   type: "DELETE_COMMENT",
    //   payload: { comment_id, list_id, card_id },
    // });
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
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    // dispatch({
    //   type: "ADD_MEMBER_TO_CARD",
    //   payload: { list_id, card_id, newMember },
    // });
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
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    // dispatch({
    //   type: "REMOVE_MEMBER_FROM_CARD",
    //   payload: { list_id, card_id, member_id },
    // });
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
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    // dispatch({
    //   type: "SET_CARD_COVER",
    //   payload: { card_id, cover: { url: cover }, list_id },
    // });
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
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    // dispatch({
    //   type: "REMOVE_CARD_COVER",
    //   payload: { card_id, list_id },
    // });
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
        updateCardTitle,
        updateCardDescription,
        createNewComment,
        loadComments,
        removeComment,
        addMemberToCard,
        removeMemberFromCard,
        setCover,
        removeCover,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListDataProvider;
