import { ITask } from "../../utills/TypeScript";
import {
  ADD_TASK,
  CONFIRM_TASK,
  DELETE_TASK,
  EDIT_TASK,
  GET_TASK,
  ITaskType,
  TASK_INFO,
} from "../types/taskType";

const taskReducer = (
  state: Array<ITask> = [],
  action: ITaskType
): Array<ITask> => {
  switch (action.type) {
    case GET_TASK:
      return action.payload;
    case ADD_TASK: {
      return state;
    }
    case EDIT_TASK: {
      return state;
    }
    case DELETE_TASK:
      return state;
    case CONFIRM_TASK:
      return state;
    // case "DOING":
    //   return state.filter((val: ITask) => val.status === "doing");
    // case "DONE":
    //   return state.filter((val: ITask) => val.status === "done");
    default:
      return state;
  }
};

export default taskReducer;
