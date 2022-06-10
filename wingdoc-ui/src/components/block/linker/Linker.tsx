import { forwardRef, useImperativeHandle, useState } from "react";
import { Input, Space, Button } from "antd";
const { TextArea } = Input;
import BlockApi from "../BlockApi";

export interface LinkerProps {
  blockId: string,
  link: string | undefined,
  onSave?: Function,
  onCancel?: Function,
}

export default forwardRef((props: LinkerProps, ref) => {

  // --- ref:

  useImperativeHandle(ref, () => ({
    open: open,
  }));

  // --- link:

  const [link, setLink] = useState<string>(props.link || '');
  
  // --- opened:
  
  const [opened, setOpened] = useState<boolean>(false);

  // --- save:

  const handleSave = () => {
    BlockApi.updateBlock(props.blockId, { link }, () => {
      props.onSave?.call(null, link);
    });
  };

  // --- cancel:

  const handleCancel = () => {
    setLink(props.link || '');
    props.onCancel?.call(null);
  };

  // --- ui:

  return (
  <>
  <div className={`linker ${opened && 'opened'}`}>
    <TextArea value={link} autoSize bordered={false} onChange={(e) => setLink(e.target.value)}></TextArea>
    <div>
      <Button type='link' size='small' onClick={handleSave}>Save</Button>
      <Button type='link' size='small' onClick={handleCancel}>Cancel</Button>
    </div>
  </div>
  </>
  );
});
