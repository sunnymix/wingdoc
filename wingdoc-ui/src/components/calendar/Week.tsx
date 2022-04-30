import { forwardRef, useState } from "react";
import WeekDay from "./WeekDay";
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

export interface WeekProps {};

export default forwardRef((props: WeekProps, ref) => {

  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

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
