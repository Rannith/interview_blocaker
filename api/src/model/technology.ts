import {Schema, model, Document, Types} from 'mongoose';
import { ITechnology } from '../utils/types';

const technologySchema = new Schema({
    technology: {
        type: String
    }
})

export default model<ITechnology>('technology', technologySchema);