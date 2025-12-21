const puppeteer = require("puppeteer");
const path = require("path");
(async () => {
  const htmlPath = path.resolve(__dirname, "..", "SUPERVISOR_BRIEF.html");
  const outPath = path.resolve(__dirname, "..", "SUPERVISOR_BRIEF.pdf");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("file://" + htmlPath, { waitUntil: "networkidle0" });
  await page.pdf({ path: outPath, format: "A4", printBackground: true });
  await browser.close();
  console.log("PDF written to", outPath);
})();
