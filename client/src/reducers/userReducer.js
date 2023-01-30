const userReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        _id: action.payload._id,
        name: action.payload.name,
        avatar: action.payload.avatar,
        boards: action.payload.boards,
      };
    case "UPDATE_AVATAR":
      return {
        ...state,
        avatar: action.payload,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        name: action.payload,
      };

    case "GET_ADMIN":
      return {
        ...state,
        admin: action.payload,
      };
    case "GET_USER_CARDS":
      return {
        ...state,
        cards: action.payload,
      };

    case "LOADING_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "LOADING_SUCCESS":
      return {
        ...state,
        loadingUser: false,
        isLoading: false,
        error: "",
      };

    case "LOADING_FAILURE":
      return {
        ...state,
        loadingUser: false,
        isLoading: false,
        error: action.payload,
      };

    case "CLEAR_USER_DATA":
      return {
        name: "",
        boards: [],
      };

    case "ADD_BOARD":
      // console.log("creating board");
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };

    case "UPDATE_BOARD_INFO":
      const { visibility, title, description, cover, board_id } =
        action.payload;

      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board._id === board_id) {
            if (title) board.title = title;
            else if (visibility) board.visibility = visibility;
            else if (description) board.description = description;
            else if (cover) board.cover = cover;
          }
          return board;
        }),
      };

    case "ADD_MEMBER":
      return {
        ...state,
        isLoading: false,
        boards: state.boards.map((board) => {
          if (board._id === action.payload.board_id) {
            board = {
              ...board,
              members: [...board.members, { ...action.payload.user }],
            };
          }
          return board;
        }),
      };

    case "REMOVE_MEMBER":
      return {
        ...state,
        isLoading: false,
        boards: state.boards.map((board) => {
          if (board._id === action.payload.board_id) {
            board = {
              ...board,
              members: board.members.filter(
                (member) => member._id !== action.payload.user._id
              ),
            };
          }
          return board;
        }),
      };
    default:
      return state;
  }
};

export default userReducer;
