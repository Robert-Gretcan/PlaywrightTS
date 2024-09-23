import { expect, FrameLocator, type Locator, type Page } from '@playwright/test';
//import exp from 'constants';

export class SeleniumPage {

    private readonly page: Page;
    private readonly textInputField: Locator;
    private readonly hoverLocator: Locator;
    private readonly selectDropdown: Locator;
    private readonly textIFrame: Locator;

    private URL: string = "https://seleniumbase.io/demo_page";

    constructor(page: Page) {
        this.page = page;
        this.textInputField = page.locator('#myTextInput'); //by id
        this.hoverLocator = page.locator('css=.dropdown .dropbtn'); //by class
        this.selectDropdown = page.locator('xpath=//*[@id="mySelect"]') //by xpath
        this.textIFrame = page.frameLocator("#myFrame2").getByRole('heading');
    }

    async goTo() {
        await this.page.goto(this.URL);

    }

    async fillText(text: string) {
        await this.textInputField.fill(text);
    }

    async hoverOverDropdownList() {
        await this.page.hover("#myDropdown");
    }
    async checkHoverItems(expected: number) {
        const dropdownItems = await this.page.$$(".dropdown-content" + ' a');
        expect(dropdownItems.length).toBe(expected);
    }
    async openSelectDropDown() {
        await expect(this.selectDropdown).toBeVisible();        
    }
    async selectOption(option: number) {       
        await this.selectDropdown.selectOption(`Set to ${option}%`);
    }
    async expectMeterBar(option: number) {
        //get html meter bar value attribute
        let meterBar = await this.page.locator("#meterBar").getAttribute("value");
        //check progress bar is updated accordingly
        expect(meterBar).toBe((option / 100).toString());
    }

    async getIframeText() {
        await expect(this.textIFrame).toHaveText("iFrame Text");
    }
}