'use strict';
// function for toggling modal
const modal = document.querySelector('.modal');
const toggleModal = () => {
	modal.classList.toggle('show-modal');
}
// event listener for clicking out of modal
const windowOnClick = (event) => {
	if (event.target === modal) {
		toggleModal();
	}
}
window.addEventListener('click', windowOnClick);

// Handle form submit
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
		// if successfull, add comment to comment section
		return response.json();
	}).then(function (data) {
		if (data.msg) {
			document.getElementById('modal-text').innerText = data.msg;
			toggleModal();
		}
		const commentsSection = document.getElementById('comments');
		commentsSection.innerHTML = data.commentsHTML;
	}).catch(function (error) {
		console.error(error);
	})
});

/*// Dynamically render comments section
const renderQuoteHTML = (comment, user) => {
    return  `
		<blockquote>
			<p>${comment}</p>
			<footer class="username-display">
				<span aria-label="quoted user">- ${user}</span>
			</footer>
		</blockquote>
	`;
}

const renderCommentSection = (comments) => {
	const commentsSection = document.getElementById('comments');
	// Clear comments section
	commentsSection.innerHTML = "";
	// render comments section
	// make a shallow copy of data.comments and then reverse it before looping through
	comments.slice().reverse().forEach((comment) => {
		const commentDiv = document.createElement('div');
		commentDiv.className = 'comment-display';
		commentDiv.setAttribute('aria-label', 'comment by user');
		commentDiv.innerHTML = renderQuoteHTML(comment.comment, comment.username);
		commentsSection.appendChild(
			commentDiv
		)
	})
}

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
		// if successfull, add comment to comment section
		return response.json();
	}).then(function (data) {
		if (data.msg) {
			document.getElementById('modal-text').innerText = data.msg;
			toggleModal();
		}
		renderCommentSection(data.comments);
	}).catch(function (error) {
		console.error(error);
	})
});

/*window.addEventListener('load', (event) => {
	// render comments section
	fetch('/comments', { method: 'GET'})
		.then((response) => response.json())
        .then((data) => {
			renderCommentSection(data.comments);
        })
        .catch((error) => {
           console.error('Error:', error);
        })
  });
*/
  // TODO error handling. Have a div maybe that says "sorry can't show comments right now"









