const cookie = require("cookie");
const DefaultError = require("src/models/server/errors/DefaultError");

const Access = require("src/models/server/Access");
const { createMongoDBConnection, mongoDBConfig } = require("src/connections/mongo_db");

var mongoDbConfig = {
    isConnected: false 
};

const hasFreeAccess = (req) => {
    const { method, url } = req;
    
    const userPattern = new RegExp("/api/users/[A-z0-9]{8,}");
    const isGetMethod = method === "GET";

    if(userPattern.test(url) && isGetMethod) return true;
    else if([ "/api/categories", "/api/products", "/api/users"].includes(url) && isGetMethod) return true;
    else if(url.includes("/api/users")) return true;

    return ([ "/api/users", "/api/login", "/api/logout"  ].includes(url));
};

const apiHandler = (handler) => {
    return async (req, res) => {
        
        /*if(!dbConfig.isConnected) {
            await createDBConnection(dbConfig);
        }*/

        if(!mongoDbConfig.isConnected) {
            await createMongoDBConnection();
            mongoDbConfig = mongoDBConfig
        }

        const { authorization } = req.headers;
        
        const { token } = cookie.parse(req.headers.cookie ?? "");

        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );

            if (req.method === "OPTIONS") {
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
            }

            let user = null;
            
            if(!hasFreeAccess(req)) {
                user = Access.getUser(authorization ?? token);
            }

            await handler(req, res, { user, mongoDbConfig });
        } catch(err) {
            console.error("handler error", err);

            if(err instanceof DefaultError) {
                res.status(err.status).json(err.getResponse());
                return;
            }
            
            res.status(500).json({ message: "Internal server error", err });
        }
    }
};

module.exports = { apiHandler };