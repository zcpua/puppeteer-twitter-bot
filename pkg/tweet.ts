
import puppeteer from 'puppeteer';



export class TweetBot {
    wsUri!: string;
    browser!: puppeteer.Browser
    page!: puppeteer.Page
    account!: string;
    constructor(wsUri: string) {
        this.wsUri = wsUri;

    }
    async init() {
        this.browser = await puppeteer.connect({ browserWSEndpoint: this.wsUri })
        // 'wss://chrome.browserless.io?token=a0c4cd20-1fa0-4436-bc59-1e8939392a2e'
    }

    randomNum(minNum: number, maxNum: number) {
        switch (arguments.length) {
            case 1:
                return Math.round(Math.random() * minNum + 1);
                break;
            case 2:
                return Math.round(Math.random() * (maxNum - minNum + 1) + minNum);
                break;
            default:
                return 0;
                break;
        }
    }
    async sleep(time: number) {
        return new Promise((res, _rej) => setTimeout(res, time));
    }
    async randomSleep(minNum: number, maxNum: number) {
        await this.sleep(this.randomNum(minNum, maxNum));
    }
    async screenshot(name: string) {
        const date = new Date();
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        await this.page.screenshot({ path: `screenshot/${dateString}_${this.account}_${name}.png` });
    }

    async login(account: string, password: string, email: string) {
        this.page = await this.browser.newPage()
        let page = this.page;
        const title = await page.title();
        this.account = account;
        {
            //account
            let accountInput = await page.waitForSelector('input[autocomplete="username"]');
            if (accountInput) {
                await accountInput.type(account, { delay: this.randomNum(90, 120) });
                await page.screenshot({ path: "account.png" });
                await page.evaluate(() => {
                    const btn = document.querySelectorAll('div[role="button"]')[2] as HTMLElement | null;
                    if (btn) {
                        btn.click()
                    }
                });
                await this.screenshot('account');
            }
        }
        {
            //password
            const passInput = await page.waitForSelector('input[autocomplete="current-password"]');
            if (passInput) {
                await passInput.type(password, { delay: this.randomNum(90, 120) });
                await page.evaluate(() => {
                    (document.querySelectorAll('div[role="button"]')[2] as HTMLElement).click()
                });
                await this.screenshot('pass');
            }
        }
        {
            //email
            try {
                await this.randomSleep(10, 100);
                const emailInput = await page.waitForSelector('input[autocomplete="email"]', { timeout: 2000 });
                if (emailInput) {
                    await emailInput.type(email, { delay: this.randomNum(90, 120) });
                    await page.evaluate(() => {
                        (document.querySelectorAll('div[role="button"]')[1] as HTMLElement).click()
                    });
                }
                console.log('email done');
            } catch (error) {
                console.log('no email', error);
            }
            await this.screenshot('email');
        }
        //todo check if login success
        //todo email code
        await this.sleep(1000);
        await this.screenshot('home');
        return page
    }

    async follow(uri: string) {
        await this.page.goto(uri);
        const followBtn = await this.page.waitForSelector(`[data-testid="placementTracking"]`);
        if (followBtn) {
            await followBtn.click({ delay: this.randomNum(10, 60) });
        }
        await this.screenshot('follow');
    }

    async like(uri: string) {
        await this.page.goto(uri);
        try {
            const likeBtn = await this.page.waitForSelector(`[data-testid="like"]`, { timeout: 2000 });
            if (likeBtn) {
                await likeBtn.click({ delay: this.randomNum(10, 60) });
            }
            console.log('liked')
        } catch (error) {
            console.log('already liked');
        }
        await this.screenshot('like');
    }

    async retweet(uri: string) {
        let page = this.page
        await this.page.goto(uri);
        try {
            const retweetBtn = await page.waitForSelector(`[data-testid="retweet"]`, { timeout: 2000 });
            if (retweetBtn) retweetBtn.click({ delay: this.randomNum(10, 60) });
            const confirmBtn = await page.waitForSelector(`[data-testid="retweetConfirm"]`);
            if (confirmBtn) await confirmBtn.click({ delay: this.randomNum(10, 60) });
            console.log('already retweet');
        } catch (error) {
            console.log('already retweeted');
        }
        await this.screenshot('retweet');
    }



    async reply(uri: string, text: string) {
        let page = this.page
        await this.page.goto(uri);
        try {
            const replyBtn = await this.page.waitForSelector(`[data-testid="reply"]`);
            if (replyBtn) await replyBtn.click({ delay: this.randomNum(10, 60) });
            await page.waitForSelector(`[data-testid="tweetTextarea_0"]`);
            await page.type(`[data-testid="tweetTextarea_0"]`, text, { delay: this.randomNum(90, 120) });
            await page.click('[data-testid="tweetButton"]', { delay: this.randomNum(10, 60) });
            await page.waitForNavigation();
            console.log('replied')
        } catch (error) {
            console.log('already replied', error);
        }
        await this.screenshot('reply');
    }

}
