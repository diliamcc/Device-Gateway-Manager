const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { saltHashPassword, comparePassword } = require("../../../common/hash");
const { passswordValidate } = require("../../../common/regex");

const personSchema = new Schema({
	name: { type: String, required: [true, "Name is required"] },
	userName: {
		type: String,
		required: [true, "User name is required"],
		unique: true,
	},
	password: { type: String, required: [true, "Password  is required"] },
	salt: { type: String },
});

personSchema.pre("validate", function (next) {
	const passwordIsOK = passswordValidate(this.password);
	if (!passwordIsOK.isOK) {
		this.invalidate("password", passwordIsOK.message);
	}
	next();
});

personSchema.pre("save", function (next) {
	// only hash the password if it has been modified (or is new)
	if (!this.isModified("password")) return next();
	const passSalt = saltHashPassword(this.password);
	this.password = passSalt.passwordHash;
	this.salt = passSalt.salt;
	next();
});

personSchema.methods.comparePassword = (person, candidatePassword) => {
	return comparePassword(candidatePassword, person.password, person.salt);
};
module.exports = model("Person", personSchema);
