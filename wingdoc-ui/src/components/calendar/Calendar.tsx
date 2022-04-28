import { forwardRef } from "react";
import { Radio } from "antd";

export interface CalendarProps {}

export default forwardRef((props: CalendarProps, ref) => {
  return <>
  <Radio.Group defaultValue="week" buttonStyle="solid">
    <Radio.Button value="day">Day</Radio.Button>
    <Radio.Button value="week">Week</Radio.Button>
    <Radio.Button value="month">Month</Radio.Button>
  </Radio.Group>
  </>
});
