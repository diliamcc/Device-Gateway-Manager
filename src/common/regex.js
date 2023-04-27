const ipv4Validate = (ipv4) => {
	const isOK = /\b^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){3}\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipv4);
	return {
		isOK,
		message: isOK ? null : "Your IPv4 address is not in the correct format",
	};
};

const passswordValidate = (password) => {
	//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
	const isOK = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
	return {
		isOK,
		message: isOK ? null : "Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
	};
};
module.exports.ipv4Validate = ipv4Validate;
module.exports.passswordValidate = passswordValidate;
