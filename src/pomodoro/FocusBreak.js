import React from "react";
import { minutesToDuration } from "../utils/duration/index";

export default function FocusBreak({
  focusDuration,
  session,
  decreaseFocus,
  increaseFocus,
  increaseBreak,
  decreaseBreak,
  breakDuration,
}) {
  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            {/* TODO: Update this text to display the current focus session duration */}
            Focus Duration: {minutesToDuration(focusDuration)}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
            <button
              disabled={session}
              onClick={decreaseFocus}
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
            <button
              disabled={session}
              onClick={increaseFocus}
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              {/* TODO: Update this text to display the current break session duration */}
              Break Duration: {minutesToDuration(breakDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
              <button
                disabled={session}
                onClick={decreaseBreak}
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
              <button
                disabled={session}
                onClick={increaseBreak}
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
