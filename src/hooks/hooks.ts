import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Page, Browser } from 'playwright';
import { SeleniumPage } from "../pages/SeleniumPage";

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false }); // Launch the browser
});

Before(async function () {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.homepage = new SeleniumPage(this.page);
});

After(async function () {
    await this.page?.close();
    await this.context?.close();
});

AfterAll(async function () {
    await browser.close();
});