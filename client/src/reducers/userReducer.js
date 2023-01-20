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

    case "GET_ADMIN":
      return {
        ...state,
        admin: action.payload,
      };

    case "REQUEST_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LOADING_SUCCESS":
      return {
        ...state,
        loadingUser: false,
      };

    case "LOADING_FAILURE":
      return {
        ...state,
        loadingUser: false,
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
      const { visibility, title, description, board_id } = action.payload;

      if (title) {
        return {
          ...state,
          boards: state.boards.map((board) => {
            if (board._id === board_id) {
              board.title = title;
            }
            return board;
          }),
        };
      } else if (description !== undefined) {
        return {
          ...state,
          boards: state.boards.map((board) => {
            if (board._id === board_id) {
              board.description = description;
            }
            return board;
          }),
        };
      }
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board._id === board_id) {
            board.visibility = visibility;
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
