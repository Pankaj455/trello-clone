const userReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        name: action.payload.name,
        avatar: action.payload.avatar,
        boards: action.payload.boards,
      };

    case "CLEAR_USER_DATA":
      return {
        name: "",
        boards: [],
      };

    case "ADD_BOARD":
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
