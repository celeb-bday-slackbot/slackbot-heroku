var Botkit = require('botkit');
var fs = require('fs'); // NEW: Add this require (for loading from files).

var controller = Botkit.slackbot({ debug: false });

// START: Load Slack token from file.
if (!process.env.slack_token_path) {
	console.log('Info: Specify slack_token_path in environment');
	startRTM(process.env.slack_token_path);
}

controller.hears(
		['hello', 'hi'],
		['direct_message', 'direct_mention', 'mention', 'ambient'],
		function (bot, message) {

			bot.reply(message, 'Meow. :smile_cat: 테스트 2');
		});


function startRTM(token) {
	token = token.replace(/\s/g, '');
	controller
			.spawn({ token })
			.startRTM(function (err) {
				if (err) {
					throw new Error(err);
				}
			});
}