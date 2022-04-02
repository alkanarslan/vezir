const puppeteer = require("puppeteer");
const htmlparser2 = require("htmlparser2");
const cheerio = require("cheerio");
const download = require("download");
const fs = require("fs");
const scrapedData = [];
const pdfSavePath= "/Users/alkanarslan/kodpoint-project/vezir/pdf-disk/";
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath:
            "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    });

    /*
    const browser = await puppeteer.connect({
      browserWSEndpoint: "ws://localhost:3000",
    });

    */
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

    await newPage.waitForTimeout(2000);
    await newPage.$eval("#sorgulaButon", (form) => form.click());
    await newPage.waitForTimeout(4000);
    const pageSize = await pageCalc(newPage);
    await htmlTableToData(newPage);
    await newPage.waitForTimeout(2000);
    for (let i = 1; i < pageSize; i++) {
        await newPage.$eval(
            "#bynList0_content>form>center:nth-child(2)>table:nth-child(1)>tbody>tr:nth-child(2)>td:nth-child(4)>input[type=button]",
            (form) => form.click()
        );
        await htmlTableToData(newPage);
    }
    async function htmlTableToData(tablePage) {
        await tablePage.waitForTimeout(2000);
        const data = await tablePage.evaluate(() => {
            const eTable = document.querySelectorAll(
                "#bynList0_content>form>center:nth-child(2)>table:nth-child(2)"
            );
            const tds = Array.from(eTable);
            return tds.map((item) => item.innerHTML);
        });

        const dom = htmlparser2.parseDocument(data);
        const $ = cheerio.load(dom);
        $("tr").each((index, element) => {
            if (index === 0) return true;
            const tds = $(element).find("td");
            // const firmName = $(tds[3]).attr("title");
            const gibDeclarationId = $(tds[0])
                .attr("id")
                .replace("checkboxTD", "")
                .trim();
            const gibDate = $(tds[7]).text().trim();
            const gibDeclarationType = $(tds[1]).text().trim();
            const gibTaxNo = $(tds[2]).text().trim();
            const gibApproval = $(tds[8]).text().trim();
            const gibPeriod = $(tds[5]).text().trim();
            let gibAssessmentId = "yok";

            $(element)
                .find("img")
                .each((index, element) => {
                    const bakbi = $(element).attr("title");
                    if (bakbi !== undefined) {
                        if (bakbi.includes("Tahakkuku")) {
                            gibAssessmentId = $(element)
                                .attr("onclick")
                                .replace("',false,false)", "")
                                .replace("tahakkukGoruntule('", "")
                                .replace(gibDeclarationId, "")
                                .replace("'", "")
                                .replace(",'", "")
                                .trim();
                        }
                    }
                });

            if (gibDate.length > 0) {
                const tableRow = {
                    gibDeclarationId,
                    gibDate,
                    gibDeclarationType,
                    gibTaxNo,
                    gibApproval,
                    gibAssessmentId,
                    gibPeriod,
                };

                scrapedData.push(tableRow);

            }
        });
        return "ok";
    }
    console.log(scrapedData.length);
    console.log(scrapedData);
    //await downloadUrlBuilder();
    await downloadGibDeclaration().finally(async () => {
        await downloadGibAssesment();
    });

    async function pageCalc(pagingItem) {
        const text = await pagingItem.$eval(
            "#bynList0_content>form>center:nth-child(2)>table:nth-child(1)>tbody>tr:nth-child(2)>td:nth-child(3)>b>font",
            (element) => element.textContent
        );
        const pageItem = text.split("/")[1];
        return Math.ceil(pageItem / 25);
    }
    async function downloadGibDeclaration() {

        for (const item of scrapedData) {
            console.log("Beyannname :" + item.gibDeclarationId);
            await sleep(1000);
            const url = new URL(newPage.url());
            const token = url.searchParams.get("TOKEN");

            const downloadUrl = new URL("https://ebeyanname.gib.gov.tr/dispatch");

            //Beyanname Pdf Download Url
            downloadUrl.searchParams.set("TOKEN", token);
            downloadUrl.searchParams.set("beyannameOid", item.gibDeclarationId);
            downloadUrl.searchParams.set("inline", "true");
            downloadUrl.searchParams.set("subcmd", "BEYANNAMEGORUNTULE");
            downloadUrl.searchParams.set("cmd", "IMAJ");

          await createFolderAndDownload(item.gibTaxNo,downloadUrl);

        }

    }
    async function downloadGibAssesment() {
        for (const item of scrapedData) {
            if (item.gibAssessmentId !== "yok"){
                console.log("Tahakkuk - "+ item.gibDeclarationId);
                await sleep(1000);
                const url = new URL(newPage.url());
                const token = url.searchParams.get("TOKEN");
                const downloadUrl = new URL("https://ebeyanname.gib.gov.tr/dispatch");
                downloadUrl.searchParams.set("TOKEN", token);
                downloadUrl.searchParams.set("beyannameOid", item.gibDeclarationId);
                downloadUrl.searchParams.set("tahakkukOid", item.gibAssessmentId);
                downloadUrl.searchParams.set("inline", "true");
                downloadUrl.searchParams.set("subcmd", "TAHAKKUKGORUNTULE");
                downloadUrl.searchParams.set("cmd", "IMAJ")
                console.log(downloadUrl.href);
                await createFolderAndDownload(item.gibTaxNo,downloadUrl);
            }
        }
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function createFolderAndDownload(folderName, downloadUrl) {

        const folderPath = pdfSavePath + folderName;
        console.log(folderPath);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        await download(downloadUrl.href, folderPath);
    }

})();

