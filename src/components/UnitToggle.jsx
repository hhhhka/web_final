import classes from "./UnitToggle.module.css";
import { useRef } from "react";

export default function UnitToggle({ updateUnit }) {
  const inputRef = useRef();

  function clickHandler() {
    //console.log(inputRef.current.checked);
    updateUnit(inputRef.current.checked);
  }

  return (
    <div className={classes.unitContainer}>
      <div>C</div>
      <div>
        <label className={classes.switch}>
          <input name="unitCheckbox" type="checkbox" defaultChecked={true} ref={inputRef} onClick={clickHandler} />
          <span className={`${classes.slider} ${classes.round}`}></span>
        </label>
      </div>
      <div>F</div>
    </div>
  );
}
