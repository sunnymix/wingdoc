import { forwardRef, useState } from "react";
import "@/components/common/CommonStyle.css";
import "./TaskerStyle.css";
import initialState from "@/.umi/plugin-initial-state/models/initialState";

export interface TaskerProps {
  blockId: string,
  initialStatus?: Status,
};

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

export default forwardRef((props: TaskerProps, ref) => {

  // --- status:

  const [status, setStatus] = useState<Status>(props.initialStatus || Status.UN);

  // --- ui:

  return (
  <>
  <div className='tasker'>
    <button className='tasker_control btn ghost square'>
      <span className='btn_text_icon'>{status}</span>
    </button>
    <div className={`tasker_menu opened`}>
      {Status.all().map((status: Status) =>
        <button className='btn ghost square' key={status}>
          <span className='btn_text_icon'>{status}</span>
        </button>)}
    </div>
  </div>
  </>
  );
});
