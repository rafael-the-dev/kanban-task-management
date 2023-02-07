const { MongoClient } = require("mongodb");

const mongoDBConfig = { 
    collections: {
        PRODUCTS: null,
        PAYMENTS_METHOD: null,
        SALES: null,
        SUPPLIERS: null,
        SUPPLIERS_INVOICES: null,
        TABLES: null,
        USERS: null,
    },
    isConnected: false ,
};

const mongoDBConnection = new MongoClient(process.env.MONGO_DB.url);

const createMongoDBConnection = async () => {
    const dbCollections = process.env.MONGO_DB.collections;
    let clusterDB;

    try {


        mongoDBConnection.on("connectionCreated", () => {
            mongoDBConfig.isConnected = true;
            clusterDB = mongoDBConnection.db(process.env.MONGO_DB.name);
            
            mongoDBConfig.collections = {
                USERS: clusterDB.collection(dbCollections.users ?? "users")
            };

        });

        const closeHelper = () => {
            mongoDBConfig.isConnected = false;

            mongoDBConfig.collections = {
                BARMEN: null,
                PRODUCTS: null,
                PAYMENT_METHOD: null,
                SALES: null,
                TABLES: null,
                USERS: null
            };
        };

        mongoDBConnection.on("error", () => {
            closeHelper()
        });

        mongoDBConnection.on("close", () => {
            closeHelper()
        });

        await mongoDBConnection.connect();
        console.log('Connected successfully to mongodb server');
    } catch(err) {
        console.error("mongo_db error", err);
        mongoDBConnection.close();
    }
    return clusterDB;
};

module.exports = { 
    createMongoDBConnection, 
    mongoDBConfig 
};