import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "../../play-button/PlayButton";
import PauseButton from "../../pause-button/PauseButton";
import SettingsButton from "../../settings-button/Settings-button";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "../../settings-context/SettingsContext";
import ResetButton from "../../reset-button/ResetButton";
import SwitchModeButton from "../../switch-mode-button/SwitchModeButton";
import soundFile from "../../assets/alarm-clock-beep-2_zjywn-4d.mp3";

const red = "#f54e4e";
const green = "#4aec8c";

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [initialWorkMinutes, setInitialWorkMinutes] = useState(
    settingsInfo.workMinutes
  );
  const [initialBreakMinutes, setInitialBreakMinutes] = useState(
    settingsInfo.breakMinutes
  );

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work"); // work/break/null

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work"
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes) * 60;

    if (nextMode === "work" && modeRef.current === "break") {
      setIsPaused(true);
      isPausedRef.current = true;
      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
      return;
    }

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);

    if (secondsLeftRef.current === 0) {
      const audio = new Audio(soundFile);
      audio.play();
    }
  }

  function initTimer() {
    setIsPaused(true);
    if (modeRef.current === "work") {
      secondsLeftRef.current = settingsInfo.workMinutes * 60;
    } else {
      secondsLeftRef.current = settingsInfo.breakMinutes * 60;
    }
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  useEffect(() => {
    setInitialWorkMinutes(settingsInfo.workMinutes);
    setInitialBreakMinutes(settingsInfo.breakMinutes);
  }, [settingsInfo.workMinutes, settingsInfo.breakMinutes]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  if (minutes < 10) minutes = "0" + minutes;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          tailColor: "rgba(255, 255, 255, .2)",
        })}
      />
      <div className="controls-bar">
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
        <ResetButton
          onClick={() => {
            setIsPaused(true);
            isPausedRef.current = true;
            initTimer();
          }}
        />

        <SwitchModeButton onClick={switchMode} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
