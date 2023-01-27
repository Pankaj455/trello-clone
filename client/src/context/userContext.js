import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/userReducer";
import axios from "../axios";
import { useToast } from "@chakra-ui/react";

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
  const loginToast = useToast();
  const registerToast = useToast();
  const profileUploadToast = useToast();
  const toastId = "avatar";

  const register = async (user) => {
    // const toastId = "register";
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.post("/user/register", user);
      registerToast({
        position: "top",
        description: "Account created successfully",
        status: "success",
        duration: 3000,
      });
      localStorage.setItem("auth-token", data.token);
      dispatch({ type: "LOADING_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response.data.message,
      });
      if (!registerToast.isActive(toastId))
        registerToast({
          id: toastId,
          position: "top",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
        });
    }
  };

  const login = async (user) => {
    // const toastId = "login-info";
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.post("/user/login", user);
      localStorage.setItem("auth-token", data.token);
      loginToast({
        id: toastId,
        position: "top-right",
        description: "Logged In",
        status: "success",
        duration: 2000,
      });
      dispatch({ type: "LOADING_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response.data.message,
      });
      if (!loginToast.isActive(toastId))
        loginToast({
          id: toastId,
          position: "top",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
        });
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
    // console.log(image);
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
        if (!profileUploadToast.isActive(toastId)) {
          profileUploadToast({
            id: toastId,
            position: "top-right",
            description: "Profile uploaded successfully",
            status: "success",
            duration: 2000,
          });
        }
        dispatch({ type: "UPDATE_AVATAR", payload: data.avatar });
      }
    } catch (error) {
      console.log("Error: ", error);
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response,
      });
      alert("Something went wrong. Try again!");
    }
  };
  const updateProfile = async ({ image, public_id, name }) => {
    try {
      // console.log(public_id, name);
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
        profileUploadToast({
          id: toastId,
          position: "top-right",
          description: "Profile updated successfully",
          status: "success",
          duration: 2000,
        });
        if (name) {
          dispatch({ type: "UPDATE_PROFILE", payload: data.name });
        } else {
          dispatch({ type: "UPDATE_AVATAR", payload: data.avatar });
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      dispatch({
        type: "LOADING_FAILURE",
        payload: error.response,
      });
      alert("Something went wrong. Try again!");
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
    }
  };

  const getAdminProfile = async (admin) => {
    try {
      dispatch({ type: "LOADING_REQUEST" });
      const { data } = await axios.get(`/user/me/?id=${admin}`, {
        headers: {
          token: localStorage.getItem("auth-token"),
        },
      });
      if (data) {
        dispatch({ type: "LOADING_SUCCESS" });
        dispatch({ type: "GET_ADMIN", payload: data.user });
      }
    } catch (error) {
      console.log("Error: ", error);
      dispatch({ type: "LOADING_FAILURE", payload: error.message });
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
    // dispatch({ type: "UPDATE_BOARD_INFO", payload: data });
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
