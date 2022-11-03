const puppeteer = require('puppeteer');
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
function dateString(){
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
async function sleep(time) {
    return new Promise((res, _rej) => setTimeout(res, time));
}
async function screenshot(page, account,name) {
    await page.screenshot({ path: `screenshot/${dateString()}_${account}_${name}.png` });
}
async function main() {
    // const account = 'Veronic68749497';
    // const password = '5EQUdQ4cDTzGzPg';
    // const email = 'analnecea1986@outlook.com';

    // const account = 'LauraWi00116570';
    // const password = 'qLYNwVmrQRpc7yd';
    // const email = 'katakucel6@outlook.com';

    // Madelin65999400:9uwaGzyETCe6AQg:billfempkonma1974@outlook.com

    const account = 'BiancaL69497575';
    const password = 'hZt48xc0tPFAkiM';
    const email = 'fircongcorvers1981@outlook.com';


    // Adrienn27555668:xYHTmJrpp3GXcCe:kieverkiefers@hotmail.com:JyH6SW77
    // Veronic68749497:5EQUdQ4cDTzGzPg:analnecea1986@outlook.com:xOoXZS45
    // LauraWi00116570:qLYNwVmrQRpc7yd:katakucel6@outlook.com:eyCo3412
    // LynetteKovoszv1:PRxovkFeLg5T6Aj:imlivori1985@outlook.com:KXN02k80
    // Madelin65999400:9uwaGzyETCe6AQg:billfempkonma1974@outlook.com:RPDycg20
    // AmyAbra47724240:FJ9S5rcZLEAJs9i:beymensuppzin1979@outlook.com:J4uY4H50
    // BiancaL69497575:hZt48xc0tPFAkiM:fircongcorvers1981@outlook.com:BoAEEG70
    // LaurenS73787770:88wU7vFVfvr5ChV:guimtemadra1982@outlook.com:kWbcXV56
    // JaniceP39332067:ZDnZo1waACzocob:hileyguynesh@outlook.com:btdEMz13
    // KarenKeju7:SXQfICVTdKR6bFa:cureclesam1978@outlook.com:Q7o7vh57


    // const browser = await puppeteer.launch({ headless: false })
    const browser = await puppeteer.connect({ browserWSEndpoint: 'wss://chrome.browserless.io?token=a0c4cd20-1fa0-4436-bc59-1e8939392a2e' })
    // const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://127.0.0.1:4000' })
    // a0c4cd20-1fa0-4436-bc59-1e8939392a2e
    let page = await browser.newPage()
    await page.goto('https://twitter.com/i/flow/login');
    const title = await page.title();
    console.log("title", title);
    {
        //account
        let accountInput = await page.waitForSelector('input[autocomplete="username"]');
        await accountInput.type(account, { delay: randomNum(90, 120) });
        await page.screenshot({ path: "account.png" });
        await page.evaluate(() => {
            document.querySelectorAll('div[role="button"]')[2].click()
        });
        await screenshot(page,account,'account');

    }
    {
        //password
        const passInput  = await page.waitForSelector('input[autocomplete="current-password"]');
        await passInput.type( password, { delay: randomNum(90, 120) });
        await page.evaluate(() => {
            document.querySelectorAll('div[role="button"]')[2].click()
        });
        await screenshot(page,account,'pass');

    }
    {
        //email
        try {
            await sleep(randomNum(10, 100));
            const emailInput  = await page.waitForSelector('input[autocomplete="email"]', { timeout: 2000 });
            await  emailInput.type(email, { delay: randomNum(90, 120) });
            await page.evaluate(() => {
                document.querySelectorAll('div[role="button"]')[1].click()
            });
            console.log('email done');
        } catch (error) {
            console.log('no email', error);
        }
        await screenshot(page,account,'email');


    }
    await sleep(randomNum(1000, 2000));
    await screenshot(page,account,'home');

    // page = await browser.newPage()

    {
        //follow
        console.log('follow')
        let waitingTime = randomNum(1000, 6100)
        console.log('waiting for ', waitingTime)
        await sleep(waitingTime);
        await page.goto('https://twitter.com/BoredZuki');
        const followBtn = await page.waitForSelector(`[data-testid="placementTracking"]`);
        await followBtn.click({ delay: randomNum(10, 60) });
        console.log('followed')
        await screenshot(page,account,'follow');
    }

    {
        //like
        console.log('like')
        let waitingTime = randomNum(1000, 6100)
        console.log('waiting for ', waitingTime)
        await sleep(waitingTime);
        await page.goto('https://twitter.com/BoredZuki/status/1556967903421165568');
        try {
            const likeBtn = await page.waitForSelector(`[data-testid="like"]`, { timeout: 2000 });
            await likeBtn.click({ delay: randomNum(10, 60) });
            console.log('liked')
        } catch (error) {
            console.log('already liked');
        }
        await screenshot(page,account,'like');

    }

    {
        //retweet
        console.log('retweet')
        let waitingTime = randomNum(100, 6100)
        console.log('waiting for ', waitingTime)
        await sleep(waitingTime);
        await page.goto('https://twitter.com/BoredZuki/status/1575541206368411648');
        try {
            const retweetBtn = await page.waitForSelector(`[data-testid="retweet"]`, { timeout: 2000 });
            await retweetBtn.click({ delay: randomNum(10, 60) });
            const confirmBtn = await page.waitForSelector(`[data-testid="retweetConfirm"]`);
            await confirmBtn.click({ delay: randomNum(10, 60) });
            console.log('already retweet');
        } catch (error) {
            console.log('already retweeted');
        }
        await screenshot(page,account,'retweet');
    }

    {
        //reply
        console.log('reply')
        let waitingTime = randomNum(1000, 6100)
        console.log('waiting for ', waitingTime)
        await sleep(waitingTime);
        await page.goto('https://twitter.com/BoredZuki/status/1575532471130595328');
        try {
            const replyBtn = await page.waitForSelector(`[data-testid="reply"]`);
            await replyBtn.click({ delay: randomNum(10, 60) });
            await page.waitForSelector(`[data-testid="tweetTextarea_0"]`);
            await page.type(`[data-testid="tweetTextarea_0"]`, account, { delay: randomNum(90, 120) });
            await page.click('[data-testid="tweetButton"]', { delay: randomNum(10, 60) });
            await page.waitForNavigation();
            console.log('replied')
        } catch (error) {
            console.log('already replied', error);
        }
        await screenshot(page,account,'reply');
    }
    await browser.close();
}


main().then(() => {
    console.log('Done');
    // process.exit(0);
}).catch((err) => {
    console.log(err);
    process.exitCode = 1;
});
