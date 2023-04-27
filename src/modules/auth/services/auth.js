const { Person } = require("../models");
const { sign } = require("../../../common/auth");

const login = async (data) => {
	try {
		const usernamePassword = Buffer.from(data.split("Basic ")[1], "base64").toString().split(":");
		const exist = await Person.findOne({ userName: usernamePassword[0] });
		if (!exist || !exist.comparePassword(exist, usernamePassword[1])) return { status: 400, json: { message: "Username or password invalid" } };
		const person = { id: exist._id, userName: exist.userName };
		const accessToken = sign(person);
		return { json: { ...accessToken, person } };
	} catch (error) {
		return { status: 400, json: { error: { message: error.message } } };
	}
};

const signUp = async (data) => {
	try {
		const p = new Person(data);
		await p.save();
		return { json: p };
	} catch (error) {
		return { status: 400, json: { error: { message: error.message } } };
	}
};

const logout = async () => {};

module.exports = Object.freeze({
	login,
	signUp,
	logout,
});
