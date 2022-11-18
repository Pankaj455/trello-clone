import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/AppReducer";
import axios from "../axios";

const AppContext = createContext();

const initialState = {
  name: "",
  boards: [],
  loadingUser: true,
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
      // console.log(data.user);
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

  return (
    <AppContext.Provider
      value={{
        ...state,
        loadUser,
        clearUser,
        createBoard,
        getAdminProfile,
        updateBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
