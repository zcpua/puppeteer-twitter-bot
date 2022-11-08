import { TweetBot } from "./src";

async function main() {
        // const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://127.0.0.1:4000' })

    let wsUri = 'ws://127.0.0.1:4000';

    const tweet = new TweetBot(wsUri);
    await tweet.init();
    await tweet.login('account', 'password', 'email');
    await tweet.randomSleep(1000, 2000);
    await tweet.follow('login');
    await tweet.randomSleep(1000, 2000);
    await tweet.like('login');
    await tweet.randomSleep(1000, 2000);
    await tweet.retweet('login');
}

main().then(() => {
    console.log('done')
}).catch((err) => {
    console.log(err)
});