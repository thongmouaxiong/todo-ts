import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubTask, confirmSubTask, deleteSubTask, updateSubTask } from "../../redux/action/subTaskAction";
import { addTask, getTask, updateTask } from "../../redux/action/taskAction";
import { ALERT } from "../../redux/types/alertType";
import { DateDiff, FormSubmit, RootStore, SubTaskBody } from "../../utills/TypeScript";

import Button from "../form/button";
import InputField from "../form/input";
import Popup from "./Popup";

const SubPopup = (props: any) => {
  const mindate = new Date();
  const min_date = moment(mindate).format("YYYY-MM-DD");

  const { auth, task_info, key } = useSelector((state: RootStore) => state);

  const sub_data: SubTaskBody = {
    task_id: key.task_id,
    sub_task_id: "",
    task: "",
    description: "",
    createdAt: "",
    deedLine: "",
  };

  const [subData, setSubData] = useState<SubTaskBody>(sub_data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.edit) {
      setSubData({
        task_id: key.task_id,
        sub_task_id: key.sub_id,
        task: props.task,
        description: props.description,
        createdAt: `${props.createdAt}`,
        deedLine: `${props.deedLine}`,
      });

      const task: any = document.querySelector("#task");
      task.value = props.task;

      const description: any = document.querySelector("#description");
      description.value = props.description;

      const createdAt: any = document.querySelector("#createdAt");
      createdAt.value = moment(props.createdAt).format("YYYY-MM-DD");
      createdAt.max = moment(task_info.deedLine).format("YYYY-MM-DD");
      console.log(createdAt.max)

      const deedLine: any = document.querySelector("#deedLine");
      deedLine.value = moment(props.deedLine).format("YYYY-MM-DD");
      deedLine.max = moment(task_info.deedLine).format("YYYY-MM-DD");
      
      return;
    }
    if (props.sub) {
      const createdAt: any = document.querySelector("#createdAt");
      createdAt.max = moment(task_info.deedLine).format("YYYY-MM-DD");
      const deedLine: any = document.querySelector("#deedLine");
      deedLine.max = moment(task_info.deedLine).format("YYYY-MM-DD");
      return;
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSubData({
      ...subData,
      [name]: value,
    });

    if (name === "createdAt") {
      const deedLine: any = document.querySelector("#deedLine");
      deedLine.min = moment(value).format("YYYY-MM-DD");
    }
  };

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    if(!subData.task || !subData.description|| !subData.createdAt || !subData.deedLine){
      dispatch({type:ALERT, payload:{errors: 'field is required. Please Enter all field....'}})
      return
    }

    if (props.edit) {
      await dispatch(updateSubTask(subData));
      await props.setReload(!props.reload);
      await props.setClose(false);
      return;
    }

    await dispatch(addSubTask(subData));
    await props.setReload(!props.reload);
    await props.setClose(false);
  };

  const handleConfirm = async (e: FormSubmit) => {
    e.preventDefault();
    const dif = await DateDiff.inDayT(new Date(moment(props.createdAt).format("YYYY-MM-DD")), new Date())
    if(dif<=0){
      dispatch({type:ALERT, payload:{errors: 'The sub task not start yet!'}})
      return
    }
    await dispatch(confirmSubTask(subData));
    await props.setReload(!props.reload);
    await props.setClose(false);
  };

  const handleDelete = async (e: FormSubmit) => {
    e.preventDefault();
    await dispatch(deleteSubTask(subData));
    await props.setReload(!props.reload);
    await props.setClose(false);
  };

  return (
    <Popup trigger={props.close || true} setTrigger={props.setClose}>
      <h2 style={{ textAlign: "center" }}>Post New Sub Task</h2>
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
          <label htmlFor="createdAt">Start Date</label>
          <input
            id="createdAt"
            name="createdAt"
            className="form-control w-50"
            type="date"
            min={min_date}
            onChange={handleChange}
          />
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
          {props.edit && (
            <Button
              text="Confirm"
              style="btn-primary"
              onClick={handleConfirm}
            />
          )}
          {props.edit && (
            <Button text="Delete" style="btn-primary" onClick={handleDelete} />
          )}
        </div>
      </form>
    </Popup>
  );
};

export default SubPopup;
