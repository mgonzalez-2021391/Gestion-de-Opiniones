import { Schema, model} from "mongoose"

const commentSchema = Schema ({
    publication: {
        type: Schema.Types.ObjectId,
        ref: "publication",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},
{
    versionKey: false
})

export default model('comment', commentSchema)