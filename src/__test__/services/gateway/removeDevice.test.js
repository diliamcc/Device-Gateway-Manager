const mongoose = require("mongoose");
const mongoConfig = require("../../../config").Mongo;
const { Gateway } = require("../../../modules/gateway/services");

beforeEach((done) => {
	mongoose.connect(`mongodb://${mongoConfig.path}:${mongoConfig.port}/+JestDB`, { useNewUrlParser: true, useUnifiedTopology: true }, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe("removeDevice to a gateway", () => {
	it("can remove device to a gateway", async () => {
		const data = {
			serialNumber: "M722",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "10.0.10.3",
		};
		const gateway = await Gateway.create(data);
		const device = {
			uid: 80,
			vendor: "Diliam Cueto",
		};
		const gatewayWithDevice = await Gateway.addDevice(gateway._id, device);
		expect(gatewayWithDevice.devices.length).toBe(1);
		device.id = gatewayWithDevice.devices[0].id;
		const gatewayWithOutDevice = await Gateway.removeDevice(gateway._id, device.id);
		expect(gatewayWithOutDevice.devices.length).toBe(0);
	});
});
