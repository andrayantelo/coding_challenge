// This is a fake database api.
// It supports adding a comment and getting all of the comments.
// Updating and deleting are not supported.

// Sample comments
const comments = [
	{ comment: 'Nullam faucibus mollis ex, eu congue tortor sodales eu!',
		username: 'user1' },
	{ comment: 'Mauris sed libero leo. Donec ut tellus accumsan,\
	pretium odio eu, placerat ante. Proin posuere neque arcu,\
	et posuere nunc pellentesque ullamcorper...',
	username: 'user2' },
	{ comment: 'Quisque??!',
		username: 'user3' },
	{ comment: 'Integer tortor risus, laoreet et tortor ac.',
		username: 'user4' },
];

// Add a single comment
// Validate that both a username and comment are given
// return error message if not
module.exports.add = (comment) => {
	if (!comment.username || !comment.comment) {
		const givenComment = JSON.stringify(comment);
		const errormsg = `Username and comment are required: + ${givenComment}`;
		return errormsg;
	}
	comments.push(comment);
	return '';
};

// Get all comments
module.exports.get = () => {
	return comments;
};