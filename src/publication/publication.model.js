import { Schema, model } from "mongoose"

const publicationSchema =  Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        uppercase: true,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment",
        required: false
    }]
},
{
    versionKey: false
})

export default model('publication', publicationSchema)