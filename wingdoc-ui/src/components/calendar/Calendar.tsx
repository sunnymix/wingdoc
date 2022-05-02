import { forwardRef, useState } from "react";
import { Radio, Space } from "antd";
import Weeks from "./week/Weeks";

export enum CalendarView { 
  DAY = "DAY",
  WEEK = "WEEK",
  Month = "Month",
};

export interface CalendarProps {
  focusView?: CalendarView,
};

export default forwardRef((props: CalendarProps, ref) => {

  // --- props:

  const {focusView} = props;

  // --- focusing view:

  const [focusingView, setFocsingView] = useState<CalendarView>(focusView || CalendarView.WEEK);

  return <>
  <Space direction="vertical" size="middle" style={{width: "100%"}}>
    <Space direction="horizontal" size="middle">
      <Radio.Group defaultValue="week" buttonStyle="solid">
        <Radio.Button value="day">Day</Radio.Button>
        <Radio.Button value="week">Week</Radio.Button>
        <Radio.Button value="month">Month</Radio.Button>
      </Radio.Group>
    </Space>
    {focusingView == CalendarView.WEEK &&
      <Weeks/>
    }
  </Space>
  </>
});
