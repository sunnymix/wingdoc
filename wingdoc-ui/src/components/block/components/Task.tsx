import { forwardRef, useImperativeHandle, useState } from "react";
import { Dropdown, Button, Menu } from "antd";
import BlockApi from "../BlockApi";

export interface TaskProps {
  id: any,
  show?: boolean,
  defaultStatus?: Status,
  onChange?: Function,
  style?: any,
  className?: string,
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

  const { id, show, defaultStatus, onChange, style, className } = props;

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
    className={className}
    style={{
      display: show ? "block" : "none",
      ...style,
    }}>
    <Dropdown overlay={menu}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "center",
          width: 24,
          height: 24,
          padding: 0,
          color: displayColor(status),
          fontSize: "80%",
          fontWeight: 500,
        }}>{displayName(status)}</div>
    </Dropdown>
  </div>
  </>
});
