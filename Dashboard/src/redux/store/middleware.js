import MQTT from "mqtt";
import { COUNTROOM, roomList, result } from "./actions/roomActions";
import { users, Room_Staff } from "./actions/personsAction";
import { Staff_Log, Capacity_Full } from "./actions/activityAction";
import * as actionType from "./actions";
export const middleware = (config) => ({ dispatch }) => {
  const clientId = Math.floor(Math.random() * 999999) + 1;
  let client = null;

  function initConnection() {
    client = MQTT.connect(config);
    client.on("connect", function () {
      client.subscribe("admin/" + clientId + "/#");
      client.subscribe("update/#");
      client.subscribe("alarm/#");
    });

    client.on("message", (topic, message) => {
      const msgObj = JSON.parse(message);
      if (
        topic === "admin/" + clientId + "/v" &&
        msgObj.type === "ALLROOM"
      ) {
        dispatch(roomList(msgObj));
      } else if (
        topic === "admin/" + clientId + "/v" &&
        msgObj.type === "COUNTROOM"
      ) {
        dispatch(COUNTROOM(msgObj));
      } else if (
        topic === "admin/" + clientId + "/v" &&
        msgObj.type === "personList"
      ) {
        dispatch(users(msgObj));
      } else if (
        topic === "admin/" + clientId + "/v" &&
        msgObj.type === "Room_Staff"
      ) {
        dispatch(Room_Staff(msgObj));
      } else if (topic === "update/room") {
        dispatch(COUNTROOM(msgObj));
      } else if (topic === "update/useractivity") {
        dispatch(Staff_Log(msgObj));
      } else if (topic === "alarm/room") {
        dispatch(Capacity_Full(msgObj));
      } else if (topic === "admin/" + clientId + "/result/success") {
        dispatch(result(msgObj));
      } else if (topic === "admin/" + clientId + "/result/fail") {
        dispatch(result(msgObj));
      }
    });
  }

  return (next) => (action) => {
    if (action.type === actionType.STARTMQTT) {
      initConnection();
      return;
    }

    if (!client) {
      next(action);
      return;
    }
    switch (action.type) {
      case actionType.ADDROOM:
        client.publish(
          "command/" + clientId + "/s",
          JSON.stringify(action.payload)
        );
        break;
      case actionType.GETALLROOM:
        client.publish(
          "command/" + clientId + "/s",
          JSON.stringify(action.payload)
        );
        break;
      case actionType.GETROOMCOUNT:
        client.publish(
          "command/" + clientId + "/s",
          JSON.stringify(action.payload)
        );
        break;
      case actionType.ADDSTAFF:
        client.publish(
          "command/" + clientId + "/s",
          JSON.stringify(action.payload)
        );
        break;
      case actionType.GETALLSTAFF:
        client.publish(
          "command/" + clientId + "/s",
          JSON.stringify(action.payload)
        );
        break;
      case actionType.GETROOMSTAFF:
        client.publish(
          "command/" + clientId + "/s",
          JSON.stringify(action.payload)
        );
        break;

      default:
        break;
    }
    //client.publish('testtopic/aliceinwonder','This is a test message')
    next(action);
  };
};

export default middleware;
