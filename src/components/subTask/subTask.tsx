import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getSubTask } from "../../redux/action/subTaskAction";
import { ISubTaskType } from "../../redux/types/subTask";
import { ISubTask, RootStore } from "../../utills/TypeScript";
import Header from "../header/header";
import LoadSubTask from "./loadSubTask";

import { DateDiff } from "../../utills/TypeScript";
import moment from "moment";
import { BsPlusCircleFill } from "react-icons/bs";
import { ALERT } from "../../redux/types/alertType";
import SubPopup from "../popup/SubPopup";

const SubTask = (props: any) => {
  const dispatch = useDispatch();
  const [showPop, setShowPop] = useState(false);
  const [reload, setReload] = useState(false);

  const { subTask, key, task_info, auth } = useSelector(
    (state: RootStore) => state
  );

  useEffect(() => {
    dispatch(getSubTask(`${key.task_id}`));
  }, [reload]);

  const { deedLine, createdAt } = task_info;

  const d1 = moment(createdAt).format("YYYY-MM-DD");
  const d2 = moment(deedLine).format("YYYY-MM-DD");
  const difDate = DateDiff.inDayT(new Date(d1), new Date(d2));

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

  return (
    <>
      <Header />
      <div className="bar-wrap">
        <div className="title-wrap">
          <h1>{task_info.task}</h1>
          <p>{task_info.description}</p>
        </div>

        {showPop && (
          <SubPopup
            close={showPop}
            setClose={setShowPop}
            reload={reload}
            setReload={setReload}
            sub={true}
          />
        )}

        <div className="line-wrap">
          <p>{moment(task_info.createdAt).format("DD-MM-YYYY")}</p>
          <h2>Sub Task</h2>
          <div
            className="btn-add"
            onClick={task_info.status === "doing" ? handleClick : () => {}}
          >
            <BsPlusCircleFill className="i-add" />
          </div>
          <p>{moment(task_info.deedLine).format("DD-MM-YYYY")}</p>
        </div>
        <div className="time-line">
          {subTask.map((val: ISubTask, idx: number) => {
            return (
              <LoadSubTask
                key={idx}
                id={val._id}
                task={val.task}
                description={val.description}
                status={val.status}
                createdAt={val.createdAt}
                deedLine={val.deedLine}
                succesDate={val.successDate}
                countDate={difDate}
                reload={reload}
                setReload={setReload}
                close={showPop}
                setClose={setShowPop}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SubTask;
