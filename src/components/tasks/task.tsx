import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShowTask from "./showTask";
import { ITask, RootStore } from "../../utills/TypeScript";
import { getTask } from "../../redux/action/taskAction";

import { BsPlusCircleFill, BsTypeH1 } from "react-icons/bs";
import Toast from "../alert/Toast";
import AddPopup from "../popup/TaskPopup";
import { ALERT } from "../../redux/types/alertType";

const Task = () => {
  const { auth, task, task_filter } = useSelector((state: RootStore) => state);

  const [showPop, setShowPop] = useState(false);
  const [reload, setReload] = useState(false);
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      dispatch(getTask(auth.token));
      setClick(false)
    }
  }, [auth, reload]);

  const handleClick = () => {
    if (!auth.token) {
      dispatch({
        type: ALERT,
        payload: {
          errors: "No user. Please login...",
        },
      });
      return;
    }
    setShowPop(true);
  };

  const handleAll = () => {
    if (auth.token) {
      const d = dispatch({ type: "ALLTASK", payload: task });
    }
    setClick(true)
  };

  const handleDoing = () => {
    const doingTask = task.filter((val: ITask) => val.status === "doing");
    if (auth.token) dispatch({ type: "DOING", payload: doingTask });
    setClick(true)
  };
  const handleDone = async () => {
    const doneTask = task.filter((val: ITask) => val.status === "done");
    if (auth.token) dispatch({ type: "DONE", payload: doneTask });
    setClick(true)
  };

  return (
    <>
      <div className="user-wrap">
        <h3> User: {auth.token ? auth.user?.username : ""}</h3>
        <ul className="status-wrap">
          <li className="status-item" onClick={handleAll}>
            All Task
          </li>
          <li className="status-item" onClick={handleDoing}>
            Doing
          </li>
          <li className="status-item" onClick={handleDone}>
            Done
          </li>
        </ul>
      </div>
      <div className="ctn-wrap">
        <div className="div-wrap" onClick={handleClick}>
          <BsPlusCircleFill className="icon-add" />
        </div>
        {showPop && (
          <AddPopup
            close={showPop}
            setClose={setShowPop}
            reload={reload}
            setReload={setReload}
          />
        )}
        {click? task_filter.map((val: ITask, idx: number) => {
          return (
            <ShowTask
              key={val._id}
              id={val._id}
              title={val.task}
              description={val.description}
              deedLine={val.deedLine}
              status={val.status}
              reload={reload}
              setReload={setReload}
            />
          );
        }): task.map((val: ITask, idx: number) => {
          return (
            <ShowTask
              key={val._id}
              id={val._id}
              title={val.task}
              description={val.description}
              deedLine={val.deedLine}
              status={val.status}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    </>
  );
};

export default Task;
