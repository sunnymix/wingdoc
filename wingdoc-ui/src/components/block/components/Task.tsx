import { forwardRef, useImperativeHandle, useState } from "react";
import { Dropdown, Button, Menu } from "antd";
import TaskIcon from "@/components/icon/TaskIcon";

export interface TaskProps {
  id: any,
  show?: boolean,
  status?: any,
  onChange?: Function,
  style?: any,
}

export enum Status { 
  UN = "UN", 
  ON = "ON", 
  UP = "UP", 
  OK = "OK", 
  NO = "NO" 
};

export namespace Status {
  export function all() {
    return [
      Status.UN,
      Status.ON,
      Status.OK,
      Status.UP,
      Status.NO,
    ];
  }

  export function of(str: string) {
    switch (str) {
      case "ON":
        return Status.ON;
      case "OK":
        return Status.OK;
      case "UP":
        return Status.UP;
      case "NO":
        return Status.NO;
      default: 
        return Status.UN;
    }
  }

  export function color(status: Status) {
    switch (status) {
      case Status.ON:
        return "#40a9ff";
      case Status.OK:
        return "#52c41a";
      case Status.UP:
        return "#ff4d4f";
      case Status.NO:
        return "#ccc";
      default: 
        return "#faad14";
    }
  }
}

const Task = forwardRef((props: TaskProps, ref) => {

  // --- props ---

  const {id, show, status, onChange, style} = props;

  // --- ref ---

  useImperativeHandle(ref, () => ({
  }));

  // --- change ---

  const handleChange = (status: Status) => {
    onChange?.call(null, status);
  };
  
  // --- menu ---
  
  const menu = (
    <Menu>
      {Status.all().map((status: Status) => 
        <Menu.Item key={`${id}-${status}`} onClick={() => handleChange(status)}>{status}</Menu.Item>  
      )}
    </Menu>
  );

  // --- display ---

  const displayColor = (status: Status) => {
    return Status.color(status);
  };

  const displayName = (str: any) => {
    return Status.of(str);
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
        }}>{displayName(status)}</Button>
    </Dropdown>
  </div>
  </>
});

export default Task;
