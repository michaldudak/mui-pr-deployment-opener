chrome.action.onClicked.addListener(openPreview);

const prRegex =
	/^https:\/\/github.(?:com|dev)\/mui\/material-ui\/pull\/([0-9]+)/;

function openPreview() {
	getCurrentTab((tab) => {
		const result = prRegex.exec(tab.url);
		if (result && result.length >= 2) {
			const prNumber = result[1];
			const previewUrl = `https://deploy-preview-${prNumber}--material-ui.netlify.app/`;

			chrome.tabs.create({
				url: previewUrl,
				index: tab.index + 1,
			});
		}
	});
}

function getCurrentTab(callback) {
	chrome.tabs.query(
		{
			active: true,
			lastFocusedWindow: true,
		},
		function (tabs) {
			var tab = tabs[0];
			callback(tab);
		}
	);
}
