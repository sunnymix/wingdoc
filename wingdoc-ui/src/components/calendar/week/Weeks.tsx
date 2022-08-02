import { forwardRef, useCallback, useEffect, useState } from "react";
import Week from "./Week";
import { Space, InputNumber, Checkbox, Button } from "antd";
import "./WeekStyle.css";
import { useModel } from "umi";

export interface WeekListProps {};

export default forwardRef((props: WeekListProps, ref) => {

  // --- weeks

  const [weeks, setWeeks] = useState<number[]>([]);

  // --- model

  const { 
    weeksBefore,
    setWeeksBefore,
    weeksAfter,
    setWeeksAfter,
    weekendShow,
    setWeekendShow,
    heightMultiple,
    setHeightMultipel,
  } = useModel("weeks");

  const handleWeeksBeforeUpdate = (value: number) => {
    setWeeksBefore(value);
  };

  const handleWeeksAfterUpdate = (value: number) => {
    setWeeksAfter(value);
  };

  const handleWeekendShowUpdate = (e: any) => {
    const checked = e.target.checked;
    setWeekendShow(checked);
  };

  const handleHeightMultipleUpdate = (value: number) => {
    setHeightMultipel(value);
  };
  
  // --- weeks update

  useEffect(() => {
    const today = 0;
    const weeks = [today];
    for (var i = 1; i <= weeksBefore; i++) {
      weeks.splice(0, 0, today - i);
    }
    for (var i = 1; i <= weeksAfter; i++) {
      weeks.push(today + i);
    }
    setWeeks(weeks);
  }, [weeksBefore, weeksAfter, weekendShow]);

  // --- focus this week:

  const handleFocusThisWeek = useCallback((e: any) => {
    setWeeksBefore(0);
    setWeeksAfter(0);
  }, []);

  const handleFocusThreeWeeks = useCallback((e: any) => {
    setWeeksBefore(1);
    setWeeksAfter(1);
  }, []);

  const handleFocusBackward = useCallback((e: any) => {
    setWeeksBefore(1);
    setWeeksAfter(0);
  }, []);

  const handleFocusForward = useCallback((e: any) => {
    setWeeksBefore(0);
    setWeeksAfter(1);
  }, []);

  // --- ui:

  return <>
  <Space className="weeks" direction="vertical" size="middle">
    <Space direction="horizontal" size="middle">
      <InputNumber className='weeks_input' min={0} value={weeksBefore} onChange={handleWeeksBeforeUpdate} addonAfter="周前" />
      <InputNumber className='weeks_input' min={0} value={weeksAfter} onChange={handleWeeksAfterUpdate} addonAfter="周后" />
      <InputNumber className='weeks_input' min={1} value={heightMultiple} onChange={handleHeightMultipleUpdate} addonAfter="空间" />
      <Checkbox defaultChecked={weekendShow} onChange={handleWeekendShowUpdate}>周末</Checkbox>
      <Button className="focus_this_week" type='ghost' onClick={handleFocusThisWeek}>本周</Button>
      <Button className="focus_three_weeks" type='ghost' onClick={handleFocusThreeWeeks}>近3周</Button>
      <Button className="focus_backward" type='ghost' onClick={handleFocusBackward}>回顾</Button>
      <Button className="focus_forward" type='ghost' onClick={handleFocusForward}>前瞻</Button>
    </Space>
    <div className="weeks_body">
      {weeks.map((week: number) => 
        <Week key={week} week={week} weekendShow={weekendShow} heightMultiple={heightMultiple} />
      )}
    </div>
  </Space>
  </>
});
