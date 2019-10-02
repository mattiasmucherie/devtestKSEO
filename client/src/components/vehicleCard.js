import React from "react";

function vehicleCard(props) {
  let status = (
    <span
      className={`label label-${
        props.status === "online" ? "success" : "danger"
      }`}
    >
      {props.status}
    </span>
  );

  return (
    <div className="col-sm-6 col-md-3">
      <div className="thumbnail">
        <div className="caption">
          <h3>{props.reg}</h3>
          <p>
            <strong>{props.name}</strong>
          </p>
          <p>{props.vin}</p>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}

export default vehicleCard;
