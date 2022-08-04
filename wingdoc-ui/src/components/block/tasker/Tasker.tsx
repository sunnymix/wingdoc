import { forwardRef, useImperativeHandle, useState } from "react";
import "@/components/common/CommonStyle.css";
import "./TaskerStyle.css";
import BlockApi from "../api/BlockApi";
import { BlockType } from "../block/Block";

export interface TaskerProps {
  blockId: string,
  initialStatus?: Status,
  onChange?: Function,
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
    open: (tasked: boolean, cb?: Function) => open(tasked),
  }));

  // --- open:

  const open = (tasked: boolean, status?: Status) => {
    const newType = tasked ? BlockType.TASK : BlockType.TEXT;
    const newStatus = tasked ? (status || Status.NEW) : '';
    
    const form = { 
      type: newType,
      status: newStatus,
    };

    BlockApi.updateBlock(props.blockId, form, (ok: any) => {
      if (ok) {
        setStatus(newStatus);
        props.onChange?.call(null, form);
      }
    });
  };

  // --- menu opened:

  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  // --- status:

  const [status, setStatus] = useState<Status | ''>(props.initialStatus || Status.NEW);

  // --- click:

  const handleClick = (status: Status) => {
    setMenuOpened(false);
    open(true, status);
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
