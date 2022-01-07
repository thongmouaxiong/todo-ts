import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubTask } from "../../redux/action/subTaskAction";
import { SUB_INFO } from "../../redux/types/taskType";
import { DateDiff, ISubTask, RootStore } from "../../utills/TypeScript";
import SubPopup from "../popup/SubPopup";

const LoadSubTask = (props: any) => {
  const dispatch = useDispatch();

  const [showPop, setShowPop] = useState(false);

  const { task_info, subTask, key } = useSelector((state: RootStore) => state);

  const d1 = moment(props.createdAt).format("YYYY-MM-DD");
  let d2 = moment(props.deedLine).format("YYYY-MM-DD");

  if (props.succesDate) {
    d2 = moment(props.succesDate).format("YYYY-MM-DD");
  }

  const d3 = moment(task_info.createdAt).format("YYYY-MM-DD");

  const sub_count = DateDiff.inDayT(new Date(d1), new Date(d2));
  const sub_size = (sub_count * 100) / props.countDate;

  const left_count = DateDiff.inDayT(new Date(d3), new Date(d1));
  const left_dif = (left_count * 100) / props.countDate;

  const clr = props.status === "doing" ? "#0B820B" : "#CBCB2A";

  const handleClick = (e: any) => {
    if(task_info.status!=='doing') return 
    dispatch({
      type: "SUB_KEY",
      payload: {
        task_id: key.task_id,
        sub_id: e.target.id,
      },
    });

    setShowPop(true);
  };

  return (
    // <Link to='/sub-task'>
    <>
      {showPop && (
        <SubPopup
          id={props._id}
          task={props.task}
          description={props.description}
          createdAt={props.createdAt}
          deedLine={props.deedLine}
          close={showPop}
          setClose={setShowPop}
          reload={props.reload}
          setReload={props.setReload}
          edit={true}
        />
      )}
      <div
        className="sub-wrap"
        id={props.id}
        style={{
          width: `${sub_size}%`,
          left: `${left_dif}%`,
          background: `${clr}`,
        }}
        onClick={props.status === "doing" ? handleClick : () => {}}
      >
        
        <div  className="hover-text" id={props.id}>
          <h1 id={props.id}>{props.task}</h1>
          <p id={props.id}>{props.description}</p>
        </div>

        <label id={props.id} className="d-start">{moment(d1).format("DD-MM-YYYY")}</label>
        <h2 id={props.id}>{props.task}</h2>
        <label id={props.id} className="d-end">{moment(d2).format("DD-MM-YYYY")}</label>
      </div>
    </>
    // </Link>
  );
};

export default LoadSubTask;
