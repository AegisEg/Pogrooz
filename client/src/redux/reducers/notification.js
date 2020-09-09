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
} from "../constants";

const INITIAL_STATE = {
  all: {
    isFetching: true,
    getted: false,
    notifications: [],
    noRead: 0,
    onlyNoread: [],
  },
  offer: { isFetching: true, getted: false, notifications: [], noRead: 0 },
  order: { isFetching: true, getted: false, notifications: [], noRead: 0 },
  system: { isFetching: true, getted: false, notifications: [], noRead: 0 },
  tarrif: { isFetching: true, getted: false, notifications: [], noRead: 0 },
};

const rooms = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_ALL_GET: {
      return {
        ...state,
        all: {
          ...state.all,
          notifications: action.payload,
          isFetching: false,
          getted: true,
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
          getted: true,
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
          isFetching: false,
          getted: true,
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
          isFetching: false,
          getted: true,
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
        tarrif: {
          ...state.tarrif,
          notifications: action.payload,
          isFetching: false,
          getted: true,
        },
      };
    }
    case NOTIFICATIONS_TARRIFS_ADD:
      return {
        ...state,
        tarrif: {
          ...state.tarrif,
          notifications: [action.payload, ...state.tarrif.notifications],
          noRead: state.tarrif.noRead + 1,
        },
      };
    case NOTIFICATIONS_TARRIFS_READ:
      return {
        ...state,
        tarrif: {
          ...state.tarrif,
          notifications: state.tarrif.notifications.map((notification) =>
            action.payload === notification._id
              ? { ...notification, isRead: true }
              : notification
          ),
          noRead: state.tarrif.noRead - 1,
        },
      };
    case NOTIFICATIONS_TARRIFS_SET_NO_READ:
      return { ...state, tarrif: { ...state.tarrif, noRead: action.payload } };
    default:
      return state;
  }
};

export default rooms;
