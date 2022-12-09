import React from "react";

const Wrapper = (props: any) => {
  return (
    <div id="row">
      <div className="col-4 offset-4">{props.children}</div>
    </div>
  );
};

export default Wrapper;
