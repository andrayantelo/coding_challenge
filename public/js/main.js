'use strict';
// Alert user about comment submission success
// Get the parameter from the URL
// Disable linter for this line because web environment
// isn't disabling node checks
const urlParams = new URLSearchParams(window.location.search);	// eslint-disable-line node/no-unsupported-features/node-builtins
const msg = urlParams.get('message');
const messageDiv = document.getElementById('message-div');
messageDiv.innerText = msg;
if (msg) {
	messageDiv.style.display = 'block';
	setTimeout(() => {
		messageDiv.style.display = 'none';
	}, 3000);
}