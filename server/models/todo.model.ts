import mongoose, { Model, Schema, Types } from "mongoose";

import { TODO } from "../services/service";

const todoSchema = new Schema<TODO, Model<TODO>>(
  {
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deedLine: {
      type: Date,
      required: true,
    },
    successDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["done", "doing"],
      default: "doing",
    },
  },
  { timestamps: true }
);

export default class TodoModel {
  // token: string;
  // constructor(token: string) {
  //   this.token = token;
  // }
  constructor() {}
  public static getTaskModel(token: string) {
    const model: Model<TODO> = mongoose.model(`task_${token}`, todoSchema);
    return model;
  }

  public static getSubModel(sub_id: string) {
    const model: Model<TODO> = mongoose.model(`sub_task_${sub_id}`, todoSchema);
    return model;
  }
}
