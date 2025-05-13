const axios = require('axios');

module.exports.config = {
 name: "سؤال",
 version: "1.0",
 hasPermission: 0,
 credits: "Islamick Chat",
 usePrefix: false,
 description: "M H BD AI",
 commandCategory: "General",
 cooldowns: 2,
};

const API_SERVER_URL = 'https://sensui-useless-apis.codersensui.repl.co/api/tools/ai';

module.exports.run = async ({ api, event, args }) => {
 try {
 const question = args.join(' ');

 if (!question) {
 return api.sendMessage("تفضل اسئل 📝", event.threadID);
 }

 const response = await axios.get(`${API_SERVER_URL}?question=${encodeURIComponent(question)}`);

 if (response.data.error) {
 return api.sendMessage("اوبس فشل جلب اجابات حاول لاحقا.", event.threadID);
 }

 const answer = response.data.answer;

 if (answer) {
 api.sendMessage(`${global.config.BOTNAME}\nهذه الاجابة😌\n\n${answer}`, event.threadID);
 } else {
 api.sendMessage("There's something wrong. Please try again...", event.threadID);
 }
 } catch (error) {
 console.error('Error fetching response:', error);
 api.sendMessage("Error fetching response.", event.threadID);
 }
};
