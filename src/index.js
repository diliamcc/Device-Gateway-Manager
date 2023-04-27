const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const app = require("./server");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(app.get("PORT"), () => {
	console.log(`Server listening on PORT ${app.get("PORT")}`);
});
