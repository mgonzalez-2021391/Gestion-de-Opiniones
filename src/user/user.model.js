import { Schema, model } from "mongoose"

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: 'USER',
        uppercase: true,
        required: true
    }
},{
    versionKey: false
})

export default model('user', userSchema)