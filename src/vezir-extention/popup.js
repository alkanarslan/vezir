function getTitle() {
  return document.title;
}
const tabId = getTabId();
chrome.scripting.executeScript(
  {
    target: { tabId: tabId, allFrames: true },
    func: getTitle,
  },
  (injectionResults) => {
    for (const frameResult of injectionResults)
      console.log("Frame Title: " + frameResult.result);
  }
);
