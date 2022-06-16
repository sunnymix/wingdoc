import { forwardRef } from "react";
import { Select } from "antd";
import { Status } from "../block/tasker/Tasker";

export interface TaskStatusSelectProps {
  onChange?: Function,
}

export default forwardRef((props: TaskStatusSelectProps, ref) => {

  // --- props

  const { onChange } = props;

  // --- handle change

  const handleChange = (value: Status[]) => {
    onChange?.call(null, value);
  };

  return <>
  <Select
    placeholder="Status"
    mode="multiple"
    allowClear={true}
    // TODO：定义为属性
    defaultValue={[Status.WIP, Status.UP]}
    onChange={handleChange}
    style={{minWidth: 80}}>
    {Status.all().map((status: Status) =>
      <Select.Option
        key={status}
        value={status}>{status}</Select.Option>
    )}
  </Select>
  </>
});
