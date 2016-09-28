const LandingPage = require('../pageObjects/LandingPage');

module.exports = function () {

  this.When(/^I visit the landing page$/, function () {
    LandingPage.open();
  });

  this.Then(/^I can see the title/, function () {
    return LandingPage.waitForElement(LandingPage.title);
  });
};