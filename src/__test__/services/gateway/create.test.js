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

describe("create gateway", () => {
	it("can create a gateway", async () => {
		const data = {
			serialNumber: "M720",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "10.0.10.2",
		};
		const gateway = await Gateway.create(data);
		expect(gateway.name).toEqual(data.name);
		expect(gateway.userName).toEqual(data.userName);
		expect(gateway.ipv4).toEqual(data.ipv4);
	});

	it("cannot create a person", async () => {
		const data = {
			serialNumber: "M720",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "256.0.10.2",
		};

		const gateway = await Gateway.create(data);
		expect(gateway).toHaveProperty("error");
		expect(gateway.error.message).toEqual("Gateway validation failed: ipv4: Your IPv4 address is not in the correct format");
		expect(gateway.error._message).toEqual("Gateway validation failed");
	});
});
