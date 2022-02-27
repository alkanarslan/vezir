const signalR = require("@microsoft/signalr");

let connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5092/vezirhub")
  .configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .build();

connection.on("SendMessage", (data) => {
  console.log(data);
});
connection.on("GetConnectionId", (data) => {
  console.log(data);
});
connection
  .start()
  .then(() => {
    connection.invoke("SendMessage", "4");
  })
  .catch((err) => console.error(err));
