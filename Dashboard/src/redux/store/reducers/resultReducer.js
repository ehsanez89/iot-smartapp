import * as actionType from "../actions";

const INIT_STATE = {
  result: {},
};

const resultReducer = (state = INIT_STATE, action) => {
  if (action.type === actionType.RESULT) {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === actionType.RESETRESULT) {
    state = INIT_STATE;
    return state;
  } else {
    return state;
  }
};

export default resultReducer;
