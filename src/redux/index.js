import { combineReducers, createStore } from "redux";

export const USER_ACTION = {
  SET: "set",
  REMOVED: "removed",
};

const initialUser = null;

function userReducer(state = initialUser, action) {
  switch (action.type) {
    case USER_ACTION.SET:
      return action.user;
    case USER_ACTION.SET:
      return null;
    default:
      //   throw Error("Dispatch wrong action");
      return state;
  }
}

const allReducers = combineReducers({ user: userReducer });

export const store = createStore(allReducers);
