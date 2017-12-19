window.distributionModuleFactory().then(function(module) {
  module.initialize().then(function() {
    window.distributionModule = module;
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.type) {
    case 'metric':
      window.distributionModule.sendMrdsMetric(message.data).then(sendResponse);
      break;
    case 'get_extension_data':
      window.distributionModule.getExtensionData().then(sendResponse);
      break;
    default:
      return false;
  }
  return true;
});