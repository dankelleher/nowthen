const LandingPage = require('../pageObjects/LandingPage');

module.exports = function () {
  this.When(/^I visit the landing page$/, () => {
    LandingPage.open();
  });

  this.Then(/^I can see the title/, () => {
    return LandingPage.waitForElement(LandingPage.title);
  });
};
