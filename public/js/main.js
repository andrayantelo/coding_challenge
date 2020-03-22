'use strict';
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
window.addEventListener('click', windowOnClick);
// Handler for submitting a comment
const commentForm = document.getElementById('commentForm');

commentForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(this);
	const searchParams = new URLSearchParams();

	for (const pair of formData) {
		searchParams.append(pair[0], pair[1]);
	}
	
	fetch('/addComment', {
		method: 'POST',
		body: searchParams
	}).then(function (response) {
		return response.text();
	}).then(function (msg) {
		if (msg) {
			document.getElementById('modal-text').innerText = msg;
			toggleModal();
		}
	}).catch(function (error) {
		console.error(error);
	})
});

