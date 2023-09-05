import { permissionActions } from "../actions";

const initState = {
  listPermission: [],
};

const PermissionReducer = (state = initState, action) => {
  switch (action.type) {
    case permissionActions.GET_LIST_PERMISSION:
      return {
        ...state,
        loading: true,
      };
    case permissionActions.GET_LIST_PERMISSION_SUCCESS:
      return {
        ...state,
        listPermission: action?.payload?.results,
        loading: false,
      };

    default:
      return state;
  }
};

export default PermissionReducer;
