const Botkit = require('botkit');
const fs = require('fs'); // NEW: Add this require (for loading from files).
const axios = require('axios');

const controller = Botkit.slackbot({ debug: false });

// START: Load Slack token from file.
if (process.env.slack_token_path) {
	console.log('Info: Specify slack_token_path in environment');
	startRTM(process.env.slack_token_path);
} else {
	console.log('Error: Undefined slack_token_path in environment');
	console.log('Finding for file...');
	fs.readFile('./slack-token', function (err, data) {
		if (err) {
			console.log('Error: No file');
			process.exit(1);
		}
		data = String(data);
		startRTM(data);
	});
}

controller.hears(
		['연예인', '오늘', '생일'],
		['direct_message', 'direct_mention', 'mention'],
		async (bot, message) => {
			bot.reply(message, '크롤링 시작. 잠시만 기달');
			const rawData = await axios('https://celeb-crawler-express.herokuapp.com/profiles');

			if(rawData.data.status === 200){
				//bot.reply(message, JSON.stringify(rawData.data.result));
				const massageViewObj = {"text" : "오늘생일인 연예인","attachments":[]};
				for(let i = 0 ;i < 3; i++){
					let obj = {
							"title": rawData.data.result[i].name,
							"thumb_url": rawData.data.result[i].thumbnail,
							"color": "#3AA3E3",
							"text":"직업 : "+rawData.data.result[i].job+" \n생일:"+rawData.data.result[i].birthdate       
					};
					massageViewObj.attachments.push(obj);
				}
				bot.reply(message, massageViewObj);
			} else {
				bot.reply(message, '크롤링 서버가 죽은듯?');
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