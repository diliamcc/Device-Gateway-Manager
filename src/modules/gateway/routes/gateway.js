const Gateway = require("../services/gateway");
const { Auth } = require("../../../common");
module.exports = function (app) {
	app.get("/api/gateway/:id", Auth.withAuth, async (req, res) => {
		// #swagger.tags = ['Gateway']
		// #swagger.description = 'Endpoint to show an specific gateway by it's id'
		// #swagger.parameters['id'] = { description: 'ID of the gateway' }

		/* #swagger.security = [{
               "bearerAuth": []
        }] */

		/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Gateway" },
          description: 'Gateway found.' 
      	} */

		res.json(await Gateway.findById(req.params.id));
	});

	app.get("/api/gateway", Auth.withAuth, async (req, res) => {
		// #swagger.tags = ['Gateway']
		// #swagger.description = 'Endpoint to list all gateways'

		/* #swagger.security = [{
               "bearerAuth": []
        }] */

		res.json(await Gateway.findAll());
	});

	app.post("/api/gateway", Auth.withAuth, async (req, res) => {
		// #swagger.tags = ['Gateway']
		// #swagger.description = 'Endpoint to create a gateway'

		/* #swagger.parameters['newGateway'] = {
        in: 'body',
        description: 'Gateway information.',
        required: true,
        schema: { $ref: "#/definitions/AddGateway" }
    	} */

		/* #swagger.security = [{
               "bearerAuth": []
        }] */

		res.json(await Gateway.create(req.body));
	});

	app.patch("/api/gateway/:id", Auth.withAuth, async (req, res) => {
		// #swagger.tags = ['Gateway']
		// #swagger.description = 'Endpoint to update an specific gateway by it's id'
		// #swagger.parameters['id'] = { description: 'ID of the gateway' }

		/* #swagger.parameters['updatedGateway'] = {
        in: 'body',
        description: 'Gateway field to be updated information.',
        required: true,
        schema: { $ref: "#/definitions/UpdateGateway" }
    	} */

		/* #swagger.security = [{
               "bearerAuth": []
        }] */

		/* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/Gateway" },
            description: 'Gateway found.' 
        } */
		res.json(await Gateway.updateById(req.params.id, req.body));
	});

	app.delete("/api/gateway/:id", Auth.withAuth, async (req, res) => {
		/*
		 #swagger.auto = false
		 #swagger.tags = ['Gateway']
		 #swagger.description = 'Endpoint to delete an specific gateway by it's id'
		 #swagger.parameters['id'] = {
			in: 'path',
			description: 'ID of the gateway to be deleted' 
			}
		 #swagger.security = [{
               "bearerAuth": []
        }] 
		*/

		res.json(await Gateway.deleteById(req.params.id));
	});

	app.post("/api/gateway/:id/device", Auth.withAuth, async (req, res) => {
		// #swagger.tags = ['Gateway']
		/* 
		#swagger.parameters['newGateway'] = {
        in: 'body',
        description: 'Gateway information.',
        required: true,
        schema: { $ref: "#/definitions/AddDevice" }
    	}
		#swagger.security = [{
               "bearerAuth": []
        }] */

		res.json(await Gateway.addDevice(req.params.id, req.body));
	});

	app.delete("/api/gateway/:id/device/:deviceId", Auth.withAuth, async (req, res) => {
		/*
		 #swagger.auto = false
		 #swagger.tags = ['Gateway']
		 #swagger.description = 'Endpoint to delete an specific gateway by it's id'
		 #swagger.parameters['id'] = {
			in: 'path',
			description: 'ID of the gateway' 
			}
		#swagger.parameters['deviceId'] = {
			in: 'path',
			description: 'ID of the device to be deleted' 
			}
		 #swagger.security = [{
               "bearerAuth": []
        }] 
		*/
		res.json(await Gateway.removeDevice(req.params.id, req.params.deviceId));
	});
};
