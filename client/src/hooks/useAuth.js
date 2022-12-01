import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/userContext";

const useAuth = () => {
  const { boards, _id, loadingUser, loadUser } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    if (loadingUser) {
      loadUser();
    }
  }, []);

  let adminId;
  const board = boards.filter((board) => board._id === location.state);
  if (board.length > 0) {
    adminId =
      typeof board[0].admin === "string" ? board[0].admin : board[0].admin._id;
  }
  return { isAdmin: adminId === _id ? true : false };
};

export default useAuth;
