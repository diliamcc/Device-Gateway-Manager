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

describe("remove a person", () => {
	it("can remove a person", async () => {
		const data = {
			serialNumber: "M721",
			name: "Lorem Ipsum has been the industry's",
			ipv4: "10.0.10.2",
		};
		const person = await Gateway.create(data);
		await Gateway.deleteById(person._id);
		const personUpdated = await Gateway.findBySerialNumber(data.serialNumber);
		expect(personUpdated).toEqual(null);
	});
});
