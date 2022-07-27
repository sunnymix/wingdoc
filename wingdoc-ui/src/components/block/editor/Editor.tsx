import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { BlockData, BlockProps } from "../block/Block";
import './EditorStyle.css';
import useEditor from "./EditorHook";
import { LinkOutlined, CaretUpOutlined, CaretDownOutlined, PictureOutlined, CheckCircleOutlined } from '@ant-design/icons';
import BlockApi from "../api/BlockApi";
import Linker from "../linker/Linker";
import { history } from "umi";
import Tasker from "../tasker/Tasker";
import "@/components/common/CommonStyle.css";
import { BlockType } from "../block/Block";
import Imager, { ImagerPasteData } from "../imager/Imager";

export default forwardRef((props: BlockProps, ref) => {

  // --- log:

  const log = (msg: string, ...restArgs: any[]) => {
    console.log(`editor[${props.data.pos}]: ${msg}`, restArgs);
  };

  // --- editor:

  const [initialText, setInitialText] = useState<string>(props.data.text);

  const { editorProps, editorText, focusEditor, editorFocused } = useEditor({
    data: props.data,
    initialText: initialText,
    onFocus: (e: any) => {
      handleEditorFocus(e);
    },
    onBlur: (e: any) => {
      setFocused(false);
    },
    onPasteImg: (e: any, file: any) => {
      pasteImg(e, file);
    },
    onTextChange: (data: any) => {
      props.onTextChange?.call(null, data);
    },
  });

  // --- block type:

  const [blockType, setBlockType] = useState<BlockType>(props.data.type || BlockType.TEXT);
  const changeBlockType = (type: BlockType) => {
    BlockApi.updateBlock(props.data.id, { type }, () => {
      setBlockType(type);
    });
  };

  // --- text:

  const lineHeight: number = 24;

  const saveText = (text: string) => {
    BlockApi.updateBlock(props.data.id, { text });
    return true;
  };

  useEffect(() => {
  }, [editorText]);

  // --- control:

  const hoverControl = useCallback(() => setMenuOpened(true), []);
  const unhoverControl = useCallback(() => setMenuOpened(false), []);

  // --- menu:

  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const hoverMenu = useCallback(() => setMenuOpened(true), []);
  const unhoverMenu = useCallback(() => setMenuOpened(false), []);

  // --- hover:

  const [hovered, setHovered] = useState<boolean>(false);

  // --- select:

  const [selected, setSelected] = useState<boolean>(false);

  const onMouseDown = (e: any) => {
    props.onMouseDown?.call(null, e, BlockData.of(props.data.id, props.data.pos, editorText));
  };

  const onMouseUp = (e: any) => {
    props.onMouseUp?.call(null, e, BlockData.of(props.data.id, props.data.pos, editorText));
  };

  const onMouseEnter = (e: any) => {
    setHovered(true);
    props.onMouseEnter?.call(null, e, BlockData.of(props.data.id, props.data.pos, editorText));
  };

  const onMouseMove = (e: any) => {
  };

  const onMouseLeave = (e: any) => {
    setHovered(false);
  };
  
  useEffect(() => {
    if (props.selectingMulti.multi) {
      let selected = false;
      if (props.data.pos >= props.selectingMulti.start 
        && props.data.pos <= props.selectingMulti.end) {
        // log('selected me!', `range: ${min}, ${max}`);
        selected = true;
      }
      setSelected(selected);
    }
    
  }, [props.selectingMulti]);

  // --- focus:

  const handleEditorFocus = (e: any) => {
    props.onFocus?.call(null, props.data);
  };

  useEffect(() => {
    if (props.focusingPos.pos == props.data.pos) {
      // console.log(`editor[${props.data.pos}]: focusing on me! ${props.focusing.pos}/${props.focusing.ts}"`);
      if (!focused) {
        focusEditor(props.focusingPos.row);
      }
    }
    setSelected(false);
  }, [props.focusingPos])

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    setFocused(editorFocused);
  }, [editorFocused]);

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

  // --- imaged:

  const isImaged = useCallback((img: any) => img && img.length > 0, []);
  const [imaged, setImaged] = useState<boolean>(isImaged(props.data.img));
  const handleImagerChange = useCallback((img: any) => {
    setImaged((isImaged(img)));
  }, [])

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
    const contentRect = e.target.getClientRects()[0];
    const contentStyle = window.getComputedStyle(e.target, null);
    const borderVertical = +(contentStyle.getPropertyValue('border-top-width').replace('px', '')) + 
      +(contentStyle.getPropertyValue('border-bottom-width').replace('px', ''));
    const contentHeight = contentRect.height - borderVertical;
    
    const rowCount = Math.floor(contentHeight / lineHeight);

    let x = 0, y = 0, row = 0, firstRow = false, lastRow = false, middleRow = false;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];
        if (rect && contentRect) {
          x = rect.left - contentRect.left;
          y = rect.top - contentRect.top;
          row = Math.floor(y / lineHeight);
          firstRow = row == 0;
          lastRow = row == rowCount - 1;
          middleRow = row > 0 && row < rowCount - 1;
        }
      }
    }

    if (row == 0 && rowCount == 1) {
      firstRow = lastRow = true;
    }

    const res = { x, y, row, rowCount, firstRow, lastRow, middleRow };
    return res;
  }

  // --- redirect:

  const handleLinkerClick = (e: any) => {
    e.preventDefault();
    if (linked) {
      const index = link.indexOf('/doc/');
      if (index >= 0) {
        const docLink = link.substr(index);
        if (docLink.length > 0) {
          history.push(docLink);
        }
      } else {
        window.open(link, "_blank");
        focusEditor();
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
    const code = e.code;
    const isCmd = e.metaKey;
    const isShift = e.shiftKey;
    const isOpt = e.altKey;
    const isCtr = e.ctrlKey;

    if (code == 'Enter') {
      if (isCmd) {
        e.preventDefault();
        props.onEnter?.call(null, props.data, 'end');
      } else if (isShift) {
        e.preventDefault();
        props.onEnter?.call(null, props.data, 'start');
      }
    } else if (code == 'KeyK') {
      if (isCmd) {
        openLinker();
      }
    } else if (code == 'KeyT') {
      if (isCmd && isOpt) {
        openTasker();
      }
    } else if (code == 'ArrowUp') {
      if (getCaretCoordinates(e).firstRow) {
        props.onFocusUp?.call(null, props.data);
      }
    } else if (code == 'ArrowDown') {
      if (getCaretCoordinates(e).lastRow) {
        setHovered(false);
        props.onFocusDown?.call(null, props.data);
      }
    } else if (code == 'Backspace') {
      if (isCmd || editorText.length == 0) {
        setHovered(false);
        props.onDelete?.call(null, props.data);
      }
    } else if (code == 'KeyP') {
      if (isCmd && isOpt) {
        e.preventDefault();
        changeBlockType(BlockType.TEXT);
      }
    } else if (code == 'KeyC') {
      if (isCmd && isOpt) {
        e.preventDefault();
        changeBlockType(BlockType.CODE);
      }
    } else if (code == 'Digit1') {
      if (isCmd && isOpt) {
        e.preventDefault();
        changeBlockType(BlockType.H1);
      }
    } else if (code == 'Digit2') {
      if (isCmd && isOpt) {
        e.preventDefault();
        changeBlockType(BlockType.H2);
      }
    } else if (code == 'Digit3') {
      if (isCmd && isOpt) {
        e.preventDefault();
        changeBlockType(BlockType.H3);
      }
    } else if (code == 'Digit4') {
      if (isCmd && isOpt) {
        e.preventDefault();
        changeBlockType(BlockType.H4);
      }
    }
  };

  const handleEditorKeyUp = (e: any) => {
    // saveText();
  };

  const handleSpaceClick = (e: any) => {
    focusEditor('last');
  };

  // --- TODO: editor className

  // --- imager:

  const imagerRef = useRef<any>(null);

  const [imagerPasteData, setImagerPasteData] = useState<ImagerPasteData>(ImagerPasteData.of(null));

  const pasteImg = (e: any, file: any) => {
    setImagerPasteData(ImagerPasteData.of(file));
  };

  const handleImagerClick = (e: any) => {
    focusEditor();
  };

  // --- ui:

  return (
  <>
  <div
    className={`editor ${blockType.toLocaleLowerCase()} ${hovered && 'hovered'} ${focused && 'focused'} ${linked && 'linked'} ${selected && 'selected'} ${imaged && 'imaged'}`}
    onMouseEnter={onMouseEnter} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
    onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
    <div className='editor_box'>
      <div className='editor_side'>
        <div className={`editor_menu ${menuOpened && 'opened'}`}>
          <button className='editor_menu_btn btn ghost square' onMouseEnter={hoverControl} onMouseLeave={unhoverControl}>
            <span className='editor_menu_icon'>{BlockType.short(blockType)}</span>
          </button>
          <div className={`editor_menu_box`} onMouseEnter={hoverMenu} onMouseLeave={unhoverMenu}>
            <button className='btn ghost square' onClick={moveUp}><CaretUpOutlined /></button>
            <button className='btn ghost square' onClick={moveDown}><CaretDownOutlined /></button>
            {BlockType.all().map((type: BlockType, index: number) => 
              <button className={`block_type_btn btn ghost square ${(type == blockType) && 'active'}`} key={type} onClick={(e) => changeBlockType(type)}>
                <span className='btn_text_icon'>{BlockType.short(type)}</span>
              </button>)}
            <button className='btn ghost square' onClick={openTasker}><CheckCircleOutlined /></button>
            <button className='btn ghost square' onClick={openLinker}><LinkOutlined /></button>
            <button className='btn ghost square'><PictureOutlined /></button>
          </div>
        </div>
        <div className={`editor_tasker ${tasked && 'opened'}`}>
          <Tasker ref={taskerRef} blockId={props.data.id} initialStatus={props.data.status} />
        </div>
      </div>
      <div className='editor_body'>
        <div className='editor_space_before' onClick={handleSpaceClick}></div>
        <div
          className='editor_content'
          {...editorProps}
          onKeyDown={handleEditorKeyDown} />
        <div className="editor_imager" onClick={handleImagerClick}>
          <Imager ref={imagerRef} blockId={props.data.id} initialImg={props.data.img} pasteData={imagerPasteData} onChange={handleImagerChange} />
        </div>
        <div className='editor_link'>
          {linked && <a className='editor_link_anchor' href={link} onClick={handleLinkerClick}>{link}</a>}
          <Linker ref={linkerRef} blockId={props.data.id} link={link} onSave={handleLinkerSave} onCancel={handleLinkerCancel} />
        </div>
        <div className='editor_space_after' onClick={handleSpaceClick}></div>
      </div>
    </div>
  </div>
  </>
  );
});
