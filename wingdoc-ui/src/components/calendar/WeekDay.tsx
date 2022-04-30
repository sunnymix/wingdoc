import { forwardRef } from "react";
import { Weekday } from "./Week";
import { Space } from "antd";


export interface WeekDayProps {
  weekday: Weekday,
};

export default forwardRef((props: WeekDayProps, ref) => {

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
      }}>
        <Space direction="horizontal" size="small">
          <div>{Weekday.monthDay(weekday)}</div>
          <div>{Weekday.title(weekday)}</div>
        </Space>
      </div>
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
