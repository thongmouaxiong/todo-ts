import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubTask } from "../../redux/action/subTaskAction";
import { addTask, getTask, updateTask } from "../../redux/action/taskAction";
import { ALERT } from "../../redux/types/alertType";
import {
  FormSubmit,
  InputChange,
  RootStore,
  SubTaskBody,
  TaskBody,
} from "../../utills/TypeScript";

import Button from "../form/button";
import InputField from "../form/input";
import Popup from "./Popup";

const TaskPopup = (props: any) => {
  const mindate = new Date();
  // console.log(mindate)
  const min_date = moment(mindate).format("YYYY-MM-DD");
  // console.log(mindate)
  // console.log(date)

  const { auth, task_info } = useSelector((state: RootStore) => state);

  const initial_data: TaskBody = {
    token: auth.token,
    task_id: "",
    task: "",
    description: "",
    deedLine: "",
  };

  const [dataTask, setData] = useState<TaskBody>(initial_data);

  const dispatch = useDispatch();

  useEffect(() => {
    if(props.sub){
      const deedLine:any = document.querySelector("#deedLine");
      deedLine.max = moment(task_info.deedLine).format("YYYY-MM-DD");
      return
    }
    if (props.task) {
      setData({
        token: auth.token,
        task_id: props.id,
        task: props.task,
        description: props.description,
        deedLine: props.deedLine,
      });

      const task: any = document.querySelector("#task");
      task.value = props.task;

      const description: any = document.querySelector("#description");
      description.value = props.description;

      const deedLine: any = document.querySelector("#deedLine");

      deedLine.value = moment(props.deedLine).format("YYYY-MM-DD");
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...dataTask,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    if(!dataTask.task || !dataTask.description || !dataTask.deedLine){
      dispatch({type:ALERT, payload:{errors: 'field is required. Please Enter all field....'}})
      return
    }

    if (!props.task) {
      await dispatch(addTask(dataTask));
      await props.setReload(!props.reload);
      await props.setClose(false);
      return;
    }

    await dispatch(updateTask(dataTask));
    await props.setReload(!props.reload);
    await props.setClose(false);
  };

  return (
    <Popup trigger={props.close || true} setTrigger={props.setClose}>
      <h2 style={{ textAlign: "center" }}>Post New Task</h2>
      <form className="form-wrap">
        <div className="mb-3">
          <label htmlFor="task">Task title</label>
          <InputField id="task" name="task" handleChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description">Task Description</label>
          <textarea
            className="form-control"
            rows={4}
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="deedLine">DeedLine</label>
          <input
            id="deedLine"
            name="deedLine"
            className="form-control w-50"
            type="date"
            min={min_date}
            onChange={handleChange}
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <Button text="Save" style="btn-primary" onClick={handleSubmit} />
        </div>
      </form>
    </Popup>
  );
};

export default TaskPopup;
