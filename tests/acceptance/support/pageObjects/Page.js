const _ = require('underscore');

function Page() {
  this.url = '';
}

Page.prototype.open = function (parameters, ignoreVerify) {
  const parameterString = _.isEmpty(parameters) ? '' : `/${parameters}`;
  browser.url(`${process.env.ROOT_URL}/${this.url}${parameterString}`);

  // Verify the page was opened
  // we can ignore this verification step in case opening this page
  // triggers an automatic redirect to another page.
  if (!ignoreVerify) {
    this.transitionedTo(this);
  }
};

Page.prototype.titleIs = function (title) {
  expect(browser.getTitle()).toBe(title);
};

Page.prototype.transitionedTo = function (newPage, customTimeout) {
  const errorMessage = `Starting at url: '${browser.getUrl()}' Expected url: '${newPage.url}'`;

  function postCatchErrorMsg() {
    return `Actual browser url: '${browser.getUrl()}'`;
  }

  const timeout = customTimeout || 5000;  // give the browser 5 seconds to get to the new page
  const checkInterval = 250;   // check the browser every 250ms

  try {
    return browser.waitUntil(() => {
        // console.log('Actual:', browser.getUrl(), 'Expected:', newPage.url, 'timeout', timeout);

      if (newPage.url === '') {
          // expect an url ending with a slash (e.g. http://localhost:3000/)
        return browser.getUrl().match(/\/$/);
      }

      return browser.getUrl().indexOf(newPage.url) >= 0;
    },
      timeout,
      errorMessage,
      checkInterval
    );
  } catch (error) {
    // in case an error occurred during the waitUntil,
    // and the url is actually correct, check it again here
    if (browser.getUrl().indexOf(newPage.url) < 0) {
      console.log(error.message);
      throw new Error(`${errorMessage} ${postCatchErrorMsg()}`);
    }
  }
};

Page.prototype.waitForElement = function (element, customTimeout) {
  const selector = element.selector;
  const errorMessage = `Could not find element with selector ${selector} at '${browser.getUrl()}'`;
  const timeout = customTimeout || 500;  // give the browser 500ms to find the element

  try {
    return browser.waitForExist(selector, timeout);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

module.exports = new Page();
