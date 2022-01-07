import { Types } from "mongoose";

export interface USER {
  _id: Types.ObjectId,
  username: string
}

export interface USER_BODY {
  _id: string,
  username: string
}

export interface TODO {
  task: string;
  description: string;
  deedLine: Date;
  successDate: Date;  
  status: string;
}

export interface TODO_BODY {
  task_id: string;
  sub_task_id: string;
  token: string;
  task: string;
  deedLine: Date;  
  successDate: Date;  
  description: string;
}

