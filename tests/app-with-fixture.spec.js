const base = require("playwright-test-coverage");

const BASE_URL = "http://localhost:3000";

class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.welcomeMessage = page.locator('[test-id="welcome-message"]');
  }

  async goto() {
    await this.page.goto(BASE_URL);
  }
}

const test = base.test.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.welcomeMessage;
    await use(homePage);
  },
});

test("basic test", async ({ homePage }) => {
  // Wait for welcome message to appear
  await homePage.welcomeMessage;
});
