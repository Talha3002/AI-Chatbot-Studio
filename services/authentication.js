const JWT = require('jsonwebtoken');
const secret = "abc@123";

function createTokenforUser(user){
    const payload = {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
    };
    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports={
    createTokenforUser,
    validateToken,
}