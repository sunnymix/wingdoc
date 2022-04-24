import { forwardRef, useImperativeHandle, useState } from "react";
import { Dropdown, Button, Menu } from "antd";
import TaskIcon from "@/components/icon/TaskIcon";

interface TaskProps {
  id: any,
  show?: boolean,
  status?: any,
  onChange?: Function,
  style?: any,
}

const Task = forwardRef((props: TaskProps, ref) => {

  // --- props ---

  const {id, show, status, onChange, style} = props;

  // --- ref ---

  useImperativeHandle(ref, () => ({
  }));

  // --- change ---

  const handleChange = (status: string) => {
    onChange?.call(null, status);
  };
  
  // --- menu ---
  
  const menu = (
    <Menu>
      <Menu.Item key={`${id}-NEW`} onClick={() => handleChange("NEW")}>NEW</Menu.Item>
      <Menu.Item key={`${id}-ON`} onClick={() => handleChange("ON")}>ON</Menu.Item>
      <Menu.Item key={`${id}-OFF`} onClick={() => handleChange("OFF")}>OFF</Menu.Item>
      <Menu.Item key={`${id}-OK`}  onClick={() => handleChange("OK")}>OK</Menu.Item>
      <Menu.Item key={`${id}-DEL`}  onClick={() => handleChange("DEL")}>DEL</Menu.Item>
    </Menu>
  );

  // --- display ---

  const displayColor = (status: any) => {
    status = status || "NEW";
    var color = "#ccc";
    if (status == "NEW") {
      color = "#faad14";
    } else if (status == "ON") {
      color = "#40a9ff";
    } else if (status == "OFF") {
      color = "#ff4d4f";
    } else if (status == "OK") {
      color = "#52c41a";
    }
    return color;
  };

  const displayName = (status: any) => {
    return status || "NEW";
  };
  
  return <>
  <div
    style={{
      display: show ? "block" : "none",
      ...style,
    }}>
    <Dropdown overlay={menu}>
      <Button
        size="small"
        type="default"
        shape="default"
        style={{
          fontSize: "75%",
          color: displayColor(status),
          width: 30,
          padding: 0,
          borderColor: displayColor(status),
          textTransform: "lowercase",
        }}>{displayName(status)}</Button>
    </Dropdown>
  </div>
  </>
});

export default Task;
