import { forwardRef, useImperativeHandle, useState } from "react";
import "@/components/common/CommonStyle.css";
import "./TaskerStyle.css";
import BlockApi from "../api/BlockApi";

export interface TaskerProps {
  blockId: string,
  initialStatus?: Status,
};

export enum Status { 
  NEW = "NEW",
  WIP = "WIP",
  OK = "OK",
  UP = "UP",
  DEL = "DEL"
};

export namespace Status {
  export function all() {
    return [
      Status.NEW,
      Status.WIP,
      Status.OK,
      Status.UP,
      Status.DEL,
    ];
  }
}

export default forwardRef((props: TaskerProps, ref) => {

  // --- ref:

  useImperativeHandle(ref, () => ({
    open: (tasked: boolean, cb?: Function) => open(tasked, cb),
  }));

  // --- open:

  const open = (tasked: boolean, cb?: Function) => {
    const form = tasked ? { type: 'TASK', status: Status.NEW } : { type: 'TEXT', status: '' };

    BlockApi.updateBlock(props.blockId, form, (ok: any) => {
      if (ok) {
        cb?.call(null, tasked);
      }
    });
  };

  // --- menu opened:

  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  // --- status:

  const [status, setStatus] = useState<Status>(props.initialStatus || Status.NEW);

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
    <button className={`tasker_control btn ghost tasker_btn ${status.toLocaleLowerCase()}`} onMouseMove={() => setMenuOpened(true)} onMouseLeave={() => setMenuOpened(false)}>
      <span className='tasker_btn_body'>
        <span className='tasker_btn_text'>{status}</span>
      </span>
    </button>
    <div className={`tasker_menu ${menuOpened && 'opened'}`}  onMouseMove={() => setMenuOpened(true)} onMouseLeave={() => setMenuOpened(false)}>
      {Status.all().map((status: Status) =>
        <button className={`btn ghost tasker_btn  ${status.toLocaleLowerCase()}`} key={status} onClick={() => handleClick(status)}>
          <span className='tasker_btn_body'>
            <span className='tasker_btn_text'>{status}</span>
          </span>
        </button>)}
    </div>
  </div>
  </>
  );
});
