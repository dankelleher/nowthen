var Page = require('./Page');

var LandingPage = Object.create(Page, {
  title: { get: function () { return browser.element('.js-title'); }},
});

module.exports = LandingPage;
