import * as action from '../actions'

export const result = data => ({
  type:action.RESULT,
  payload:data
})

export const resetResult = () => ({
  type:action.RESETRESULT
})
