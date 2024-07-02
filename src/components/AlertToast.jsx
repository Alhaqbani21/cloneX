import React from 'react';

function AlertToast(props) {
  return (
    <div className="z-50 absolute ">
      <div className="alert bg-primary text-white fixed z-50 w-max top-20 right-5">
        <span>{props.text}</span>
      </div>
    </div>
  );
}

export default AlertToast;
