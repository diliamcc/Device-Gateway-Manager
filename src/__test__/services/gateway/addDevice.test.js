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

describe("addDevice to a gateway", () => {
	it("can add device to a gateway", async () => {
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
		expect(gatewayWithDevice.devices[0].uid).toBe(device.uid);
		expect(gatewayWithDevice.devices[0].vendor).toBe(device.vendor);
		expect(gatewayWithDevice.devices[0].status).toBe("online");
	});
	it("cannot add device to a gateway", async () => {
		const data = {
			serialNumber: "M722",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "10.0.10.3",
		};
		const gateway = await Gateway.create(data);
		const device = [
			{
				uid: 80,
				vendor: "Diliam Cueto",
			},
		];
		for (const i of Array.from({ length: 10 }, (_, i) => i + 1)) {
			await Gateway.addDevice(gateway._id, { ...device, uid: i });
		}
		const errorDevice = await Gateway.addDevice(gateway._id, device);
		expect(errorDevice).toHaveProperty("error");
		expect(errorDevice.error._message).toBe("Gateway validation failed");
	});
});
