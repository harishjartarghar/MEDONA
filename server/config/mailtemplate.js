exports.verify_subject=()=>{
	return 'MEDONA REGISTRATION';
};

exports.verify_template=(token)=>{
	return `
	<p>Hello,</p>
	<p>Thank you for showing interest in MEDONA.</p>
	<p>CLICK ON THE BELOW LINK TO COMPLETE THE REGISTRATION.</p>
	<p>http://localhost:3000/donor?token=${token}</p>
	`
};