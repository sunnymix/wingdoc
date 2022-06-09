import { forwardRef, useEffect, useState } from "react";
import { BlockProps } from "../Block";
import './EditorStyle.css';
import { useEditor } from "./EditorHook";
import { Input } from "antd";
const { TextArea } = Input;
import { ArrowUpOutlined, ArrowDownOutlined, LinkOutlined } from '@ant-design/icons';

export default forwardRef((props: BlockProps, ref) => {

  const { editorProps, editorText, clearEditor } = useEditor(props.data.text);

  // --- editorText:

  useEffect(() => {
  }, [editorText]);

  // --- sidebar:

  const [controlsOpen, setControlsOpen] = useState<boolean>(false);

  return (
  <>
  <div className='editor'>
    <div className='editor_side'>
      <button className='editor_sidebar btn' onMouseMove={() => setControlsOpen(true)} onMouseLeave={() => setControlsOpen(false)}>
        <span className='btn_border_icon'></span>
      </button>
      <div className={`editor_controls ${controlsOpen ? 'open' : ''}`} onMouseMove={() => setControlsOpen(true)} onMouseLeave={() => setControlsOpen(false)}>
        <button className='btn'><LinkOutlined /></button>
        <button className='btn'><ArrowUpOutlined /></button>
        <button className='btn'><ArrowDownOutlined /></button>
      </div>
    </div>
    <div className='editor_body'>
      <div className='editor_content' {...editorProps} />
    </div>
  </div>
  <div>
    {/* <TextArea value={editorText} autoSize></TextArea> */}
  </div>
  </>
  );
});
