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
  //await newFunction(username, pass);
  internetVergiDairesi(username, pass);
  res.send("ok");
});

app.listen(8080);

async function internetVergiDairesi(username, pass) {
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
    await page.goto("https://intvrg.gib.gov.tr/", {
      waitUntil: "networkidle2",
    });

    await page.$eval("a#loginSifreli", (form) => form.click());

    const tckn = await page.waitForXPath(
      "/html/body/div[2]/div/div[1]/div/div/div/div[3]/div[1]/input"
    );

    await tckn.type(username);
    const passInput = await page.waitForXPath(
      "/html/body/div[2]/div/div[1]/div/div/div/div[3]/div[2]/input"
    );

    ///html/body/div[4]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div/div[2]/div/div/input
    await passInput.type(pass);
    await page.waitForNavigation();
    //  await page.click('input[class="csc-button btn--primary"]');
    // await page.keyboard.press("Enter");
    // await page.waitForNavigation();
  } catch (error) {
    //  console.log(error);
    //  browser.close();
  }
}

async function newInteractie(username, pass) {
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
    await page.goto(
      "https://ivd.gib.gov.tr/tvd_side/index.jsp?token=0c6213e03f58a0b4de6e41981364490ad6b5a550f3bc9a9bc3c9755a57788c9e737ce8d553efbac6742396abd0203d70f66e37ca9470a83fa228f55b7ac25e85",
      {
        waitUntil: "networkidle2",
      }
    );

    const tckn = await page.waitForXPath(
      "/html/body/div[4]/div[2]/div/div/div[2]/div/div/div[1]/div/div/div/div[1]/div[2]/input"
    );

    await tckn.type(username);
    const passInput = await page.waitForXPath(
      "/html/body/div[4]/div[2]/div/div/div[2]/div/div/div[1]/div/div/div/div[2]/div[2]/input"
    );

    ///html/body/div[4]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div/div[2]/div/div/input
    await passInput.type(pass);

    //  await page.click('input[class="csc-button btn--primary"]');
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
  } catch (error) {
    //  console.log(error);
    //  browser.close();
  }
}

async function newFunction(username, pass) {
  /*
  brave://version/ ile çalıştığı path i alıyoruz
  Request path : http://localhost:8080/?site=edevlet&username=22300398670&pass=aa180519


  */
  const browser = await puppeteer.launch({
    headless: false,
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
    //  browser.close();
  }
}
