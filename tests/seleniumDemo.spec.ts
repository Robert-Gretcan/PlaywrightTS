import { test } from '@playwright/test';
import { SeleniumPage } from '../Pom/selenium-demoPage';

test('Testing selenium demo page', async ({ page }) => {

  const pom = new SeleniumPage(page);
  await pom.goTo();
  //fill & check text
  await pom.fillText('first Text');
  //hover -> check child nodeds
  await pom.getHoverDropdownList();

  //select dropdown by value
  await pom.selectOption('Set to 50%');
  await pom.selectOption('Set to 75%');
  await pom.selectOption('Set to 100%');
  //select drop down -> check html meter

  //get iframe text
  await pom.getIframeText();
  //slider control move to right->check progress bar percentage
  
  await page.close();
});