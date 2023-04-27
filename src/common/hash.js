const crypto = require("crypto");
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = function (length) {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString("base64") /** convert to hexadecimal format */
		.slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = function (password, salt) {
	const hash = crypto.createHmac("sha512", salt);
	/** Hashing algorithm sha512 */
	hash.update(password);
	const value = hash.digest("base64");
	return {
		salt: salt,
		passwordHash: value,
	};
};

function saltHashPassword(password) {
	const salt = genRandomString(16);
	/** Gives us salt of length 16 */
	const passwordData = sha512(password, salt);
	return passwordData;
}

function comparePassword(password, hashedPassword, salt) {
	const hash = crypto.createHmac("sha512", salt);
	/** Hashing algorithm sha512 */
	hash.update(password);
	const value = hash.digest("base64");
	return hashedPassword == value;
}

module.exports = { saltHashPassword, comparePassword };
