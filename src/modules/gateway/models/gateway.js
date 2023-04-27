const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ipv4Validate } = require("../../../common/regex");

const deviceSchema = new Schema({
	uid: { type: Number, required: [true, "UID is required"], unique: true },
	vendor: { type: String, required: [true, "Vendor is required"] },
	status: {
		type: String,
		enum: ["online", "offline"],
		default: "online",
	},
});

const gatewaySchema = new Schema({
	serialNumber: { type: String, required: [true, "Serial Number is required"], unique: true },
	name: { type: String, required: [true, "Name is required"] },
	ipv4: { type: String, required: [true, "ipv4 is required"], unique: true },
	devices: {
		type: [deviceSchema],
	},
});

gatewaySchema.pre("validate", function (next) {
	//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
	const ipv4IsOK = ipv4Validate(this.ipv4);
	if (!ipv4IsOK.isOK) {
		this.invalidate("ipv4", ipv4IsOK.message);
	}
	if (this.devices.length > 10) {
		this.invalidate("devices", "Gateway can only have 10 devices");
	}

	next();
});

module.exports = model("Gateway", gatewaySchema);
