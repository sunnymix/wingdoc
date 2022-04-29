import { forwardRef } from "react";
import { Weekday } from "./CalendarWeek";

export interface CalendarWeekDayProps {
  weekday: Weekday,
};

export default forwardRef((props: CalendarWeekDayProps, ref) => {

  // --- props

  const {weekday} = props;

  // --- ui

  return <div style={{
    flexGrow: 1,
    borderStyle: "solid",
    borderColor: "#ddd",
    borderWidth: "0 1px 1px 0",
    padding: 5,
  }}>{Weekday.title(weekday)}</div>;
});
