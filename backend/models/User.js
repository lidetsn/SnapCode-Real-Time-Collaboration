const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    // username: {
    //     type: String,
    //     required: true
    // }
});

UserSchema.pre('save', async function(next) {
    const user = this;
    // Hash the password with a salt round of 10, the more secure it is but slower the app becomes
    const hash = await bcrypt.hash(this.password, 10);
    
    // Replaces the plain text password with the hash and store it. 
    this.password = hash
    next();
})

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    // Hashes the password sent by the user for login and checks if the hashed password store in the database matches the one sent. Returns true if it does
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}


module.exports = mongoose.model("User", UserSchema);
