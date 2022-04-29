import { forwardRef, useState } from "react";
import CalendarWeekDay from "./CalendarWeekDay";
import moment from "moment";

export enum Weekday {
  MON = 0,
  TUES,
  WED,
  THUS,
  FRI,
  SAT,
  SUN,
};

export namespace Weekday {
  export function all() {
    return [
      Weekday.MON,
      Weekday.TUES,
      Weekday.WED,
      Weekday.THUS,
      Weekday.FRI,
      Weekday.SAT,
      Weekday.SUN,
    ];
  }

  export function title(weekday: Weekday) {
    return [
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六",
      "周日",
    ][weekday]
  }
}

export interface CalendarWeekProps {};

export default forwardRef((props: CalendarWeekProps, ref) => {

  console.log(moment().format('dddd'));

  // --- ui

  return <>
  <div style={{
    display: "flex",
    borderStyle: "solid",
    borderColor: "#ddd",
    borderWidth: "1px 1px 0 1px",
  }}>
    {Weekday.all().map((weekday: Weekday) => 
      <CalendarWeekDay key={weekday} weekday={weekday}/>)}
  </div>
  </>;
});
