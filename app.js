const Botkit = require('botkit');
const fs = require('fs'); // NEW: Add this require (for loading from files).
const axios = require('axios');
const toMessageViewData = require('./toMessageViewData');
const auth = require('./auth');
const controller = Botkit.slackbot({ debug: false });
const SLACK_TOKEN = process.env.slack_token_path;

// START: Load Slack token from file.
auth(SLACK_TOKEN, (err, token) => {
	if (err) {
		console.log('Error: No file');
		process.exit(1);
	}
	startRTM(token);
});

controller.hears(
	['연예인', '오늘', '생일'],
	['direct_message', 'direct_mention', 'mention'],
	async (bot, message) => {
		bot.reply(message, '크롤링 중....');
		const rawData = await axios('https://celeb-crawler-express.herokuapp.com/profiles');

		if (rawData.data.status === 200) {
			bot.reply(message, toMessageViewData({
				'title': '오늘 생일인 연예인',
				'data': rawData.data.result
			}));
		} else {
			bot.reply(message, '크롤링 서버 에러. 관리자에 문의해주세요.');
		}
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
