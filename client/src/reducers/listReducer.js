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

    case "MOVE_CARD":
      const { fromList, toList, fromIndex, toIndex } = action.payload;
      if (fromList === toList) {
        if (fromIndex !== toIndex) {
          const targetList = {
            ...state.allLists.filter((list) => list._id === fromList)[0],
          };
          const cards = [...targetList.cards];
          const cardToMove = cards.splice(fromIndex, 1)[0];
          cards.splice(toIndex, 0, cardToMove);
          return {
            ...state,
            allLists: state.allLists.map((list) => {
              if (list._id === toList) {
                list = {
                  ...list,
                  cards,
                };
              }
              return list;
            }),
          };
        } else {
          return state;
        }
      }

      const srcList = {
        ...state.allLists.filter((list) => list._id === fromList)[0],
      };
      const srcCards = [...srcList.cards];
      const cardToMove = srcCards.splice(fromIndex, 1)[0];

      const destList = {
        ...state.allLists.filter((list) => list._id === toList)[0],
      };
      const destCards = [...destList.cards];
      destCards.splice(toIndex, 0, cardToMove);

      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === fromList) {
            list = {
              ...list,
              cards: srcCards,
            };
          } else if (list._id === toList) {
            list = {
              ...list,
              cards: destCards,
            };
          }
          return list;
        }),
      };

    case "REMOVE_MEMBER_FROM_ALL_CARDS":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          list = {
            ...list,
            cards: list.cards.map((card) => {
              card = {
                ...card,
                members: card.members.filter(
                  (member) => member._id !== action.payload.user._id
                ),
              };
              return card;
            }),
          };
          return list;
        }),
      };

    case "DELETE_CARD":
      return {
        ...state,
        allLists: state.allLists.map((list) => {
          if (list._id === action.payload.list_id) {
            list = {
              ...list,
              cards: list.cards.filter(
                (card) => card._id !== action.payload.card_id
              ),
            };
          }
          return list;
        }),
      };
    default:
      return state;
  }
};

export default listReducer;
