import * as actionType from "../actions";
const INIT_STATE = {
  activityLog: [],
};

const activityReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionType.STAFFLOG:
      return {
        ...state,
        activityLog: [...state.activityLog, ...action.payload.persons],
      };
    case actionType.CAPACITYFULL:
      return {
        ...state,
        activityLog: [...state.activityLog, ...action.payload.persons],
      };

    default:
      return state;
  }
};

export default activityReducer;
