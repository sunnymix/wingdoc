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
  {focusingView == CalendarView.WEEK &&
    <Weeks/>
  }
  </>
});
