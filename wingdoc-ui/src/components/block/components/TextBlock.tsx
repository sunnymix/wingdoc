import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Input, Spin } from 'antd';
import BlockApi from '../BlockApi';
import { ArrowUpOutlined, ArrowDownOutlined, LoadingOutlined, LinkOutlined } from '@ant-design/icons';
import { BlockProps } from '@/components/block/BlockInterfaces';
import OptionButton from '@/components/common/OptionButton';
import Link from './Link';
import Task from './Task';

const { TextArea } = Input;

const spinIcon = <LoadingOutlined spin />;

const TextBlock = forwardRef((props: BlockProps, ref) => {

  const {data, onSelectStart, onSelectStop, onCopy} = props;

  const [loading, setLoading] = useState<boolean>(false);

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

  const [hover, setHover] = useState<boolean>(false);

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
    props.onEnter?.call(null, props.data);
  };

  const isRedirectLink = (e: any) => {
    if (linking) {
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      if (start == end && start > 0 && start < text.length) {
        window.open(link, "_blank");
      }
    }
    return false;
  };

  const isFocusUp = (e: any) => {
    if (e.key == "ArrowUp" && e.target.selectionStart == 0) {
      props.onFocusUp?.call(null, props.data);
    }
  };

  const isFocusDown = (e: any) => {
    if (e.key == "ArrowDown" && e.target.selectionStart == e.target.value.length) {
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

  // --- link ---

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

  // --- focus input ---

  const inputRef = useRef<any>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus({
        cursor: "start",
      });
    }
  };

  useEffect(() => {
    if (props.focus) {
      focusInput();
    }
  }, [props.focus]);

  // --- type ---

  const [type, setType] = useState<string>(data.type || "TEXT");

  // --- task ---

  const taskRef = useRef<any>(null);

  const [taskShow, setTaskShow] = useState<boolean>(type == "TASK")

  const [status, setStatus] = useState<any>(data.status);

  const openTask = () => {
    if (!taskShow) {
      BlockApi.updateBlock(data.id, { type: "TASK", status: "NEW", }, (ok: any) => {
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

  const handleTaskChange = (newStatus: string) => {
    if (newStatus && newStatus != status) {
      BlockApi.updateBlock(data.id, {status: newStatus}, (ok: any) => {
        setStatus(newStatus);
      });
    }
  };

  // --- select ---

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

  // --- copy ---

  const isPressCopy = (e: any) => {
    if (e.key == "c" && e.metaKey) {
      onCopy?.call(null, data);
      return true;
    }
    return false;
  };
  
  // --- click ---

  const handleClick = (e: any) => {
    if (isClickSelectStop(e)) {
    } else {
      onSelectStart?.call(null, data);
      isRedirectLink(e);
    }
  };

  // --- key press ---

  const handlePress = (e: any) => {
    setHover(false);
    isFocusUp(e);
    isFocusDown(e);
    isDelete(e);
    isShowLink(e);
    isPressTask(e);
    isPressCopy(e);
  };

  const menu = (
    <Menu>
      <Menu.Item key={`${props.data.id}-edit`} onClick={() => openLink(true)}><LinkOutlined /></Menu.Item>
      <Menu.Item key={`${props.data.id}-move-up`} onClick={handleMoveUp}><ArrowUpOutlined/></Menu.Item>
      <Menu.Item key={`${props.data.id}-move-down`} onClick={handleMoveDown}><ArrowDownOutlined/></Menu.Item>
    </Menu>
  );
  
  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      display: "flex",
      alignItems: "flex-start",
      marginBottom: 1,
    }}>
    <div
      style={{
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
        position: "relative",
        visibility: hover ? "visible" : "hidden",
        marginTop: 4,
        marginRight: 1,
      }}>
      <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
      <Dropdown overlay={menu} placement="bottomLeft"><OptionButton/></Dropdown>
    </div>
    <div
      style={{
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
        flexGrow: 1,
        display: "flex",
        backgroundColor: data.selectAll ? "#e6f7ff" : "white",
      }}>
      <Task 
        ref={taskRef}
        id={data.id}
        show={taskShow}
        status={status}
        onChange={handleTaskChange}/>
      <div
        style={{
          flexGrow: 1,
        }}>
        <TextArea 
          ref={inputRef}
          placeholder="" 
          autoSize 
          value={text}
          size="middle"
          bordered={false}
          onClick={handleClick}
          onChange={handleChange}
          onBlur={handleChange}
          onPressEnter={handleEnter}
          onKeyDown={handlePress}
          onSelect={handleSelect}
          onSelectCapture={handleSelectCapture}
          style={{
            color: linking ? "#1890ff" : "inherit",
            flexGrow: "1",
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

export default TextBlock;
