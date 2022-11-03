const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({ headless: false })
    let page = await browser.newPage()
    await page.goto('https://login.live.com/login.srf');
}

main().then(() => {
    console.log('Done');
    // process.exit(0);
}).catch((err) => {
    console.log(err);
    process.exitCode = 1;
});