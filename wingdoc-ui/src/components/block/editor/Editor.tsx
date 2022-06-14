import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { BlockProps } from "../Block";
import './EditorStyle.css';
import useEditor from "./EditorHook";
import { LinkOutlined, CaretUpOutlined, CaretDownOutlined, PictureOutlined, CheckCircleOutlined } from '@ant-design/icons';
import BlockApi from "../BlockApi";
import Linker from "../linker/Linker";
import { history } from "umi";
import Tasker from "../tasker/Tasker";
import "@/components/common/CommonStyle.css";

export default forwardRef((props: BlockProps, ref) => {

  // --- editor:

  const { editorProps, editorText, focusEditor, editorFocused } = useEditor({
    initialText: props.data.text,
  });

  // --- text:

  useEffect(() => {
    (editorText !== props.data.text) && BlockApi.updateBlock(props.data.id, { text: editorText });
  }, [editorText]);

  // --- sidebar:

  const hoverSidebar = useCallback(() => setControlsOpened(true), []);
  const unhoverSidebar = useCallback(() => setControlsOpened(false), []);

  // --- controls:

  const [controlsOpened, setControlsOpened] = useState<boolean>(false);
  const hoverControls = useCallback(() => setControlsOpened(true), []);
  const unhoverControls = useCallback(() => setControlsOpened(false), []);

  // --- focus:

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    (props.focus && !focused) && focusEditor();
  }, [props.focus]);

  useEffect(() => setFocused(editorFocused), [editorFocused]);

  // --- move:

  const moveUp = useCallback(() => props.onMoveUp?.call(null, props.data) , [props.data.pos]);
  const moveDown = useCallback(() => props.onMoveDown?.call(null, props.data), [props.data.pos]);

  // --- linker:

  const [link, setLink] = useState<string>(props.data.link || '');
  const [linked, setLinked] = useState<boolean>(props.data.link && props.data.link.length > 0);
  useEffect(() => {
    setLinked(link.length > 0);
  }, [link]);
  const handleLinkerCancel = () => focusEditor();
  const handleLinkerSave = (link: string) => {
    setLink(link);
    focusEditor();
  };
  const linkerRef = useRef<any>(null);
  const openLinker = () => {
    linkerRef.current.open();
  };

  // --- redirect:

  const handleEditorClick = (e: any) => {
    if (linked) {
      const selection = window.getSelection();
      
      const start = selection?.anchorOffset || -1;
      const end = selection?.focusOffset || -1;
      
      if (start == end && start > 0 && start < editorText.length) {
        const index = link.indexOf('/doc/');
        if (index >= 0) {
          const docLink = link.substr(index);
          if (docLink.length > 0) {
            history.push(docLink);
          }
        } else {
          window.open(link, "_blank");
        }
      }
    }
  };

  // --- tasker:

  const [tasked, setTasked] = useState<boolean>(props.data.type == 'TASKX');
  const taskerRef = useRef<any>(null);
  const openTasker = () => {
    // TODO: use event handler
    taskerRef.current.open(!tasked, (newTasked: boolean) => {
      setTasked(newTasked);
    });
  };

  // --- keydown:

  const handleEditorKeyDown = (e: any) => {
    const key = e.key.toLocaleLowerCase();
    const isCmd = e.metaKey;
    const isShift = e.shiftKey;

    if (key == 'enter') {
      if (isCmd) {
        e.preventDefault();
        props.onEnter?.call(null, props.data, 'end');
      } else if (isShift) {
        e.preventDefault();
        props.onEnter?.call(null, props.data, 'start');
      }
    } else if (key == 'k') {
      if (isCmd) {
        openLinker();
      }
    } else if (key == 'u') {
      if (isCmd) {
        openTasker();
      }
    }
  };

  // --- ui:

  return (
  <>
  <div className={`editor ${focused && 'focused'} ${linked && 'linked'}`}>
    <div className='editor_side'>
      <button className='editor_sidebar btn ghost square' onMouseEnter={hoverSidebar} onMouseLeave={unhoverSidebar}>
        <span className='btn_border_icon'></span>
      </button>
      <div className={`editor_controls ${controlsOpened && 'opened'}`} onMouseEnter={hoverControls} onMouseLeave={unhoverControls}>
        <button className='btn ghost square' onClick={moveUp}><CaretUpOutlined /></button>
        <button className='btn ghost square' onClick={moveDown}><CaretDownOutlined /></button>
        <button className='btn ghost square' onClick={openTasker}><CheckCircleOutlined /></button>
        <button className='btn ghost square' onClick={openLinker}><LinkOutlined /></button>
        <button className='btn ghost square'><PictureOutlined /></button>
      </div>
    </div>
    <div className={`editor_tasker ${tasked && 'opened'}`}>
      <Tasker ref={taskerRef} blockId={props.data.id} initialStatus={props.data.status} />
    </div>
    <div className='editor_body'>
      <div className='editor_content' {...editorProps} onClick={handleEditorClick} onKeyDown={handleEditorKeyDown} />
      <div className='editor_link'>
        <Linker ref={linkerRef} blockId={props.data.id} link={link} onSave={handleLinkerSave} onCancel={handleLinkerCancel}/>
      </div>
    </div>
  </div>
  </>
  );
});
