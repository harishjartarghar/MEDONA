exports.verify_subject='DONOR MEDONA REGISTRATION';

exports.verify_template=(token)=>{
	return `
	<p>Hello,</p>
	<p>Thank you for showing interest in MEDONA.</p>
	<p>CLICK ON THE BELOW LINK TO COMPLETE THE REGISTRATION.</p>
	<p>http://localhost:3000/donor?token=${token}</p>
	`
};

exports.ngo_verify_subject='NGO MEDONA REGISTRATION';

exports.ngo_verify_template=(token)=>{
	return `
	<p>Hello,</p>
	<p>Thank you for showing interest in MEDONA.</p>
	<p>CLICK ON THE BELOW LINK TO COMPLETE THE REGISTRATION.</p>
	<p>http://localhost:3000/ngo?token=${token}</p>
	`
};