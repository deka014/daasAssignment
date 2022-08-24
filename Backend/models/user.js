import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cart : {
        type: Array,
    }
});

const User = mongoose.model("users", UserSchema);

export default User;