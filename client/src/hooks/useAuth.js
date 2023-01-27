import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/userContext";

const useAuth = () => {
  const { boards, _id, loadUser } = useAppContext();

  const { id: location } = useParams();

  useEffect(() => {
    if (!_id) {
      loadUser();
    }
  }, []);

  let adminId;
  const board = boards.filter((board) => board._id === location);
  if (board.length > 0) {
    adminId =
      typeof board[0].admin === "string" ? board[0].admin : board[0].admin._id;
  }
  return { isAdmin: adminId === _id };
};

export default useAuth;
