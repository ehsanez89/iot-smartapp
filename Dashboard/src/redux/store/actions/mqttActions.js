import * as action from '../actions'

export const Start_Mqtt = () => ({
  type:action.STARTMQTT,
})


export const Count_Room = (floors, rooms )=> ({
  type:action.GETROOMCOUNT,
  payload:{
    type: action.GETROOMCOUNT,
    floor:floors,
    room:rooms
  }
})

export const addRoom = data => ({
  type:action.ADDROOM,
  payload:data
})

export const All_Room = () => ({
  type:action.GETALLROOM,
  payload:{
    type: action.GETALLROOM
  }
})

export const addStaff = data => ({
  type:action.ADDSTAFF,
  payload:data
})

export const allStaff = ( )=> ({
  type:action.GETALLSTAFF,
  payload:{
    type: action.GETALLSTAFF
  }
})

export const roomStaff = (floors, rooms )=> ({
  type:action.GETROOMSTAFF,
  payload:{
    type: action.GETROOMSTAFF,
    floor:floors,
    room:rooms
  }
})


export const result = data => ({
  type:action.RESULT,
  payload:data

})


