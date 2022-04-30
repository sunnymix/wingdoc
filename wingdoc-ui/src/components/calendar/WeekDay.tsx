import { forwardRef } from "react";
import { Weekday } from "./Week";

export interface CalendarWeekDayProps {
  weekday: Weekday,
};

export default forwardRef((props: CalendarWeekDayProps, ref) => {

  // --- props

  const {weekday} = props;

  // --- ui

  return <>
  <div style={{
    flexGrow: 1,
  }}>
    <div
      style={{
        borderStyle: "solid",
        borderColor: "#ddd",
        borderLeftWidth: 0,
        borderRightWidth: weekday != Weekday.SUN ? 1 : 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 5,
        textAlign: "center",
      }}>{Weekday.title(weekday)}</div>
    <div
      style={{
        borderStyle: "solid",
        borderColor: "#ddd",
        borderLeftWidth: 0,
        borderRightWidth: weekday != Weekday.SUN ? 1 : 0,
        borderTopWidth: 1,
        borderBottomWidth: 0,
        padding: 5,
      }}>
        <div>Tasks</div>
      </div>
  </div>
  </>
});
