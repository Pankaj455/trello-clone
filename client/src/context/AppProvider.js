import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/AppReducer";

const AppContext = createContext();

const initialState = {
  name: "",
  boards: [],
};

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadUser = (payload) => {
    dispatch({ type: "LOAD_USER", payload });
  };

  const clearUser = () => {
    dispatch({ type: "CLEAR_USER_DATA" });
  };

  const createBoard = (payload) => {
    dispatch({ type: "ADD_BOARD", payload });
  };

  return (
    <AppContext.Provider value={{ ...state, loadUser, clearUser, createBoard }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
