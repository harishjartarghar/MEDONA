const express=require('express');
const app = express();
const {
		DONATE_MEDICINE,
		GET_DONATIONS,
		UPDATE_DONATION,
		DELETE_DONATION,
		GET_ALL_DONATIONS,
		GET_ORDER,
		PLACE_ORDER,
		DATA_CONTROLLER
	  }=
require('../controllers/index.controllers');
const {DonorVerify,NgoVerify}=require('../middleware/auth');

const { parseImageUpload } =require('../service/uploader');
const bodyParser = require("body-parser");
const talkToChatbot = require("../service/chat");
var jsonParser = bodyParser.json();
var urlEncoded = bodyParser.urlencoded({ extended: true });


app.route("/donate")
   .post(DonorVerify,parseImageUpload(),DONATE_MEDICINE)
   .get(DonorVerify,GET_DONATIONS)
   .put(DonorVerify,UPDATE_DONATION)
   .delete(DonorVerify,DELETE_DONATION)
   
app.route("/donate_all")
   .get(NgoVerify,GET_ALL_DONATIONS)


app.route("/order")
   .post(NgoVerify,PLACE_ORDER)
   .get(NgoVerify,GET_ORDER)

app.route("/data")
    .get(DATA_CONTROLLER)


app.post("/chatbot", jsonParser, urlEncoded, function (req, res, next) {
  const message = req.body.message;
  console.log("message" + message);

  talkToChatbot(message)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
      res.send({
        error: "Error occured here"
      });
    });
});

module.exports =app;