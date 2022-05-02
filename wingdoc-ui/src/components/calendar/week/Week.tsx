import { forwardRef, useState } from "react";
import WeekDay from "./WeekDay";
import moment from "moment";
import { Weekday } from "./WeekDay";

export interface WeekProps {
  week: number,
  style?: any,
};

export default forwardRef((props: WeekProps, ref) => {

  const {week} = props;

  // --- ui

  return <>
  <div style={{
    display: "flex",
    alignItems: "stretch",
    borderStyle: "solid",
    borderColor: "#ddd",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    ...props.style,
  }}>
    {Weekday.all().map((weekday: Weekday) => 
      <WeekDay
        key={`${week}-${weekday}`}
        week={week}
        weekday={weekday}/>
    )}
  </div>
  </>
});
