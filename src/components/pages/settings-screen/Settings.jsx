import ReactSlider from "react-slider";
import "./slider.css";
import { useContext } from "react";
import SettingsContext from "../../settings-context/SettingsContext";
import BackButton from "../../back-button/BackButton";

function Settings() {
  const settingsInfo = useContext(SettingsContext);

  return (
    <div style={{ textAlign: "center" }}>
      <label>
        Work: {String(settingsInfo.workMinutes).padStart(2, "0")}:00
      </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>
        Break: {String(settingsInfo.breakMinutes).padStart(2, "0")}:00
      </label>
      <ReactSlider
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
