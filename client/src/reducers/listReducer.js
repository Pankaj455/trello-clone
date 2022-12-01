const listReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_ALL_LISTS":
      return {
        ...state,
        allLists: [...action.payload.lists],
      };

    case "CLEAR_ALL_LISTS":
      return {
        ...state,
        allLists: [],
      };

    case "ADD_NEW_LIST":
      return {
        ...state,
        allLists: [...state.allLists, action.payload.newList],
      };

    case "UPDATE_LIST_TITLE":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              title: action.payload.title,
            };
          }
          return list;
        }),
      };

    case "REMOVE_LIST":
      return {
        ...state,
        allLists: state.allLists.filter((list) => list._id !== action.payload),
      };

    case "CREATE_NEW_CARD":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: [...list.cards, { ...action.payload.card }],
            };
          }
          return list;
        }),
      };

    case "UPDATE_CARD_TITLE":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.id) {
                  card.title = action.payload.title;
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "UPDATE_CARD_DESCRIPTION":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.id) {
                  card.description = action.payload.description;
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "CREATE_NEW_COMMENT":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.card_id) {
                  card = {
                    ...card,
                    comments: [action.payload.newComment, ...card.comments],
                  };
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.card_id) {
                  card = {
                    ...card,
                    comments: card.comments.filter(
                      (comment) => comment._id !== action.payload.comment_id
                    ),
                  };
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "LOAD_COMMENTS":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.card_id) {
                  card = {
                    ...card,
                    comments: [...action.payload.comments],
                  };
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "ADD_MEMBER_TO_CARD":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.card_id) {
                  card = {
                    ...card,
                    members: [...card.members, { ...action.payload.newMember }],
                  };
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "REMOVE_MEMBER_FROM_CARD":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.card_id) {
                  card = {
                    ...card,
                    members: card.members.filter(
                      (member) => member._id !== action.payload.member_id
                    ),
                  };
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "SET_CARD_COVER":
      return {
        ...state,
        isUploading: false,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.card_id) {
                  card = {
                    ...card,
                    cover: action.payload.cover,
                  };
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "REMOVE_CARD_COVER":
      return {
        ...state,
        isUploading: false,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.map((card) => {
                if (card._id === action.payload.card_id) {
                  card = {
                    ...card,
                    cover: undefined,
                  };
                }
                return card;
              }),
            };
          }
          return list;
        }),
      };

    case "UPLOADING_REQUEST":
      return {
        ...state,
        isUploading: true,
      };

    default:
      return state;
  }
};

export default listReducer;
