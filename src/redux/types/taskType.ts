import { ITask, ITaskInfo } from "../../utills/TypeScript";

export const GET_TASK = "GET_TASK";
export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CONFIRM_TASK = "CONFIRM_TASK";
export const TASK_INFO = "TASK_INFO";

export const SUB_INFO = "SUB_INFO";

export const USER_KEY = "USER_KEY";
export const TASK_KEY = "TASK_KEY";
export const SUB_KEY = "SUB_KEY";

export interface ITaskType {
  type: string;
  payload: Array<ITask>;
}

export interface ITaskTypeOj {
  type: string;
  payload: ITaskInfo;
}

export interface IKey {
  token?: string;
  task_id?: string;
  sub_id?: string;
}

export interface TASK_KEY {
  type: string;
  payload: IKey;
}
