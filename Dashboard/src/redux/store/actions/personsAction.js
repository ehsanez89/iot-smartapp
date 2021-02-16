import * as action from '../actions'

export const users = personParams => ({
    type: action.ALLSTAFF,
    payload: {
      persons: personParams.result
    },
});

export const Room_Staff = personParams => ({
    type: action.ROOMSTAFF,
    payload: {
      persons: personParams.result
    },
});