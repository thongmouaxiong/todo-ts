import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ITask, RootStore, TaskBody } from "../../utills/TypeScript";
import { confirmTask, deleteTask } from "../../redux/action/taskAction";

import { MdDelete, MdDoneOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { FcOvertime } from "react-icons/fc";
import AddPopup from "../popup/TaskPopup";
import { Link } from "react-router-dom";

const ShowTask = (props: any) => {
  const DeedLine: Date = new Date(props.deedLine);
  const [showPop, setShowPop] = useState(false);

  const dispatch = useDispatch();
  const { auth, task } = useSelector((state: RootStore) => state);

  const handleDelete = (e: any) => {
    const task_id = e.target.id;
    const dataKey = { token: auth.token, task_id };
    dispatch(deleteTask(dataKey));
    props.setReload(!props.reload);
  };

  const handleConfirm = (e: any) => {
    const task_id = e.target.id;
    const dataKey = { token: auth.token, task_id };
    dispatch(confirmTask(dataKey));
    props.setReload(!props.reload);
  };

  const editHandleClick = (e: any) => {
    if(props.status === 'doing'){
      setShowPop(true);
    }
  };

  const handleClick = (e: any) => {
    dispatch({
      type: "TASK_KEY",
      payload: {
        task_id: e.target.id,
      },
    });

    const inf = task.filter((val: ITask) => val._id === e.target.id);
    dispatch({
      type: "TASK_INFO",
      payload: inf[0],
    });
  };

const bg = props.status==='done' ? "#5CAB5C":"#77adff"

  return (
    <div className="wrap">
      <div className="btn-container">
        <MdDoneOutline
          className="icon i-done"
          id={props.id}
          onClick={handleConfirm}
        />
        <FiEdit2 className="icon i-edit" onClick={editHandleClick} />
        {showPop && (
          <AddPopup
            
            id={props.id}
            task={props.title}
            description={props.description}
            deedLine={props.deedLine}
            reload={props.reload}
            setReload={props.setReload}
            close={showPop}
            setClose={setShowPop}
          />
        )}

        <MdDelete
          className="icon i-delete"
          id={props.id}
          onClick={handleDelete}
        />
      </div>
      <Link
        to="/sub-task"
        className="link-to"
        id={props.id}
        title={props.title}
        onClick={handleClick}
      >
        <div className="div-wrap wrap-task"   style={{backgroundColor:`${bg}`}}>
          {/* <div > */}
            <h2>{props.title}</h2>
            <span>{props.description}</span>
          {/* </div> */}
          <div className="time-wrap">
            <p className="p-status">{props.status}</p>
            <div style={{ display: "flex", gap: "2px" }}>
              <FcOvertime style={{ width: "px", height: "18px" }} />
              <p className="p-date">{DeedLine.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShowTask;
