
import { When, Then, Given } from "@cucumber/cucumber";
import { SeleniumPage } from "../pages/SeleniumPage";

let homepage: SeleniumPage;

Given("the user is on the homepage", async function () {
    homepage = new SeleniumPage(this.page!);
    await homepage.goTo();
})
When("the user opens the hover dropdown", async function () {
    await homepage.hoverOverDropdownList();
})
Then("the hover dropdown should have {int} elements", async function (elements: number) {
    await homepage.checkHoverItems(elements);
})
Given("the select dropdown is open", async function () {
    await homepage.openSelectDropDown();
})
When("the user selects option {int}", async function (option:number) {
    await homepage.selectOption(option);
})
Then("the meter bar should be updated accordingly", async function () {
    await homepage.expectMeterBar(50);
})