import React from "react";
import {CgClose} from 'react-icons/cg'

const Popup = (props: any) => {

  const handleClose =()=>{
    props.setTrigger(false)
  }

  return (
    <>
      {props.trigger && (
        <div className="popup">
          <div className="popup-inner">
            <CgClose className="close-btn icon i-delete" onClick={handleClose} />
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
