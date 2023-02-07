const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AuthorizationError = require("./errors/AuthorizationError");
const LoginError = require("./errors/LoginError");

class Access {
    static getUser(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return user;
        } catch(e) {
            throw new AuthorizationError();
        }
    }

    static login = async ({ mongoDbConfig, password, res, username }) => {
        return mongoDbConfig.collections.USERS.findOne({ username })//query(`SELECT * FROM user WHERE username=?`, [ username ])
            .then(async user => {
                
                if(!user) throw new LoginError();

                const hasAccess = await bcrypt.compare(password, user.password);

                if(hasAccess) { //                     
                    const acessToken = jwt.sign({ 
                        username,
                        id: user.id
                    }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

                    const verifiedToken = jwt.verify(acessToken, process.env.JWT_SECRET_KEY);

                    res.json({
                        access: {
                            expiresIn: verifiedToken.exp, 
                            token: acessToken

                        },
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username
                    });
                    return;
                }

                throw new LoginError();
            })


    }

    static async logout({ mongoDbConfig, res, token }) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const { loginId, username } = user;
            
            res.send();
        } catch(e) {
            throw new AuthorizationError();
        }
    }

    static revalidateToken({ mongoDbConfig, res, token }) {
        try {
            const loggedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            return  mongoDbConfig.collections.USERS.findOne({ username: loggedUser.username })
                .then(async user => {
                    
                    const acessToken = jwt.sign({ 
                        username: user.username,
                        id: user.id
                    }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

                    const verifiedUser = jwt.verify(acessToken, process.env.JWT_SECRET_KEY);
                    
                    res.json({
                        access: {
                            expiresIn: verifiedUser.exp, 
                            token: acessToken
                        },
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username
                    });
                })

        } catch(e) {
            throw new AuthorizationError();
        }
    }
}

module.exports = Access;