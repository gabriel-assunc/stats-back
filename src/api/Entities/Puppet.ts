import puppeteer, { Page } from "puppeteer";

const USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36";

export const initializePage = async (url: string) => {
    const browser = await puppeteer.launch();
    const page = (await browser.pages())[0];
    await page.setUserAgent(USER_AGENT);
    await page.goto(url)
    return page
}

export const gotoNewPage = async (page: Page, url: string) => {
    const newPage = await page.browser().newPage()
    await newPage.goto(url)
    return newPage
}