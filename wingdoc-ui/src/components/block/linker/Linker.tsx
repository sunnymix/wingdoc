import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Input, Space, Button } from "antd";
const { TextArea } = Input;
import BlockApi from "../api/BlockApi";
import "./LinkerStyle.css";

export interface LinkerProps {
  blockId: string,
  link: string | undefined,
  onSave?: Function,
  onCancel?: Function,
}

export default forwardRef((props: LinkerProps, ref) => {

  // --- ref:

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpened(true);
      focusTextarea();
    },
  }));

  // --- link:

  const [link, setLink] = useState<string>(props.link || '');
  
  // --- opened:
  
  const [opened, setOpened] = useState<boolean>(false);
  useEffect(() => { opened && focusTextarea() }, [opened]);

  // --- save:

  const handleSave = (e: any) => {
    BlockApi.updateBlock(props.blockId, { link }, () => {
      setOpened(false);
      props.onSave?.call(null, link);
    });
  };

  // --- cancel:

  const handleCancel = () => {
    setLink(props.link || '');
    setOpened(false);
    props.onCancel?.call(null);
  };

  // --- key:

  const handleKeyDown = (e: any) => {
    if (e.key == "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  // --- textarea:

  const textareaRef = useRef<any>(null);
  const focusTextarea = () => {
    textareaRef.current.focus({ cursor: "start" });
  };

  // --- ui:

  return (
  <>
  <div className={`linker ${opened && 'opened'}`}>
    <TextArea
      ref={textareaRef}
      value={link} 
      autoSize
      bordered={false}
      onChange={(e) => setLink(e.target.value)}
      onBlur={() => handleCancel()}
      onPressEnter={handleSave}
      onKeyDown={handleKeyDown}></TextArea>
    <div>
      <Button type='link' size='small' onClick={handleSave}>Save</Button>
      <Button type='link' size='small' onClick={() => handleCancel()}>Cancel</Button>
    </div>
  </div>
  </>
  );
});
