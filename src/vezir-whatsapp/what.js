const qrcode = require("qrcode-terminal");
const fs = require("fs");

const { Client, MessageMedia } = require("whatsapp-web.js");
const SESSION_FILE_PATH = "./session.json";

let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
  session: sessionData,
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});
client.on("ready", () => {
  const media = MessageMedia.fromFilePath(
    "/Users/alkanarslan/Desktop/Fender-Telecaster-Neck.pdf"
  );
  client.sendMessage("905542702497@c.us", media, {
    caption: "this is my caption",
  });
  client.sendMessage("905542702497@c.us", "pong");
  client.sendMessage("905542702497@c.us", "canım");
  console.log("Client is ready!");
});
client.on("message", (message) => {
  console.log(message.from);

  const media = MessageMedia.fromFilePath(
    "/Users/alkanarslan/Desktop/Fender-Telecaster-Neck.pdf"
  );
  client.sendMessage("905542702497@c.us", media, {
    caption: "this is my caption",
  });
  client.sendMessage("905542702497@c.us", "pong");
  console.log(message.body);
});

client.initialize();
