import { expect, FrameLocator, type Locator, type Page } from '@playwright/test';
//import exp from 'constants';

export class SeleniumPage {

    readonly page: Page;
    readonly textInputField: Locator;
    readonly hoverLocator: Locator;
    readonly selectDropdown: Locator;
    readonly textIFrame: Locator;

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

    async getHoverDropdownList() {
        //using methods with selectors
        await this.page.hover("#myDropdown");

        // Check if the dropdown contains the expected child <a> tags
        const dropdownItems = await this.page.$$(".dropdown-content" + ' a');       
        expect(dropdownItems.length).toBe(3);

    }

    async selectOption(option: string) {
        //parse option
        const regex = /\b\d{2,3}\b/;
        const match = option.match(regex);
        let number = 25//default value;
        if (match) {
            number = parseInt(match[0]);
            if (number > 100) {
                console.log("Number is bigger than expected,test will fail");
            }
        }

        await expect(this.selectDropdown).toBeVisible();
        await this.selectDropdown.selectOption(option);
        //check html meter bar
        let meterBar = await this.page.locator("#meterBar").getAttribute("value");
        //transform value int number
        let meterNumberValue = meterBar !== null ? parseFloat(meterBar) : null;
        expect(meterNumberValue).toBe(number / 100);
    }

    async getIframeText() {
       await expect(this.textIFrame).toHaveText("iFrame Text");
    }
}