import { ITask, ITaskInfo } from "../../utills/TypeScript";
import {
  IKey,
  ITaskTypeOj,
  SUB_KEY,
  SUB_INFO,
  TASK_INFO,
  TASK_KEY,
  USER_KEY,
  ITaskType,
} from "../types/taskType";

const initial: ITaskInfo = {
  _id: "",
  task: "",
  description: "",
  deedLine: new Date(),
  status: "",
  createdAt: new Date(),
  successDate: new Date(),
};

const task_info = (state: ITaskInfo = initial, aciton: ITaskTypeOj) => {
  switch (aciton.type) {
    case TASK_INFO:
      return aciton.payload;
    default:
      return state;
  }
};

const sub_info = (
  state: ITaskInfo = initial,
  aciton: ITaskTypeOj
): ITaskInfo => {
  switch (aciton.type) {
    case SUB_INFO:
      return aciton.payload;
    default:
      return state;
  }
};

const key = (state: IKey = {}, aciton: TASK_KEY) => {
  switch (aciton.type) {
    case USER_KEY:
      return aciton.payload;
    case TASK_KEY:
      return aciton.payload;
    case SUB_KEY: {
      return aciton.payload;
    }
    default:
      return state;
  }
};

const task_filter = (
  state: Array<ITask> = [],
  action: ITaskType
): Array<ITask> => {
  switch (action.type) {
    case "ALLTASK":
      return action.payload;
    case "DOING":
      return action.payload;
    case "DONE":
      return action.payload;
    default:
      return state;
  }
};

export { task_info, sub_info, key, task_filter };
