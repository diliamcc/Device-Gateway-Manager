const { Gateway } = require("../models");

const create = async (data) => {
	try {
		const p = new Gateway(data);
		return await p.save();
	} catch (error) {
		return { error };
	}
};

const findById = async (id) => {
	try {
		return await Gateway.findById(id);
	} catch (error) {
		return { error };
	}
};

const findBySerialNumber = async (serialNumber) => {
	try {
		return await Gateway.findOne({ serialNumber });
	} catch (error) {
		return { error };
	}
};

const updateById = async (id, data) => {
	try {
		return await Gateway.findByIdAndUpdate(id, data);
	} catch (error) {
		return { error };
	}
};

const deleteById = async (id) => {
	try {
		return await Gateway.findByIdAndRemove(id);
	} catch (error) {
		return { error };
	}
};

const findAll = async () => {
	try {
		return await Gateway.find({});
	} catch (error) {
		return { error };
	}
};

const addDevice = async (id, device) => {
	try {
		const gateway = await Gateway.findById(id);
		if (!gateway) {
			throw {
				message: "This gateway does not exist",
			};
		}
		gateway.devices.push(device);
		await gateway.save();
		return gateway;
	} catch (error) {
		return { error };
	}
};

const removeDevice = async (id, deviceId) => {
	try {
		const gateway = await Gateway.findById(id);
		if (!gateway) {
			throw {
				message: "This gateway does not exist",
			};
		}
		const device = gateway.devices.id(deviceId);
		if (!device) {
			throw {
				message: "This device does not exist",
			};
		}
		device.remove();
		await gateway.save();
		return gateway;
	} catch (error) {
		return { error };
	}
};

module.exports = Object.freeze({
	create,
	findById,
	findBySerialNumber,
	updateById,
	deleteById,
	findAll,
	addDevice,
	removeDevice,
});
