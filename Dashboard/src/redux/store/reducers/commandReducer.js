import * as actionType from "../actions";

const commandReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.ADDROOM:
      return {
        ...action.rooms,
      };
    case actionType.ADDSTAFF:
      return {
        ...action.person,
      };

    case actionType.GETALLROOM:
      return {
        ...action.rooms,
      };
    case actionType.GETROOMCOUNT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default commandReducer;
