var nodemailer=require("nodemailer");

//configure the parameters
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'medonadbd@gmail.com',
	pass: 'Medona.1234'
	},
	tls: {
		rejectUnauthorized: false
	}
};
var smtpTransport = nodemailer.createTransport(smtpConfig);

exports.VERIFY_MAIL=(email,template,subject)=>{
	mailOptions={
		to : email,
		subject:subject ,
        html: template
	}
   
	//sending the mail
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
			return;
	 }else{
console.log("mail sent to",email);
        
		return;
    	 }
});
}