
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertType";

import { IProps } from "../../utills/TypeScript";

const Toast = ({ title, body, bgColor }: IProps) => {
  
    const dispatch = useDispatch()
    const handleClose =()=>{
       dispatch({
           type: ALERT,
           payload: {}
       })
    }
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 99999,
        minWidth: "200px",
      }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{title}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
      <div className="toast-body">
        {typeof body === "string" ? (
          body
        ) : (
          <ul>
            {body.map((val, idx) => {
              return <li key={idx}>{val}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Toast;
