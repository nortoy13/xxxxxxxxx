import { FETCH_USER, FETCH_USERS, DELETE, BLOCK } from "../constants/actionTypes";
const usersReducer = (state = { userInfo: null, allUsers: null }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, userInfo: action.payload };
    case FETCH_USERS:
      return { ...state, allUsers: action.payload };
    case DELETE:
      return { ...state, allUsers: state.allUsers.filter((user) => user._id !== action.payload) };
    case BLOCK:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user._id === action.payload ? action.payload : user
        ),
      };
    default:
      return state;
  }
};

export default usersReducer;
