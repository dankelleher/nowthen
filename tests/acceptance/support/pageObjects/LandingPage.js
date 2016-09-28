const Page = require('./Page');

const LandingPage = Object.create(Page, {
  title: { get() { return browser.element('.js-title'); } },
});

module.exports = LandingPage;
