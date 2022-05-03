import { forwardRef, useImperativeHandle, useState } from "react";
import { Dropdown, Button, Menu } from "antd";
import BlockApi from "../BlockApi";

export interface TaskProps {
  id: any,
  show?: boolean,
  defaultStatus?: Status,
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

// --- component

export default forwardRef((props: TaskProps, ref) => {

  // --- props

  const { id, show, defaultStatus, onChange, style } = props;

  // --- status

  const [ status, setStatus ] = useState<Status>(defaultStatus || Status.UN);

  // --- ref handle

  useImperativeHandle(ref, () => ({
  }));

  // --- change

  const handleChange = (status: Status) => {
    BlockApi.updateBlock(id, { status }, (ok: any) => {
      setStatus(status);
    });
  };
  
  // --- menu
  
  const menu = (
    <Menu>
      {Status.all().map((status: Status) => 
        <Menu.Item key={`${id}-${status}`} onClick={() => handleChange(status)}>{status}</Menu.Item>
      )}
    </Menu>
  );

  // --- display

  const displayColor = (status: Status) => {
    return Status.color(status);
  };

  const displayName = (str: any) => {
    return Status.of(str).toString().toUpperCase();
  };

  // --- ui
  
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
          width: 24,
          padding: 0,
          borderWidth: 1,
          borderColor: displayColor(status),
        }}>{displayName(status)}</Button>
    </Dropdown>
  </div>
  </>
});
