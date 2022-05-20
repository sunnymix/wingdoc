import { FC, forwardRef, useEffect, useRef, useState } from 'react';
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

  // --- menu

  const menu = (
    <Menu>
      <Menu.Item key={`${data.id}-edit`} onClick={() => openLink(true)}><LinkOutlined/></Menu.Item>
      <Menu.Item key={`${data.id}-move-up`} onClick={handleMoveUp}><ArrowUpOutlined/></Menu.Item>
      <Menu.Item key={`${data.id}-move-down`} onClick={handleMoveDown}><ArrowDownOutlined/></Menu.Item>
    </Menu>
  );
  
  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      position: "relative",
      display: "flex",
      alignItems: "flex-start",
    }}>
    <div
      style={{
        zIndex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: innerFocus ? "rgba(0, 0, 0, 0)": "transparent",
      }}></div>
    <div
      style={{
        zIndex: 2,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: data.selectAll ? "rgba(24, 144, 255, 0.1)": "transparent",
      }}></div>
    <div
      style={{
        zIndex: 3,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: -1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: showBlock ? "#f2f2f2": "transparent",
      }}></div>
    <div
      style={{
        zIndex: 4,
        visibility: innerFocus ? "visible" : "hidden",
        marginTop: 4,
        marginLeft: 4,
      }}>
      <Dropdown overlay={menu} placement="bottomLeft" onVisibleChange={handleOptionVisibleChange}>
        <OptionButton/>
      </Dropdown>
    </div>
    <div
      style={{
        zIndex: 4,
        flexGrow: 1,
        display: "flex",
      }}>
      <Task 
        ref={taskRef}
        id={data.id}
        show={taskShow}
        defaultStatus={status}
        onChange={handleTaskChange}
        style={{
          marginTop: 4,
          marginLeft: 10,
        }}/>
      <div
        style={{
          flexGrow: 1,
        }}>
        <TextArea 
          ref={inputRef}
          placeholder="" 
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
          onSelectCapture={handleSelectCapture}
          style={{
            color: linking ? "#1890ff" : "inherit",
            flexGrow: "1",
            fontFamily: '"Helvetica Neue", Helvetica, Arial',
          }}/>
        <Link
          ref={linkRef}
          value={link}
          onSave={handleSaveLink}
          onCancel={handleCancelLink}/>
      </div>
    </div>
  </div>
  </>
});
