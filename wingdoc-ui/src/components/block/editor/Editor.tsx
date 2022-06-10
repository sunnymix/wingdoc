import { forwardRef, useCallback, useEffect, useState } from "react";
import { BlockProps } from "../Block";
import './EditorStyle.css';
import { useEditor } from "./EditorHook";
import { Input } from "antd";
const { TextArea } = Input;
import { LinkOutlined, CaretUpOutlined, CaretDownOutlined, PictureOutlined } from '@ant-design/icons';
import BlockApi from "../BlockApi";

export default forwardRef((props: BlockProps, ref) => {

  // --- key:

  const onEnter = (pos: string) => {
    props.onEnter?.call(null, props.data, pos);
  };

  // --- editor:

  const { editorProps, editorText, focusEditor, editorFocused } = useEditor({
    initialText: props.data.text,
    onEnter,
  });

  // --- text:

  useEffect(() => {
    (editorText !== props.data.text) && BlockApi.updateBlock(props.data.id, { text: editorText });
  }, [editorText]);

  // --- sidebar:

  const hoverSidebar = useCallback(() => setControlsOpen(true), []);
  const unhoverSidebar = useCallback(() => setControlsOpen(false), []);

  // --- controls:

  const [controlsOpen, setControlsOpen] = useState<boolean>(false);
  const hoverControls = useCallback(() => setControlsOpen(true), []);
  const unhoverControls = useCallback(() => setControlsOpen(false), []);

  // --- focus:

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    (props.focus && !focused) && focusEditor();
  }, [props.focus]);

  useEffect(() => setFocused(editorFocused), [editorFocused]);

  // --- move:

  const moveUp = useCallback(() => props.onMoveUp?.call(null, props.data) , [props.data.pos]);
  const moveDown = useCallback(() => props.onMoveDown?.call(null, props.data), [props.data.pos]);

  // --- ui:

  return (
  <>
  <div className={`editor ${focused ? 'focused' : ''}`}>
    <div className='editor_side'>
      <button className='editor_sidebar btn ghost' onMouseEnter={hoverSidebar} onMouseLeave={unhoverSidebar}>
        <span className='btn_border_icon'></span>
      </button>
      <div className={`editor_controls ${controlsOpen ? 'open' : ''}`} onMouseEnter={hoverControls} onMouseLeave={unhoverControls}>
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
