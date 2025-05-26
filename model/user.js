const { randomBytes, createHmac } = require('crypto');
const { Schema, model } = require('mongoose');
const {createTokenforUser} = require("../services/authentication");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
     lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    salt: {
        type: String,
    },
    Password: {
        type: String,
        required: true
    },
}, { timestamps: true })

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("Password")) return next();
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.Password)
        .digest("hex");

    this.salt = salt;
    this.Password = hashedPassword;

    next();
});



UserSchema.static("matchPasswordAndGenerateToken", async function (email, inputPassword) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const hashedInputPassword = createHmac("sha256", user.salt)
        .update(inputPassword)
        .digest("hex");

    if (user.Password !== hashedInputPassword) throw new Error("Password does not match");

    const token = createTokenforUser(user);
    return token;
});


const User = model('user', UserSchema);
module.exports = User;