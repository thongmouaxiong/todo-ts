import e from "cors";
import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IUser {
  username: string;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}

export interface IProps {
  title: string;
  body: string | string[];
  bgColor: string;
}

export interface ITask {
  _id?: string;
  task?: string;
  description?: string;
  deedLine?: Date;
  status?: string;
  createdAt?: Date;
  successDate?: Date;
}

export interface TaskBody {
  task_id?: string;
  token?: string;
  task?: string;
  description?: string;
  deedLine?: string;
}

export interface SubTaskBody {
  task_id?: string;
  sub_task_id?: string;
  task?: string;
  createdAt?: string;
  deedLine?: string;
  description?: string;
}

export interface ISubTask {
  _id?: string;
  task?: string;
  description?: string;
  deedLine?: Date;
  status?: string;
  createdAt?: Date;
  successDate?: Date;
}

export interface ITaskInfo {
  _id: string;
  task: string;
  description: string;
  deedLine: Date;
  status: string;
  createdAt: Date;
  successDate: Date;
}

export class DateDiff {
  public static inDays(d1: Date, d2: Date) {
    var t2 = d2.getDate();
    var t1 = d1.getDate();
    return (t2 - t1);
  }

  public static inDayT(d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();
    return (t2 - t1) / (24 * 3600 * 1000);
  }

  public static inWeeks(d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return (t2 - t1) / (24 * 3600 * 1000 * 7);
  }

  public static inMonths(d1: Date, d2: Date) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  }

  public static inYears(d1: Date, d2: Date) {
    return d2.getFullYear() - d1.getFullYear();
  }
}
