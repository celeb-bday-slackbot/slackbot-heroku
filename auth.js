const fs = require('fs'); // NEW: Add this require (for loading from files).

module.exports = (SLACK_TOKEN, callback) => {
	if (SLACK_TOKEN) {
		console.log('Info: Specify slack_token_path in environment');
		callback(null, SLACK_TOKEN);
	} else {
		console.log('Error: Undefined slack_token_path in environment');
		console.log('Finding at file...');
		fs.readFile('./slack-token', function (err, data) {
			if (err) {
				callback(err);
				return;
			}
			callback(null, String(data));
		});
	}
};
