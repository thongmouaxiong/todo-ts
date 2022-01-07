import { Dispatch } from "redux";
import {
  deleteAPI,
  getOneAPI,
  postAPI,
  updateAPI,
} from "../../utills/FetchData";
import { ITask, TaskBody } from "../../utills/TypeScript";
import { ALERT, IAlertType } from "../types/alertType";
import {
  ADD_TASK,
  CONFIRM_TASK,
  DELETE_TASK,
  EDIT_TASK,
  GET_TASK,
  ITaskType,
} from "../types/taskType";

export const getTask =
  (user_token: string) =>
  async (dispatch: Dispatch<ITaskType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getOneAPI("task", user_token);

      dispatch({
        type: GET_TASK,
        payload: res.data.task,
      });

      dispatch({ type: ALERT, payload: { success: "login success !!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const addTask =
  (taskData: TaskBody) =>
  async (dispatch: Dispatch<ITaskType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("task", taskData);
      dispatch({
        type: ADD_TASK,
        payload: res.data.task,
      });

      dispatch({ type: ALERT, payload: { success: "login success !!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteTask =
  (dataKey: object) => async (dispatch: Dispatch<ITaskType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await deleteAPI("task", dataKey);
      dispatch({
        type: DELETE_TASK,
        payload: res.data.task,
      });

      dispatch({ type: ALERT, payload: { success: "delete success !!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateTask =
  (updateObj: object) => async (dispatch: Dispatch<ITaskType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await updateAPI("task", updateObj);
      dispatch({
        type: EDIT_TASK,
        payload: res.data.task,
      });

      dispatch({ type: ALERT, payload: { success: "edit success !!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const confirmTask =
  (dataKey: object) => async (dispatch: Dispatch<ITaskType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await updateAPI("task-confirm", dataKey);
      dispatch({
        type: CONFIRM_TASK,
        payload: res.data.task,
      });

      dispatch({ type: ALERT, payload: { success: "done task yeh!!!" } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
