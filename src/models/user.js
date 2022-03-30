import mongoose, { Schema } from "mongoose";
import { createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    salt: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
userSchema.methods = {
    authenticate(password) {
        return this.password === this.encryptPassword(password)
    },
    encryptPassword(password) {
        if (!password) return
        try {
            return createHmac("sha256", this.salt).update(password).digest("hex");
        } catch (error) {

        }
    }
}
userSchema.pre("save", function (next) {
    this.salt = uuidv4()
    this.password = this.encryptPassword(this.password)
    next();
});
export default mongoose.model('User', userSchema);