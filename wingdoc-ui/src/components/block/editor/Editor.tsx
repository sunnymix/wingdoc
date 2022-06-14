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

  // --- rootRef:

  // --- editor:

  const { editorProps, editorText, focusEditor, editorFocused } = useEditor({
    initialText: props.data.text,
  });

  // --- text:

  const saveText = () => {
    BlockApi.updateBlock(props.data.id, { text: editorText });
    return true;
  };

  useEffect(() => {
    (editorText !== props.data.text) && saveText();
  }, [editorText]);

  // --- control:

  const hoverControl = useCallback(() => setMenuOpened(true), []);
  const unhoverControl = useCallback(() => setMenuOpened(false), []);

  // --- menu:

  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const hoverMenu = useCallback(() => setMenuOpened(true), []);
  const unhoverMenu = useCallback(() => setMenuOpened(false), []);

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

  // --- caret:

  const getCaretPos = (e: any) => {
    const selection = window.getSelection();

    var start = selection?.anchorOffset;
    start = typeof(start) == 'undefined' ? -1 : start;

    var end = selection?.focusOffset;
    end = typeof(end) == 'undefined' ? -1 : end;
    return { start, end };
  };

  // --- !!! coordinates:

  const getCaretCoordinates = (e: any) => {
    // firstRow, lastRow 默认值为 true，表示只有一行
    let x = 0, y = 0, row = 0, rowCount = 0, firstRow = true, lastRow = true, middleRow = false;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];
        const containerRect = e.target.getClientRects()[0];
        if (rect && containerRect) {
          x = rect.left - containerRect.left;
          y = rect.top - containerRect.top;
          row = Math.floor(y / 26);
          rowCount = Math.ceil(containerRect.height / 26);
          firstRow = row == 0;
          lastRow = row == rowCount - 1;
          middleRow = row > 0 && row < rowCount - 1;
        }
      }
    }
    const res = { x, y, row, rowCount, firstRow, lastRow, middleRow };
    return res;
  }

  // --- redirect:

  const handleEditorClick = (e: any) => {
    if (linked) {
      const { start, end } = getCaretPos(e);
      
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

  const [tasked, setTasked] = useState<boolean>(props.data.type == 'TASK');
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
    } else if (key == 'arrowup') {
      if (getCaretCoordinates(e).firstRow) {
        console.log('onFocusUp');
        props.onFocusUp?.call(null, props.data);
      }
    } else if (key == 'arrowdown') {
      if (getCaretCoordinates(e).lastRow) {
        console.log('onFocusDown');
        props.onFocusDown?.call(null, props.data);
      }
    }
  };

  // --- ui:

  return (
  <>
  <div className={`editor ${focused && 'focused'} ${linked && 'linked'}`}>
    <div className='editor_side'>
      <button className='editor_control btn ghost square' onMouseEnter={hoverControl} onMouseLeave={unhoverControl}>
        <span className='btn_border_icon'></span>
      </button>
      <div className={`editor_menu ${menuOpened && 'opened'}`} onMouseEnter={hoverMenu} onMouseLeave={unhoverMenu}>
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
