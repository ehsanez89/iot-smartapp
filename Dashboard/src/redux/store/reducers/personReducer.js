import * as actionType from "../actions";

const INIT_STATE = {
  allUser: [],
};

const PersonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionType.ALLSTAFF:
      return {
        ...state,
        allUser: [...action.payload.persons],
      };
    case actionType.ROOMSTAFF:
      return {
        ...state,
        allUser: [...action.payload.persons],
      };

    default:
      return state;
  }
};

export default PersonReducer;
