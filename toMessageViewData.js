const messageDisplayCount = 3;
const toMessageViewData = (messageViewObj) => {
	return {
		'text': messageViewObj.title,
		'attachments': messageViewObj.data.slice(0, messageDisplayCount).map((item) => {
			return {
				'title': item.name,
				'thumb_url': item.thumbnail,
				'color': '#3AAE3',
				'text': `직업 : ${item.job} \n생일: ${item.birthdate}`
			};
		})
	};
}

module.exports = toMessageViewData;

