import { forwardRef, useState } from "react";
import WeekDay from "./WeekDay";
import moment from "moment";
import { Weekday } from "./WeekDay";

export interface WeekProps {};

export default forwardRef((props: WeekProps, ref) => {

  // --- ui

  return <>
  <div style={{
    display: "flex",
    borderStyle: "solid",
    borderColor: "#ddd",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  }}>
    {Weekday.all().map((weekday: Weekday) => 
      <WeekDay key={weekday} weekday={weekday}/>)}
  </div>
  </>
});
