const getElement = (xpath) => {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
};

function waitForElement(xpath) {
  return new Promise((resolve) => {
    const element = getElement(xpath);
    if (element) {
      return resolve(element);
    }

    const observer = new MutationObserver((mutations) => {
      const element = getElement(xpath);
      if (element) {
        resolve(element);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

console.log(
  "wzl: We're on Twitter main page! Trying to find and click specified tab"
);

chrome.storage.sync.get(
  {
    defaultTabText: "Following",
  },
  (items) => {
    const tabText = items.defaultTabText;
    console.log('wzl: default tab text = ', tabText);
    waitForElement(
      `//*[@role="tablist"]//*[@role="tab"]//*[text()="${tabText}"]`
    ).then((tabElement) => {
      console.log("wzl: Tab is found, firing click event");
      tabElement.click();
    });
  }
);
