import mongoose, {Model, Schema} from 'mongoose'

import {USER} from '../services/service'

const userSchema = new Schema<USER, Model<USER>>({
    username: String
})

const User:Model<USER> = mongoose.model('User', userSchema);

export default User;