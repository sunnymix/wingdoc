import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Input, Spin } from 'antd';
import BlockApi from '../BlockApi';
import { ArrowUpOutlined, ArrowDownOutlined, LoadingOutlined, LinkOutlined } from '@ant-design/icons';
import { BlockProps } from '@/components/block/BlockInterfaces';
import OptionButton from '@/components/common/OptionButton';
import Link from './Link';

const { TextArea } = Input;

const spinIcon = <LoadingOutlined spin />;

const TextBlock = forwardRef((props: BlockProps, ref) => {

  const {data} = props;

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

  const [showLink, setShowLink] = useState<boolean>(false);

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
  };

  const handleClick = (e: any) => {
    isRedirectLink(e);
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

  const isShowLink = (e: any) => {
    if (e.key == "k" && e.metaKey) {
      setShowLink(!showLink);
    }
  };

  const handlePress = (e: any) => {
    setHover(false);
    isFocusUp(e);
    isFocusDown(e);
    isDelete(e);
    isShowLink(e);
  };

  const handleSaveLink = (link: any) => {
    setShowLink(false);
    BlockApi.updateBlock(data.id, { link }, (ok: any) => {
      if (ok) {
        setLink(link);
      } else {
        setLink(data.link);
      }
    });
  };

  const handleCancelLink = () => {
    setShowLink(false);
    setLink(link);
  };

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (props.focus && inputRef.current) {
      inputRef.current.focus({
        cursor: "start",
      });
    }
  }, [props.focus]);

  const menu = (
    <Menu>
      <Menu.Item key={`${props.data.id}-edit`} onClick={() => setShowLink(!showLink)}><LinkOutlined /></Menu.Item>
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
      alignItems: "flex-start"
    }}>
    <div
      style={{
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
        position: "relative",
        visibility: hover ? "visible" : "hidden",
        marginTop: 3,
      }}>
      <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
      <Dropdown overlay={menu} placement="bottomLeft"><OptionButton/></Dropdown>
    </div>
    <div
      style={{
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
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
        style={{
          color: linking ? "#1890ff" : "inherit",
        }}/>
      <Link
        open={showLink}
        value={link}
        onSave={handleSaveLink}
        onCancel={handleCancelLink}/>
    </div>
  </div>
  </>
});

export default TextBlock;
