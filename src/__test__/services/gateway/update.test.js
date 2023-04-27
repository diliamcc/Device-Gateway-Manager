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

describe("update a gateway", () => {
	it("can update a gateway", async () => {
		const data = {
			serialNumber: "M721",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "10.0.10.2",
		};
		const gateway = await Gateway.create(data);
		await Gateway.updateById(gateway._id, { name: "updated" });

		const gatewayUpdated = await Gateway.findBySerialNumber(data.serialNumber);
		expect(gatewayUpdated.name).toEqual("updated");
		expect(gatewayUpdated.serialNumber).toEqual(gateway.serialNumber);
		expect(gatewayUpdated.ipv4).toEqual(gateway.ipv4);
	});
});
