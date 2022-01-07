import { ISubTask } from "../../utills/TypeScript";
import { ADD_SUB_TASK, DELETE_SUB_TASK, EDIT_SUB_TASK, GET_SUB_TASK, ISubTaskType } from "../types/subTask";

const subTaskReducer = (
  state: Array<ISubTask> = [],
  action: ISubTaskType
): Array<ISubTask> => {
  switch (action.type) {
    case GET_SUB_TASK:
      return action.payload;
    case ADD_SUB_TASK: {
      return state;
    }
    case EDIT_SUB_TASK:{
      return state
    }     
    case DELETE_SUB_TASK:
      return state;
    default:
      return state;
  }
};

export default subTaskReducer;
