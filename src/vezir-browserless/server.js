const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/image", async (req, res) => {
  // This was puppeteer.launch()
  await newFunction();

  return res.send("ok");
});

app.get("/", async (req, res) => {
  let site = req.query.site;
  let username = req.query.username;
  let pass = req.query.pass;
  console.log(site, username, pass);
  await newFunction(username, pass);
  res.send("ok");
});

app.listen(8080);

async function newFunction(username, pass) {
  /*
  brave://version/ ile çalıştığı path i alıyoruz
  Request path : http://localhost:8080/?site=edevlet&username=22300398670&pass=aa180519


  */
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 0, height: 0 });
    await page.goto("https://giris.turkiye.gov.tr/Giris/gir", {
      waitUntil: "networkidle2",
    });

    const tckn = await page.waitForXPath(
      "/html/body/div[1]/main/section[2]/form/fieldset/div[1]/div/input"
    );

    await tckn.type(username);
    const passInput = await page.waitForXPath(
      "/html/body/div[1]/main/section[2]/form/fieldset/div[2]/div/input[1]"
    );

    await passInput.type(pass);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
  } catch (error) {
    //  console.log(error);
    browser.close();
  }
}
