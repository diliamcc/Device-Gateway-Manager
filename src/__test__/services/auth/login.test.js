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

describe("login", () => {
	it("can login a user", async () => {
		const data = {
			name: "0passOK",
			userName: "0passOK",
			password: "Asd1234*",
		};
		const person = await Auth.signUp(data);
		const basicAuth = Buffer.from(`${data.userName}:${data.password}`).toString("base64");
		const response = await Auth.login(`Basic ${basicAuth}`);
		expect(response).toHaveProperty("json");
		expect(response.json).toEqual(
			expect.objectContaining({
				accessToken: expect.any(String),
				refreshToken: expect.any(String),
			})
		);
		expect(response.json).toHaveProperty("person");
		expect(response.json.person.userName).toEqual(data.userName);
		expect(response.json.person.id).toEqual(person.json._id);
	});

	it("cannot login a user", async () => {
		const data = {
			name: "1passOK",
			userName: "1passOK",
			password: "Asd1234*",
		};

		await Auth.signUp(data);
		const basicAuth = Buffer.from(`${data.userName}:${data.password}1`).toString("base64");
		const response = await Auth.login(`Basic ${basicAuth}`);
		expect(response.status).toEqual(400);
		expect(response).toHaveProperty("json");
		expect(response.json.message).toEqual("Username or password invalid");
	});
});
