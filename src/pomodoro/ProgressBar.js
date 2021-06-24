import React from "react";

export default function ProgressBar({ session, focusBar, breakBar }) {
  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={
              session.label === "Focusing" ? focusBar() : breakBar()
            } // TODO: Increase aria-valuenow as elapsed time increases
            style={{
              width:
                (session.label === "Focusing" ? focusBar() : breakBar()) + "%",
            }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  );
}
