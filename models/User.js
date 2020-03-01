const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const itemSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordSalt: {
        type: String,
        required: true
    },
    passwordHash: String,
}, {
    timestamps: true,
    versionKey: false
});

itemSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;

        if (password) {
            this.passwordSalt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 1, 128, 'sha1')
                .toString('base64');
        } else {
            this.passwordSalt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

itemSchema.methods.checkPassword = function (password) {
    if (!password) return false;
    if (!this.passwordHash) return false;

    const passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 1, 128, 'sha1')
        .toString('base64');

    return passwordHash === this.passwordHash;
};

module.exports = mongoose.model('User', itemSchema);
