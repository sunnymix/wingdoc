import { forwardRef, useImperativeHandle, useState } from "react";
import "@/components/common/CommonStyle.css";
import "./TaskerStyle.css";
import BlockApi from "../BlockApi";

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
}

export default forwardRef((props: TaskerProps, ref) => {

  // --- ref:

  useImperativeHandle(ref, () => ({
    open: (tasked: boolean, cb?: Function) => open(tasked, cb),
  }));

  // --- open:

  const open = (tasked: boolean, cb?: Function) => {
    const form = tasked ? { type: 'TASK', status: Status.UN } : { type: 'TEXT', status: '' };

    BlockApi.updateBlock(props.blockId, form, (ok: any) => {
      if (ok) {
        cb?.call(null, tasked);
      }
    });
  };

  // --- menu opened:

  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  // --- status:

  const [status, setStatus] = useState<Status>(props.initialStatus || Status.UN);

  // --- click:

  const handleClick = (status: Status) => {
    setMenuOpened(false);
    BlockApi.updateBlock(props.blockId, { status }, (ok: any) => {
      if (ok) {
        setStatus(status); 
      }
    });
  };

  // --- ui:

  return (
  <>
  <div className='tasker'>
    <button className='tasker_control btn ghost square tasker_btn' onMouseMove={() => setMenuOpened(true)} onMouseLeave={() => setMenuOpened(false)}>
      <span className={`btn_tasker_icon ${status.toLocaleLowerCase()}`}>{status}</span>
    </button>
    <div className={`tasker_menu ${menuOpened && 'opened'}`}  onMouseMove={() => setMenuOpened(true)} onMouseLeave={() => setMenuOpened(false)}>
      {Status.all().map((status: Status) =>
        <button className='btn ghost square tasker_btn' key={status} onClick={() => handleClick(status)}>
          <span className={`btn_tasker_icon ${status.toLocaleLowerCase()}`}>{status}</span>
        </button>)}
    </div>
  </div>
  </>
  );
});
