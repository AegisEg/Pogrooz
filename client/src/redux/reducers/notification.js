import {
  NOTIFICATIONS_ALL_GET,
  NOTIFICATIONS_ALL_ADD,
  NOTIFICATIONS_ALL_READ,
  NOTIFICATIONS_ALL_SET_NO_READ,
  NOTIFICATIONS_OFFERS_GET,
  NOTIFICATIONS_OFFERS_ADD,
  NOTIFICATIONS_OFFERS_READ,
  NOTIFICATIONS_OFFERS_SET_NO_READ,
  NOTIFICATIONS_ORDERS_GET,
  NOTIFICATIONS_ORDERS_ADD,
  NOTIFICATIONS_ORDERS_READ,
  NOTIFICATIONS_ORDERS_SET_NO_READ,
  NOTIFICATIONS_SYSTEM_GET,
  NOTIFICATIONS_SYSTEM_ADD,
  NOTIFICATIONS_SYSTEM_READ,
  NOTIFICATIONS_SYSTEM_SET_NO_READ,
  NOTIFICATIONS_TARRIFS_GET,
  NOTIFICATIONS_TARRIFS_ADD,
  NOTIFICATIONS_TARRIFS_READ,
  NOTIFICATIONS_TARRIFS_SET_NO_READ,
  NOTIFICATIONS_NOREAD_GET,
  NOTIFICATIONS_NOREAD_ADD,
  NOTIFICATIONS_READ_ALL,
  //Load
  NOTIFICATIONS_ALL_LOAD,
  NOTIFICATIONS_OFFERS_LOAD,
  NOTIFICATIONS_ORDERS_LOAD,
  NOTIFICATIONS_SYSTEM_LOAD,
  NOTIFICATIONS_TARRIFS_LOAD,
  NOTIFICATIONS_ALL_LOADING,
  NOTIFICATIONS_OFFERS_LOADING,
  NOTIFICATIONS_ORDERS_LOADING,
  NOTIFICATIONS_SYSTEM_LOADING,
  NOTIFICATIONS_TARRIFS_LOADING,
  NOTIFICATIONS_SET_COUNT,
} from "../constants";
import settings from "../../config/settings";
const INITIAL_STATE = {
  all: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    onlyNoread: [],
    canLoad: true,
  },
  offer: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    canLoad: true,
  },
  order: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    canLoad: true,
  },
  system: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    canLoad: true,
  },
  tariff: {
    isFetching: true,
    isGetted: false,
    notifications: [],
    noRead: 0,
    canLoad: true,
  },
};

