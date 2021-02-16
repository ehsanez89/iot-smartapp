const mosca = require("mosca");
const DB_Handler = require("./db/DB_Handler");
let db = new DB_Handler();
var nodemailer = require('nodemailer');


            //NodeMailer configuration

            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              requireTLS: true,
              auth: {
                user: 'test@gmail.com',
                pass: 'Test@21'
              }
            });


            var mailOptions = {
              from: 'test@gmail.com',
              to: 'test2@gmail.com', // here we can add array of users that are located in overcrowded room
              subject: 'Sending Email using Node.js',
              text: 'Room is FULL!'
            };




          let settings = {
            port: 1883,
            persistence: mosca.persistence.Memory,
            http: { port: 3002, bundle: true, static: "./" },
          };
          let server = new mosca.Server(settings, function () {
            console.log("Mqtt server");
          });




        // Room Capicity Notification and Send Notification Email
        let notificationMNG = (floor, room) => {
          //send alarm by mqtt
          const topic = "alarm/room";
          const answer = {
            type: "roomoverload",
            room: room,
            floor: floor,
          };
          console.log(
            "start publist ",
            JSON.stringify({ type: "roomoverload", result: [answer] })
          );
          server.publish({
            topic: topic,
            payload: JSON.stringify({ type: "roomoverload", result: [answer] }),
          });

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          db.clientInRoom(floor, room, (err, res) => {
            if (!err) {
              res.forEach((element) => {
                const topic = "/user/server/" + element.user.uid;
                server.publish({
                  topic: topic,
                  payload: JSON.stringify({ type: "roomover" }),
                });
              });
            }
          });
        };

      let connection = function Broker() {
        server.on("ready", function () {
          console.log("ready");
        });

        server.on("clientConnected", function (client) {
          console.log("Scanner Connected => ", client.id);
          if (client.id.match(new RegExp(/^scanner\/[0-9]*\/[0-9]*$/))) {
              console.log('new scanner : ', client.id);
              let floor=client.id.split('\/')[1]
              let room=client.id.split('\/')[2]
              db.insertScanner(floor,room)
          }
        });

  server.on("clientDisconnected", function (client) {
    console.log("Scanner Disconnected");
    if (client.id.match(new RegExp(/^scanner\/[0-9]*\/[0-9]*$/))) {
      let floor = client.id.split("/")[1];
      let room = client.id.split("/")[2];
      db.resetSensor(floor, room);
    }
  });

  server.on("published", function (packet, client) {
    if (client != null) {
      if (packet.topic.match(new RegExp(/^command\/[0-9]*\/s$/))) {
        let client__Id = packet.topic.split("/")[1];
        console.log("clientID =====> ", client__Id);
        let data = JSON.parse(packet.payload.toString());
        console.log("data =====> ", data);
        switch (data.type) {
          case "/ADDROOM":
            db.addScanner(
              data.name,
              data.floor,
              data.room,
              data.capacity,
              data.sensorid,
              (e, r) => {
                if (e == null) {
                  const topic = "admin/" + client__Id + "/result/success";
                  console.log(" publish >> ", topic);
                  server.publish({
                    topic: topic,
                    payload: JSON.stringify({ result: "done" }),
                  });
                } else {
                  const topic = "admin/" + client__Id + "/result/fail";
                  console.log(" publish >> ", topic);
                  server.publish({
                    topic: topic,
                    payload: JSON.stringify({ result: "fail" }),
                  });
                }
              }
            );
            break;
            case "/GETROOMSTAFF":
              db.clientInRoom(
                data.floor,
                data.room,
                (err, res) => {
                  if (err == null) {
                    const topic = "admin/" + client__Id + "/v";
                    server.publish({
                      topic: topic,
                      payload: JSON.stringify({
                        type: "Room_Staff",
                        result: res,
                      }),
                    });
                  }
                }
              );
  
              break;
          case "/ADDSTAFF":
            db.addUser(data, (e) => {
              if (e == null) {
                const topic = "admin/" + client__Id + "/result/success";
                console.log(" publish >> ", topic);
                server.publish({
                  topic: topic,
                  payload: JSON.stringify({ result: "done" }),
                });
              } else {
                const topic = "admin/" + client__Id + "/result/fail";
                console.log(" publish >> ", topic);
                server.publish({
                  topic: topic,
                  payload: JSON.stringify({ result: "fail" }),
                });
              }
            });
            break;

          case "/GETALLROOM":
            db.getAllScanners((err, res) => {
              if (err == null) {
                const topic = "admin/" + client__Id + "/v";
                server.publish({
                  topic: topic,
                  payload: JSON.stringify({ type: "ALLROOM", result: res }),
                });
              }
            });
            break;
          case "/GETALLSTAFF":
            db.allStaff((err, res) => {
              if (err == null) {
                const topic = "admin/" + client__Id + "/v";
                server.publish({
                  topic: topic,
                  payload: JSON.stringify({ type: "personList", result: res }),
                });
              }
            });

            break;
     
          case "/GETROOMCOUNT":
            db.countClientinRoom(
              data.floor,
              data.room,
              (err, res) => {
                if (err == null) {
                  const topic = "admin/" + client__Id + "/v";
                  const answer = {
                    count: res,
                    room: data.room,
                    floor: data.floor,
                  };
                  console.log(JSON.stringify({ result: answer }));
                  server.publish({
                    topic: topic,
                    payload: JSON.stringify({
                      type: "COUNTROOM",
                      result: answer,
                    }),
                  });
                }
              }
            );
            break;
          default:
            break;
        }
        //console.log('published',packet);
      }
    }
  });

  server.on("subscribed", function (topic, client) {
    if (client != null) {

      if (topic.match(new RegExp(/^\/unige\/[0-9]*\/[0-9]*\/[0-9A-Z-]*$/))) {
        console.log("new Client : ", topic);
        let floor = topic.split("/")[2];
        let room = topic.split("/")[3];
        let clientId = topic.split("/")[4];
        let timeIn = Date.now();
        db.addClient(floor, room, clientId, timeIn, () => {
          db.countClientinRoom(floor, room, (err, res) => {
            if (err == null) {
              const topic = "update/room";
              const answer = {
                count: res,
                room: room,
                floor: floor,
              };
              console.log(
                JSON.stringify({ type: "COUNTROOM", result: answer })
              );
              server.publish({
                topic: topic,
                payload: JSON.stringify({ type: "COUNTROOM", result: answer }),
              });
              db.getScanner(floor, room, (err, result) => {
                if (!err && result) {
                  console.log(result.capacity, " ", res);
                  if (res >= result.capacity) {
                    notificationMNG(floor, room);
                  }
                }
              });
            }
          });
          db.userByUUID(clientId, (err, res) => {
            const topic = "update/useractivity";
            const answer = {
              user: res,
              action: "entertoroom",
              room: room,
              floor: floor,
              time: timeIn,
            };
            server.publish({
              topic: topic,
              payload: JSON.stringify({
                type: "useractivity",
                result: [answer],
              }),
            });
          });
        });
      } else if (topic.match(new RegExp(/^\/unige\/[0-9]*\/[0-9A-Z-]*\/[0-9A-Z-]*$/))) {
        let floor = topic.split("/")[2];
        let room = topic.split("/")[3];
        let clientId = topic.split("/")[4];
        db.addClient(floor, room, clientId, Date.now(), () => {});
      }
    }
  });

  server.on("unsubscribed", function (topic, client) {
    if (client != null) {

      if (topic.match(new RegExp(/^\/unige\/[0-9]*\/[0-9]*\/[0-9A-Z-]*$/))) {
        console.log("new Client : ", topic);
        let floor = topic.split("/")[2];
        let room = topic.split("/")[3];
        let clientId = topic.split("/")[4];
        let timeIn = Date.now();

        db.resetClient(floor, room, clientId, timeIn, () => {
          db.countClientinRoom(floor, room, (err, res) => {
            if (err == null) {
              const topic = "update/room";
              const answer = {
                count: res,
                room: room,
                floor: floor,
              };
              console.log(".............");
              console.log(JSON.stringify({ result: answer }));
              server.publish({
                topic: topic,
                payload: JSON.stringify({ type: "COUNTROOM", result: answer }),
              });
            }
          });

          db.userByUUID(clientId, (err, res) => {
            const topic = "update/useractivity";
            const answer = {
              user: res,
              action: "exitfromroom",
              room: room,
              floor: floor,
              time: timeIn,
            };
            server.publish({
              topic: topic,
              payload: JSON.stringify({
                type: "useractivity",
                result: [answer],
              }),
            });
          });
        });
      }
    }
  });
};

module.exports.connection = connection;
