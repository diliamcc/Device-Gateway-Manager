const server = require("../../server.js");
const supertest = require("supertest");
const mongoose = require("mongoose");
const requestWithSupertest = supertest(server);
const mongoConfig = require("../../config").Mongo;

beforeEach((done) => {
	mongoose.connect(`mongodb://${mongoConfig.path}:${mongoConfig.port}/+JestDB`, { useNewUrlParser: true, useUnifiedTopology: true }, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe("AuthRoutes", () => {
	const signup = async (data) => {
		const payload = {
			name: data?.name || "admin2",
			userName: data?.userName || "admin2",
			password: data?.password || "Asd1234*",
		};
		return { res: await requestWithSupertest.post("/api/signup").send(payload).set("Content-Type", "application/json").set("Accept", "application/json"), payload };
	};
	it("GET /login should login a user", async () => {
		const { payload } = await signup();
		const basicAuth = Buffer.from(`${payload.userName}:${payload.password}`).toString("base64");
		const res = await requestWithSupertest.get("/api/login").set({ Authorization: `Basic ${basicAuth}` });
		expect(res.status).toEqual(200);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("accessToken");
		expect(res.body).toHaveProperty("person");
		expect(res.body).toHaveProperty("refreshToken");
	});

	it("GET /login should throw an username error", async () => {
		const basicAuth = Buffer.from("admin2:Asd1234*").toString("base64");
		const res = await requestWithSupertest.get("/api/login").set({ Authorization: `Basic ${basicAuth}` });
		expect(res.status).toEqual(400);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("message");
		expect(res.body.message).toEqual("Username or password invalid");
	});

	it("GET /login should throw a password error", async () => {
		const basicAuth = Buffer.from("admin:asd1234*").toString("base64");
		const res = await requestWithSupertest.get("/api/login").set({ Authorization: `Basic ${basicAuth}` });
		expect(res.status).toEqual(400);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("message");
		expect(res.body.message).toEqual("Username or password invalid");
	});

	it("POST /signup should signup a user", async () => {
		const { res } = await signup();
		expect(res.status).toEqual(200);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("name");
		expect(res.body).toHaveProperty("userName");
		expect(res.body).toHaveProperty("_id");
	});

	it("POST /signup should an password error", async () => {
		const { res } = await signup({ password: "123" });
		expect(res.status).toEqual(400);
		expect(res.type).toEqual(expect.stringContaining("json"));
		expect(res.body).toHaveProperty("error");
		expect(res.body.error).toHaveProperty("message");
		expect(res.body.error.message).toEqual("Person validation failed: password: Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
	});
});