const notifications = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_READ_ALL: {
      return {
        ...state,
        all: {
          ...state.all,
          notifications: state.all.notifications.map((item) => ({
            ...item,
            isRead: true,
          })),
          onlyNoread: [],
          noRead: 0,
        },
        offer: {
          ...state.offer,
          noRead: 0,
        },
        order: {
          ...state.order,
          noRead: 0,
        },
        system: {
          ...state.system,
          noRead: 0,
        },
        tariff: {
          ...state.tariff,
          noRead: 0,
        },
      };
    }
    case NOTIFICATIONS_SET_COUNT: {
      return {
        ...state,
        all: {
          ...state.all,
          noRead:
            action.payload
              .map((item) => item.count)
              .reduce((a, b) => {
                return a + b;
              }, 0) || 0,
        },
        offer: {
          ...state.offer,
          noRead: action.payload.find((item) => item._id === "offer")
            ? action.payload.find((item) => item._id === "offer").count
            : 0,
        },
        order: {
          ...state.order,
          noRead: action.payload.find((item) => item._id === "order")
            ? action.payload.find((item) => item._id === "order").count
            : 0,
        },
        system: {
          ...state.system,
          noRead: action.payload.find((item) => item._id === "system")
            ? action.payload.find((item) => item._id === "system").count
            : 0,
        },
        tariff: {
          ...state.tariff,
          noRead: action.payload.find((item) => item._id === "tariff")
            ? action.payload.find((item) => item._id === "tariff").count
            : 0,
        },
      };
    }
    case NOTIFICATIONS_ALL_GET: {
      return {
        ...state,
        all: {
          ...state.all,
          notifications: action.payload,
          isFetching: false,
          canLoad: action.payload.length === settings.notificationCountOfPage,
          isGetted: true,
        },
      };
    }
    case NOTIFICATIONS_NOREAD_GET: {
      return {
        ...state,
        all: {
          ...state.all,
          onlyNoread: action.payload,
        },
      };
    }
    case NOTIFICATIONS_NOREAD_ADD: {
      return {
        ...state,
        all: {
          ...state.all,
          onlyNoread: [action.payload, ...state.all.onlyNoread],
        },
      };
    }
    case NOTIFICATIONS_ALL_ADD:
      return {
        ...state,
        all: {
          ...state.all,
          notifications: [action.payload, ...state.all.notifications],
          noRead: state.all.noRead + 1,
          onlyNoread: [action.payload, ...state.all.onlyNoread],
        },
      };
    case NOTIFICATIONS_ALL_READ:
      return {
        ...state,
        all: {
          ...state.all,
          notifications: state.all.notifications.map((notification) =>
            action.payload === notification._id
              ? { ...notification, isRead: true }
              : notification
          ),
          onlyNoread: state.all.onlyNoread.filter(
            (notification) => action.payload !== notification._id
          ),
          noRead: state.all.noRead - 1,
        },
      };
    case NOTIFICATIONS_ALL_SET_NO_READ:
      return { ...state, all: { ...state.all, noRead: action.payload } };
    //OFFERS
    case NOTIFICATIONS_OFFERS_GET: {
      return {
        ...state,
        offer: {
          ...state.offer,
          notifications: action.payload,
          isFetching: false,
          canLoad: action.payload.length === settings.notificationCountOfPage,
          isGetted: true,
        },
      };
    }
    case NOTIFICATIONS_OFFERS_ADD:
      return {
        ...state,
        offer: {
          ...state.offer,
          notifications: [action.payload, ...state.offer.notifications],
          noRead: state.offer.noRead + 1,
        },
        all: {
          ...state.all,
          notifications: [action.payload, ...state.all.notifications],
          noRead: state.all.noRead + 1,
          onlyNoread: [action.payload, ...state.all.onlyNoread],
        },
      };
    case NOTIFICATIONS_OFFERS_READ:
      return {
        ...state,
        offer: {
          ...state.offer,
          notifications: state.offer.notifications.map((notification) =>
            action.payload === notification._id
              ? { ...notification, isRead: true }
              : notification
          ),
          noRead: state.offer.noRead - 1,
        },
      };
    case NOTIFICATIONS_OFFERS_SET_NO_READ:
      return { ...state, offer: { ...state.offer, noRead: action.payload } };
    //ORDERS
    case NOTIFICATIONS_ORDERS_GET: {
      return {
        ...state,
        order: {
          ...state.order,
          notifications: action.payload,
          canLoad: action.payload.length === settings.notificationCountOfPage,
          isFetching: false,
          isGetted: true,
        },
      };
    }
    case NOTIFICATIONS_ORDERS_ADD:
      return {
        ...state,
        order: {
          ...state.order,
          notifications: [action.payload, ...state.order.notifications],
          noRead: state.order.noRead + 1,
        },
        all: {
          ...state.all,
          notifications: [action.payload, ...state.all.notifications],
          noRead: state.all.noRead + 1,
          onlyNoread: [action.payload, ...state.all.onlyNoread],
        },
      };
    case NOTIFICATIONS_ORDERS_READ:
      return {
        ...state,
        order: {
          ...state.order,
          notifications: state.order.notifications.map((notification) =>
            action.payload === notification._id
              ? { ...notification, isRead: true }
              : notification
          ),
          noRead: state.order.noRead - 1,
        },
      };
    case NOTIFICATIONS_ORDERS_SET_NO_READ:
      return { ...state, order: { ...state.order, noRead: action.payload } };
    //SYSTEM
    case NOTIFICATIONS_SYSTEM_GET: {
      return {
        ...state,
        system: {
          ...state.system,
          notifications: action.payload,
          canLoad: action.payload.length === settings.notificationCountOfPage,
          isFetching: false,
          isGetted: true,
        },
      };
    }
    case NOTIFICATIONS_SYSTEM_ADD:
      return {
        ...state,
        system: {
          ...state.system,
          notifications: [action.payload, ...state.system.notifications],
          noRead: state.system.noRead + 1,
        },
        all: {
          ...state.all,
          notifications: [action.payload, ...state.all.notifications],
          noRead: state.all.noRead + 1,
          onlyNoread: [action.payload, ...state.all.onlyNoread],
        },
      };
    case NOTIFICATIONS_SYSTEM_READ:
      return {
        ...state,
        system: {
          ...state.system,
          notifications: state.system.notifications.map((notification) =>
            action.payload === notification._id
              ? { ...notification, isRead: true }
              : notification
          ),
          noRead: state.system.noRead - 1,
        },
      };
    case NOTIFICATIONS_SYSTEM_SET_NO_READ:
      return { ...state, system: { ...state.system, noRead: action.payload } };
    //TARRIFS
    case NOTIFICATIONS_TARRIFS_GET: {
      return {
        ...state,
        tariff: {
          ...state.tariff,
          notifications: action.payload,
          canLoad: action.payload.length === settings.notificationCountOfPage,
          isFetching: false,
          isGetted: true,
        },
      };
    }
    case NOTIFICATIONS_TARRIFS_ADD:
      return {
        ...state,
        tariff: {
          ...state.tariff,
          notifications: [action.payload, ...state.tariff.notifications],
          noRead: state.tariff.noRead + 1,
        },
        all: {
          ...state.all,
          notifications: [action.payload, ...state.all.notifications],
          noRead: state.all.noRead + 1,
          onlyNoread: [action.payload, ...state.all.onlyNoread],
        },
      };
    case NOTIFICATIONS_TARRIFS_READ:
      return {
        ...state,
        tariff: {
          ...state.tariff,
          notifications: state.tariff.notifications.map((notification) =>
            action.payload === notification._id
              ? { ...notification, isRead: true }
              : notification
          ),
          noRead: state.tariff.noRead - 1,
        },
      };
    case NOTIFICATIONS_TARRIFS_SET_NO_READ:
      return { ...state, tariff: { ...state.tariff, noRead: action.payload } };
    //LoadING
    case NOTIFICATIONS_ALL_LOADING:
      return { ...state, all: { ...state.all, isFetching: true } };
    case NOTIFICATIONS_OFFERS_LOADING:
      return { ...state, offer: { ...state.offer, isFetching: true } };
    case NOTIFICATIONS_ORDERS_LOADING:
      return { ...state, order: { ...state.order, isFetching: true } };
    case NOTIFICATIONS_SYSTEM_LOADING:
      return { ...state, system: { ...state.system, isFetching: true } };
    case NOTIFICATIONS_TARRIFS_LOADING:
      return { ...state, tariff: { ...state.tariff, isFetching: true } };
    //LOAD
    case NOTIFICATIONS_ALL_LOAD:
      return {
        ...state,
        all: {
          ...state.all,
          notifications: [
            ...state.all.notifications,
            ...action.payload.notifications,
          ],
          canLoad:
            action.payload.notifications.length ===
            settings.notificationCountOfPage,
          isGetted: true,
          isFetching: false,
        },
      };
    case NOTIFICATIONS_OFFERS_LOAD:
      return {
        ...state,
        offer: {
          ...state.offer,
          notifications: [
            ...state.offer.notifications,
            ...action.payload.notifications,
          ],
          canLoad:
            action.payload.notifications.length ===
            settings.notificationCountOfPage,
          isGetted: true,
          isFetching: false,
        },
      };
    case NOTIFICATIONS_ORDERS_LOAD:
      return {
        ...state,
        order: {
          ...state.order,
          notifications: [
            ...state.order.notifications,
            ...action.payload.notifications,
          ],
          canLoad:
            action.payload.notifications.length ===
            settings.notificationCountOfPage,
          isGetted: true,
          isFetching: false,
        },
      };
    case NOTIFICATIONS_SYSTEM_LOAD:
      return {
        ...state,
        system: {
          ...state.system,
          notifications: [
            ...state.system.notifications,
            ...action.payload.notifications,
          ],
          canLoad:
            action.payload.notifications.length ===
            settings.notificationCountOfPage,
          isGetted: true,
          isFetching: false,
        },
      };
    case NOTIFICATIONS_TARRIFS_LOAD:
      return {
        ...state,
        tariff: {
          ...state.tariff,
          notifications: [
            ...state.tariff.notifications,
            ...action.payload.notifications,
          ],
          canLoad:
            action.payload.notifications.length ===
            settings.notificationCountOfPage,
          isGetted: true,
          isFetching: false,
        },
      };
    default:
      return state;
  }
};

export default notifications;
