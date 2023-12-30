import Timer from "./components/pages/timer-screen/Timer";
import "./reset.css";
import "./app.css";
import Settings from "./components/pages/settings-screen/Settings";
import { useState } from "react";
import SettingsContext from "./components/settings-context/SettingsContext";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <SettingsContext.Provider
      value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}
    >
      <main>{showSettings ? <Settings /> : <Timer />}</main>;
    </SettingsContext.Provider>
  );
}

export default App;
