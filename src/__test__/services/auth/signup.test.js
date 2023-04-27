const mongoose = require("mongoose");
const mongoConfig = require("../../../config").Mongo;
const { Auth } = require("../../../modules/auth/services");

beforeEach((done) => {
	mongoose.connect(`mongodb://${mongoConfig.path}:${mongoConfig.port}/+JestDB`, { useNewUrlParser: true, useUnifiedTopology: true }, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe("signUp", () => {
	it("can register a user", async () => {
		const data = {
			name: "0passOK",
			userName: "0passOK",
			password: "Asd1234*",
		};
		const person = await Auth.signUp(data);
		expect(person).toHaveProperty("json");
		expect(person.json.name).toEqual(data.name);
		expect(person.json.userName).toEqual(data.userName);
		expect(person.json.password).not.toEqual(data.password);
	});

	it("cannot register a user", async () => {
		const data = {
			name: "1passFail",
			userName: "1passFail",
			password: "Asd1234",
		};

		const person = await Auth.signUp(data);
		expect(person).toHaveProperty("json");
		expect(person).toHaveProperty("status");
		expect(person.status).toEqual(400);
		expect(person.json).toHaveProperty("error");
		expect(person.json.error.message).toEqual("Person validation failed: password: Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
	});
});
