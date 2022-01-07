
import mongoose, { Schema, Model, Types } from 'mongoose';

interface BlogPost {
  _id: Types.ObjectId;
  title: string;
}

interface User {
  tags: Types.Array<string>,
  blogPosts: Types.DocumentArray<BlogPost>,
  sub:Types.DocumentArray<BlogPost>
}
const sub = {
  sub_task: String,
  sub_description: String,
  createDate:{
    type:Date,
    default: new Date()
  },
  deelLine: Date,
  sub_status: { type: String, enum: ["done", "doing"], default: "doing" },
}

const sub_task:Object = {
  sub,
  array: [sub]
}

const schema = new Schema<User, Model<User>>({
  tags: [String],
  blogPosts: [{ title: String }],
  sub:[sub_task]
});

const Users = mongoose.model('user', schema);

const user = new Users({ blogPosts: [] });

user.blogPosts.push({ title: 'test' });
user.sub.push({sub_task: "String",
  sub_description: "String", });
  user.sub.push({sub_task: "String 1",
  sub_description: "String1 ", });

console.log(user)
console.log(user.collection.collectionName)


