import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import ProgressBar from "./ProgressBar";
import PlayPause from "./PlayPause";
import FocusBreak from "./FocusBreak";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const increaseFocus = () =>
    setFocusDuration((focus) => (focus < 60 ? focus + 5 : focus));
  const decreaseFocus = () =>
    setFocusDuration((focus) => (focus > 5 ? focus - 5 : focus));
  const decreaseBreak = () =>
    setBreakDuration((breakDur) => (breakDur > 1 ? breakDur - 1 : breakDur));
  const increaseBreak = () =>
    setBreakDuration((breakDur) => (breakDur < 15 ? breakDur + 1 : breakDur));

  const handleStopBtn = () => {
    setSession(null);
    setIsTimerRunning(false);
  };

  const focusBar = () =>
    (1 - session.timeRemaining / (focusDuration * 60)) * 100;

  const breakBar = () =>
    (1 - session.timeRemaining / (breakDuration * 60)) * 100;

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */

  function playPause() {
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

  return (
    <div className="pomodoro">
      <FocusBreak
        focusDuration={focusDuration}
        session={session}
        decreaseFocus={decreaseFocus}
        increaseFocus={increaseFocus}
        increaseBreak={increaseBreak}
        decreaseBreak={decreaseBreak}
        breakDuration={breakDuration}
      />
      <PlayPause
        session={session}
        isTimerRunning={isTimerRunning}
        classNames={classNames}
        playPause={playPause}
        handleStopBtn={handleStopBtn}
      />

      <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}

        {session ? (
          <section>
            <div className="row mb-2">
              <div className="col">
                {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
                <h2 data-testid="session-title">
                  {session?.label} for{" "}
                  {session.label === "Focusing"
                    ? minutesToDuration(focusDuration)
                    : minutesToDuration(breakDuration)}{" "}
                  minutes
                </h2>
                {/* TODO: Update message below correctly format the time remaining in the current session */}
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(session?.timeRemaining)} remaining
                </p>
              </div>
            </div>
            <ProgressBar
              session={session}
              focusBar={focusBar}
              breakBar={breakBar}
            />
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default Pomodoro;
