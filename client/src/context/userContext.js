import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/userReducer";
import axios from "../axios";
import { position, useToast } from "@chakra-ui/react";

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
  const toast = useToast();

  const showPopup = (id, status, description, position = "bottom-left") => {
    toast({
      id,
      position: status === "error" ? "top" : position,
      description,
      status,
      duration: 3500,
    });
  };

  const register = async (user) => {
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.post("/user/register", user);
      if (data) {
        dispatch({ type: "LOADING_SUCCESS" });
        localStorage.setItem("auth-token", data.token);
        showPopup("register", "success", "Account created successfully", "top");
      }
    } catch (error) {
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response.data.message,
      });
      showPopup("register", "error", error.response.data.message, "top");
    }
  };

  const login = async (user) => {
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.post("/user/login", user);
      if (data) {
        dispatch({ type: "LOADING_SUCCESS" });
        localStorage.setItem("auth-token", data.token);
        showPopup("login", "success", "Logged In", "top-right");
      }
    } catch (error) {
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response.data.message,
      });
      showPopup("login", "error", error.response.data.message, "top");
    }
  };

  const loadUser = async () => {
    try {
      dispatch({ type: "LOADING_REQUEST" });
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

  const uploadProfile = async (image) => {
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.post(
        "/user/upload/avatar",
        { image },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (data.success) {
        dispatch({ type: "LOADING_SUCCESS" });
        dispatch({ type: "UPDATE_AVATAR", payload: data.avatar });
        showPopup(
          "upload",
          "success",
          "Profile uploaded successfully",
          "top-right"
        );
      }
    } catch (error) {
      console.log("Error: ", error);
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response,
      });
      showPopup("upload", "error", error.response.data.message, "top-right");
    }
  };
  const updateProfile = async ({ image, public_id, name }) => {
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.put(
        "/user/update/profile",
        { image, public_id, name },
        {
          headers: {
            token: localStorage.getItem("auth-token"),
          },
        }
      );
      if (data.success) {
        dispatch({ type: "LOADING_SUCCESS" });
        if (name) {
          dispatch({ type: "UPDATE_PROFILE", payload: data.name });
        } else {
          dispatch({ type: "UPDATE_AVATAR", payload: data.avatar });
        }
        showPopup(
          "upload",
          "success",
          "Profile updated successfully",
          "top-right"
        );
      }
    } catch (error) {
      console.log("Error: ", error);
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response,
      });
      showPopup("upload", "error", error.response.data.message, "top-right");
    }
  };

  const getUserCards = async () => {
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.get("/user/me/cards", {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });
      if (data.success) {
        dispatch({ type: "GET_USER_CARDS", payload: data.cards });
        dispatch({ type: "LOADING_SUCCESS" });
      }
    } catch (error) {
      dispatch({ type: "LOADING_FAILURE", payload: error.message });
      console.log("Error:", error);
    }
  };

  const createBoard = async (newBoard) => {
    try {
      // dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.post("/board/create", newBoard, {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });
      if (data.success) {
        // dispatch({ type: "LOADING_SUCCESS" });
        dispatch({ type: "ADD_BOARD", payload: data.board });
      }
    } catch (error) {
      dispatch({ type: "LOADING_FAILURE", payload: error.message });
      console.log("Error: ", error);
      showPopup(
        "create-board",
        "error",
        error.response.data.message,
        "top-right"
      );
    }
  };

  const getAdminProfile = async (admin) => {
    try {
      const { data } = await axios.get(`/user/me/?id=${admin}`, {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });
      if (data) {
        dispatch({ type: "GET_ADMIN", payload: data.user });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const updateBoard = async (data) => {
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const response = await axios.put("/board/update", data, {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });
      if (response.data.success) {
        dispatch({ type: "LOADING_SUCCESS" });
        dispatch({ type: "UPDATE_BOARD_INFO", payload: data });
      }
    } catch (error) {
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response.data.message,
      });
      console.log("Error:", error);
    }
  };

  const addMemberToBoard = async (user, board_id) => {
    try {
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
  };

  const removeMemberFromUserContext = (payload) => {
    dispatch({ type: "REMOVE_MEMBER", payload });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        showPopup,
        register,
        login,
        loadUser,
        uploadProfile,
        updateProfile,
        clearUser,
        createBoard,
        getAdminProfile,
        getUserCards,
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
