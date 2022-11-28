import {Schema, model, Document, Types} from 'mongoose'

export interface ITechnology extends Document {
    techlology: string
}

const technologySchema = new Schema({
    technology: {
        type: String
    }
})

export default model<ITechnology>('technology', technologySchema)