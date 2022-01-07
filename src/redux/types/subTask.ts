import { ISubTask } from "../../utills/TypeScript";

export const GET_SUB_TASK = 'GET_SUB_TASK'
export const ADD_SUB_TASK = 'ADD_SUB_TASK'
export const EDIT_SUB_TASK = 'EDIT_SUB_TASK'
export const DELETE_SUB_TASK = 'DELETE_SUB_TASK'
export const CONFIRM_SUB_TASK = 'CONFIRM_SUB_TASK'

export interface ISubTaskType {
    type: string;
    payload: Array<ISubTask>
}

