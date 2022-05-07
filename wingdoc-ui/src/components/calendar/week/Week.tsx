import { forwardRef, useState } from "react";
import WeekDay from "./WeekDay";
import moment from "moment";
import { Weekday } from "./WeekDay";

export interface WeekProps {
  week: number,
  weekendShow: boolean,
  heightMultiple?: number,
  style?: any,
};

export default forwardRef((props: WeekProps, ref) => {

  // --- props

  const {week, weekendShow, heightMultiple, style} = props;

  // --- current week

  const currentWeek = week == 0;

  // --- weekend show

  // --- ui

  return <>
  <div style={{
    display: "flex",
    alignItems: "stretch",
    backgroundColor: "#fff",
    ...style,
  }}>
    {Weekday.all(weekendShow).map((weekday: Weekday) => 
      <WeekDay
        key={`${week}-${weekday}`}
        week={week}
        weekday={weekday}
        heightMultiple={heightMultiple}/>
    )}
  </div>
  </>
});
