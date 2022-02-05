chrome.browserAction.onClicked.addListener(function (activeTab) {
  var newURL = "https://giris.turkiye.gov.tr/Giris/gir";
  chrome.tabs.create({ url: newURL });
});
