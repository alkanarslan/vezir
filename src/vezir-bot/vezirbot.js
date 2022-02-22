const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 0, height: 0 });
  await page.goto("https://ebeyanname.gib.gov.tr/", {
    waitUntil: "networkidle2",
  });
  await page.$eval("#buton>img", (form) => form.click());

  const newPagePromise = new Promise((x) => page.once("popup", x));
  const newPage = await newPagePromise;
  await newPage.setViewport({ width: 0, height: 0 });
  const userCode = await newPage.waitForXPath(
    "/html/body/div/div/table[1]/tbody/tr[2]/td/div/form/table/tbody/tr[1]/td[3]/input"
  );

  await userCode.type("25903042");

  const password1 = await newPage.waitForXPath(
    "/html/body/div/div/table[1]/tbody/tr[2]/td/div/form/table/tbody/tr[2]/td[3]/input"
  );
  await password1.type("maliye");
  const password2 = await newPage.waitForXPath(
    "/html/body/div/div/table[1]/tbody/tr[2]/td/div/form/table/tbody/tr[3]/td[3]/input"
  );

  await password2.type("212121");

  await newPage.keyboard.press("Enter");
  await newPage.waitForTimeout(1000);

  await newPage.$eval(
    "#page>table>tbody>tr>td>div:nth-child(6)>div>table>tbody>tr>td:nth-child(7)>span",
    (form) => form.click()
  );

  console.log(page.url());
  console.log(typeof page.url());
  await newPage.waitForTimeout(1000);
  await newPage.$eval("#sorgulaButon", (form) => form.click());
  await newPage.waitForTimeout(2000);

  await newPage.$eval("#bynPDF0zkztsqt7u1wfi>img", (form) => form.click());
  console.log(newPage.url());
  console.log(typeof newPage.url());

  /*

Url den donen token ile  direk pdf indirme yapılabilir.
https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=c444d8763b5e000a4e84699fee9c42c091d4ee350c05fb8f7fa1970f0f160def38bcd44e9ff63959607cfa5930831a6289edd91447ac280e8ab44efaadfd4f4c&beyannameOid=0zkztsqt7u1wfi&inline=true
https://ebeyanname.gib.gov.tr/dispatch?cmd=LOGIN&TOKEN=c444d8763b5e000a4e84699fee9c42c091d4ee350c05fb8f7fa1970f0f160def38bcd44e9ff63959607cfa5930831a6289edd91447ac280e8ab44efaadfd4f4c&CHANGEPWD=TRUE
*/

  // const data = await newPage.evaluate(() =>
  //   Array.from(
  //     document.querySelectorAll('table[id="gvM"] > tbody > tr'),
  //     (row) =>
  //       Array.from(row.querySelectorAll("th, td"), (cell) => cell.innerText)
  //   )
  // );

  // await page._client.send(
  //   "Page.beyannameGoruntule('0zkztsqt7u1wfi',false,false)",
  //   {
  //     behavior: "allow",
  //     downloadPath: downloadPath,
  //   }
  // );
  // await page.click("._2vsJm ");

  //await newPage.waitForNavigation();
  // await browser.close();
})();

/*
await newPage.evaluate(() => {
    beyannameAraFormu();
  });
beyannameAraFormu()
taxReturnSearchFormPost()





https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=094ad6d206399e9172ff61d31f7e1ee5747198f2418a45af421f8ae5e391061deb5bfa94aaf05ea41c1a75f3913fdf57756094dfade3e76902a491125b91f9e7&beyannameOid=0zkztsqt7u1wfi&inline=true


<span onmouseover="makeUnderLine(this)" onmouseout="deleteUnderLine(this)" onclick="beyannameAraFormu()" style="cursor: pointer;">Beyanname Ara</span>
*/
//#page > table > tbody > tr > td > div:nth-child(6) > div > table > tbody > tr > td:nth-child(7) > span

//document.querySelector("#page > table > tbody > tr > td > div:nth-child(6) > div > table > tbody > tr > td:nth-child(7) > span")

//document.querySelector("#page > table > tbody > tr > td > div:nth-child(6) > div > table > tbody > tr > td:nth-child(7) > span")
