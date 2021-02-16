let mqtt = require("mqtt");
require("dotenv/config");

let mqttClient = function () {
  let options = {
    port: 1883,
    http: { port: 8089, bundle: true, static: './' },
    clientId: "/scanner/" + process.env.FLOOR + "/" + process.env.ROOM
  };

  console.log("mqttClient");
  let client = mqtt.connect("mqtt://localhost", options);
  client.on("connect", function () {
    console.log("mqttClient connect");
  });

  function publishMessage(topic, message) {
    client.publish(topic, message);
  }

  function subscribe(topic, message) {
    client.subscribe(topic,message);
  }

  function unsubscribe(topic) {
    client.unsubscribe(topic);
  }

  return {
    publishMessage,
    subscribe,
    unsubscribe,
  };
};

module.exports = mqttClient();
