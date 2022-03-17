const puppeteer = require("puppeteer");
const path = require("path");
const downloadPath = path.resolve("./download");
async function simplefileDownload() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("http://localhost/bos.html", {
    waitUntil: "networkidle2",
  });

  await page._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadPath,
  });

  await page.download("body>a");
}
simplefileDownload();
