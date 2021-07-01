import React from "react";

export default function Status({ prevStateSession, prevState }) {
  setIsTimerRunning((prevState) => {
    const nextState = !prevState;
    if (nextState) {
      setSession((prevStateSession) => {
        // If the timer is starting and the previous session is null,
        // start a focusing session.
        if (prevStateSession === null) {
          return {
            label: "Focusing",
            timeRemaining: focusDuration * 60,
          };
        }
        return prevStateSession;
      });
    }
    return nextState;
  });
}
