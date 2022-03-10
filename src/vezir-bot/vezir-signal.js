const signalR = require("@microsoft/signalr");
const download = require("download");

let connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5092/vezirhub")
  .configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .build();

connection.on("GibScan", (data) => {
  console.log(data);
  (async () => {
    await download("http://127.0.0.1/oku.pdf", "./pdf");
  })();
  //connection.invoke("SendMessage", "4");
});
connection.on("GetConnectionId", (data) => {
  console.log(data);
});
connection
  .start()
  .then(() => {
    // connection.invoke("SendMessage", "4");
  })
  .catch((err) => console.error(err));
