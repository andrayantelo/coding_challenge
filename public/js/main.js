'use strict';

// Handler for submitting a comment
const commentForm = document.getElementById('commentForm');

const onSubmit = (e) => {
	e.preventDefault();
	//fetch('/addComment')
}
commentForm.addEventListener('submit', onSubmit);

// Alert user about comment submission success
// Get the parameter from the URL
// Disable linter for this line because web environment
// isn't disabling node checks
const urlParams = new URLSearchParams(window.location.search);	// eslint-disable-line node/no-unsupported-features/node-builtins
const msg = urlParams.get('message');
const modal = document.querySelector('.modal');
const toggleModal = () => {
	modal.classList.toggle('show-modal');
}
const windowOnClick = (event) => {
	if (event.target === modal) {
		toggleModal();
	}
}
if (msg) {
	window.addEventListener('click', windowOnClick);
	document.getElementById('modal-text').innerText = msg;
	toggleModal();
}