import * as action from '../actions'

export const Staff_Log = personParams => ({
  type: action.STAFFLOG,
  payload: {
    persons: personParams.result
  },
});

export const Capacity_Full = personParams => ({
  type: action.CAPACITYFULL,
  payload: {
    persons: personParams.result
  },
});
