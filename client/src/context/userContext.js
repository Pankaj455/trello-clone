import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/userReducer";
import axios from "../axios";

const AppContext = createContext();

const initialState = {
  name: "",
  boards: [],
  loadingUser: true,
  isLoading: false,
  error: "",
};

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadUser = async () => {
    try {
      const response = await axios.get("/user/me", {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });

      dispatch({ type: "LOAD_USER", payload: response.data.user });
      dispatch({ type: "LOADING_SUCCESS" });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: "LOADING_FAILURE",
          payload: "Something went wrong! Please reload the page.",
        });
      } else {
        dispatch({
          type: "LOADING_FAILURE",
          payload: error.response.data.message,
        });
      }
    }
  };

  const clearUser = () => {
    dispatch({ type: "CLEAR_USER_DATA" });
  };

  const createBoard = (payload) => {
    dispatch({ type: "ADD_BOARD", payload });
  };

  const getAdminProfile = (payload) => {
    dispatch({ type: "GET_ADMIN", payload });
  };

  const updateBoard = (payload) => {
    dispatch({ type: "UPDATE_BOARD_INFO", payload });
  };

  const addMemberToBoard = async (user, board_id) => {
    try {
      // dispatch({ type: "REQUEST_LOADING" });
      const response = await axios.post(
        "/board/addMember",
        { user_id: user._id, board_id },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (response.data.success) {
        dispatch({ type: "ADD_MEMBER", payload: { user, board_id } });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    // dispatch({ type: "ADD_MEMBER", payload: { user, board_id } });
  };

  const removeMemberFromUserContext = (payload) => {
    dispatch({ type: "REMOVE_MEMBER", payload });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loadUser,
        clearUser,
        createBoard,
        getAdminProfile,
        updateBoard,
        addMemberToBoard,
        removeMemberFromUserContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
