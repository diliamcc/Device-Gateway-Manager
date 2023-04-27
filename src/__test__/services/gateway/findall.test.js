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

describe("find all gateways", () => {
	const gateways = [
		{
			serialNumber: "M721",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "10.0.10.2",
		},
		{
			serialNumber: "M720",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "10.0.12.2",
		},
	];

	it("can find all persons", async () => {
		await Gateway.create(gateways[0]);
		await Gateway.create(gateways[1]);
		const gatewaysResponse = await Gateway.findAll();
		expect(gatewaysResponse).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					serialNumber: expect.any(String),
					name: expect.any(String),
					ipv4: expect.any(String),
				}),
			])
		);
	});
});
