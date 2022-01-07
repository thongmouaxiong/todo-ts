import { Dispatch } from "redux";

import { deleteAPI, getOneAPI, postAPI, updateAPI } from "../../utills/FetchData";
import { SubTaskBody } from "../../utills/TypeScript";
import { ALERT, IAlertType } from "../types/alertType";
import { ADD_SUB_TASK, CONFIRM_SUB_TASK, DELETE_SUB_TASK, EDIT_SUB_TASK, GET_SUB_TASK, ISubTaskType } from "../types/subTask";


export const getSubTask =
  (task_id: string) =>
  async (dispatch: Dispatch<ISubTaskType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getOneAPI("sub-task", task_id)

      dispatch({
        type: GET_SUB_TASK,
        payload: res.data.sub_task,
      });

      dispatch({ type: ALERT, payload: { success: "success !!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

  export const addSubTask =
  (taskData: SubTaskBody) =>
  async (dispatch: Dispatch<ISubTaskType | IAlertType>) => {
    console.log(taskData)
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("sub-task", taskData)
      dispatch({
        type: ADD_SUB_TASK,
        payload: res.data.sub_task,

      });
      
      dispatch({ type: ALERT, payload: { success: "success !!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

  export const deleteSubTask =
  (dataKey: object) =>
  async (dispatch: Dispatch<ISubTaskType | IAlertType>) => {
    
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await deleteAPI("sub-task", dataKey)
      dispatch({
        type: DELETE_SUB_TASK,
        payload: res.data.sub_task,

      });
      
      dispatch({ type: ALERT, payload: { success: "delete success !!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

  export const updateSubTask =
  (updateObj: object) =>
  async (dispatch: Dispatch<ISubTaskType | IAlertType>) => {
    
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await updateAPI("sub-task", updateObj)
      dispatch({
        type: EDIT_SUB_TASK,
        payload: res.data.sub_task,

      });
      
      dispatch({ type: ALERT, payload: { success: "edit success !!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

  export const confirmSubTask =
  (dataKey: object) =>
  async (dispatch: Dispatch<ISubTaskType | IAlertType>) => {
    
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await updateAPI("sub-task-confirm", dataKey)
      dispatch({
        type: CONFIRM_SUB_TASK,
        payload: res.data.sub_task,
      });
      
      dispatch({ type: ALERT, payload: { success: "done task yeh!!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };