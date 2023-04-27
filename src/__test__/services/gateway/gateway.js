const { Gateway } = require("../../../models");
const GatewayController = require("../../../controllers").Gateway;

jest.mock("../../models");

const saveMock = jest.fn((x) => x);
Gateway.prototype.$__save = saveMock;

describe("GatewayController", () => {
	const gateways = [
		{
			serialNumber: "12345678",
			name: "Localhost",
			ipv4: "127.0.0.1",
		},
	];
	beforeAll(() => {
		// give the mock function a value
		// for the promise to be resolved with
		Gateway.find.mockResolvedValue(gateways);
		Gateway.create.mockResolvedValue(gateways[0]);
	});

	test("if response data is equal to gateways const", async () => {
		const response = await GatewayController.findAll();

		expect(response).toEqual(gateways);
	});

	test("if create data equal to gateways const", async () => {
		const response = await GatewayController.create({ ...gateways[0] });
		expect(response).toEqual(gateways);
	});
});
