import { userActions } from "../actions";

const initState = {
  listUsers: [],
  totalUser: 0,
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case userActions.GET_LIST_USER:
      return {
        ...state,
        loading: true,
      };
    case userActions.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        listUsers: action?.payload?.results,
        totalUser: action?.payload?.total,
      };

    default:
      return state;
  }
};

export default UserReducer;
