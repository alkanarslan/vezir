const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const signalR = require("@microsoft/signalr");
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
});

let connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5092/vezirhub")
  .configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .build();

console.log("Connecting...");
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("authenticated", () => {
  console.log("authenticated");
});
client.on("auth_failure", (message) => {
  console.log("auth_failure" + message);
});

client.on("ready", () => {
  console.log(client.info);

  console.log("Client is ready!");

  // client.sendMessage("905331400353@c.us", "Hello World!");
});
client.on("message", (message) => {
  console.log(message.from);

  console.log(message.body);
});

client.on("disconnected", (reason) => {
  console.log("Client was disconnected:", reason);
});
client.initialize();

connection.on("GibScan", (data) => {
  client.sendMessage("905353482020@c.us", "lannnn");
  console.log(data);

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
