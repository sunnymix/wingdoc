import { forwardRef, useCallback, useEffect, useState } from "react";
import { BlockProps } from "../Block";
import './EditorStyle.css';
import { useEditor } from "./EditorHook";
import { Input } from "antd";
const { TextArea } = Input;
import { LinkOutlined, CaretUpOutlined, CaretDownOutlined, PictureOutlined } from '@ant-design/icons';

export default forwardRef((props: BlockProps, ref) => {

  // --- editor:

  const { editorProps, editorText, focusEditor, editorFocused } = useEditor(props.data.text);

  // --- text:

  useEffect(() => {
    // TODO: save changes
  }, [editorText]);

  // --- sidebar:

  // TODO: events

  // --- controls:

  const [controlsOpen, setControlsOpen] = useState<boolean>(false);

  // TODO: events

  // --- focus:

  useEffect(() => {
    if (props.focus) {
      if (!focused) {
        focusEditor();
      }
    }
  }, [props.focus]);

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    setFocused(editorFocused);
  }, [editorFocused]);

  // --- move:

  const moveUp = useCallback(() => props.onMoveUp?.call(null, props.data) , [props.data.pos]);
  const moveDown = useCallback(() => props.onMoveDown?.call(null, props.data), [props.data.pos]);

  // --- ui:

  return (
  <>
  <div className={`editor ${focused ? 'focused' : ''}`}>
    <div className='editor_side'>
      <button className='editor_sidebar btn ghost' onMouseMove={() => setControlsOpen(true)} onMouseLeave={() => setControlsOpen(false)}>
        <span className='btn_border_icon'></span>
      </button>
      <div className={`editor_controls ${controlsOpen ? 'open' : ''}`} onMouseMove={() => setControlsOpen(true)} onMouseLeave={() => setControlsOpen(false)}>
        <button className='btn ghost' onClick={moveUp}><CaretUpOutlined /></button>
        <button className='btn ghost' onClick={moveDown}><CaretDownOutlined /></button>
        <button className='btn ghost'><LinkOutlined /></button>
        <button className='btn ghost'><PictureOutlined /></button>
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
