const mongoose = require("mongoose");
const mongoConfig = require("../../../config").Mongo;
const { Person } = require("../../../controllers");

beforeEach((done) => {
	mongoose.connect(`mongodb://${mongoConfig.path}:${mongoConfig.port}/+JestDB`, { useNewUrlParser: true, useUnifiedTopology: true }, () => done());
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

describe("PersonController", () => {
	const persons = [
		{
			name: "0passOK",
			userName: "0passOK",
			password: "Asd1234*",
		},
		{
			name: "1passFail",
			userName: "1passFail",
			password: "Asd1234",
		},
		{
			name: "2passOK",
			userName: "2passOK",
			password: "Asd1234*",
		},
		{
			name: "3passOK",
			userName: "3passOK",
			password: "Asd1234*",
		},
		{
			name: "4passOK",
			userName: "4passOK",
			password: "Asd1234*",
		},
		{
			name: "5passOK",
			userName: "5passOK",
			password: "Asd1234*",
		},
	];

	it("can create a person", async () => {
		const dataPerson = persons[0];
		const person = await Person.create(dataPerson);
		expect(person.name).toEqual(dataPerson.name);
		expect(person.userName).toEqual(dataPerson.userName);
	});

	it("cannot create a person", async () => {
		const dataPerson = persons[1];
		try {
			await Person.create(dataPerson);
		} catch (err) {
			expect(err.message).toEqual("Person validation failed: password: Your password must have: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
			expect(err._message).toEqual("Person validation failed");
		}
	});
	it("can find a person", async () => {
		const dataPerson = persons[2];
		await Person.create(dataPerson);
		const person = await Person.findByUserName(dataPerson.userName);
		expect(person.name).toEqual(dataPerson.name);
		expect(person.userName).toEqual(dataPerson.userName);
	});

	it("can find all persons", async () => {
		const dataPerson = persons[3];
		await Person.create(dataPerson);
		const personsResponse = await Person.findAll();
		expect(personsResponse).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: expect.any(String),
					userName: expect.any(String),
					password: expect.any(String),
				}),
			])
		);
	});

	it("can update a person", async () => {
		const dataPerson = persons[4];
		const person = await Person.create(dataPerson);
		await Person.updateById(person._id, { name: "updated" });

		const personUpdated = await Person.findByUserName(dataPerson.userName);
		expect(personUpdated.name).toEqual("updated");
		expect(personUpdated.userName).toEqual(dataPerson.userName);
	});

	it("can remove a person", async () => {
		const dataPerson = persons[5];
		const person = await Person.create(dataPerson);
		await Person.deleteById(person._id);
		const personUpdated = await Person.findByUserName(dataPerson.userName);
		expect(personUpdated).toEqual(null);
	});
});
