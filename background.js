chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostContains: 'youtube'}
				})
			],
			actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}]);
	});
});

chrome.runtime.onMessage.addListener(function(message) {
	var url = 'https://immense-brook-14494.herokuapp.com/download?';
	var queryString = Object.keys(message).map(key => key + '=' + message[key]).join('&');
	url += queryString;
	console.log(url);
	chrome.downloads.download({url:url,
		filename: "YoutubeDownloader/" + message.filename +'.' + message.format}, function(downID) {
			chrome.downloads.show(downID);
	});
});