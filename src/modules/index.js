const models = {
	Gateway: require("./gateway/models/gateway"),
	Person: require("./auth/models/person"),
};

const routes = (app) => {
	require("./auth/routes/auth")(app);
	require("./gateway/routes/gateway")(app);
};

module.exports.models = models;
module.exports.routes = routes;
