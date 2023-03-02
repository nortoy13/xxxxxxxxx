import React from "react";
import ReactSwitch from "react-switch";
import { useSelector, useDispatch } from "react-redux";
import { setLanUz, setLanEn } from "../../actions/setLan";

const Settings = ({ theme, toggleTheme }) => {
  const language = useSelector((state) => state.lan);
  const dispatch = useDispatch();
  const handleChange = () => {
    const isSwitch = document.getElementById("switchMode").checked;
    if (isSwitch) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", JSON.stringify("dark"));
    }
    toggleTheme();
  };
  const handleChangeLan = () => {
    const isSwitch = document.getElementById("switchModeLan").checked;
    if (isSwitch) {
      dispatch(setLanUz({ type: "uz" }));
      localStorage.setItem("language", JSON.stringify("uz"));
    } else {
      dispatch(setLanEn({ type: "en" }));
      localStorage.removeItem("language");
    }
  };
  return (
    <div className="settings">
      <h1>{language === "uz" ? "Sozlamalar" : "Settings"}</h1>
      <h3>{language === "uz" ? "Mavzu" : "Theme:"}</h3>
      <div style={{ display: "flex" }}>
        <h4>{language === "uz" ? "Qora Fon" : "DarkMode"}</h4>
        <ReactSwitch id="switchMode" onChange={handleChange} checked={theme === "dark"} />
      </div>
      <h3>{language === "uz" ? "Til Sozlamasi:" : "Language Setting:"}</h3>
      <h4 style={{ display: "flex", alignItems: "center" }}>
        {language === "uz" ? "O'zbekcha" : "Uzbek"}
        <input
          style={{ width: "20px", height: "20px", marginLeft: "10px" }}
          type="checkbox"
          id="switchModeLan"
          onChange={handleChangeLan}
          checked={language === "uz"}
        />
      </h4>
    </div>
  );
};

export default Settings;
