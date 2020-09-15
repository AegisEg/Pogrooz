import settings from "../../config/settings";
import {
  DIALOGS_SET_NOREAD,
  DIALOGSALL_GET,
  DIALOGSALL_LOAD,
  DIALOGSALL_SET_LOADING,
  DIALOGS_SET_LOADING,
  DIALOGSALL_ADD_MESSAGE,
  DIALOGSORDER_SET_LOADING,
  DIALOGSALL_ADD,
  //***********DIALOGSUSER
  DIALOGS_LOAD,
  DIALOGS_ADD,
  DIALOGS_GET,
  DIALOGS_ADD_MESSAGE,
  DIALOGS_SUCCESS_MESSAGE,
  DIALOGS_ERROR_MESSAGE,
  DIALOGS_READ_MESSAGES,
  DIALOG_LOAD,
  DIALOGS_SET_TYPER,
  DIALOGS_DELETE_MESSAGE,
  DIALOG_SET_LOADING,
  DIALOGS_LOAD_MESSAGES,
  DIALOGS_UPDATE_ONLINE,
  //***********DIALOGSORDER
  DIALOGSORDER_ADD,
  DIALOGSORDER_GET,
  DIALOGSORDER_ADD_MESSAGE,
  DIALOGSORDER_SUCCESS_MESSAGE,
  DIALOGSORDER_ERROR_MESSAGE,
  DIALOGSORDER_READ_MESSAGES,
  DIALOGORDER_LOAD,
  DIALOGSORDER_SET_TYPER,
  DIALOGSORDER_DELETE_MESSAGE,
  DIALOGORDER_SET_LOADING,
  DIALOGSORDER_LOAD_MESSAGES,
  DIALOGSORDER_UPDATE_ONLINE,
  DIALOGSORDER_LOAD,
} from "../constants";

const INITIAL_STATE = {
  dialogsUser: {
    isFetching: true,
    dialogs: [],
    canLoad: false,
    isGetted: false,
    noReadCount: 0,
  },
  dialogsOrder: {
    isFetching: true,
    dialogs: [],
    canLoad: false,
    isGetted: false,
    noReadCount: 0,
  },
  dialogsALL: {
    isFetching: true,
    dialogs: [],
    canLoad: false,
    isGetted: false,
    noReadCount: 0,
  },
};

