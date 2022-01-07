import { ALERT } from "../types/alertType";
import { IAlert } from "../../utills/TypeScript";

const alertReducer = (state: IAlert = {}, action: any): IAlert => {
  switch (action.type) {
    case ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;