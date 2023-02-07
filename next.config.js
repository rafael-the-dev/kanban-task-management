const path = require('path')

module.exports = {
    env: {
        JWT_SECRET_KEY: "53a0d1a4174d2e1b8de701437fe06c08891035ed4fd945aef843a75bed2ade0657b3c4ff7ecd8474cb5180b2666c0688bbe640c9eb3d39bb9f2b724a10f343c6",
        LOCAL_STORAGE: "__rafael-the-dev-kanban-app__",
        MONGO_DB: {
            collections: {
                users: "users",
            },
            name: "kanban",
            url: "mongodb+srv://rafael-the-dev:iH.-qJftk8g9cgc@cluster0.z64j5.mongodb.net/kanban?authMechanism=DEFAULT"
        },
        SERVER: "http://localhost:5544"
    },
    webpack: config => {
        config.resolve.modules.push(path.resolve('./'));

        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
}