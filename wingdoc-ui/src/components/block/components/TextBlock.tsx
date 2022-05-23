import { FC, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Input, Spin } from 'antd';
import BlockApi from '../BlockApi';
import { ArrowUpOutlined, ArrowDownOutlined, LinkOutlined } from '@ant-design/icons';
import OptionButton from '@/components/common/OptionButton';
import Link from './Link';
import Task from './Task';
import { Status } from './Task';
import { history } from 'umi';
import { BlockProps } from '../Block';
import '@/components/block/BlockStyle.css';

const { TextArea } = Input;

export default forwardRef((props: BlockProps, ref) => {

  // --- props

  const {data, focus, onFocus, onSelectStart, onSelectStop, onCopy, showBlock} = props;

  const [text, setText] = useState(data.text);

  const [link, setLink] = useState(data.link);

  const [linking, setLinking] = useState<boolean>(false);

  useEffect(() => {
    if (link && link.length > 0) {
      setLinking(true);
    } else {
      setLinking(false);
    }
  }, [link]);

  // --- hover

  const [hover, setHover] = useState<boolean>(false);

  // --- change

  const saveBlockChange = (text: string) => {
    BlockApi.updateBlock(props.data.id, { text }, (newBlock: any) => {
    });
  };

  const handleChange = (e: any) => {
    const newText = e.target.value || "";
    saveBlockChange(newText);
    setText(newText);
  };

  const handleMoveUp = () => {
    props.onMoveUp?.call(null, props.data);
  };

  const handleMoveDown = () => {
    props.onMoveDown?.call(null, props.data);
  };

  const handleEnter = (e: any) => {
    e.preventDefault();
    // pos: start, middle, end
    var pos = 'end';
    if (e.target.selectionStart == 0 && text.length > 0) {
      pos = 'start';
    }
    props.onEnter?.call(null, props.data, pos);
  };

  const isRedirectToLocalDoc = () => {
    const routeStart = "/doc/";
    const index = link.indexOf(routeStart);
    if (index >= 0) {
      const docLink = link.substr(index);
      if (docLink.length > 0) {
        history.push(docLink);
        return true;
      }
    }
    return false;
  };

  const isRedirectLink = (e: any) => {
    if (linking) {
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      if (start == end && start > 0 && start < text.length) {
        if (isRedirectToLocalDoc()) {
        } else {
          window.open(link, "_blank");
        }
      }
    }
    return false;
  };

  const isFocusUp = (e: any) => {
    if (e.key == "ArrowUp") {
      // e.target.selectionStart == 0
      props.onFocusUp?.call(null, props.data);
    }
  };

  const isFocusDown = (e: any) => {
    if (e.key == "ArrowDown") {
      // e.target.selectionStart == e.target.value.length
      props.onFocusDown?.call(null, props.data);
    }
  };

  const isDelete = (e: any) => {
    if (e.key == "Backspace") {
      if (e.metaKey || e.target.value.length == 0) {
        props.onDelete?.call(null, props.data)  
      }
    }
  };

  // --- link

  const linkRef = useRef<any>(null);

  const openLink = (show: boolean) => {
    if (linkRef.current) {
      linkRef.current.open(show);
    }
  };

  const isShowLink = (e: any) => {
    if (e.key == "k" && e.metaKey) {
      openLink(true);
    }
  };

  const handleSaveLink = (link: any) => {
    openLink(false);
    BlockApi.updateBlock(data.id, { link }, (ok: any) => {
      if (ok) {
        setLink(link);
      } else {
        setLink(data.link);
      }
      focusInput();
    });
  };

  const handleCancelLink = () => {
    openLink(false);
    setLink(link);
    focusInput();
  };

  // --- focus

  const [innerFocus, setInnerFocus] = useState<boolean>(false);

  const inputRef = useRef<any>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus({
        cursor: "start",
      });
    }
  };

  useEffect(() => {
    if (focus) {
      // 当内部未聚焦时，再聚焦到输入框（避免事件循环）
      if (!innerFocus) {
        focusInput();
      }
    }
  }, [focus]);

  const handleTextFocus = (e: any) => {
    setInnerFocus(true);
    onFocus?.call(null, data);
  };

  const handleTextBlur = (e: any) => {
    setInnerFocus(false);
    handleChange(e);
  };

  // --- type

  const [type, setType] = useState<string>(data.type || "TEXT");

  // --- task

  const taskRef = useRef<any>(null);

  const [taskShow, setTaskShow] = useState<boolean>(type == "TASK")

  const [status, setStatus] = useState<any>(data.status);

  const openTask = () => {
    if (!taskShow) {
      BlockApi.updateBlock(data.id, { type: "TASK", status: Status.UN, }, (ok: any) => {
        setTaskShow(true);
        setStatus(null);
      });
    }
  };

  const isPressTask = (e: any) => {
    if (e.key == "u" && e.metaKey) {
      openTask();
    }
  };

  const handleTaskChange = (newStatus: Status) => {
    if (newStatus && newStatus != status) {
      BlockApi.updateBlock(data.id, {status: newStatus}, (ok: any) => {
        setStatus(newStatus);
      });
    }
  };

  // --- select

  const isClickSelectStop = (e: any) => {
    if (e.shiftKey) {
      onSelectStop?.call(null, data);
      return true;
    }
    return false;
  };

  const handleSelect = (e: any) => {
    // TODO
  };

  const handleSelectCapture = (e: any) => {
    // TODO
  };

  useEffect(() => {
    if (data.selectAll) {
      // TODO：修正聚焦逻辑
      focusInput();
    }
  }, [data.selectAll]);

  // --- copy

  const isPressCopy = (e: any) => {
    if (e.key == "c" && e.metaKey) {
      onCopy?.call(null, data);
      return true;
    }
    return false;
  };
  
  // --- click

  const handleClick = (e: any) => {
    if (isClickSelectStop(e)) {
    } else {
      onSelectStart?.call(null, data);
      isRedirectLink(e);
    }
  };

  // --- key down

  const handleKeyDown = (e: any) => {
    setHover(false);
    isFocusUp(e);
    isFocusDown(e);
    isDelete(e);
    isShowLink(e);
    isPressTask(e);
    isPressCopy(e);
  };

  const handleKeyUp = (e: any) => {
  };

  // --- handle option visible change

  const handleOptionVisibleChange = (visible: boolean) => {
    focusInput();
  };

  // --- handle move in/out:

  const handleMouseMove = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  // --- menu

  const menu = (
    <Menu>
      <Menu.Item key={`${data.id}-edit`} onClick={() => openLink(true)}><LinkOutlined/></Menu.Item>
      <Menu.Item key={`${data.id}-move-up`} onClick={handleMoveUp}><ArrowUpOutlined/></Menu.Item>
      <Menu.Item key={`${data.id}-move-down`} onClick={handleMoveDown}><ArrowDownOutlined/></Menu.Item>
    </Menu>
  );
  
  return <>
  <div className='block' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
    {innerFocus && <div className='block_focused'></div>}
    {data.selectAll && <div className='block_selected'></div>}
    {showBlock && <div className='block_indicator'></div>}
    {innerFocus && <div className={`block_options ${innerFocus ? 'active' : ''}`}>
      <Dropdown overlay={menu} placement="bottomLeft" onVisibleChange={handleOptionVisibleChange}>
        <OptionButton/>
      </Dropdown>
    </div>}
    <div className='block_body'>
      <Task className='block_task' ref={taskRef} id={data.id} show={taskShow} defaultStatus={status} onChange={handleTaskChange}/>
      <div className='block_content'>
        <TextArea className={`block_textarea ${linking ? 'linking' : ''}`}
          ref={inputRef}
          onFocus={handleTextFocus}
          autoSize
          value={text}
          size="middle"
          bordered={false}
          onClick={handleClick}
          onChange={handleChange}
          onBlur={handleTextBlur}
          onPressEnter={handleEnter}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onSelect={handleSelect}
          onSelectCapture={handleSelectCapture}/>
        <Link ref={linkRef} value={link} onSave={handleSaveLink} onCancel={handleCancelLink}/>
      </div>
    </div>
  </div>
  </>
});