const dialogs = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //DIALOGSALL
    case DIALOGSALL_GET: {
      return {
        ...state,
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: action.payload.dialogs,
          isFetching: false,
          isGetted: true,
          noReadCount: action.payload.noReadCount,
          canLoad: action.payload.dialogs.length === settings.dialogsOnPage,
        },
      };
    }
    case DIALOGSALL_SET_LOADING: {
      return {
        ...state,
        dialogsALL: {
          ...state.dialogsALL,
          isFetching: true,
        },
      };
    }
    case DIALOGS_SET_LOADING: {
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          isFetching: true,
        },
      };
    }
    case DIALOGSORDER_SET_LOADING: {
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          isFetching: true,
        },
      };
    }
    //DIALOGSUSER
    case DIALOGS_GET: {
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: action.payload.dialogs,
          isFetching: false,
          isGetted: true,
          noReadCount: action.payload.noReadCount,
          canLoad: action.payload.dialogs.length === settings.dialogsOnPage,
        },
      };
    }
    case DIALOGS_ADD:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: [action.payload.dialog, ...state.dialogsUser.dialogs],
          noReadCount: !action.payload.isAddCount
            ? state.dialogsUser.noReadCount
            : state.dialogsUser.noReadCount + 1,
        },
      };
    case DIALOGSALL_LOAD:
      return {
        ...state,
        dialogsALL: {
          ...state.dialogsALL,
          isFetching: false,
          dialogs: [...state.dialogsALL.dialogs, ...action.payload.dialogs],
          canLoad: action.payload.dialogs.length === settings.dialogsOnPage,
        },
      };
    case DIALOGS_LOAD:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          isFetching: false,
          dialogs: [...state.dialogsUser.dialogs, ...action.payload.dialogs],
          canLoad: action.payload.dialogs.length === settings.dialogsOnPage,
        },
      };
    case DIALOGSORDER_LOAD:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          isFetching: false,
          dialogs: [...state.dialogsOrder.dialogs, ...action.payload.dialogs],
          canLoad: action.payload.dialogs.length === settings.dialogsOnPage,
        },
      };
    case DIALOG_LOAD:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: action.payload.messages,
                  isGetted: true,
                  canLoad: action.payload.canLoad,
                }
              : dialog
          ),
        },
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: state.dialogsALL.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: action.payload.messages,
                  isGetted: true,
                  canLoad: action.payload.canLoad,
                }
              : dialog
          ),
        },
      };
    case DIALOGS_ADD_MESSAGE:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs
            .map((dialog) =>
              action.payload.dialogId === dialog._id
                ? {
                    ...dialog,
                    messages: [...dialog.messages, action.payload.message],
                    lastMessage: action.payload.message,
                    noRead: action.payload.noRead
                      ? dialog.noRead + 1
                      : dialog.noRead,
                  }
                : dialog
            )
            .sort((a, b) => {
              if (!(a.lastMessage && b.lastMessage)) return 0;

              a = new Date(a.lastMessage.createdAt);
              b = new Date(b.lastMessage.createdAt);

              return a > b ? -1 : a < b ? 1 : 0;
            }),
          noReadCount: action.payload.noReadCount
            ? state.dialogsUser.noReadCount + 1
            : state.dialogsUser.noReadCount,
        },
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: state.dialogsALL.dialogs
            .map((dialog) =>
              action.payload.dialogId === dialog._id
                ? {
                    ...dialog,
                    messages: [...dialog.messages, action.payload.message],
                    lastMessage: action.payload.message,
                    noRead: action.payload.noRead
                      ? dialog.noRead + 1
                      : dialog.noRead,
                  }
                : dialog
            )
            .sort((a, b) => {
              if (!(a.lastMessage && b.lastMessage)) return 0;

              a = new Date(a.lastMessage.createdAt);
              b = new Date(b.lastMessage.createdAt);

              return a > b ? -1 : a < b ? 1 : 0;
            }),
          noReadCount: action.payload.noReadCount
            ? state.dialogsALL.noReadCount + 1
            : state.dialogsALL.noReadCount,
        },
      };
    case DIALOGSALL_ADD:
      return {
        ...state,
        dialogsALL: {
          ...state.dialogsALL,
          noReadCount: !action.payload.isAddCount
            ? state.dialogsALL.noReadCount
            : state.dialogsALL.noReadCount + 1,
        },
      };

    case DIALOGSALL_ADD_MESSAGE:
      return {
        ...state,
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: state.dialogsALL.dialogs
            .map((dialog) =>
              action.payload.dialogId === dialog._id
                ? {
                    ...dialog,
                    messages: [...dialog.messages, action.payload.message],
                    lastMessage: action.payload.message,
                    noRead: action.payload.noRead
                      ? dialog.noRead + 1
                      : dialog.noRead,
                  }
                : dialog
            )
            .sort((a, b) => {
              if (!(a.lastMessage && b.lastMessage)) return 0;

              a = new Date(a.lastMessage.createdAt);
              b = new Date(b.lastMessage.createdAt);

              return a > b ? -1 : a < b ? 1 : 0;
            }),
          noReadCount: action.payload.noReadCount
            ? state.dialogsALL.noReadCount + 1
            : state.dialogsALL.noReadCount,
        },
      };

    case DIALOGS_SUCCESS_MESSAGE:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: dialog.messages.map((message) =>
                    action.payload._id === message._id
                      ? {
                          ...message,
                          isLoading: false,
                          _id: action.payload._newId,
                          voiceSound: action.payload.voiceSound,
                        }
                      : message
                  ),
                  lastMessage: { ...dialog.lastMessage, isLoading: false },
                }
              : dialog
          ),
        },
      };
    case DIALOGS_ERROR_MESSAGE:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: dialog.messages.map((message) =>
                    action.payload._id === message._id
                      ? { ...message, isLoading: false, isError: true }
                      : message
                  ),
                  lastMessage: {
                    ...dialog.lastMessage,
                    isLoading: false,
                    isError: true,
                  },
                }
              : dialog
          ),
        },
      };
    case DIALOGS_UPDATE_ONLINE:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs.map((dialog) =>
            action.payload.userId === dialog.user._id
              ? {
                  ...dialog,
                  user: {
                    ...dialog.user,
                    online: action.payload.online,
                    onlineAt: action.payload.onlineAt,
                  },
                }
              : dialog
          ),
        },
      };
    case DIALOGS_READ_MESSAGES:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: dialog.messages.map((message) =>
                    !message.isRead &&
                    message.user._id === action.payload.userId
                      ? { ...message, isRead: true }
                      : message
                  ),
                  noRead: action.payload.noRead ? 0 : dialog.noRead,
                  lastMessage: { ...dialog.lastMessage, isRead: true },
                }
              : dialog
          ),
          noReadCount: action.payload.noReadCount
            ? state.dialogsUser.noReadCount - 1
            : state.dialogsUser.noReadCount,
        },
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: state.dialogsALL.dialogs.map((dialog) => {
            if (action.payload.dialogId === dialog._id) {
              console.log(dialog);
              return {
                ...dialog,
                messages: dialog.messages.map((message) =>
                  !message.isRead && message.user._id === action.payload.userId
                    ? { ...message, isRead: true }
                    : message
                ),
                noRead: action.payload.noRead ? 0 : dialog.noRead,
                lastMessage: { ...dialog.lastMessage, isRead: true },
              };
            } else return dialog;
          }),
          noReadCount: action.payload.noReadCount
            ? state.dialogsALL.noReadCount - 1
            : state.dialogsALL.noReadCount,
        },
      };
    case DIALOGS_DELETE_MESSAGE:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs
            .map((dialog) =>
              action.payload.dialogId === dialog._id
                ? {
                    ...dialog,
                    messages: [
                      ...dialog.messages.filter((message) => {
                        return !action.payload.messageIds.find(
                          (x) => x === message._id
                        );
                      }),
                    ],
                    lastMessage: action.payload.lastMessage,
                    noRead:
                      action.payload.noRead || action.payload.noRead === 0
                        ? action.payload.noRead
                        : dialog.noRead,
                  }
                : dialog
            )
            .sort((a, b) => {
              if (!(a.lastMessage && b.lastMessage)) return 0;

              a = new Date(a.lastMessage.createdAt);
              b = new Date(b.lastMessage.createdAt);

              return a > b ? -1 : a < b ? 1 : 0;
            }),
          noReadCount:
            action.payload.noReadCount || action.payload.noReadCount === 0
              ? action.payload.noReadCount
              : state.dialogsUser.noReadCount,
        },
      };
    case DIALOG_SET_LOADING:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs.map((dialog) =>
            action.payload === dialog._id
              ? { ...dialog, canLoad: false, isLoading: true }
              : dialog
          ),
        },
      };
    case DIALOGS_LOAD_MESSAGES:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  isLoading: false,
                  canLoad: action.payload.canLoad,
                  messages: [...action.payload.messages, ...dialog.messages],
                }
              : dialog
          ),
        },
      };
    case DIALOGS_SET_TYPER:
      return {
        ...state,
        dialogsUser: {
          ...state.dialogsUser,
          dialogs: state.dialogsUser.dialogs.map((dialog) =>
            action.payload.orderId === dialog._id
              ? { ...dialog, typing: action.payload.typing }
              : dialog
          ),
        },
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: state.dialogsALL.dialogs.map((dialog) =>
            action.payload.orderId === dialog._id
              ? { ...dialog, typing: action.payload.typing }
              : dialog
          ),
        },
      };

    ///DIALOGORDER
    case DIALOGSORDER_GET: {
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: action.payload.dialogs,
          isFetching: false,
          isGetted: true,
          noReadCount: action.payload.noReadCount,
          canLoad: action.payload.dialogs.length === settings.dialogsOnPage,
        },
      };
    }
    case DIALOGSORDER_ADD:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: [action.payload.dialog, ...state.dialogsOrder.dialogs],
          noReadCount: !action.payload.isAddCount
            ? state.dialogsOrder.noReadCount
            : state.dialogsOrder.noReadCount + 1,
        },
      };

    case DIALOGORDER_LOAD:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: action.payload.messages,
                  isGetted: true,
                  canLoad: action.payload.canLoad,
                }
              : dialog
          ),
        },
      };
    case DIALOGSORDER_ADD_MESSAGE:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs
            .map((dialog) =>
              action.payload.dialogId === dialog._id
                ? {
                    ...dialog,
                    messages: [...dialog.messages, action.payload.message],
                    lastMessage: action.payload.message,
                    noRead: action.payload.noRead
                      ? dialog.noRead + 1
                      : dialog.noRead,
                  }
                : dialog
            )
            .sort((a, b) => {
              if (!(a.lastMessage && b.lastMessage)) return 0;

              a = new Date(a.lastMessage.createdAt);
              b = new Date(b.lastMessage.createdAt);

              return a > b ? -1 : a < b ? 1 : 0;
            }),
          noReadCount: action.payload.noReadCount
            ? state.dialogsOrder.noReadCount + 1
            : state.dialogsOrder.noReadCount,
        },
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: state.dialogsALL.dialogs
            .map((dialog) =>
              action.payload.dialogId === dialog._id
                ? {
                    ...dialog,
                    messages: [...dialog.messages, action.payload.message],
                    lastMessage: action.payload.message,
                    noRead: action.payload.noRead
                      ? dialog.noRead + 1
                      : dialog.noRead,
                  }
                : dialog
            )
            .sort((a, b) => {
              if (!(a.lastMessage && b.lastMessage)) return 0;

              a = new Date(a.lastMessage.createdAt);
              b = new Date(b.lastMessage.createdAt);

              return a > b ? -1 : a < b ? 1 : 0;
            }),
          noReadCount: action.payload.noReadCount
            ? state.dialogsALL.noReadCount + 1
            : state.dialogsALL.noReadCount,
        },
      };
    case DIALOGSORDER_SUCCESS_MESSAGE:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: dialog.messages.map((message) =>
                    action.payload._id === message._id
                      ? {
                          ...message,
                          isLoading: false,
                          _id: action.payload._newId,
                          voiceSound: action.payload.voiceSound,
                        }
                      : message
                  ),
                  lastMessage: { ...dialog.lastMessage, isLoading: false },
                }
              : dialog
          ),
        },
      };
    case DIALOGSORDER_ERROR_MESSAGE:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: dialog.messages.map((message) =>
                    action.payload._id === message._id
                      ? { ...message, isLoading: false, isError: true }
                      : message
                  ),
                  lastMessage: {
                    ...dialog.lastMessage,
                    isLoading: false,
                    isError: true,
                  },
                }
              : dialog
          ),
        },
      };
    case DIALOGSORDER_UPDATE_ONLINE:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs.map((dialog) =>
            action.payload.userId === dialog.user._id
              ? {
                  ...dialog,
                  user: {
                    ...dialog.user,
                    online: action.payload.online,
                    onlineAt: action.payload.onlineAt,
                  },
                }
              : dialog
          ),
        },
      };
    case DIALOGSORDER_READ_MESSAGES:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: dialog.messages.map((message) =>
                    !message.isRead &&
                    message.user._id === action.payload.userId
                      ? { ...message, isRead: true }
                      : message
                  ),
                  noRead: action.payload.noRead ? 0 : dialog.noRead,
                  lastMessage: { ...dialog.lastMessage, isRead: true },
                }
              : dialog
          ),
          noReadCount: action.payload.noReadCount
            ? state.dialogsOrder.noReadCount - 1
            : state.dialogsOrder.noReadCount,
        },
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: state.dialogsALL.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  messages: dialog.messages.map((message) =>
                    !message.isRead &&
                    message.user._id === action.payload.userId
                      ? { ...message, isRead: true }
                      : message
                  ),
                  noRead: action.payload.noRead ? 0 : dialog.noRead,
                  lastMessage: { ...dialog.lastMessage, isRead: true },
                }
              : dialog
          ),
          noReadCount: action.payload.noReadCount
            ? state.dialogsALL.noReadCount - 1
            : state.dialogsALL.noReadCount,
        },
      };
    case DIALOGSORDER_DELETE_MESSAGE:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs
            .map((dialog) =>
              action.payload.dialogId === dialog._id
                ? {
                    ...dialog,
                    messages: [
                      ...dialog.messages.filter((message) => {
                        return !action.payload.messageIds.find(
                          (x) => x === message._id
                        );
                      }),
                    ],
                    lastMessage: action.payload.lastMessage,
                    noRead:
                      action.payload.noRead || action.payload.noRead === 0
                        ? action.payload.noRead
                        : dialog.noRead,
                  }
                : dialog
            )
            .sort((a, b) => {
              if (!(a.lastMessage && b.lastMessage)) return 0;

              a = new Date(a.lastMessage.createdAt);
              b = new Date(b.lastMessage.createdAt);

              return a > b ? -1 : a < b ? 1 : 0;
            }),
          noReadCount:
            action.payload.noReadCount || action.payload.noReadCount === 0
              ? action.payload.noReadCount
              : state.dialogsOrder.noReadCount,
        },
      };
    case DIALOGORDER_SET_LOADING:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs.map((dialog) =>
            action.payload === dialog._id
              ? { ...dialog, canLoad: false, isLoading: true }
              : dialog
          ),
        },
      };
    case DIALOGS_SET_NOREAD: {
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          noReadCount: action.payload.dialogsCount.order
            ? action.payload.dialogsCount.order.count
            : 0,
        },
        dialogsUser: {
          ...state.dialogsUser,
          noReadCount: action.payload.dialogsCount.user
            ? action.payload.dialogsCount.user.count
            : 0,
        },
        dialogsALL: {
          ...state.dialogsALL,
          noReadCount:
            (action.payload.dialogsCount.user
              ? action.payload.dialogsCount.user.count
              : 0) +
            (action.payload.dialogsCount.order
              ? action.payload.dialogsCount.order.count
              : 0),
        },
      };
    }
    case DIALOGSORDER_LOAD_MESSAGES:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs.map((dialog) =>
            action.payload.dialogId === dialog._id
              ? {
                  ...dialog,
                  isLoading: false,
                  canLoad: action.payload.canLoad,
                  messages: [...action.payload.messages, ...dialog.messages],
                }
              : dialog
          ),
        },
      };
    case DIALOGSORDER_SET_TYPER:
      return {
        ...state,
        dialogsOrder: {
          ...state.dialogsOrder,
          dialogs: state.dialogsOrder.dialogs.map((dialog) =>
            action.payload.orderId === dialog._id
              ? { ...dialog, typing: action.payload.typing }
              : dialog
          ),
        },
        dialogsALL: {
          ...state.dialogsALL,
          dialogs: state.dialogsALL.dialogs.map((dialog) =>
            action.payload.orderId === dialog._id
              ? { ...dialog, typing: action.payload.typing }
              : dialog
          ),
        },
      };
    default:
      return state;
  }
};

export default dialogs;
