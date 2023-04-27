const HTTP = {
	port: process.env.HTTP_PORT || 3000,
};

const Mongo = {
	path: process.env.MONGO_PATH || "127.0.0.1",
	port: process.env.MONGO_PORT || 27017,
	dbName: process.env.DB_NAME || "gg",
};

const Mail = {
	service: "gmail",
	auth: {
		user: process.env.MAIL_USER || "cuetodiliam@gmail.com",
		pass: process.env.MAIL_PASSWORD || "flasdlasd",
	},
	from: "Test",
};

const JWT = {
	secret: process.env.JWT_SECRET || "th1s1s4s3cr37y0ul177l3sh17",
	options: {
		expiresIn: "1h",
	},
	refresh: {
		secret: process.env.JWT_REFRESH_SECRET || "th1s1sar3fr3skt0k3n",
		options: {
			expiresIn: 60 * 60 * 24 * 365,
		},
	},
};

module.exports = { HTTP, Mongo, Mail, JWT };
