const AuthController = require("../services/auth");

module.exports = function (app) {
	app.post("/api/signup", async (req, res) => {
		// #swagger.tags = ['Auth']
		// #swagger.description = 'Signup a user'
		/* #swagger.parameters['obj'] = {
			in: 'body',
			required: true,
			schema: { $ref: "#/definitions/Person" }
    	} */
		const response = await AuthController.signUp(req.body);
		res.status(response.status || 200).json(response.json);
	});

	app.get("/api/login", async (req, res) => {
		// #swagger.tags = ['Auth']
		/* #swagger.security = [{
               "basicAuth": []
        }] */
		const response = await AuthController.login(req.headers["authorization"]);
		res.status(response.status || 200).json(response.json);
	});
};
