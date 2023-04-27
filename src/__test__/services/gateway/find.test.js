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

describe("find a gateway", () => {
	it("can find a gateway", async () => {
		const data = {
			serialNumber: "M720",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "10.0.10.2",
		};
		await Gateway.create(data);
		const gateway = await Gateway.findBySerialNumber(data.serialNumber);
		expect(gateway.name).toEqual(data.name);
		expect(gateway.serialNumber).toEqual(data.serialNumber);
		expect(gateway.ipv4).toEqual(data.ipv4);
	});
});
