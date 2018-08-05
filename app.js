var Botkit = require('botkit');
var fs = require('fs'); // NEW: Add this require (for loading from files).

var controller = Botkit.slackbot({ debug: false });

// START: Load Slack token from file.
if (!process.env.slack_token_path) {
	console.log('Info: Specify slack_token_path in environment');
	startRTM(process.env.slack_token_path);
} else {
	fs.readFile(process.env.slack_token_path, function (err, data) {
		if (err) {
			console.log('Error: Specify token in slack_token_path file');
			process.exit(1);
		}
		data = String(data);
		startRTM(data);
	});
}

controller.hears(
		['hello', 'hi'], ['direct_message', 'direct_mention', 'mention', 'ambient'],
		function (bot, message) {

			bot.reply(message, 'Meow. :smile_cat: 테스트 1');
		});

function startRTM(token){
	token = token.replace(/\s/g, '');
	controller
			.spawn({ token })
			.startRTM(function (err) {
				if (err) {
					throw new Error(err);
				}
			});
}