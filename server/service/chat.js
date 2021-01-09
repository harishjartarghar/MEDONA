const dialogflow = require("dialogflow");

const dialogflowConfig = require("../config/config");
const projectId = dialogflowConfig.projectId;
const configuration = {
  credentials: {
    private_key: dialogflowConfig.privateKey,
    client_email: dialogflowConfig.clientEmail
  }
};

const sessionId = "987654";
const languageCode = "en-US";
const sessionClient = new dialogflow.SessionsClient(configuration);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

async function talkToChatbot(message) {
  console.log("message " + message,configuration.credentials);
  const botRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    }
  };

  const response = await sessionClient
    .detectIntent(botRequest)
    .then((responses) => {
      console.log(JSON.stringify(responses));
      const requiredResponse = responses[0].queryResult;
      return requiredResponse;
    })
    .catch((error) => {
      console.log("ERROR: " + error);
    });

  return response;
}

module.exports = talkToChatbot;