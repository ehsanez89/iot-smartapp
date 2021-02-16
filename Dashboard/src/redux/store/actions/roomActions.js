import * as action from '../actions'

export const result = data => ({
  type:action.RESULT,
  payload:data
})

export const roomList = roomParams => ({
  type: action.ALLROOM,
  payload: {
    rooms: roomParams.result
  },
});

export const COUNTROOM = roomParams => ({
  type: action.ROOMCOUNT,
  payload: {
    rooms: roomParams.result
  },
});

